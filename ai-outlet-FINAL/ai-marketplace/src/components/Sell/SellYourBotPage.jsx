import React from 'react';
import { X, DollarSign, Zap, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SellYourBotPage = ({ onClose, onGetStarted }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-t-2xl relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="text-center max-w-3xl mx-auto">
              <div className="text-6xl mb-4">🚀</div>
              <h1 className="text-5xl font-bold mb-4">Sell Your AI Bot</h1>
              <p className="text-xl text-white/90">
                Turn your AI creation into a revenue stream. List your bot on AI Outlet and start earning today!
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* How It Works */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-2">Submit Your Bot</h3>
                  <p className="text-gray-600">
                    Fill out a simple form with your bot's details, API endpoint, and pricing
                  </p>
                </div>

                <div className="text-center p-6 bg-pink-50 rounded-xl">
                  <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-2">Pay Listing Fee</h3>
                  <p className="text-gray-600">
                    One-time $3.99 fee to list your bot on our marketplace
                  </p>
                </div>

                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-2">Start Earning</h3>
                  <p className="text-gray-600">
                    Your bot goes live and you earn every time a customer uses it
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing Guidelines */}
            <div className="mb-12 bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl border-2 border-green-200">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <DollarSign className="text-green-600" />
                Pricing Your Bot
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-green-600 mb-2">$0.99</div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">Simple Tasks</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Text analysis</li>
                    <li>• Basic classification</li>
                    <li>• Simple conversions</li>
                    <li>• Fast processing (&lt;1s)</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-purple-400">
                  <div className="text-3xl font-bold text-purple-600 mb-2">$1.49-$1.99</div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">Moderate Tasks</div>
                  <div className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded mb-2 inline-block">
                    RECOMMENDED
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Content generation</li>
                    <li>• Translation services</li>
                    <li>• Data processing</li>
                    <li>• Medium complexity</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-orange-600 mb-2">$2.49-$2.99</div>
                  <div className="text-sm font-semibold text-gray-700 mb-2">Complex Tasks</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Image processing</li>
                    <li>• Video analysis</li>
                    <li>• Advanced AI models</li>
                    <li>• High compute needs</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>💡 Tip:</strong> Price competitively! Check similar bots in your category. 
                  Lower prices attract more customers, while higher prices work for specialized, high-value services.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Why Sell on AI Outlet?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="text-blue-600" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Instant Audience</h3>
                    <p className="text-gray-600">
                      Get immediate access to thousands of developers and businesses looking for AI solutions
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="text-green-600" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Passive Income</h3>
                    <p className="text-gray-600">
                      Earn money every time someone uses your bot. Set it up once, earn forever
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Zap className="text-purple-600" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Easy Setup</h3>
                    <p className="text-gray-600">
                      Simple form, one-time fee, and you're live. No complex integrations required
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="text-orange-600" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">Quality Control</h3>
                    <p className="text-gray-600">
                      We review all submissions to ensure quality and protect our marketplace reputation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="mb-12 bg-blue-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">What You Need</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <strong>Working API Endpoint</strong>
                    <p className="text-sm text-gray-600">Your bot must be accessible via HTTP/HTTPS API</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <strong>Clear Description</strong>
                    <p className="text-sm text-gray-600">Explain what your bot does and who it's for</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <strong>Competitive Pricing</strong>
                    <p className="text-sm text-gray-600">Price between $0.99-$2.99 per request/use</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <strong>$3.99 Listing Fee</strong>
                    <p className="text-sm text-gray-600">One-time payment to list your bot</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Earnings Example */}
            <div className="mb-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6 text-center">Earnings Potential</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">$99</div>
                  <div className="text-sm opacity-90">100 uses at $0.99</div>
                  <div className="text-xs opacity-75 mt-2">~10 customers/month</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-4xl font-bold mb-2">$499</div>
                  <div className="text-sm opacity-90">500 uses at $0.99</div>
                  <div className="text-xs opacity-75 mt-2">~50 customers/month</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">$1,490</div>
                  <div className="text-sm opacity-90">1,000 uses at $1.49</div>
                  <div className="text-xs opacity-75 mt-2">~100 customers/month</div>
                </div>
              </div>
              <p className="text-center text-sm opacity-90 mt-6">
                * Earnings vary based on bot quality, pricing, and market demand
              </p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl px-12 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Get Started - List Your Bot
                <ArrowRight className="ml-2" size={24} />
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                Takes less than 5 minutes • $3.99 one-time fee • Start earning immediately
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellYourBotPage;

