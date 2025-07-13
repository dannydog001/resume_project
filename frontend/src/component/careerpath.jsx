import React, { useEffect } from 'react';
import { FaHome, FaMapSigns, FaHandsHelping, FaTools, FaQuoteLeft, FaEnvelope, FaPlay, FaUserTie, FaRocket, FaCalendarAlt, FaArrowUp, FaBrain, FaHeart, FaLightbulb, FaSearch, FaChartLine, FaUserFriends, FaBullseye, FaRoad, FaTasks, FaGraduationCap, FaLaptopCode, FaComments, FaFileAlt, FaNetworkWired, FaHandshake, FaChartPie, FaSwatchbook, FaDollarSign, FaProjectDiagram } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const CareerPathPro = () => {
  useEffect(() => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        // Remove active class from all nav items
        document.querySelectorAll('nav a').forEach(navItem => {
          navItem.classList.remove('nav-active');
        });
        // Add active class to clicked nav item
        this.classList.add('nav-active');
        // Scroll to target section
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if(targetElement){
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    // Add active class based on scroll position
    window.addEventListener('scroll', function() {
      const sections = document.querySelectorAll('section');
      const navItems = document.querySelectorAll('nav a');
      let currentSection = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= (sectionTop - 300)) {
          currentSection = section.getAttribute('id');
        }
      });
      navItems.forEach(item => {
        item.classList.remove('nav-active');
        if (item.getAttribute('href') === `#${currentSection}`) {
          item.classList.add('nav-active');
        }
      });
    });

    // Animate step cards as they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.13 });
    document.querySelectorAll('.step-content').forEach(card => {
      observer.observe(card);
    });

    document.addEventListener('scroll', function() {
      const header = document.querySelector('header');
      if(header) {
        header.style.backgroundPositionY = `${window.scrollY * 0.2}px`;
      }
    });

    // Scroll to Top button functionality
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Show or hide the Scroll to Top button
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'block';
      } else {
        scrollTopBtn.style.display = 'none';
      }
    });

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <div className="career-path-pro">
      <style jsx>{`
        :root {
          --primary: #4361ee;
          --primary-dark: #3a56d4;
          --primary-light: #6ea8fe;
          --secondary: #232946;
          --accent: #f72585;
          --accent-dark: #e5177b;
          --light: #f8f9fa;
          --dark: #16161a;
          --gray: #6c757d;
          --white: #ffffff;
          --success: #4cc9f0;
          --warning: #f8961e;
          --danger: #ef233c;
          --info: #4895ef;
          --dark-blue: #14213d;
          --transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          --shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
          --shadow-md: 0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08);
          --shadow-lg: 0 10px 20px rgba(0,0,0,0.08), 0 6px 6px rgba(0,0,0,0.1);
          --shadow-xl: 0 15px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.06);
          --shadow-primary: 0 5px 15px rgba(67, 97, 238, 0.12);
          --glass-bg: rgba(255,255,255,0.8);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .career-path-pro {
          font-family: 'Inter', 'Montserrat', Arial, sans-serif;
          background: linear-gradient(120deg, #f7f9fd 0%, #e8f0fe 100%);
          color: var(--secondary);
          min-height: 100vh;
          background-size: 200% 200%;
          animation: bodyGradient 18s ease-in-out infinite;
        }
        @keyframes bodyGradient {
          0% { background-position: 0% 80%; }
          50% { background-position: 100% 20%; }
          100% { background-position: 0% 80%; }
        }

        /* Hero section */
        .hero {
          padding: 180px 20px 90px 20px;
          text-align: center;
          background: linear-gradient(135deg, var(--primary) 15%, var(--accent) 100%);
          color: var(--white);
          position: relative;
          overflow: hidden;
          background-size: 200% 200%;
          animation: gradientBG 12s ease-in-out infinite;
          box-shadow: 0 8px 32px 0 rgba(67,97,238,0.13);
        }
        @keyframes gradientBG {
          0% { background-position: 0% 80%; }
          50% { background-position: 100% 20%; }
          100% { background-position: 0% 80%; }
        }

        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 18px;
          font-family: 'Montserrat', 'Inter', Arial, sans-serif;
          font-weight: 900;
          letter-spacing: 1px;
          background: linear-gradient(to right, #fff, #e0e0e0 70%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 5px 20px rgba(67,97,238,0.18);
        }

        .hero p {
          font-size: 1.45rem;
          max-width: 700px;
          margin: 0 auto 38px;
          opacity: 0.95;
          font-weight: 500;
          letter-spacing: 0.03em;
        }

        /* Glassmorphic Navbar */
        nav {
          display: flex;
          justify-content: center;
          background: var(--glass-bg);
          padding: 18px 0;
          box-shadow: var(--shadow-md);
          border-radius: 0 0 30px 30px;
          position: sticky;
          top: 0;
          z-index: 1000;
          -webkit-backdrop-filter: blur(13px);
          backdrop-filter: blur(13px);
          border-bottom: 3px solid;
          border-image: linear-gradient(90deg, var(--primary), var(--accent)) 1;
        }

        nav a {
          margin: 0 16px;
          text-decoration: none;
          color: var(--secondary);
          font-weight: 700;
          font-size: 1.07rem;
          transition: var(--transition);
          padding: 8px 22px;
          border-radius: 40px;
          display: flex;
          align-items: center;
          letter-spacing: 0.03em;
          background: transparent;
        }
        nav a i {
          margin-right: 9px;
        }
        nav a:hover, nav a.nav-active {
          color: var(--white);
          background: linear-gradient(90deg, var(--primary) 60%, var(--accent));
          box-shadow: var(--shadow-primary);
          transform: translateY(-2px) scale(1.05);
        }

        /* Section Titles */
        .section-title {
          text-align: center;
          margin-bottom: 54px;
          animation: fadeIn 1.2s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px);}
          to   { opacity: 1; transform: translateY(0);}
        }
        .section-title h2 {
          font-size: 2.3rem;
          color: var(--secondary);
          font-family: 'Montserrat', Arial, sans-serif;
          font-weight: 900;
          position: relative;
          display: inline-block;
          padding-bottom: 13px;
          letter-spacing: 0.03em;
        }
        .section-title h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 76px;
          height: 3px;
          background: linear-gradient(90deg, var(--primary) 60%, var(--accent));
          border-radius: 2px;
        }
        .section-title p {
          max-width: 650px;
          margin: 16px auto 0;
          color: var(--gray);
          font-size: 1.13rem;
        }

        /* Steps Section */
        .guidance {
          padding: 90px 20px;
          background: linear-gradient(120deg, #f7f9fd 70%, #e8f0fe 100%);
        }
        .steps-container {
          max-width: 1100px;
          margin: 0 auto;
        }
        .step {
          display: flex;
          margin-bottom: 56px;
          align-items: flex-start;
          position: relative;
          z-index: 1;
        }
        .step-number {
          width: 62px;
          height: 62px;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 900;
          margin-right: 32px;
          box-shadow: var(--shadow-primary);
          border: 3px solid var(--primary-light);
          outline: 4px solid #fff;
        }
        .step-content {
          background: var(--white);
          padding: 32px 32px 28px 32px;
          border-radius: 16px;
          box-shadow: var(--shadow-md);
          flex-grow: 1;
          transition: var(--transition);
          opacity: 0;
          transform: translateY(30px);
        }
        .step-content.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .step-content:hover {
          transform: translateY(-7px) scale(1.01);
          box-shadow: var(--shadow-lg);
        }
        .step h3 {
          font-size: 1.45rem;
          color: var(--primary-dark);
          margin-bottom: 13px;
          font-weight: 700;
          font-family: 'Montserrat', 'Inter', Arial, sans-serif;
        }
        .step p {
          color: var(--gray);
          margin-bottom: 18px;
        }
        .step-resources {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #eee;
          display: flex;
          flex-wrap: wrap;
          gap: 13px;
        }
        .resource-card {
          display: flex;
          align-items: center;
          padding: 13px 16px;
          background: var(--light);
          border-radius: 10px;
          margin-bottom: 6px;
          transition: var(--transition), box-shadow 0.23s;
          min-width: 200px;
          box-shadow: 0 1px 3px rgba(67,97,238,0.05);
        }
        .resource-card:hover {
          background: var(--primary-light);
          color: #fff;
          transform: translateX(8px) scale(1.06);
          box-shadow: 0 8px 24px 0 rgba(67,97,238,0.13);
        }
        .resource-icon {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, var(--primary) 60%, var(--accent));
          color: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 13px;
          font-size: 1.3rem;
        }
        .resource-info h4 {
          font-size: 1.09rem;
          font-weight: 700;
          margin-bottom: 2px;
        }
        .resource-info p {
          font-size: 0.94rem;
          color: var(--gray);
          margin: 0;
        }

        /* Coaching Services Section */
        .services {
          padding: 90px 20px;
          background: #fff;
        }
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
          margin-top: 44px;
        }
        .service-card {
          background: var(--light);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          transition: var(--transition);
          display: flex;
          flex-direction: column;
        }
        .service-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: var(--shadow-lg);
        }
        .service-img {
          height: 195px;
          overflow: hidden;
        }
        .service-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(.62,-0.14,.62,1.24);
        }
        .service-card:hover .service-img img {
          transform: scale(1.07) rotate(-1deg);
        }
        .service-info {
          padding: 27px 26px 23px 26px;
          flex-grow: 1;
        }
        .service-info h3 {
          font-size: 1.22rem;
          margin-bottom: 12px;
          color: var(--primary-dark);
          font-family: 'Montserrat', Arial, sans-serif;
        }
        .service-info p {
          color: var(--gray);
          margin-bottom: 19px;
          font-size: 1.01rem;
        }

        /* Tools Section */
        .tools {
          padding: 90px 20px;
          background: linear-gradient(120deg, #f7f9fd 60%, #e8f0fe 100%);
        }
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 28px;
          margin-top: 36px;
        }
        .tool-card {
          background: var(--white);
          border-radius: 15px;
          padding: 28px 24px 22px 24px;
          box-shadow: var(--shadow-md);
          transition: var(--transition);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .tool-card:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: var(--shadow-lg);
        }
        .tool-icon {
          font-size: 2.6rem;
          color: var(--primary);
          margin-bottom: 17px;
        }
        .tool-card h3 {
          font-size: 1.13rem;
          margin-bottom: 13px;
          color: var(--primary-dark);
          font-family: 'Montserrat', Arial, sans-serif;
        }
        .tool-card p {
          color: var(--gray);
          margin-bottom: 17px;
          font-size: 0.98rem;
        }

        /* CTA Section */
        .cta {
          padding: 90px 20px;
          text-align: center;
          background: linear-gradient(120deg, var(--primary) 70%, var(--accent) 100%);
          color: white;
        }
        .cta h2 {
          font-size: 2.3rem;
          margin-bottom: 17px;
          letter-spacing: 0.02em;
          font-family: 'Montserrat', Arial, sans-serif;
          font-weight: 900;
        }
        .cta p {
          max-width: 670px;
          margin: 0 auto 36px;
          font-size: 1.1rem;
          opacity: 0.96;
          font-weight: 500;
        }

        /* Buttons */
        .btn {
          display: inline-flex;
          align-items: center;
          padding: 13px 28px;
          border-radius: 50px;
          font-weight: 700;
          text-decoration: none;
          transition: var(--transition);
          margin: 0 8px;
          font-size: 1.05rem;
          border: none;
          outline: none;
          cursor: pointer;
          box-shadow: 0 2px 7px rgba(67, 97, 238, 0.13);
          letter-spacing: 0.01em;
        }
        .btn i {
          margin-right: 8px;
        }
        .btn-primary {
          background: linear-gradient(90deg, var(--primary), var(--accent));
          color: white;
          box-shadow: 0 4px 24px 0 rgba(67,97,238,0.18), 0 2px 8px 0 rgba(247,37,133,0.09);
        }
        .btn-primary:hover {
          background: linear-gradient(90deg, var(--accent), var(--primary));
          transform: translateY(-3px) scale(1.05);
        }
        .btn-secondary {
          background: transparent;
          color: var(--primary);
          border: 2px solid var(--primary);
        }
        .btn-secondary:hover {
          background: var(--primary);
          color: #fff;
        }
        .btn-accent {
          background: linear-gradient(90deg, var(--accent), var(--accent-dark));
          color: white;
          box-shadow: 0 5px 15px rgba(247, 37, 133, 0.16);
        }
        .btn-accent:hover {
          background: linear-gradient(90deg, var(--accent-dark), var(--accent));
          transform: translateY(-3px) scale(1.05);
        }
        .btn-white {
          background: var(--white);
          color: var(--primary);
          box-shadow: var(--shadow-md);
          border: 2px solid #fff;
        }
        .btn-white:hover {
          background: var(--primary-light);
          color: #fff;
          border: 2px solid var(--primary-light);
        }

        /* Floating CTA */
        .floating-cta {
          position: fixed;
          bottom: 38px;
          right: 38px;
          background: linear-gradient(135deg, var(--accent), var(--primary));
          color: #fff;
          border-radius: 50%;
          width: 62px;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          box-shadow: 0 8px 32px 0 rgba(67,97,238,0.18);
          z-index: 2000;
          transition: background 0.2s, transform 0.18s;
          animation: bounce 2.2s infinite;
        }
        .floating-cta:hover {
          background: linear-gradient(135deg, var(--primary), var(--accent));
          transform: scale(1.08) translateY(-4px);
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-10px);}
        }

        /* Scroll to Top Button */
        #scrollTopBtn {
          display: none;
          position: fixed;
          bottom: 110px;
          right: 38px;
          z-index: 2001;
          background: var(--primary);
          color: #fff;
          border: none;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          font-size: 1.5rem;
          box-shadow: 0 4px 16px rgba(67,97,238,0.18);
          cursor: pointer;
          transition: background 0.2s, transform 0.18s;
        }
        #scrollTopBtn:hover {
          background: var(--accent);
          transform: scale(1.08);
        }

        /* Responsive */
        @media (max-width: 1000px) {
          .steps-container, .services-grid, .tools-grid {
            max-width: 98vw;
            gap: 22px;
          }
        }
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.3rem;
          }
          nav {
            flex-wrap: wrap;
          }
          nav a {
            margin: 4px 7px;
            font-size: 1rem;
            padding: 8px 12px;
          }
          .step {
            flex-direction: column;
            align-items: stretch;
          }
          .step-number {
            margin-right: 0;
            margin-bottom: 12px;
            align-self: flex-start;
          }
          .btn {
            display: block;
            width: 100%;
            max-width: 260px;
            margin: 9px auto;
          }
        }
        @media (max-width: 520px) {
          .section-title h2, .cta h2 {
            font-size: 1.3rem;
          }
          .hero h1 {
            font-size: 1.1rem;
          }
          .step-content, .resource-card, .tool-card, .service-info {
            padding: 16px !important;
          }
        }
      `}</style>

      {/* Hero section */}
      <section className="hero" id="home">
        <h1>CareerPath Pro</h1>
        <p>Your complete step-by-step guide to career success with personalized tools, assessments, and expert coaching</p>
        <div>
          <a href="#guidance" className="btn btn-primary"><FaPlay /> Start Your Journey</a>
          <a href="#services" className="btn btn-white"><FaUserTie /> Explore Coaching</a>
        </div>
      </section>

     
      <section className="guidance" id="guidance">
        <div className="section-title">
          <h2>Your Step-by-Step Career Roadmap</h2>
          <p>Follow our proven framework used by top career coaches and professionals worldwide</p>
        </div>
        <div className="steps-container">
          {/* Step 1 */}
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Self-Assessment & Discovery</h3>
              <p>Begin your career journey by understanding your unique strengths, values, and interests. Our comprehensive assessments help you gain clarity about what truly motivates you and what career paths align with your personality.</p>
              <div className="step-resources">
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaBrain />
                  </div>
                  <div className="resource-info">
                    <h4>Skills Assessment</h4>
                    <p>Identify your core competencies and transferable skills</p>
                  </div>
                </div>
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaHeart />
                  </div>
                  <div className="resource-info">
                    <h4>Values Evaluation</h4>
                    <p>Discover what work environments and values matter most to you</p>
                  </div>
                </div>
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaLightbulb />
                  </div>
                  <div className="resource-info">
                    <h4>Interest Profiler</h4>
                    <p>Explore careers that match your passions and interests</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Career Exploration</h3>
              <p>Discover potential career paths that align with your assessment results. Research industries, job roles, and growth opportunities to create a shortlist of promising options.</p>
              <div className="step-resources">
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaSearch />
                  </div>
                  <div className="resource-info">
                    <h4>Career Database</h4>
                    <p>Explore 1000+ career options with detailed information</p>
                  </div>
                </div>
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaChartLine />
                  </div>
                  <div className="resource-info">
                    <h4>Industry Trends</h4>
                    <p>Learn about growing fields and emerging opportunities</p>
                  </div>
                </div>
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaUserFriends />
                  </div>
                  <div className="resource-info">
                    <h4>Mentor Matching</h4>
                    <p>Connect with professionals in your fields of interest</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Goal Setting & Planning</h3>
              <p>Transform your career aspirations into actionable goals. Create a strategic plan with milestones and timelines to keep you on track toward your ideal career.</p>
              <div className="step-resources">
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaBullseye />
                  </div>
                  <div className="resource-info">
                    <h4>SMART Goal Planner</h4>
                    <p>Create Specific, Measurable, Achievable goals</p>
                  </div>
                </div>
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaRoad />
                  </div>
                  <div className="resource-info">
                    <h4>Career Roadmap</h4>
                    <p>Visualize your path with short-term and long-term objectives</p>
                  </div>
                </div>
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaTasks />
                  </div>
                  <div className="resource-info">
                    <h4>Action Plan Generator</h4>
                    <p>Break down big goals into manageable steps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 4 */}
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Skill Development</h3>
              <p>Bridge any gaps between your current skills and those required for your target roles. Access personalized learning recommendations and track your progress.</p>
              <div className="step-resources">
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaGraduationCap />
                  </div>
                  <div className="resource-info">
                    <h4>Learning Paths</h4>
                    <p>Curated courses and resources for your career goals</p>
                  </div>
                </div>
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaLaptopCode />
                  </div>
                  <div className="resource-info">
                    <h4>Technical Skill Builder</h4>
                    <p>Master in-demand technical skills for your field</p>
                  </div>
                </div>
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaComments />
                  </div>
                  <div className="resource-info">
                    <h4>Soft Skills Training</h4>
                    <p>Develop communication, leadership, and teamwork skills</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step 5 */}
          <div className="step">
            <div className="step-number">5</div>
            <div className="step-content">
              <h3>Job Search Strategy</h3>
              <p>Learn proven techniques for finding and securing your ideal position. From networking to interview preparation, we'll help you stand out in a competitive market.</p>
              <div className="step-resources">
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaFileAlt />
                  </div>
                  <div className="resource-info">
                    <h4>Resume Builder</h4>
                    <p>Create ATS-friendly resumes tailored to each application</p>
                  </div>
                </div>
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaNetworkWired />
                  </div>
                  <div className="resource-info">
                    <h4>Networking Guide</h4>
                    <p>Master the art of professional connections</p>
                  </div>
                </div>
                <div className="resource-card">
                  <div className="resource-icon">
                    <FaHandshake />
                  </div>
                  <div className="resource-info">
                    <h4>Interview Simulator</h4>
                    <p>Practice with AI-powered mock interviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-title">
          <h2>Professional Career Coaching</h2>
          <p>Get personalized guidance from our certified career coaches and industry experts</p>
        </div>
        <div className="services-grid">
          <div className="service-card">
            <div className="service-img">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Career Coaching" />
            </div>
            <div className="service-info">
              <h3>1-on-1 Career Coaching</h3>
              <p>Personalized sessions to help you navigate career transitions, develop strategies, and achieve your professional goals.</p>
              <a href="#" className="btn btn-primary">Learn More</a>
            </div>
          </div>
          <div className="service-card">
            <div className="service-img">
              <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Resume Review" />
            </div>
            <div className="service-info">
              <h3>Resume & LinkedIn Makeover</h3>
              <p>Transform your professional documents to stand out to recruiters and hiring managers.</p>
              <a href="#" className="btn btn-primary">Learn More</a>
            </div>
          </div>
          <div className="service-card">
            <div className="service-img">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Interview Coaching" />
            </div>
            <div className="service-info">
              <h3>Interview Preparation</h3>
              <p>Master the art of interviewing with mock sessions and personalized feedback.</p>
              <a href="#" className="btn btn-primary">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      <section className="tools" id="tools">
        <div className="section-title">
          <h2>Powerful Career Tools</h2>
          <p>Access our suite of assessments and resources to accelerate your career growth</p>
        </div>
        <div className="tools-grid">
          <div className="tool-card">
            <div className="tool-icon">
              <FaChartPie />
            </div>
            <h3>Career Aptitude Test</h3>
            <p>Discover careers that match your personality, skills, and interests with our comprehensive assessment.</p>
           <NavLink to="/assessment" className="btn btn-secondary">Take Assessment</NavLink> 
          </div>
          <div className="tool-card">
            <div className="tool-icon">
              <FaSwatchbook />
            </div>
            <h3>Skills Gap Analyzer</h3>
            <p>Identify the skills you need to develop to reach your career goals.</p>
            <NavLink to="/skillsgap" className="btn btn-secondary">Start Analysis</NavLink>
          </div>
          <div className="tool-card">
            <div className="tool-icon">
              <FaDollarSign />
            </div>
            <h3>Salary Negotiation Simulator</h3>
            <p>Practice salary negotiations and learn strategies to maximize your compensation.</p>
            <NavLink to="/salary" className="btn btn-secondary">Try Simulator</NavLink>
          </div>
          <div className="tool-card">
            <div className="tool-icon">
              <FaProjectDiagram />
            </div>
            <h3>Career Path Visualizer</h3>
            <p>See potential career trajectories and advancement opportunities in your field.</p>
           <NavLink to="/careervisual" className="btn btn-secondary">Explore Paths</NavLink>
          </div>
        </div>
      </section>

      <section className="cta" id="cta">
        <h2>Ready to Transform Your Career?</h2>
        <p>Join thousands of professionals who have accelerated their careers with CareerPath Pro</p>
        <div>
          <a href="#" className="btn btn-accent"><FaRocket /> Get Started Today</a>
          <a href="#" className="btn btn-white"><FaCalendarAlt /> Book Free Consultation</a>
        </div>
      </section>

      <a href="#cta" className="floating-cta" title="Get Started">
        <FaRocket />
      </a>
      <button id="scrollTopBtn" title="Back to Top"><FaArrowUp /></button>
    </div>
  );
};

export default CareerPathPro;