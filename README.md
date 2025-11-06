# Talent Matchmaker 

A modern talent matching platform for creative professionals. Find and hire the best photographers, videographers, stylists, and other creative talents for your projects.
---

## 🔗 Project Resources

- 📽 **[Video Demo](https://drive.google.com/file/d/15yyF3fOJliQaLfz3qpLD6O52f5wzsWzd/view?usp=sharing)**  
  A quick walkthrough showcasing core features and functionality.

- 🚀 **[Live App](https://talent-matchmaker-24l2.onrender.com/)**  
  Explore the fully deployed application.

- 📄 **[Submission Proposal](https://docs.google.com/document/d/16c9YpbQnaXELGEk160mFWYwtRozefCezk4k_ogG7fbo/edit?usp=sharing)**  
  Detailed architecture, tech stack, approach, and implementation notes.

---

## Features

- Smart matching based on location, skills, budget, and style preferences
- Real-time search with detailed scoring breakdown
- Feedback system for rating matchesintegration with direct access to creator platforms
- Responsive design that works on all devices
- Location autocomplete with city suggestions
- Skills and style suggestions for easy selection

## Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone <your-repo-url>
   cd Talent-MatchMaker
   ```

2. Install all dependencies
   ```bash
   npm run install:all
   ```

3. Start development servers
   ```bash
   npm run dev
   ```

4. Open your browser
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## Development

### Available Scripts

```bash
# Install all dependencies
npm run install:all

# Start both frontend and backend in development mode
npm run dev

# Start only backend
npm run dev:backend

# Start only frontend
npm run dev:frontend

# Build for production
npm run build

# Start production server
npm start
```

### Project Structure

```
Talent-MatchMaker-Lite/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   └── index.css       # Global styles
│   └── package.json
├── backend/                 # Node.js backend
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── data/               # JSON data files
│   └── app.js              # Server entry point
└── package.json            # Root package.json
```
### API Endpoints

- `POST /api/match` - Find matching talents
- `GET /api/health` - Health check
- `GET /api/feedback` - Get feedback
- `POST /api/feedback` - Submit feedback
<img width="800" height="800" alt="Screenshot from 2025-07-19 05-05-12" src="https://github.com/user-attachments/assets/eb124f99-3122-4315-b8d6-a247f1a5c53a" />
<img width="800" height="800" alt="Screenshot from 2025-07-19 05-07-01" src="https://github.com/user-attachments/assets/03fb59e4-64bf-4a88-bf69-c8df01c2b959" />
<img width="800" height="800" alt="Screenshot from 2025-07-19 05-07-38" src="https://github.com/user-attachments/assets/617de268-01d8-424f-a1a1-243ae13592cf" />
<img width="800" height="800" alt="Screenshot from 2025-07-19 05-07-55" src="https://github.com/user-attachments/assets/64481e0e-d104-49f9-9e38-c95667f60cc8" />
<img width="800" height="800" alt="Screenshot from 2025-07-19 05-08-41" src="https://github.com/user-attachments/assets/5c94e6df-67ab-4400-87b6-dbc8f1ee2330" />


## Data Structure

The app uses JSON files for data storage:

- `backend/data/TalentProfiles.json` - Talent profiles
- `backend/data/GigsDataset.json` - Sample gigs
- `backend/data/MatchHistory.json` - Match history


Thank you for reading it..
❤️ Sneha Chaurasia
