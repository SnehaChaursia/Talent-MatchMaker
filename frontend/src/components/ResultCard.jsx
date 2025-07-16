function ResultCard({ name, score, reason, portfolio, type, location, experience, rating, categories, skills, style_tags, budget_range, platforms }) {
  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600 bg-green-100';
    if (score >= 6) return 'text-blue-600 bg-blue-100';
    if (score >= 4) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'photographer': return '📸';
      case 'stylist': return '👗';
      case 'makeup_artist': return '💄';
      case 'director': return '🎬';
      case 'content writing': return '✍️';
      case 'video editing': return '🎬';
      case 'animation': return '🎨';
      default: return '👤';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{getTypeIcon(type)}</span>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{name}</h2>
            <p className="text-sm text-gray-600 capitalize">{type} • {location}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreColor(score)}`}>
          Score: {score}
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Experience:</span>
          <span className="font-medium">{experience}</span>
        </div>
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">Rating:</span>
          <span className="font-medium">⭐ {rating}</span>
        </div>
      </div>

      {/* Categories and Skills */}
      {categories && categories.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {category}
              </span>
            ))}
          </div>
        </div>
      )}

      {skills && skills.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Budget Range */}
      {budget_range && (
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Budget Range</h3>
          <p className="text-sm text-gray-600">{budget_range}</p>
        </div>
      )}

      {/* Matching Details */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-700 mb-2">Why this match?</h3>
        <div className="space-y-2">
          {reason.location && (
            <div className="flex items-center text-green-600">
              <span className="mr-2">✅</span>
              <span>Location match: {location}</span>
            </div>
          )}
          {reason.budget_match && (
            <div className="flex items-center text-green-600">
              <span className="mr-2">✅</span>
              <span>Budget within range</span>
            </div>
          )}
          {reason.skills_matched.length > 0 && (
            <div className="flex items-center text-blue-600">
              <span className="mr-2">🎯</span>
              <span>Skills matched: {reason.skills_matched.join(', ')}</span>
            </div>
          )}
          {reason.styles_matched.length > 0 && (
            <div className="flex items-center text-purple-600">
              <span className="mr-2">🎨</span>
              <span>Styles matched: {reason.styles_matched.join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      {/* Platforms */}
      {platforms && platforms.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Platforms</h3>
          <div className="flex flex-wrap gap-2">
            {platforms.map((platform, idx) => (
              <span key={idx} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                {platform}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Portfolio Link */}
      {portfolio && (
        <div className="border-t pt-4">
          <a 
            href={portfolio} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            <span className="mr-2">🔗</span>
            View Portfolio
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </div>
  )
}

export default ResultCard 