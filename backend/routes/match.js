const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { findTopMatches, findTopMatchesWithSemantic } = require('../utils/scoring.js');

const REMOTE_KEYWORDS = ["remote", "anywhere", "work from home"];

function isRemoteCity(city) {
  if (!city) return false;
  return REMOTE_KEYWORDS.some(keyword => city.toLowerCase().includes(keyword));
}

// POST /api/match - Find matching talents
router.post('/match', async (req, res) => {
  try {
    const { location, skills, budget, style, remote } = req.body;

    // Validate input
    if (!location || !skills || !budget || !style) {
      return res.status(400).json({
        error: 'Missing required fields: location, skills, budget, style'
      });
    }

    // Read talent profiles
    const talentsPath = path.join(__dirname, '../data/TalentProfiles.json');
    const talentsData = await fs.readFile(talentsPath, 'utf8');
    let talents = JSON.parse(talentsData);

    // Remote filter
    if (remote) {
      const beforeCount = talents.length;
      talents = talents.filter(t =>
        (t.city && isRemoteCity(t.city)) ||
        (Array.isArray(t.availability_calendar) && t.availability_calendar.some(a => isRemoteCity(a.city)))
      );
      console.log(`[REMOTE FILTER] Requested remote creators. Found: ${talents.length} of ${beforeCount}`);
      // If no remote creators found, fallback to all
      if (talents.length === 0) talents = JSON.parse(talentsData);
    }

    // Prepare requirements object
    const requirements = {
      location: location.trim(),
      skills: Array.isArray(skills) ? skills : [skills],
      budget: Number(budget),
      style: Array.isArray(style) ? style : [style]
    };

    // Find top matches with semantic AI fuzzy matching
    // For gig context, you can use requirements as gig, or load from GigsDataset.json for richer context
    const matches = await findTopMatchesWithSemantic(talents, requirements, requirements, 3);

    // Store match history (optional bonus feature)
    try {
      const historyPath = path.join(__dirname, '../data/MatchHistory.json');
      const historyData = await fs.readFile(historyPath, 'utf8');
      const history = JSON.parse(historyData);
      
      history.push({
        timestamp: new Date().toISOString(),
        requirements,
        matches: matches.map(m => ({ name: m.name, score: m.score }))
      });

      await fs.writeFile(historyPath, JSON.stringify(history, null, 2));
    } catch (error) {
      console.log('Could not save match history:', error.message);
    }

    // Always return an array
    res.json(Array.isArray(matches) ? matches : []);

  } catch (error) {
    console.error('Match API error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// GET /api/match/history - Get match history (bonus endpoint)
router.get('/match/history', async (req, res) => {
  try {
    const historyPath = path.join(__dirname, '../data/MatchHistory.json');
    const historyData = await fs.readFile(historyPath, 'utf8');
    const history = JSON.parse(historyData);
    
    res.json(history.slice(-10)); // Return last 10 matches
  } catch (error) {
    console.error('History API error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// POST /api/feedback - Store thumbs up/down feedback
router.post('/feedback', async (req, res) => {
  try {
    const { match_name, feedback, requirements } = req.body;
    if (!match_name || !feedback) {
      return res.status(400).json({ error: 'Missing match_name or feedback' });
    }
    const historyPath = path.join(__dirname, '../data/MatchHistory.json');
    const historyData = await fs.readFile(historyPath, 'utf8');
    const history = JSON.parse(historyData);
    history.push({
      timestamp: new Date().toISOString(),
      match_name,
      feedback, // 'up' or 'down'
      requirements: requirements || null
    });
    await fs.writeFile(historyPath, JSON.stringify(history, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to store feedback', message: error.message });
  }
});

// GET /api/feedback - Get recent feedback
router.get('/feedback', async (req, res) => {
  try {
    const historyPath = path.join(__dirname, '../data/MatchHistory.json');
    const historyData = await fs.readFile(historyPath, 'utf8');
    const history = JSON.parse(historyData);
    // Only return feedback entries (with feedback field)
    const feedbacks = history.filter(h => h.feedback).slice(-20).reverse();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedback', message: error.message });
  }
});

module.exports = router;
