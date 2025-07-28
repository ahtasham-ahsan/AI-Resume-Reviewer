# AI Resume Reviewer

An intelligent resume analysis application that uses AI to extract information from PDF resumes, provide feedback, and suggest improvements to help job seekers optimize their resumes.

## 🌟 Features

- **PDF Resume Upload**: Upload and preview PDF resumes directly in the browser
- **AI-Powered Analysis**: Extract key sections (Skills, Experience, Education) from resumes
- **Intelligent Feedback**: Get detailed feedback on resume gaps and potential issues
- **Actionable Suggestions**: Receive specific recommendations to improve your resume
- **Skills Comparison**: View extracted skills vs. recommended skills for better positioning
- **Modern UI**: Responsive design with dark theme and intuitive user experience
- **Real-time Processing**: Fast analysis with loading states and error handling

## 🏗️ Architecture

This project follows a **client-server architecture** with:

### Frontend (Client)
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with custom dark theme
- **UI Components**: Lucide React icons
- **HTTP Client**: Axios for API communication
- **Deployment**: Netlify-ready configuration

### Backend (Server)
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js
- **AI Integration**: LangChain with OpenAI GPT-4
- **PDF Processing**: PDF-parse library
- **Workflow**: LangGraph for orchestrated AI chains
- **Deployment**: Render.com ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ahtasham-ahsan/AI-Resume-Reviewer.git
   cd AI-Resume-Reviewer
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```bash
   cd server
   touch .env
   ```
   
   Add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   PORT=5000
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend client**
   ```bash
   cd client
   npm run dev
   ```
   The client will run on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000` to use the application

## 🔧 How It Works

### AI Processing Pipeline

The application uses a sophisticated AI workflow built with LangGraph:

1. **PDF Parsing**: Extracts text content from uploaded PDF resumes
2. **Section Extraction**: AI analyzes and extracts key resume sections:
   - Skills (current and recommended)
   - Work Experience
   - Education
3. **Gap Detection**: Identifies potential issues and gaps in the resume
4. **Suggestion Generation**: Provides actionable improvement recommendations

### Technology Stack

#### Frontend
- **Next.js 15**: React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **Axios**: HTTP client for API calls

#### Backend
- **Express.js**: Web framework for Node.js
- **LangChain**: AI/LLM application framework
- **LangGraph**: Workflow orchestration
- **OpenAI GPT-4**: Advanced language model
- **PDF-parse**: PDF text extraction
- **CORS**: Cross-origin resource sharing
- **Express-fileupload**: File upload handling

## 📁 Project Structure

```
AI-Resume-Reviewer/
├── client/                 # Frontend application
│   ├── app/               # Next.js App Router
│   │   ├── page.js        # Main application page
│   │   ├── layout.js      # Root layout
│   │   └── globals.css    # Global styles
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   └── package.json      # Frontend dependencies
├── server/                # Backend application
│   ├── chains/           # LangChain processing chains
│   │   ├── extractSections.js
│   │   ├── detectGaps.js
│   │   └── generateSuggestions.js
│   ├── graphs/           # LangGraph workflows
│   │   └── resumeGraph.js
│   ├── routes/           # Express routes
│   │   └── resumeRoute.js
│   ├── utils/            # Utility functions
│   │   └── parsePDF.js
│   ├── uploads/          # Temporary file storage
│   └── package.json      # Backend dependencies
└── README.md
```

## 🎯 Key Features Explained

### Resume Analysis
- **Section Extraction**: Automatically identifies and extracts Skills, Experience, and Education
- **Skills Gap Analysis**: Compares current skills with recommended skills for better positioning
- **Experience Timeline**: Parses work history with positions, companies, and durations

### AI Feedback System
- **Gap Detection**: Identifies potential issues in resume structure and content
- **Contextual Suggestions**: Provides industry-specific improvement recommendations
- **Education-Experience Alignment**: Analyzes how education and work experience complement each other

### User Experience
- **PDF Preview**: View uploaded resume directly in the browser
- **Real-time Processing**: Live feedback during AI analysis
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Graceful error messages and validation

## 🚀 Deployment

### Frontend (Netlify)
```bash
cd client
npm run build
# Deploy to Netlify
```

### Backend (Render)
```bash
cd server
# Configure environment variables in Render dashboard
# Deploy to Render.com
```

## 🔒 Environment Variables

### Backend (.env)
```env
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Muhammad Ahtasham**
- LinkedIn: [Muhammad Ahtasham](https://www.linkedin.com/in/muhammadahtasham/)
- Portfolio: [atiiisham.vercel.app](https://atiiisham.vercel.app)

## 🙏 Acknowledgments

- OpenAI for providing the GPT-4 API
- LangChain team for the excellent AI framework
- Next.js team for the amazing React framework
- Tailwind CSS for the utility-first styling approach

---

**Note**: This application requires an OpenAI API key to function. Make sure to set up your API key in the environment variables before running the application.
