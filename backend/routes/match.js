const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { findTopMatches, findTopMatchesWithFuzzy } = require('../utils/scoring.js');

const REMOTE_KEYWORDS = ["remote", "anywhere", "work from home"];

function isRemoteCity(city) {
  if (!city) return false;
  return REMOTE_KEYWORDS.some(keyword => city.toLowerCase().includes(keyword));
}

router.post('/match', async (req, res) => {
  try {
    const { location, skills, budget, style, remote } = req.body;

    if (!location || !skills || !budget || !style) {
      return res.status(400).json({
        error: 'Missing required fields: location, skills, budget, style'
      });
    }

    const talentsPath = path.join(__dirname, '../data/TalentProfiles.json');
    const talentsData = await fs.readFile(talentsPath, 'utf8');
    let talents = JSON.parse(talentsData);

    // Filter for remote work if requested
    if (remote) {
      const beforeCount = talents.length;
      talents = talents.filter(t =>
        (t.city && isRemoteCity(t.city)) ||
        (Array.isArray(t.availability_calendar) && t.availability_calendar.some(a => isRemoteCity(a.city)))
      );
      console.log(`Remote filter: ${talents.length} of ${beforeCount} creators`);
      if (talents.length === 0) talents = JSON.parse(talentsData);
    }

    const requirements = {
      location: location.trim(),
      skills: Array.isArray(skills) ? skills : [skills],
      budget: Number(budget),
      style: Array.isArray(style) ? style : [style]
    };

    const matches = await findTopMatchesWithFuzzy(talents, requirements, requirements, 3);

    // Save to match history
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

    res.json(Array.isArray(matches) ? matches : []);

  } catch (error) {
    console.error('Match API error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

router.get('/match/history', async (req, res) => {
  try {
    const historyPath = path.join(__dirname, '../data/MatchHistory.json');
    const historyData = await fs.readFile(historyPath, 'utf8');
    const history = JSON.parse(historyData);
    
    res.json(history.slice(-10));
  } catch (error) {
    console.error('History API error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

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
      feedback,
      requirements: requirements || null
    });
    await fs.writeFile(historyPath, JSON.stringify(history, null, 2));
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to store feedback', message: error.message });
  }
});

router.get('/feedback', async (req, res) => {
  try {
    const historyPath = path.join(__dirname, '../data/MatchHistory.json');
    const historyData = await fs.readFile(historyPath, 'utf8');
    const history = JSON.parse(historyData);
    const feedbacks = history.filter(h => h.feedback).slice(-20).reverse();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedback', message: error.message });
  }
});

module.exports = router;
