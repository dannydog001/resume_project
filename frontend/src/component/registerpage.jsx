import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { FaGoogle, FaLinkedinIn, FaGithub, FaHome, FaUserPlus, FaSignInAlt, FaStar, FaTag } from 'react-icons/fa';

const GlobalStyle = createGlobalStyle`
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

  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background: var(--dark-bg);
    color: var(--light-text);
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0); }
  33% { transform: translateY(-20px) rotate(1deg); }
  66% { transform: translateY(-10px) rotate(-1deg); }
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3), transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2), transparent 50%);
  animation: ${float} 20s ease-in-out infinite;
  z-index: -1;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  background: var(--dark-card);
  padding: 20px 0;
  border-bottom: 1px solid var(--border-color);

  a {
    margin: 0 25px;
    color: var(--muted-text);
    font-weight: 600;
    font-size: 1.1rem;
    text-decoration: none;
    transition: 0.3s;

    &.active, &:hover {
      background: var(--accent-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 40px 20px;
`;

const Card = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h2 {
    font-size: 2rem;
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: var(--muted-text);
    font-size: 1rem;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  flex: 1;

  label {
    display: block;
    margin-bottom: 8px;
  }

  input {
    width: 89%;
    padding: 15px 20px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    color: var(--light-text);

    &:focus {
      outline: none;
      border-color: #667eea;
    }
  }
`;

const PasswordStrength = styled.div`
 

  .bar {
    height: 89%;
    width: ${({ strength }) => strength}%;
    background: ${({ strength }) => {
      if (strength <= 40) return "#f5576c";
      if (strength <= 80) return "#f093fb";
      return "#43e97b";
    }};
    transition: width 0.3s ease;
  }
`;

const Terms = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 0.9rem;

  input {
    margin-right: 10px;
    margin-top: 3px;
  }

  label {
    color: var(--muted-text);

    a {
      color: #667eea;
      text-decoration: none;
    }
  }
`;

const SubmitButton = styled.button`
  width: 89%;
  padding: 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  background: var(--accent-gradient);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--success-gradient);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
`;

const SocialLogin = styled.div`
  text-align: center;
  margin: 30px 0;

  p {
    color: var(--muted-text);
    margin-bottom: 15px;
  }

  .icons {
    display: flex;
    justify-content: center;
    gap: 15px;

    a {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255,255,255,0.05);
      color: white;
      font-size: 1.2rem;
      transition: 0.3s;

      &:hover {
        transform: translateY(-3px);
      }

      &.google:hover { background: #DB4437; }
      &.linkedin:hover { background: #0077B5; }
      &.github:hover { background: #333; }
    }
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 30px;
  color: var(--muted-text);

  a {
    color: #667eea;
    text-decoration: none;

    &:hover {
      color: #764ba2;
    }
  }
`;

const RegisterPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [strength, setStrength] = useState(0);

  const evaluateStrength = (pass) => {
    let s = 0;
    if (pass.length >= 8) s += 1;
    if (pass.length >= 12) s += 1;
    if (/[A-Z]/.test(pass)) s += 1;
    if (/[0-9]/.test(pass)) s += 1;
    if (/[^A-Za-z0-9]/.test(pass)) s += 1;
    setStrength(s * 20);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Registration logic goes here.');
  };

  return (
    <>
      <GlobalStyle />
      <Background />
      

      <Container>
        <Card>
          <Header>
            <h2>Create Your Account</h2>
            <p>Join thousands of professionals who found their dream jobs with JobSeekerPro</p>
          </Header>

          <form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" required placeholder="Enter your first name" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" required placeholder="Enter your last name" />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" required placeholder="Enter your email" />
            </FormGroup>

            <FormGroup>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  evaluateStrength(e.target.value);
                }}
                required
                placeholder="Create a password"
              />
              <PasswordStrength strength={strength}>
                <div className="bar" />
              </PasswordStrength>
            </FormGroup>

            <FormGroup>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm your password"
              />
            </FormGroup>

            <Terms>
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </label>
            </Terms>

            <SubmitButton type="submit">Create Account</SubmitButton>

            <SocialLogin>
              <p>Or sign up with</p>
              <div className="icons">
                <a href="#" className="google"><FaGoogle /></a>
                <a href="#" className="linkedin"><FaLinkedinIn /></a>
                <a href="#" className="github"><FaGithub /></a>
              </div>
            </SocialLogin>

            <Footer>
              Already have an account? <a href="#">Sign in</a>
            </Footer>
          </form>
        </Card>
      </Container>
    </>
  );
};

export default RegisterPage;
