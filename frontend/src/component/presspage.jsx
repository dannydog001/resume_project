import React from 'react';
import { FaNewspaper, FaDownload, FaQuoteLeft, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';

const PressPage = () => {
  // Press releases data
  const pressReleases = [
    {
      id: 1,
      title: "JobSeekerPro Secures $15M Series B Funding to Expand AI Career Tools",
      date: "June 10, 2025",
      summary: "The funding round led by TechGrowth Ventures will accelerate development of next-generation AI-powered career coaching features.",
      downloadLink: "#",
      readMoreLink: "#"
    },
    {
      id: 2,
      title: "JobSeekerPro Launches Revolutionary Resume Optimization Engine",
      date: "April 5, 2025",
      summary: "New AI technology analyzes resumes against job descriptions to provide real-time improvement suggestions.",
      downloadLink: "#",
      readMoreLink: "#"
    },
    {
      id: 3,
      title: "Partnership Announcement: JobSeekerPro Teams Up with LinkedIn for Enhanced Profile Integration",
      date: "February 18, 2025",
      summary: "New integration allows seamless synchronization between JobSeekerPro resumes and LinkedIn profiles.",
      downloadLink: "#",
      readMoreLink: "#"
    }
  ];

  // Media coverage data
  const mediaCoverage = [
    {
      id: 1,
      outlet: "TechCrunch",
      title: "How JobSeekerPro is Using AI to Democratize Career Advancement",
      quote: "JobSeekerPro's platform represents a significant leap forward in personalized career development tools.",
      date: "May 22, 2025",
      link: "#"
    },
    {
      id: 2,
      outlet: "Forbes",
      title: "Top 5 Career Tools That Actually Get Results in 2025",
      quote: "JobSeekerPro users report 73% higher interview rates compared to traditional resume methods.",
      date: "March 15, 2025",
      link: "#"
    },
    {
      id: 3,
      outlet: "The Wall Street Journal",
      title: "The New Rules of Job Hunting in the AI Era",
      quote: "Platforms like JobSeekerPro are changing how candidates prepare for today's competitive job market.",
      date: "January 8, 2025",
      link: "#"
    }
  ];

  // Press resources
  const pressResources = [
    {
      id: 1,
      title: "Company Fact Sheet",
      description: "Key information about JobSeekerPro",
      format: "PDF (250KB)",
      downloadLink: "#"
    },
    {
      id: 2,
      title: "Brand Assets Package",
      description: "Logos, colors, and brand guidelines",
      format: "ZIP (4.2MB)",
      downloadLink: "#"
    },
    {
      id: 3,
      title: "Executive Bios",
      description: "Profiles of our leadership team",
      format: "PDF (180KB)",
      downloadLink: "#"
    },
    {
      id: 4,
      title: "Product Screenshots",
      description: "High-resolution images",
      format: "ZIP (8.5MB)",
      downloadLink: "#"
    }
  ];

  return (
    <div className="press-page">
      <style>{`
        .press-page {
          background: #0a0a0a;
          color: #ffffff;
          padding: 80px 20px;
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
        }
        
        .press-hero {
          text-align: center;
          margin-bottom: 60px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .press-hero h1 {
          font-size: 2.8rem;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .press-hero p {
          max-width: 700px;
          margin: 0 auto;
          color: #a0a0a0;
          font-size: 1.2rem;
          line-height: 1.6;
        }
        
        .press-contact {
          margin-top: 30px;
          font-size: 1.1rem;
        }
        
        .press-contact a {
          color: #4facfe;
          text-decoration: none;
          font-weight: 500;
        }
        
        .press-section {
          margin-bottom: 80px;
        }
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 30px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .section-title {
          font-size: 2rem;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .section-title svg {
          color: #4facfe;
        }
        
        .view-all {
          color: #a0a0a0;
          text-decoration: none;
          font-size: 1rem;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .press-releases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
        }
        
        .press-card {
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .press-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
        
        .press-card-header {
          padding: 25px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .press-card-date {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #a0a0a0;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }
        
        .press-card-title {
          font-size: 1.4rem;
          margin-bottom: 15px;
          line-height: 1.4;
        }
        
        .press-card-summary {
          color: #a0a0a0;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .press-card-actions {
          display: flex;
          gap: 15px;
        }
        
        .press-card-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 0.9rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .press-card-link.primary {
          background: rgba(79, 172, 254, 0.2);
          color: #4facfe;
        }
        
        .press-card-link.secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
        
        .press-card-link:hover {
          transform: translateY(-2px);
        }
        
        .media-coverage-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        
        .media-card {
          background: #1a1a1a;
          border-radius: 12px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .media-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
        
        .media-outlet {
          font-weight: 700;
          color: #4facfe;
          margin-bottom: 5px;
        }
        
        .media-date {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #a0a0a0;
          font-size: 0.9rem;
          margin-bottom: 15px;
        }
        
        .media-title {
          font-size: 1.2rem;
          margin-bottom: 15px;
          line-height: 1.4;
        }
        
        .media-quote {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          position: relative;
        }
        
        .media-quote-icon {
          position: absolute;
          top: 15px;
          left: 15px;
          opacity: 0.2;
          font-size: 1.5rem;
        }
        
        .media-quote-text {
          padding-left: 30px;
          font-style: italic;
          color: #ffffff;
          line-height: 1.6;
        }
        
        .media-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4facfe;
          text-decoration: none;
          font-weight: 500;
        }
        
        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }
        
        .resource-card {
          background: #1a1a1a;
          border-radius: 10px;
          padding: 25px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .resource-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
        
        .resource-icon {
          font-size: 1.8rem;
          color: #4facfe;
          margin-bottom: 15px;
        }
        
        .resource-title {
          font-size: 1.2rem;
          margin-bottom: 10px;
        }
        
        .resource-meta {
          color: #a0a0a0;
          font-size: 0.9rem;
          margin-bottom: 15px;
        }
        
        .resource-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4facfe;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
          .press-hero h1 {
            font-size: 2.2rem;
          }
          
          .section-title {
            font-size: 1.6rem;
          }
          
          .press-card-actions {
            flex-direction: column;
            gap: 10px;
          }
          
          .press-card-link {
            justify-content: center;
          }
        }
      `}</style>

      <div className="press-hero">
        <h1>JobSeekerPro in the News</h1>
        <p>Latest press releases, media coverage, and resources for journalists covering the future of career development and recruitment technology.</p>
        <div className="press-contact">
          For media inquiries: <a href="mailto:press@jobseekerpro.com">press@jobseekerpro.com</a>
        </div>
      </div>

      <div className="press-section">
        <div className="section-header">
          <h2 className="section-title">
            <FaNewspaper /> Press Releases
          </h2>
          <a href="#all-releases" className="view-all">
            View all releases <FaExternalLinkAlt />
          </a>
        </div>
        
        <div className="press-releases-grid">
          {pressReleases.map(release => (
            <div key={release.id} className="press-card">
              <div className="press-card-header">
                <div className="press-card-date">
                  <FaCalendarAlt /> {release.date}
                </div>
                <h3 className="press-card-title">{release.title}</h3>
                <p className="press-card-summary">{release.summary}</p>
              </div>
              <div className="press-card-actions" style={{ padding: '20px 25px' }}>
                <a href={release.readMoreLink} className="press-card-link primary">
                  <FaExternalLinkAlt /> Read More
                </a>
                <a href={release.downloadLink} className="press-card-link secondary">
                  <FaDownload /> Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="press-section">
        <div className="section-header">
          <h2 className="section-title">Media Coverage</h2>
          <a href="#all-coverage" className="view-all">
            View all coverage <FaExternalLinkAlt />
          </a>
        </div>
        
        <div className="media-coverage-grid">
          {mediaCoverage.map(item => (
            <div key={item.id} className="media-card">
              <div className="media-outlet">{item.outlet}</div>
              <div className="media-date">
                <FaCalendarAlt /> {item.date}
              </div>
              <h3 className="media-title">{item.title}</h3>
              <div className="media-quote">
                <FaQuoteLeft className="media-quote-icon" />
                <p className="media-quote-text">{item.quote}</p>
              </div>
              <a href={item.link} className="media-link">
                Read full article <FaExternalLinkAlt />
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="press-section">
        <div className="section-header">
          <h2 className="section-title">Press Resources</h2>
        </div>
        
        <div className="resources-grid">
          {pressResources.map(resource => (
            <div key={resource.id} className="resource-card">
              <div className="resource-icon">
                <FaDownload />
              </div>
              <h3 className="resource-title">{resource.title}</h3>
              <p className="resource-meta">{resource.description} • {resource.format}</p>
              <a href={resource.downloadLink} className="resource-link">
                Download <FaExternalLinkAlt />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PressPage;