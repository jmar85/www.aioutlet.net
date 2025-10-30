import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function CreatorDashboard({ onClose, onSubmitBot }) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [myBots, setMyBots] = useState([]);
  const [stats, setStats] = useState({
    totalBots: 0,
    activeBots: 0,
    totalEarnings: 0,
    totalSales: 0
  });

  useEffect(() => {
    // Load creator's bots from localStorage
    const savedBots = JSON.parse(localStorage.getItem('creatorBots') || '[]');
    const userBots = savedBots.filter(bot => bot.creatorEmail === user?.email);
    setMyBots(userBots);

    // Calculate stats
    const activeBots = userBots.filter(bot => bot.status === 'active').length;
    const totalSales = userBots.reduce((sum, bot) => sum + (bot.sales || 0), 0);
    const totalEarnings = userBots.reduce((sum, bot) => sum + (bot.earnings || 0), 0);

    setStats({
      totalBots: userBots.length,
      activeBots,
      totalEarnings,
      totalSales
    });
  }, [user]);

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
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        maxWidth: '900px',
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
            onClick={onClose}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '24px' }}>🎨</span>
            <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>Creator Dashboard</h2>
          </div>
          <p style={{ margin: 0, color: '#6b7280' }}>{user?.email}</p>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '10px',
          padding: '20px 30px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '10px 20px',
              border: activeTab === 'overview' ? '2px solid #7c3aed' : '2px solid transparent',
              backgroundColor: activeTab === 'overview' ? '#f3e8ff' : 'transparent',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              color: activeTab === 'overview' ? '#7c3aed' : '#6b7280'
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('mybots')}
            style={{
              padding: '10px 20px',
              border: activeTab === 'mybots' ? '2px solid #f59e0b' : '2px solid transparent',
              backgroundColor: activeTab === 'mybots' ? '#fef3c7' : 'transparent',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              color: activeTab === 'mybots' ? '#f59e0b' : '#6b7280'
            }}
          >
            My Bots
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '30px' }}>
          {activeTab === 'overview' && (
            <div>
              {/* Stats Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '20px',
                marginBottom: '30px'
              }}>
                <div style={{
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  backgroundColor: '#f9fafb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '14px' }}>Total Bots</p>
                      <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#7c3aed' }}>
                        {stats.totalBots}
                      </p>
                    </div>
                    <span style={{ fontSize: '32px' }}>🤖</span>
                  </div>
                </div>

                <div style={{
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  backgroundColor: '#f9fafb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '14px' }}>Total Sales</p>
                      <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>
                        {stats.totalSales}
                      </p>
                    </div>
                    <span style={{ fontSize: '32px' }}>⚡</span>
                  </div>
                </div>

                <div style={{
                  padding: '20px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  backgroundColor: '#f9fafb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '14px' }}>Total Earnings</p>
                      <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#3b82f6' }}>
                        ${stats.totalEarnings.toFixed(2)}
                      </p>
                    </div>
                    <span style={{ fontSize: '32px' }}>💰</span>
                  </div>
                </div>
              </div>

              {/* Submit New Bot Button */}
              <div style={{
                padding: '30px',
                border: '2px dashed #7c3aed',
                borderRadius: '12px',
                textAlign: 'center',
                backgroundColor: '#faf5ff'
              }}>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🚀</span>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '24px' }}>Ready to Share Your AI Bot?</h3>
                <p style={{ margin: '0 0 20px 0', color: '#6b7280' }}>
                  List your bot on AI Outlet and start earning. One-time listing fee: $3.99
                </p>
                <button
                  onClick={onSubmitBot}
                  style={{
                    padding: '14px 32px',
                    background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                  }}
                >
                  Submit New Bot
                </button>
              </div>
            </div>
          )}

          {activeTab === 'mybots' && (
            <div>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '20px' }}>My AI Bots</h3>
              
              {myBots.length === 0 ? (
                <div style={{
                  padding: '60px 20px',
                  textAlign: 'center',
                  color: '#6b7280'
                }}>
                  <span style={{ fontSize: '64px', display: 'block', marginBottom: '16px' }}>🤖</span>
                  <p style={{ fontSize: '18px', margin: 0 }}>No bots yet</p>
                  <p style={{ margin: '8px 0 0 0' }}>Submit your first AI bot to get started!</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {myBots.map((bot, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '20px',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        backgroundColor: '#f9fafb'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{bot.name}</h4>
                          <p style={{ margin: '0 0 12px 0', color: '#6b7280', fontSize: '14px' }}>
                            {bot.description}
                          </p>
                          <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
                            <span>💵 ${bot.price}/request</span>
                            <span>⚡ {bot.sales || 0} sales</span>
                            <span>💰 ${(bot.earnings || 0).toFixed(2)} earned</span>
                          </div>
                        </div>
                        <span
                          style={{
                            padding: '6px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: '600',
                            backgroundColor: bot.status === 'active' ? '#d1fae5' : '#fef3c7',
                            color: bot.status === 'active' ? '#065f46' : '#92400e'
                          }}
                        >
                          {bot.status === 'active' ? 'Active' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

