# Backend Authentication Setup Required

## Status: Frontend Complete ✅ | Backend Integration Needed ⏳

The frontend authentication system is fully implemented and deployed. Now you need to add authentication endpoints to your Python FastAPI backend.

---

## Quick Setup Guide

### Step 1: Install Required Packages

Add these to your `backend/requirements.txt`:

```txt
python-jose[cryptography]  # For JWT tokens
passlib[bcrypt]            # For password hashing
python-multipart           # For form data
```

Then install:
```bash
cd backend
pip install python-jose[cryptography] passlib[bcrypt] python-multipart
```

### Step 2: Create Database Models

Create `backend/models/user.py`:

```python
from sqlalchemy import Column, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False, index=True)
    name = Column(String, nullable=False)
    password_hash = Column(String, nullable=False)
    avatar = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
```

### Step 3: Create Auth Utils

Create `backend/utils/auth.py`:

```python
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Configuration
SECRET_KEY = "your-secret-key-change-this-in-production"  # ⚠️ CHANGE THIS!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hash a password"""
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create a JWT access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """Verify JWT token and return user_id"""
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")
        
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials"
            )
        
        return user_id
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
```

### Step 4: Create Auth Routes

Add to `backend/main.py` or create `backend/routes/auth.py`:

```python
from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
import uuid

from utils.auth import (
    get_password_hash, 
    verify_password, 
    create_access_token,
    verify_token
)

router = APIRouter(prefix="/auth", tags=["authentication"])

# Request/Response Models
class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    confirmPassword: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    avatar: Optional[str] = None
    createdAt: str

class AuthResponse(BaseModel):
    user: UserResponse
    token: str

# In-memory storage (replace with real database)
users_db = {}

@router.post("/signup", response_model=AuthResponse)
async def signup(request: SignupRequest):
    """Create a new user account"""
    
    # Validate passwords match
    if request.password != request.confirmPassword:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Passwords do not match"
        )
    
    # Check if email already exists
    if any(user["email"] == request.email for user in users_db.values()):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )
    
    # Create user
    user_id = str(uuid.uuid4())
    created_at = datetime.utcnow().isoformat() + "Z"
    
    user_data = {
        "id": user_id,
        "email": request.email,
        "name": request.name,
        "password_hash": get_password_hash(request.password),
        "avatar": None,
        "created_at": created_at
    }
    
    users_db[user_id] = user_data
    
    # Create JWT token
    token = create_access_token(data={"user_id": user_id})
    
    # Return response
    return AuthResponse(
        user=UserResponse(
            id=user_id,
            email=request.email,
            name=request.name,
            avatar=None,
            createdAt=created_at
        ),
        token=token
    )

@router.post("/login", response_model=AuthResponse)
async def login(request: LoginRequest):
    """Login with email and password"""
    
    # Find user by email
    user = None
    for u in users_db.values():
        if u["email"] == request.email:
            user = u
            break
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not verify_password(request.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Create JWT token
    token = create_access_token(data={"user_id": user["id"]})
    
    # Return response
    return AuthResponse(
        user=UserResponse(
            id=user["id"],
            email=user["email"],
            name=user["name"],
            avatar=user.get("avatar"),
            createdAt=user["created_at"]
        ),
        token=token
    )

@router.get("/verify")
async def verify(user_id: str = Depends(verify_token)):
    """Verify JWT token and return user info"""
    
    user = users_db.get(user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    return {
        "user": UserResponse(
            id=user["id"],
            email=user["email"],
            name=user["name"],
            avatar=user.get("avatar"),
            createdAt=user["created_at"]
        )
    }

# Add protected route example
@router.get("/me")
async def get_current_user(user_id: str = Depends(verify_token)):
    """Get current user profile (protected route)"""
    
    user = users_db.get(user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    return UserResponse(
        id=user["id"],
        email=user["email"],
        name=user["name"],
        avatar=user.get("avatar"),
        createdAt=user["created_at"]
    )
```

### Step 5: Register Routes in Main App

