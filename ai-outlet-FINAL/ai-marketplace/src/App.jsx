import { useState, useEffect } from 'react'
import ModelCard from './components/Models/ModelCard'
import AuthModal from './components/Auth/AuthModal'
import UserDashboard from './components/Dashboard/UserDashboard'
import CreatorDashboard from './components/Creator/CreatorDashboard'
import BotSubmissionForm from './components/Creator/BotSubmissionForm'
import CategoryPage from './components/Categories/CategoryPage'
import SellYourBotPage from './components/Sell/SellYourBotPage'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Search, Zap, Shield, Users, ArrowRight, DollarSign, User } from 'lucide-react'
import { useAuth } from './contexts/AuthContext'
import './App.css'

function App() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showCreatorDashboard, setShowCreatorDashboard] = useState(false)
  const [showBotSubmission, setShowBotSubmission] = useState(false)
  const [creatorBots, setCreatorBots] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedModel, setSelectedModel] = useState(null)
  const [showSellPage, setShowSellPage] = useState(false)

  // Load creator bots from localStorage
  useEffect(() => {
    const savedBots = JSON.parse(localStorage.getItem('creatorBots') || '[]')
    setCreatorBots(savedBots)
  }, [])

  // Sample AI models for the marketplace
  const featuredModels = [
    {
      id: 1,
      name: "Smart Text Summarizer",
      description: "Instantly summarize long documents, articles, and reports with AI precision",
      category: "Text Processing",
      price: "$0.99/request",
      rating: 4.8,
      users: "2.3k",
      responseTime: "< 2s",
      tags: ["NLP", "Summarization", "Documents"]
    },
    {
      id: 2,
      name: "Sentiment Analyzer",
      description: "Analyze emotions and sentiment in text with detailed insights",
      category: "Text Analysis",
      price: "$0.99/request",
      rating: 4.6,
      users: "3.7k",
      responseTime: "< 1s",
      tags: ["Sentiment", "Analytics", "Text Mining"]
    },
    {
      id: 3,
      name: "Language Translator Pro",
      description: "Translate text between 100+ languages with context awareness",
      category: "Translation",
      price: "$1.99/request",
      rating: 4.7,
      users: "8.2k",
      responseTime: "< 1s",
      tags: ["Translation", "Multilingual", "NLP"]
    },
    {
      id: 4,
      name: "Image Background Remover",
      description: "Remove backgrounds from images with professional quality results",
      category: "Image Processing",
      price: "$2.49/image",
      rating: 4.9,
      users: "5.1k",
      responseTime: "< 3s",
      tags: ["Computer Vision", "Image Editing", "Background"]
    }
  ]

  const categories = [
    "Text Processing", "Image Processing", "Translation", "Text Analysis", 
    "Audio Processing", "Data Analysis", "Computer Vision", "NLP"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Outlet
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#models" className="text-gray-600 hover:text-gray-900">Models</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#docs" className="text-gray-600 hover:text-gray-900">Docs</a>
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-300 hover:from-purple-100 hover:to-pink-100"
                  onClick={() => setShowSellPage(true)}
                >
                  💰 Sell Your Bot
                </Button>
                <Button variant="outline" size="sm" onClick={() => setShowDashboard(true)}>
                  <User className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => setShowAuthModal(true)}>Sign In</Button>
                <Button size="sm" onClick={() => setShowAuthModal(true)}>Get Started</Button>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">
            🚀 The AI Outlet - Where AI Meets Affordability
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI That Just Works
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Stop wrestling with complex AI platforms. Get the AI capabilities you need in minutes, not months. 
            Simple pricing, instant integration, guaranteed results.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Describe what you want to build... (e.g., 'summarize documents')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg">
                Find AI Solution
              </Button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 mb-12">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>30-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span>10,000+ developers trust us</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-500" />
              <span>3-click integration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Models */}
      <section id="models" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured AI Models</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hand-picked, tested, and guaranteed to work. Each model comes with clear pricing, 
            instant trials, and comprehensive documentation.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant="outline" 
              className="cursor-pointer hover:bg-purple-50 hover:border-purple-500 transition-all px-4 py-2 text-sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Models Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {featuredModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
          {/* Creator Bots */}
          {creatorBots.filter(bot => bot.status === 'active').map((bot, index) => (
            <ModelCard
              key={`creator-${index}`}
              model={{
                id: `creator-${index}`,
                name: bot.name,
                description: bot.description,
                category: bot.category,
                price: `$${bot.price}/request`,
                rating: bot.rating || 4.5,
                users: `${bot.users || 0}`,
                responseTime: "< 2s",
                tags: [bot.category, "Creator Bot"],
                isCreatorBot: true,
                creator: bot.creatorName
              }}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline">
            View All Models
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Developers Choose AI Outlet</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're not just another AI platform. We're the anti-enterprise solution built for speed, simplicity, and success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3-Click Integration</h3>
              <p className="text-gray-600">
                Find, test, and integrate any AI model in under 5 minutes. No complex setup, no infrastructure headaches.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Guaranteed Results</h3>
              <p className="text-gray-600">
                Every model is tested and benchmarked. 30-day money-back guarantee if it doesn't work for your use case.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-gray-600">
                No hidden fees, no complex calculations. Pay only for what you use with clear, upfront pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Build with AI?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of developers who've already shipped AI-powered features in record time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-4">
              Start Building Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4">
              View Documentation
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Free tier includes 1,000 API calls/month • No credit card required
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">AI Outlet</span>
              </div>
              <p className="text-gray-400">
                The simplest way to add AI to your applications.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Models</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API Reference</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Outlet. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false)
            setShowDashboard(true)
          }}
        />
      )}

      {/* User Dashboard */}
      {showDashboard && (
        <UserDashboard onClose={() => setShowDashboard(false)} />
      )}

      {/* Creator Dashboard */}
      {showCreatorDashboard && (
        <CreatorDashboard
          onClose={() => setShowCreatorDashboard(false)}
          onSubmitBot={() => {
            setShowCreatorDashboard(false)
            setShowBotSubmission(true)
          }}
        />
      )}

      {/* Bot Submission Form */}
      {showBotSubmission && (
        <BotSubmissionForm
          onClose={() => setShowBotSubmission(false)}
          onSuccess={() => {
            setShowBotSubmission(false)
            setShowCreatorDashboard(true)
            // Reload creator bots
            const savedBots = JSON.parse(localStorage.getItem('creatorBots') || '[]')
            setCreatorBots(savedBots)
          }}
        />
      )}

      {/* Category Page */}
      {selectedCategory && (
        <CategoryPage
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
          onSelectModel={(model) => {
            setSelectedModel(model)
            // You can add logic here to open the model detail or try free modal
          }}
        />
      )}

      {/* Sell Your Bot Page */}
      {showSellPage && (
        <SellYourBotPage
          onClose={() => setShowSellPage(false)}
          onGetStarted={() => {
            setShowSellPage(false)
            if (user) {
              setShowBotSubmission(true)
            } else {
              setShowAuthModal(true)
            }
          }}
        />
      )}
    </div>
  )
}

export default App

