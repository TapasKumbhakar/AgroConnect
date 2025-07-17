#!/bin/bash

echo "🌾 Setting up Agricultural Resource Management System (ARMS)"
echo "============================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running. Please start MongoDB first."
    echo "   You can start MongoDB with: mongod"
fi

echo "📦 Installing backend dependencies..."
npm install

echo "📦 Installing frontend dependencies..."
cd client
npm install
cd ..

echo "🎉 Setup complete!"
echo ""
echo "🚀 To start the application:"
echo "   1. Start the backend: npm start"
echo "   2. In another terminal, start the frontend: cd client && npm start"
echo ""
echo "🌐 Access the application:"
echo "   - React Frontend: http://localhost:3000"
echo "   - Legacy Frontend: http://localhost:5000" 
echo "   - API: http://localhost:5000/api"
echo ""
echo "📚 Don't forget to configure your .env/.env file with your MongoDB connection string!"