Update `backend/main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth  # Import auth router

app = FastAPI()

# CORS configuration (already exists, update to include credentials)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://mantlegaurd.vercel.app"
    ],
    allow_credentials=True,  # ⚠️ Important for auth
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register auth routes
app.include_router(auth.router)

# Your existing routes...
@app.get("/")
async def root():
    return {"message": "MantleGuard API"}
```

### Step 6: Test the Endpoints

Test with curl or Postman:

#### 1. Signup
```bash
curl -X POST https://mantle-gaurd.onrender.com/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

Expected response:
```json
{
  "user": {
    "id": "uuid-here",
    "email": "john@example.com",
    "name": "John Doe",
    "avatar": null,
    "createdAt": "2026-06-16T10:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. Login
```bash
curl -X POST https://mantle-gaurd.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### 3. Verify Token
```bash
curl -X GET https://mantle-gaurd.onrender.com/auth/verify \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Step 7: Add Real Database (Optional but Recommended)

Replace in-memory storage with SQLAlchemy:

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from models.user import User, Base

# Database connection
DATABASE_URL = "sqlite:///./mantleguard.db"  # or PostgreSQL
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

# Create tables
Base.metadata.create_all(bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Update signup to use database
@router.post("/signup")
async def signup(request: SignupRequest, db: Session = Depends(get_db)):
    # Check if email exists
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    # Create user
    user = User(
        id=str(uuid.uuid4()),
        email=request.email,
        name=request.name,
        password_hash=get_password_hash(request.password),
        created_at=datetime.utcnow()
    )
    
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Create token and return...
```

---

## Environment Variables

Add these to your `.env` or Render environment variables:

```env
SECRET_KEY=your-super-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_DAYS=30
DATABASE_URL=your-database-url
```

---

## Testing Checklist

Once backend is deployed:

- [ ] POST /auth/signup - Creates new user
- [ ] POST /auth/signup with existing email - Returns 400 error
- [ ] POST /auth/login - Returns user and token
- [ ] POST /auth/login with wrong password - Returns 401 error
- [ ] GET /auth/verify with valid token - Returns user
- [ ] GET /auth/verify with invalid token - Returns 401 error
- [ ] Test frontend signup flow
- [ ] Test frontend login flow
- [ ] Test session persistence (refresh page)
- [ ] Test logout flow
- [ ] Verify protected routes work

---

## Deployment

After implementing, deploy to Render:

```bash
git add .
git commit -m "feat: Add authentication endpoints"
git push origin main
```

Render will automatically redeploy your backend.

---

## Security Best Practices

⚠️ **Important for Production:**

1. **Change SECRET_KEY** - Use a strong random key
2. **Use HTTPS** - Always in production (Render provides this)
3. **Hash Passwords** - Already done with bcrypt
4. **Token Expiration** - Set reasonable expiry (30 days default)
5. **Rate Limiting** - Add rate limiting to prevent brute force
6. **Email Verification** - Consider adding email verification
7. **Password Requirements** - Enforce strong passwords
8. **Database** - Use PostgreSQL instead of in-memory storage

---

## Current Status

✅ **Frontend:** Fully implemented and deployed
- Login dialog ✅
- Signup dialog ✅
- User menu ✅
- Auth provider ✅
- API client with auth ✅

⏳ **Backend:** Needs implementation
- POST /auth/signup ⏳
- POST /auth/login ⏳
- GET /auth/verify ⏳
- Database setup ⏳

---

## Support

If you encounter issues:

1. Check backend logs on Render
2. Test endpoints with curl/Postman
3. Verify CORS settings include credentials
4. Check SECRET_KEY is set
5. Verify database connection

---

## Next Steps

1. **Copy the code** from Step 3 and Step 4
2. **Install dependencies** from Step 1
3. **Test locally** with `uvicorn main:app --reload`
4. **Deploy to Render** - push to GitHub
5. **Test on frontend** - visit https://mantlegaurd.vercel.app
6. **Create a test account** and verify everything works

**Estimated time:** 1-2 hours
