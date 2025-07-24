"use client"

import { useState, useRef } from "react"
import axios from "axios"
import { Upload, FileText, Linkedin, Brain, CheckCircle, AlertCircle, Download, X, RotateCcw } from "lucide-react"

export default function Home() {
  const [file, setFile] = useState(null)
  const [previewURL, setPreviewURL] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")
  const inputRef = useRef(null)

  const handleFileChange = (e) => {
    const selected = e.target.files[0]
    if (selected && selected.type === "application/pdf") {
      setFile(selected)
      setPreviewURL(URL.createObjectURL(selected))
      setResult(null)
      setError("")
    } else {
      setError("Only PDF files are supported.")
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please upload a PDF resume.")
      return
    }

    setLoading(true)
    setError("")
    const formData = new FormData()
    formData.append("resume", file)

    try {
      // const res = await axios.post("http://localhost:5000/api/resume/upload", formData, {
      const res = await axios.post("https://ai-resume-reviewer-xdz5.onrender.com/api/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed.")
    } finally {
      setLoading(false)
    }
  }

  // Add a handler for reanalyze
  const handleReanalyze = async () => {
    if (!file) {
      setError("Please upload a PDF resume.")
      return
    }
    setLoading(true)
    setError("")
    const formData = new FormData()
    formData.append("resume", file)
    try {
      const res = await axios.post("https://ai-resume-reviewer-xdz5.onrender.com/api/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed.")
    } finally {
      setLoading(false)
    }
  }

  const renderSkills = (skills) => {
    if (!skills || typeof skills !== "object") return null

    return (
      <div className="space-y-2">
        {Object.entries(skills).map(([skill, hasSkill]) => (
          <div key={skill} className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-gray-300 text-sm sm:text-base">{skill.replace(/([A-Z])/g, " $1").trim()}</span>
          </div>
        ))}
      </div>
    )
  }

  const renderExperience = (experience) => {
    if (!Array.isArray(experience)) return null

    return (
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="border-l-2 border-blue-500 pl-3 sm:pl-4">
            <h4 className="text-base sm:text-lg font-semibold text-white">{exp.Position}</h4>
            <p className="text-blue-400 font-medium text-sm sm:text-base">{exp.Company}</p>
            <p className="text-gray-400 text-xs sm:text-sm mb-3">{exp.Duration}</p>
            <ul className="space-y-1">
              {exp.Responsibilities?.map((resp, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-300 text-xs sm:text-sm">{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    )
  }

  const renderEducation = (education) => {
    if (!education || typeof education !== "object") return null

    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-white font-semibold text-sm sm:text-base">{education.Degree}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4"></div>
          <span className="text-blue-400 text-sm sm:text-base">{education.Institute}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4"></div>
          <span className="text-gray-400 text-xs sm:text-sm">{education.Duration}</span>
        </div>
        {education.Activities && (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4"></div>
            <span className="text-gray-300 text-xs sm:text-sm">Activities: {education.Activities}</span>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
              <h1 className="text-lg sm:text-xl font-bold text-white">AI Resume Reviewer</h1>
            </div>
            <div className="hidden sm:flex items-center space-x-4 ">
              <a
                href="https://www.linkedin.com/in/muhammadahtasham/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5 text-blue-500 hover:text-blue-400 transition-colors" />
              </a>
              <a
                href="https://atiiisham.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-semibold text-blue-400 animate-pulse hover:text-white transition duration-100 relative group"
              >
                Muhammad Ahtasham
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </a>

            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 justify-center min-h-[calc(100vh-64px)]">

        {!file ? (
          /* Upload Section */
          <div className="max-w-2xl mx-auto h-full flex items-center justify-center min-h-[calc(100vh-164px)]">
            <div className="bg-gray-800 rounded-lg shadow-xl p-4 sm:p-8 border border-gray-700">
              <div className="text-center mb-6 sm:mb-8">
                <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400 mx-auto mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Upload Your Resume</h2>
                <p className="text-gray-400 text-sm sm:text-base">
                  Get AI-powered feedback and suggestions to improve your resume
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Select PDF Resume</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    ref={inputRef}
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>

                {error && (
                  <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-800">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm">{error}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Split Layout - Mobile Optimized */
          <div
            className={
              result && result.feedback && result.suggestions
                ? "flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-8 min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-12rem)]"
                : "flex flex-col lg:grid lg:grid-cols-2 gap-4 sm:gap-8 min-h-[calc(100vh-8rem)] sm:min-h-[calc(100vh-12rem)]"
            }
          >
            {/* PDF Preview */}
            <div
              className={
                result && result.feedback && result.suggestions
                  ? "bg-gray-800 rounded-lg shadow-xl border border-gray-700 flex flex-col h-96 lg:col-span-1 lg:min-w-0 lg:w-full"
                  : "bg-gray-800 rounded-lg shadow-xl border border-gray-700 flex flex-col h-96 lg:h-auto"
              }
              style={
                result && result.feedback && result.suggestions
                  ? { minWidth: 0, width: "100%", flex: 1, maxWidth: "100%" }
                  : {}
              }
            >
              <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-700">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-white font-medium text-sm sm:text-base truncate">{file?.name}</span>
                </div>
                {/* <button
                  onClick={() => {
                    setFile(null)
                    setPreviewURL(null)
                    setResult(null)
                    setError("")
                  }}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                </button> */}
                <button
                  onClick={() => {
                    setFile(null)
                    setPreviewURL(null)
                    setResult(null)
                    setError("")
                  }}
                  className="text-gray-400 hover:text-red-400 transition-colors p-1"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <div className="flex-1 p-2 sm:p-4">
                {previewURL && (
                  <iframe
                    src={previewURL}
                    className="w-full h-full border border-gray-600 rounded-lg"
                    title="Resume Preview"
                  />
                )}
              </div>
              <div className="p-3 sm:p-4 border-t border-gray-700">
                <div className="flex flex-row gap-2">
                  <button
                    onClick={handleUpload}
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 w-4 sm:w-5 sm:h-5" />
                        <span>Analyze Resume</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleReanalyze}
                    disabled={loading}
                    title="Reanalyze Resume"
                    className="bg-gray-700 text-blue-400 hover:bg-blue-800 hover:text-blue-300 transition-colors rounded-full p-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ minWidth: '44px', minHeight: '44px' }}
                  >
                    <RotateCcw className={loading ? "animate-spin" : ""} />
                  </button>
                </div>
              </div>
            </div>

            {/* Results */}
            {result && result.feedback && result.suggestions ? (
              <>
                {/* Feedback Section */}
                <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 flex flex-col min-h-96 lg:h-auto lg:col-span-1" style={{ width: "100%", flex: 1, maxWidth: "100%" }}>
                  <div className="p-3 sm:p-4 border-b border-gray-700">
                    <h3 className="text-base sm:text-lg font-semibold text-white flex items-center space-x-2">
                      <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      <span>AI Analysis Feedback</span>
                    </h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                    {loading && result ? (
                      <div className="flex items-center justify-center h-full min-h-48">
                        <div className="text-center">
                          <svg
                            className="animate-spin h-8 w-8 sm:h-12 sm:w-12 text-blue-400 mx-auto mb-4"
                            viewBox="0 0 24 24"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          <p className="text-gray-300 text-sm sm:text-base">Analyzing your resume...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6 sm:space-y-8">
                        <div>
                          <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                            <span>Feedback</span>
                          </h4>
                          <div className="bg-gray-700 p-3 sm:p-4 rounded-lg border border-gray-600">
                            <p className="text-gray-300 whitespace-pre-line leading-relaxed text-sm sm:text-base">
                              {result.feedback}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* Suggestions Section */}
                <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 flex flex-col min-h-96 lg:h-auto lg:col-span-1" style={{ width: "100%", flex: 1, maxWidth: "100%" }}>
                  <div className="p-3 sm:p-4 border-b border-gray-700">
                    <h3 className="text-base sm:text-lg font-semibold text-white flex items-center space-x-2">
                      <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                      <span>AI Suggestions</span>
                    </h3>
                  </div>
                  <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                    {loading && result ? (
                      <div className="flex items-center justify-center h-full min-h-48">
                        <div className="text-center">
                          <svg
                            className="animate-spin h-8 w-8 sm:h-12 sm:w-12 text-blue-400 mx-auto mb-4"
                            viewBox="0 0 24 24"
                          >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          <p className="text-gray-300 text-sm sm:text-base">Analyzing your resume...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6 sm:space-y-8">
                        <div>
                          <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                            <span>Suggestions for Improvement</span>
                          </h4>
                          <div className="bg-gray-700 p-3 sm:p-4 rounded-lg border border-gray-600">
                            <p className="text-gray-300 whitespace-pre-line leading-relaxed text-sm sm:text-base">
                              {result.suggestions}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 flex flex-col min-h-96 lg:h-auto">
                <div className="p-3 sm:p-4 border-b border-gray-700">
                  <h3 className="text-base sm:text-lg font-semibold text-white flex items-center space-x-2">
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    <span>AI Analysis Results</span>
                  </h3>
                </div>
                <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                  {loading && (
                    <div className="flex items-center justify-center h-full min-h-48">
                      <div className="text-center">
                        <svg
                          className="animate-spin h-8 w-8 sm:h-12 sm:w-12 text-blue-400 mx-auto mb-4"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <p className="text-gray-300 text-sm sm:text-base">Analyzing your resume...</p>
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="flex items-start space-x-2 text-red-400 bg-red-900/20 p-3 sm:p-4 rounded-lg border border-red-800">
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base">{error}</span>
                    </div>
                  )}
                  {result && (
                    <div className="space-y-6 sm:space-y-8">
                      {/* Feedback Section */}
                      {result.feedback && (
                        <div>
                          <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                            <span>Feedback</span>
                          </h4>
                          <div className="bg-gray-700 p-3 sm:p-4 rounded-lg border border-gray-600">
                            <p className="text-gray-300 whitespace-pre-line leading-relaxed text-sm sm:text-base">
                              {result.feedback}
                            </p>
                          </div>
                        </div>
                      )}
                      {/* Suggestions Section */}
                      {result.suggestions && (
                        <div>
                          <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                            <span>Suggestions for Improvement</span>
                          </h4>
                          <div className="bg-gray-700 p-3 sm:p-4 rounded-lg border border-gray-600">
                            <p className="text-gray-300 whitespace-pre-line leading-relaxed text-sm sm:text-base">
                              {result.suggestions}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {!loading && !result && !error && (
                    <div className="flex items-center justify-center h-full min-h-48 text-gray-400">
                      <div className="text-center">
                        <Brain className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-sm sm:text-base">Click &quot;Analyze Resume&quot; to get AI-powered insights</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
