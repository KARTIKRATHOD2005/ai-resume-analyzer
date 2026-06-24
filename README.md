# AI Resume Analyzer

An AI-powered Resume Analyzer that evaluates resumes, calculates ATS scores, detects skills, identifies missing skills, and generates interview questions.

## Features

* Upload Resume PDF
* Extract Resume Text
* ATS Score Calculation
* Skills Detection
* Missing Skills Analysis
* Resume Improvement Suggestions
* Interview Question Generation
* Gemini AI Integration (with fallback support)
* Responsive User Interface

## Tech Stack

### Frontend

* React.js
* Bootstrap
* Axios
* Vite

### Backend

* Node.js
* Express.js
* Multer
* PDF-Parse
* Gemini AI API

## Project Structure

AI-RESUME-ANALYZER

├── backend

│ ├── server.js

│ ├── package.json

│ ├── uploads

│ └── .env

├── frontend

│ ├── src

│ ├── public

│ ├── package.json

│ └── vite.config.js

└── README.md

## Installation

### Clone Repository

```bash
git clone https://github.com/KARTIKRATHOD2005/ai-resume-analyzer.git
cd ai-resume-analyzer
```

### Backend Setup

```bash
cd backend
npm install
```

Create .env file:

```env
GEMINI_API_KEY=YOUR_API_KEY
```

Run Backend:

```bash
node server.js
```

Backend runs on:

```text
http://localhost:5001
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## How It Works

1. User uploads a resume PDF.
2. Backend extracts text using PDF-Parse.
3. Skills are identified from resume content.
4. ATS score is calculated.
5. Missing skills are detected.
6. Suggestions are generated.
7. Interview questions are prepared.
8. Gemini AI provides intelligent resume feedback.

## Sample Output

### ATS Score

```text
ATS Score: 100/100
```

### Skills Found

```text
React
Node.js
Express
MySQL
Python
Java
Git
GitHub
```

### Missing Skills

```text
HTML
CSS
JavaScript
Bootstrap
Data Analysis
```

## Future Enhancements

* Resume Ranking
* Job Description Matching
* Resume Download Report
* Company Specific Analysis
* Multiple Resume Comparison
* AI Career Guidance

## Author

Kartik Rathod

Information Science and Engineering

Cambridge Institute of Technology

Bengaluru, Karnataka

GitHub: https://github.com/KARTIKRATHOD2005

## License

This project is developed for educational and learning purposes.
