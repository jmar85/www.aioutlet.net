import React from 'react'
import { Badge } from '@/components/ui/badge.jsx'
import { Card, CardContent } from '@/components/ui/card.jsx'
import { CheckCircle, Calendar, DollarSign } from 'lucide-react'

export default function PurchaseHistory({ purchases }) {
  if (purchases.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases yet</h3>
        <p className="text-gray-500 mb-4">
          Start exploring our AI models and make your first purchase!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">All Transactions</h3>
        <Badge variant="outline">{purchases.length} total</Badge>
      </div>

      <div className="space-y-3">
        {purchases.map((purchase, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <h4 className="font-medium">{purchase.model}</h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(purchase.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      <span>${purchase.amount}</span>
                    </div>
                  </div>

                  {purchase.transactionId && (
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">
                        Transaction ID: {purchase.transactionId}
                      </span>
                    </div>
                  )}
                </div>

                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Completed
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-blue-900">Total Spent</span>
            <span className="text-xl font-bold text-blue-900">
              ${purchases.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0).toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

