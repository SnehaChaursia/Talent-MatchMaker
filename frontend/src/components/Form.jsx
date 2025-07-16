function Form({ form, onChange, onSubmit, loading }) {
  return (
    <form className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-xl border border-gray-200" onSubmit={onSubmit}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Find Your Perfect Match</h2>
      
      {/* Location input */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          📍 Location
        </label>
        <input
          name="location"
          value={form.location}
          onChange={onChange}
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="e.g. Mumbai, Goa, Delhi"
          required
        />
      </div>
      
      {/* Skills input */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          🎨 Skills Required
        </label>
        <input
          name="skills"
          value={form.skills}
          onChange={onChange}
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="e.g. portrait, wedding, fashion (comma separated)"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Separate multiple skills with commas</p>
      </div>
      
      {/* Budget input */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          💰 Budget (₹)
        </label>
        <input
          name="budget"
          value={form.budget}
          onChange={onChange}
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="e.g. 75000"
          min="1000"
          required
        />
      </div>
      
      {/* Style input */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          🎭 Style Preferences
        </label>
        <input
          name="style"
          value={form.style}
          onChange={onChange}
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="e.g. candid, natural, elegant (comma separated)"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Separate multiple styles with commas</p>
      </div>
      
      <button
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
  )
}

export default Form 