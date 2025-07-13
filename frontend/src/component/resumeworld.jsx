import React, { useState, useEffect } from 'react';
import { createGlobalStyle, styled } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f5f7fa;
    color: #333;
    line-height: 1.6;
  }

  * {
    box-sizing: border-box;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const TopNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);

  h1 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;

  button {
    background: none;
    border: none;
    color: #ecf0f1;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.2s;
    font-size: 0.95rem;

    &:hover {
      background: #34495e;
      transform: translateY(-2px);
    }

    &.active {
      background: #3498db;
      font-weight: bold;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
  }
`;

const ActionButton = styled.button`
  background: ${props => props.secondary ? '#2c3e50' : '#3498db'};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;

  &:hover {
    background: ${props => props.secondary ? '#34495e' : '#2980b9'};
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #95a5a6;
    cursor: not-allowed;
    transform: none;
  }
`;

const TemplateGalleryContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #2c3e50;
    font-size: 2rem;
    font-weight: 600;
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  button {
    padding: 0.5rem 1.5rem;
    border: 1px solid #ddd;
    background: white;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    font-weight: 500;

    &:hover {
      background: #e0e0e0;
      transform: translateY(-2px);
    }

    &.active {
      background: #3498db;
      color: white;
      border-color: #3498db;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
  }
`;

const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
`;

const TemplateCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    border-color: #3498db;
  }

  &.selected {
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.3);
  }

  img {
    width: 100%;
    height: auto;
    display: block;
    aspect-ratio: 3/4;
    object-fit: cover;
  }
`;

const TemplateInfo = styled.div`
  padding: 1rem;

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    color: #2c3e50;
  }
`;

const TemplateMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #7f8c8d;

  .category {
    background: #e0f7fa;
    color: #00838f;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .rating {
    color: #f39c12;
    font-weight: 600;
  }

  .premium {
    background: #ffeb3b;
    color: #f57c00;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
  }
`;

const ResumeEditorContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr 350px;
  height: calc(100vh - 60px);

  @media (max-width: 1024px) {
    grid-template-columns: 200px 1fr;
    
    .resume-preview-container {
      display: none;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    
    .editor-sidebar {
      display: none;
    }
  }
`;

const EditorSidebar = styled.div`
  background: #2c3e50;
  color: white;
  padding: 1rem;
  overflow-y: auto;

  h3 {
    margin-top: 0;
    font-size: 1.1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #34495e;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  button {
    padding: 0.75rem;
    text-align: left;
    background: transparent;
    border: none;
    color: #ecf0f1;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.95rem;

    &:hover {
      background: #34495e;
      transform: translateX(3px);
    }

    &.active {
      background: #3498db;
      font-weight: bold;
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const EditorMain = styled.div`
  padding: 1.5rem;
  background: white;
  overflow-y: auto;
`;

const ResumePreviewContainer = styled.div`
  border-left: 1px solid #ddd;
  padding: 1rem;
  background: #f9f9f9;
  overflow-y: auto;
`;

const SectionEditor = styled.div`
  margin-bottom: 2rem;

  h3 {
    margin-top: 0;
    color: #2c3e50;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
    font-size: 1.3rem;
    font-weight: 600;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #2c3e50;
    font-size: 0.95rem;
  }

  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="url"],
  input[type="month"],
  select,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    font-size: 1rem;
    transition: border 0.2s;

    &:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
    line-height: 1.5;
  }
`;

const FormRow = styled.div`
  display: flex;
  gap: 1rem;

  ${FormGroup} {
    flex: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: normal;
  }

  input {
    margin: 0;
    width: 16px;
    height: 16px;
  }
`;

const AddButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1.5rem;
  font-weight: 600;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;

  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ExperienceItem = styled.div`
  background: #f9f9f9;
  padding: 1.25rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  border: 1px solid #eee;
  transition: all 0.2s;
  position: relative;

  &:hover {
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    border-color: #ddd;
  }
