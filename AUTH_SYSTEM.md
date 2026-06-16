# Authentication System - Login & Signup

## Overview

**Wallet Connection REMOVED** ✅ - Replaced with traditional **Login/Signup Authentication**

The project now uses a complete authentication system with:
- ✅ **Login** with email and password
- ✅ **Signup** for new users
- ✅ **JWT Token** authentication
- ✅ **User Profile** with dropdown menu
- ✅ **Protected Routes** support
- ✅ **Persistent Sessions** (localStorage)

## What Changed

### Removed Files (Wallet Related)
```
❌ apps/web/src/config/wagmi.ts
❌ apps/web/src/providers/wagmi-provider.tsx
❌ apps/web/src/providers/web3-provider.tsx
❌ apps/web/src/app/test-wallet/page.tsx
```

### Removed Dependencies
```json
❌ @rainbow-me/rainbowkit
❌ @tanstack/react-query
❌ wagmi
❌ viem
```

### New Files (Authentication)
```
✅ apps/web/src/providers/auth-provider.tsx
✅ apps/web/src/services/auth.ts
✅ apps/web/src/types/auth.ts
✅ apps/web/src/components/auth/login-dialog.tsx
✅ apps/web/src/components/auth/signup-dialog.tsx
✅ apps/web/src/components/auth/user-menu.tsx
✅ apps/web/src/components/ui/label.tsx
✅ apps/web/src/components/ui/dropdown-menu.tsx
✅ apps/web/src/components/ui/avatar.tsx
```

### New Dependencies
```json
✅ @radix-ui/react-avatar
✅ @radix-ui/react-dropdown-menu
✅ @radix-ui/react-label
✅ axios (already installed)
✅ react-hook-form (already installed)
✅ zod (already installed)
```

## Architecture

### 1. Auth Provider (`auth-provider.tsx`)
Manages global authentication state using React Context:
- User information
- Authentication status
- Loading states
- Login/Signup/Logout functions

### 2. Auth Service (`auth.ts`)
Handles all authentication API calls:
- `login()` - Login with email/password
- `signup()` - Create new account
- `logout()` - Clear session
- `verifyToken()` - Validate JWT token
- `getCurrentUser()` - Get user from localStorage
- `getToken()` - Get JWT token

### 3. Auth Components
- **LoginDialog** - Modal for user login
- **SignupDialog** - Modal for new user registration
- **UserMenu** - Dropdown menu showing user profile and logout

### 4. UI Components
- **Label** - Form labels
- **DropdownMenu** - Menu for user actions
- **Avatar** - User profile picture

## User Interface

### Before Login (Not Authenticated)
```
┌─────────────────────────────────────┐
│  [Search]    🔔 ☀️  [Login] [Sign Up] │
└─────────────────────────────────────┘
```

### After Login (Authenticated)
```
┌─────────────────────────────────────┐
│  [Search]    🔔 ☀️  [👤 JD]          │
│                      ▼               │
│                  ┌─────────────┐    │
│                  │ John Doe    │    │
│                  │ john@ex.com │    │
│                  ├─────────────┤    │
│                  │ 👤 Profile  │    │
│                  │ ⚙️ Settings │    │
│                  │ 🚪 Log out  │    │
│                  └─────────────┘    │
└─────────────────────────────────────┘
```

## API Endpoints Required

Your backend needs these endpoints:

### 1. **POST /auth/signup**
Create new user account
```json
// Request
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepass123",
  "confirmPassword": "securepass123"
}

// Response (200)
{
  "user": {
    "id": "user_123",
    "email": "john@example.com",
    "name": "John Doe",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2026-06-16T10:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// Error (400)
{
  "message": "Email already exists"
}
```

### 2. **POST /auth/login**
Login existing user
```json
// Request
{
  "email": "john@example.com",
  "password": "securepass123"
}

// Response (200)
{
  "user": {
    "id": "user_123",
    "email": "john@example.com",
    "name": "John Doe",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2026-06-16T10:00:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// Error (401)
{
  "message": "Invalid email or password"
}
```

