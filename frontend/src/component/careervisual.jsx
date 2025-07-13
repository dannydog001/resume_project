import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronRight, Users, DollarSign, Clock, TrendingUp, BookOpen, Award, Target,
  Brain, MessageCircle, Star, CheckCircle, AlertCircle, Lightbulb, 
  BarChart3, PieChart, Map, Filter, Search, Zap, Globe, Briefcase,
  GraduationCap, Heart, Shield, Rocket, Camera, Palette, Code, Stethoscope
} from 'lucide-react';

const AdvancedCareerAdvisor = () => {
  const [currentView, setCurrentView] = useState('assessment');
  const [selectedField, setSelectedField] = useState('technology');
  const [selectedRole, setSelectedRole] = useState(null);
  const [userProfile, setUserProfile] = useState({
    name: '',
    experience: '',
    skills: [],
    interests: [],
    workStyle: '',
    salaryExpectation: '',
    location: '',
    education: ''
  });
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [careerRecommendations, setCareerRecommendations] = useState([]);
  const [skillGaps, setSkillGaps] = useState([]);
  const [animationStep, setAnimationStep] = useState(0);

  const careerFields = {
    technology: {
      name: 'Technology & Software',
      icon: <Code size={24} />,
      color: '#3b82f6',
      description: 'Build the digital future with cutting-edge technologies',
      marketGrowth: '+22%',
      avgSalary: '$95k',
      roles: [
        {
          id: 'junior-dev',
          title: 'Junior Developer',
          level: 1,
          salary: '$45K - $65K',
          experience: '0-2 years',
          skills: ['HTML/CSS', 'JavaScript', 'Git', 'Problem Solving', 'Testing'],
          interests: ['Technology', 'Problem Solving', 'Continuous Learning'],
          workStyle: ['Collaborative', 'Detail-oriented', 'Analytical'],
          description: 'Entry-level position focusing on learning fundamentals and contributing to projects under supervision.',
          nextRoles: ['mid-dev', 'frontend-dev', 'backend-dev'],
          responsibilities: ['Write clean, maintainable code', 'Debug and test applications', 'Learn new technologies and frameworks', 'Participate in code reviews'],
          certifications: ['Google IT Certificate', 'FreeCodeCamp', 'Codecademy Pro'],
          companies: ['Startups', 'Mid-size Tech Companies', 'Consulting Firms'],
          remoteWork: 'High',
          jobSecurity: 'High',
          learningPath: ['Complete coding bootcamp', 'Build portfolio projects', 'Contribute to open source', 'Practice coding challenges']
        },
        {
          id: 'mid-dev',
          title: 'Mid-Level Developer',
          level: 2,
          salary: '$65K - $95K',
          experience: '2-5 years',
          skills: ['Full-Stack Development', 'Database Design', 'API Development', 'Cloud Services', 'DevOps Basics'],
          interests: ['Technology', 'System Design', 'Mentoring'],
          workStyle: ['Independent', 'Collaborative', 'Problem-solving'],
          description: 'Experienced developer capable of working independently on complex features and mentoring juniors.',
          nextRoles: ['senior-dev', 'tech-lead', 'product-engineer'],
          responsibilities: ['Design and implement complex features', 'Mentor junior developers', 'Participate in architecture decisions', 'Optimize application performance'],
          certifications: ['AWS Certified Developer', 'Google Cloud Professional', 'Kubernetes Certified'],
          companies: ['Tech Giants', 'Scale-ups', 'Enterprise Companies'],
          remoteWork: 'High',
          jobSecurity: 'Very High',
          learningPath: ['Master advanced frameworks', 'Learn cloud architecture', 'Develop leadership skills', 'Contribute to technical decisions']
        },
        {
          id: 'senior-dev',
          title: 'Senior Developer',
          level: 3,
          salary: '$95K - $140K',
          experience: '5-8 years',
          skills: ['System Architecture', 'Performance Optimization', 'Code Review', 'Technical Leadership', 'Security Best Practices'],
          interests: ['Technology', 'Architecture', 'Team Leadership'],
          workStyle: ['Leadership', 'Strategic', 'Mentoring'],
          description: 'Expert developer responsible for technical decisions, architecture, and team leadership.',
          nextRoles: ['tech-lead', 'principal-engineer', 'architect'],
          responsibilities: ['Make architectural decisions', 'Lead technical initiatives', 'Design scalable systems', 'Drive best practices'],
          certifications: ['Solution Architect Certifications', 'Security Certifications', 'Leadership Training'],
          companies: ['FAANG', 'Unicorns', 'Fortune 500'],
          remoteWork: 'High',
          jobSecurity: 'Very High',
          learningPath: ['Master system design', 'Develop architectural thinking', 'Build leadership skills', 'Stay current with emerging technologies']
        }
      ]
    },
    healthcare: {
      name: 'Healthcare & Medicine',
      icon: <Stethoscope size={24} />,
      color: '#ef4444',
      description: 'Make a difference in people\'s lives through healthcare',
      marketGrowth: '+15%',
      avgSalary: '$85k',
      roles: [
        {
          id: 'medical-assistant',
          title: 'Medical Assistant',
          level: 1,
          salary: '$35K - $45K',
          experience: '0-1 years',
          skills: ['Patient Care', 'Medical Terminology', 'Basic Clinical Skills', 'Communication', 'Documentation'],
          interests: ['Healthcare', 'Helping Others', 'Medical Science'],
          workStyle: ['Caring', 'Detail-oriented', 'Collaborative'],
          description: 'Support healthcare professionals in clinical and administrative tasks.',
          nextRoles: ['nurse', 'healthcare-specialist'],
          responsibilities: ['Assist with patient care', 'Maintain medical records', 'Prepare examination rooms', 'Take vital signs'],
          certifications: ['Certified Medical Assistant (CMA)', 'Basic Life Support (BLS)'],
          companies: ['Hospitals', 'Clinics', 'Private Practices'],
          remoteWork: 'Low',
          jobSecurity: 'High',
          learningPath: ['Complete medical assistant program', 'Get certified', 'Gain clinical experience', 'Specialize in specific areas']
        }
      ]
    },
    marketing: {
      name: 'Marketing & Growth',
      icon: <TrendingUp size={24} />,
      color: '#8b5cf6',
      description: 'Drive business growth through strategic marketing',
      marketGrowth: '+10%',
      avgSalary: '$70k',
      roles: [
        {
          id: 'marketing-coord',
          title: 'Marketing Coordinator',
          level: 1,
          salary: '$40K - $55K',
          experience: '0-2 years',
          skills: ['Social Media Marketing', 'Content Creation', 'Analytics', 'Email Marketing', 'SEO Basics'],
          interests: ['Creativity', 'Communication', 'Data Analysis'],
          workStyle: ['Creative', 'Analytical', 'Collaborative'],
          description: 'Support marketing campaigns and coordinate promotional activities.',
          nextRoles: ['marketing-specialist', 'content-marketer', 'social-media-manager'],
          responsibilities: ['Execute marketing campaigns', 'Create engaging content', 'Analyze marketing metrics', 'Coordinate with teams'],
          certifications: ['Google Analytics', 'HubSpot Marketing', 'Facebook Blueprint'],
          companies: ['Agencies', 'Startups', 'Enterprise Companies'],
          remoteWork: 'High',
          jobSecurity: 'Medium',
          learningPath: ['Master digital marketing tools', 'Build content portfolio', 'Learn data analysis', 'Develop strategic thinking']
        }
      ]
    },
    design: {
      name: 'Design & Creative',
      icon: <Palette size={24} />,
      color: '#f59e0b',
      description: 'Create beautiful and functional experiences',
      marketGrowth: '+8%',
      avgSalary: '$65k',
      roles: [
        {
          id: 'ui-designer',
          title: 'UI/UX Designer',
          level: 1,
          salary: '$45K - $65K',
          experience: '0-2 years',
          skills: ['Design Tools', 'User Research', 'Prototyping', 'Visual Design', 'Wireframing'],
          interests: ['Design', 'User Experience', 'Problem Solving'],
          workStyle: ['Creative', 'User-focused', 'Iterative'],
          description: 'Design intuitive and visually appealing user interfaces.',
          nextRoles: ['senior-designer', 'ux-researcher', 'product-designer'],
          responsibilities: ['Create user interface designs', 'Conduct user research', 'Build prototypes', 'Collaborate with developers'],
          certifications: ['Google UX Design Certificate', 'Adobe Certified Expert'],
          companies: ['Design Agencies', 'Tech Companies', 'Startups'],
          remoteWork: 'High',
          jobSecurity: 'Medium',
          learningPath: ['Master design tools', 'Build design portfolio', 'Learn user research', 'Understand design systems']
        }
      ]
    }
  };

  const assessmentQuestions = [
    {
      id: 'experience',
      question: 'What\'s your current experience level?',
      type: 'select',
      options: ['Student/Fresh Graduate', '1-2 years', '3-5 years', '5-8 years', '8+ years'],
      field: 'experience'
    },
    {
      id: 'interests',
      question: 'What areas interest you most? (Select all that apply)',
      type: 'multiselect',
      options: ['Technology', 'Healthcare', 'Business', 'Design', 'Education', 'Finance', 'Marketing', 'Science'],
      field: 'interests'
    },
    {
      id: 'workStyle',
      question: 'What work environment do you prefer?',
      type: 'select',
      options: ['Remote-first', 'Hybrid', 'Office-based', 'Travel-heavy', 'Flexible'],
      field: 'workStyle'
    },
    {
      id: 'skills',
      question: 'What skills do you currently have? (Select all that apply)',
      type: 'multiselect',
      options: ['Programming', 'Design', 'Data Analysis', 'Communication', 'Leadership', 'Problem Solving', 'Project Management'],
      field: 'skills'
    },
    {
      id: 'salary',
      question: 'What\'s your salary expectation?',
      type: 'select',
      options: ['$30K - $50K', '$50K - $70K', '$70K - $100K', '$100K - $150K', '$150K+'],
      field: 'salaryExpectation'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 100);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleAssessmentNext = () => {
    if (assessmentStep < assessmentQuestions.length - 1) {
      setAssessmentStep(assessmentStep + 1);
    } else {
      generateRecommendations();
      setCurrentView('recommendations');
    }
  };

  const generateRecommendations = useCallback(() => {
    const recommendations = [];
    const gaps = [];

    // Simple recommendation logic based on user profile
    Object.values(careerFields).forEach(field => {
      field.roles.forEach(role => {
        let score = 0;
        
        // Interest matching
        const interestMatch = userProfile.interests.some(interest => 
          role.interests.includes(interest)
        );
        if (interestMatch) score += 30;

        // Skill matching
        const skillMatch = userProfile.skills.filter(skill => 
          role.skills.some(roleSkill => roleSkill.toLowerCase().includes(skill.toLowerCase()))
        ).length;
        score += skillMatch * 10;

        // Experience matching
        if (role.experience.includes(userProfile.experience)) {
          score += 20;
        }

        if (score > 20) {
          recommendations.push({
            ...role,
            field: field.name,
            fieldColor: field.color,
            matchScore: score,
            reasons: [
              interestMatch && 'Matches your interests',
              skillMatch > 0 && `${skillMatch} matching skills`,
              'Good growth potential'
            ].filter(Boolean)
          });

          // Calculate skill gaps
          const missingSkills = role.skills.filter(skill => 
            !userProfile.skills.some(userSkill => 
              skill.toLowerCase().includes(userSkill.toLowerCase())
            )
          );
          
          if (missingSkills.length > 0) {
            gaps.push({
              role: role.title,
              skills: missingSkills.slice(0, 3)
            });
          }
        }
      });
    });

    setCareerRecommendations(recommendations.sort((a, b) => b.matchScore - a.matchScore).slice(0, 6));
    setSkillGaps(gaps.slice(0, 5));
  }, [userProfile]);

  const updateUserProfile = (field, value) => {
    setUserProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#1a1a1a'
    },
    header: {
      textAlign: 'center',
      padding: '2rem 1rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
    },
    title: {
      fontSize: '3rem',
      fontWeight: '800',
      color: 'white',
      marginBottom: '1rem',
      textShadow: '0 4px 8px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: 'rgba(255, 255, 255, 0.9)',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6'
    },
    nav: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      marginTop: '2rem',
      flexWrap: 'wrap'
    },
    navButton: {
      padding: '0.75rem 1.5rem',
      borderRadius: '10px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    navButtonActive: {
      background: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.4)',
      transform: 'translateY(-2px)'
    },
    main: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      marginBottom: '2rem'
    },
    assessmentCard: {
      textAlign: 'center',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    question: {
      fontSize: '1.5rem',
      fontWeight: '600',
      marginBottom: '2rem',
      color: '#1e293b'
    },
    optionGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    option: {
      padding: '1rem',
      borderRadius: '12px',
      border: '2px solid #e2e8f0',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      background: 'white'
    },
    optionSelected: {
      border: '2px solid #3b82f6',
      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      background: '#e2e8f0',
      borderRadius: '4px',
      overflow: 'hidden',
      marginBottom: '2rem'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
      borderRadius: '4px',
      transition: 'width 0.3s ease'
    },
    recommendationGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '1.5rem'
    },
    recommendationCard: {
      background: 'white',
      borderRadius: '16px',
      padding: '1.5rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      border: '1px solid #e2e8f0',
      position: 'relative',
      overflow: 'hidden'
    },
    matchScore: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'linear-gradient(135deg, #10b981, #059669)',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '20px',
      fontSize: '0.875rem',
      fontWeight: '600'
    },
    roleTitle: {
      fontSize: '1.25rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '0.5rem'
    },
    fieldBadge: {
      display: 'inline-block',
      padding: '0.25rem 0.75rem',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '600',
      color: 'white',
      marginBottom: '1rem'
    },
    reasonsList: {
      listStyle: 'none',
      padding: 0,
      margin: '1rem 0'
    },
    reasonItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
      color: '#64748b'
    },
    skillGapCard: {
      background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
      borderRadius: '12px',
      padding: '1rem',
      marginBottom: '1rem',
      border: '1px solid #f59e0b'
    },
    skillGapTitle: {
      fontSize: '1rem',
      fontWeight: '600',
      color: '#92400e',
      marginBottom: '0.5rem'
    },
    skillTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem'
    },
    skillTag: {
      background: '#f59e0b',
      color: 'white',
      padding: '0.25rem 0.75rem',
      borderRadius: '16px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    button: {
      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 2rem',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#1e293b',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    },
    statCard: {
      background: 'white',
      borderRadius: '12px',
      padding: '1.5rem',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: '700',
      color: '#3b82f6',
      marginBottom: '0.5rem'
    },
    statLabel: {
      fontSize: '0.875rem',
      color: '#64748b',
      fontWeight: '500'
    }
  };

  const currentQuestion = assessmentQuestions[assessmentStep];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>
          <Brain size={48} style={{ color: '#fbbf24' }} />
          AI Career Advisor
        </h1>
        <p style={styles.subtitle}>
          Discover your perfect career path with our intelligent assessment system. 
          Get personalized recommendations, skill gap analysis, and a roadmap to success.
        </p>
        <nav style={styles.nav}>
          {['assessment', 'recommendations', 'explorer', 'resources'].map(view => (
            <button
              key={view}
              style={{
                ...styles.navButton,
                ...(currentView === view ? styles.navButtonActive : {})
              }}
              onClick={() => setCurrentView(view)}
            >
              {view === 'assessment' && <Target size={16} />}
              {view === 'recommendations' && <Star size={16} />}
              {view === 'explorer' && <Map size={16} />}
              {view === 'resources' && <BookOpen size={16} />}
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </nav>
      </header>

      <main style={styles.main}>
        {currentView === 'assessment' && (
          <div style={styles.card}>
            <div style={styles.assessmentCard}>
              <div style={styles.progressBar}>
                <div 
                  style={{
                    ...styles.progressFill,
                    width: `${((assessmentStep + 1) / assessmentQuestions.length) * 100}%`
                  }}
                />
              </div>
              
              <div style={styles.question}>
                {currentQuestion.question}
              </div>

              {currentQuestion.type === 'select' && (
                <div style={styles.optionGrid}>
                  {currentQuestion.options.map(option => (
                    <div
                      key={option}
                      style={{
                        ...styles.option,
                        ...(userProfile[currentQuestion.field] === option ? styles.optionSelected : {})
                      }}
                      onClick={() => updateUserProfile(currentQuestion.field, option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}

              {currentQuestion.type === 'multiselect' && (
                <div style={styles.optionGrid}>
                  {currentQuestion.options.map(option => (
                    <div
                      key={option}
                      style={{
                        ...styles.option,
                        ...(userProfile[currentQuestion.field]?.includes(option) ? styles.optionSelected : {})
                      }}
                      onClick={() => {
                        const current = userProfile[currentQuestion.field] || [];
                        const updated = current.includes(option)
                          ? current.filter(item => item !== option)
                          : [...current, option];
                        updateUserProfile(currentQuestion.field, updated);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}

              <button
                style={styles.button}
                onClick={handleAssessmentNext}
                disabled={!userProfile[currentQuestion.field] || 
                  (Array.isArray(userProfile[currentQuestion.field]) && userProfile[currentQuestion.field].length === 0)}
              >
                {assessmentStep < assessmentQuestions.length - 1 ? 'Next' : 'Get Recommendations'}
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {currentView === 'recommendations' && (
          <>
            <div style={styles.card}>
              <div style={styles.sectionTitle}>
                <Star size={24} />
                Your Personalized Career Recommendations
              </div>
              
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>{careerRecommendations.length}</div>
                  <div style={styles.statLabel}>Matched Careers</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>{userProfile.skills?.length || 0}</div>
                  <div style={styles.statLabel}>Current Skills</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>{skillGaps.length}</div>
                  <div style={styles.statLabel}>Growth Areas</div>
                </div>
              </div>

              <div style={styles.recommendationGrid}>
                {careerRecommendations.map((rec, index) => (
                  <div key={index} style={styles.recommendationCard}>
                    <div style={styles.matchScore}>
                      {Math.round(rec.matchScore)}% Match
                    </div>
                    
                    <div style={styles.roleTitle}>{rec.title}</div>
                    
                    <div 
                      style={{
                        ...styles.fieldBadge,
                        background: rec.fieldColor
                      }}
                    >
                      {rec.field}
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <DollarSign size={16} style={{ color: '#10b981' }} />
                        <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>{rec.salary}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={16} style={{ color: '#6b7280' }} />
                        <span style={{ fontSize: '0.875rem' }}>{rec.experience}</span>
                      </div>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <strong style={{ fontSize: '0.875rem', color: '#1e293b' }}>Why this matches you:</strong>
                      <ul style={styles.reasonsList}>
                        {rec.reasons.map((reason, i) => (
                          <li key={i} style={styles.reasonItem}>
                            <CheckCircle size={16} style={{ color: '#10b981' }} />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      style={styles.button}
                      onClick={() => {
                        setSelectedRole(rec.id);
                        setCurrentView('explorer');
                      }}
                    >
                      Explore Details
                      <ChevronRight size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {skillGaps.length > 0 && (
              <div style={styles.card}>
                <div style={styles.sectionTitle}>
                  <Lightbulb size={24} />
                  Skill Development Opportunities
                </div>
                
                {skillGaps.map((gap, index) => (
                  <div key={index} style={styles.skillGapCard}>
                    <div style={styles.skillGapTitle}>
                      For {gap.role}:
                    </div>
                    <div style={styles.skillTags}>
                      {gap.skills.map((skill, i) => (
                        <span key={i} style={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {currentView === 'explorer' && (
          <div style={styles.card}>
            <div style={styles.sectionTitle}>
              <Map size={24} />
              Career Path Explorer
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              {Object.entries(careerFields).map(([key, field]) => (
                <button
                  key={key}
                  style={{
                    ...styles.navButton,
                    ...(selectedField === key ? styles.navButtonActive : {}),
                    background: selectedField === key ? field.color : 'rgba(255, 255, 255, 0.1)',
                    color: 'white'
                  }}
                  onClick={() => {
                    setSelectedField(key);
                    setSelectedRole(null);
                  }}
                >
                  {field.icon}
                  {field.name}
                </button>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
                  {careerFields[selectedField].name}
                </h3>
                <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                  {careerFields[selectedField].description}
                </p>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
                      {careerFields[selectedField].marketGrowth}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Growth Rate</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#3b82f6' }}>
                      {careerFields[selectedField].avgSalary}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>Avg Salary</div>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {careerFields[selectedField].roles.slice(0, 3).map((role, index) => (
                  <div
                    key={role.id}
                    style={{
                      padding: '1rem',
                      background: selectedRole === role.id ? '#dbeafe' : '#f8fafc',
                      borderRadius: '8px',
                      border: `2px solid ${selectedRole === role.id ? '#3b82f6' : '#e2e8f0'}`,
                      cursor: 'pointer'
                    }}
                    onClick={() => setSelectedRole(selectedRole === role.id ? null : role.id)}
                  >
                    <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{role.title}</div>
                    <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{role.salary}</div>
                  </div>
                ))}
              </div>
            </div>

            {selectedRole && (
              <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '2rem' }}>
                {(() => {
                  const role = careerFields[selectedField].roles.find(r => r.id === selectedRole);
                  if (!role) return null;
                  
                  return (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                        <div>
                          <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                            {role.title}
                          </h3>
                          <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                            {role.description}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981' }}>
                            {role.salary}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                            {role.experience}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Award size={20} />
                            Required Skills
                          </h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {role.skills.map((skill, index) => (
                              <span key={index} style={styles.skillTag}>
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Users size={20} />
                            Key Responsibilities
                          </h4>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {role.responsibilities.map((resp, index) => (
                              <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <CheckCircle size={16} style={{ color: '#10b981', marginTop: '0.25rem', flexShrink: 0 }} />
                                <span style={{ fontSize: '0.875rem' }}>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <TrendingUp size={20} />
                            Career Progression
                          </h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {role.nextRoles.map((nextRoleId, index) => {
                              const nextRole = careerFields[selectedField].roles.find(r => r.id === nextRoleId);
                              return nextRole ? (
                                <button
                                  key={index}
                                  style={{
                                    padding: '0.5rem 1rem',
                                    background: '#3b82f6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '0.875rem',
                                    cursor: 'pointer'
                                  }}
                                  onClick={() => setSelectedRole(nextRoleId)}
                                >
                                  {nextRole.title}
                                </button>
                              ) : null;
                            })}
                          </div>
                        </div>

                        <div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <GraduationCap size={20} />
                            Learning Path
                          </h4>
                          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {role.learningPath?.map((step, index) => (
                              <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <div style={{ 
                                  width: '20px', 
                                  height: '20px', 
                                  borderRadius: '50%', 
                                  background: '#3b82f6', 
                                  color: 'white', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center', 
                                  fontSize: '0.75rem',
                                  fontWeight: '600',
                                  flexShrink: 0,
                                  marginTop: '0.125rem'
                                }}>
                                  {index + 1}
                                </div>
                                <span style={{ fontSize: '0.875rem' }}>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Shield size={20} />
                            Job Market Info
                          </h4>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Remote Work</div>
                              <div style={{ fontWeight: '600' }}>{role.remoteWork}</div>
                            </div>
                            <div>
                              <div style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>Job Security</div>
                              <div style={{ fontWeight: '600' }}>{role.jobSecurity}</div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Briefcase size={20} />
                            Top Employers
                          </h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {role.companies?.map((company, index) => (
                              <span key={index} style={{
                                padding: '0.375rem 0.75rem',
                                background: '#e5e7eb',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: '500'
                              }}>
                                {company}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {currentView === 'resources' && (
          <div style={styles.card}>
            <div style={styles.sectionTitle}>
              <BookOpen size={24} />
              Career Development Resources
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div style={{ background: '#f0f9ff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #0ea5e9' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0c4a6e' }}>
                  💡 Skill Assessment Tools
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>• LinkedIn Skill Assessments</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Coursera Skill Tests</li>
                  <li style={{ marginBottom: '0.5rem' }}>• GitHub Portfolio Analysis</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Industry Certification Prep</li>
                </ul>
              </div>

              <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '1.5rem', border: '1px solid #22c55e' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#166534' }}>
                  📚 Learning Platforms
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>• Coursera & edX</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Udemy & Pluralsight</li>
                  <li style={{ marginBottom: '0.5rem' }}>• FreeCodeCamp</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Khan Academy</li>
                </ul>
              </div>

              <div style={{ background: '#fef3c7', borderRadius: '12px', padding: '1.5rem', border: '1px solid #f59e0b' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#92400e' }}>
                  🎯 Career Planning
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>• SMART Goal Setting</li>
                  <li style={{ marginBottom: '0.5rem' }}>• 5-Year Career Roadmap</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Networking Strategies</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Personal Branding</li>
                </ul>
              </div>

              <div style={{ background: '#fdf2f8', borderRadius: '12px', padding: '1.5rem', border: '1px solid #ec4899' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#9d174d' }}>
                  💼 Job Search Tools
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ marginBottom: '0.5rem' }}>• Resume Optimization</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Interview Preparation</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Salary Negotiation</li>
                  <li style={{ marginBottom: '0.5rem' }}>• Portfolio Building</li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: '2rem', padding: '2rem', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '16px', color: 'white' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                🚀 Ready to Start Your Journey?
              </h3>
              <p style={{ marginBottom: '1.5rem', opacity: 0.9 }}>
                Take the first step towards your dream career. Our AI-powered recommendations are just the beginning!
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  style={{
                    ...styles.button,
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                  onClick={() => setCurrentView('assessment')}
                >
                  Retake Assessment
                  <Target size={16} />
                </button>
                <button
                  style={{
                    ...styles.button,
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                  onClick={() => setCurrentView('recommendations')}
                >
                  View Recommendations
                  <Star size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdvancedCareerAdvisor;