# Development Commands Reference

## Backend Commands

### Initial Setup
```bash
cd backend
npm install
```

### Running the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### Environment Setup
```bash
# Windows PowerShell
$env:NODE_ENV="development"
$env:PORT="5000"
$env:MONGODB_URI="mongodb://localhost:27017/resume_analyzer"

# Linux/Mac
export NODE_ENV=development
export PORT=5000
export MONGODB_URI=mongodb://localhost:27017/resume_analyzer
```

### MongoDB Commands
```bash
# Windows
net start MongoDB
net stop MongoDB

# Mac
brew services start mongodb-community
brew services stop mongodb-community

# Linux
sudo systemctl start mongod
sudo systemctl stop mongod
sudo systemctl status mongod

# Connect to MongoDB shell
mongo
mongosh

# Show databases
show dbs

# Use database
use resume_analyzer

# Show collections
show collections

# View resumes
db.resumes.find().pretty()

# Count resumes
db.resumes.count()

# Delete all resumes
db.resumes.deleteMany({})

# Drop database
db.dropDatabase()
```

## Frontend Commands

### Initial Setup
```bash
cd frontend
npm install
```

### Running the App
```bash
# Development mode
npm start

# Build for production
npm run build

# Run tests
npm test

# Run on different port
PORT=3001 npm start
```

### Clear Cache
```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install

# Linux/Mac
rm -rf node_modules package-lock.json
npm install
```

## Git Commands

### Initial Setup
```bash
git init
git add .
git commit -m "Initial commit: AI Resume Analyzer"
```

### Branch Management
```bash
# Create new branch
git checkout -b feature/new-feature

# Switch branch
git checkout main

# List branches
git branch

# Delete branch
git branch -d feature/old-feature
```

### Common Workflows
```bash
# Check status
git status

# Add files
git add .
git add filename.js

# Commit
git commit -m "Description of changes"

# Push
git push origin main

# Pull
git pull origin main

# View log
git log --oneline
```

## Testing Commands

### Test Backend API with cURL

#### Get Job Roles
```bash
curl http://localhost:5000/api/resume/job-roles
```

#### Analyze Resume
```bash
# Windows PowerShell
curl -X POST http://localhost:5000/api/resume/analyze `
  -F "name=John Doe" `
  -F "email=john@example.com" `
  -F "jobRole=MERN Developer" `
  -F "resume=@C:\path\to\resume.pdf"

# Linux/Mac
curl -X POST http://localhost:5000/api/resume/analyze \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "jobRole=MERN Developer" \
  -F "resume=@/path/to/resume.pdf"
```

#### Get History
```bash
curl http://localhost:5000/api/resume/history

# With email filter
curl "http://localhost:5000/api/resume/history?email=john@example.com"
```

#### Get by ID
```bash
curl http://localhost:5000/api/resume/YOUR_RESUME_ID
```

#### Delete Resume
```bash
curl -X DELETE http://localhost:5000/api/resume/YOUR_RESUME_ID
```

## NPM Package Management

### Backend Dependencies
```bash
# Install all dependencies
npm install

# Install specific package
npm install express
npm install mongoose

# Install dev dependency
npm install --save-dev nodemon

# Update packages
npm update

# Check outdated packages
npm outdated

# Audit security
npm audit
npm audit fix
```

### Frontend Dependencies
```bash
# Install all dependencies
npm install

# Install specific packages
npm install axios
npm install chart.js react-chartjs-2

# Update React
npm install react@latest react-dom@latest

# Check bundle size
npm run build
```

## Troubleshooting Commands

### Check Versions
```bash
node --version
npm --version
mongo --version
mongod --version
```

### Kill Process on Port
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Linux/Mac
lsof -ti:5000 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Fix Permissions (Mac/Linux)
```bash
sudo chown -R $USER:$USER ~/.npm
sudo chown -R $USER:$USER .
```

## Deployment Commands

### Heroku (Backend)
```bash
# Login
heroku login

# Create app
heroku create ai-resume-analyzer-api

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_atlas_uri
heroku config:set NODE_ENV=production

# Deploy
git push heroku main

# View logs
heroku logs --tail

# Open app
heroku open
```

### Vercel (Frontend)
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

### MongoDB Atlas Setup
```bash
# No commands needed - use web interface
# 1. Go to mongodb.com/cloud/atlas
# 2. Create free cluster
# 3. Create database user
# 4. Whitelist IP (0.0.0.0/0 for all)
# 5. Get connection string
# 6. Update MONGODB_URI in .env
```

## Development Workflow

### Start Development
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start

# Terminal 3 - MongoDB (if needed)
mongod
```

### Before Committing
```bash
# Check for errors
npm test

# Lint code (if configured)
npm run lint

# Format code (if configured)
npm run format

# Build production
npm run build

# Commit
git add .
git commit -m "Your commit message"
git push
```

## Useful npm Scripts (Add to package.json)

### Backend package.json scripts
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"No tests yet\"",
    "seed": "node scripts/seedDatabase.js"
  }
}
```

### Frontend package.json scripts
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "deploy": "npm run build && vercel --prod"
  }
}
```

## Quick Reference

### Start Everything
```bash
# 1. Start MongoDB
net start MongoDB

# 2. Start Backend (new terminal)
cd backend && npm run dev

# 3. Start Frontend (new terminal)
cd frontend && npm start
```

### Stop Everything
```bash
# Press Ctrl+C in each terminal
# Stop MongoDB
net stop MongoDB
```

### Reset Project
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json build
npm install

# Database
mongo
use resume_analyzer
db.dropDatabase()
```

---

**Keep this file handy for quick reference! 📝**
