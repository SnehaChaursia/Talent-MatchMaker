import { useState } from 'react'
import Form from '../components/Form.jsx'
import ResultCard from '../components/ResultCard.jsx'

function Home() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Form state
  const [form, setForm] = useState({
    location: '',
    skills: '', // comma separated
    budget: '',
    style: '', // comma separated
  })

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

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
      }
      
      // Call backend - use the correct endpoint
      const res = await fetch('http://localhost:3001/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`)
      }
      
      const data = await res.json()
      setResults(data)
    } catch (err) {
      setError(err.message || 'Unknown error occurred')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎯 Talent Matchmaker Lite
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with the perfect creators for your project. Find photographers, stylists, and makeup artists that match your requirements.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Form Section */}
          <div className="w-full lg:w-auto">
            <Form form={form} onChange={handleChange} onSubmit={handleSubmit} loading={loading} />
          </div>

          {/* Results Section */}
          <div className="w-full lg:w-96">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Matches</h2>
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                  <p className="text-red-600 text-sm">❌ {error}</p>
                </div>
              )}
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-blue-600">Finding perfect matches...</p>
                </div>
              ) : results.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No matches yet. Fill out the form to find creators!</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Found {results.length} matching creator{results.length !== 1 ? 's' : ''}
                  </p>
                  {results.map((result, idx) => (
                    <ResultCard key={idx} {...result} />
                  ))}
                </div>
              )}
            </div>
          </div>
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