import React from 'react';
import { FaHome, FaUsers, FaTag, FaPlayCircle, FaQuoteLeft, FaEnvelope, FaRocket, FaLinkedin, FaTwitter, FaFacebook, FaCheck } from 'react-icons/fa';
import styled, { createGlobalStyle } from 'styled-components';

// Global Styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

  :root {
    --primary: #4361ee;
    --primary-dark: #3a56d4;
    --secondary: #2b2d42;
    --accent: #f72585;
    --light: #f8f9fa;
    --dark: #1a1a2e;
    --gray: #6c757d;
    --white: #ffffff;
    --success: #4cc9f0;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08);
    --shadow-lg: 0 10px 20px rgba(0,0,0,0.1), 0 6px 6px rgba(0,0,0,0.1);
    --shadow-primary: 0 5px 15px rgba(67, 97, 238, 0.3);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--light);
    color: var(--secondary);
    line-height: 1.6;
  }
`;

// Styled Components
const Header = styled.header`
  background: linear-gradient(135deg, var(--primary), var(--dark));
  color: var(--white);
  padding: 80px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;
    background: linear-gradient(to right, #fff, #e8e0e0);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 2px 10px rgba(0,0,0,0.2);
  }

  p {
    font-size: 1.4rem;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 20px 0;
  box-shadow: var(--shadow-md);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const NavLink = styled.a`
  margin: 0 20px;
  text-decoration: none;
  color: var(--secondary);
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  padding: 8px 16px;
  border-radius: 50px;
  display: flex;
  align-items: center;

  i {
    margin-right: 8px;
  }

  &:hover {
    color: var(--primary);
    background: #f0f4ff;
    transform: translateY(-2px);
  }

  &.nav-active {
    color: var(--white);
    background: var(--primary);
    box-shadow: var(--shadow-primary);
  }

  @media (max-width: 768px) {
    margin: 5px 10px;
    font-size: 1rem;
  }
`;

const Section = styled.section`
  padding: 80px 20px;
  text-align: center;

  &.hero {
    padding: 120px 20px;
    background: var(--white);
    position: relative;
  }

  &.packages {
    background: var(--light);
  }

  &.coaches {
    background: var(--white);
  }

  &.testimonials {
    background: var(--light);
  }

  &.cta {
    padding: 100px 20px;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: white;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: ${props => props.color || 'inherit'};
`;

const SectionSubtitle = styled.p`
  max-width: 700px;
  margin: 0 auto 40px;
  color: ${props => props.color || 'var(--gray)'};
  font-size: 1.2rem;
`;

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 15px 30px;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  margin: 0 10px;

  &.btn-primary {
    background: var(--primary);
    color: white;
    box-shadow: var(--shadow-primary);

    &:hover {
      background: var(--primary-dark);
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(67, 97, 238, 0.4);
    }
  }

  &.btn-secondary {
    background: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);

    &:hover {
      background: rgba(67, 97, 238, 0.1);
    }
  }

  &.btn-accent {
    background: var(--accent);
    color: white;
    box-shadow: 0 5px 15px rgba(247, 37, 133, 0.3);

    &:hover {
      background: #e5177b;
      transform: translateY(-3px);
    }
  }

  i {
    margin-right: 8px;
  }

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 300px;
    margin: 10px auto;
  }
`;

const PackageCards = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PackageCard = styled.div`
  background: var(--white);
  border-radius: 12px;
  padding: 40px 30px;
  width: 300px;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
  position: relative;

  &.popular {
    border: 2px solid var(--primary);
  }

  h3 {
    font-size: 1.5rem;
    color: var(--secondary);
    margin-bottom: 15px;
  }

  .price {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--primary);
    margin-bottom: 20px;

    span {
      font-size: 1rem;
      color: var(--gray);
      font-weight: normal;
    }
  }

  ul {
    list-style: none;
    margin-bottom: 30px;
  }

  li {
    margin-bottom: 10px;
    color: var(--gray);
    position: relative;
    padding-left: 25px;

    &::before {
      content: '✓';
      color: var(--success);
      position: absolute;
      left: 0;
    }
  }