### 3. **GET /auth/verify**
Verify JWT token and get user profile
```json
// Request Headers
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// Response (200)
{
  "user": {
    "id": "user_123",
    "email": "john@example.com",
    "name": "John Doe",
    "avatar": "https://example.com/avatar.jpg",
    "createdAt": "2026-06-16T10:00:00Z"
  }
}

// Error (401)
{
  "message": "Invalid or expired token"
}
```

## How It Works

### 1. User Signup Flow
```
User clicks "Sign Up" 
  → SignupDialog opens
  → User fills form (name, email, password)
  → Submit → POST /auth/signup
  → Backend creates user and returns token
  → Token saved to localStorage
  → User state updated
  → Dialog closes
  → User is now logged in
```

### 2. User Login Flow
```
User clicks "Login"
  → LoginDialog opens
  → User enters email & password
  → Submit → POST /auth/login
  → Backend validates credentials and returns token
  → Token saved to localStorage
  → User state updated
  → Dialog closes
  → User is now logged in
```

### 3. Session Persistence
```
User refreshes page
  → AuthProvider initializes
  → Checks localStorage for token
  → If token exists → GET /auth/verify
  → Backend validates token
  → User state restored
  → User stays logged in
```

### 4. User Logout Flow
```
User clicks "Log out"
  → authService.logout() called
  → localStorage cleared (token + user)
  → User state reset
  → User redirected to login
```

### 5. API Requests with Auth
```
User makes API request
  → axios interceptor adds token to headers
  → Request sent with: Authorization: Bearer <token>
  → Backend validates token
  → Response returned
```

## Using Authentication in Components

### Check if User is Logged In
```typescript
import { useAuth } from '@/providers/auth-provider'

function MyComponent() {
  const { user, isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  if (!isAuthenticated) {
    return <div>Please log in</div>
  }
  
  return <div>Hello, {user.name}!</div>
}
```

### Get Current User Info
```typescript
import { useAuth } from '@/providers/auth-provider'

function UserProfile() {
  const { user } = useAuth()
  
  return (
    <div>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <img src={user?.avatar} alt="Avatar" />
    </div>
  )
}
```

### Logout User
```typescript
import { useAuth } from '@/providers/auth-provider'

function LogoutButton() {
  const { logout } = useAuth()
  
  return (
    <button onClick={logout}>
      Log Out
    </button>
  )
}
```

### Protected Route Example
```typescript
'use client'

import { useAuth } from '@/providers/auth-provider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  if (!isAuthenticated) {
    return null
  }
  
  return <div>Protected content</div>
}
```

## Token Storage

Tokens are stored in **localStorage**:
- **Key:** `auth_token`
- **Value:** JWT token string
- **User data:** `user` key with JSON string

### Security Notes:
- Tokens are sent in `Authorization: Bearer <token>` header
- Expired tokens are automatically cleared (401 response)
- Tokens should have expiration time (set by backend)
- HTTPS required in production

## Form Validation

Both Login and Signup forms use **Zod** for validation:

### Login Schema
```typescript
{
  email: string (valid email format),
  password: string (min 6 characters)
}
```

### Signup Schema
```typescript
{
  name: string (min 2 characters),
  email: string (valid email format),
  password: string (min 6 characters),
  confirmPassword: string (must match password)
}
```

## Error Handling

### Frontend
- Network errors → "Network error - Cannot reach backend"
- Validation errors → Shown under each input field
- API errors → Toast notification with error message

### Backend Expected Errors
- **400 Bad Request** - Validation errors (email exists, weak password)
- **401 Unauthorized** - Invalid credentials or expired token
- **500 Internal Server Error** - Server error

## Styling & Theme

- Dark theme by default
- Primary color: `#00FFB2` (green accent)
- Components use Radix UI + Tailwind CSS
- Animations with Framer Motion
- Toast notifications with Sonner

## Testing Checklist

### ✅ Signup Flow
- [ ] Open signup dialog
- [ ] Fill form with valid data
- [ ] Submit and verify success toast
- [ ] Check user is logged in
- [ ] Verify avatar/name appears in topbar

