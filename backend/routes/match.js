const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { findTopMatches } = require('../utils/scoring.js');

// POST /api/match - Find matching talents
router.post('/match', async (req, res) => {
  try {
    const { location, skills, budget, style } = req.body;

    // Validate input
    if (!location || !skills || !budget || !style) {
      return res.status(400).json({
        error: 'Missing required fields: location, skills, budget, style'
      });
    }

    // Read talent profiles
    const talentsPath = path.join(__dirname, '../data/TalentProfiles.json');
    const talentsData = await fs.readFile(talentsPath, 'utf8');
    const talents = JSON.parse(talentsData);

    // Prepare requirements object
    const requirements = {
      location: location.trim(),
      skills: Array.isArray(skills) ? skills : [skills],
      budget: Number(budget),
      style: Array.isArray(style) ? style : [style]
    };

    // Find top matches
    const matches = findTopMatches(talents, requirements, 3);

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

    res.json(matches);

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

module.exports = router;
