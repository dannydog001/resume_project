import React, { useEffect, useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

// Global Styles with soothing color palette
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  :root {
    --primary-color: #4a6fa5;
    --secondary-color: #6b8cae;
    --accent-color: #7a9cc6;
    --success-color: #5a9b7a;
    --background-color: #f8f9fa;
    --card-background: #ffffff;
    --text-color: #3a4a58;
    --muted-text: #6c757d;
    --border-color: #e0e6ed;
    --light-text: #ffffff;
    --primary-gradient: linear-gradient(135deg, #4a6fa5 0%, #6b8cae 100%);
    --secondary-gradient: linear-gradient(135deg, #e6f0f8 0%, #d4e3f0 100%);
    --accent-gradient: linear-gradient(135deg, #7a9cc6 0%, #9ab7d8 100%);
    --success-gradient: linear-gradient(135deg, #5a9b7a 0%, #7ab893 100%);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', Arial, sans-serif;
    background: var(--background-color);
    color: var(--text-color);
    line-height: 1.6;
    overflow-x: hidden;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0 15px;
    }
    
    .section-title, .benefits-title {
      font-size: 2rem;
    }
    
    .cta-title {
      font-size: 2rem;
    }
  }
`;

// Animations (unchanged from previous version)
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-18px) rotate(1deg); }
  66% { transform: translateY(-8px) rotate(-1deg); }
`;

const slideAnimation = keyframes`
  0% { transform: translateX(-30px); }
  100% { transform: translateX(30px); }
`;

const glowAnimation = keyframes`
  from { text-shadow: 0 0 20px rgba(255,255,255,0.45); }
  to { text-shadow: 0 0 32px rgba(255,255,255,0.8); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Updated Components with new color scheme
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BGAnimation = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: 
    radial-gradient(circle at 20% 80%, rgba(74, 111, 165, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(107, 140, 174, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 60% 60%, rgba(122, 156, 198, 0.05) 0%, transparent 50%);
  animation: ${floatAnimation} 22s ease-in-out infinite;
`;

const Header = styled.header`
  position: relative;
  padding: 60px 0 40px;
  text-align: center;
  background: var(--primary-gradient);
  background-attachment: fixed;
  overflow: hidden;
  color: var(--light-text);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 100%;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(255,255,255,0.05) 2px,
      rgba(255,255,255,0.05) 4px
    );
    animation: ${slideAnimation} 18s linear infinite;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 18px;
  color: var(--light-text);
  animation: ${glowAnimation} 2s ease-in-out infinite alternate;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto 34px;
  opacity: 0.9;
  color: rgba(255,255,255,0.85);
`;

const GlassCard = styled.div`
  background: var(--card-background);
  border-radius: 20px;
  padding: 40px;
  margin: 40px 0;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  animation: ${fadeInUp} 0.6s ease-out forwards;
  opacity: 0;
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin: 48px 0 38px;
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 13px;
`;

const SectionSubtitle = styled.p`
  color: var(--muted-text);
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin: 60px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ServiceCard = styled.div`
  background: var(--card-background);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid var(--border-color);
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.03);
  animation: ${fadeInUp} 0.6s ease-out forwards;
  opacity: 0;
  animation-delay: ${props => props.delay || '0ms'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--accent-gradient);
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: var(--primary-color);
`;

const ServiceList = styled.ul`
  list-style: none;

  li {
    padding: 8px 0;
    color: var(--muted-text);
    position: relative;
    padding-left: 25px;

    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: var(--success-color);
      font-weight: bold;
    }
  }
`;

const BenefitsSection = styled.section`
  background: var(--card-background);
  border-radius: 20px;
  padding: 50px 40px;
  margin: 60px 0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  border: 1px solid var(--border-color);
`;

const BenefitsTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: var(--success-color);
  margin-bottom: 30px;
  text-align: center;
`;

const BenefitsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 22px 48px;
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BenefitItem = styled.li`
  padding-left: 30px;
  position: relative;
  color: var(--muted-text);
  font-size: 1.07rem;
  animation: ${fadeInUp} 0.6s ease-out forwards;
  opacity: 0;
  animation-delay: ${props => props.delay || '0ms'};

  &::before {
    content: "✦";
    color: var(--success-color);
    position: absolute;
    left: 0;
    font-weight: bold;
  }

  strong {
    color: var(--text-color);
  }
`;

const CTASection = styled.section`
  background: var(--secondary-gradient);
  border-radius: 20px;
  padding: 50px 40px;
  text-align: center;
  margin: 60px 0;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--border-color);
`;

const CTAContent = styled.div`
  position: relative;
  z-index: 2;
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 18px;
  color: var(--primary-color);
`;

const CTAButton = styled.a`
  display: inline-block;
  background: var(--primary-color);
  color: var(--light-text);
  padding: 14px 32px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 30px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: none;
  box-shadow: 0 5px 15px rgba(74, 111, 165, 0.3);

  &:hover {
    background: var(--accent-color);
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(74, 111, 165, 0.4);
  }
`;

const ContactSection = styled.section`
  background: var(--card-background);
  border-radius: 20px;
  padding: 45px 40px;
  text-align: center;
  margin: 60px 0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  border: 1px solid var(--border-color);
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const ContactItem = styled.div`
  padding: 18px;
  border-radius: 15px;
  background: rgba(74, 111, 165, 0.05);
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);

  &:hover {
    background: rgba(74, 111, 165, 0.1);
    transform: translateY(-5px);
  }
`;

const ContactIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 15px;
  color: var(--primary-color);
`;

const Footer = styled.footer`
  background: var(--primary-color);
  padding: 36px 0;
  text-align: center;
  color: var(--light-text);
  margin-top: 70px;
`;

const TestimonialSection = styled.section`
  margin: 60px 0;
`;

const TestimonialCard = styled.div`
  background: var(--card-background);
  border-radius: 20px;
  padding: 30px;
  margin: 20px 0;
  border-left: 4px solid var(--accent-color);
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  border: 1px solid var(--border-color);

  p {
    color: var(--text-color);
    margin-bottom: 10px;
    
    strong {
      color: var(--primary-color);
    }
  }
`;

const ProcessSteps = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
`;

const ProcessStep = styled.div`
  flex: 1;
  min-width: 200px;
  max-width: 250px;
  background: var(--card-background);
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }

  h3 {
    color: var(--primary-color);
    margin-bottom: 10px;
  }

  p {
    color: var(--muted-text);
    font-size: 0.9rem;
  }

  &::before {
    content: '${props => props.number}';
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 30px;
    background: var(--accent-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 40px 0;
`;

const StatCard = styled.div`
  background: var(--card-background);
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  border: 1px solid var(--border-color);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 10px;
`;

const StatLabel = styled.div`
  color: var(--muted-text);
  font-size: 0.9rem;
`;

const ProfileBuildingPage = () => {
  const [gradientStep, setGradientStep] = useState(0);

  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.animation = `${fadeInUp} 0.6s ease-out forwards`;
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });

    // Gradient animation
    const gradientInterval = setInterval(() => {
      setGradientStep(prev => (prev + 1) % 360);
    }, 100);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      clearInterval(gradientInterval);
    };
  }, []);

  return (
    <>
      <GlobalStyles />
      <BGAnimation style={{
        background: `linear-gradient(${135 + gradientStep}deg, rgba(74, 111, 165, 0.1) 0%, rgba(107, 140, 174, 0.1) 100%)`
      }} />
     

      <Container>
        <GlassCard className="animate-on-scroll">
          <SectionHeader>
            <SectionTitle>Elevate Your Professional Presence</SectionTitle>
          </SectionHeader>
          <p>In today's competitive landscape, your professional profile is your digital handshake. Whether you're a job seeker, entrepreneur, or executive, a well-crafted profile can open doors to new opportunities, clients, and career growth.</p>
          <p>At <strong>CareerCraft</strong>, we specialize in creating compelling, results-driven profiles that showcase your unique value proposition and help you make the right impression every time.</p>
        </GlassCard>

        <SectionHeader>
          <SectionTitle>Our Comprehensive Profile Building Services</SectionTitle>
          <SectionSubtitle>Tailored solutions to help you stand out in your industry</SectionSubtitle>
        </SectionHeader>
        
        <ServicesGrid>
          <ServiceCard delay="100ms" className="animate-on-scroll">
            <ServiceTitle>LinkedIn Profile Optimization</ServiceTitle>
            <ServiceList>
              <li>Professional headline & summary</li>
              <li>Keyword optimization for visibility</li>
              <li>Skills & endorsements enhancement</li>
              <li>Networking strategy development</li>
              <li>Content posting strategy</li>
              <li>Recommendation guidance</li>
            </ServiceList>
          </ServiceCard>
          
          <ServiceCard delay="200ms" className="animate-on-scroll">
            <ServiceTitle>Resume/CV Writing</ServiceTitle>
            <ServiceList>
              <li>ATS-friendly formatting</li>
              <li>Industry-specific customization</li>
              <li>Achievement-focused content</li>
              <li>Cover letter & bio development</li>
              <li>Multiple versions for different roles</li>
              <li>Digital & print-ready formats</li>
            </ServiceList>
          </ServiceCard>
          
          <ServiceCard delay="300ms" className="animate-on-scroll">
            <ServiceTitle>Executive Branding</ServiceTitle>
            <ServiceList>
              <li>CEO/Leadership profiles</li>
              <li>Speaker & board profiles</li>
              <li>Investor pitch bios</li>
              <li>Corporate storytelling</li>
              <li>Media kit development</li>
              <li>Thought leadership strategy</li>
            </ServiceList>
          </ServiceCard>
          
          <ServiceCard delay="400ms" className="animate-on-scroll">
            <ServiceTitle>Freelancer Profiles</ServiceTitle>
            <ServiceList>
              <li>Upwork/Fiverr optimization</li>
              <li>Portfolio development</li>
              <li>Client testimonial integration</li>
              <li>Service pitch crafting</li>
              <li>Gig description writing</li>
              <li>Pricing strategy guidance</li>
            </ServiceList>
          </ServiceCard>
        </ServicesGrid>

        <SectionHeader>
          <SectionTitle>Our Proven Process</SectionTitle>
          <SectionSubtitle>How we craft your perfect professional profile</SectionSubtitle>
        </SectionHeader>
        
        <ProcessSteps>
          <ProcessStep number="1" className="animate-on-scroll">
            <h3>Discovery</h3>
            <p>We analyze your goals, target audience, and current profile</p>
          </ProcessStep>
          <ProcessStep number="2" className="animate-on-scroll">
            <h3>Strategy</h3>
            <p>We develop a customized profile enhancement plan</p>
          </ProcessStep>
          <ProcessStep number="3" className="animate-on-scroll">
            <h3>Content Creation</h3>
            <p>Our experts craft compelling profile content</p>
          </ProcessStep>
          <ProcessStep number="4" className="animate-on-scroll">
            <h3>Optimization</h3>
            <p>We refine for maximum impact and visibility</p>
          </ProcessStep>
          <ProcessStep number="5" className="animate-on-scroll">
            <h3>Delivery</h3>
            <p>You receive your enhanced profile with guidance</p>
          </ProcessStep>
        </ProcessSteps>

        <StatsContainer>
          <StatCard className="animate-on-scroll">
            <StatNumber>3.5x</StatNumber>
            <StatLabel>More profile views</StatLabel>
          </StatCard>
          <StatCard className="animate-on-scroll">
            <StatNumber>92%</StatNumber>
            <StatLabel>Client satisfaction rate</StatLabel>
          </StatCard>
          <StatCard className="animate-on-scroll">
            <StatNumber>2-3x</StatNumber>
            <StatLabel>More interview requests</StatLabel>
          </StatCard>
          <StatCard className="animate-on-scroll">
            <StatNumber>500+</StatNumber>
            <StatLabel>Profiles enhanced</StatLabel>
          </StatCard>
        </StatsContainer>

        <BenefitsSection>
          <BenefitsTitle>Why Invest in Professional Profile Building?</BenefitsTitle>
          <BenefitsList>
            <BenefitItem delay="100ms" className="animate-on-scroll">
              <strong>Increased Visibility:</strong> Get noticed by recruiters, clients, and partners
            </BenefitItem>
            <BenefitItem delay="200ms" className="animate-on-scroll">
              <strong>Credibility Boost:</strong> Establish yourself as an authority in your field
            </BenefitItem>
            <BenefitItem delay="300ms" className="animate-on-scroll">
              <strong>Career Advancement:</strong> Unlock better job opportunities and promotions
            </BenefitItem>
            <BenefitItem delay="400ms" className="animate-on-scroll">
              <strong>Business Growth:</strong> Attract higher-quality clients and partnerships
            </BenefitItem>
            <BenefitItem delay="500ms" className="animate-on-scroll">
              <strong>Time Savings:</strong> Let experts handle your profile while you focus on your work
            </BenefitItem>
            <BenefitItem delay="600ms" className="animate-on-scroll">
              <strong>Competitive Edge:</strong> Stand out in crowded job markets and industries
            </BenefitItem>
            <BenefitItem delay="700ms" className="animate-on-scroll">
              <strong>Consistent Branding:</strong> Unified professional image across all platforms
            </BenefitItem>
            <BenefitItem delay="800ms" className="animate-on-scroll">
              <strong>Confidence Boost:</strong> Present your best self with pride
            </BenefitItem>
          </BenefitsList>
        </BenefitsSection>

        <TestimonialSection>
          <SectionHeader>
            <SectionTitle>Success Stories</SectionTitle>
            <SectionSubtitle>What our clients say about our profile building services</SectionSubtitle>
          </SectionHeader>
          
          <TestimonialCard className="animate-on-scroll">
            <p>"After CareerCraft optimized my LinkedIn profile, I received 3 times more connection requests and landed my dream job within 2 months. The investment paid for itself many times over!"</p>
            <p><strong>- Sarah K., Marketing Director</strong></p>
          </TestimonialCard>
          
          <TestimonialCard className="animate-on-scroll">
            <p>"As a freelancer, my Upwork profile was getting lost in the crowd. The team completely transformed my profile, and within weeks I was getting premium clients at higher rates. Game changer!"</p>
            <p><strong>- Michael T., UX Designer</strong></p>
          </TestimonialCard>
        </TestimonialSection>

        <CTASection>
          <CTAContent>
            <CTATitle>Ready to Transform Your Professional Profile?</CTATitle>
            <p style={{ fontSize: '1.18rem', marginBottom: '20px', color: 'var(--text-color)' }}>
              Take the first step toward career growth and business success with a profile that truly represents your value.
            </p>
            <CTAButton href="#contact">Get Started Today</CTAButton>
          </CTAContent>
        </CTASection>

        <ContactSection id="contact">
          <SectionHeader>
            <SectionTitle>Contact Us</SectionTitle>
            <SectionSubtitle>Get in touch to discuss your profile building needs</SectionSubtitle>
          </SectionHeader>
          
          <ContactInfo>
            <ContactItem className="animate-on-scroll">
              <ContactIcon>📧</ContactIcon>
              <h3>Email</h3>
              <p><a style={{ color: 'var(--primary-color)' }} href="mailto:info@careercraft.com">info@careercraft.com</a></p>
            </ContactItem>
            <ContactItem className="animate-on-scroll">
              <ContactIcon>📞</ContactIcon>
              <h3>Phone</h3>
              <p>(123) 456-7890</p>
            </ContactItem>
            <ContactItem className="animate-on-scroll">
              <ContactIcon>📝</ContactIcon>
              <h3>Consultation</h3>
              <p>Schedule a free 30-minute consultation call</p>
            </ContactItem>
          </ContactInfo>
        </ContactSection>
      </Container>

      <Footer>
        <Container>
          <p>&copy; {new Date().getFullYear()} CareerCraft. All rights reserved.</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, marginTop: '10px' }}>
            Professional Profile Building Services | Transforming Careers Since 2015
          </p>
        </Container>
      </Footer>
    </>
  );
};

export default ProfileBuildingPage;