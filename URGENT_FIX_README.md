# 🚨 URGENT FIX - MUST DO THIS NOW!

## The Problem
Your frontend shows "Failed to analyze" because it cannot reach your backend.

## The ONLY Thing You Need To Do

### Step 1: Get Your Render Backend URL

1. Go to https://dashboard.render.com/
2. Find your backend service
3. **COPY THE EXACT URL** (e.g., `https://mantleguard-backend-abc123.onrender.com`)

### Step 2: Update the Config File

Open this file: `apps/web/src/config/api.ts`

Find this line (line 3):
```typescript
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://mantleguard-backend.onrender.com"
```

**REPLACE `https://mantleguard-backend.onrender.com` with YOUR ACTUAL RENDER URL!**

Example:
```typescript
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "https://mantle-guard-xyz123.onrender.com"
```

### Step 3: Commit and Push

```bash
git add apps/web/src/config/api.ts
git commit -m "fix: update backend URL"
git push origin main
```

### Step 4: Vercel Will Auto-Deploy

Wait 1-2 minutes for Vercel to automatically deploy.

## Test Your Backend First

Before anything, test if your backend is working:

Open in browser: `https://your-backend-url.onrender.com/`

**You MUST see:**
```json
{
  "success": true,
  "service": "MantleGuard Backend",
  "endpoints": ["/analyze", "/audit", "/chat", "/register-audit"]
}
```

**If you DON'T see this, your backend is NOT deployed correctly!**

Go back to Render and make sure:
1. Service status shows "Live" (green)
2. No errors in the Logs tab
3. The URL works when you click it

## Still Not Working?

Open browser console (F12) and tell me:
1. What does the red API Status box say?
2. What URL is it trying to connect to?
3. Does your Render backend URL work in a new tab?

---

**TELL ME YOUR RENDER BACKEND URL AND I'LL UPDATE THE CONFIG FOR YOU!**
