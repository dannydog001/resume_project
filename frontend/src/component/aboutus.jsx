import React from 'react';
import { FaUsers, FaLightbulb, FaChartLine } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="about-page">
      <style>{`
        .about-page {
          background: #0a0a0a;
          color: #ffffff;
          padding: 60px 20px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
        }
        
        .about-header {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .about-header h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .about-header p {
          max-width: 700px;
          margin: 0 auto;
          color: #a0a0a0;
          font-size: 1.1rem;
          line-height: 1.6;
        }
        
        .mission-section, .team-section, .stats-section {
          margin-bottom: 60px;
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
        
        .section-title svg {
          color: #4facfe;
        }
        
        .mission-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }
        
        .mission-text p {
          color: #a0a0a0;
          line-height: 1.8;
          margin-bottom: 20px;
        }
        
        .mission-image {
          border-radius: 10px;
          overflow: hidden;
        }
        
        .mission-image img {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }
        
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 30px;
        }
        
        .team-member {
          text-align: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 25px;
          transition: all 0.3s ease;
        }
        
        .team-member:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        .team-member img {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 20px;
          border: 3px solid rgba(79, 172, 254, 0.3);
        }
        
        .team-member h3 {
          font-size: 1.3rem;
          margin-bottom: 5px;
        }
        
        .team-member p {
          color: #a0a0a0;
          font-size: 0.9rem;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 30px;
          text-align: center;
        }
        
        .stat-item {
          padding: 30px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .stat-label {
          color: #a0a0a0;
          font-size: 1rem;
        }
        
        @media (max-width: 768px) {
          .mission-content {
            grid-template-columns: 1fr;
          }
          
          .about-header h1 {
            font-size: 2rem;
          }
          
          .section-title {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="about-header">
        <h1>About JobSeekerPro</h1>
        <p>We're revolutionizing the way professionals build their careers with cutting-edge tools and personalized guidance.</p>
      </div>

      <div className="mission-section">
        <h2 className="section-title">
          <FaLightbulb /> Our Mission
        </h2>
        <div className="mission-content">
          <div className="mission-text">
            <p>Founded in 2020, JobSeekerPro was born from a simple idea: career advancement tools should be accessible, affordable, and effective for everyone.</p>
            <p>We believe that your background or budget shouldn't limit your professional potential. Our platform combines AI technology with human expertise to give every user the best chance at career success.</p>
            <p>Today, we serve over 500,000 professionals worldwide and partner with universities, nonprofits, and corporations to expand access to career resources.</p>
          </div>
          <div className="mission-image">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c" alt="Team working together" />
          </div>
        </div>
      </div>

      <div className="team-section">
        <h2 className="section-title">
          <FaUsers /> Meet The Team
        </h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson" />
            <h3>Sarah Johnson</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Michael Chen" />
            <h3>Michael Chen</h3>
            <p>CTO</p>
          </div>
          <div className="team-member">
            <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Priya Patel" />
            <h3>Priya Patel</h3>
            <p>Head of Product</p>
          </div>
          <div className="team-member">
            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="David Kim" />
            <h3>David Kim</h3>
            <p>Lead Designer</p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h2 className="section-title">
          <FaChartLine /> By The Numbers
        </h2>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number">500K+</div>
            <div className="stat-label">Users Worldwide</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">3.2M</div>
            <div className="stat-label">Resumes Created</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">92%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">45</div>
            <div className="stat-label">Countries Served</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;