import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { useAuth } from '../../contexts/AuthContext'
import { User, CreditCard, History, LogOut, Zap } from 'lucide-react'
import PurchaseHistory from './PurchaseHistory'

export default function UserDashboard({ onClose }) {
  const { user, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    // Load purchases from localStorage (in production, this would come from Supabase)
    const storedPurchases = JSON.parse(localStorage.getItem('ai_outlet_purchases') || '[]')
    setPurchases(storedPurchases)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    onClose()
  }

  const stats = {
    totalPurchases: purchases.length,
    totalSpent: purchases.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0).toFixed(2),
    modelsOwned: new Set(purchases.map(p => p.model)).size
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="w-full max-w-4xl my-8">
        <Card className="w-full">
          <CardHeader className="border-b">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-600" />
                  My Dashboard
                </CardTitle>
                <CardDescription>
                  {user?.email || 'Welcome to your AI Outlet dashboard'}
                </CardDescription>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ✕
              </button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 font-medium transition-colors ${
                  activeTab === 'history'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Purchase History
              </button>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Total Purchases</p>
                          <p className="text-2xl font-bold text-blue-600">{stats.totalPurchases}</p>
                        </div>
                        <CreditCard className="w-8 h-8 text-blue-600 opacity-20" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Total Spent</p>
                          <p className="text-2xl font-bold text-green-600">${stats.totalSpent}</p>
                        </div>
                        <Zap className="w-8 h-8 text-green-600 opacity-20" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Models Owned</p>
                          <p className="text-2xl font-bold text-purple-600">{stats.modelsOwned}</p>
                        </div>
                        <History className="w-8 h-8 text-purple-600 opacity-20" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Account Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Account Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Email</span>
                      <span className="font-medium">{user?.email || 'demo@aioutlet.net'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Account Type</span>
                      <Badge>Free Tier</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Member Since</span>
                      <span className="font-medium">
                        {new Date(user?.created_at || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Purchases */}
                {purchases.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Purchases</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {purchases.slice(0, 3).map((purchase, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <p className="font-medium">{purchase.model}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(purchase.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant="outline">${purchase.amount}</Badge>
                          </div>
                        ))}
                      </div>
                      {purchases.length > 3 && (
                        <Button
                          variant="outline"
                          className="w-full mt-4"
                          onClick={() => setActiveTab('history')}
                        >
                          View All Purchases
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Sign Out Button */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            )}

            {/* Purchase History Tab */}
            {activeTab === 'history' && (
              <PurchaseHistory purchases={purchases} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

