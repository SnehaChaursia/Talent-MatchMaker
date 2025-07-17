// Talent matching scoring logic
// Location: +3, Budget: +2, Skills: +2 each, Styles: +1 each

function parseBudgetRange(budgetRange) {
  if (!budgetRange || budgetRange === "To be discussed") {
    return { min: 0, max: Infinity };
  }
  
  // Parse budget ranges like "₹33546–₹66470"
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

  // Location match
  if (talent.city && talent.city.toLowerCase() === requirements.location.toLowerCase()) {
    score += 3;
    reason.location = true;
  }

  // Budget check
  const talentBudget = parseBudgetRange(talent.budget_range);
  if (requirements.budget >= talentBudget.min && requirements.budget <= talentBudget.max) {
    score += 2;
    reason.budget_match = true;
  }

  // Skills matching
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

  // Style matching
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

  return scoredTalents
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .filter(match => match.score > 0);
}

// Fuzzy matching for style/portfolio compatibility
function fuzzyStylePortfolioScore(gig, talent) {
  const gigTags = [
    ...(gig.style || []),
    ...(gig.style_tags || []),
    ...(gig.keywords || []),
    gig.title || '',
    gig.brief_text || ''
  ].map(s => s.toLowerCase());

  let talentTags = [
    ...(talent.style_tags || []),
    ...(talent.skills || []),
  ];
  if (talent.portfolio && Array.isArray(talent.portfolio)) {
    for (const item of talent.portfolio) {
      if (item.tags) talentTags.push(...item.tags);
      if (item.keywords) talentTags.push(...item.keywords);
    }
  }
  talentTags = talentTags.map(s => s.toLowerCase());

  // Count overlapping keywords
  let matchCount = 0;
  for (const gigTag of gigTags) {
    for (const talentTag of talentTags) {
      if (
        gigTag && talentTag &&
        (gigTag.includes(talentTag) || talentTag.includes(gigTag)) &&
        gigTag.length > 1 && talentTag.length > 1
      ) {
        matchCount++;
        break;
      }
    }
  }
  return gigTags.length > 0 ? matchCount / gigTags.length : 0;
}

async function findTopMatchesWithFuzzy(talents, requirements, gig, limit = 3) {
  let scoredTalents = talents.map(talent => {
    const { score, reason } = calculateScore(talent, requirements);
    let fuzzy_score = fuzzyStylePortfolioScore(gig, talent);
    return {
      name: talent.name,
      score,
      reason,
      fuzzy_score,
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
  
  return scoredTalents
    .sort((a, b) => (b.score + b.fuzzy_score * 5) - (a.score + a.fuzzy_score * 5))
    .slice(0, limit)
    .filter(match => match.score > 0 || match.fuzzy_score > 0.3);
}

module.exports = {
  calculateScore,
  findTopMatches,
  parseBudgetRange,
  findTopMatchesWithFuzzy
};
