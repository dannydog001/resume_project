import React from 'react';

const Header = () => {
  return (
    <>
      <div className="bg-animation"></div>
      <header>
        <div className="container">
          <div className="hero-content">
            <h1>JobSeekerPro</h1>
            <p>Your Ultimate Resume and Career Support Platform</p>
          </div>
        </div>
      </header>
      <nav>
        <a href="#features" className="nav-active"><i className="fas fa-star"></i> Features</a>
        <a href="#templates"><i className="fas fa-file-alt"></i> Templates</a>
        <a href="#how-it-works"><i className="fas fa-play-circle"></i> How It Works</a>
        <a href="#pricing"><i className="fas fa-tag"></i> Pricing</a>
        <a href="#testimonials"><i className="fas fa-quote-left"></i> Testimonials</a>
      </nav>
      <style jsx>{`
      
      body{
         background-color: black;
       }
        .bg-animation {
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
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

        header {
            position: relative;
            padding: 120px 0 80px;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            background-attachment: fixed;
            height:30vh;
            overflow: hidden;
        }
        header::before {
            content: '';
            position: absolute;
            top: -100%;
            left: -50%;
            width: 200%;
            height: 100%;
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
              bottom:95px;
            }
        header h1 {
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
        header p {
            font-size: 1.2rem;
            font-weight: 300;
            max-width: 600px;
            margin: 0 auto 40px;
            opacity: 0.9;
        }
        nav {
            display: flex;
            justify-content: center;
            background: #1a1a1a;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 20px 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        nav a {
            margin: 0 25px;
            text-decoration: none;
            color: #a0a0a0;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            padding: 5px 10px;
            border-radius: 4px;
            position: relative;
        }
        nav a.nav-active,
        nav a:hover {
            color: #fff;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        @media (max-width: 768px) {
            header { padding: 70px 0 40px; }
            nav {
                flex-wrap: wrap;
                gap: 10px;
                padding: 15px 10px;
            }
            nav a {
                margin: 0 10px;
                font-size: 1rem;
            }
        }
      `}</style>
    </>
  );
};

export default Header;