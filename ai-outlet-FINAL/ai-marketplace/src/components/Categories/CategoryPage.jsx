import React, { useState, useEffect } from 'react';
import { X, Search, Filter, Star, Clock, Users, DollarSign, ArrowLeft } from 'lucide-react';
import ModelCard from '../Models/ModelCard';

const CategoryPage = ({ category, onClose, onSelectModel }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [models, setModels] = useState([]);

  // Category information
  const categoryInfo = {
    'Text Processing': {
      title: 'Text Processing AI',
      description: 'Transform, analyze, and generate text with powerful AI models',
      icon: '📝',
      color: 'from-blue-500 to-cyan-500'
    },
    'Image Processing': {
      title: 'Image Processing AI',
      description: 'Edit, enhance, and transform images with AI-powered tools',
      icon: '🖼️',
      color: 'from-purple-500 to-pink-500'
    },
    'Translation': {
      title: 'Translation AI',
      description: 'Translate text between languages with context awareness',
      icon: '🌐',
      color: 'from-green-500 to-emerald-500'
    },
    'Text Analysis': {
      title: 'Text Analysis AI',
      description: 'Extract insights and sentiment from text data',
      icon: '📊',
      color: 'from-orange-500 to-red-500'
    },
    'Audio Processing': {
      title: 'Audio Processing AI',
      description: 'Process, transcribe, and enhance audio with AI',
      icon: '🎵',
      color: 'from-indigo-500 to-purple-500'
    },
    'Data Analysis': {
      title: 'Data Analysis AI',
      description: 'Analyze and visualize data with intelligent algorithms',
      icon: '📈',
      color: 'from-teal-500 to-cyan-500'
    },
    'Computer Vision': {
      title: 'Computer Vision AI',
      description: 'Detect, recognize, and analyze visual content',
      icon: '👁️',
      color: 'from-pink-500 to-rose-500'
    },
    'NLP': {
      title: 'Natural Language Processing',
      description: 'Understand and process human language with AI',
      icon: '💬',
      color: 'from-yellow-500 to-orange-500'
    }
  };

  const info = categoryInfo[category] || categoryInfo['Text Processing'];

  // Load models for this category
  useEffect(() => {
    loadModels();
  }, [category]);

  const loadModels = () => {
    // Platform models with updated pricing ($0.99-$2.99)
    const platformModels = [
      {
        id: 1,
        name: 'Smart Text Summarizer',
        description: 'Instantly summarize long documents, articles, and reports with AI precision',
        category: 'Text Processing',
        price: 0.99,
        rating: 4.8,
        responseTime: '< 2s',
        users: 2300,
        tags: ['NLP', 'Summarization', 'Documents'],
        isPlatform: true
      },
      {
        id: 2,
        name: 'Sentiment Analyzer',
        description: 'Analyze emotions and sentiment in text with detailed insights',
        category: 'Text Analysis',
        price: 0.99,
        rating: 4.6,
        responseTime: '< 1s',
        users: 3700,
        tags: ['Sentiment', 'Analytics', 'Text Mining'],
        isPlatform: true
      },
      {
        id: 3,
        name: 'Language Translator Pro',
        description: 'Translate text between 100+ languages with context awareness',
        category: 'Translation',
        price: 1.99,
        rating: 4.7,
        responseTime: '< 1s',
        users: 8200,
        tags: ['Translation', 'Multilingual', 'NLP'],
        isPlatform: true
      },
      {
        id: 4,
        name: 'Image Background Remover',
        description: 'Remove backgrounds from images with professional quality results',
        category: 'Image Processing',
        price: 2.49,
        rating: 4.9,
        responseTime: '< 3s',
        users: 5100,
        tags: ['Computer Vision', 'Image Editing', 'Background'],
        isPlatform: true
      },
      {
        id: 5,
        name: 'Advanced Text Generator',
        description: 'Generate high-quality content for blogs, articles, and marketing',
        category: 'Text Processing',
        price: 1.49,
        rating: 4.7,
        responseTime: '< 2s',
        users: 4500,
        tags: ['NLP', 'Content', 'Generation'],
        isPlatform: true
      },
      {
        id: 6,
        name: 'Speech to Text Pro',
        description: 'Convert audio and speech to accurate text transcriptions',
        category: 'Audio Processing',
        price: 1.99,
        rating: 4.8,
        responseTime: '< 5s',
        users: 3200,
        tags: ['Speech', 'Transcription', 'Audio'],
        isPlatform: true
      },
      {
        id: 7,
        name: 'Image Enhancer AI',
        description: 'Upscale and enhance image quality with AI algorithms',
        category: 'Image Processing',
        price: 2.99,
        rating: 4.9,
        responseTime: '< 4s',
        users: 6800,
        tags: ['Enhancement', 'Upscaling', 'Quality'],
        isPlatform: true
      },
      {
        id: 8,
        name: 'Data Insights Engine',
        description: 'Extract actionable insights from complex datasets',
        category: 'Data Analysis',
        price: 2.49,
        rating: 4.6,
        responseTime: '< 3s',
        users: 2900,
        tags: ['Analytics', 'Insights', 'Data'],
        isPlatform: true
      },
      {
        id: 9,
        name: 'Object Detection AI',
        description: 'Detect and identify objects in images with high accuracy',
        category: 'Computer Vision',
        price: 2.99,
        rating: 4.8,
        responseTime: '< 2s',
        users: 4100,
        tags: ['Detection', 'Vision', 'Objects'],
        isPlatform: true
      },
      {
        id: 10,
        name: 'Text Classification Pro',
        description: 'Automatically categorize and tag text documents',
        category: 'NLP',
        price: 1.49,
        rating: 4.5,
        responseTime: '< 1s',
        users: 2700,
        tags: ['Classification', 'NLP', 'Tagging'],
        isPlatform: true
      }
    ];

    // Load creator bots
    const creatorBots = JSON.parse(localStorage.getItem('creatorBots') || '[]')
      .filter(bot => bot.status === 'active')
      .map(bot => ({
        ...bot,
        id: `creator_${bot.submittedAt}`,
        price: parseFloat(bot.price),
        isPlatform: false,
        tags: [bot.category, 'Creator Bot']
      }));

    // Combine and filter by category
    const allModels = [...platformModels, ...creatorBots]
      .filter(model => model.category === category);

    setModels(allModels);
  };

  // Filter and sort models
  const getFilteredModels = () => {
    let filtered = models;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(model =>
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Price filter
    if (priceFilter !== 'all') {
      if (priceFilter === 'under1') {
        filtered = filtered.filter(m => m.price < 1);
      } else if (priceFilter === '1to2') {
        filtered = filtered.filter(m => m.price >= 1 && m.price < 2);
      } else if (priceFilter === '2to3') {
        filtered = filtered.filter(m => m.price >= 2 && m.price <= 3);
      }
    }

    // Sort
    if (sortBy === 'popular') {
      filtered.sort((a, b) => (b.users || 0) - (a.users || 0));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const filteredModels = getFilteredModels();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className={`bg-gradient-to-r ${info.color} text-white p-8 rounded-t-2xl relative`}>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
            
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to All Models</span>
            </button>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl">{info.icon}</span>
              <div>
                <h2 className="text-4xl font-bold mb-2">{info.title}</h2>
                <p className="text-white/90 text-lg">{info.description}</p>
              </div>
            </div>

            <div className="flex gap-6 mt-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold">{filteredModels.length}</div>
                <div className="text-sm text-white/80">Available Models</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <div className="text-2xl font-bold">$0.99 - $2.99</div>
                <div className="text-sm text-white/80">Price Range</div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Price Filter */}
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Prices</option>
                <option value="under1">Under $1.00</option>
                <option value="1to2">$1.00 - $1.99</option>
                <option value="2to3">$2.00 - $2.99</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Models Grid */}
          <div className="p-6">
            {filteredModels.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No models found</h3>
                <p className="text-gray-600">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredModels.map(model => (
                  <ModelCard
                    key={model.id}
                    model={model}
                    onTryFree={() => onSelectModel(model)}
                    onPurchase={() => onSelectModel(model)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

