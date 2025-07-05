#!/bin/bash

# Backend Deployment Script
echo "🚀 Starting backend deployment..."

# Build the application
echo "📦 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🌐 Your backend is ready for deployment!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to https://render.com"
    echo "2. Create new Web Service"
    echo "3. Connect your GitHub repo: https://github.com/AshutoshMore142k4/assignmen.git"
    echo "4. Set Root Directory to: backend"
    echo "5. Set Build Command to: npm install && npm run build"
    echo "6. Set Start Command to: npm start"
    echo "7. Add environment variables (see DEPLOYMENT.md)"
    echo ""
    echo "🔗 Or deploy to Railway: https://railway.app"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi 