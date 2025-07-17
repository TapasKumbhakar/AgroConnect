# AgroConnect Deployment Guide

## 🚀 Deploying to Vercel

### Option 1: Deploy Frontend Only (Recommended for Testing)

1. **In Vercel Dashboard:**
   - Import your GitHub repository
   - **Set Root Directory to `client`**
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

2. **Environment Variables (if needed):**
   - Add any required environment variables in Vercel dashboard

### Option 2: Deploy with Custom Configuration

1. **Use the provided `vercel.json`** in the root directory
2. **In Vercel Dashboard:**
   - Import your GitHub repository
   - Keep Root Directory as default (root)
   - Vercel will use the `vercel.json` configuration

### 🔧 Troubleshooting Common Issues

#### "react-scripts: command not found"
- **Cause:** Dependencies not installed in correct directory
- **Solution:** Set Root Directory to `client` in Vercel dashboard

#### Build fails on Vercel
- **Solution 1:** Use deployment prep script:
  ```bash
  # On Windows
  ./deploy-prep.bat
  
  # On Mac/Linux
  ./deploy-prep.sh
  ```

- **Solution 2:** Manual build test:
  ```bash
  cd client
  npm install
  npm run build
  ```

#### Routing issues (404 on refresh)
- **Cause:** SPA routing not configured
- **Solution:** The `vercel.json` includes proper rewrites for React Router

### 📁 Project Structure
```
ARCP/
├── client/          # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── build/       # Generated after build
├── models/          # Backend models
├── app.js          # Backend server
├── package.json    # Backend dependencies
├── vercel.json     # Vercel configuration
└── deploy-prep.*   # Deployment scripts
```

### 🌐 Backend Deployment (Optional)

If you want to deploy the backend separately:

1. **Deploy backend to:**
   - Railway
   - Heroku
   - Railway
   - Another Vercel project

2. **Update API URLs in frontend:**
   - Update the `proxy` in `client/package.json`
   - Or add environment variables for API endpoints

### ✅ Pre-deployment Checklist

- [ ] All dependencies installed (`npm install` in client directory)
- [ ] Build succeeds locally (`npm run build` in client directory)
- [ ] Environment variables configured (if any)
- [ ] API endpoints updated for production (if using separate backend)
- [ ] Translations working properly
- [ ] Dark mode functionality tested

### 🎯 Quick Deploy Steps

1. **Prepare build:**
   ```bash
   cd client
   npm install
   npm run build
   ```

2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

3. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import from GitHub
   - **Set Root Directory: `client`**
   - Deploy!

### 🏆 Production URLs

After successful deployment, your app will be available at:
- `https://your-project-name.vercel.app`

The translation system will work seamlessly with:
- English (en) - Default
- Hindi (hi) - Complete
- Bengali (bn) - Partial
