#!/bin/bash

# Frontend Build Script
echo "🚀 Starting frontend build..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build output: dist/"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi 