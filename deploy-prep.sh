#!/bin/bash

# Deployment preparation script for AgroConnect

echo "🚀 Preparing AgroConnect for deployment..."

# Navigate to client directory
cd client

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf build
rm -rf node_modules

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

echo "✅ Build completed successfully!"
echo "📁 Build files are in client/build/"

# Return to root directory
cd ..

echo "🎉 Project is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub"
echo "2. Connect your GitHub repo to Vercel"
echo "3. Set root directory to 'client' in Vercel dashboard"
echo "4. Deploy!"