`;

const RemoveButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #c0392b;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ResumePreview = styled.div`
  height: 100%;
  position: relative;

  h3 {
    margin-top: 0;
    color: #2c3e50;
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const PreviewContent = styled.div`
  background: white;
  padding: 2rem;
  min-height: 100%;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  font-family: ${props => {
    if (props.selectedTemplate?.name.toLowerCase() === 'professional') return "'Times New Roman', serif";
    if (props.selectedTemplate?.name.toLowerCase() === 'modern') return "'Helvetica Neue', Arial, sans-serif";
    if (props.selectedTemplate?.name.toLowerCase() === 'minimalist') return "'Arial', sans-serif";
    if (props.selectedTemplate?.name.toLowerCase() === 'executive') return "'Georgia', serif";
    return 'inherit';
  }};
  color: ${props => {
    if (props.selectedTemplate?.name.toLowerCase() === 'minimalist') return '#333';
    if (props.selectedTemplate?.name.toLowerCase() === 'executive') return '#222';
    return 'inherit';
  }};

  .header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: ${props => props.selectedTemplate?.name.toLowerCase() === 'minimalist' ? 'none' : '1px solid #eee'};

    h1 {
      margin: 0;
      color: #2c3e50;
      font-size: ${props => props.selectedTemplate?.name.toLowerCase() === 'minimalist' ? '1.8rem' : '2rem'};
      font-weight: ${props => props.selectedTemplate?.name.toLowerCase() === 'minimalist' ? '600' : '700'};
      letter-spacing: ${props => props.selectedTemplate?.name.toLowerCase() === 'executive' ? '1px' : 'normal'};
    }
  }

  .contact-info {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 0.5rem;
    color: #7f8c8d;
    font-size: 0.9rem;
  }

  .section {
    margin-bottom: 1.5rem;

    h2 {
      border-bottom: 1px solid #eee;
      padding-bottom: 0.25rem;
      color: #2c3e50;
      font-size: 1.2rem;
      margin-bottom: 1rem;
      font-weight: 600;
    }
  }

  .experience,
  .education {
    margin-bottom: 1.5rem;
  }

  .experience-header,
  .education-header {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .experience h3,
  .education h3 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
  }

  .experience-meta,
  .education-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    font-size: 0.9rem;
    color: #7f8c8d;
  }

  .experience-description,
  .education-description {
    font-size: 0.9rem;
    line-height: 1.6;
    margin-top: 0.5rem;
  }

  .skills-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
  }

  .skill {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #f5f7fa;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
  }

  .skill-level {
    display: flex;
    gap: 0.25rem;
  }

  .skill-level .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #eee;
  }

  .skill-level .dot.active {
    background: #3498db;
  }
`;

const ATSAnalyzerContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);

  h2 {
    margin-top: 0;
    color: #2c3e50;
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1.5rem;
  }
`;

const AnalyzerInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;

  label {
    font-weight: 500;
    color: #2c3e50;
    font-size: 1rem;
  }

  textarea {
    min-height: 200px;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    font-family: inherit;
    font-size: 0.95rem;
    line-height: 1.5;

    &:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
    }
  }

  button {
    align-self: flex-start;
    padding: 0.75rem 1.5rem;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 600;
    font-size: 1rem;

    &:hover {
      background: #2980b9;
      transform: translateY(-2px);
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

const AnalysisResults = styled.div`
  margin-top: 2rem;
`;

const MatchScore = styled.div`
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  border-radius: 8px;
  background: #f8f9fa;
  color: ${props => {
    if (props.matchPercentage > 70) return '#27ae60';
    if (props.matchPercentage > 50) return '#f39c12';
    return '#e74c3c';
  }};
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);

  h3 {
    margin-top: 0;
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
  }

  .score-text {
    display: flex;
    justify-content: space-between;
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
  }
`;

const ScoreBar = styled.div`
  height: 12px;
  background: #ecf0f1;
  border-radius: 6px;
  margin-top: 0.5rem;
  overflow: hidden;
  position: relative;

  div {
    height: 100%;
    background: currentColor;
    width: ${props => props.matchPercentage}%;
    transition: width 0.5s ease;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      rgba(255,255,255,0.3) 0%, 
      rgba(255,255,255,0.1) 50%, 
      rgba(255,255,255,0.3) 100%);
  }
`;

const KeywordsAnalysis = styled.div`
  margin-bottom: 2rem;

  h4 {
    margin-bottom: 1rem;
    color: #2c3e50;
    font-size: 1.2rem;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.5rem;
  }

  li {
    padding: 0.75rem;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  }

  li.found {
    background: rgba(46, 204, 113, 0.1);
    border-left: 3px solid #2ecc71;
  }

  li.missing {
    background: rgba(231, 76, 60, 0.1);
    border-left: 3px solid #e74c3c;
  }

  .keyword-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.8rem;
    color: #7f8c8d;
  }

  .found-icon {
    color: #2ecc71;
  }

  .missing-icon {
    color: #e74c3c;
  }
