/**
 * Scoring logic for talent matching
 * Rules:
 * - Location match: +3 points
 * - Budget within range: +2 points  
 * - Each matching skill: +2 points
 * - Each matching style keyword: +1 point
 */

function parseBudgetRange(budgetRange) {
  if (!budgetRange || budgetRange === "To be discussed") {
    return { min: 0, max: Infinity };
  }
  
  // Handle budget ranges like "₹33546–₹66470"
  const match = budgetRange.match(/₹?(\d+)–₹?(\d+)/);
  if (match) {
    return { min: parseInt(match[1]), max: parseInt(match[2]) };
  }
  
  // Handle single budget values
  const singleMatch = budgetRange.match(/₹?(\d+)/);
  if (singleMatch) {
    const value = parseInt(singleMatch[1]);
    return { min: value * 0.8, max: value * 1.2 }; // 20% tolerance
  }
  
  return { min: 0, max: Infinity };
}

function calculateScore(talent, requirements) {
  let score = 0;
  const reason = {
    location: false,
    skills_matched: [],
    styles_matched: [],
    budget_match: false
  };

  // Location match (+3 points)
  if (talent.city && talent.city.toLowerCase() === requirements.location.toLowerCase()) {
    score += 3;
    reason.location = true;
  }

  // Budget within range (+2 points)
  const talentBudget = parseBudgetRange(talent.budget_range);
  if (requirements.budget >= talentBudget.min && requirements.budget <= talentBudget.max) {
    score += 2;
    reason.budget_match = true;
  }

  // Skills matching (+2 points each)
  if (talent.skills && Array.isArray(talent.skills)) {
    const matchingSkills = requirements.skills.filter(skill => 
      talent.skills.some(talentSkill => 
        talentSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(talentSkill.toLowerCase())
      )
    );
    score += matchingSkills.length * 2;
    reason.skills_matched = matchingSkills;
  }

  // Styles matching (+1 point each)
  if (talent.style_tags && Array.isArray(talent.style_tags)) {
    const matchingStyles = requirements.style.filter(style => 
      talent.style_tags.some(talentStyle => 
        talentStyle.toLowerCase().includes(style.toLowerCase()) ||
        style.toLowerCase().includes(talentStyle.toLowerCase())
      )
    );
    score += matchingStyles.length * 1;
    reason.styles_matched = matchingStyles;
  }

  return { score, reason };
}

function findTopMatches(talents, requirements, limit = 3) {
  const scoredTalents = talents.map(talent => {
    const { score, reason } = calculateScore(talent, requirements);
    return {
      name: talent.name,
      score,
      reason,
      portfolio: talent.platforms ? talent.platforms[0] : null,
      type: talent.categories ? talent.categories[0] : 'Creator',
      location: talent.city,
      experience: `${talent.experience_years} years`,
      rating: talent.soft_skills?.communication === 'excellent' ? 5 : 
              talent.soft_skills?.communication === 'good' ? 4 : 3,
      categories: talent.categories,
      skills: talent.skills,
      style_tags: talent.style_tags,
      budget_range: talent.budget_range,
      platforms: talent.platforms
    };
  });

  // Sort by score (descending) and return top matches
  return scoredTalents
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .filter(match => match.score > 0); // Only return matches with positive scores
}

module.exports = {
  calculateScore,
  findTopMatches,
  parseBudgetRange
};