### ✅ Login Flow
- [ ] Open login dialog
- [ ] Enter valid credentials
- [ ] Submit and verify success toast
- [ ] Check user is logged in
- [ ] Verify user menu appears

### ✅ Validation
- [ ] Try signup with existing email → Error shown
- [ ] Try login with wrong password → Error shown
- [ ] Try weak password → Validation error
- [ ] Try mismatched passwords → Validation error
- [ ] Try invalid email format → Validation error

### ✅ Session Persistence
- [ ] Login
- [ ] Refresh page
- [ ] Verify still logged in
- [ ] Check localStorage has token

### ✅ Logout
- [ ] Click user menu
- [ ] Click "Log out"
- [ ] Verify redirected to home
- [ ] Verify localStorage cleared
- [ ] Verify Login/Signup buttons appear

### ✅ Protected Routes
- [ ] Create protected page
- [ ] Try accessing without login → Redirected
- [ ] Login and access → Page loads
- [ ] Logout and try again → Redirected

## Backend Implementation Guide

Your backend needs to implement these endpoints. Here's a Python FastAPI example:

### Example Backend (FastAPI)
```python
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import jwt
import bcrypt
from datetime import datetime, timedelta

app = FastAPI()
security = HTTPBearer()

SECRET_KEY = "your-secret-key-here"
ALGORITHM = "HS256"

# Models
class SignupRequest(BaseModel):
    name: str
    email: str
    password: str
    confirmPassword: str

class LoginRequest(BaseModel):
    email: str
    password: str

class User(BaseModel):
    id: str
    email: str
    name: str
    avatar: str = None
    createdAt: str

# Signup
@app.post("/auth/signup")
async def signup(request: SignupRequest):
    # Check if email exists (query your database)
    if user_exists(request.email):
        raise HTTPException(status_code=400, detail="Email already exists")
    
    # Hash password
    hashed_password = bcrypt.hashpw(request.password.encode(), bcrypt.gensalt())
    
    # Create user in database
    user = create_user(request.name, request.email, hashed_password)
    
    # Generate JWT token
    token = jwt.encode({
        "user_id": user.id,
        "exp": datetime.utcnow() + timedelta(days=30)
    }, SECRET_KEY, algorithm=ALGORITHM)
    
    return {
        "user": user,
        "token": token
    }

# Login
@app.post("/auth/login")
async def login(request: LoginRequest):
    # Get user from database
    user = get_user_by_email(request.email)
    
    if not user or not bcrypt.checkpw(request.password.encode(), user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Generate JWT token
    token = jwt.encode({
        "user_id": user.id,
        "exp": datetime.utcnow() + timedelta(days=30)
    }, SECRET_KEY, algorithm=ALGORITHM)
    
    return {
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "avatar": user.avatar,
            "createdAt": user.created_at
        },
        "token": token
    }

# Verify Token
@app.get("/auth/verify")
async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        
        # Get user from database
        user = get_user_by_id(user_id)
        
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        
        return {
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "avatar": user.avatar,
                "createdAt": user.created_at
            }
        }
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

## Next Steps

1. ✅ **Frontend is ready** - All components created
2. ⏳ **Backend implementation needed** - Add auth endpoints
3. ⏳ **Database setup** - Create users table
4. ⏳ **Test the flow** - Signup → Login → Logout
5. ⏳ **Deploy** - Push to production

## Deployment URLs

- **Frontend:** https://mantlegaurd.vercel.app
- **Backend:** https://mantle-gaurd.onrender.com

## Summary

✅ **Wallet connection completely removed**
✅ **Login/Signup system implemented**
✅ **JWT authentication ready**
✅ **User profile with dropdown menu**
✅ **Session persistence with localStorage**
✅ **Form validation with Zod**
✅ **Error handling with toast notifications**
✅ **API client with auth interceptor**
✅ **Clean, modern UI with Radix + Tailwind**

**Status:** Frontend complete, backend integration needed.
