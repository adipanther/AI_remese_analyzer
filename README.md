# AI Resume Analyzer & Job Match System

A full-stack MERN application that analyzes resumes against job role requirements and provides match percentages, missing skills, and improvement suggestions.

## 🚀 Features

- **Resume Upload**: Upload PDF resumes for analysis
- **Multiple Job Roles**: Support for MERN Developer, Java Developer, Data Analyst, Python Developer, and DevOps Engineer
- **AI-Powered Analysis**: Intelligent skill matching using keyword-based analysis
- **Match Percentage**: Calculate compatibility score between resume and job requirements
- **Missing Skills Detection**: Identify skills gaps
- **Improvement Suggestions**: Personalized recommendations for skill enhancement
- **Visual Analytics**: Interactive charts and graphs using Chart.js
- **Modern UI**: Clean and responsive design

## 📁 Project Structure

```
AI_resume_analyser/
├── backend/
│   ├── config/
│   │   ├── db.js                 # MongoDB connection
│   │   └── multer.js             # File upload configuration
│   ├── controllers/
│   │   └── resumeController.js   # Business logic
│   ├── middleware/
│   │   └── errorHandler.js       # Error handling middleware
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Resume.js             # Resume schema
│   ├── routes/
│   │   └── resumeRoutes.js       # API routes
│   ├── utils/
│   │   └── skillMatcher.js       # Skill matching logic
│   ├── uploads/                   # Resume storage (auto-created)
│   ├── .env                       # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js                  # Entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── UploadForm.js
│   │   │   ├── Results.js
│   │   │   └── MatchChart.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Multer** - File upload handling
- **pdf-parse** - PDF text extraction
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

### Frontend
- **React.js** - UI library
- **Axios** - HTTP client
- **Chart.js** - Data visualization
- **react-chartjs-2** - React wrapper for Chart.js

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
cd e:\MY_Projects\AI_resume_analyser
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (already created, verify settings)
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/resume_analyzer
# NODE_ENV=development

# Start MongoDB (if not running)
# Windows: net start MongoDB
# Mac/Linux: sudo systemctl start mongod

# Run the server
npm start

# Or use nodemon for development
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a new terminal
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file (already created, verify settings)
# REACT_APP_API_URL=http://localhost:5000/api

# Start the development server
npm start
```

Frontend will run on `http://localhost:3000`

## 🎯 Usage

1. **Open the Application**: Navigate to `http://localhost:3000`

2. **Fill the Form**:
   - Enter your full name
   - Enter your email address
   - Select a target job role from the dropdown
   - Upload your resume (PDF format, max 5MB)

3. **Analyze**: Click "Analyze Resume" button

4. **View Results**:
   - Match percentage with visual score
   - Matched skills (green tags)
   - Missing skills (red tags)
   - Personalized improvement suggestions
   - Interactive charts showing skill distribution

5. **New Analysis**: Click "Analyze Another Resume" to start over

## 📊 API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/resume/analyze` | Upload and analyze resume |
| GET | `/resume/job-roles` | Get all available job roles |
| GET | `/resume/history` | Get analysis history |
| GET | `/resume/:id` | Get specific analysis by ID |
| DELETE | `/resume/:id` | Delete analysis |

### Example API Request

```javascript
// Analyze Resume
POST /api/resume/analyze
Content-Type: multipart/form-data

Body:
{
  name: "John Doe",
  email: "john@example.com",
  jobRole: "MERN Developer",
  resume: File (PDF)
}

Response:
{
  success: true,
  message: "Resume analyzed successfully",
  data: {
    id: "...",
    matchPercentage: 75,
    matchedSkills: [...],
    missingSkills: [...],
    suggestions: [...]
  }
}
```

## 🎓 Supported Job Roles

1. **MERN Developer**
   - MongoDB, Express.js, React.js, Node.js
   - REST APIs, JavaScript, Git, etc.

2. **Java Developer**
   - Java, Spring Boot, Hibernate
   - Microservices, SQL, Maven, etc.

3. **Data Analyst**
   - Python, SQL, Excel
   - Tableau, Power BI, Data Visualization, etc.

4. **Python Developer**
   - Django, Flask, FastAPI
   - REST APIs, PostgreSQL, etc.

5. **DevOps Engineer**
   - Docker, Kubernetes, Jenkins
   - AWS, CI/CD, Linux, etc.

## 🔧 Configuration

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume_analyzer
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🚀 Future Enhancements

### Phase 1 (Immediate)
- [ ] User authentication (JWT)
- [ ] Resume history dashboard
- [ ] Export results as PDF
- [ ] Email notifications

### Phase 2 (Advanced)
- [ ] Support for DOCX files
- [ ] Multi-language support
- [ ] NLP-based skill extraction
- [ ] Resume scoring improvements
- [ ] Job recommendations

### Phase 3 (AI Integration)
- [ ] Integration with OpenAI GPT for better analysis
- [ ] Resume improvement suggestions with AI
- [ ] Cover letter generator
- [ ] Interview question suggestions

### Phase 4 (Scalability)
- [ ] Redis caching
- [ ] AWS S3 for file storage
- [ ] Load balancing
- [ ] Microservices architecture
- [ ] Real-time analytics

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl status mongod
```

### Port Already in Use
```bash
# Backend - Change PORT in backend/.env
PORT=5001

# Frontend - Run on different port
PORT=3001 npm start
```

### PDF Parse Error
- Ensure PDF contains readable text (not scanned images)
- Verify file size is under 5MB
- Check PDF is not password protected

### CORS Error
- Verify backend URL in frontend/.env
- Check CORS is enabled in backend/server.js

## 📝 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as a minor project for academic submission.

## 🙏 Acknowledgments

- MERN Stack Community
- Chart.js Contributors
- pdf-parse Library
- Open Source Community

## 📧 Support

For issues or questions:
1. Check troubleshooting section
2. Review API documentation
3. Check MongoDB connection
4. Verify all dependencies are installed

---

**Happy Analyzing! 🎯**