`;

const CoachCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const CoachCard = styled.div`
  background: var(--white);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`;

const CoachImg = styled.div`
  height: 250px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${CoachCard}:hover & img {
    transform: scale(1.05);
  }
`;

const CoachInfo = styled.div`
  padding: 25px;

  h3 {
    font-size: 1.4rem;
    margin-bottom: 5px;
    color: var(--secondary);
  }

  .specialty {
    color: var(--primary);
    font-weight: 600;
    margin-bottom: 15px;
    display: block;
  }

  p {
    color: var(--gray);
    margin-bottom: 20px;
  }
`;

const TestimonialCarousel = styled.div`
  max-width: 1000px;
  margin: 40px auto 0;
`;

const Testimonial = styled.div`
  background: var(--white);
  padding: 40px;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  margin: 0 20px;

  img {
    height: 60px;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.1rem;
    color: var(--gray);
    line-height: 1.8;
    margin-bottom: 20px;

    strong {
      color: var(--secondary);
    }
  }
`;

const Footer = styled.footer`
  background: var(--dark);
  color: var(--white);
  padding: 60px 20px 30px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterColumn = styled.div`
  h3 {
    font-size: 1.3rem;
    margin-bottom: 20px;
    color: var(--white);
  }

  ul {
    list-style: none;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    color: #bbb;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--primary);
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;

  a {
    color: var(--white);
    font-size: 1.2rem;
    transition: color 0.3s ease;

    &:hover {
      color: var(--primary);
    }
  }
`;

const Copyright = styled.div`
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #444;
  text-align: center;
  color: #bbb;
`;

