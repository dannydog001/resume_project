import React from 'react';
import { FaBriefcase, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const CareersPage = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote",
      description: "We're looking for an experienced React developer to help build the next generation of our career tools."
    },
    {
      id: 2,
      title: "UX Designer",
      department: "Design",
      type: "Full-time",
      location: "San Francisco",
      description: "Create beautiful, intuitive interfaces for our resume builder and career platform."
    },
    {
      id: 3,
      title: "Customer Success Manager",
      department: "Support",
      type: "Full-time",
      location: "Remote",
      description: "Help our users get the most from JobSeekerPro and provide exceptional support."
    }
  ];

  return (
    <div className="careers-page">
      <style>{`
        .careers-page {
          background: #0a0a0a;
          color: #ffffff;
          padding: 60px 20px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
        }
        
        .careers-header {
          text-align: center;
          margin-bottom: 60px;
        }
        
        .careers-header h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .careers-header p {
          max-width: 700px;
          margin: 0 auto;
          color: #a0a0a0;
          font-size: 1.1rem;
          line-height: 1.6;
        }
        
        .benefits-section, .openings-section {
          margin-bottom: 60px;
          background: #1a1a1a;
          border-radius: 15px;
          padding: 40px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .section-title {
          font-size: 1.8rem;
          margin-bottom: 30px;
        }
        
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }
        
        .benefit-item {
          padding: 25px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .benefit-item h3 {
          font-size: 1.3rem;
          margin-bottom: 15px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .benefit-item p {
          color: #a0a0a0;
          line-height: 1.6;
        }
        
        .job-listings {
          display: grid;
          gap: 20px;
        }
        
        .job-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 25px;
          transition: all 0.3s ease;
        }
        
        .job-card:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .job-card h3 {
          font-size: 1.4rem;
          margin-bottom: 10px;
        }
        
        .job-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 15px;
          color: #a0a0a0;
        }
        
        .job-meta span {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.9rem;
        }
        
        .job-card p {
          color: #a0a0a0;
          margin-bottom: 20px;
          line-height: 1.6;
        }
        
        .apply-btn {
          display: inline-block;
          padding: 10px 25px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
          border-radius: 5px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(79, 172, 254, 0.3);
        }
        
        @media (max-width: 768px) {
          .careers-header h1 {
            font-size: 2rem;
          }
          
          .section-title {
            font-size: 1.5rem;
          }
          
          .job-meta {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>

      <div className="careers-header">
        <h1>Join Our Team</h1>
        <p>We're building the future of career development tools. Join us in our mission to make professional success accessible to everyone.</p>
      </div>

      <div className="benefits-section">
        <h2 className="section-title">Why Work With Us</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <h3><FaBriefcase /> Meaningful Work</h3>
            <p>Help thousands of professionals advance their careers every day with our tools and resources.</p>
          </div>
          <div className="benefit-item">
            <h3><FaClock /> Flexible Hours</h3>
            <p>We believe in work-life balance and offer flexible schedules and remote work options.</p>
          </div>
          <div className="benefit-item">
            <h3><FaMapMarkerAlt /> Global Team</h3>
            <p>Join a diverse team working across 15 countries with different perspectives and backgrounds.</p>
          </div>
        </div>
      </div>

      <div className="openings-section">
        <h2 className="section-title">Current Openings</h2>
        <div className="job-listings">
          {jobOpenings.map(job => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <div className="job-meta">
                <span><FaBriefcase /> {job.department}</span>
                <span><FaClock /> {job.type}</span>
                <span><FaMapMarkerAlt /> {job.location}</span>
              </div>
              <p>{job.description}</p>
              <a href="#apply" className="apply-btn">Apply Now</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareersPage;