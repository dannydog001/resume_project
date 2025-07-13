import React, { useState } from 'react';
import { FaSearch, FaQuestionCircle, FaEnvelope, FaComments } from 'react-icons/fa';

const HelpCenterPage = () => {
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = {
    'getting-started': [
      {
        question: "How do I create my first resume?",
        answer: "To create your first resume, sign up for a free account and click 'Create New Resume' on your dashboard. Our step-by-step builder will guide you through the process with helpful tips and examples for each section."
      },
      {
        question: "What information do I need to have ready?",
        answer: "We recommend having your work history, education details, skills list, and any certifications or awards handy. Don't worry if you're missing some information - you can always save and come back later."
      }
    ],
    'account': [
      {
        question: "How do I reset my password?",
        answer: "Click 'Forgot Password' on the login page and enter your email address. You'll receive a link to create a new password. The link expires in 24 hours for security."
      },
      {
        question: "Can I change my email address?",
        answer: "Yes, you can update your email in Account Settings. You'll need to verify the new email address before it becomes active."
      }
    ],
    'billing': [
      {
        question: "How do I cancel my subscription?",
        answer: "You can cancel anytime by going to Account Settings > Billing. Your subscription will remain active until the end of your current billing period."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) and PayPal for subscription payments."
      }
    ]
  };

  return (
    <div className="help-center-page">
      <style>{`
        .help-center-page {
          background: #0a0a0a;
          color: #ffffff;
          padding: 60px 20px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
        }
        
        .help-header {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .help-header h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .help-header p {
          max-width: 700px;
          margin: 0 auto;
          color: #a0a0a0;
          font-size: 1.1rem;
          line-height: 1.6;
        }
        
        .search-section {
          max-width: 700px;
          margin: 0 auto 40px;
          position: relative;
        }
        
        .search-input {
          width: 100%;
          padding: 15px 20px 15px 50px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          color: #ffffff;
          font-size: 1rem;
        }
        
        .search-icon {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #a0a0a0;
        }
        
        .help-content {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 40px;
        }
        
        .categories-sidebar {
          background: #1a1a1a;
          border-radius: 15px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          align-self: flex-start;
        }
        
        .categories-title {
          font-size: 1.2rem;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .category-list {
          list-style: none;
        }
        
        .category-item {
          margin-bottom: 15px;
        }
        
        .category-btn {
          background: none;
          border: none;
          color: #a0a0a0;
          font-size: 1rem;
          cursor: pointer;
          text-align: left;
          width: 100%;
          padding: 8px 0;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .category-btn.active, .category-btn:hover {
          color: #4facfe;
        }
        
        .faq-section {
          background: #1a1a1a;
          border-radius: 15px;
          padding: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .section-title {
          font-size: 1.8rem;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .faq-list {
          margin-top: 20px;
        }
        
        .faq-item {
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 20px;
        }
        
        .faq-question {
          font-size: 1.2rem;
          margin-bottom: 15px;
          color: #ffffff;
        }
        
        .faq-answer {
          color: #a0a0a0;
          line-height: 1.7;
        }
        
        .support-section {
          margin-top: 60px;
          background: #1a1a1a;
          border-radius: 15px;
          padding: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }
        
        .support-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }
        
        .support-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 30px;
          transition: all 0.3s ease;
        }
        
        .support-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.1);
        }
        
        .support-icon {
          font-size: 2rem;
          margin-bottom: 20px;
          color: #4facfe;
        }
        
        .support-card h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
        }
        
        .support-card p {
          color: #a0a0a0;
          margin-bottom: 20px;
          line-height: 1.6;
        }
        
        .support-link {
          display: inline-block;
          padding: 10px 25px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
          border-radius: 5px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .support-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(79, 172, 254, 0.3);
        }
        
        @media (max-width: 768px) {
          .help-content {
            grid-template-columns: 1fr;
          }
          
          .help-header h1 {
            font-size: 2rem;
          }
          
          .section-title {
            font-size: 1.5rem;
          }
          
          .categories-sidebar {
            position: sticky;
            top: 20px;
            z-index: 10;
          }
        }
      `}</style>

      <div className="help-header">
        <h1>Help Center</h1>
        <p>Find answers to common questions and learn how to get the most from JobSeekerPro.</p>
      </div>

      <div className="search-section">
        <div className="search-icon">
          <FaSearch />
        </div>
        <input
          type="text"
          className="search-input"
          placeholder="Search help articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="help-content">
        <div className="categories-sidebar">
          <h3 className="categories-title">Categories</h3>
          <ul className="category-list">
            <li className="category-item">
              <button
                className={`category-btn ${activeCategory === 'getting-started' ? 'active' : ''}`}
                onClick={() => setActiveCategory('getting-started')}
              >
                <FaQuestionCircle /> Getting Started
              </button>
            </li>
            <li className="category-item">
              <button
                className={`category-btn ${activeCategory === 'account' ? 'active' : ''}`}
                onClick={() => setActiveCategory('account')}
              >
                <FaQuestionCircle /> Account Settings
              </button>
            </li>
            <li className="category-item">
              <button
                className={`category-btn ${activeCategory === 'billing' ? 'active' : ''}`}
                onClick={() => setActiveCategory('billing')}
              >
                <FaQuestionCircle /> Billing & Subscriptions
              </button>
            </li>
          </ul>
        </div>

        <div className="faq-section">
          <h2 className="section-title">
            <FaQuestionCircle /> Frequently Asked Questions
          </h2>
          <div className="faq-list">
            {faqCategories[activeCategory].map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">{faq.question}</h3>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="support-section">
        <h2 className="section-title">Still Need Help?</h2>
        <p>Can't find what you're looking for? Contact our support team directly.</p>
        
        <div className="support-options">
          <div className="support-card">
            <div className="support-icon">
              <FaEnvelope />
            </div>
            <h3>Email Support</h3>
            <p>Send us a message and we'll respond within 24 hours.</p>
            <a href="mailto:support@jobseekerpro.com" className="support-link">Email Us</a>
          </div>
          
          <div className="support-card">
            <div className="support-icon">
              <FaComments />
            </div>
            <h3>Live Chat</h3>
            <p>Chat with a support agent in real-time during business hours.</p>
            <a href="#live-chat" className="support-link">Start Chat</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;