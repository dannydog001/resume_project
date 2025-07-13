import React, { useState, useEffect } from 'react';
import { FaSearch, FaBell, FaFilter, FaMapMarkerAlt, FaBriefcase, FaClock, FaExternalLinkAlt } from 'react-icons/fa';

const JobAlertsPage = () => {
  // State for jobs data and filters
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    experience: '',
    type: '',
    company: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [alerts, setAlerts] = useState([]);

  // Mock API call to fetch jobs (in a real app, replace with actual API calls)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data - in a real app, you would fetch from job APIs like:
        // - LinkedIn Jobs API
        // - Indeed API
        // - Glassdoor API
        // - Google Jobs API
        // - Company career pages APIs
        
        const mockJobs = [
          {
            id: 1,
            title: "Frontend Developer",
            company: "Google",
            location: "Mountain View, CA (Remote)",
            type: "Full-time",
            experience: "2+ years",
            posted: "2 hours ago",
            description: "We're looking for a skilled Frontend Developer to join our team working on next-generation web applications.",
            skills: ["React", "JavaScript", "CSS"],
            url: "https://careers.google.com"
          },
          {
            id: 2,
            title: "Data Scientist",
            company: "Amazon",
            location: "Seattle, WA",
            type: "Full-time",
            experience: "3+ years",
            posted: "1 day ago",
            description: "Join our data team to analyze complex datasets and build predictive models for our e-commerce platform.",
            skills: ["Python", "Machine Learning", "SQL"],
            url: "https://www.amazon.jobs"
          },
          {
            id: 3,
            title: "Product Manager",
            company: "Microsoft",
            location: "Redmond, WA (Hybrid)",
            type: "Full-time",
            experience: "5+ years",
            posted: "3 days ago",
            description: "Lead product development for our cloud services division and work with cross-functional teams.",
            skills: ["Product Strategy", "Agile", "Cloud Computing"],
            url: "https://careers.microsoft.com"
          },
          {
            id: 4,
            title: "UX Designer",
            company: "Apple",
            location: "Cupertino, CA",
            type: "Full-time",
            experience: "4+ years",
            posted: "1 week ago",
            description: "Design intuitive user experiences for our next-generation hardware and software products.",
            skills: ["Figma", "UI/UX", "Prototyping"],
            url: "https://www.apple.com/careers"
          },
          {
            id: 5,
            title: "DevOps Engineer",
            company: "Netflix",
            location: "Remote",
            type: "Full-time",
            experience: "3+ years",
            posted: "2 days ago",
            description: "Build and maintain our cloud infrastructure to support millions of streaming users worldwide.",
            skills: ["AWS", "Docker", "Kubernetes"],
            url: "https://jobs.netflix.com"
          },
          {
            id: 6,
            title: "Marketing Specialist",
            company: "Meta",
            location: "Menlo Park, CA",
            type: "Full-time",
            experience: "2+ years",
            posted: "5 days ago",
            description: "Develop and execute marketing campaigns for our social media platforms.",
            skills: ["Digital Marketing", "Social Media", "Analytics"],
            url: "https://www.metacareers.com"
          }
        ];

        setJobs(mockJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesExperience = !filters.experience || job.experience === filters.experience;
    const matchesType = !filters.type || job.type === filters.type;
    const matchesCompany = !filters.company || job.company.toLowerCase().includes(filters.company.toLowerCase());
    
    return matchesSearch && matchesLocation && matchesExperience && matchesType && matchesCompany;
  });

  // Create a job alert
  const createAlert = (searchParams) => {
    const newAlert = {
      id: Date.now(),
      ...searchParams,
      created: new Date().toLocaleDateString(),
      active: true
    };
    setAlerts([...alerts, newAlert]);
  };

  // Toggle alert status
  const toggleAlert = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  // Remove alert
  const removeAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="job-alerts-page">
      <style>{`
        :root {
          --primary: #4facfe;
          --secondary: #00f2fe;
          --dark-bg: #0f172a;
          --card-bg: #1e293b;
          --text-light: #ffffff;
          --text-muted: #94a3b8;
          --border-color: #334155;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        
        .job-alerts-page {
          background: var(--dark-bg);
          color: var(--text-light);
          min-height: 100vh;
          padding: 40px 20px;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .page-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .page-header h1 {
          font-size: 2.5rem;
          margin-bottom: 15px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .page-header p {
          color: var(--text-muted);
          font-size: 1.1rem;
          max-width: 700px;
          margin: 0 auto;
        }
        
        .search-section {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
        }
        
        .search-input {
          flex: 1;
          padding: 12px 20px 12px 45px;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          color: var(--text-light);
          font-size: 1rem;
        }
        
        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }
        
        .search-wrapper {
          position: relative;
          flex: 1;
        }
        
        .filter-btn {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 0 20px;
          color: var(--text-light);
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .filter-btn:hover {
          background: rgba(79, 172, 254, 0.1);
          border-color: var(--primary);
        }
        
        .filters-panel {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 30px;
          display: ${showFilters ? 'block' : 'none'};
        }
        
        .filter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        
        .filter-group {
          margin-bottom: 15px;
        }
        
        .filter-label {
          display: block;
          margin-bottom: 8px;
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        
        .filter-select {
          width: 100%;
          padding: 10px;
          background: var(--dark-bg);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          color: var(--text-light);
        }
        
        .content-layout {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 30px;
        }
        
        .jobs-list {
          display: grid;
          gap: 20px;
        }
        
        .job-card {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 25px;
          transition: all 0.3s ease;
        }
        
        .job-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
          border-color: var(--primary);
        }
        
        .job-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }
        
        .job-title {
          font-size: 1.3rem;
          margin-bottom: 5px;
        }
        
        .job-company {
          color: var(--primary);
          font-weight: 500;
        }
        
        .job-meta {
          display: flex;
          gap: 20px;
          margin: 15px 0;
          color: var(--text-muted);
          font-size: 0.9rem;
        }
        
        .job-meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        
        .job-description {
          color: var(--text-muted);
          margin-bottom: 20px;
          line-height: 1.6;
        }
        
        .job-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .skill-tag {
          background: rgba(79, 172, 254, 0.1);
          color: var(--primary);
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
        }
        
        .job-posted {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 15px;
        }
        
        .job-actions {
          display: flex;
          gap: 15px;
        }
        
        .apply-btn {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }
        
        .apply-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(79, 172, 254, 0.3);
        }
        
        .save-btn {
          background: var(--dark-bg);
          border: 1px solid var(--border-color);
          color: var(--text-light);
          border-radius: 6px;
          padding: 10px 20px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .save-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .alerts-sidebar {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 25px;
          position: sticky;
          top: 20px;
          height: fit-content;
        }
        
        .sidebar-title {
          font-size: 1.3rem;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .alert-form {
          margin-bottom: 30px;
        }
        
        .alert-input {
          width: 100%;
          padding: 10px;
          background: var(--dark-bg);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          color: var(--text-light);
          margin-bottom: 15px;
        }
        
        .create-alert-btn {
          width: 100%;
          padding: 10px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .create-alert-btn:hover {
          background: var(--secondary);
        }
        
        .alerts-list {
          display: grid;
          gap: 15px;
        }
        
        .alert-item {
          background: var(--dark-bg);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .alert-details {
          flex: 1;
        }
        
        .alert-query {
          font-weight: 500;
          margin-bottom: 5px;
        }
        
        .alert-meta {
          color: var(--text-muted);
          font-size: 0.8rem;
        }
        
        .alert-actions {
          display: flex;
          gap: 10px;
        }
        
        .alert-toggle {
          width: 40px;
          height: 20px;
          background: ${alerts.length > 0 && alerts[0].active ? 'var(--primary)' : '#ccc'};
          border-radius: 10px;
          position: relative;
          cursor: pointer;
        }
        
        .alert-toggle::after {
          content: '';
          position: absolute;
          top: 2px;
          left: ${alerts.length > 0 && alerts[0].active ? '22px' : '2px'};
          width: 16px;
          height: 16px;
          background: white;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .delete-alert {
          color: #f87171;
          cursor: pointer;
        }
        
        .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(79, 172, 254, 0.3);
          border-radius: 50%;
          border-top-color: var(--primary);
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .no-results {
          text-align: center;
          padding: 40px;
          color: var(--text-muted);
        }
        
        @media (max-width: 1024px) {
          .content-layout {
            grid-template-columns: 1fr;
          }
          
          .alerts-sidebar {
            order: -1;
            margin-bottom: 30px;
          }
        }
        
        @media (max-width: 768px) {
          .page-header h1 {
            font-size: 2rem;
          }
          
          .job-meta {
            flex-direction: column;
            gap: 10px;
          }
          
          .job-actions {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="container">
        <div className="page-header">
          <h1>Real-Time Job Alerts</h1>
          <p>Get notified about the latest job openings from top companies matching your skills and preferences.</p>
        </div>

        <div className="search-section">
          <div className="search-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search for jobs, companies, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="filter-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
        </div>

        <div className="filters-panel">
          <div className="filter-grid">
            <div className="filter-group">
              <label className="filter-label">Location</label>
              <select 
                className="filter-select"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              >
                <option value="">All Locations</option>
                <option value="Remote">Remote</option>
                <option value="New York">New York</option>
                <option value="San Francisco">San Francisco</option>
                <option value="London">London</option>
                <option value="Berlin">Berlin</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Experience Level</label>
              <select 
                className="filter-select"
                value={filters.experience}
                onChange={(e) => setFilters({...filters, experience: e.target.value})}
              >
                <option value="">Any Experience</option>
                <option value="Entry Level">Entry Level</option>
                <option value="1+ years">1+ years</option>
                <option value="3+ years">3+ years</option>
                <option value="5+ years">5+ years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Job Type</label>
              <select 
                className="filter-select"
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Company</label>
              <select 
                className="filter-select"
                value={filters.company}
                onChange={(e) => setFilters({...filters, company: e.target.value})}
              >
                <option value="">All Companies</option>
                <option value="Google">Google</option>
                <option value="Amazon">Amazon</option>
                <option value="Microsoft">Microsoft</option>
                <option value="Apple">Apple</option>
                <option value="Netflix">Netflix</option>
                <option value="Meta">Meta</option>
              </select>
            </div>
          </div>
        </div>

        <div className="content-layout">
          <div className="jobs-section">
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="no-results">
                <h3>No jobs found matching your criteria</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="jobs-list">
                {filteredJobs.map(job => (
                  <div key={job.id} className="job-card">
                    <div className="job-header">
                      <div>
                        <h3 className="job-title">{job.title}</h3>
                        <p className="job-company">{job.company}</p>
                      </div>
                    </div>
                    
                    <div className="job-meta">
                      <div className="job-meta-item">
                        <FaMapMarkerAlt /> {job.location}
                      </div>
                      <div className="job-meta-item">
                        <FaBriefcase /> {job.type}
                      </div>
                      <div className="job-meta-item">
                        <FaClock /> {job.experience}
                      </div>
                    </div>
                    
                    <p className="job-description">{job.description}</p>
                    
                    <div className="job-skills">
                      {job.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                    
                    <p className="job-posted">Posted {job.posted}</p>
                    
                    <div className="job-actions">
                      <a 
                        href={job.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="apply-btn"
                      >
                        Apply Now <FaExternalLinkAlt />
                      </a>
                      <button 
                        className="save-btn"
                        onClick={() => createAlert({
                          query: job.title,
                          location: job.location,
                          experience: job.experience
                        })}
                      >
                        Create Alert
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="alerts-sidebar">
            <h3 className="sidebar-title">
              <FaBell /> Your Job Alerts
            </h3>
            
            <div className="alert-form">
              <input
                type="text"
                className="alert-input"
                placeholder="Job title, keywords"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                className="create-alert-btn"
                onClick={() => createAlert({
                  query: searchTerm,
                  location: filters.location,
                  experience: filters.experience
                })}
              >
                Create New Alert
              </button>
            </div>
            
            {alerts.length > 0 ? (
              <div className="alerts-list">
                {alerts.map(alert => (
                  <div key={alert.id} className="alert-item">
                    <div className="alert-details">
                      <div className="alert-query">{alert.query}</div>
                      <div className="alert-meta">
                        {alert.location && `${alert.location} • `}
                        {alert.experience && `${alert.experience} • `}
                        Created {alert.created}
                      </div>
                    </div>
                    <div className="alert-actions">
                      <div 
                        className="alert-toggle"
                        onClick={() => toggleAlert(alert.id)}
                      ></div>
                      <div 
                        className="delete-alert"
                        onClick={() => removeAlert(alert.id)}
                      >
                        ×
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>
                No alerts yet. Create one to get notified about new jobs.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAlertsPage;