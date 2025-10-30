import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Star, Clock, Users, DollarSign, ArrowRight } from 'lucide-react'
import TextSummarizer from '../AI/TextSummarizer'
import SentimentAnalyzer from '../AI/SentimentAnalyzer'
import LanguageTranslator from '../AI/LanguageTranslator'
import BackgroundRemover from '../AI/BackgroundRemover'
import CheckoutModal from '../Payment/CheckoutModal'

export default function ModelCard({ model }) {
  const [showAI, setShowAI] = useState(false)
  const [aiComponent, setAiComponent] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)

  const handleTryFree = () => {
    // Map model names to AI components
    const componentMap = {
      "Smart Text Summarizer": TextSummarizer,
      "Sentiment Analyzer": SentimentAnalyzer,
      "Language Translator Pro": LanguageTranslator,
      "Image Background Remover": BackgroundRemover
    }

    const Component = componentMap[model.name]
    if (Component) {
      setAiComponent(() => Component)
      setShowAI(true)
    } else {
      alert(`${model.name} demo coming soon! This would launch the AI tool.`)
    }
  }

  const handlePurchase = () => {
    setShowCheckout(true)
  }

  const handlePaymentSuccess = (result) => {
    // Save purchase to localStorage
    const purchase = {
      model: model.name,
      amount: model.price.replace(/[^0-9.]/g, ''),
      date: new Date().toISOString(),
      transactionId: result.transactionId
    }
    
    const existingPurchases = JSON.parse(localStorage.getItem('ai_outlet_purchases') || '[]')
    existingPurchases.push(purchase)
    localStorage.setItem('ai_outlet_purchases', JSON.stringify(existingPurchases))
    
    alert(`🎉 Payment Successful!\n\nTransaction ID: ${result.transactionId}\nModel: ${result.model}\nYou now have access to ${model.name}!`)
  }

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary">{model.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{model.rating}</span>
            </div>
          </div>
          <CardTitle className="text-xl">{model.name}</CardTitle>
          <CardDescription className="text-gray-600">
            {model.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1 mb-4">
            {model.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-green-500" />
              <span className="font-medium">{model.price}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>{model.responseTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-purple-500" />
              <span>{model.users} users</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleTryFree}
            >
              Try Free
            </Button>
            <Button 
              className="flex-1"
              onClick={handlePurchase}
            >
              Purchase
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Tool Modal */}
      {showAI && aiComponent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {React.createElement(aiComponent, {
              onClose: () => {
                setShowAI(false)
                setAiComponent(null)
              }
            })}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          model={model}
          onClose={() => setShowCheckout(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  )
}
