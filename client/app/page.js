"use client";
import { useState, useRef } from "react";
import axios from "axios";

export default function Home() {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setPreviewURL(URL.createObjectURL(selected));
      setResult(null);
      setError("");
    } else {
      setError("Only PDF files are supported.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please upload a PDF resume.");
      return;
    }

    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post("http://localhost:5000/api/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-1/2">
      <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">📄 AI Resume Reviewer</h1>

        <input
          type="file"
          accept="application/pdf"
          ref={inputRef}
          onChange={handleFileChange}
          className="block w-full mb-4 text-sm text-gray-700"
        />

        {previewURL && (
          <iframe
            src={previewURL}
            className="w-full h-64 mb-4 border rounded"
            title="Resume Preview"
          ></iframe>
        )}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Analyzing...
            </div>
          ) : (
            "Upload & Analyze"
          )}
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {result && (
          <div className="mt-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold">🔍 Extracted Sections</h2>
              <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">{JSON.stringify(result.sections, null, 2)}</pre>
            </div>
            <div>
              <h2 className="text-lg font-semibold">⚠️ Feedback</h2>
              <p className="bg-gray-100 p-2 rounded text-sm whitespace-pre-line">{result.feedback}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">✅ Suggestions</h2>
              <p className="bg-gray-100 p-2 rounded text-sm whitespace-pre-line">{result.suggestions}</p>
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

// import { useState } from "react";
// import axios from "axios";

// export default function Home() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setResult(null);
//     setError("");
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please upload a PDF resume.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await axios.post("http://localhost:5000/api/resume/upload", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setResult(res.data);
//     } catch (err) {
//       setError(err.response?.data?.error || "Upload failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
//       <h1>📄 AI Resume Reviewer</h1>

//       <input type="file" accept="application/pdf" onChange={handleFileChange} />
//       <br />
//       <button onClick={handleUpload} disabled={loading} style={{ marginTop: "1rem" }}>
//         {loading ? "Analyzing..." : "Upload & Analyze"}
//       </button>

//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {result && (
//         <div style={{ marginTop: "2rem" }}>
//           <h2>🔍 Extracted Sections</h2>
//           <pre>{JSON.stringify(result.sections, null, 2)}</pre>

//           <h2>⚠️ Feedback</h2>
//           <pre>{result.feedback}</pre>

//           <h2>✅ Suggestions</h2>
//           <pre>{result.suggestions}</pre>
//         </div>
//       )}
//     </div>
//   );
// }
