// File: LoginPage.jsx
import React, { useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { FaGoogle, FaLinkedinIn, FaGithub } from "react-icons/fa";
import axios from 'axios'; // Make sure to install axios: npm install axios

// --- Global Styles and Keyframes ---
const GlobalStyle = createGlobalStyle`
  /* It's better to link fonts in your main HTML file, but this works for a self-contained component */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
  
  :root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --success-gradient: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
    --error-gradient: linear-gradient(135deg, #f5576c 0%, #f093fb 100%);
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
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-20px) rotate(1deg); }
  66% { transform: translateY(-10px) rotate(-1deg); }
`;

// --- Styled Components ---
const Background = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
  animation: ${float} 20s ease-in-out infinite;
  z-index: -1;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 40px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const AuthCard = styled.div`
  max-width: 500px;
  width: 100%;
  margin: auto;
  padding: 40px;
  background: rgba(26, 26, 26, 0.8); /* Slightly more opaque */
  backdrop-filter: blur(15px);
  border-radius: 20px;
  border: 1px solid var(--border-color);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 30px 50px rgba(0,0,0,0.4);
  }
`;

const AuthHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h2 {
    font-size: 2rem;
    font-weight: 700; /* Bolder */
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  p {
    color: var(--muted-text);
    font-size: 1rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  position: relative;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 15px 20px;
    box-sizing: border-box;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--border-color);
    color: var(--light-text);
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.1);
      border-color: #667eea;
      box-shadow: 0 0 15px rgba(102, 126, 234, 0.3);
    }
  }

  a {
    display: block;
    text-align: right;
    font-size: 0.9rem;
    margin-top: 5px;
    color: var(--muted-text);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #667eea;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-top: 10px;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  background: var(--accent-gradient);
  color: white;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: var(--success-gradient);
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SocialLogin = styled.div`
  text-align: center;
  margin: 30px 0;

  p {
    color: var(--muted-text);
    position: relative;
    margin-bottom: 20px;

    &::before, &::after {
      content: "";
      position: absolute;
      top: 50%;
      width: 35%; /* Adjusted width */
      height: 1px;
      background: var(--border-color);
    }

    &::before { left: 0; }
    &::after { right: 0; }
  }

  .icons {
    display: flex;
    justify-content: center;
    gap: 20px;

    a {
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 1.3rem;
      color: white;
      transition: all 0.3s ease;
      border: 1px solid var(--border-color);

      &:hover {
        transform: translateY(-5px) scale(1.1);
        border-color: transparent;
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
    font-weight: 600;
    transition: color 0.3s ease;

    &:hover {
      color: #764ba2;
      text-decoration: underline;
    }
  }
`;

const Message = styled.div`
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  text-align: center;
  font-weight: 500;
  color: white;
  background: ${props => props.type === 'success' ? 'var(--success-gradient)' : 'var(--error-gradient)'};
`;

// --- Main Component ---
const LoginPage = () => {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for handling messages and loading
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Clear previous messages

    try {
      // POST request to the backend
      const response = await axios.post('http://localhost:5000/login', {
        email: email,
        password: password,
      });

      if(response.status == 200){
     
        console.log(response.data);
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data in localStorage
     wndow.location.href = '/user';
      }
      // Handle success response from the server
      setMessageType('success');
      setMessage(response.data.message || "Login successful!");
     

    } catch (error) {
      // Handle error response from the server
      setMessageType('error');
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setMessage(error.response.data.message || "Invalid credentials. Please try again.");
      } else if (error.request) {
        // The request was made but no response was received
        setMessage("Network error. Please check your connection or if the server is running.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      // This will run regardless of success or error
      setLoading(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Background />
      <Container>
        <AuthCard>
          <AuthHeader>
            <h2>Welcome Back</h2>
            <p>Sign in to access your dashboard</p>
          </AuthHeader>

          <form onSubmit={handleSubmit}>
            {message && <Message type={messageType}>{message}</Message>}
            

            <FormGroup>
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter your email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter your password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <a href="#">Forgot password?</a>
            </FormGroup>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </SubmitButton>

            <SocialLogin>
              <p>Or sign in with</p>
              <div className="icons">
                <a href="#" className="google" aria-label="Sign in with Google"><FaGoogle /></a>
                <a href="#" className="linkedin" aria-label="Sign in with LinkedIn"><FaLinkedinIn /></a>
                <a href="#" className="github" aria-label="Sign in with GitHub"><FaGithub /></a>
              </div>
            </SocialLogin>

            <Footer>
              Don’t have an account? <a href="#">Create one</a>
            </Footer>
          </form>
        </AuthCard>
      </Container>
    </>
  );
};

export default LoginPage;
