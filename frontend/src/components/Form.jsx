function Form({ form, onChange, onSubmit, loading }) {
  return (
    <form className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-xl border border-gray-200" onSubmit={onSubmit}>
      <h2 className="text-3xl font-extrabold text-bread mb-8 text-center font-sans tracking-tight">Find Your Perfect Match</h2>
      
      {/* Location input */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          📍 Location
        </label>
        <input
          name="location"
          value={form.location}
          onChange={onChange}
          className="shadow appearance-none border rounded-full w-full py-3 px-4 text-bread leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-butter"
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
          className="shadow appearance-none border rounded-full w-full py-3 px-4 text-bread leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-butter"
          type="text"
          placeholder="e.g. portrait, wedding, fashion"
          required
        />
        <p className="text-xs text-gray-500 mt-1">can apply for multiple skills</p>
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
          className="shadow appearance-none border rounded-full w-full py-3 px-4 text-bread leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-butter"
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
          className="shadow appearance-none border rounded-full w-full py-3 px-4 text-bread leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-butter"
          type="text"
          placeholder="e.g. candid, natural, elegant "
          required
        />
        <p className="text-xs text-gray-500 mt-1">can apply multiple styles</p>
      </div>
      
      {/* Remote creators toggle */}
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
        className="w-full bg-butter text-bread font-bold py-3 px-4 rounded-full transition-all duration-200 transform hover:scale-105 hover:bg-butter-dark disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg text-lg font-sans tracking-tight"
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