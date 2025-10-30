import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function BotSubmissionForm({ onClose, onSuccess }) {
  const { user } = useAuth();
  const [step, setStep] = useState(1); // 1: Form, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Text Processing',
    price: '0.01',
    apiEndpoint: '',
    apiKey: '',
    inputFormat: '',
    outputFormat: ''
  });

  const categories = [
    'Text Processing',
    'Image Processing',
    'Translation',
    'Text Analysis',
    'Audio Processing',
    'Data Analysis',
    'Computer Vision',
    'NLP'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setStep(2); // Go to payment
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      // Save bot to localStorage
      const newBot = {
        ...formData,
        creatorEmail: user?.email,
        creatorName: user?.email?.split('@')[0],
        status: 'pending',
        sales: 0,
        earnings: 0,
        submittedAt: new Date().toISOString(),
        rating: 0,
        users: 0
      };

      const savedBots = JSON.parse(localStorage.getItem('creatorBots') || '[]');
      savedBots.push(newBot);
      localStorage.setItem('creatorBots', JSON.stringify(savedBots));

      setStep(3); // Show success
    }, 1500);
  };

  const handleClose = () => {
    if (step === 3) {
      onSuccess?.();
    }
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1001,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          padding: '30px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <button
            onClick={handleClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ✕
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>🚀</span>
            <h2 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
              {step === 1 && 'Submit Your AI Bot'}
              {step === 2 && 'Complete Listing Payment'}
              {step === 3 && 'Bot Submitted Successfully!'}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '30px' }}>
          {step === 1 && (
            <form onSubmit={handleSubmitForm}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Bot Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Advanced Text Summarizer"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="Describe what your bot does and its key features..."
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                    Price per Request *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0.01"
                    step="0.01"
                    placeholder="0.01"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  API Endpoint *
                </label>
                <input
                  type="url"
                  name="apiEndpoint"
                  value={formData.apiEndpoint}
                  onChange={handleChange}
                  required
                  placeholder="https://api.yourbot.com/process"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                  API Key (Optional)
                </label>
                <input
                  type="password"
                  name="apiKey"
                  value={formData.apiKey}
                  onChange={handleChange}
                  placeholder="Your API key (kept secure)"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{
                padding: '16px',
                backgroundColor: '#fef3c7',
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#92400e' }}>
                  📋 Listing Fee: $3.99
                </p>
                <p style={{ margin: 0, fontSize: '14px', color: '#92400e' }}>
                  One-time fee to list your bot on AI Outlet marketplace
                </p>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Continue to Payment
              </button>
            </form>
          )}

          {step === 2 && (
            <div>
              <div style={{
                padding: '24px',
                backgroundColor: '#f9fafb',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>Order Summary</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>{formData.name}</span>
                  <span style={{ fontWeight: '600' }}>Listing Fee</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                  <span style={{ fontWeight: 'bold' }}>Total</span>
                  <span style={{ fontWeight: 'bold', fontSize: '20px', color: '#7c3aed' }}>$3.99</span>
                </div>
              </div>

              <div style={{
                padding: '20px',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '24px' }}>💳</span>
                  <span style={{ fontWeight: '600' }}>Credit/Debit Card</span>
                </label>
                <input
                  type="text"
                  placeholder="Card number"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    marginTop: '12px'
                  }}
                />
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: '#d1fae5',
                borderRadius: '8px',
                marginBottom: '24px',
                fontSize: '14px',
                color: '#065f46'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span>🔒</span>
                  <span>256-bit SSL encryption</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>🔐</span>
                  <span>PCI DSS compliant</span>
                </div>
              </div>

              <div style={{
                padding: '12px',
                backgroundColor: '#fef3c7',
                borderRadius: '8px',
                marginBottom: '24px',
                textAlign: 'center'
              }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#92400e' }}>
                  Demo Mode
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#92400e' }}>
                  This is a demonstration. No real payment will be processed.
                </p>
              </div>

              <button
                onClick={handlePayment}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>💳</span>
                <span>Pay $3.99</span>
              </button>
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#d1fae5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                fontSize: '40px'
              }}>
                ✓
              </div>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '24px', color: '#065f46' }}>
                Bot Submitted Successfully!
              </h3>
              <p style={{ margin: '0 0 24px 0', color: '#6b7280' }}>
                Your bot "{formData.name}" is now under review. We'll notify you once it's approved and live on the marketplace.
              </p>
              <div style={{
                padding: '16px',
                backgroundColor: '#f3e8ff',
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#7c3aed' }}>
                  What's Next?
                </p>
                <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                  • Review typically takes 24-48 hours<br />
                  • You'll receive an email when approved<br />
                  • Your bot will appear in the marketplace<br />
                  • Start earning from customer purchases
                </p>
              </div>
              <button
                onClick={handleClose}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

