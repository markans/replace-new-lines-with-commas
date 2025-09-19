# 🚀 Localhost Setup Guide

This guide will help you run the **Newline to Comma Converter** tool on your local machine.

## 📋 Prerequisites

Before you begin, make sure you have the following installed on your system:

### Required Software
- **Node.js** (version 18 or higher)
  - Download from: https://nodejs.org/
  - Verify installation: `node --version` and `npm --version`

### Optional (Recommended)
- **Git** - for cloning the repository
  - Download from: https://git-scm.com/
- **VS Code** - for code editing
  - Download from: https://code.visualstudio.com/

## 📥 Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/markans/replace-new-lines-with-commas.git

# Navigate to the project directory
cd replace-new-lines-with-commas
```

**Alternative**: Download ZIP from GitHub if you don't have Git installed.

## 📦 Step 2: Install Dependencies

```bash
# Install all project dependencies
npm install
```

This will install:
- `hono` - Web framework
- `@hono/vite-cloudflare-pages` - Vite plugin for Cloudflare Pages
- `wrangler` - Cloudflare development tools
- `vite` - Build tool
- `typescript` - TypeScript compiler

## 🔧 Step 3: Choose Your Development Method

You have **3 options** to run the project locally:

### Option A: Vite Dev Server (Recommended for Local Development)

This is the fastest method for local development with hot reloading:

```bash
# Start Vite development server
npm run dev
```

**Access:** http://localhost:5173/

**Features:**
- ⚡ Instant hot reloading
- 🔥 Fast development experience
- 📱 Automatic browser refresh on changes

---

### Option B: Wrangler Pages Dev (Cloudflare Simulation)

This simulates the Cloudflare Pages environment locally:

```bash
# Build the project first
npm run build

# Start Wrangler development server
npm run preview
```

**Access:** http://localhost:8788/

**Features:**
- 🌐 Exact Cloudflare Pages environment
- ✅ Production-like testing
- 🔄 Matches deployed behavior

---

### Option C: Custom Local Server

If you want to use a custom port or specific configuration:

```bash
# Build the project
npm run build

# Run on custom port (e.g., port 3000)
npx wrangler pages dev dist --port 3000 --ip 127.0.0.1
```

**Access:** http://localhost:3000/

## 🎯 Step 4: Verify It's Working

1. **Open your browser** and navigate to the URL from your chosen method
2. **You should see** the Newline to Comma Converter interface
3. **Test the functionality:**
   - Paste some text with line breaks in the input box
   - Verify the output appears with commas
   - Test the copy to clipboard functionality
   - Try different options (trim whitespace, quotes, etc.)

## 📝 Development Scripts

Here are all the available npm scripts:

```bash
# Development
npm run dev          # Start Vite dev server (hot reload)
npm run build        # Build for production
npm run preview      # Preview production build

# Custom development commands
npm run dev:3000     # Run on port 3000 (if added)
npm run dev:local    # Local development with custom config

# Production deployment
npm run deploy       # Deploy to Cloudflare Pages
```

## 🔧 Project Structure

```
📁 replace-new-lines-with-commas/
├── 📄 src/
│   ├── index.tsx           # Main Hono application
│   └── renderer.tsx        # HTML template with JavaScript
├── 📁 public/
│   └── static/
│       └── style.css       # Custom CSS styles
├── 📁 dist/                # Built files (created after npm run build)
├── 📄 package.json         # Project configuration
├── 📄 tsconfig.json       # TypeScript configuration
├── 📄 vite.config.ts      # Vite build configuration
├── 📄 wrangler.jsonc      # Cloudflare configuration
└── 📄 README.md           # Project documentation
```

## 🛠 Troubleshooting

### Common Issues and Solutions

#### 1. "npm: command not found"
**Problem:** Node.js is not installed or not in PATH.
**Solution:** 
- Download and install Node.js from https://nodejs.org/
- Restart your terminal after installation
- Verify with `node --version`

#### 2. "Port already in use"
**Problem:** Another service is using the port.
**Solution:**
```bash
# Kill process on port (macOS/Linux)
lsof -ti:5173 | xargs kill -9

# Or use a different port
npx vite --port 3001
```

**Windows:**
```bash
# Find and kill process
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

#### 3. "Module not found" errors
**Problem:** Dependencies not installed properly.
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 4. Build errors
**Problem:** TypeScript or build issues.
**Solution:**
```bash
# Clean and rebuild
rm -rf dist
npm run build
```

### 5. Browser compatibility
**Requirements:**
- Modern browser with ES6+ support
- Chrome 60+, Firefox 55+, Safari 12+, Edge 79+

## 📱 Mobile Testing

To test on mobile devices on your local network:

1. **Find your local IP:**
   ```bash
   # macOS/Linux
   ifconfig | grep "inet " | grep -v 127.0.0.1
   
   # Windows
   ipconfig
   ```

2. **Start server with network access:**
   ```bash
   npx vite --host 0.0.0.0 --port 3000
   ```

3. **Access from mobile:** `http://YOUR_LOCAL_IP:3000`

## 🔄 Making Changes

### Development Workflow

1. **Edit source files** in `src/` directory
2. **Changes auto-reload** (with Vite dev server)
3. **Test functionality** in browser
4. **Build for production** when ready:
   ```bash
   npm run build
   ```

### Key Files to Modify

- **`src/index.tsx`** - Main application logic and HTML structure
- **`src/renderer.tsx`** - HTML template and JavaScript functionality  
- **`public/static/style.css`** - Custom CSS styles
- **`package.json`** - Dependencies and scripts

## 🚀 Deployment Options

Once you're satisfied with local development:

### 1. Cloudflare Pages (Recommended)
```bash
# Install wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run deploy
```

### 2. Static Hosting (Netlify, Vercel, etc.)
```bash
# Build static files
npm run build

# Upload the 'dist' folder to your hosting service
```

### 3. Node.js Hosting
The app can run on any Node.js hosting platform (Railway, Render, etc.)

## 📞 Need Help?

- **GitHub Issues:** https://github.com/markans/replace-new-lines-with-commas/issues
- **Documentation:** Check `README.md` for feature details
- **Hono Docs:** https://hono.dev/
- **Vite Docs:** https://vitejs.dev/

## ✅ Quick Start Checklist

- [ ] Node.js installed (18+)
- [ ] Repository cloned/downloaded
- [ ] Dependencies installed (`npm install`)
- [ ] Development server started (`npm run dev`)
- [ ] Tool accessible in browser
- [ ] Basic functionality tested

**You're ready to go! 🎉**

The tool should now be running locally and ready for development or use.