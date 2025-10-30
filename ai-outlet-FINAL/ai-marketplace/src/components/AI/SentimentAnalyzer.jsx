import { useState } from 'react'
import { AIService } from '../../lib/aiServices'

export default function SentimentAnalyzer({ onClose }) {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!text.trim()) {
      alert('Please enter some text to analyze')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await AIService.analyzeSentiment(text)
      setResult(response)
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to analyze sentiment. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50'
      case 'negative': return 'text-red-600 bg-red-50'
      case 'neutral': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getSentimentEmoji = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '😊'
      case 'negative': return '😞'
      case 'neutral': return '😐'
      default: return '🤔'
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Sentiment Analyzer</h2>
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
            Text to Analyze
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to analyze sentiment... (reviews, feedback, social media posts, etc.)"
            className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <div className="text-sm text-gray-500 mt-1">
            Characters: {text.length}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleAnalyze}
          disabled={loading || !text.trim()}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Analyzing...
            </>
          ) : (
            'Analyze Sentiment'
          )}
        </button>

        {/* Results Section */}
        {result && (
          <div className="border-t pt-6">
            {result.success ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-600">
                  ✅ Analysis Complete
                </h3>
                
                {/* Main Result */}
                <div className={`p-6 rounded-lg text-center ${getSentimentColor(result.sentiment)}`}>
                  <div className="text-4xl mb-2">
                    {getSentimentEmoji(result.sentiment)}
                  </div>
                  <div className="text-2xl font-bold capitalize mb-1">
                    {result.sentiment}
                  </div>
                  <div className="text-lg">
                    Confidence: {(result.confidence * 100).toFixed(1)}%
                  </div>
                </div>

                {/* Detailed Breakdown */}
                {result.details && (
                  <div className="space-y-3">
                    <h4 className="font-medium">Detailed Breakdown:</h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded">
                        <span className="flex items-center">
                          <span className="mr-2">😊</span>
                          Positive
                        </span>
                        <span className="font-medium text-green-600">
                          {(result.details.positive * 100).toFixed(1)}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <span className="flex items-center">
                          <span className="mr-2">😐</span>
                          Neutral
                        </span>
                        <span className="font-medium text-gray-600">
                          {(result.details.neutral * 100).toFixed(1)}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded">
                        <span className="flex items-center">
                          <span className="mr-2">😞</span>
                          Negative
                        </span>
                        <span className="font-medium text-red-600">
                          {(result.details.negative * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-purple-50 p-3 rounded">
                    <div className="font-medium text-purple-800">Tokens Used</div>
                    <div className="text-purple-600">{result.tokensUsed}</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded">
                    <div className="font-medium text-orange-800">Processing Time</div>
                    <div className="text-orange-600">{result.processingTime}</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      const resultText = `Sentiment: ${result.sentiment} (${(result.confidence * 100).toFixed(1)}% confidence)`
                      navigator.clipboard.writeText(resultText)
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Copy Result
                  </button>
                  <button
                    onClick={() => {
                      setText('')
                      setResult(null)
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    New Analysis
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

