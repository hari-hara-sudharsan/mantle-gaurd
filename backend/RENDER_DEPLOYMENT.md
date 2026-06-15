# MantleGuard Backend - Render Deployment Guide

## 🚀 Quick Deploy to Render

### Method 1: Deploy via Render Dashboard (Recommended)

#### Step 1: Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `hari-hara-sudharsan/mantle-gaurd`

#### Step 2: Configure Service

**Name:** `mantleguard-backend`

**Region:** Oregon (US West) or any region close to your users

**Branch:** `main`

**Root Directory:** `backend`

**Runtime:** `Python 3`

**Build Command:**
```bash
pip install -r requirements.txt
```

**Start Command:**
```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

**Instance Type:** `Free` (or select paid plan for better performance)

#### Step 3: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

**Required Variables:**

```env
PYTHON_VERSION=3.11.0
FRONTEND_ORIGIN=https://your-vercel-app.vercel.app
MANTLE_RPC_URL=https://rpc.sepolia.mantle.xyz
MANTLE_EXPLORER_URL=https://sepolia.mantlescan.xyz
AUDIT_LOGGER_ADDRESS=0xFc8cd61D26aF1A419B23F3bA08BE68aF3D9e827a
AUDIT_LOGGER_FUNCTION=logAudit
AUDIT_LOGGER_GAS_LIMIT=250000
```

**Optional (for on-chain audit registration):**

```env
PRIVATE_KEY=your_wallet_private_key_here
AUDIT_LOGGER_ABI_JSON=your_contract_abi_json_here
OPENAI_API_KEY=your_openai_key_here
DATABASE_URL=your_database_url_here
```

⚠️ **Important:** 
- Replace `https://your-vercel-app.vercel.app` with your actual Vercel frontend URL
- Only add `PRIVATE_KEY` if you want real on-chain audit registration
- Without `PRIVATE_KEY`, the backend will return deterministic local proof data

#### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for the build to complete (~2-3 minutes)
3. Your backend will be live at: `https://mantleguard-backend.onrender.com`

---

### Method 2: Deploy via render.yaml (Blueprint)

This method uses the included `render.yaml` file for infrastructure-as-code deployment.

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml` and configure the service
5. Review settings and click **"Apply"**

---

## 🔧 Post-Deployment Configuration

### Update Frontend to Use Backend URL

After deployment, update your Vercel frontend environment variables:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_API_URL`:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com
   ```
3. Redeploy your frontend

### Update CORS Settings

Your deployed backend URL will be available at the Render dashboard. Make sure to update `FRONTEND_ORIGIN` environment variable with your actual Vercel URL.

---

## ✅ Verify Deployment

### Test Backend Endpoints

1. **Health Check:**
   ```bash
   curl https://your-backend-name.onrender.com/
   ```

2. **Test Analyze Endpoint:**
   ```bash
   curl -X POST https://your-backend-name.onrender.com/analyze \
     -H "Content-Type: application/json" \
     -d '{"contract": "contract Test { function test() public {} }"}'
   ```

3. **Test Audit Endpoint:**
   ```bash
   curl -X POST https://your-backend-name.onrender.com/audit \
     -H "Content-Type: application/json" \
     -d '{"contract": "contract Test { function withdraw() public { msg.sender.call{value: 1}(\"\"); } }"}'
   ```

---

## 🔥 Common Issues & Solutions

### Issue 1: "Module not found" Error
**Solution:** Make sure `requirements.txt` includes all dependencies:
```
fastapi==0.115.6
uvicorn[standard]==0.34.0
python-dotenv==1.0.1
python-multipart==0.0.20
pydantic==2.10.4
web3==7.6.1
```

### Issue 2: CORS Error from Frontend
**Solution:** 
- Check `FRONTEND_ORIGIN` environment variable matches your Vercel URL
- Make sure it includes the protocol (`https://`)
- No trailing slash

### Issue 3: "Application startup failed"
**Solution:**
- Check Render logs for specific error
- Verify `PORT` environment variable is used (Render provides it automatically)
- Ensure start command is: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Issue 4: Free Tier Spin-Down
**Problem:** Render free tier spins down after 15 minutes of inactivity
**Solution:** 
- Upgrade to paid plan ($7/month) for always-on service
- Or accept 30-second cold start on first request
- Use a cron job to ping every 14 minutes (not recommended by Render)

### Issue 5: Build Takes Too Long
**Solution:**
- Check build logs for stuck dependencies
- Consider upgrading to a paid plan for faster builds

---

## 📊 Monitoring & Logs

### View Logs
1. Go to Render Dashboard
2. Select your service
3. Click **"Logs"** tab
4. View real-time logs

### Set Up Alerts
1. Go to Service Settings
2. Add notification email for deployment failures
3. Enable health check alerts

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** - Use Render environment variables
2. **Rotate `PRIVATE_KEY` regularly** if using on-chain features
3. **Use HTTPS only** - Render provides SSL automatically
4. **Validate CORS origins** - Only allow your frontend domain
5. **Rate limiting** - Consider adding rate limiting for production

---

## 🚀 Scaling & Performance

### Free Tier Limitations:
- 512 MB RAM
- 0.1 CPU
- Spins down after 15 minutes inactivity
- 750 hours/month free compute

### Upgrading:
- **Starter ($7/month):** Always-on, 512 MB RAM
- **Standard ($25/month):** 2 GB RAM, better performance
- **Pro ($85/month):** 4 GB RAM, priority support

---

## 📝 Deployment Checklist

- [x] `requirements.txt` updated with all dependencies
- [x] `Procfile` created with uvicorn start command
- [x] `runtime.txt` specifies Python version
- [x] `render.yaml` configured (optional)
- [ ] Repository pushed to GitHub
- [ ] Render account created and connected to GitHub
- [ ] Service created on Render
- [ ] Environment variables added
- [ ] Build succeeded
- [ ] Health check endpoint returns 200
- [ ] Frontend `NEXT_PUBLIC_API_URL` updated with Render URL
- [ ] CORS configuration tested
- [ ] All endpoints tested from frontend

---

## 🎯 Next Steps

1. Deploy backend to Render following steps above
2. Get your backend URL (e.g., `https://mantleguard-backend.onrender.com`)
3. Update Vercel frontend `NEXT_PUBLIC_API_URL` environment variable
4. Test all features end-to-end
5. Monitor logs for any errors
6. Consider upgrading to paid plan for production use

---

## 📞 Support

- **Render Docs:** https://render.com/docs
- **Render Community:** https://community.render.com/
- **FastAPI Docs:** https://fastapi.tiangolo.com/

---

**Ready to deploy?** Follow Method 1 above to get started! 🚀
