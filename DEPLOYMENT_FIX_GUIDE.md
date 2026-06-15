# 🚨 DEPLOYMENT FIX GUIDE - Backend Connection Issues

## Problem
Frontend shows "Failed to analyze gas" and "Failed to analyze security" errors because it cannot reach the backend API.

## Root Cause
The `NEXT_PUBLIC_API_URL` environment variable is either:
1. Not set in Vercel
2. Set incorrectly
3. Or `NEXT_PUBLIC_MOCK_BACKEND` is set to `true`

---

## ✅ COMPLETE FIX - Step by Step

### Step 1: Get Your Render Backend URL

1. Go to **Render Dashboard**: https://dashboard.render.com/
2. Click on your backend service (e.g., `mantleguard-backend`)
3. **Copy the URL** at the top of the page
   - Example: `https://mantleguard-backend-xxxx.onrender.com`
   - Example: `https://mantle-guard.onrender.com`

### Step 2: Configure Vercel Environment Variables

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Select your project
3. Click **Settings** (top navigation)
4. Click **Environment Variables** (left sidebar)
5. Add/Update these variables:

```
NEXT_PUBLIC_API_URL=https://your-actual-render-url.onrender.com
NEXT_PUBLIC_MOCK_BACKEND=false
```

⚠️ **CRITICAL:** Replace `your-actual-render-url.onrender.com` with your ACTUAL Render URL from Step 1!

### Step 3: Update Render Backend CORS

1. Go to **Render Dashboard**
2. Click on your backend service
3. Go to **Environment** tab
4. Add/Update:

```
FRONTEND_ORIGIN=https://your-vercel-app.vercel.app
```

⚠️ Replace with your actual Vercel URL (no trailing slash!)

### Step 4: Redeploy Both Services

**Vercel:**
1. Go to **Deployments** tab
2. Click **...** (three dots) on latest deployment
3. Click **Redeploy**

**Render:**
1. Go to your backend service
2. Click **Manual Deploy** → **Deploy latest commit**

### Step 5: Test the Connection

1. Open browser console (F12)
2. Go to your Vercel app
3. You should see in console:
   ```
   === API Configuration ===
   NEXT_PUBLIC_API_URL: https://your-backend.onrender.com
   NEXT_PUBLIC_MOCK_BACKEND: false
   API_BASE_URL: https://your-backend.onrender.com
   ```

4. An API Status notification will appear:
   - 🔵 Blue = Checking connection
   - ✅ Green = Connected successfully
   - ❌ Red = Connection failed (with error details)

---

## 🔍 Debugging Checklist

If it still doesn't work, check these:

### ❌ Common Mistakes:

1. **Wrong URL format**
   - ❌ BAD: `mantleguard-backend.onrender.com` (missing https://)
   - ❌ BAD: `https://mantleguard-backend.onrender.com/` (trailing slash)
   - ✅ GOOD: `https://mantleguard-backend.onrender.com`

2. **Backend not deployed**
   - Check Render dashboard - service should show "Live"
   - Test backend directly: Visit `https://your-backend.onrender.com/` in browser
   - Should return: `{"success": true, "service": "MantleGuard Backend", ...}`

3. **CORS issues**
   - Make sure `FRONTEND_ORIGIN` in Render matches your Vercel URL exactly
   - No trailing slashes!

4. **Mock mode still enabled**
   - Check Vercel env vars: `NEXT_PUBLIC_MOCK_BACKEND` should be `false` or deleted
   - Redeploy after changing

5. **Old deployment cached**
   - Clear browser cache
   - Try incognito/private window
   - Force redeploy in Vercel

---

## 🧪 Manual Tests

### Test 1: Backend Health Check
```bash
curl https://your-backend.onrender.com/
```

**Expected:**
```json
{
  "success": true,
  "service": "MantleGuard Backend",
  "endpoints": ["/analyze", "/audit", "/chat", "/register-audit"]
}
```

### Test 2: Audit Endpoint
```bash
curl -X POST https://your-backend.onrender.com/audit \
  -H "Content-Type: application/json" \
  -d '{"contract": "contract Test { }"}'
```

**Expected:** JSON response with `"success": true`

### Test 3: Gas Analysis Endpoint
```bash
curl -X POST https://your-backend.onrender.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"contract": "contract Test { function test() public {} }"}'
```

**Expected:** JSON response with `"success": true` and `"functions"` array

---

## 📝 Environment Variables Reference

### Vercel (Frontend)
```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_MOCK_BACKEND=false
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wc_project_id
NEXT_PUBLIC_MANTLE_RPC=https://rpc.sepolia.mantle.xyz
NEXT_PUBLIC_MANTLE_EXPLORER=https://sepolia.mantlescan.xyz
NEXT_PUBLIC_AUDIT_LOGGER_ADDRESS=0xFc8cd61D26aF1A419B23F3bA08BE68aF3D9e827a
HUSKY=0
```

### Render (Backend)
```env
PYTHON_VERSION=3.11.0
FRONTEND_ORIGIN=https://your-frontend.vercel.app
MANTLE_RPC_URL=https://rpc.sepolia.mantle.xyz
MANTLE_EXPLORER_URL=https://sepolia.mantlescan.xyz
AUDIT_LOGGER_ADDRESS=0xFc8cd61D26aF1A419B23F3bA08BE68aF3D9e827a
AUDIT_LOGGER_FUNCTION=logAudit
AUDIT_LOGGER_GAS_LIMIT=250000
```

---

## 🎯 Quick Checklist

Before asking for help, verify:

- [ ] Render backend is deployed and shows "Live"
- [ ] Render backend URL works in browser
- [ ] Vercel `NEXT_PUBLIC_API_URL` is set to correct Render URL
- [ ] Vercel `NEXT_PUBLIC_MOCK_BACKEND` is `false` or deleted
- [ ] Render `FRONTEND_ORIGIN` matches Vercel URL
- [ ] Both services redeployed after env var changes
- [ ] Browser console shows correct API_BASE_URL
- [ ] API Status Checker shows connection status

---

## 🆘 Still Not Working?

Share these details:

1. **Render Backend URL:** (from Render dashboard)
2. **Vercel Frontend URL:** (from Vercel dashboard)
3. **Browser Console Output:** (F12 → Console tab)
4. **API Status Checker Message:** (top-right notification)
5. **Result of:** `curl https://your-backend.onrender.com/`

---

## 📞 Contact

If nothing works, check:
- Render logs (Logs tab in Render dashboard)
- Vercel logs (Deployments → Click deployment → View Function Logs)
- Browser Network tab (F12 → Network) to see failed requests
