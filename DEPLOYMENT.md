# Image Dropper - Deployment Guide

## 🚀 Render Deployment (Recommended)

### Quick Deploy to Render:

1. **Go to Render**: https://render.com
2. **Sign up/Login** with your GitHub account
3. **Click "New +"** → **"Web Service"**
4. **Connect your GitHub repo** (you may need to push this code to GitHub first)
5. **Configure the service**:
   - **Name**: `image-dropper` (or your choice)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free tier is fine to start
6. **Add Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (Render will set this automatically)
7. **Click "Create Web Service"**
8. **Wait for deployment** (usually 2-5 minutes)
9. **Your app will be live!** 🎉

### Alternative: Use render.yaml (Blueprint)

If you prefer using the blueprint file:
1. Push your code to GitHub
2. In Render dashboard, click "New +" → "Blueprint"
3. Connect your repo and select the `render.yaml` file
4. Deploy automatically!

## 📋 Other Deployment Options
1. Create a Heroku account at https://heroku.com
2. Install Heroku CLI: `npm install -g heroku`
3. Login: `heroku login`
4. Create app: `heroku create your-app-name`
5. Deploy: `git push heroku main`

### Option 2: Railway
1. Go to https://railway.app
2. Connect your GitHub repo
3. Deploy automatically

### Option 3: Render
1. Go to https://render.com
2. Create a new Web Service
3. Connect your repo
4. Set build command: `npm install`
5. Set start command: `npm start`

### Option 4: Vercel
1. Go to https://vercel.com
2. Import your project
3. Deploy

## 📋 Pre-deployment Checklist

- [x] Added build script to package.json
- [x] Added engines field
- [x] Created Procfile for Heroku
- [x] Updated NODE_ENV to production
- [x] Added deployment guide

## 🔧 Environment Variables

Set these in your deployment platform:

```
PORT=3000
NODE_ENV=production
```

## 📁 File Storage Note

Currently using local file storage. For production, consider:
- AWS S3
- Cloudinary
- Google Cloud Storage
- DigitalOcean Spaces

## 🌐 Live Demo

After deployment, your app will be available at:
- Heroku: `https://your-app-name.herokuapp.com`
- Railway: `https://your-project-name.up.railway.app`
- Render: `https://your-service-name.onrender.com`
- Vercel: `https://your-project-name.vercel.app`
