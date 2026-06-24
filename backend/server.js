const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

let ai = null;

if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });

  console.log(
    "Gemini Key Loaded:",
    process.env.GEMINI_API_KEY.substring(0, 10) + "..."
  );
} else {
  console.log("Gemini API key not found in backend/.env");
}

app.get("/", (req, res) => {
  res.send("AI Resume Analyzer Backend Running");
});

app.post("/analyze", upload.single("resume"), async (req, res) => {
  let filePath = "";

  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No resume uploaded"
      });
    }

    filePath = req.file.path;

    const pdfBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(pdfBuffer);

    const originalText = data.text || "";
    const resumeText = originalText.toLowerCase();

    const skills = [
      "html",
      "css",
      "javascript",
      "react",
      "node",
      "express",
      "mysql",
      "mongodb",
      "python",
      "java",
      "c",
      "c++",
      "sql",
      "git",
      "github",
      "api",
      "machine learning",
      "data analysis",
      "bootstrap"
    ];

    const foundSkills = skills.filter((skill) =>
      resumeText.includes(skill)
    );

    const missingSkills = skills.filter((skill) =>
      !resumeText.includes(skill)
    );

    let score = foundSkills.length * 5;

    if (resumeText.includes("project")) score += 10;
    if (resumeText.includes("internship")) score += 10;
    if (resumeText.includes("github")) score += 10;
    if (resumeText.includes("linkedin")) score += 5;

    if (score > 100) score = 100;

    const suggestions = [];

    if (!resumeText.includes("github")) {
      suggestions.push("Add your GitHub profile link.");
    }

    if (!resumeText.includes("linkedin")) {
      suggestions.push("Add your LinkedIn profile link.");
    }

    if (!resumeText.includes("project")) {
      suggestions.push("Add at least 2 strong projects.");
    }

    if (!resumeText.includes("internship")) {
      suggestions.push("Add internship or training experience if available.");
    }

    if (missingSkills.length > 0) {
      suggestions.push(
        "Consider adding important missing skills such as: " +
          missingSkills.slice(0, 5).join(", ")
      );
    }

    suggestions.push("Use measurable achievements with numbers.");
    suggestions.push("Mention project impact, tools used, and your exact role.");
    suggestions.push(
      "Keep the resume ATS-friendly with simple headings like Skills, Projects, Education."
    );

    const interviewQuestions = [
      "Tell me about yourself.",
      "Explain one project from your resume.",
      "What technologies did you use in your project?",
      "What challenges did you face while building your project?",
      "What is REST API?",
      "Explain the difference between frontend and backend.",
      "What is database normalization?",
      "Why should we hire you?"
    ];

    let geminiFeedback =
      "Gemini feedback was not generated. Rule-based analysis is shown below.";

    if (ai) {
      try {
        const prompt = `
You are an ATS resume reviewer and technical recruiter.

Analyze this resume for a fresher engineering student.

Give the answer in this format:

1. Resume Summary
2. ATS Improvement Suggestions
3. Missing Technical Skills
4. Project Improvement Suggestions
5. Interview Questions

Keep the answer clear, short, and practical.

Resume Text:
${originalText.slice(0, 8000)}
`;

        const response = await ai.models.generateContent({
         model: "gemini-2.0-flash",
          contents: prompt
        });

        geminiFeedback =
          response.text ||
          "Gemini returned an empty response. Rule-based analysis is shown below.";

      } catch (geminiError) {
        console.log("Gemini Error:", geminiError.message);

        geminiFeedback =
          "Gemini AI feedback failed. Check API key, internet connection, or model availability.";
      }
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({
      success: true,
      atsScore: score,
      foundSkills,
      missingSkills,
      suggestions,
      interviewQuestions,
      geminiFeedback
    });

  } catch (error) {
    console.log("Server Error:", error.message);

    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(500).json({
      success: false,
      message: "Resume analysis failed"
    });
  }
});

app.listen(5001, () => {
  console.log("AI Resume Analyzer Backend running on port 5001");
});