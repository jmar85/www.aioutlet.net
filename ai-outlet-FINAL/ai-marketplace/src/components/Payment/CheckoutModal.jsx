import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { CreditCard, Lock, Shield, CheckCircle } from 'lucide-react'
import { PaymentService } from '../../lib/stripe'

export default function CheckoutModal({ model, onClose, onSuccess }) {
  const [processing, setProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')

  const handlePayment = async () => {
    setProcessing(true)
    
    try {
      const result = await PaymentService.processDemoPayment(model)
      
      if (result.success) {
        onSuccess(result)
        onClose()
      } else {
        alert(`Payment failed: ${result.error}`)
      }
    } catch (error) {
      alert(`Payment error: ${error.message}`)
    } finally {
      setProcessing(false)
    }
  }

  const priceAmount = PaymentService.parsePriceToAmount(model.price)
  const formattedPrice = PaymentService.formatAmount(priceAmount)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">Complete Purchase</CardTitle>
              <CardDescription>Secure checkout for {model.name}</CardDescription>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Order Summary</h3>
            <div className="flex justify-between items-center mb-2">
              <span>{model.name}</span>
              <span className="font-medium">{model.price}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
              <span>Processing fee</span>
              <span>$0.00</span>
            </div>
            <div className="border-t pt-2 flex justify-between items-center font-medium">
              <span>Total</span>
              <span>{formattedPrice}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="font-medium mb-3">Payment Method</h3>
            <div className="space-y-2">
              <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                <span>Credit/Debit Card</span>
              </label>
            </div>
          </div>

          {/* Security Features */}
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center text-green-700 text-sm">
              <Shield className="w-4 h-4 mr-2" />
              <span>256-bit SSL encryption</span>
            </div>
            <div className="flex items-center text-green-700 text-sm mt-1">
              <Lock className="w-4 h-4 mr-2" />
              <span>PCI DSS compliant</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={processing}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              disabled={processing}
              className="flex-1"
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  Pay {formattedPrice}
                  <CheckCircle className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>

          {/* Demo Notice */}
          <div className="text-xs text-gray-500 text-center">
            <Badge variant="outline" className="mb-2">Demo Mode</Badge>
            <p>This is a demonstration. No real payment will be processed.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

