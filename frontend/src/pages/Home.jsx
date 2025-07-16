import { useState, useEffect } from 'react'
import Form from '../components/Form.jsx'
import ResultCard from '../components/ResultCard.jsx'

// Add Google Fonts for DM Serif Display (optional, for title)
function Home() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [feedbacks, setFeedbacks] = useState([])

  // Form state
  const [form, setForm] = useState({
    location: '',
    skills: '', // comma separated
    budget: '',
    style: '', // comma separated
    remote: false,
  })

  // Fetch feedbacks on mount
  useEffect(() => {
    fetch('/api/feedback')
      .then(res => res.json())
      .then(setFeedbacks)
      .catch(() => setFeedbacks([]))
  }, [])

  const handleChange = e => {
    if (e.target.type === 'checkbox') {
      setForm({ ...form, [e.target.name]: e.target.checked });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setResults([])
    try {
      // Prepare payload
      const payload = {
        location: form.location,
        skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
        budget: Number(form.budget),
        style: form.style.split(',').map(s => s.trim()).filter(Boolean),
        remote: form.remote,
      }
      // Call backend
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Failed to fetch matches')
      const data = await res.json()
      setResults(data)
    } catch (err) {
      setError(err.message || 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  // Feedback handler
  const handleFeedback = async (match_name, feedback) => {
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ match_name, feedback, requirements: form })
      })
      // Optionally, refresh feedbacks
      fetch('/api/feedback')
        .then(res => res.json())
        .then(setFeedbacks)
        .catch(() => {})
    } catch {}
  }

  return (
    <div className="min-h-screen bg-accent flex flex-col items-center">
      {/* Top nav bar with Apply Now button */}
     
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-bread mb-4 tracking-tight" style={{ fontFamily: 'DM Serif Display, Poppins, serif' }}>
            Top talent available on Bread Butter
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
            Find and hire the best creative professionals for your project.
          </p>
        </div>

        {/* Main Content: Form and Results */}
        <div className="w-full flex flex-col items-center gap-8">
          {/* Form Section */}
          <div className="w-full max-w-xl mb-8">
            <Form form={form} onChange={handleChange} onSubmit={handleSubmit} loading={loading} />
          </div>

          {/* Results Section: Centered grid */}
          <div className="w-full">
            <h2 className="text-2xl font-bold text-bread mb-6 text-center">Your Matches</h2>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 text-center">
                <p className="text-red-600 text-sm">❌ {error}</p>
              </div>
            )}
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-butter mx-auto mb-4"></div>
                <p className="text-bread">Finding perfect matches...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No matches yet. Fill out the form to find creators!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
                {results.map((result, idx) => (
                  <ResultCard key={idx} {...result} onFeedback={handleFeedback} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="max-w-2xl mx-auto mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold mb-4 text-bread text-center">Recent Feedback</h2>
          {feedbacks.length === 0 ? (
            <p className="text-gray-500 text-center">No feedback yet.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {feedbacks.map((fb, i) => (
                <li key={i} className="py-2 flex items-center gap-2 justify-center">
                  <span className={fb.feedback === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {fb.feedback === 'up' ? '👍' : '👎'}
                  </span>
                  <span className="font-medium text-bread">{fb.match_name}</span>
                  <span className="text-xs text-gray-400 ml-2">{new Date(fb.timestamp).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Built for BreadButter • Talent Matchmaker Lite</p>
        </div>
      </div>
    </div>
  )
}

export default Home 