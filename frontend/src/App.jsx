import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "https://ai-resume-analyzer-crtg.onrender.com/analyze",
        formData
      );

      setResult(res.data);
      setLoading(false);

    } catch (err) {
      setLoading(false);
      alert("Analysis Failed");
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">

        <div className="text-center mb-5">
          <h1 className="fw-bold text-primary">AI Resume Analyzer</h1>
          <p className="text-muted">
            Upload your resume and get ATS score, skills analysis, Gemini AI feedback, and interview questions.
          </p>
        </div>

        <div className="card shadow p-4 mx-auto mb-5" style={{ maxWidth: "700px" }}>
          <label className="form-label fw-semibold">Upload Resume PDF</label>

          <input
            type="file"
            accept=".pdf"
            className="form-control mb-3"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            className="btn btn-primary w-100"
            onClick={uploadResume}
            disabled={loading}
          >
            {loading ? "Analyzing with Gemini AI..." : "Analyze Resume"}
          </button>
        </div>

        {result && (
          <div>
            <div className="card shadow text-center p-4 mb-4">
              <h3>ATS Score</h3>
              <h1 className="display-3 text-success fw-bold">
                {result.atsScore}/100
              </h1>
            </div>

            <div className="card shadow p-4 mb-4">
              <h4 className="text-primary">Gemini AI Feedback</h4>
              <pre style={{
                whiteSpace: "pre-wrap",
                fontFamily: "Segoe UI",
                fontSize: "16px"
              }}>
                {result.geminiFeedback}
              </pre>
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="card shadow h-100 p-3">
                  <h4 className="text-success">Skills Found</h4>
                  <div>
                    {result.foundSkills.map((skill, index) => (
                      <span key={index} className="badge bg-success me-2 mb-2">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card shadow h-100 p-3">
                  <h4 className="text-danger">Missing Skills</h4>
                  <div>
                    {result.missingSkills.map((skill, index) => (
                      <span key={index} className="badge bg-danger me-2 mb-2">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card shadow h-100 p-3">
                  <h4 className="text-info">Rule-Based Suggestions</h4>
                  <ul>
                    {result.suggestions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card shadow h-100 p-3">
                  <h4 className="text-warning">Basic Interview Questions</h4>
                  <ul>
                    {result.interviewQuestions.map((q, index) => (
                      <li key={index}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;