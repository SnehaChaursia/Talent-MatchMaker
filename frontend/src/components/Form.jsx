import { useState } from 'react';

function Form({ form, onChange, onSubmit, loading }) {
  const cityList = [
    'Mumbai', 'Goa', 'Delhi', 'Chennai', 'Hyderabad', 'Bangalore', 'Pune', 'Kolkata'
  ];
  
  const skillsList = [
    'Portrait', 'Wedding', 'Fashion', 'Corporate', 'Documentary', 'Branding', 
    'Social Media', 'Animation', 'Video Editing', 'Content Writing', 'Photography',
    'Videography', 'Styling', 'Makeup', 'Direction', 'Editing'
  ];
  
  const stylesList = [
    'Candid', 'Natural', 'Elegant', 'Bold', 'Vibrant', 'Minimal', 'Cinematic',
    'Classic', 'Editorial', 'Documentary', 'Modern', 'Vintage', 'Soft', 'Dramatic',
    'Artistic', 'Commercial', 'Lifestyle', 'Fashion'
  ];

  const [showSuggestions, setShowSuggestions] = useState({
    location: false,
    skills: false,
    style: false
  });
  const [highlighted, setHighlighted] = useState({
    location: -1,
    skills: -1,
    style: -1
  });

  const getFilteredCities = (value) => 
    value ? cityList.filter(city => city.toLowerCase().startsWith(value.toLowerCase())) : [];
  
  const getFilteredSkills = (value) => 
    value ? skillsList.filter(skill => skill.toLowerCase().startsWith(value.toLowerCase())) : [];
  
  const getFilteredStyles = (value) => 
    value ? stylesList.filter(style => style.toLowerCase().startsWith(value.toLowerCase())) : [];

  const handleInputChange = (e) => {
    onChange(e);
    const field = e.target.name;
    setShowSuggestions(prev => ({ ...prev, [field]: true }));
    setHighlighted(prev => ({ ...prev, [field]: -1 }));
  };

  const handleSuggestionClick = (field, value) => {
    onChange({ target: { name: field, value } });
    setShowSuggestions(prev => ({ ...prev, [field]: false }));
  };

  const handleBlur = (field) => {
    setTimeout(() => setShowSuggestions(prev => ({ ...prev, [field]: false })), 100);
  };

  const handleKeyDown = (e, field) => {
    const suggestions = field === 'location' ? getFilteredCities(form[field]) :
                      field === 'skills' ? getFilteredSkills(form[field]) :
                      getFilteredStyles(form[field]);
    
    if (!showSuggestions[field] || suggestions.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      setHighlighted(prev => ({ ...prev, [field]: (prev[field] + 1) % suggestions.length }));
    } else if (e.key === 'ArrowUp') {
      setHighlighted(prev => ({ ...prev, [field]: (prev[field] - 1 + suggestions.length) % suggestions.length }));
    } else if (e.key === 'Enter' && highlighted[field] >= 0) {
      onChange({ target: { name: field, value: suggestions[highlighted[field]] } });
      setShowSuggestions(prev => ({ ...prev, [field]: false }));
      e.preventDefault();
    }
  };

  const renderSuggestions = (field, suggestions, currentValue) => {
    if (!showSuggestions[field] || suggestions.length === 0) return null;
    
    return (
      <ul className="absolute z-10 left-0 right-0 bg-white border border-gray-200 rounded shadow-lg mt-1 max-h-40 overflow-y-auto">
        {suggestions.map((item, idx) => (
          <li
            key={item}
            className={`px-4 py-2 cursor-pointer hover:bg-butter/30 ${highlighted[field] === idx ? 'bg-butter/50' : ''}`}
            onMouseDown={() => handleSuggestionClick(field, item)}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <form className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-xl border border-gray-200" onSubmit={onSubmit}>
      <h2 className="text-3xl font-extrabold text-bread mb-8 text-center font-sans tracking-tight">Find Your Perfect Match</h2>
      
      <div className="mb-6 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          📍 Location
        </label>
        <input
          name="location"
          value={form.location}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(prev => ({ ...prev, location: true }))}
          onBlur={() => handleBlur('location')}
          onKeyDown={(e) => handleKeyDown(e, 'location')}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-bread leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-butter"
          type="text"
          placeholder="e.g. Mumbai, Goa, Delhi"
          autoComplete="off"
          required
        />
        {renderSuggestions('location', getFilteredCities(form.location), form.location)}
      </div>
      
      <div className="mb-6 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          🎨 Skills Required
        </label>
        <input
          name="skills"
          value={form.skills}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(prev => ({ ...prev, skills: true }))}
          onBlur={() => handleBlur('skills')}
          onKeyDown={(e) => handleKeyDown(e, 'skills')}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-bread leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-butter"
          type="text"
          placeholder="e.g. portrait, wedding, fashion"
          autoComplete="off"
          required
        />
        <p className="text-xs text-gray-500 mt-1">can apply for multiple skills</p>
        {renderSuggestions('skills', getFilteredSkills(form.skills), form.skills)}
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          💰 Budget (₹)
        </label>
        <input
          name="budget"
          value={form.budget}
          onChange={onChange}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-bread leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-butter"
          type="number"
          placeholder="e.g. 75000"
          min="1000"
          required
        />
      </div>
      
      <div className="mb-6 relative">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          🎭 Style Preferences
        </label>
        <input
          name="style"
          value={form.style}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(prev => ({ ...prev, style: true }))}
          onBlur={() => handleBlur('style')}
          onKeyDown={(e) => handleKeyDown(e, 'style')}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-bread leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-butter"
          type="text"
          placeholder="e.g. candid, natural, elegant"
          autoComplete="off"
          required
        />
        <p className="text-xs text-gray-500 mt-1">can apply multiple styles</p>
        {renderSuggestions('style', getFilteredStyles(form.style), form.style)}
      </div>
      
      <div className="mb-6 flex items-center">
        <input
          id="remote"
          name="remote"
          type="checkbox"
          checked={form.remote || false}
          onChange={onChange}
          className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="remote" className="text-gray-700 text-sm font-bold">Show remote creators</label>
      </div>
      
      <button
        className="button-simple"
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Finding Perfect Matches...
          </span>
        ) : (
          '🔍 Find Matches'
        )}
      </button>
    </form>
  );
}

export default Form; 