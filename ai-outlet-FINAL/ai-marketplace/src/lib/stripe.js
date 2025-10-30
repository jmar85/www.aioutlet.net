import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo')

export class PaymentService {
  
  // Create checkout session for AI model purchase
  static async createCheckoutSession(modelData) {
    try {
      // In demo mode, simulate payment flow
      if (import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY === 'pk_test_demo') {
        return {
          success: true,
          demo: true,
          sessionId: 'demo_session_' + Date.now(),
          checkoutUrl: '#demo-payment'
        }
      }

      // Real Stripe integration would make API call to your backend
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelId: modelData.id,
          modelName: modelData.name,
          price: modelData.price,
          priceAmount: this.parsePriceToAmount(modelData.price)
        })
      })

      const session = await response.json()
      
      if (!response.ok) {
        throw new Error(session.error || 'Payment session creation failed')
      }

      return {
        success: true,
        sessionId: session.id,
        checkoutUrl: session.url
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Process demo payment (for testing without real Stripe)
  static async processDemoPayment(modelData) {
    // Simulate payment processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const success = Math.random() > 0.1 // 90% success rate for demo
    
    if (success) {
      return {
        success: true,
        transactionId: 'demo_txn_' + Date.now(),
        amount: this.parsePriceToAmount(modelData.price),
        model: modelData.name,
        timestamp: new Date().toISOString(),
        receipt: {
          id: 'receipt_' + Date.now(),
          amount: modelData.price,
          model: modelData.name,
          date: new Date().toLocaleDateString(),
          status: 'paid'
        }
      }
    } else {
      return {
        success: false,
        error: 'Payment declined. Please try a different payment method.'
      }
    }
  }

  // Parse price string to amount in cents
  static parsePriceToAmount(priceString) {
    // Convert "$0.01/request" to 1 (cents)
    // Convert "$0.05/image" to 5 (cents)
    const match = priceString.match(/\$(\d+\.?\d*)/)
    if (match) {
      return Math.round(parseFloat(match[1]) * 100)
    }
    return 100 // Default to $1.00
  }

  // Format amount in cents to price string
  static formatAmount(amountInCents) {
    return `$${(amountInCents / 100).toFixed(2)}`
  }
}

