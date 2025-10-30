import { useState } from 'react'
import { AIService } from '../../lib/aiServices'

export default function TextSummarizer({ onClose }) {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [maxLength, setMaxLength] = useState(100)

  const handleSummarize = async () => {
    if (!text.trim()) {
      alert('Please enter some text to summarize')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await AIService.summarizeText(text, maxLength)
      setResult(response)
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to summarize text. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Smart Text Summarizer</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
      </div>

      <div className="space-y-6">
        {/* Input Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Text to Summarize
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here... (articles, documents, reports, etc.)"
            className="w-full h-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="text-sm text-gray-500 mt-1">
            Characters: {text.length}
          </div>
        </div>

        {/* Settings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Summary Length (words)
          </label>
          <select
            value={maxLength}
            onChange={(e) => setMaxLength(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={50}>Short (50 words)</option>
            <option value={100}>Medium (100 words)</option>
            <option value={200}>Long (200 words)</option>
          </select>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSummarize}
          disabled={loading || !text.trim()}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Summarizing...
            </>
          ) : (
            'Generate Summary'
          )}
        </button>

        {/* Results Section */}
        {result && (
          <div className="border-t pt-6">
            {result.success ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-600">
                  ✅ Summary Generated
                </h3>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Summary:</h4>
                  <p className="text-gray-800 leading-relaxed">
                    {result.summary}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded">
                    <div className="font-medium text-blue-800">Original</div>
                    <div className="text-blue-600">{result.originalLength} chars</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <div className="font-medium text-green-800">Summary</div>
                    <div className="text-green-600">{result.summaryLength} chars</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <div className="font-medium text-purple-800">Tokens</div>
                    <div className="text-purple-600">{result.tokensUsed}</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded">
                    <div className="font-medium text-orange-800">Time</div>
                    <div className="text-orange-600">{result.processingTime}</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => navigator.clipboard.writeText(result.summary)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Copy Summary
                  </button>
                  <button
                    onClick={() => {
                      setText('')
                      setResult(null)
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    New Summary
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="text-red-600 text-lg mb-2">❌ Error</div>
                <p className="text-red-600">{result.error}</p>
                <button
                  onClick={() => setResult(null)}
                  className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