`;

const Suggestions = styled.div`
  h4 {
    margin-bottom: 1rem;
    color: #2c3e50;
    font-size: 1.2rem;
    font-weight: 600;
  }

  ul {
    padding-left: 1.25rem;
    color: #7f8c8d;
    line-height: 1.6;
  }

  li {
    margin-bottom: 0.75rem;
  }
`;

const DownloadButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #27ae60;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    background: #219653;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
  font-size: 1rem;

  svg {
    width: 50px;
    height: 50px;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  p {
    margin: 0.5rem 0;
  }
`;

const ResumeBuilderApp = () => {
  const [currentStep, setCurrentStep] = useState('templates');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      portfolio: ''
    },
    workExperience: [],
    education: [],
    skills: []
  });
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [activeSection, setActiveSection] = useState('personal');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Load saved data from localStorage on initial render
  useEffect(() => {
    const savedResume = localStorage.getItem('resumeData');
    const savedTemplate = localStorage.getItem('selectedTemplate');
    
    if (savedResume) {
      setResumeData(JSON.parse(savedResume));
    }
    
    if (savedTemplate) {
      setSelectedTemplate(JSON.parse(savedTemplate));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    if (selectedTemplate) {
      localStorage.setItem('selectedTemplate', JSON.stringify(selectedTemplate));
    }
  }, [selectedTemplate]);

  // Sample templates data
  const templates = [
    {
      id: 1,
      name: 'Professional',
      thumbnail: 'https://via.placeholder.com/300x400/2c3e50/ffffff?text=Professional',
      category: 'ATS-Friendly',
      rating: 4.8,
      isPremium: false,
      description: 'Classic design optimized for applicant tracking systems'
    },
    {
      id: 2,
      name: 'Modern',
      thumbnail: 'https://via.placeholder.com/300x400/3498db/ffffff?text=Modern',
      category: 'Creative',
      rating: 4.5,
      isPremium: true,
      description: 'Contemporary design with clean lines and modern typography'
    },
    {
      id: 3,
      name: 'Minimalist',
      thumbnail: 'https://via.placeholder.com/300x400/ecf0f1/2c3e50?text=Minimalist',
      category: 'ATS-Friendly',
      rating: 4.7,
      isPremium: false,
      description: 'Simple and clean layout that focuses on your content'
    },
    {
      id: 4,
      name: 'Executive',
      thumbnail: 'https://via.placeholder.com/300x400/34495e/ffffff?text=Executive',
      category: 'Professional',
      rating: 4.9,
      isPremium: true,
      description: 'Elegant design for senior-level professionals'
    },
    {
      id: 5,
      name: 'Creative',
      thumbnail: 'https://via.placeholder.com/300x400/e74c3c/ffffff?text=Creative',
      category: 'Creative',
      rating: 4.3,
      isPremium: false,
      description: 'Unique layout for creative professionals'
    },
    {
      id: 6,
      name: 'Technical',
      thumbnail: 'https://via.placeholder.com/300x400/95a5a6/ffffff?text=Technical',
      category: 'ATS-Friendly',
      rating: 4.6,
      isPremium: false,
      description: 'Optimized for technical and engineering roles'
    }
  ];

  const categories = ['All', 'ATS-Friendly', 'Creative', 'Professional'];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCurrentStep('editor');
  };

  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const addWorkExperience = () => {
    setResumeData(prev => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          id: uuidv4(),
          jobTitle: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ]
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: uuidv4(),
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ]
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: uuidv4(),
          name: '',
          level: 'intermediate'
        }
      ]
    }));
  };

  const removeItem = (section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const analyzeResume = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description to analyze');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call with timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate ATS analysis
    const keywords = [
      'React', 'JavaScript', 'Team Leadership', 'Agile', 
      'CSS', 'HTML', 'Project Management', 'Communication',
      'Problem Solving', 'Collaboration', 'Git', 'REST APIs',
      'Responsive Design', 'UX/UI', 'Testing', 'Debugging',
      'Performance Optimization', 'Database', 'Security'
    ];
    
    const foundKeywords = keywords.filter(kw => 
      JSON.stringify(resumeData).toLowerCase().includes(kw.toLowerCase()) ||
      jobDescription.toLowerCase().includes(kw.toLowerCase())
    );
    
    const matchPercentage = Math.round((foundKeywords.length / keywords.length) * 100);
    
    setAnalysisResult({
      matchPercentage,
      keywords: keywords.map(kw => ({
        keyword: kw,
        found: foundKeywords.includes(kw),
        inResume: JSON.stringify(resumeData).toLowerCase().includes(kw.toLowerCase()),
        inJD: jobDescription.toLowerCase().includes(kw.toLowerCase())
      })),
      suggestions: [
        matchPercentage < 70 ? 'Add more relevant keywords from the job description' : '',
        'Use more action verbs (e.g., "developed", "managed", "optimized")',
        'Ensure your work experience shows quantifiable achievements',
        matchPercentage < 50 ? 'Consider restructuring your resume to better match the job requirements' : '',
        'Include specific technologies and tools mentioned in the job description',
        'Highlight transferable skills that apply to the position',
        'Tailor your professional summary to the job requirements'
      ].filter(s => s)
    });
    
    setIsAnalyzing(false);
  };

  const downloadResume = () => {
    // In a real app, this would generate a PDF
    alert('Resume downloaded! In a real implementation, this would generate a PDF.');
  };

  const resetResume = () => {
    if (window.confirm('Are you sure you want to reset your resume? This cannot be undone.')) {
      setResumeData({
        personalInfo: {
          name: '',
          email: '',
          phone: '',
          address: '',
          linkedin: '',
          portfolio: ''
        },
        workExperience: [],
        education: [],
        skills: []
      });
    }
  };

  const TemplateGallery = () => (
    <TemplateGalleryContainer>
      <h2>Choose a Resume Template</h2>
      <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '2rem' }}>
        Select a template to get started. All templates are fully customizable.
      </p>
      
      <CategoryFilter>
        {categories.map(category => (
          <button
            key={category}
            className={activeCategory === category ? 'active' : ''}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </CategoryFilter>
      
      <TemplatesGrid>
        {templates
          .filter(t => activeCategory === 'All' || t.category === activeCategory)
          .map(template => (
            <TemplateCard 
              key={template.id}
              onClick={() => handleTemplateSelect(template)}
              className={selectedTemplate?.id === template.id ? 'selected' : ''}
            >
              <img src={template.thumbnail} alt={template.name} />
              <TemplateInfo>
                <h3>{template.name}</h3>
                <p style={{ fontSize: '0.9rem', color: '#7f8c8d', margin: '0.5rem 0' }}>
                  {template.description}
                </p>
                <TemplateMeta>
                  <span className="category">{template.category}</span>
                  <span className="rating">★ {template.rating}</span>
                  {template.isPremium && <span className="premium">Premium</span>}
                </TemplateMeta>
              </TemplateInfo>
            </TemplateCard>
          ))}
      </TemplatesGrid>
    </TemplateGalleryContainer>
  );

  const PersonalInfoEditor = () => (
    <SectionEditor>
      <h3>Personal Information</h3>
      <FormGroup>
        <label>Full Name</label>
        <input
          type="text"
          value={resumeData.personalInfo.name}
          onChange={(e) => updateResumeData('personalInfo', {
            ...resumeData.personalInfo,
            name: e.target.value
          })}
          placeholder="John Doe"
        />
      </FormGroup>
      <FormGroup>
        <label>Email</label>
        <input
          type="email"
          value={resumeData.personalInfo.email}
          onChange={(e) => updateResumeData('personalInfo', {
            ...resumeData.personalInfo,
            email: e.target.value
          })}
          placeholder="john@example.com"
        />
      </FormGroup>
      <FormGroup>
        <label>Phone</label>
        <input
          type="tel"
          value={resumeData.personalInfo.phone}
          onChange={(e) => updateResumeData('personalInfo', {
            ...resumeData.personalInfo,
            phone: e.target.value
          })}
          placeholder="(123) 456-7890"
        />
      </FormGroup>
      <FormGroup>
        <label>Address</label>
        <input
          type="text"
          value={resumeData.personalInfo.address}
          onChange={(e) => updateResumeData('personalInfo', {
            ...resumeData.personalInfo,
            address: e.target.value
          })}
          placeholder="City, Country"
        />
      </FormGroup>
      <FormGroup>
        <label>LinkedIn</label>
        <input
          type="url"
          value={resumeData.personalInfo.linkedin}
          onChange={(e) => updateResumeData('personalInfo', {
            ...resumeData.personalInfo,
            linkedin: e.target.value
          })}
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </FormGroup>
      <FormGroup>
        <label>Portfolio</label>
        <input
          type="url"
          value={resumeData.personalInfo.portfolio}
          onChange={(e) => updateResumeData('personalInfo', {
            ...resumeData.personalInfo,
            portfolio: e.target.value
          })}
          placeholder="https://yourportfolio.com"
        />
      </FormGroup>
    </SectionEditor>
  );

  const WorkExperienceEditor = () => (
    <SectionEditor>
      <h3>Work Experience</h3>
      <AddButton onClick={addWorkExperience}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
        </svg>
        Add Work Experience
      </AddButton>
      
      {resumeData.workExperience.length === 0 ? (
        <EmptyState>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 5V2C7 1.44772 7.44772 1 8 1H16C16.5523 1 17 1.44772 17 2V5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V6C2 5.44772 2.44772 5 3 5H7ZM9 13H15V15H9V13Z" />
          </svg>
          <p>No work experience added yet</p>
          <p>Click the button above to add your first work experience</p>
        </EmptyState>
      ) : (
        resumeData.workExperience.map((exp, index) => (
          <ExperienceItem key={exp.id}>
            <FormGroup>
              <label>Job Title</label>
              <input
                type="text"
                value={exp.jobTitle}
                onChange={(e) => {
                  const updated = [...resumeData.workExperience];
                  updated[index].jobTitle = e.target.value;
                  updateResumeData('workExperience', updated);
                }}
                placeholder="Software Engineer"
              />
            </FormGroup>
            <FormRow>
              <FormGroup>
                <label>Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => {
                    const updated = [...resumeData.workExperience];
                    updated[index].company = e.target.value;
                    updateResumeData('workExperience', updated);
                  }}
                  placeholder="Tech Corp Inc."
                />
              </FormGroup>
              <FormGroup>
                <label>Location</label>
                <input
                  type="text"
                  value={exp.location}
                  onChange={(e) => {
                    const updated = [...resumeData.workExperience];
                    updated[index].location = e.target.value;
                    updateResumeData('workExperience', updated);
                  }}
                  placeholder="San Francisco, CA"
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <label>Start Date</label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => {
                    const updated = [...resumeData.workExperience];
                    updated[index].startDate = e.target.value;
                    updateResumeData('workExperience', updated);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <label>End Date</label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => {
                    const updated = [...resumeData.workExperience];
                    updated[index].endDate = e.target.value;
                    updateResumeData('workExperience', updated);
                  }}
                  disabled={exp.current}
                />
              </FormGroup>
              <Checkbox>
                <label>
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => {
                      const updated = [...resumeData.workExperience];
                      updated[index].current = e.target.checked;
                      updateResumeData('workExperience', updated);
                    }}
                  />
                  Currently work here
                </label>
              </Checkbox>
            </FormRow>
            <FormGroup>
              <label>Description</label>
              <textarea
                value={exp.description}
                onChange={(e) => {
                  const updated = [...resumeData.workExperience];
                  updated[index].description = e.target.value;
                  updateResumeData('workExperience', updated);
                }}
                placeholder="Describe your responsibilities and achievements. Use bullet points for better readability."
                rows={4}
              />
            </FormGroup>
            <RemoveButton
              onClick={() => removeItem('workExperience', exp.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 4V6H15V4H9Z" />
              </svg>
              Remove
            </RemoveButton>
          </ExperienceItem>
        ))
      )}
    </SectionEditor>
  );

  const EducationEditor = () => (
    <SectionEditor>
      <h3>Education</h3>
      <AddButton onClick={addEducation}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
        </svg>
        Add Education
      </AddButton>
      
      {resumeData.education.length === 0 ? (
        <EmptyState>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
          </svg>
          <p>No education added yet</p>
          <p>Click the button above to add your education</p>
        </EmptyState>
      ) : (
        resumeData.education.map((edu, index) => (
          <ExperienceItem key={edu.id}>
            <FormGroup>
              <label>Institution</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => {
                  const updated = [...resumeData.education];
                  updated[index].institution = e.target.value;
                  updateResumeData('education', updated);
                }}
                placeholder="University of Technology"
              />
            </FormGroup>
            <FormRow>
              <FormGroup>
                <label>Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => {
                    const updated = [...resumeData.education];
                    updated[index].degree = e.target.value;
                    updateResumeData('education', updated);
                  }}
                  placeholder="Bachelor of Science"
                />
              </FormGroup>
              <FormGroup>
                <label>Field of Study</label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) => {
                    const updated = [...resumeData.education];
                    updated[index].field = e.target.value;
                    updateResumeData('education', updated);
                  }}
                  placeholder="Computer Science"
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <label>Start Date</label>
                <input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => {
                    const updated = [...resumeData.education];
                    updated[index].startDate = e.target.value;
                    updateResumeData('education', updated);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <label>End Date</label>
                <input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => {
                    const updated = [...resumeData.education];
                    updated[index].endDate = e.target.value;
                    updateResumeData('education', updated);
                  }}
                  disabled={edu.current}
                />
              </FormGroup>
              <Checkbox>
                <label>
                  <input
                    type="checkbox"
                    checked={edu.current}
                    onChange={(e) => {
                      const updated = [...resumeData.education];
                      updated[index].current = e.target.checked;
                      updateResumeData('education', updated);
                    }}
                  />
                  Currently studying
                </label>
              </Checkbox>
            </FormRow>
            <FormGroup>
              <label>Description</label>
              <textarea
                value={edu.description}
                onChange={(e) => {
                  const updated = [...resumeData.education];
                  updated[index].description = e.target.value;
                  updateResumeData('education', updated);
                }}
                placeholder="Any honors, awards, or relevant coursework"
                rows={3}
              />
            </FormGroup>
            <RemoveButton
              onClick={() => removeItem('education', edu.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 4V6H15V4H9Z" />
              </svg>
              Remove
            </RemoveButton>
          </ExperienceItem>
        ))
      )}
    </SectionEditor>
  );

  const SkillsEditor = () => (
    <SectionEditor>
      <h3>Skills</h3>
      <AddButton onClick={addSkill}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
        </svg>
        Add Skill
      </AddButton>
      
      {resumeData.skills.length === 0 ? (
        <EmptyState>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 13C17 15.76 14.76 18 12 18C9.24 18 7 15.76 7 13C7 10.24 9.24 8 12 8C12.65 8 13.26 8.12 13.83 8.32L15.89 6.26C14.8 5.44 13.45 5 12 5C8.13 5 5 8.13 5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12H17V13Z" />
          </svg>
          <p>No skills added yet</p>
          <p>Click the button above to add your skills</p>
        </EmptyState>
      ) : (
        resumeData.skills.map((skill, index) => (
          <ExperienceItem key={skill.id}>
            <FormRow>
              <FormGroup>
                <label>Skill Name</label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => {
                    const updated = [...resumeData.skills];
                    updated[index].name = e.target.value;
                    updateResumeData('skills', updated);
                  }}
                  placeholder="JavaScript"
                />
              </FormGroup>
              <FormGroup>
                <label>Proficiency</label>
                <select
                  value={skill.level}
                  onChange={(e) => {
                    const updated = [...resumeData.skills];
                    updated[index].level = e.target.value;
                    updateResumeData('skills', updated);
                  }}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </FormGroup>
            </FormRow>
            <RemoveButton
              onClick={() => removeItem('skills', skill.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM9 4V6H15V4H9Z" />
              </svg>
              Remove
            </RemoveButton>
          </ExperienceItem>
        ))
      )}
    </SectionEditor>
  );

  const ResumePreviewComponent = () => (
    <ResumePreview>
      <h3>Preview</h3>
      <PreviewContent selectedTemplate={selectedTemplate}>
        <div className="header">
          <h1>{resumeData.personalInfo.name || 'Your Name'}</h1>
          <div className="contact-info">
            {resumeData.personalInfo.email && <div>{resumeData.personalInfo.email}</div>}
            {resumeData.personalInfo.phone && <div>{resumeData.personalInfo.phone}</div>}
            {resumeData.personalInfo.address && <div>{resumeData.personalInfo.address}</div>}
            {resumeData.personalInfo.linkedin && <div>{resumeData.personalInfo.linkedin}</div>}
            {resumeData.personalInfo.portfolio && <div>{resumeData.personalInfo.portfolio}</div>}
          </div>
        </div>
        
        {resumeData.workExperience.length > 0 && (
          <div className="section">
            <h2>Work Experience</h2>
            {resumeData.workExperience.map((exp, i) => (
              <div key={i} className="experience">
                <div className="experience-header">
                  <h3>{exp.jobTitle || 'Job Title'}</h3>
                  <div className="experience-meta">
                    {exp.company && <span className="company">{exp.company}</span>}
                    {(exp.startDate || exp.endDate) && (
                      <span className="dates">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    )}
                    {exp.location && <span className="location">{exp.location}</span>}
                  </div>
                </div>
                {exp.description && (
                  <div className="experience-description">
                    {exp.description.split('\n').map((paragraph, p) => (
                      <p key={p}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {resumeData.education.length > 0 && (
          <div className="section">
            <h2>Education</h2>
            {resumeData.education.map((edu, i) => (
              <div key={i} className="education">
                <div className="education-header">
                  <h3>
                    {edu.degree || 'Degree'} 
                    {edu.field && ` in ${edu.field}`}
                  </h3>
                  <div className="education-meta">
                    {edu.institution && <span className="institution">{edu.institution}</span>}
                    {(edu.startDate || edu.endDate) && (
                      <span className="dates">
                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                      </span>
                    )}
                  </div>
                </div>
                {edu.description && (
                  <div className="education-description">
                    {edu.description.split('\n').map((paragraph, p) => (
                      <p key={p}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {resumeData.skills.length > 0 && (
          <div className="section">
            <h2>Skills</h2>
            <div className="skills-list">
              {resumeData.skills.map((skill, i) => (
                <div key={i} className="skill">
                  <span className="skill-name">{skill.name || 'Skill'}</span>
                  <div className={`skill-level ${skill.level}`}>
                    {['beginner', 'intermediate', 'advanced', 'expert'].map((level) => (
                      <div 
                        key={level} 
                        className={`dot ${skill.level === level ? 'active' : ''}`}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </PreviewContent>
    </ResumePreview>
  );

  const ATSAnalyzerComponent = () => (
    <ATSAnalyzerContainer>
      <h2>ATS Resume Analysis</h2>
      <p style={{ textAlign: 'center', color: '#7f8c8d', marginBottom: '1.5rem' }}>
        Paste a job description to see how well your resume matches the requirements
      </p>
      
      <AnalyzerInput>
        <label>Paste Job Description:</label>
        <textarea 
          value={jobDescription} 
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here to analyze how well your resume matches..."
        />
        <button onClick={analyzeResume} disabled={isAnalyzing}>
          {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </AnalyzerInput>
      
      {analysisResult ? (
        <AnalysisResults>
          <MatchScore matchPercentage={analysisResult.matchPercentage}>
            <h3>ATS Match Score</h3>
            <div className="score-text">
              <span>Your resume matches {analysisResult.matchPercentage}% of keywords</span>
              <span>
                {analysisResult.matchPercentage > 70 ? 'Excellent!' : 
                 analysisResult.matchPercentage > 50 ? 'Good' : 'Needs Improvement'}
              </span>
            </div>
            <ScoreBar matchPercentage={analysisResult.matchPercentage}>
              <div></div>
            </ScoreBar>
          </MatchScore>
          
          <KeywordsAnalysis>
            <h4>Keywords Analysis:</h4>
            <ul>
              {analysisResult.keywords.map((kw, i) => (
                <li key={i} className={kw.found ? 'found' : 'missing'}>
                  {kw.keyword}
                  <span className="keyword-status">
                    {kw.found ? (
                      <span className="found-icon">✓ Found</span>
                    ) : (
                      <span className="missing-icon">✗ Missing</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </KeywordsAnalysis>
          
          <Suggestions>
            <h4>Improvement Suggestions:</h4>
            <ul>
              {analysisResult.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Suggestions>
        </AnalysisResults>
      ) : (
        <EmptyState>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
          </svg>
          <p>No analysis results yet</p>
          <p>Paste a job description and click "Analyze Resume" to get started</p>
        </EmptyState>
      )}
    </ATSAnalyzerContainer>
  );

  const TopNavComponent = () => (
    <TopNav>
      <h1>Resume Builder</h1>
      <NavLinks>
        <button 
          className={currentStep === 'templates' ? 'active' : ''}
          onClick={() => setCurrentStep('templates')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" />
          </svg>
          Templates
        </button>
        {selectedTemplate && (
          <button 
            className={currentStep === 'editor' ? 'active' : ''}
            onClick={() => setCurrentStep('editor')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M20.71 7.04C21.1 6.65 21.1 6 20.71 5.63L18.37 3.29C18 2.9 17.35 2.9 16.96 3.29L15.12 5.12L18.87 8.87L20.71 7.04ZM3 17.25V21H6.75L17.81 9.93L14.06 6.18L3 17.25Z" />
            </svg>
            Editor
          </button>
        )}
        {resumeData.personalInfo.name && (
          <button 
            className={currentStep === 'analyzer' ? 'active' : ''}
            onClick={() => setCurrentStep('analyzer')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M21 8C19.5 8 18.7 9.4 19.1 10.5L15.5 14.1C15.2 14 14.8 14 14.5 14.1L11.9 11.5C12.3 10.4 11.5 9 10 9C8.6 9 7.7 10.4 8.1 11.5L3.5 16C2.4 15.7 1 16.5 1 18C1 19.1 1.9 20 3 20C4.4 20 5.3 18.6 4.9 17.5L9.4 12.9C9.7 13 10.1 13 10.4 12.9L13 15.5C12.7 16.5 13.5 18 15 18C16.5 18 17.3 16.6 16.9 15.5L20.5 11.9C21.6 12.2 23 11.4 23 10C23 8.9 22.1 8 21 8Z" />
            </svg>
            ATS Analyzer
          </button>
        )}
      </NavLinks>
    </TopNav>
  );

  const EditorSidebarComponent = () => (
    <EditorSidebar>
      <h3>Resume Sections</h3>
      <nav>
        <button 
          className={activeSection === 'personal' ? 'active' : ''}
          onClick={() => setActiveSection('personal')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
          </svg>
          Personal Info
        </button>
        <button 
          className={activeSection === 'work' ? 'active' : ''}
          onClick={() => setActiveSection('work')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM14 6H10V4H14V6Z" />
          </svg>
          Work Experience
        </button>
        <button 
          className={activeSection === 'education' ? 'active' : ''}
          onClick={() => setActiveSection('education')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
          </svg>
          Education
        </button>
        <button 
          className={activeSection === 'skills' ? 'active' : ''}
          onClick={() => setActiveSection('skills')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M17 13C17 15.76 14.76 18 12 18C9.24 18 7 15.76 7 13C7 10.24 9.24 8 12 8C12.65 8 13.26 8.12 13.83 8.32L15.89 6.26C14.8 5.44 13.45 5 12 5C8.13 5 5 8.13 5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12H17V13Z" />
          </svg>
          Skills
        </button>
      </nav>

      <div style={{ marginTop: '2rem' }}>
        <ActionButton 
          secondary 
          onClick={resetResume}
          style={{ width: '100%', justifyContent: 'center' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21H23L12 2Z" />
          </svg>
          Reset Resume
        </ActionButton>
      </div>
    </EditorSidebar>
  );

  const ResumeEditorComponent = () => (
    <ResumeEditorContainer>
      <EditorSidebar className="editor-sidebar">
        <EditorSidebarComponent />
      </EditorSidebar>

      <EditorMain>
        {activeSection === 'personal' && <PersonalInfoEditor />}
        {activeSection === 'work' && <WorkExperienceEditor />}
        {activeSection === 'education' && <EducationEditor />}
        {activeSection === 'skills' && <SkillsEditor />}
      </EditorMain>

      <ResumePreviewContainer className="resume-preview-container">
        <ResumePreviewComponent />
      </ResumePreviewContainer>
    </ResumeEditorContainer>
  );

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <TopNavComponent />
        
        <main>
          {currentStep === 'templates' && <TemplateGallery />}
          {currentStep === 'editor' && selectedTemplate && <ResumeEditorComponent />}
          {currentStep === 'analyzer' && <ATSAnalyzerComponent />}
        </main>

        {currentStep === 'editor' && selectedTemplate && (
          <DownloadButton onClick={downloadResume}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M19 9H15V3H9V9H5L12 16L19 9ZM5 18V20H19V18H5Z" />
            </svg>
            Download Resume
          </DownloadButton>
        )}
      </AppContainer>
    </>
  );
};

export default ResumeBuilderApp;