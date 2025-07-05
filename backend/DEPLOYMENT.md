# Backend Deployment Guide

## Deploy to Render (Recommended)

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Verify your email

### Step 2: Create New Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `https://github.com/AshutoshMore142k4/assignmen.git`
3. Configure the service:
   - **Name**: `todo-backend` (or your preferred name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Configure Environment Variables

Add these environment variables in Render dashboard:

```
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/todo-board
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters-long
JWT_EXPIRES_IN=7d
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-domain.vercel.app
PORT=10000
```

### Step 4: Set Up MongoDB Atlas

1. Go to [mongodb.com](https://mongodb.com)
2. Create free account and cluster
3. Create database user with read/write permissions
4. Get connection string and replace in MONGODB_URI

### Step 5: Deploy

1. Click "Create Web Service"
2. Wait for build to complete (5-10 minutes)
3. Your API will be available at: `https://your-service-name.onrender.com`

## Alternative: Deploy to Railway

### Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

### Step 2: Deploy

1. Click "New Project" → "Deploy from GitHub repo"
2. Select your repository
3. Set root directory to `backend`
4. Add environment variables (same as above)
5. Deploy automatically

## Environment Variables Reference

| Variable         | Description                          | Required              |
| ---------------- | ------------------------------------ | --------------------- |
| `MONGODB_URI`    | MongoDB connection string            | Yes                   |
| `JWT_SECRET`     | Secret key for JWT tokens            | Yes                   |
| `JWT_EXPIRES_IN` | JWT token expiration time            | No (default: 7d)      |
| `NODE_ENV`       | Environment (production/development) | No                    |
| `CORS_ORIGIN`    | Frontend URL for CORS                | Yes                   |
| `PORT`           | Server port                          | No (Render sets this) |

## API Endpoints

Once deployed, your API will be available at:

- **Health Check**: `GET /api/health`
- **Auth**: `POST /api/auth/register`, `POST /api/auth/login`
- **Tasks**: `GET /api/tasks`, `POST /api/tasks`, `PUT /api/tasks/:id`, `DELETE /api/tasks/:id`
- **Actions**: `GET /api/actions`

## Update Frontend Configuration

After deployment, update your frontend environment variables:

```typescript
// frontend/src/config/environment.ts
export const API_BASE_URL = "https://your-backend-url.onrender.com";
```

## Troubleshooting

### Common Issues:

1. **Build fails**: Check if all dependencies are in `package.json`
2. **MongoDB connection fails**: Verify connection string and network access
3. **CORS errors**: Ensure CORS_ORIGIN matches your frontend URL exactly
4. **JWT errors**: Make sure JWT_SECRET is at least 32 characters long

### Logs:

- View logs in Render dashboard under "Logs" tab
- Check for any error messages during build or runtime
