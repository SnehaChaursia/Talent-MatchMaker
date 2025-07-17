# Talent Matchmaker Lite - Backend

A Node.js Express server that provides intelligent talent matching for creative projects.

## Features

- Smart matching algorithm using location, budget, skills, and style preferences
- RESTful API with clean endpoints for talent matching
- JSON storage with file-based data (no database required)
- Match history tracking with feedback loop
- CORS support for frontend integration

## Scoring Logic

The matching algorithm uses this scoring system:

| Criteria | Points | Description |
|----------|--------|-------------|
| Location Match | +3 | Exact location match |
| Budget Range | +2 | Client budget within talent's range |
| Skills Match | +2 per skill | Each matching skill |
| Style Match | +1 per style | Each matching style preference |

## Setup

1. Install Dependencies
   ```bash
   cd backend
   npm install
   ```

2. Start Development Server
   ```bash
   npm run dev
   ```

3. Start Production Server
   ```bash
   npm start
   ```

The server will run on `http://localhost:3001`

## API Endpoints

### POST `/api/match`
Find matching talents based on requirements.

**Request Body:**
```json
{
  "location": "Goa",
  "skills": ["portrait", "pastel"],
  "budget": 75000,
  "style": ["candid"]
}
```

**Response:**
```json
[
  {
    "name": "Arjun Kapoor",
    "score": 10,
    "reason": {
      "location": true,
      "skills_matched": ["portrait", "pastel"],
      "styles_matched": ["candid"],
      "budget_match": true
    },
    "portfolio": "https://arjunkapoor.art.com",
    "type": "photographer",
    "location": "Goa",
    "experience": "6 years",
    "rating": 4.8
  }
]
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Talent Matchmaker API is running"
}
```

### GET `/api/match/history`
Get recent match history.

## Data Structure

### Talent Profiles (`data/TalentProfiles.json`)
Contains creator information:
- Basic info (name, type, location)
- Skills and styles
- Budget range
- Portfolio links
- Experience and ratings

### Gigs Dataset (`data/GigsDataset.json`)
Sample client requirements for testing.

### Match History (`data/MatchHistory.json`)
Stores match history for feedback loop.

## Configuration

- Port: Set via `PORT` environment variable (default: 3001)
- CORS: Enabled for all origins in development
- Static Files: Serves frontend build from `../frontend/dist`

## Deployment

The backend is ready for deployment on platforms like:
- Render: Connect GitHub repo and set build command
- Railway: Direct deployment from GitHub
- Heroku: Add `Procfile` with `web: node app.js`

## Assumptions

1. Location Matching: Exact string match (case-insensitive)
2. Skill Matching: Partial string matching (includes/substring)
3. Budget Range: Inclusive range matching
4. Top Results: Returns top 3 matches with scores > 0
5. Error Handling: Graceful error responses with meaningful messages

## Sample Test Cases

1. Goa Wedding Photographer
   - Location: "Goa"
   - Skills: ["portrait", "wedding"]
   - Budget: 75000
   - Style: ["candid", "natural"]

2. Mumbai Fashion Shoot
   - Location: "Mumbai"
   - Skills: ["fashion", "portrait"]
   - Budget: 120000
   - Style: ["elegant", "modern"]

3. Pastel Portrait Session
   - Location: "Goa"
   - Skills: ["portrait", "pastel"]
   - Budget: 60000
   - Style: ["pastel", "soft"]
