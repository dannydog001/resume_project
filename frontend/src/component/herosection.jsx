import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faEye, faFileInvoice, faHandsHelping, faUserTie, faFileDownload, faIdCard, faComments, faBell, faPlay, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="landing-container">
      <section className="hero" id="home">
        <h1>Build a Professional Resume in Minutes</h1>
        <p>JobSeekerPro empowers you with modern tools to craft polished resumes and gain career-boosting guidance at every step of your job search journey.</p>
        <div>
          <a href="profile-builder.html" className="cta-button">
            <FontAwesomeIcon icon={faRocket} /> Start Building Now
          </a>
          <a href="templates.html" className="cta-button secondary">
            <FontAwesomeIcon icon={faEye} /> View Templates
          </a>
        </div>
      </section>
      
      <div className="container">
        <section id="features">
          <div className="section-title">
            <h2>Our Powerful Features</h2>
            <p>Everything you need to create a winning resume and advance your career</p>
          </div>
          <div className="features">
            <div className="feature">
              <FontAwesomeIcon icon={faFileInvoice} />
              <h3>Professional Resume Templates</h3>
              <p>Choose from dozens of ATS-friendly, professionally designed templates tailored to your industry.</p>
              <a href="templates.html" className="feature-button">View Templates</a>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faHandsHelping} />
              <h3>Step-by-Step Guidance</h3>
              <p>Our intuitive builder guides you through each section with expert tips and examples.</p>
              <a href="stepbystep.html" className="feature-button">Learn How</a>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faUserTie} />
              <h3>Career Coaching</h3>
              <p>Get personalized career advice from our team of professional career coaches.</p>
              <NavLink to="/careerpath" className="feature-button">Get support</NavLink>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faFileDownload} />
              <h3>Download & Share</h3>
              <p>Download in PDF, Word, or share a link with recruiters instantly.</p>
              <NavLink to="/download" className="feature-button">Try It Now</NavLink>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faIdCard} />
              <h3>Profile Building</h3>
              <p>Create compelling online profiles that attract recruiters and employers.</p>
              <NavLink to="/profile" className="feature-button">Build Profile</NavLink>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faComments} />
              <h3>Interview Preparation</h3>
              <p>Practice common interview questions and get feedback to build confidence.</p>
             <NavLink to="/Interview" className="feature-button">Prepare Now</NavLink>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faLinkedin} />
              <h3>LinkedIn Optimization</h3>
              <p>Improve your LinkedIn profile to boost visibility and networking opportunities.</p>
              <NavLink to="/linkedin" className="feature-button">Optimize Profile</NavLink>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faBell} />
              <h3>Smart Job Alerts</h3>
              <p>Get real-time job opportunities matching your skills and preferences.</p>
              <a href="#alerts" className="feature-button">Set Up Alerts</a>
            </div>
          </div>
        </section>

        <section className="how-it-works" id="how-it-works">
          <div className="section-title">
            <h2>How JobSeekerPro Works</h2>
            <p>Create your perfect resume in just 4 simple steps</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Choose Your Template</h3>
              <p>Select from our collection of professionally designed, ATS-optimized resume templates.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Fill in Your Details</h3>
              <p>Our step-by-step builder guides you through each section with helpful examples.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Customize & Enhance</h3>
              <p>Tailor your resume with our expert suggestions and powerful editing tools.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Download & Apply</h3>
              <p>Download in your preferred format or share directly with employers.</p>
            </div>
          </div>
          <a href="resume-builder.html" className="cta-button success">
            <FontAwesomeIcon icon={faPlay} /> Get Started Now
          </a>
        </section>

        <section className="samples" id="templates">
          <div className="section-title">
            <h2>Professional Resume Templates</h2>
            <p>Choose the design that best represents your professional brand</p>
          </div>
          <div className="template-container">
            <div className="template-card">
              <div className="template-img">
                <img src="https://cdn-images.zety.com/images/zety/landings/templates/general-resume-template@3x.jpg" alt="Modern Template" />
              </div>
              <div className="template-info">
                <h3>Modern</h3>
                <p>Clean, contemporary design perfect for tech and creative professionals.</p>
                <a href="#create" className="feature-button">Use This Template</a>
              </div>
            </div>
            <div className="template-card">
              <div className="template-img">
                <img src="https://marketplace.canva.com/EAGB2-hwc2A/1/0/1131w/canva-minimalist-white-and-grey-professional-resume-7wI4I6L9Vfc.jpg" alt="Creative Template" />
              </div>
              <div className="template-info">
                <h3>Executive</h3>
                <p>Sophisticated layout ideal for senior managers and executives.</p>
                <a href="#create" className="feature-button">Use This Template</a>
              </div>
            </div>
            <div className="template-card">
              <div className="template-img">
                <img src="https://beamjobs.wpenginepowered.com/wp-content/uploads/2023/01/academic-resume-template.png" alt="Professional Template" />
              </div>
              <div className="template-info">
                <h3>Classic</h3>
                <p>Timeless design that works across all industries and experience levels.</p>
                <a href="#create" className="feature-button">Use This Template</a>
              </div>
            </div>
          </div>
          <a href="#templates" className="cta-button secondary">
            <FontAwesomeIcon icon={faBookOpen} /> View All Templates
          </a>
        </section>

        <section className="pricing" id="pricing">
          <div className="section-title">
            <h2>Simple, Transparent Pricing</h2>
            <p>Choose the plan that works best for your career goals</p>
          </div>
          <div className="pricing-cards">
            <div className="pricing-card">
              <h3>Basic</h3>
              <div className="price">$0 <span>/ forever</span></div>
              <ul>
                <li>Access to basic templates</li>
                <li>PDF downloads</li>
                <li>Resume storage</li>
                <li>Basic career tips</li>
              </ul>
              <a href="#create" className="cta-button secondary">Get Started</a>
            </div>
            <div className="pricing-card popular">
              <h3>Professional</h3>
              <div className="price">$9.99 <span>/ month</span></div>
              <ul>
                <li>All premium templates</li>
                <li>Multiple format exports</li>
                <li>LinkedIn optimization</li>
                <li>Interview preparation</li>
                <li>Priority support</li>
              </ul>
              <a href="#create" className="cta-button">Start Free Trial</a>
            </div>
            <div className="pricing-card">
              <h3>Career Suite</h3>
              <div className="price">$24.99 <span>/ month</span></div>
              <ul>
                <li>Everything in Professional</li>
                <li>1-on-1 career coaching</li>
                <li>Resume reviews by experts</li>
                <li>Personalized job matching</li>
                <li>Negotiation guidance</li>
              </ul>
              <a href="#create" className="cta-button secondary">Learn More</a>
            </div>
          </div>
        </section>

        <section className="testimonials" id="testimonials">
          <div className="section-title">
            <h2>Success Stories</h2>
            <p>Hear from professionals who accelerated their careers with JobSeekerPro</p>
          </div>
          <div className="testimonial">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google Logo" />
            <p><strong>Priya S., Software Engineer at Google</strong> — "Thanks to JobSeekerPro, I landed my dream role at Google! The resume builder helped me highlight my skills effectively, and the interview prep gave me the confidence to excel in my technical interviews."</p>
          </div>
          <div className="testimonial">
            <img src="https://www2.deloitte.com/content/dam/Deloitte/us/Images/promo_images/deloitte/us-deloitte-logo.jpg" alt="Deloitte Logo" />
            <p><strong>Aman R., Consultant at Deloitte</strong> — "The career coaching sessions were invaluable. My coach helped me reframe my experience to stand out in the competitive consulting field. Got multiple offers within weeks!"</p>
          </div>
          <div className="testimonial">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon Logo" />
            <p><strong>Meera T., Product Manager at Amazon</strong> — "The LinkedIn optimization feature helped me catch the eye of recruiters. I went from no responses to interviewing with top tech companies in just one month."</p>
          </div>
          <a href="#testimonials" className="cta-button secondary">
            <FontAwesomeIcon icon={faBookOpen} /> Read More Success Stories
          </a>
        </section>

        <section className="newsletter">
          <h2>Get Career Tips & Special Offers</h2>
          <p>Subscribe to our newsletter and receive expert job search advice, template updates, and exclusive discounts.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </section>
      </div>

      <style jsx>{`
        :root {
          --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          --success-gradient: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          --dark-bg: #0a0a0a;
          --dark-card: #1a1a1a;
          --light-text: #ffffff;
          --muted-text: #a0a0a0;
          --border-color: rgba(255, 255, 255, 0.1);
        }
        
        .landing-container {
          font-family: 'Inter', sans-serif;
          background: var(--dark-bg);
          color: var(--light-text);
          line-height: 1.6;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        
        .hero {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 100px 20px 60px;
          text-align: center;
        }
        
        .hero h1 {
          font-size: 3.2rem;
          margin-bottom: 20px;
          color: var(--light-text);
          background: var(--primary-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          max-width: 800px;
        }
        
        .hero p {
          font-size: 1.3rem;
          max-width: 700px;
          color: var(--muted-text);
          margin-bottom: 30px;
        }
        
        .cta-button {
          display: inline-block;
          margin: 15px 10px;
          padding: 16px 32px;
          background: var(--secondary-gradient);
          color: var(--light-text);
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(120, 119, 198, 0.2);
          text-decoration: none;
        }
        
        .cta-button.secondary {
          background: var(--dark-card);
          border: 1.5px solid var(--accent-gradient);
          color: var(--light-text);
        }
        
        .cta-button.success {
          background: var(--success-gradient);
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
          background: var(--accent-gradient);
          color: #fff;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 50px;
        }
        
        .section-title h2 {
          font-size: 2.5rem;
          font-weight: 600;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 15px;
        }
        
        .section-title p {
          max-width: 700px;
          margin: 0 auto;
          color: var(--muted-text);
          font-size: 1.1rem;
        }
        
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          padding: 80px 0;
          margin: 0 auto;
        }
        
        .feature {
          background: rgba(255,255,255,0.10);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 40px 30px;
          transition: all 0.4s ease;
          text-align: center;
        }
        
        .feature:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        
        .feature svg {
          font-size: 2.5rem;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
        }
        
        .feature h3 {
          color: var(--light-text);
          font-size: 1.4rem;
          margin-bottom: 15px;
        }
        
        .feature p {
          color: var(--muted-text);
          font-size: 1rem;
          margin-bottom: 20px;
        }
        
        .feature-button {
          display: inline-block;
          padding: 10px 24px;
          background: var(--accent-gradient);
          color: var(--light-text);
          border-radius: 20px;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
        }
        
        .feature-button:hover {
          background: var(--success-gradient);
        }
        
        .how-it-works {
          background: var(--dark-card);
          border-radius: 20px;
          padding: 80px 40px;
          margin: 60px 0;
          text-align: center;
        }
        
        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 30px;
          margin: 50px 0 0 0;
        }
        
        .step {
          background: rgba(255,255,255,0.08);
          border-radius: 15px;
          padding: 30px;
          transition: all 0.3s ease;
        }
        
        .step:hover {
          background: rgba(255,255,255,0.13);
          transform: scale(1.05);
        }
        
        .step-number {
          width: 50px;
          height: 50px;
          background: var(--accent-gradient);
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          font-weight: bold;
          margin: 0 auto 20px;
        }
        
        .step h3 {
          color: var(--light-text);
          margin-bottom: 15px;
        }
        
        .step p {
          color: var(--muted-text);
        }
        
        .samples {
          background: var(--dark-card);
          border-radius: 20px;
          padding: 80px 40px;
          margin: 60px 0;
          text-align: center;
        }
        
        .template-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }
        
        .template-card {
          background: rgba(255,255,255,0.10);
          border-radius: 20px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .template-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        }
        
        .template-img {
          height: 175px;
          overflow: hidden;
        }
        
        .template-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
        }
        
        .template-card:hover .template-img img {
          transform: scale(1.05);
        }
        
        .template-info {
          padding: 20px;
        }
        
        .template-info h3 {
          color: var(--light-text);
          margin-bottom: 10px;
          font-size: 1.2rem;
        }
        
        .template-info p {
          color: var(--muted-text);
          font-size: 0.95rem;
          margin-bottom: 15px;
        }
        
        .pricing {
          background: var(--dark-card);
          border-radius: 20px;
          padding: 80px 40px;
          margin: 60px 0;
          text-align: center;
        }
        
        .pricing-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }
        
        .pricing-card {
          background: rgba(255,255,255,0.10);
          border-radius: 20px;
          padding: 40px 30px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .pricing-card.popular::before {
          content: 'Most Popular';
          position: absolute;
          top: 15px;
          right: -30px;
          background: var(--secondary-gradient);
          color: white;
          padding: 5px 30px;
          transform: rotate(45deg);
          font-size: 0.8rem;
          font-weight: bold;
          z-index: 2;
        }
        
        .pricing-card h3 {
          font-size: 1.5rem;
          color: var(--light-text);
          margin-bottom: 15px;
        }
        
        .pricing-card .price {
          font-size: 2.5rem;
          font-weight: bold;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          display: inline-block;
        }
        
        .pricing-card .price span {
          font-size: 1rem;
          color: var(--muted-text);
          font-weight: normal;
          margin-left: 5px;
        }
        
        .pricing-card ul {
          list-style: none;
          margin-bottom: 30px;
          text-align: left;
        }
        
        .pricing-card ul li {
          margin-bottom: 10px;
          color: var(--muted-text);
          position: relative;
          padding-left: 25px;
        }
        
        .pricing-card ul li::before {
          content: '✓';
          color: #43e97b;
          position: absolute;
          left: 0;
        }
        
        .testimonials {
          background: var(--primary-gradient);
          border-radius: 20px;
          padding: 80px 40px;
          margin: 60px 0;
          text-align: center;
        }
        
        .testimonial {
          max-width: 700px;
          margin: 30px auto;
          padding: 30px;
          background: rgba(255,255,255,0.1);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .testimonial:hover {
          background: rgba(255,255,255,0.16);
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.12);
        }
        
        .testimonial img {
          height: 60px;
          margin-bottom: 20px;
          filter: grayscale(100%);
          transition: all 0.3s ease;
        }
        
        .testimonial:hover img {
          filter: grayscale(0%);
        }
        
        .testimonial p {
          font-size: 1.1rem;
          color: #f0f0f0;
          line-height: 1.8;
        }
        
        .testimonial p strong {
          color: #fff;
        }
        
        .newsletter {
          background: var(--secondary-gradient);
          border-radius: 20px;
          padding: 60px 40px;
          text-align: center;
          margin: 5px 0;
          color: white;
        }
        
        .newsletter h2 {
          font-size: 2rem;
          margin-bottom: 20px;
        }
        
        .newsletter p {
          max-width: 600px;
          margin: 0 auto 30px;
          opacity: 0.9;
        }
        
        .newsletter-form {
          display: flex;
          max-width: 500px;
          margin: 0 auto;
          background: rgba(255,255,255,0.1);
          border-radius: 8px;
          overflow: hidden;
        }
        
        .newsletter-form input {
          flex: 1;
          padding: 15px;
          border: none;
          font-size: 1rem;
          background: transparent;
          color: white;
        }
        
        .newsletter-form button {
          padding: 15px 25px;
          background: var(--dark-card);
          color: white;
          border: none;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .newsletter-form button:hover {
          background: var(--primary-gradient);
        }
        
        @media (max-width: 900px) {
          .container { padding: 0 8px; }
          .features, .pricing-cards, .steps, .template-container {
            grid-template-columns: 1fr;
          }
        }
        
        @media (max-width: 768px) {
          .hero { padding: 60px 10px 30px; }
          .section-title h2 { font-size: 2rem; }
          .features, .pricing-cards, .steps, .template-container {
            grid-template-columns: 1fr;
          }
          .how-it-works, .samples, .pricing, .testimonials, .newsletter {
            padding: 40px 10px;
          }
          .newsletter-form {
            flex-direction: column;
          }
          .newsletter-form input {
            border-radius: 4px 4px 0 0;
            margin-bottom: 10px;
          }
          .newsletter-form button {
            border-radius: 0 0 4px 4px;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroSection;