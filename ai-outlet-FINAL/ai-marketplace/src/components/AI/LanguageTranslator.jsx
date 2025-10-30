import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { ArrowRight, Copy, RotateCcw, Globe } from 'lucide-react'
import { AIService } from '../../lib/aiServices'

export default function LanguageTranslator({ onClose }) {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('es')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' }
  ]

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      alert('Please enter text to translate')
      return
    }

    setLoading(true)
    try {
      const response = await AIService.translateText(inputText, sourceLang, targetLang)
      setTranslatedText(response.translatedText)
      setResult(response)
    } catch (error) {
      alert(`Translation error: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText)
    alert('Translation copied to clipboard!')
  }

  const handleReset = () => {
    setInputText('')
    setTranslatedText('')
    setResult(null)
  }

  const swapLanguages = () => {
    const temp = sourceLang
    setSourceLang(targetLang)
    setTargetLang(temp)
    if (translatedText) {
      setInputText(translatedText)
      setTranslatedText('')
      setResult(null)
    }
  }

  return (
    <Card className="w-full bg-white">
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-blue-600" />
            <CardTitle className="text-2xl">Language Translator Pro</CardTitle>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ✕
          </button>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {/* Language Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="space-y-2">
            <Label>From</Label>
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={swapLanguages}
              className="rounded-full"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label>To</Label>
            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Input Text */}
        <div className="space-y-2">
          <Label>Text to Translate</Label>
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to translate..."
            className="min-h-[150px] border-2 focus:border-blue-500"
            disabled={loading}
          />
          <div className="text-sm text-gray-500">
            Characters: {inputText.length}
          </div>
        </div>

        {/* Translate Button */}
        <Button
          onClick={handleTranslate}
          disabled={loading || !inputText.trim()}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Translating...
            </>
          ) : (
            <>
              Translate
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>

        {/* Translation Result */}
        {result && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center gap-2 text-green-600">
              <span className="text-2xl">✓</span>
              <span className="font-medium">Translation Complete</span>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <Label className="text-blue-900 mb-2 block">Translation:</Label>
              <div className="text-lg leading-relaxed text-blue-900">
                {translatedText}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-gray-500">Original</div>
                <div className="font-medium text-blue-600">{result.originalLength} chars</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-gray-500">Translated</div>
                <div className="font-medium text-green-600">{result.translatedLength} chars</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg text-center">
                <div className="text-gray-500">Time</div>
                <div className="font-medium text-purple-600">{result.processingTime}</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleCopy} variant="outline" className="flex-1">
                <Copy className="w-4 h-4 mr-2" />
                Copy Translation
              </Button>
              <Button onClick={handleReset} variant="outline" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                New Translation
              </Button>
            </div>
          </div>
        )}

        {/* Demo Notice */}
        <div className="text-center">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            Demo Mode - Simulated Translation
          </Badge>
          <p className="text-xs text-gray-500 mt-2">
            This is a demonstration. Real translations require API integration.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

