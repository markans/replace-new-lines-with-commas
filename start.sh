#!/bin/bash

# Quick start script for macOS/Linux
echo "🚀 Starting Newline to Comma Converter Tool..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher required. Current version: $(node -v)"
    echo "Please update Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🔧 Building project..."
npm run build

echo "🌐 Starting development server..."
echo "📱 Access the tool at: http://localhost:5173/"
echo "⚡ Hot reload enabled - changes will auto-refresh"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev