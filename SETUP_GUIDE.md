# Quick Setup Guide

Follow these steps to get the AI Resume Analyzer up and running:

## Prerequisites Installation

### 1. Install Node.js
- Download from: https://nodejs.org/ (LTS version recommended)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### 2. Install MongoDB
- **Windows**: Download from https://www.mongodb.com/try/download/community
  - Run the installer
  - Install as a Windows Service
  - Verify: `mongo --version`

- **Mac**: 
  ```bash
  brew tap mongodb/brew
  brew install mongodb-community
  brew services start mongodb-community
  ```

- **Linux**:
  ```bash
  sudo apt-get install mongodb
  sudo systemctl start mongod
  sudo systemctl enable mongod
  ```

### 3. Verify MongoDB is Running
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl status mongod
```

## Project Setup

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd e:\MY_Projects\AI_resume_analyser\backend

# Install dependencies
npm install

# Verify .env file exists and has correct values
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/resume_analyzer
# NODE_ENV=development

# Start the server
npm run dev
```

**Expected Output:**
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

### Step 2: Frontend Setup

Open a **new terminal window**:

```bash
# Navigate to frontend directory
cd e:\MY_Projects\AI_resume_analyser\frontend

# Install dependencies
npm install

# Verify .env file exists and has correct values
# REACT_APP_API_URL=http://localhost:5000/api

# Start the React app
npm start
```

**Expected Output:**
- Browser opens automatically at `http://localhost:3000`
- React app is displayed

## Testing the Application

### 1. Test Backend API (Optional)

Open a browser or Postman and test:
```
GET http://localhost:5000/
```

Expected response:
```json
{
  "message": "AI Resume Analyzer API",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

### 2. Test Job Roles Endpoint

```
GET http://localhost:5000/api/resume/job-roles
```

Expected response:
```json
{
  "success": true,
  "data": [
    "MERN Developer",
    "Java Developer",
    "Data Analyst",
    "Python Developer",
    "DevOps Engineer"
  ]
}
```

### 3. Test Full Application

1. Open `http://localhost:3000`
2. Fill in the form:
   - Name: John Doe
   - Email: john@example.com
   - Job Role: Select from dropdown
   - Upload a sample resume PDF
3. Click "Analyze Resume"
4. View the results

## Creating a Sample Resume for Testing

Create a simple PDF with this content:

```
JOHN DOE
Full Stack Developer
Email: john@example.com
Phone: +1 234 567 8900

SKILLS:
- JavaScript, React, Node.js
- MongoDB, Express.js
- HTML, CSS, Git, GitHub
- REST API development
- Problem solving

EXPERIENCE:
Software Developer at Tech Company (2021-2023)
- Built web applications using MERN stack
- Developed RESTful APIs
- Worked with MongoDB databases
- Used Git for version control

EDUCATION:
Bachelor of Computer Science (2017-2021)

PROJECTS:
- E-commerce website using MERN stack
- Blog application with React and Node.js
```

Save as PDF and upload to test the system.

## Common Issues and Solutions

### Issue 1: MongoDB Connection Error

**Error:** `MongoNetworkError: connect ECONNREFUSED`

**Solution:**
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### Issue 2: Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:** Change port in `backend/.env`:
```env
PORT=5001
```

### Issue 3: Cannot Find Module

**Error:** `Cannot find module 'express'`

**Solution:**
```bash
cd backend
npm install
```

### Issue 4: CORS Error

**Error:** `Access-Control-Allow-Origin error`

**Solution:** Verify CORS is enabled in `backend/server.js` and frontend `.env` has correct API URL.

### Issue 5: PDF Parse Error

**Error:** `Could not extract text from PDF`

**Solution:**
- Ensure PDF has selectable text (not scanned images)
- Try a different PDF file
- Check PDF is not password protected

## Verification Checklist

- [ ] Node.js installed (v14+)
- [ ] MongoDB installed and running
- [ ] Backend dependencies installed (`npm install` in backend/)
- [ ] Frontend dependencies installed (`npm install` in frontend/)
- [ ] Backend .env file configured
- [ ] Frontend .env file configured
- [ ] Backend server running on port 5000
- [ ] Frontend app running on port 3000
- [ ] Can access http://localhost:3000
- [ ] Job roles dropdown loads properly
- [ ] File upload works
- [ ] Resume analysis completes successfully

## Next Steps

Once everything is working:

1. **Customize Skills**: Edit `backend/utils/skillMatcher.js` to add/modify skills
2. **Styling**: Modify `frontend/src/App.css` for custom styling
3. **Add Features**: Implement authentication, history, etc.
4. **Deploy**: Follow deployment guides in main README

## Getting Help

If you encounter issues:

1. Check the main README.md
2. Review troubleshooting sections
3. Check console logs for errors
4. Verify all dependencies are installed
5. Ensure MongoDB is running

## Development Tips

### Backend Development
- Use `npm run dev` for auto-restart on changes
- Check `backend/uploads/` for uploaded files
- Use MongoDB Compass to view database

### Frontend Development
- React auto-reloads on file changes
- Open browser DevTools for debugging
- Check Network tab for API calls

## Production Deployment

When ready for production:

1. Set `NODE_ENV=production` in backend
2. Build frontend: `npm run build`
3. Configure production database
4. Set up hosting (Heroku, AWS, Vercel, etc.)
5. Configure environment variables on hosting platform

---

**You're all set! Happy coding! 🚀**
