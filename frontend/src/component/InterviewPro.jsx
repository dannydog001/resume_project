
import React from 'react';

const InterviewPro = () => {
  return (
    <div className="interview-pro">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .interview-pro {
          --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          --success-gradient: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          --dark-bg: #0a0a0a;
          --dark-card: #1a1a1a;
          --light-text: #ffffff;
          --muted-text: #a0a0a0;
          --border-color: rgba(255, 255, 255, 0.1);
          
          font-family: 'Inter', sans-serif;
          background: var(--dark-bg);
          color: var(--light-text);
          line-height: 1.6;
          overflow-x: hidden;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Animated background */
        .bg-animation {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background: 
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
          animation: float 20s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }

        /* Hero Section (merged with header) */
        .hero-section {
          position: relative;
          padding: 120px 0 80px;
          text-align: center;
          background: var(--primary-gradient);
          background-attachment: fixed;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            rgba(255,255,255,0.03) 2px,
            rgba(255,255,255,0.03) 4px
          );
          animation: slide 20s linear infinite;
        }

        @keyframes slide {
          0% { transform: translateX(-50px); }
          100% { transform: translateX(50px); }
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 700;
          margin-bottom: 20px;
          background: linear-gradient(45deg, #fff, #f0f0f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from { text-shadow: 0 0 20px rgba(255,255,255,0.5); }
          to { text-shadow: 0 0 30px rgba(255,255,255,0.8); }
        }

        .hero-subtitle {
          font-size: 1.2rem;
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto 40px;
          opacity: 0.9;
        }

        /* Glass morphism cards */
        .glass-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 40px;
          margin: 40px 0;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s;
        }

        .glass-card:hover::before {
          left: 100%;
        }

        .glass-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        /* Section headers */
        .section-header {
          text-align: center;
          margin: 80px 0 60px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 600;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 15px;
        }

        .section-subtitle {
          color: var(--muted-text);
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Services grid */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin: 60px 0;
        }

        .service-card {
          background: var(--dark-card);
          border-radius: 20px;
          padding: 30px;
          border: 1px solid var(--border-color);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--secondary-gradient);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .service-card:hover::before {
          transform: scaleX(1);
        }

        .service-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .service-icon {
          width: 60px;
          height: 60px;
          background: var(--accent-gradient);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          font-size: 1.5rem;
        }

        .service-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 15px;
          color: var(--light-text);
        }

        .service-list {
          list-style: none;
        }

        .service-list li {
          padding: 8px 0;
          color: var(--muted-text);
          position: relative;
          padding-left: 25px;
        }

        .service-list li::before {
          content: '✦';
          position: absolute;
          left: 0;
          color: #4facfe;
          font-weight: bold;
        }

        /* Stats section */
        .stats-section {
          background: var(--dark-card);
          border-radius: 20px;
          padding: 60px 40px;
          margin: 60px 0;
          text-align: center;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          margin-top: 40px;
        }

        .stat-item {
          padding: 20px;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.05);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          background: var(--success-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
        }

        .stat-label {
          color: var(--muted-text);
          font-size: 0.9rem;
          margin-top: 10px;
        }

        /* Testimonials */
        .testimonials {
          background: var(--primary-gradient);
          border-radius: 20px;
          padding: 60px 40px;
          margin: 60px 0;
          text-align: center;
        }

        .testimonial {
          max-width: 600px;
          margin: 0 auto 40px;
          padding: 30px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          backdrop-filter: blur(10px);
        }

        .testimonial-text {
          font-size: 1.1rem;
          font-style: italic;
          margin-bottom: 15px;
          line-height: 1.8;
        }

        .testimonial-author {
          font-weight: 600;
          color: #f0f0f0;
        }

        /* CTA Section */
        .cta-section {
          background: var(--secondary-gradient);
          border-radius: 20px;
          padding: 80px 40px;
          text-align: center;
          margin: 60px 0;
          position: relative;
          overflow: hidden;
        }

        .cta-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .cta-content {
          position: relative;
          z-index: 2;
        }

        .cta-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .cta-button {
          display: inline-block;
          background: var(--dark-bg);
          color: var(--light-text);
          padding: 20px 40px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.1rem;
          margin-top: 30px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .cta-button:hover::before {
          left: 100%;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }

        /* Contact section */
        .contact-section {
          background: var(--dark-card);
          border-radius: 20px;
          padding: 50px 40px;
          text-align: center;
          margin: 60px 0;
        }

        .contact-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-top: 30px;
        }

        .contact-item {
          padding: 20px;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
        }

        .contact-icon {
          font-size: 2rem;
          margin-bottom: 15px;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .container {
            padding: 0 15px;
          }
          
          .glass-card {
            padding: 30px 20px;
          }
          
          .services-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .cta-title {
            font-size: 2rem;
          }
        }

        /* Scroll animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>

      <div className="bg-animation"></div>
      
      {/* Merged Hero Section (replaces header) */}
    

      <div className="container">
        <section className="glass-card animate-in">
          <div className="section-header">
            <h2 className="section-title">Why Professional Coaching Matters</h2>
            <p className="section-subtitle">In today's competitive market, preparation is everything</p>
          </div>
          
          <div className="stats-section">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">28%</span>
                <p className="stat-label">Higher Salary Offers</p>
              </div>
              <div className="stat-item">
                <span className="stat-number">40%</span>
                <p className="stat-label">Shorter Job Search</p>
              </div>
              <div className="stat-item">
                <span className="stat-number">67%</span>
                <p className="stat-label">Less Interview Stress</p>
              </div>
              <div className="stat-item">
                <span className="stat-number">3-5</span>
                <p className="stat-label">Average Interview Rounds</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-header">
          <h2 className="section-title">Comprehensive Programs</h2>
          <p className="section-subtitle">Tailored coaching for every interview format</p>
        </section>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">🎯</div>
            <h3 className="service-title">Behavioral Interview Mastery</h3>
            <ul className="service-list">
              <li>STAR method training with real examples</li>
              <li>Weakness-to-strength reframing</li>
              <li>Company culture alignment strategies</li>
              <li>Body language optimization</li>
            </ul>
          </div>
          
          <div className="service-card">
            <div className="service-icon">⚡</div>
            <h3 className="service-title">Technical Interview Prep</h3>
            <ul className="service-list">
              <li>Coding whiteboard simulations</li>
              <li>System design walkthroughs</li>
              <li>Problem-solving frameworks</li>
              <li>Live debugging practice</li>
            </ul>
          </div>
          
          <div className="service-card">
            <div className="service-icon">👑</div>
            <h3 className="service-title">Executive-Level Coaching</h3>
            <ul className="service-list">
              <li>Board presentation training</li>
              <li>Leadership narrative development</li>
              <li>Compensation negotiation at C-level</li>
              <li>Media interview techniques</li>
            </ul>
          </div>
          
          <div className="service-card">
            <div className="service-icon">📹</div>
            <h3 className="service-title">Virtual Interview Suite</h3>
            <ul className="service-list">
              <li>Camera setup optimization</li>
              <li>Digital presence coaching</li>
              <li>Platform-specific training (Zoom, Teams)</li>
              <li>Async video interview practice</li>
            </ul>
          </div>
        </div>

        <section className="testimonials">
          <div className="section-header">
            <h2 style={{ color: 'white', marginBottom: '40px' }}>Success Stories</h2>
          </div>
          
          <div className="testimonial">
            <p className="testimonial-text">"After 6 months of rejections, I worked with InterviewPro and received 3 offers in 4 weeks. The salary negotiation alone covered 5 years of coaching costs."</p>
            <p className="testimonial-author">- Priya N., Senior Product Manager</p>
          </div>
          
          <div className="testimonial">
            <p className="testimonial-text">"The technical interview prep was so precise it felt like they had insider information. Nailed my FAANG interview on the first try."</p>
            <p className="testimonial-author">- David T., Software Engineer III</p>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready for Your Breakthrough?</h2>
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Schedule your free 30-minute strategy session</p>
            <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
              <p>✓ Discover where you're leaving value on the table</p>
              <p>✓ Get your personalized preparation roadmap</p>
              <p>✓ Learn how to stand out in your next interview</p>
            </div>
            <a href="#contact" className="cta-button">Claim Your Free Session</a>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <h2 className="section-title">Start Your Transformation</h2>
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <h3>Email</h3>
              <p>coaching@interviewpro.com</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <h3>Phone</h3>
              <p>(123) 456-7890</p>
            </div>
            <div className="contact-item">
              <div className="contact-icon">🕒</div>
              <h3>Office Hours</h3>
              <p>Mon-Fri 9am-6pm EST</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InterviewPro;