// React Components
const CareerElevatePro = () => {
  return (
    <>
      <GlobalStyle />
      
      <Section className="hero" id="home">
        <SectionTitle>Transform Your Career with Expert Guidance</SectionTitle>
        <SectionSubtitle>
          Get 1-on-1 coaching from top industry professionals, AI-powered tools, and proven frameworks to accelerate your career growth in today's competitive market.
        </SectionSubtitle>
        <div>
          <Button href="#packages" className="btn-primary"><FaRocket /> Explore Packages</Button>
          <Button href="#coaches" className="btn-secondary"><FaUsers /> Meet Our Coaches</Button>
        </div>
      </Section>
      
      <Section className="packages" id="packages">
        <SectionTitle>Our Career Coaching Packages</SectionTitle>
        <SectionSubtitle>Choose the perfect plan for your career goals and budget</SectionSubtitle>
        <PackageCards>
          <PackageCard>
            <h3>Career Clarity</h3>
            <div className="price">$297</div>
            <ul>
              <li>90-minute deep dive session</li>
              <li>Career assessment analysis</li>
              <li>Strengths & skills evaluation</li>
              <li>3 potential career path options</li>
              <li>Email follow-up support (1 week)</li>
            </ul>
            <Button href="#" className="btn-secondary">Get Started</Button>
          </PackageCard>
          <PackageCard className="popular">
            <h3>Job Search Accelerator</h3>
            <div className="price">$997</div>
            <ul>
              <li>4 coaching sessions (60 min each)</li>
              <li>Resume & LinkedIn optimization</li>
              <li>Interview preparation & mock interviews</li>
              <li>Personalized job search strategy</li>
              <li>Salary negotiation training</li>
              <li>Ongoing email support (4 weeks)</li>
            </ul>
            <Button href="#" className="btn-primary">Most Popular</Button>
          </PackageCard>
          <PackageCard>
            <h3>Executive Career</h3>
            <div className="price">$2,497</div>
            <ul>
              <li>8 coaching sessions (60 min each)</li>
              <li>Executive resume & LinkedIn rewrite</li>
              <li>Board-level interview preparation</li>
              <li>Personal branding strategy</li>
              <li>Executive compensation negotiation</li>
              <li>90-day onboarding support</li>
              <li>Priority scheduling</li>
            </ul>
            <Button href="#" className="btn-secondary">Get Started</Button>
          </PackageCard>
        </PackageCards>
      </Section>
      
      <Section className="coaches" id="coaches">
        <SectionTitle>Meet Our Expert Career Coaches</SectionTitle>
        <SectionSubtitle>Get guidance from professionals with real industry experience</SectionSubtitle>
        <CoachCards>
          <CoachCard>
            <CoachImg>
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Sarah Johnson" />
            </CoachImg>
            <CoachInfo>
              <h3>Sarah Johnson</h3>
              <span className="specialty">Tech Industry Specialist</span>
              <p>Former Google HR leader with 12+ years experience helping professionals break into FAANG companies.</p>
              <Button href="#" className="btn-secondary">View Profile</Button>
            </CoachInfo>
          </CoachCard>
          <CoachCard>
            <CoachImg>
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Michael Chen" />
            </CoachImg>
            <CoachInfo>
              <h3>Michael Chen</h3>
              <span className="specialty">Executive Career Coach</span>
              <p>Helped 150+ executives land C-suite roles with proven leadership development frameworks.</p>
              <Button href="#" className="btn-secondary">View Profile</Button>
            </CoachInfo>
          </CoachCard>
          <CoachCard>
            <CoachImg>
              <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Priya Patel" />
            </CoachImg>
            <CoachInfo>
              <h3>Priya Patel</h3>
              <span className="specialty">Interview Preparation Expert</span>
              <p>Specialist in interview strategy, mock interviews, and confidence-building for all experience levels.</p>
              <Button href="#" className="btn-secondary">View Profile</Button>
            </CoachInfo>
          </CoachCard>
          <CoachCard>
            <CoachImg>
              <img src="https://images.unsplash.com/photo-1519340333755-c8e4c1f0c3c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="David Kim" />
            </CoachImg>
            <CoachInfo>
              <h3>David Kim</h3>
              <span className="specialty">Personal Branding Coach</span>
              <p>Brand strategist with 10+ years experience empowering professionals to tell their unique story.</p>
              <Button href="#" className="btn-secondary">View Profile</Button>
            </CoachInfo>
          </CoachCard>
        </CoachCards>
      </Section>
      
      <Section className="testimonials" id="testimonials">
        <SectionTitle>Success Stories</SectionTitle>
        <TestimonialCarousel>
          <Testimonial>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Priya - Testimonial" />
            <p>
              "CareerElevate Pro's coaching gave me the confidence and tools to ace my interviews. I landed my dream job at a Fortune 500 company within 2 months!"
              <br />
              <strong>- Priya S., Product Manager</strong>
            </p>
          </Testimonial>
          <Testimonial>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="David - Testimonial" />
            <p>
              "The executive package was worth every penny. My coach helped me negotiate a 20% salary increase and a VP role. Highly recommended."
              <br />
              <strong>- David T., VP of Engineering</strong>
            </p>
          </Testimonial>
        </TestimonialCarousel>
      </Section>
      
      <Section className="cta" id="contact">
        <SectionTitle color="white">Ready to Elevate Your Career?</SectionTitle>
        <SectionSubtitle color="rgba(255,255,255,0.9)">
          Book a free consultation or connect with our team to start your transformation journey today.
        </SectionSubtitle>
        <Button href="mailto:hello@careerelevatepro.com" className="btn-accent"><FaEnvelope /> Get in Touch</Button>
      </Section>
      
      <Footer>
        <FooterContent>
          <FooterColumn>
            <h3>CareerElevate Pro</h3>
            <p>AI-powered career coaching, resume services, and interview prep to take your career to the next level.</p>
            <SocialLinks>
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaFacebook /></a>
            </SocialLinks>
          </FooterColumn>
          <FooterColumn>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#coaches">Our Coaches</a></li>
              <li><a href="#packages">Packages</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#testimonials">Success Stories</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </FooterColumn>
          <FooterColumn>
            <h3>Contact</h3>
            <ul>
              <li>Email: <a href="mailto:hello@careerelevatepro.com">hello@careerelevatepro.com</a></li>
              <li>Phone: (555) 123-4567</li>
              <li>Mon - Fri: 9am - 7pm EST</li>
            </ul>
          </FooterColumn>
        </FooterContent>
        <Copyright>
          &copy; 2025 CareerElevate Pro. All rights reserved.
        </Copyright>
      </Footer>
    </>
  );
};

export default CareerElevatePro;