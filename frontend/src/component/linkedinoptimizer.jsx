import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  CheckCircle, AlertCircle, User, Briefcase, Award, MessageSquare, 
  Target, TrendingUp, Star, Plus, Minus, Image, Link, Mail, Phone, 
  GraduationCap, ChevronDown, ChevronUp, Loader, Download, Upload,
  Eye, EyeOff, Clipboard, ClipboardCheck, X, Search, BarChart2, 
  Hash, Globe, BookOpen, Code, Database, Cpu, Server, Layers, 
  Shield, Zap, Clock, Calendar, Users, Award as Trophy, GitPullRequest
} from 'lucide-react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useDebounce } from 'use-debounce';
import { useHotkeys } from 'react-hotkeys-hook';

const LinkedInOptimizer = () => {
  // Profile state with more detailed structure
  const [profile, setProfile] = useState({
    headline: '',
    summary: '',
    experience: [],
    skills: [],
    education: [],
    certifications: [],
    projects: [],
    languages: [],
    volunteer: [],
    publications: [],
    profilePhoto: false,
    backgroundImage: false,
    contactInfo: {
      email: false,
      phone: false,
      website: false,
      linkedin: false,
      twitter: false,
      github: false
    },
    customSections: []
  });

  const [score, setScore] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 300);
  const [activeRecommendation, setActiveRecommendation] = useState(null);
  const [viewMode, setViewMode] = useState('edit'); // 'edit' or 'analysis'
  const [isDragging, setIsDragging] = useState(false);
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  
  const fileInputRef = useRef(null);
  const dropRef = useRef(null);

  // Expanded sections state with animation support
  const [expandedSections, setExpandedSections] = useState({
    headline: true,
    summary: true,
    experience: true,
    skills: true,
    education: true,
    certifications: true,
    projects: true,
    languages: true,
    contact: true,
    custom: true
  });

  // Keyboard shortcuts
  useHotkeys('ctrl+shift+p', () => setPreviewMode(!previewMode));
  useHotkeys('ctrl+shift+a', () => generateAISuggestions());
  useHotkeys('ctrl+shift+s', () => exportProfile());

  // Sample LinkedIn profile data for demo with more comprehensive data
  const sampleProfile = useMemo(() => ({
    headline: 'Senior Software Engineer | React Specialist | Building Scalable Web Applications',
    summary: 'Experienced software engineer with 5+ years of expertise in React, Node.js, and cloud technologies. Passionate about creating efficient, scalable web applications that deliver exceptional user experiences.\n\nSuccessfully led teams to deliver complex projects on time and under budget. Implemented CI/CD pipelines reducing deployment time by 60%. Improved application performance by 40% through optimization techniques.\n\nOpen to new opportunities and collaborations in the tech space.',
    experience: [
      {
        title: 'Senior Frontend Developer',
        company: 'Tech Innovations Inc.',
        period: '2020 - Present',
        location: 'San Francisco, CA',
        description: 'Led a team of 5 developers to rebuild company dashboard using React and Redux, improving performance by 40%.\n\nImplemented CI/CD pipelines reducing deployment time by 60%.\n\nIntroduced automated testing coverage increasing from 20% to 85%.\n\nMentored junior developers and conducted code reviews.'
      },
      {
        title: 'Software Engineer',
        company: 'Digital Solutions LLC',
        period: '2018 - 2020',
        location: 'New York, NY',
        description: 'Developed and maintained web applications using React and Node.js.\n\nCollaborated with UX team to improve customer satisfaction scores by 25%.\n\nReduced API response times by 30% through optimization.\n\nParticipated in agile development processes.'
      }
    ],
    skills: [
      { name: 'React', level: 'expert' },
      { name: 'JavaScript', level: 'expert' },
      { name: 'TypeScript', level: 'advanced' },
      { name: 'Node.js', level: 'advanced' },
      { name: 'Redux', level: 'advanced' },
      { name: 'HTML5', level: 'expert' },
      { name: 'CSS3', level: 'expert' },
      { name: 'Git', level: 'advanced' },
      { name: 'AWS', level: 'intermediate' },
      { name: 'CI/CD', level: 'intermediate' },
      { name: 'Docker', level: 'intermediate' },
      { name: 'GraphQL', level: 'intermediate' }
    ],
    education: [
      {
        degree: 'B.S. Computer Science',
        institution: 'State University',
        year: '2015 - 2019',
        description: 'Graduated with honors. Specialized in Web Technologies and Distributed Systems.'
      }
    ],
    certifications: [
      {
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        date: '2021',
        credentialId: 'AWS-123456'
      },
      {
        name: 'React Professional Certification',
        issuer: 'React Institute',
        date: '2020'
      }
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB',
        link: 'https://github.com/username/ecommerce'
      },
      {
        name: 'Task Management App',
        description: 'Developed a collaborative task management application with real-time updates',
        link: 'https://github.com/username/taskapp'
      }
    ],
    languages: [
      { language: 'English', proficiency: 'Native' },
      { language: 'Spanish', proficiency: 'Professional' }
    ],
    volunteer: [
      {
        role: 'Mentor',
        organization: 'Code for Good',
        period: '2019 - Present',
        description: 'Mentoring aspiring developers through coding bootcamps'
      }
    ],
    publications: [
      {
        title: 'Optimizing React Performance',
        publisher: 'Tech Journal',
        date: '2021',
        link: 'https://example.com/article'
      }
    ],
    profilePhoto: true,
    backgroundImage: true,
    contactInfo: {
      email: true,
      phone: true,
      website: true,
      linkedin: true,
      twitter: true,
      github: true
    },
    customSections: [
      {
        title: 'Awards',
        items: ['Best Employee Award 2020', 'Hackathon Winner 2019']
      }
    ]
  }), []);

  // Popular skills for autocomplete
  const popularSkills = useMemo(() => [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'Java', 'C#', 
    'HTML5', 'CSS3', 'SASS', 'Redux', 'GraphQL', 'REST API', 'Git', 'GitHub',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD', 'Jenkins', 
    'Webpack', 'Babel', 'Jest', 'Testing Library', 'MongoDB', 'PostgreSQL',
    'MySQL', 'Firebase', 'Express.js', 'Next.js', 'NestJS', 'Django', 'Flask',
    'Spring Boot', '.NET', 'Angular', 'Vue.js', 'Svelte', 'Tailwind CSS',
    'Bootstrap', 'Material UI', 'Figma', 'Adobe XD', 'Agile', 'Scrum', 'Jira',
    'Trello', 'Linux', 'Bash', 'PowerShell', 'OAuth', 'JWT', 'OOP', 'FP',
    'Microservices', 'Serverless', 'Blockchain', 'Machine Learning', 'TensorFlow',
    'PyTorch', 'Data Science', 'Pandas', 'NumPy', 'SQL', 'NoSQL', 'Redis',
    'Kafka', 'RabbitMQ', 'WebSockets', 'WebRTC', 'Three.js', 'D3.js', 'Electron',
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'Rust', 'Go', 'PHP', 'Laravel',
    'WordPress', 'Shopify', 'Web3', 'Ethereum', 'Solidity', 'Smart Contracts'
  ], []);

  // Calculate filtered recommendations based on search
  const filteredRecommendations = useMemo(() => {
    if (!debouncedSearch) return recommendations;
    return recommendations.filter(rec => 
      rec.text.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      rec.section.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [recommendations, debouncedSearch]);

  // Load sample profile with animation
  const loadSampleProfile = useCallback(() => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setProfile(sampleProfile);
      setIsAnalyzing(false);
    }, 1500);
  }, [sampleProfile]);

  // Enhanced score calculation with more metrics
  const calculateScore = useCallback(() => {
    let totalScore = 0;
    const newRecommendations = [];

    // Headline scoring (15 points)
    if (profile.headline.length > 0) {
      if (profile.headline.length >= 50 && profile.headline.length <= 120) {
        totalScore += 15;
        
        // Check for power words in headline
        const powerWords = ['specialist', 'expert', 'leader', 'developer', 'engineer', 'architect', 'consultant'];
        const hasPowerWords = powerWords.some(word => profile.headline.toLowerCase().includes(word));
        
        if (!hasPowerWords) {
          newRecommendations.push({
            type: 'warning',
            text: 'Consider adding power words to your headline (e.g., Expert, Specialist, Leader)',
            section: 'Headline',
            priority: 3
          });
        }
      } else {
        totalScore += 5;
        newRecommendations.push({
          type: 'warning',
          text: 'Optimize your headline length (50-120 characters for best results)',
          section: 'Headline',
          priority: 2
        });
      }
    } else {
      newRecommendations.push({
        type: 'error',
        text: 'Add a compelling headline that describes your professional value',
        section: 'Headline',
        priority: 1
      });
    }

    // Summary scoring (20 points)
    if (profile.summary.length > 0) {
      if (profile.summary.length >= 300) {
        totalScore += 20;
        
        // Check for keywords in summary
        const keywordCount = countKeywords(profile.summary);
        if (keywordCount < 5) {
          newRecommendations.push({
            type: 'warning',
            text: 'Add more industry keywords to your summary for better search visibility',
            section: 'Summary',
            priority: 3
          });
        }
        
        // Check for metrics
        const hasMetrics = /\d+%|\$\d+k?|\d+\+ years/i.test(profile.summary);
        if (!hasMetrics) {
          newRecommendations.push({
            type: 'warning',
            text: 'Add quantifiable achievements to your summary (e.g., "Increased performance by 40%")',
            section: 'Summary',
            priority: 3
          });
        }
      } else if (profile.summary.length >= 200) {
        totalScore += 15;
        newRecommendations.push({
          type: 'warning',
          text: 'Expand your summary to at least 300 characters for better visibility',
          section: 'Summary',
          priority: 2
        });
      } else {
        totalScore += 5;
        newRecommendations.push({
          type: 'warning',
          text: 'Your summary is too short (aim for at least 200 characters)',
          section: 'Summary',
          priority: 2
        });
      }
    } else {
      newRecommendations.push({
        type: 'error',
        text: 'Add a professional summary showcasing your expertise and goals',
        section: 'Summary',
        priority: 1
      });
    }

    // Experience scoring (25 points)
    if (profile.experience.length > 0) {
      // Points for number of experiences
      if (profile.experience.length >= 3) {
        totalScore += 10;
      } else if (profile.experience.length === 2) {
        totalScore += 7;
      } else {
        totalScore += 5;
      }
      
      // Points for experience quality
      let qualityPoints = 0;
      profile.experience.forEach(exp => {
        if (exp.description && exp.description.length > 100) qualityPoints += 2;
        if (exp.description && /\d+%|\$\d+k?/i.test(exp.description)) qualityPoints += 3;
      });
      
      totalScore += Math.min(15, qualityPoints);
      
      if (qualityPoints < 10) {
        newRecommendations.push({
          type: 'warning',
          text: 'Add more detailed descriptions with quantifiable achievements to your experience',
          section: 'Experience',
          priority: 2
        });
      }
    } else {
      newRecommendations.push({
        type: 'error',
        text: 'Add your work experience to showcase your career progression',
        section: 'Experience',
        priority: 1
      });
    }

    // Skills scoring (15 points)
    if (profile.skills.length > 0) {
      // Points for number of skills
      if (profile.skills.length >= 15) {
        totalScore += 8;
      } else if (profile.skills.length >= 10) {
        totalScore += 6;
      } else if (profile.skills.length >= 5) {
        totalScore += 4;
      } else {
        totalScore += 2;
      }
      
      // Points for skill endorsements (simulated)
      const endorsedSkills = profile.skills.filter(skill => skill.level && skill.level !== 'beginner').length;
      totalScore += Math.min(7, Math.floor(endorsedSkills / 2));
      
      if (profile.skills.length < 10) {
        newRecommendations.push({
          type: 'warning',
          text: 'Add more skills (10+ recommended for better discoverability)',
          section: 'Skills',
          priority: 3
        });
      }
    } else {
      newRecommendations.push({
        type: 'error',
        text: 'Add relevant skills to increase your profile visibility',
        section: 'Skills',
        priority: 1
      });
    }

    // Profile photo (10 points)
    if (profile.profilePhoto) {
      totalScore += 10;
    } else {
      newRecommendations.push({
        type: 'error',
        text: 'Add a professional profile photo (profiles with photos get 21x more views)',
        section: 'Profile Photo',
        priority: 1
      });
    }

    // Background image (5 points)
    if (profile.backgroundImage) {
      totalScore += 5;
    } else {
      newRecommendations.push({
        type: 'warning',
        text: 'Add a background image to make your profile more visually appealing',
        section: 'Background',
        priority: 3
      });
    }

    // Contact info (10 points)
    const contactCount = Object.values(profile.contactInfo).filter(Boolean).length;
    if (contactCount >= 4) {
      totalScore += 10;
    } else if (contactCount >= 2) {
      totalScore += 7;
      newRecommendations.push({
        type: 'warning',
        text: 'Add more contact information for better networking opportunities',
        section: 'Contact Info',
        priority: 2
      });
    } else if (contactCount === 1) {
      totalScore += 3;
      newRecommendations.push({
        type: 'warning',
        text: 'Add more ways to contact you (email, phone, website)',
        section: 'Contact Info',
        priority: 2
      });
    } else {
      newRecommendations.push({
        type: 'error',
        text: 'Add contact information to make it easy for others to reach you',
        section: 'Contact Info',
        priority: 1
      });
    }

    // Education (5 points)
    if (profile.education.length > 0) {
      totalScore += 5;
    } else {
      newRecommendations.push({
        type: 'warning',
        text: 'Add your education background to build credibility',
        section: 'Education',
        priority: 3
      });
    }

    // Certifications (5 points)
    if (profile.certifications.length > 0) {
      totalScore += 5;
    } else {
      newRecommendations.push({
        type: 'info',
        text: 'Consider adding relevant certifications to showcase your expertise',
        section: 'Certifications',
        priority: 4
      });
    }

    // Projects (5 points)
    if (profile.projects.length > 0) {
      totalScore += 5;
    }

    // Languages (3 points)
    if (profile.languages.length >= 2) {
      totalScore += 3;
    } else if (profile.languages.length === 1) {
      totalScore += 1;
    }

    // Volunteer (2 points)
    if (profile.volunteer.length > 0) {
      totalScore += 2;
    }

    // Publications (2 points)
    if (profile.publications.length > 0) {
      totalScore += 2;
    }

    // Custom sections (3 points)
    if (profile.customSections.length > 0) {
      totalScore += 3;
    }

    // Sort recommendations by priority (errors first, then warnings, then info)
    newRecommendations.sort((a, b) => {
      if (a.type === 'error' && b.type !== 'error') return -1;
      if (a.type !== 'error' && b.type === 'error') return 1;
      if (a.type === 'warning' && b.type === 'info') return -1;
      if (a.type === 'info' && b.type === 'warning') return 1;
      return a.priority - b.priority;
    });

    setScore(Math.min(100, totalScore));
    setRecommendations(newRecommendations);
  }, [profile]);

  // Count keywords in text
  const countKeywords = useCallback((text) => {
    const commonKeywords = [
      'react', 'javascript', 'developer', 'engineer', 'software', 'web', 
      'frontend', 'backend', 'cloud', 'aws', 'azure', 'gcp', 'node', 
      'typescript', 'database', 'api', 'architecture', 'system', 
      'application', 'performance', 'scalable', 'secure', 'responsive',
      'mobile', 'desktop', 'framework', 'library', 'tool', 'ci/cd',
      'devops', 'agile', 'scrum', 'test', 'debug', 'optimize', 'lead',
      'mentor', 'team', 'collaborate', 'communicate', 'problem', 'solution'
    ];
    
    return commonKeywords.filter(keyword => 
      text.toLowerCase().includes(keyword)
    ).length;
  }, []);

  // Recalculate score when profile changes
  useEffect(() => {
    calculateScore();
  }, [profile, calculateScore]);

  // Experience management
  const addExperience = useCallback(() => {
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, { 
        title: '', 
        company: '', 
        period: '',
        location: '',
        description: '' 
      }]
    }));
  }, []);

  const removeExperience = useCallback((index) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  }, []);

  const updateExperience = useCallback((index, field, value) => {
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  }, []);

  // Skills management with autocomplete
  const addSkill = useCallback(() => {
    setProfile(prev => ({
      ...prev,
      skills: [...prev.skills, { name: '', level: 'intermediate' }]
    }));
  }, []);

  const removeSkill = useCallback((index) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  }, []);

  const updateSkill = useCallback((index, field, value) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  }, []);

  const handleSkillInput = useCallback((index, value) => {
    updateSkill(index, 'name', value);
    
    if (value.length > 1) {
      const matches = popularSkills.filter(skill => 
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setSkillSuggestions(matches.slice(0, 5));
      setShowSkillSuggestions(true);
    } else {
      setShowSkillSuggestions(false);
    }
  }, [popularSkills, updateSkill]);

  const selectSkillSuggestion = useCallback((index, suggestion) => {
    updateSkill(index, 'name', suggestion);
    setShowSkillSuggestions(false);
  }, [updateSkill]);

  // Education management
  const addEducation = useCallback(() => {
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, { 
        degree: '', 
        institution: '', 
        year: '',
        description: ''
      }]
    }));
  }, []);

  const removeEducation = useCallback((index) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  }, []);

  const updateEducation = useCallback((index, field, value) => {
    setProfile(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  }, []);

  // Certifications management
  const addCertification = useCallback(() => {
    setProfile(prev => ({
      ...prev,
      certifications: [...prev.certifications, { 
        name: '', 
        issuer: '', 
        date: '',
        credentialId: ''
      }]
    }));
  }, []);

  const removeCertification = useCallback((index) => {
    setProfile(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  }, []);

  const updateCertification = useCallback((index, field, value) => {
    setProfile(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  }, []);

  // Projects management
  const addProject = useCallback(() => {
    setProfile(prev => ({
      ...prev,
      projects: [...prev.projects, { 
        name: '', 
        description: '',
        link: ''
      }]
    }));
  }, []);

  const removeProject = useCallback((index) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  }, []);

  const updateProject = useCallback((index, field, value) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.map((proj, i) => 
        i === index ? { ...proj, [field]: value } : proj
      )
    }));
  }, []);

  // Custom sections management
  const addCustomSection = useCallback(() => {
    setProfile(prev => ({
      ...prev,
      customSections: [...prev.customSections, { title: '', items: [''] }]
    }));
  }, []);

  const removeCustomSection = useCallback((index) => {
    setProfile(prev => ({
      ...prev,
      customSections: prev.customSections.filter((_, i) => i !== index)
    }));
  }, []);

  const updateCustomSectionTitle = useCallback((index, value) => {
    setProfile(prev => ({
      ...prev,
      customSections: prev.customSections.map((section, i) => 
        i === index ? { ...section, title: value } : section
      )
    }));
  }, []);

  const addCustomSectionItem = useCallback((sectionIndex) => {
    setProfile(prev => ({
      ...prev,
      customSections: prev.customSections.map((section, i) => 
        i === sectionIndex ? { ...section, items: [...section.items, ''] } : section
      )
    }));
  }, []);

  const removeCustomSectionItem = useCallback((sectionIndex, itemIndex) => {
    setProfile(prev => ({
      ...prev,
      customSections: prev.customSections.map((section, i) => 
        i === sectionIndex ? { 
          ...section, 
          items: section.items.filter((_, idx) => idx !== itemIndex)
        } : section
      )
    }));
  }, []);

  const updateCustomSectionItem = useCallback((sectionIndex, itemIndex, value) => {
    setProfile(prev => ({
      ...prev,
      customSections: prev.customSections.map((section, i) => 
        i === sectionIndex ? { 
          ...section, 
          items: section.items.map((item, idx) => 
            idx === itemIndex ? value : item
          )
        } : section
      )
    }));
  }, []);

  // Score visualization
  const getScoreColor = useCallback(() => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  }, [score]);

  const getScoreLabel = useCallback(() => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  }, [score]);

  // Section toggling with animation
  const toggleSection = useCallback((section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  }, []);

  // AI suggestions with more realistic simulation
  const generateAISuggestions = useCallback(() => {
    setIsAnalyzing(true);
    setViewMode('analysis');
    
    // Simulate AI analysis with more detailed suggestions
    setTimeout(() => {
      setAiSuggestions({
        headline: [
          "Consider adding more specific technologies: 'Senior Software Engineer | React, Node.js, AWS Specialist'",
          "Include a value proposition: 'Helping companies build scalable, high-performance web applications'",
          "Add industry keywords: 'Full Stack Developer | Web Applications | Cloud Architecture'"
        ],
        summary: [
          "Add metrics to your achievements: 'Improved application performance by 40% through optimization techniques'",
          "Include more action verbs: 'Led, Developed, Implemented, Optimized, Scaled'",
          "Mention your collaboration skills: 'Collaborated with cross-functional teams to deliver high-quality products'",
          "Add a call-to-action: 'Open to connecting with professionals in the tech industry'"
        ],
        experience: profile.experience.map((exp, idx) => [
          `For ${exp.title} at ${exp.company}, quantify your achievements with numbers`,
          `Add technologies used: 'Built with React, Node.js, and MongoDB'`,
          `Include business impact: 'Resulted in 30% increase in user engagement'`
        ]),
        skills: [
          "Reorder skills to put most relevant first based on your target roles",
          "Add more niche skills that differentiate you: 'WebSockets, Serverless Architecture'",
          "Consider adding soft skills: 'Team Leadership, Agile Methodology'"
        ],
        education: [
          "Add relevant coursework or achievements: 'Graduated with Honors, GPA: 3.8'",
          "Include extracurricular activities if relevant: 'President of Computer Science Club'"
        ]
      });
      setIsAnalyzing(false);
    }, 2500);
  }, [profile.experience]);

  // Apply suggestion to profile
  const applySuggestion = useCallback((section, suggestion) => {
    if (section === 'headline') {
      setProfile(prev => ({
        ...prev,
        headline: suggestion.split(': ')[1] || suggestion
      }));
    } else if (section === 'summary') {
      setProfile(prev => ({
        ...prev,
        summary: prev.summary + '\n\n' + suggestion
      }));
    }
    // Other suggestion applications would go here
  }, []);

  // File handling with drag and drop
  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedProfile = JSON.parse(event.target.result);
          setIsAnalyzing(true);
          setTimeout(() => {
            setProfile(importedProfile);
            setIsAnalyzing(false);
          }, 1500);
        } catch (error) {
          console.error('Error parsing profile file:', error);
        }
      };
      reader.readAsText(file);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/json') {
      handleFileUpload({ target: { files: [file] } });
    }
  }, [handleFileUpload]);

  // Export profile data
  const exportProfile = useCallback(() => {
    const dataStr = JSON.stringify(profile, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'linkedin-profile.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }, [profile]);

  // Copy to clipboard with feedback
  const copyToClipboard = useCallback((text) => {
    if (!text) return;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // Toggle preview mode
  const togglePreviewMode = useCallback(() => {
    setPreviewMode(!previewMode);
  }, [previewMode]);

  // Toggle view mode
  const toggleViewMode = useCallback(() => {
    setViewMode(prev => prev === 'edit' ? 'analysis' : 'edit');
  }, []);

  // Focus on recommendation section
  const focusRecommendation = useCallback((index) => {
    setActiveRecommendation(index);
    setTimeout(() => {
      document.getElementById(`recommendation-${index}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 100);
  }, []);

  // Tab configuration with icons
  const tabs = useMemo(() => [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'certifications', label: 'Certifications', icon: Shield },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'custom', label: 'Custom', icon: Plus }
  ], []);

  // Get icon for section
  const getSectionIcon = useCallback((section) => {
    switch(section) {
      case 'Headline': return <Hash size={16} className="mr-1" />;
      case 'Summary': return <BookOpen size={16} className="mr-1" />;
      case 'Experience': return <Briefcase size={16} className="mr-1" />;
      case 'Skills': return <Award size={16} className="mr-1" />;
      case 'Education': return <GraduationCap size={16} className="mr-1" />;
      case 'Certifications': return <Shield size={16} className="mr-1" />;
      case 'Profile Photo': return <User size={16} className="mr-1" />;
      case 'Background': return <Image size={16} className="mr-1" />;
      case 'Contact Info': return <Mail size={16} className="mr-1" />;
      default: return <Plus size={16} className="mr-1" />;
    }
  }, []);

  return (
    <div 
      className="linkedin-optimizer-container"
      ref={dropRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <style jsx global>{`
        :root {
          --blue-50: #f0f8ff;
          --indigo-100: #e0e7ff;
          --blue-600: #2563eb;
          --indigo-600: #4f46e5;
          --purple-600: #9333ea;
          --green-600: #16a34a;
          --red-600: #dc2626;
          --yellow-600: #ca8a04;
          --cyan-500: #06b6d4;
          --gray-50: #f9fafb;
          --gray-100: #f3f4f6;
          --gray-200: #e5e7eb;
          --gray-300: #d1d5db;
          --gray-400: #9ca3af;
          --gray-500: #6b7280;
          --gray-600: #4b5563;
          --gray-700: #374151;
          --gray-800: #1f2937;
          --indigo-50: #eef2ff;
          --indigo-100: #e0e7ff;
          --indigo-200: #c7d2fe;
          --indigo-300: #a5b4fc;
          --indigo-400: #818cf8;
          --indigo-500: #6366f1;
          --indigo-600: #4f46e5;
          --indigo-700: #4338ca;
          --indigo-800: #3730a3;
          --indigo-900: #312e81;
          --blue-500: #3b82f6;
          --cyan-400: #22d3ee;
          --red-50: #fef2f2;
          --yellow-50: #fefce8;
          --green-50: #f0fdf4;
          --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          --rounded-sm: 0.125rem;
          --rounded: 0.25rem;
          --rounded-md: 0.375rem;
          --rounded-lg: 0.5rem;
          --rounded-xl: 0.75rem;
          --rounded-full: 9999px;
        }
        
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .linkedin-optimizer-container {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--blue-50), var(--indigo-100));
          padding: 1rem;
        }
        
        .drag-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(99, 102, 241, 0.8);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          pointer-events: none;
        }
        
        .container {
          max-width: 72rem;
          margin: 0 auto;
        }
        
        .text-center {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .text-4xl {
          font-size: 2.25rem;
          line-height: 2.5rem;
          font-weight: 700;
          color: var(--gray-800);
          margin-bottom: 0.5rem;
        }
        
        .text-gray-600 {
          color: var(--gray-600);
        }
        
        .flex {
          display: flex;
        }
        
        .flex-wrap {
          flex-wrap: wrap;
        }
        
        .justify-center {
          justify-content: center;
        }
        
        .gap-4 {
          gap: 1rem;
        }
        
        .mt-4 {
          margin-top: 1rem;
        }
        
        .button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: var(--rounded-lg);
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-md);
          position: relative;
          overflow: hidden;
          outline: none;
          border: none;
        }
        
        .button:hover {
          box-shadow: var(--shadow-lg);
          transform: translateY(-1px);
        }
        
        .button:active {
          transform: scale(0.97);
        }
        
        .button::after {
          content: '';
          display: block;
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          background: rgba(99, 102, 241, 0.18);
          transform: translate(-50%, -50%);
          transition: width 0.6s cubic-bezier(0.4, 2, 0.1, 1), height 0.6s cubic-bezier(0.4, 2, 0.1, 1);
          z-index: 0;
        }
        
        .button:active::after {
          width: 200px;
          height: 200px;
          transition: 0s;
        }
        
        .button-indigo {
          background-color: var(--indigo-600);
        }
        
        .button-indigo:hover {
          background-color: var(--indigo-700);
        }
        
        .button-purple {
          background-color: var(--purple-600);
        }
        
        .button-purple:hover {
          background-color: var(--purple-700);
        }
        
        .button-green {
          background-color: var(--green-600);
        }
        
        .button-green:hover {
          background-color: var(--green-700);
        }
        
        .button-blue {
          background-color: var(--blue-600);
        }
        
        .button-blue:hover {
          background-color: var(--blue-700);
        }
        
        .button-cyan {
          background-color: var(--cyan-500);
        }
        
        .button-cyan:hover {
          background-color: var(--cyan-600);
        }
        
        .button-gradient {
          background: linear-gradient(90deg, var(--blue-500), var(--indigo-600));
        }
        
        .button-gradient:hover {
          background: linear-gradient(90deg, var(--blue-600), var(--indigo-700));
        }
        
        .button-outline {
          background: transparent;
          border: 1px solid var(--indigo-500);
          color: var(--indigo-600);
        }
        
        .button-outline:hover {
          background: var(--indigo-50);
        }
        
        .button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .hidden {
          display: none;
        }
        
        .card {
          background: white;
          border-radius: var(--rounded-xl);
          box-shadow: var(--shadow-lg);
          padding: 1.5rem;
          margin-bottom: 2rem;
          transition: box-shadow 0.3s cubic-bezier(0.4, 2, 0.1, 1), transform 0.25s;
        }
        
        .card:hover {
          box-shadow: 0 12px 40px 0 rgba(99, 102, 241, 0.18), 0 2px 4px 0 rgba(0, 0, 0, 0.04);
          transform: translateY(-2px) scale(1.014);
          z-index: 1;
        }
        
        .flex-col {
          flex-direction: column;
        }
        
        .md-flex-row {
          flex-direction: column;
        }
        
        @media (min-width: 768px) {
          .md-flex-row {
            flex-direction: row;
          }
        }
        
        .items-center {
          align-items: center;
        }
        
        .justify-between {
          justify-content: space-between;
        }
        
        .mb-4 {
          margin-bottom: 1rem;
        }
        
        .text-2xl {
          font-size: 1.5rem;
          line-height: 2rem;
          font-weight: 600;
          color: var(--gray-800);
        }
        
        .mb-2 {
          margin-bottom: 0.5rem;
        }
        
        .md-mb-0 {
          margin-bottom: 0;
        }
        
        .space-x-4 {
          gap: 1rem;
        }
        
        .text-3xl {
          font-size: 1.875rem;
          line-height: 2.25rem;
        }
        
        .font-bold {
          font-weight: 700;
        }
        
        .text-green-600 {
          color: var(--green-600);
        }
        
        .text-yellow-600 {
          color: var(--yellow-600);
        }
        
        .text-red-600 {
          color: var(--red-600);
        }
        
        .text-cyan-500 {
          color: var(--cyan-500);
        }
        
        .w-full {
          width: 100%;
        }
        
        .bg-gray-200 {
          background-color: var(--gray-200);
        }
        
        .rounded-full {
          border-radius: var(--rounded-full);
        }
        
        .h-3 {
          height: 0.75rem;
        }
        
        .mb-2 {
          margin-bottom: 0.5rem;
        }
        
        .score-progress {
          height: 100%;
          border-radius: var(--rounded-full);
          background-image: linear-gradient(90deg, var(--indigo-500), var(--blue-500), var(--cyan-400));
          box-shadow: 0 0 12px 2px rgba(99, 102, 241, 0.73);
          background-size: 200% 100%;
          animation: barstripe 2s linear infinite;
          transition: width 0.75s cubic-bezier(0.4, 2, 0.1, 1);
        }
        
        .text-sm {
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
        
        .indigo-card {
          background-color: var(--indigo-50);
          border: 1px solid var(--indigo-100);
        }
        
        .text-xl {
          font-size: 1.25rem;
          line-height: 1.75rem;
        }
        
        .font-semibold {
          font-weight: 600;
        }
        
        .text-indigo-800 {
          color: var(--indigo-800);
        }
        
        .space-y-4 {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .font-medium {
          font-weight: 500;
        }
        
        .text-indigo-700 {
          color: var(--indigo-700);
        }
        
        .mb-2 {
          margin-bottom: 0.5rem;
        }
        
        .space-y-2 {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .text-xs {
          font-size: 0.75rem;
          line-height: 1rem;
        }
        
        .bg-indigo-100 {
          background-color: var(--indigo-100);
        }
        
        .text-indigo-700 {
          color: var(--indigo-700);
        }
        
        .rounded {
          border-radius: var(--rounded);
        }
        
        .hover-bg-indigo-200:hover {
          background-color: var(--indigo-200);
        }
        
        .preview-container {
          background: white;
          border-radius: var(--rounded-xl);
          box-shadow: var(--shadow-lg);
          padding: 2rem;
          margin-bottom: 2rem;
        }
        
        .max-w-4xl {
          max-width: 56rem;
        }
        
        .mx-auto {
          margin-left: auto;
          margin-right: auto;
        }
        
        .flex-col {
          flex-direction: column;
        }
        
        .md-flex-row {
          flex-direction: column;
        }
        
        @media (min-width: 768px) {
          .md-flex-row {
            flex-direction: row;
          }
        }
        
        .items-start {
          align-items: flex-start;
        }
        
        .md-items-center {
          align-items: center;
        }
        
        .gap-6 {
          gap: 1.5rem;
        }
        
        .mb-8 {
          margin-bottom: 2rem;
        }
        
        .w-24 {
          width: 6rem;
        }
        
        .h-24 {
          height: 6rem;
        }
        
        .rounded-full {
          border-radius: var(--rounded-full);
        }
        
        .bg-gray-200 {
          background-color: var(--gray-200);
        }
        
        .flex-1 {
          flex: 1 1 0%;
        }
        
        .text-2xl {
          font-size: 1.5rem;
          line-height: 2rem;
        }
        
        .mt-1 {
          margin-top: 0.25rem;
        }
        
        .border-b {
          border-bottom: 1px solid var(--gray-200);
        }
        
        .pb-2 {
          padding-bottom: 0.5rem;
        }
        
        .whitespace-pre-line {
          white-space: pre-line;
        }
        
        .space-y-6 {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .border-l-2 {
          border-left: 2px solid;
        }
        
        .border-blue-500 {
          border-color: var(--blue-500);
        }
        
        .pl-4 {
          padding-left: 1rem;
        }
        
        .text-lg {
          font-size: 1.125rem;
          line-height: 1.75rem;
        }
        
        .font-semibold {
          font-weight: 600;
        }
        
        .mt-2 {
          margin-top: 0.5rem;
        }
        
        .flex-wrap {
          flex-wrap: wrap;
        }
        
        .gap-2 {
          gap: 0.5rem;
        }
        
        .skill-tag {
          background-color: var(--blue-100);
          color: var(--blue-800);
          padding: 0.25rem 0.75rem;
          border-radius: var(--rounded-full);
          font-size: 0.875rem;
          line-height: 1.25rem;
          transition: background-color 0.3s;
        }
        
        .skill-tag:hover {
          background-color: var(--blue-200);
        }
        
        .space-y-4 {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .grid {
          display: grid;
        }
        
        .grid-cols-1 {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        
        .lg-grid-cols-3 {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        
        @media (min-width: 1024px) {
          .lg-grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        
        .gap-8 {
          gap: 2rem;
        }
        
        .lg-col-span-2 {
          grid-column: span 2 / span 2;
        }
        
        .tab-container {
          background: white;
          border-radius: var(--rounded-xl);
          box-shadow: var(--shadow-lg);
          margin-bottom: 1.5rem;
        }
        
        .tab-navigation {
          display: flex;
          border-bottom: 1px solid var(--gray-200);
          overflow-x: auto;
        }
        
        .tab-button {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          font-weight: 500;
          transition: color 0.3s;
          position: relative;
          color: var(--gray-600);
        }
        
        .tab-button:hover {
          color: var(--blue-600);
        }
        
        .active-tab {
          color: var(--blue-600) !important;
          font-weight: 600;
          text-shadow: 0 2px 8px rgba(59, 130, 246, 0.4);
        }
        
        .active-tab::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 16%;
          right: 16%;
          height: 4px;
          border-radius: 4px;
          background: linear-gradient(90deg, var(--indigo-500), var(--indigo-400), var(--cyan-400));
          box-shadow: 0 0 8px rgba(99, 102, 241, 0.8);
          animation: tabglow 1.8s linear infinite alternate;
        }
        
        .tab-content {
          padding: 1.5rem;
        }
        
        .space-y-6 {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .cursor-pointer {
          cursor: pointer;
        }
        
        .block {
          display: block;
        }
        
        .text-sm {
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
        
        .font-medium {
          font-weight: 500;
        }
        
        .text-gray-700 {
          color: var(--gray-700);
        }
        
        .w-full {
          width: 100%;
        }
        
        .input-field, .textarea-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--gray-300);
          border-radius: var(--rounded-lg);
          transition: border-color 0.25s, box-shadow 0.3s, background 0.2s;
        }
        
        .input-field:focus, .textarea-field:focus {
          border-color: var(--indigo-500);
          box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.25);
          background: #f0f8ff;
          outline: none;
        }
        
        .textarea-field {
          min-height: 6rem;
        }
        
        .justify-between {
          justify-content: space-between;
        }
        
        .text-gray-500 {
          color: var(--gray-500);
        }
        
        .text-blue-600 {
          color: var(--blue-600);
        }
        
        .hover-text-blue-800:hover {
          color: var(--blue-800);
        }
        
        .transition-colors {
          transition: color 0.3s;
        }
        
        .grid-cols-1 {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        
        .md-grid-cols-2 {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        
        @media (min-width: 768px) {
          .md-grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        
        .gap-6 {
          gap: 1.5rem;
        }
        
        .space-y-4 {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background-color: var(--gray-50);
          border-radius: var(--rounded-lg);
          transition: background-color 0.3s;
          cursor: pointer;
        }
        
        .checkbox-label:hover {
          background-color: var(--gray-100);
        }
        
        .checkbox-input {
          width: 1rem;
          height: 1rem;
          border-radius: var(--rounded);
          color: var(--blue-600);
        }
        
        .experience-card {
          border: 1px solid var(--gray-200);
          border-radius: var(--rounded-lg);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: all 0.3s;
        }
        
        .experience-card:hover {
          box-shadow: 0 12px 40px 0 rgba(99, 102, 241, 0.18), 0 2px 4px 0 rgba(0, 0, 0, 0.04);
          transform: translateY(-2px);
        }
        
        .empty-state {
          text-align: center;
          padding: 2rem 0;
          background-color: var(--gray-50);
          border-radius: var(--rounded-lg);
        }
        
        .text-gray-400 {
          color: var(--gray-400);
        }
        
        .text-gray-600 {
          color: var(--gray-600);
        }
        
        .md-grid-cols-3 {
          grid-template-columns: repeat(1, minmax(0, 1fr));
        }
        
        @media (min-width: 768px) {
          .md-grid-cols-3 {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        
        .gap-4 {
          gap: 1rem;
        }
        
        .custom-section-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: var(--rounded);
        }
        
        .sticky {
          position: sticky;
          top: 1rem;
        }
        
        .recommendation-error, .recommendation-warning, .recommendation-info {
          position: relative;
          overflow: hidden;
          animation: pulseFade 1.5s infinite alternate;
          padding: 0.75rem;
          border-radius: var(--rounded-lg);
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .recommendation-error {
          background-color: var(--red-50);
        }
        
        .recommendation-warning {
          background-color: var(--yellow-50);
        }
        
        .recommendation-info {
          background-color: var(--blue-50);
        }
        
        .recommendation-error::before {
          content: "";
          position: absolute;
          left: -4px;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #ef4444, #f59e0b55);
          border-radius: var(--rounded);
          z-index: 0;
          animation: errorGlow 1.2s infinite alternate;
        }
        
        .recommendation-warning::before {
          content: "";
          position: absolute;
          left: -4px;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #f59e0b, #fbbf24cc);
          border-radius: var(--rounded);
          z-index: 0;
          animation: warnGlow 1.7s infinite alternate;
        }
        
        .recommendation-info::before {
          content: "";
          position: absolute;
          left: -4px;
          top: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(180deg, #3b82f6, #22d3eecc);
          border-radius: var(--rounded);
          z-index: 0;
          animation: infoGlow 2s infinite alternate;
        }
        
        .recommendation-error:hover, .recommendation-warning:hover, .recommendation-info:hover {
          filter: brightness(1.08);
          transform: scale(1.012);
        }
        
        .recommendation-active {
          box-shadow: 0 0 0 2px var(--indigo-300);
          transform: scale(1.02);
          z-index: 2;
        }
        
        .border-t {
          border-top: 1px solid var(--gray-200);
        }
        
        .pt-6 {
          padding-top: 1.5rem;
        }
        
        .mt-6 {
          margin-top: 1.5rem;
        }
        
        .space-y-3 {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .copied-flash {
          position: absolute;
          top: -10px;
          right: 20px;
          font-size: 1.1em;
          background: var(--cyan-400);
          color: white;
          padding: 2px 10px;
          border-radius: 10px;
          filter: drop-shadow(0 2px 6px rgba(34, 211, 238, 0.8));
          animation: burstOut 0.6s forwards;
          z-index: 9;
        }
        
        .search-bar {
          display: flex;
          align-items: center;
          background: white;
          border-radius: var(--rounded-lg);
          padding: 0.5rem 1rem;
          box-shadow: var(--shadow-sm);
          margin-bottom: 1rem;
        }
        
        .search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 0.5rem;
          font-size: 0.9rem;
        }
        
        .view-toggle {
          display: flex;
          border-radius: var(--rounded-lg);
          overflow: hidden;
          margin-bottom: 1rem;
        }
        
        .view-toggle-button {
          flex: 1;
          padding: 0.5rem 1rem;
          border: none;
          background: var(--gray-100);
          color: var(--gray-600);
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .view-toggle-button.active {
          background: var(--indigo-600);
          color: white;
        }
        
        .skill-suggestions {
          position: absolute;
          z-index: 10;
          width: 100%;
          max-height: 200px;
          overflow-y: auto;
          background: white;
          border: 1px solid var(--gray-200);
          border-radius: var(--rounded-md);
          box-shadow: var(--shadow-lg);
          margin-top: 0.25rem;
        }
        
        .skill-suggestion {
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .skill-suggestion:hover {
          background: var(--gray-100);
        }
        
        .level-selector {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }
        
        .level-button {
          padding: 0.25rem 0.5rem;
          border-radius: var(--rounded-sm);
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid transparent;
        }
        
        .level-button.beginner {
          background: var(--blue-50);
          color: var(--blue-700);
        }
        
        .level-button.beginner.active {
          background: var(--blue-100);
          border-color: var(--blue-300);
        }
        
        .level-button.intermediate {
          background: var(--purple-50);
          color: var(--purple-700);
        }
        
        .level-button.intermediate.active {
          background: var(--purple-100);
          border-color: var(--purple-300);
        }
        
        .level-button.advanced {
          background: var(--green-50);
          color: var(--green-700);
        }
        
        .level-button.advanced.active {
          background: var(--green-100);
          border-color: var(--green-300);
        }
        
        .level-button.expert {
          background: var(--indigo-50);
          color: var(--indigo-700);
        }
        
        .level-button.expert.active {
          background: var(--indigo-100);
          border-color: var(--indigo-300);
        }
        
        /* Animations */
        @keyframes bgMove {
          0% { background-position: 0 0; }
          100% { background-position: 100px 60px; }
        }
        
        @keyframes barstripe {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        
        @keyframes tabglow {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        
        @keyframes errorGlow {
          from { box-shadow: 0 0 0px #ef4444; opacity: 0.7; }
          to { box-shadow: 0 0 12px #ef4444; opacity: 1; }
        }
        
        @keyframes warnGlow {
          from { box-shadow: 0 0 0px #f59e0b; opacity: 0.7; }
          to { box-shadow: 0 0 10px #f59e0b; opacity: 1; }
        }
        
        @keyframes infoGlow {
          from { box-shadow: 0 0 0px #3b82f6; opacity: 0.7; }
          to { box-shadow: 0 0 10px #3b82f6; opacity: 1; }
        }
        
        @keyframes pulseFade {
          from { filter: brightness(1.01); }
          to { filter: brightness(1.05); }
        }
        
        @keyframes burstOut {
          0% { opacity: 0; transform: scale(0.7) translateY(-12px);}
          50% { opacity: 1; transform: scale(1.1) translateY(-2px);}
          100% { opacity: 0; transform: scale(1.4) translateY(-20px);}
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-24px);}
          to { opacity: 1; transform: translateY(0);}
        }
        
        .animate-fade-in {
          animation: fadeIn 0.7s cubic-bezier(0.4, 2, 0.1, 1);
        }
      `}</style>

      {/* Drag overlay */}
      <AnimatePresence>
        {isDragging && (
          <motion.div 
            className="drag-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <Upload size={48} className="mx-auto mb-4" />
              <p>Drop your profile JSON file to import</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl">
            LinkedIn Profile Optimizer
          </h1>
          <p className="text-gray-600">
            Optimize your LinkedIn profile for maximum visibility and engagement
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <button
              onClick={loadSampleProfile}
              className="button button-indigo"
            >
              <User size={16} />
              <span>Load Sample Profile</span>
            </button>
            
            <button
              onClick={togglePreviewMode}
              className="button button-purple"
            >
              {previewMode ? <EyeOff size={16} /> : <Eye size={16} />}
              <span>{previewMode ? 'Exit Preview' : 'Preview Profile'}</span>
            </button>
            
            <button
              onClick={() => fileInputRef.current.click()}
              className="button button-green"
            >
              <Upload size={16} />
              <span>Import Profile</span>
            </button>
            
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />
            
            <button
              onClick={exportProfile}
              className="button button-blue"
            >
              <Download size={16} />
              <span>Export Profile</span>
            </button>

            <button
              onClick={toggleViewMode}
              className="button button-cyan"
            >
              <BarChart2 size={16} />
              <span>{viewMode === 'edit' ? 'Analysis View' : 'Edit View'}</span>
            </button>
          </div>
        </div>

        {/* Score Card */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="flex flex-col md-flex-row items-center justify-between mb-4">
            <h2 className="text-2xl mb-2 md-mb-0">Profile Score</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="text-blue-600" size={24} />
                <span className={`text-3xl font-bold ${getScoreColor()}`}>
                  {score}/100
                </span>
              </div>
              <button
                onClick={generateAISuggestions}
                disabled={isAnalyzing}
                className="button button-gradient"
              >
                {isAnalyzing ? (
                  <>
                    <Loader className="loading-spinner" size={16} />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <MessageSquare size={16} />
                    <span>Get AI Suggestions</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className={`score-progress ${
                score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center">
            <p className={`text-sm ${getScoreColor()}`}>
              {getScoreLabel()} - {score < 80 ? 'Keep optimizing for better results!' : 'Great job! Your profile is well-optimized.'}
            </p>
            <button 
              onClick={() => copyToClipboard(profile.headline)}
              className="text-sm text-blue-600 hover-text-blue-800 flex items-center transition-colors"
            >
              {copied ? (
                <>
                  <ClipboardCheck size={14} className="mr-1" />
                  Copied!
                </>
              ) : (
                <>
                  <Clipboard size={14} className="mr-1" />
                  Copy Headline
                </>
              )}
            </button>
          </div>
        </motion.div>

        {aiSuggestions && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="card indigo-card"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-indigo-800 flex items-center">
                <MessageSquare className="mr-2" />
                AI Suggestions
              </h3>
              <button 
                onClick={() => setAiSuggestions(null)}
                className="text-gray-500 hover-text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              {aiSuggestions.headline && (
                <div>
                  <h4 className="font-medium text-indigo-700 mb-2 flex items-center">
                    <Hash size={18} className="mr-2" />
                    Headline Improvements
                  </h4>
                  <ul className="space-y-2">
                    {aiSuggestions.headline.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span className="text-gray-700">{suggestion}</span>
                        <button 
                          onClick={() => applySuggestion('headline', suggestion)}
                          className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover-bg-indigo-200 transition-colors"
                        >
                          Apply
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {aiSuggestions.summary && (
                <div>
                  <h4 className="font-medium text-indigo-700 mb-2 flex items-center">
                    <BookOpen size={18} className="mr-2" />
                    Summary Improvements
                  </h4>
                  <ul className="space-y-2">
                    {aiSuggestions.summary.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span className="text-gray-700">{suggestion}</span>
                        <button 
                          onClick={() => applySuggestion('summary', suggestion)}
                          className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded hover-bg-indigo-200 transition-colors"
                        >
                          Apply
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {aiSuggestions.skills && (
                <div>
                  <h4 className="font-medium text-indigo-700 mb-2 flex items-center">
                    <Award size={18} className="mr-2" />
                    Skills Recommendations
                  </h4>
                  <ul className="space-y-2">
                    {aiSuggestions.skills.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-indigo-500 mr-2">•</span>
                        <span className="text-gray-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {previewMode ? (
          <div className="preview-container">
            <div className="max-w-4xl mx-auto">
              {/* Profile Header */}
              <div className="flex flex-col md-flex-row items-start md-items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {profile.profilePhoto ? (
                    <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600">
                      <User size={40} />
                    </div>
                  ) : (
                    <User size={40} className="text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-800">{profile.headline || 'Your Professional Headline'}</h1>
                  <p className="text-gray-600 mt-1">Location • Connections • Contact Info</p>
                </div>
              </div>
              
              {/* About Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">About</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {profile.summary || 'Your professional summary will appear here.'}
                </p>
              </div>
              
              {/* Experience Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Experience</h2>
                {profile.experience.length > 0 ? (
                  <div className="space-y-6">
                    {profile.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-blue-500 pl-4">
                        <h3 className="text-lg font-semibold text-gray-800">{exp.title || 'Position Title'}</h3>
                        <p className="text-gray-600">{exp.company || 'Company Name'}</p>
                        {exp.period && <p className="text-gray-500 text-sm">{exp.period}</p>}
                        {exp.location && <p className="text-gray-500 text-sm">{exp.location}</p>}
                        <p className="text-gray-700 mt-2 whitespace-pre-line">
                          {exp.description || 'Job description and achievements.'}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No experience added yet.</p>
                )}
              </div>
              
              {/* Skills Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Skills</h2>
                {profile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">
                        {skill.name || 'Skill'}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No skills added yet.</p>
                )}
              </div>
              
              {/* Education Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Education</h2>
                {profile.education.length > 0 ? (
                  <div className="space-y-4">
                    {profile.education.map((edu, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-gray-800">{edu.degree || 'Degree'}</h3>
                        <p className="text-gray-600">{edu.institution || 'Institution'} • {edu.year || 'Years'}</p>
                        {edu.description && (
                          <p className="text-gray-700 mt-1 whitespace-pre-line text-sm">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No education added yet.</p>
                )}
              </div>

              {/* Certifications Section */}
              {profile.certifications.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Certifications</h2>
                  <div className="space-y-4">
                    {profile.certifications.map((cert, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-gray-800">{cert.name || 'Certification'}</h3>
                        <p className="text-gray-600">{cert.issuer || 'Issuer'} • {cert.date || 'Date'}</p>
                        {cert.credentialId && (
                          <p className="text-gray-500 text-sm">Credential ID: {cert.credentialId}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects Section */}
              {profile.projects.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Projects</h2>
                  <div className="space-y-4">
                    {profile.projects.map((proj, index) => (
                      <div key={index}>
                        <h3 className="font-semibold text-gray-800">{proj.name || 'Project Name'}</h3>
                        <p className="text-gray-700">{proj.description || 'Project description'}</p>
                        {proj.link && (
                          <a href={proj.link} className="text-blue-600 hover-text-blue-800 text-sm" target="_blank" rel="noopener noreferrer">
                            View Project
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Custom Sections */}
              {profile.customSections.length > 0 && (
                <div className="mb-8">
                  {profile.customSections.map((section, index) => (
                    <div key={index} className="mb-6">
                      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{section.title || 'Section Title'}</h2>
                      <ul className="space-y-2">
                        {section.items.map((item, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-indigo-500 mr-2">•</span>
                            <span className="text-gray-700">{item || 'Item content'}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg-grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg-col-span-2">
              {viewMode === 'analysis' && (
                <div className="mb-6">
                  <div className="search-bar">
                    <Search className="text-gray-400 mr-2" size={18} />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search recommendations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="card">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Target className="text-blue-600 mr-2" size={20} />
                      Optimization Recommendations
                    </h3>
                    
                    {filteredRecommendations.length === 0 ? (
                      <div className="text-center py-8">
                        <CheckCircle className="text-green-500 mx-auto mb-3" size={48} />
                        <p className="text-green-600 font-medium">Great job!</p>
                        <p className="text-gray-600 text-sm">No recommendations match your search.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {filteredRecommendations.map((rec, index) => (
                          <motion.div 
                            key={index}
                            id={`recommendation-${index}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`${rec.type === 'error' ? 'recommendation-error' : 
                              rec.type === 'warning' ? 'recommendation-warning' : 'recommendation-info'} 
                              ${activeRecommendation === index ? 'recommendation-active' : ''}`}
                            onClick={() => focusRecommendation(index)}
                          >
                            {rec.type === 'error' ? (
                              <AlertCircle className="text-red-500 mt-0.5" size={16} />
                            ) : rec.type === 'warning' ? (
                              <AlertCircle className="text-yellow-500 mt-0.5" size={16} />
                            ) : (
                              <AlertCircle className="text-blue-500 mt-0.5" size={16} />
                            )}
                            <div>
                              <p className="text-sm font-medium text-gray-800 flex items-center">
                                {getSectionIcon(rec.section)}
                                {rec.section}
                              </p>
                              <p className="text-sm text-gray-600">{rec.text}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {viewMode === 'edit' && (
                <>
                  {/* Tab Navigation */}
                  <div className="tab-container">
                    <div className="tab-navigation">
                      {tabs.map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`tab-button ${activeTab === tab.id ? 'active-tab' : ''}`}
                        >
                          <tab.icon size={20} />
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="tab-content">
                      {/* Profile Info Tab */}
                      {activeTab === 'profile' && (
                        <div className="space-y-6">
                          <div>
                            <div 
                              className="flex items-center justify-between cursor-pointer mb-2"
                              onClick={() => toggleSection('headline')}
                            >
                              <label className="block text-sm font-medium text-gray-700">
                                Professional Headline
                              </label>
                              {expandedSections.headline ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                            
                            <AnimatePresence>
                              {expandedSections.headline && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <input
                                    type="text"
                                    value={profile.headline}
                                    onChange={(e) => setProfile(prev => ({ ...prev, headline: e.target.value }))}
                                    placeholder="e.g., Senior Software Engineer | React Specialist | Building Scalable Web Applications"
                                    className="input-field"
                                  />
                                  <div className="flex justify-between mt-1">
                                    <p className="text-sm text-gray-500">
                                      {profile.headline.length}/120 characters
                                    </p>
                                    <button 
                                      onClick={() => copyToClipboard(profile.headline)}
                                      className="text-sm text-blue-600 hover-text-blue-800 flex items-center transition-colors"
                                    >
                                      {copied ? (
                                        <>
                                          <ClipboardCheck size={14} className="mr-1" />
                                          Copied!
                                        </>
                                      ) : (
                                        <>
                                          <Clipboard size={14} className="mr-1" />
                                          Copy
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <div>
                            <div 
                              className="flex items-center justify-between cursor-pointer mb-2"
                              onClick={() => toggleSection('summary')}
                            >
                              <label className="block text-sm font-medium text-gray-700">
                                Professional Summary
                              </label>
                              {expandedSections.summary ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </div>
                            
                            <AnimatePresence>
                              {expandedSections.summary && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <textarea
                                    value={profile.summary}
                                    onChange={(e) => setProfile(prev => ({ ...prev, summary: e.target.value }))}
                                    placeholder="Write a compelling summary that highlights your expertise, achievements, and career goals..."
                                    rows={6}
                                    className="textarea-field"
                                  />
                                  <div className="flex justify-between mt-1">
                                    <p className="text-sm text-gray-500">
                                      {profile.summary.length} characters
                                    </p>
                                    <button 
                                      onClick={() => copyToClipboard(profile.summary)}
                                      className="text-sm text-blue-600 hover-text-blue-800 flex items-center transition-colors"
                                    >
                                      {copied ? (
                                        <>
                                          <ClipboardCheck size={14} className="mr-1" />
                                          Copied!
                                        </>
                                      ) : (
                                        <>
                                          <Clipboard size={14} className="mr-1" />
                                          Copy
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <div className="grid grid-cols-1 md-grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h3 className="font-medium text-gray-800">Profile Elements</h3>
                              <label className="checkbox-label">
                                <input
                                  type="checkbox"
                                  checked={profile.profilePhoto}
                                  onChange={(e) => setProfile(prev => ({ 
                                    ...prev, 
                                    profilePhoto: e.target.checked 
                                  }))}
                                  className="checkbox-input"
                                />
                                <div>
                                  <span className="text-sm text-gray-700">Professional Profile Photo</span>
                                  <p className="text-xs text-gray-500">21x more profile views</p>
                                </div>
                              </label>
                              <label className="checkbox-label">
                                <input
                                  type="checkbox"
                                  checked={profile.backgroundImage}
                                  onChange={(e) => setProfile(prev => ({ 
                                    ...prev, 
                                    backgroundImage: e.target.checked 
                                  }))}
                                  className="checkbox-input"
                                />
                                <div>
                                  <span className="text-sm text-gray-700">Background Image</span>
                                  <p className="text-xs text-gray-500">Makes your profile stand out</p>
                                </div>
                              </label>
                            </div>

                            <div className="space-y-4">
                              <h3 className="font-medium text-gray-800">Contact Information</h3>
                              <label className="checkbox-label">
                                <input
                                  type="checkbox"
                                  checked={profile.contactInfo.email}
                                  onChange={(e) => setProfile(prev => ({ 
                                    ...prev, 
                                    contactInfo: { ...prev.contactInfo, email: e.target.checked }
                                  }))}
                                  className="checkbox-input"
                                />
                                <div>
                                  <span className="text-sm text-gray-700">Email Address</span>
                                  <p className="text-xs text-gray-500">Makes you reachable</p>
                                </div>
                              </label>
                              <label className="checkbox-label">
                                <input
                                  type="checkbox"
                                  checked={profile.contactInfo.phone}
                                  onChange={(e) => setProfile(prev => ({ 
                                    ...prev, 
                                    contactInfo: { ...prev.contactInfo, phone: e.target.checked }
                                  }))}
                                  className="checkbox-input"
                                />
                                <div>
                                  <span className="text-sm text-gray-700">Phone Number</span>
                                  <p className="text-xs text-gray-500">For recruiters to contact you</p>
                                </div>
                              </label>
                              <label className="checkbox-label">
                                <input
                                  type="checkbox"
                                  checked={profile.contactInfo.website}
                                  onChange={(e) => setProfile(prev => ({ 
                                    ...prev, 
                                    contactInfo: { ...prev.contactInfo, website: e.target.checked }
                                  }))}
                                  className="checkbox-input"
                                />
                                <div>
                                  <span className="text-sm text-gray-700">Website/Portfolio</span>
                                  <p className="text-xs text-gray-500">Showcase your work</p>
                                </div>
                              </label>
                              <label className="checkbox-label">
                                <input
                                  type="checkbox"
                                  checked={profile.contactInfo.linkedin}
                                  onChange={(e) => setProfile(prev => ({ 
                                    ...prev, 
                                    contactInfo: { ...prev.contactInfo, linkedin: e.target.checked }
                                  }))}
                                  className="checkbox-input"
                                />
                                <div>
                                  <span className="text-sm text-gray-700">LinkedIn URL</span>
                                  <p className="text-xs text-gray-500">Your profile link</p>
                                </div>
                              </label>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Experience Tab */}
                      {activeTab === 'experience' && (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-800">Work Experience</h3>
                            <button
                              onClick={addExperience}
                              className="button button-blue"
                            >
                              <Plus size={16} />
                              <span>Add Experience</span>
                            </button>
                          </div>

                          {profile.experience.length === 0 ? (
                            <div className="empty-state">
                              <Briefcase className="mx-auto text-gray-400 mb-3" size={32} />
                              <p className="text-gray-600">Add your work experience to showcase your career</p>
                            </div>
                          ) : (
                            profile.experience.map((exp, index) => (
                              <motion.div 
                                key={index}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="experience-card"
                              >
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-gray-800">Experience {index + 1}</h4>
                                  <button
                                    onClick={() => removeExperience(index)}
                                    className="text-red-600 hover-text-red-800 transition-colors"
                                  >
                                    <Minus size={16} />
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
                                  <input
                                    type="text"
                                    value={exp.title}
                                    onChange={(e) => updateExperience(index, 'title', e.target.value)}
                                    placeholder="Job Title"
                                    className="input-field"
                                  />
                                  <input
                                    type="text"
                                    value={exp.company}
                                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                                    placeholder="Company Name"
                                    className="input-field"
                                  />
                                </div>
                                <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
                                  <input
                                    type="text"
                                    value={exp.period}
                                    onChange={(e) => updateExperience(index, 'period', e.target.value)}
                                    placeholder="Period (e.g., 2020 - Present)"
                                    className="input-field"
                                  />
                                  <input
                                    type="text"
                                    value={exp.location}
                                    onChange={(e) => updateExperience(index, 'location', e.target.value)}
                                    placeholder="Location"
                                    className="input-field"
                                  />
                                </div>
                                <textarea
                                  value={exp.description}
                                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                                  placeholder="Describe your responsibilities and achievements..."
                                  rows={3}
                                  className="textarea-field"
                                />
                                <div className="flex justify-end">
                                  <button
                                    onClick={() => copyToClipboard(exp.description)}
                                    className="text-sm text-blue-600 hover-text-blue-800 flex items-center transition-colors"
                                  >
                                    {copied ? (
                                      <>
                                        <ClipboardCheck size={14} className="mr-1" />
                                        Copied!
                                      </>
                                    ) : (
                                      <>
                                        <Clipboard size={14} className="mr-1" />
                                        Copy Description
                                      </>
                                    )}
                                  </button>
                                </div>
                              </motion.div>
                            ))
                          )}
                        </div>
                      )}

                      {/* Skills Tab */}
                      {activeTab === 'skills' && (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-800">Skills</h3>
                            <button
                              onClick={addSkill}
                              className="button button-blue"
                            >
                              <Plus size={16} />
                              <span>Add Skill</span>
                            </button>
                          </div>

                          {profile.skills.length === 0 ? (
                            <div className="empty-state">
                              <Award className="mx-auto text-gray-400 mb-3" size={32} />
                              <p className="text-gray-600">Add skills to increase your profile visibility</p>
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
                              {profile.skills.map((skill, index) => (
                                <motion.div 
                                  key={index}
                                  layout
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="flex flex-col"
                                >
                                  <div className="flex items-center space-x-2">
                                    <div className="relative flex-1">
                                      <input
                                        type="text"
                                        value={skill.name}
                                        onChange={(e) => handleSkillInput(index, e.target.value)}
                                        placeholder="Enter a skill"
                                        className="input-field w-full"
                                      />
                                      {showSkillSuggestions && skillSuggestions.length > 0 && (
                                        <div className="skill-suggestions">
                                          {skillSuggestions.map((suggestion, idx) => (
                                            <div 
                                              key={idx}
                                              className="skill-suggestion"
                                              onClick={() => selectSkillSuggestion(index, suggestion)}
                                            >
                                              {suggestion}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                    <button
                                      onClick={() => removeSkill(index)}
                                      className="text-red-600 hover-text-red-800 transition-colors"
                                    >
                                      <Minus size={16} />
                                    </button>
                                  </div>
                                  <div className="level-selector">
                                    <button
                                      className={`level-button beginner ${skill.level === 'beginner' ? 'active' : ''}`}
                                      onClick={() => updateSkill(index, 'level', 'beginner')}
                                    >
                                      Beginner
                                    </button>
                                    <button
                                      className={`level-button intermediate ${skill.level === 'intermediate' ? 'active' : ''}`}
                                      onClick={() => updateSkill(index, 'level', 'intermediate')}
                                    >
                                      Intermediate
                                    </button>
                                    <button
                                      className={`level-button advanced ${skill.level === 'advanced' ? 'active' : ''}`}
                                      onClick={() => updateSkill(index, 'level', 'advanced')}
                                    >
                                      Advanced
                                    </button>
                                    <button
                                      className={`level-button expert ${skill.level === 'expert' ? 'active' : ''}`}
                                      onClick={() => updateSkill(index, 'level', 'expert')}
                                    >
                                      Expert
                                    </button>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Education Tab */}
                      {activeTab === 'education' && (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-800">Education</h3>
                            <button
                              onClick={addEducation}
                              className="button button-blue"
                            >
                              <Plus size={16} />
                              <span>Add Education</span>
                            </button>
                          </div>

                          {profile.education.length === 0 ? (
                            <div className="empty-state">
                              <GraduationCap className="mx-auto text-gray-400 mb-3" size={32} />
                              <p className="text-gray-600">Add your education background</p>
                            </div>
                          ) : (
                            profile.education.map((edu, index) => (
                              <motion.div 
                                key={index}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="experience-card"
                              >
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-gray-800">Education {index + 1}</h4>
                                  <button
                                    onClick={() => removeEducation(index)}
                                    className="text-red-600 hover-text-red-800 transition-colors"
                                  >
                                    <Minus size={16} />
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
                                  <input
                                    type="text"
                                    value={edu.degree}
                                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                                    placeholder="Degree"
                                    className="input-field"
                                  />
                                  <input
                                    type="text"
                                    value={edu.institution}
                                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                                    placeholder="Institution"
                                    className="input-field"
                                  />
                                </div>
                                <input
                                  type="text"
                                  value={edu.year}
                                  onChange={(e) => updateEducation(index, 'year', e.target.value)}
                                  placeholder="Years (e.g., 2015 - 2019)"
                                  className="input-field"
                                />
                                <textarea
                                  value={edu.description}
                                  onChange={(e) => updateEducation(index, 'description', e.target.value)}
                                  placeholder="Additional details (honors, activities, etc.)"
                                  rows={2}
                                  className="textarea-field"
                                />
                              </motion.div>
                            ))
                          )}
                        </div>
                      )}

                      {/* Certifications Tab */}
                      {activeTab === 'certifications' && (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-800">Certifications</h3>
                            <button
                              onClick={addCertification}
                              className="button button-blue"
                            >
                              <Plus size={16} />
                              <span>Add Certification</span>
                            </button>
                          </div>

                          {profile.certifications.length === 0 ? (
                            <div className="empty-state">
                              <Shield className="mx-auto text-gray-400 mb-3" size={32} />
                              <p className="text-gray-600">Add your professional certifications</p>
                            </div>
                          ) : (
                            profile.certifications.map((cert, index) => (
                              <motion.div 
                                key={index}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="experience-card"
                              >
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-gray-800">Certification {index + 1}</h4>
                                  <button
                                    onClick={() => removeCertification(index)}
                                    className="text-red-600 hover-text-red-800 transition-colors"
                                  >
                                    <Minus size={16} />
                                  </button>
                                </div>
                                <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
                                  <input
                                    type="text"
                                    value={cert.name}
                                    onChange={(e) => updateCertification(index, 'name', e.target.value)}
                                    placeholder="Certification Name"
                                    className="input-field"
                                  />
                                  <input
                                    type="text"
                                    value={cert.issuer}
                                    onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                                    placeholder="Issuing Organization"
                                    className="input-field"
                                  />
                                </div>
                                <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
                                  <input
                                    type="text"
                                    value={cert.date}
                                    onChange={(e) => updateCertification(index, 'date', e.target.value)}
                                    placeholder="Date Earned"
                                    className="input-field"
                                  />
                                  <input
                                    type="text"
                                    value={cert.credentialId}
                                    onChange={(e) => updateCertification(index, 'credentialId', e.target.value)}
                                    placeholder="Credential ID (if applicable)"
                                    className="input-field"
                                  />
                                </div>
                              </motion.div>
                            ))
                          )}
                        </div>
                      )}

                      {/* Projects Tab */}
                      {activeTab === 'projects' && (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-800">Projects</h3>
                            <button
                              onClick={addProject}
                              className="button button-blue"
                            >
                              <Plus size={16} />
                              <span>Add Project</span>
                            </button>
                          </div>

                          {profile.projects.length === 0 ? (
                            <div className="empty-state">
                              <Code className="mx-auto text-gray-400 mb-3" size={32} />
                              <p className="text-gray-600">Add projects to showcase your work</p>
                            </div>
                          ) : (
                            profile.projects.map((proj, index) => (
                              <motion.div 
                                key={index}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="experience-card"
                              >
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-gray-800">Project {index + 1}</h4>
                                  <button
                                    onClick={() => removeProject(index)}
                                    className="text-red-600 hover-text-red-800 transition-colors"
                                  >
                                    <Minus size={16} />
                                  </button>
                                </div>
                                <input
                                  type="text"
                                  value={proj.name}
                                  onChange={(e) => updateProject(index, 'name', e.target.value)}
                                  placeholder="Project Name"
                                  className="input-field"
                                />
                                <textarea
                                  value={proj.description}
                                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                                  placeholder="Project description and your contributions..."
                                  rows={2}
                                  className="textarea-field"
                                />
                                <input
                                  type="text"
                                  value={proj.link}
                                  onChange={(e) => updateProject(index, 'link', e.target.value)}
                                  placeholder="Project URL (if available)"
                                  className="input-field"
                                />
                              </motion.div>
                            ))
                          )}
                        </div>
                      )}

                      {/* Custom Sections Tab */}
                      {activeTab === 'custom' && (
                        <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-800">Custom Sections</h3>
                            <button
                              onClick={addCustomSection}
                              className="button button-blue"
                            >
                              <Plus size={16} />
                              <span>Add Section</span>
                            </button>
                          </div>

                          {profile.customSections.length === 0 ? (
                            <div className="empty-state">
                              <Plus className="mx-auto text-gray-400 mb-3" size={32} />
                              <p className="text-gray-600">Add custom sections like awards, publications, or volunteer work</p>
                            </div>
                          ) : (
                            profile.customSections.map((section, sectionIndex) => (
                              <motion.div 
                                key={sectionIndex}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="experience-card"
                              >
                                <div className="flex items-center justify-between">
                                  <input
                                    type="text"
                                    value={section.title}
                                    onChange={(e) => updateCustomSectionTitle(sectionIndex, e.target.value)}
                                    placeholder="Section Title (e.g., Awards)"
                                    className="input-field px-4 py-2 border-b border-gray-300 font-medium"
                                  />
                                  <button
                                    onClick={() => removeCustomSection(sectionIndex)}
                                    className="text-red-600 hover-text-red-800 transition-colors"
                                  >
                                    <Minus size={16} />
                                  </button>
                                </div>
                                
                                <div className="space-y-3">
                                  {section.items.map((item, itemIndex) => (
                                    <div key={itemIndex} className="custom-section-item">
                                      <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => updateCustomSectionItem(sectionIndex, itemIndex, e.target.value)}
                                        placeholder="Enter item"
                                        className="input-field flex-1"
                                      />
                                      <button
                                        onClick={() => removeCustomSectionItem(sectionIndex, itemIndex)}
                                        className="text-red-600 hover-text-red-800 transition-colors"
                                      >
                                        <Minus size={16} />
                                      </button>
                                    </div>
                                  ))}
                                  
                                  <button
                                    onClick={() => addCustomSectionItem(sectionIndex)}
                                    className="flex items-center space-x-1 text-sm text-blue-600 hover-text-blue-800 transition-colors"
                                  >
                                    <Plus size={14} />
                                    <span>Add Item</span>
                                  </button>
                                </div>
                              </motion.div>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Recommendations Sidebar */}
            <div className="lg-col-span-1">
              <div className="card sticky">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Target className="text-blue-600 mr-2" size={20} />
                  Optimization Tips
                </h3>
                
                {recommendations.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="text-green-500 mx-auto mb-3" size={48} />
                    <p className="text-green-600 font-medium">Great job!</p>
                    <p className="text-gray-600 text-sm">Your profile is well-optimized.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recommendations.slice(0, 5).map((rec, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`${rec.type === 'error' ? 'recommendation-error' : 
                          rec.type === 'warning' ? 'recommendation-warning' : 'recommendation-info'}`}
                      >
                        {rec.type === 'error' ? (
                          <AlertCircle className="text-red-500 mt-0.5" size={16} />
                        ) : rec.type === 'warning' ? (
                          <AlertCircle className="text-yellow-500 mt-0.5" size={16} />
                        ) : (
                          <AlertCircle className="text-blue-500 mt-0.5" size={16} />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-800">{rec.section}</p>
                          <p className="text-sm text-gray-600">{rec.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium text-gray-800 mb-3">Quick Tips</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start space-x-2">
                      <Star className="text-yellow-500 mt-0.5" size={12} />
                      <span>Use keywords relevant to your industry</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Star className="text-yellow-500 mt-0.5" size={12} />
                      <span>Post regular updates to stay visible</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Star className="text-yellow-500 mt-0.5" size={12} />
                      <span>Engage with others' content</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Star className="text-yellow-500 mt-0.5" size={12} />
                      <span>Ask for recommendations</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Star className="text-yellow-500 mt-0.5" size={12} />
                      <span>Join relevant groups in your industry</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium text-gray-800 mb-3">Profile Completion</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Headline</span>
                      <span className="text-sm font-medium">
                        {profile.headline ? '✓' : '✗'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Summary</span>
                      <span className="text-sm font-medium">
                        {profile.summary ? '✓' : '✗'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Experience</span>
                      <span className="text-sm font-medium">
                        {profile.experience.length >= 1 ? '✓' : '✗'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Skills</span>
                      <span className="text-sm font-medium">
                        {profile.skills.length >= 5 ? '✓' : '✗'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Profile Photo</span>
                      <span className="text-sm font-medium">
                        {profile.profilePhoto ? '✓' : '✗'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Background Image</span>
                      <span className="text-sm font-medium">
                        {profile.backgroundImage ? '✓' : '✗'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Contact Info</span>
                      <span className="text-sm font-medium">
                        {Object.values(profile.contactInfo).filter(Boolean).length >= 2 ? '✓' : '✗'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInOptimizer;