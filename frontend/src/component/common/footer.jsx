import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-column">
          <h3>JobSeekerPro</h3>
          <p>Your complete career success platform, helping professionals land their dream jobs since 2020.</p>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
        <div className="footer-column">
          <h3>Features</h3>
          <ul>
            <li><a href="#features">Resume Builder</a></li>
            <li><a href="#features">Cover Letters</a></li>
            <li><a href="#features">Interview Prep</a></li>
            <li><a href="#features">LinkedIn Optimization</a></li>
            <li><a href="#features">Job Alerts</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Resources</h3>
          <ul>
            <li><a href="#">Career Blog</a></li>
            <li><a href="#">Resume Samples</a></li>
            <li><a href="#">Cover Letter Examples</a></li>
            <li><a href="#">Interview Questions</a></li>
            <li><a href="#">Salary Guides</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2025 JobSeekerPro. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
      </div>
      <style jsx>{`
        footer {
            background: #0a0a0a;
            padding: 60px 0 30px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin-top: 0px;
        }
        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            max-width: 1200px;
            margin: 0 auto 40px auto;
            text-align: left;
        }
        .footer-column h3 {
            color: #ffffff;
            margin-bottom: 20px;
            font-size: 1.2rem;
        }
        .footer-column p, .footer-column ul, .footer-column ul li {
            color: #a0a0a0;
        }
        .footer-column ul {
            list-style: none;
        }
        .footer-column ul li {
            margin-bottom: 10px;
        }
        .footer-column ul li a {
            color: #bbb;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        .footer-column ul li a:hover {
            color: #4facfe;
            -webkit-text-fill-color: initial;
        }
        .social-links {
            display: flex;
            gap: 15px;
            margin-top: 20px;
        }
        .social-links a {
            color: #ffffff;
            font-size: 1.2rem;
            transition: color 0.3s ease;
        }
        .social-links a:hover {
            color: #43e97b;
        }
        .copyright {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            color: #a0a0a0;
            font-size: 0.9rem;
        }

        @media (max-width: 900px) {
            .footer-content {
                grid-template-columns: 1fr;
                text-align: center;
            }
            .footer-column {
                margin-bottom: 30px;
            }
            .social-links {
                justify-content: center;
            }
        }
      `}</style>
    </footer>
  );
};

export default Footer;