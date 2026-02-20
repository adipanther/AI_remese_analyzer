# Frontend - AI Resume Analyzer

React.js frontend application for the AI Resume Analyzer system.

## Features

- Modern, responsive UI
- File upload with drag-and-drop support
- Real-time form validation
- Interactive data visualization with Chart.js
- Loading states and error handling
- Mobile-friendly design

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

```bash
# Development mode
npm start

# Build for production
npm run build

# Run tests
npm test
```

The application will open at `http://localhost:3000`

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js          # App header
│   │   ├── Footer.js          # App footer
│   │   ├── UploadForm.js      # Resume upload form
│   │   ├── Results.js         # Analysis results display
│   │   └── MatchChart.js      # Chart.js visualizations
│   ├── services/
│   │   └── api.js             # API integration
│   ├── App.js                 # Main component
│   ├── App.css                # Main styles
│   ├── index.js               # Entry point
│   └── index.css              # Global styles
├── .env
├── .gitignore
└── package.json
```

## Components

### Header
Displays the application title and tagline.

### UploadForm
- Name input field
- Email input field with validation
- Job role dropdown (dynamically loaded from API)
- Resume file upload (PDF only, max 5MB)
- Form validation
- Error display
- Submit button with loading state

### Results
- Match percentage with color-coded visual indicator
- Matched skills display (green tags)
- Missing skills display (red tags)
- Improvement suggestions list
- Analysis details
- "Analyze Another Resume" button

### MatchChart
- Doughnut chart: Overall match percentage
- Bar chart: Skills breakdown (matched required, missing, optional)
- Interactive tooltips
- Responsive design

## Styling

The application uses custom CSS with:
- CSS Grid and Flexbox for layouts
- CSS animations for smooth transitions
- Gradient backgrounds
- Card-based design
- Color-coded elements for better UX
- Responsive breakpoints for mobile devices

### Color Scheme
- Primary: Purple gradient (#667eea to #764ba2)
- Success: Green (#d4edda)
- Error: Red (#f8d7da)
- Info: Blue (#d1ecf1)

## API Integration

The application communicates with the backend API using Axios.

### API Functions (services/api.js)

```javascript
analyzeResume(formData)      // Upload and analyze resume
getJobRoles()                // Fetch available job roles
getResumeHistory(email)      // Get analysis history
getResumeById(id)            // Get specific analysis
deleteResume(id)             // Delete analysis
```

## State Management

The application uses React Hooks for state management:
- `useState` for local component state
- `useEffect` for side effects (API calls)

## Form Validation

Client-side validation includes:
- Name: Required, non-empty
- Email: Required, valid email format
- Job Role: Required, must be selected
- Resume: Required, PDF only, max 5MB

## Charts

Using Chart.js with react-chartjs-2:

1. **Doughnut Chart**: Shows match vs missing percentage
2. **Bar Chart**: Shows skills breakdown by category

## Responsive Design

Breakpoints:
- Desktop: > 768px (default)
- Mobile: ≤ 768px
  - Single column layout
  - Smaller fonts
  - Adjusted padding and spacing

## Dependencies

- **react**: UI library
- **react-dom**: React DOM rendering
- **axios**: HTTP client
- **chart.js**: Charting library
- **react-chartjs-2**: React wrapper for Chart.js
- **react-router-dom**: Routing (optional for future expansion)
- **react-icons**: Icon library

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Lazy loading for components (future enhancement)
- Optimized images and assets
- Minified production build
- Code splitting

## Accessibility

- Semantic HTML
- ARIA labels (can be improved)
- Keyboard navigation support
- Color contrast compliance

## Future Enhancements

- User authentication
- Dashboard with history
- Dark mode
- Multi-language support
- Progressive Web App (PWA)
- Offline support
- Enhanced animations

## Troubleshooting

### Cannot connect to API
- Verify backend is running on port 5000
- Check REACT_APP_API_URL in .env file
- Ensure CORS is enabled on backend

### File upload fails
- Check file is PDF format
- Verify file size is under 5MB
- Ensure backend uploads directory exists

### Charts not displaying
- Verify chart.js is installed
- Check browser console for errors
- Ensure results data structure is correct

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Deployment Options

- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop build folder
- **GitHub Pages**: Use gh-pages package
- **AWS S3**: Upload build folder to S3 bucket

## License

MIT
