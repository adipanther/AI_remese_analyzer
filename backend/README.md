# Backend - AI Resume Analyzer

Backend API for the AI Resume Analyzer application built with Node.js, Express.js, and MongoDB.

## Features

- RESTful API architecture
- PDF text extraction using pdf-parse
- Intelligent skill matching algorithm
- MongoDB integration with Mongoose
- File upload handling with Multer
- Error handling middleware
- CORS enabled for frontend integration

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/resume_analyzer
NODE_ENV=development
```

## Running the Server

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Endpoints

### POST /api/resume/analyze
Upload and analyze a resume

**Request:**
- Content-Type: multipart/form-data
- Body: 
  - name (string)
  - email (string)
  - jobRole (string)
  - resume (file - PDF)

**Response:**
```json
{
  "success": true,
  "message": "Resume analyzed successfully",
  "data": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "jobRole": "MERN Developer",
    "matchPercentage": 75,
    "matchedSkills": [...],
    "missingSkills": [...],
    "suggestions": [...],
    "totalRequired": 30,
    "matchedRequired": 22,
    "matchedOptional": 5
  }
}
```

### GET /api/resume/job-roles
Get all available job roles

### GET /api/resume/history
Get resume analysis history (optional query: ?email=user@example.com)

### GET /api/resume/:id
Get specific resume analysis by ID

### DELETE /api/resume/:id
Delete resume analysis and associated file

## Project Structure

```
backend/
├── config/
│   ├── db.js              # MongoDB connection
│   └── multer.js          # File upload configuration
├── controllers/
│   └── resumeController.js # Request handlers
├── middleware/
│   └── errorHandler.js     # Error handling
├── models/
│   ├── User.js            # User schema
│   └── Resume.js          # Resume schema
├── routes/
│   └── resumeRoutes.js    # API routes
├── utils/
│   └── skillMatcher.js    # Skill matching logic
├── uploads/                # Uploaded files
├── .env                    # Environment variables
├── .gitignore
├── package.json
└── server.js              # Entry point
```

## Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **multer**: File upload middleware
- **pdf-parse**: PDF text extraction
- **cors**: Cross-origin resource sharing
- **dotenv**: Environment configuration
- **express-validator**: Input validation

## Development Dependencies

- **nodemon**: Auto-restart server on changes

## Skill Matching Algorithm

The skill matcher uses keyword-based matching with the following logic:

1. Extract text from uploaded PDF
2. Convert text to lowercase for case-insensitive matching
3. Match against predefined skill arrays for the selected job role
4. Calculate match percentage: `(matched_required / total_required) × 100`
5. Identify missing skills
6. Generate personalized suggestions based on match percentage

## Job Roles & Skills

### MERN Developer
Required: MongoDB, Express.js, React.js, Node.js, JavaScript, HTML, CSS, REST API, Git, etc.
Optional: TypeScript, Next.js, Redux, Material-UI, Docker, AWS, etc.

### Java Developer
Required: Java, Spring Boot, Hibernate, JPA, MySQL, REST API, Maven, etc.
Optional: Spring Security, Kafka, Docker, Kubernetes, AWS, etc.

### Data Analyst
Required: Python, SQL, Excel, Statistics, Pandas, Tableau, Power BI, etc.
Optional: R, Machine Learning, Spark, Hadoop, AWS, etc.

### Python Developer
Required: Python, Django, Flask, REST API, SQL, OOP, Git, etc.
Optional: Celery, Redis, Docker, AWS, Machine Learning, etc.

### DevOps Engineer
Required: Linux, Docker, Kubernetes, Git, CI/CD, Jenkins, AWS, Terraform, etc.
Optional: Azure, GCP, Prometheus, Grafana, Helm, etc.

## Error Handling

The API uses custom error handling middleware to handle:
- Multer errors (file upload issues)
- Mongoose validation errors
- Duplicate key errors
- General server errors

## Security Considerations

For production deployment:
- Add rate limiting
- Implement authentication (JWT)
- Validate and sanitize all inputs
- Use HTTPS
- Implement file type validation
- Add virus scanning for uploaded files
- Use environment-specific configurations

## Testing

To test the API, you can use:
- Postman
- Thunder Client (VS Code extension)
- cURL commands

Example cURL:
```bash
curl -X POST http://localhost:5000/api/resume/analyze \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "jobRole=MERN Developer" \
  -F "resume=@/path/to/resume.pdf"
```

## License

MIT
