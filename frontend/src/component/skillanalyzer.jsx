import React, { useState } from 'react';
import { ChevronRight, Target, TrendingUp, Users, BookOpen, Award, AlertCircle, CheckCircle2, ArrowRight, BarChart3, Clock, Star } from 'lucide-react';
import styled, { createGlobalStyle } from 'styled-components';

// Global styles
const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background-color: #f9fafb;
    color: #1f2937;
    margin: 0;
    padding: 0;
    line-height: 1.5;
  }

  * {
    box-sizing: border-box;
  }
`;

// Main container
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  margin-top: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

// Header
const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #111827;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  p {
    font-size: 1.125rem;
    color: #6b7280;
    max-width: 600px;
    margin: 0 auto;
  }
`;

// Step header
const StepHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.5rem;
  }

  p {
    color: #6b7280;
  }

  svg {
    margin: 0 auto 1rem;
    color: ${props => props.iconColor || '#3b82f6'};
  }
`;

// Progress bar container
const ProgressContainer = styled.div`
  margin-bottom: 2rem;
`;

const ProgressSteps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ProgressStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StepNumber = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: ${props => props.active ? '#3b82f6' : '#e5e7eb'};
  color: ${props => props.active ? 'white' : '#6b7280'};
`;

const StepLabel = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
  text-align: center;
  max-width: 80px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 0.25rem;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #3b82f6;
  border-radius: 0.25rem;
  transition: width 0.3s ease;
`;

// Form elements
const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #93c5fd;
    box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.5);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1rem;

  &:focus {
    outline: none;
    border-color: #93c5fd;
    box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.5);
  }
`;

// Skill categories
const SkillCategory = styled.div`
  background-color: #f9fafb;
  padding: 1.5rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
`;

const CategoryHeader = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  text-transform: capitalize;

  svg {
    margin-right: 0.5rem;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SkillButton = styled.button`
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 2px solid;
  text-align: left;
  transition: all 0.2s ease;
  cursor: pointer;
  background-color: ${props => props.selected ? '#eff6ff' : 'white'};
  border-color: ${props => props.selected ? '#3b82f6' : '#e5e7eb'};
  color: ${props => props.selected ? '#1d4ed8' : '#374151'};

  &:hover {
    border-color: ${props => props.selected ? '#3b82f6' : '#d1d5db'};
  }
`;

const SkillContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  font-weight: 500;

  svg {
    color: #3b82f6;
  }
`;

// Analysis components
const AnalysisCard = styled.div`
  padding: 1.5rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  border: 1px solid;
  background-color: ${props => props.bgColor || 'white'};
  border-color: ${props => props.borderColor || '#e5e7eb'};
`;

const AnalysisHeader = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  color: ${props => props.textColor || '#111827'};

  svg {
    margin-right: 0.5rem;
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ScoreValue = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: #3b82f6;
`;

const ProgressBarSmall = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: #e5e7eb;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
  overflow: hidden;
`;

const ProgressFillSmall = styled.div`
  height: 100%;
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  border-radius: 0.25rem;
  transition: width 0.5s ease;
`;

const SkillItem = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid;
  border-color: ${props => props.borderColor || '#e5e7eb'};
  margin-bottom: 0.75rem;
`;

const PriorityBadge = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${props => 
    props.priority === 'High' ? '#fee2e2' : 
    props.priority === 'Medium' ? '#fef3c7' : 
    '#d1fae5'};
  color: ${props => 
    props.priority === 'High' ? '#b91c1c' : 
    props.priority === 'Medium' ? '#92400e' : 
    '#065f46'};
`;

const ActionPlanItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ActionNumber = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  margin-right: 1rem;
  flex-shrink: 0;
`;

const ActionContent = styled.div`
  flex: 1;

  p:first-child {
    font-weight: 500;
    color: #111827;
    margin-bottom: 0.25rem;
  }

  p:last-child {
    font-size: 0.875rem;
    color: #6b7280;
  }
`;

// Navigation buttons
const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    margin-left: 0.5rem;
  }
`;

const PrimaryButton = styled(Button)`
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;

  &:hover {
    background-color: #2563eb;
    border-color: #2563eb;
  }

  &:disabled {
    background-color: #93c5fd;
    border-color: #93c5fd;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: white;
  color: #374151;
  border-color: #d1d5db;

  &:hover {
    background-color: #f9fafb;
  }
`;

const SkillsGapAnalyzer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    currentRole: '',
    targetRole: '',
    industry: '',
    timeframe: '',
    currentSkills: [],
    targetSkills: [],
    experienceLevel: '',
    learningPreference: ''
  });
  const [analysis, setAnalysis] = useState(null);

  const steps = [
    'Career Information',
    'Current Skills Assessment',
    'Target Skills',
    'Learning Preferences',
    'Gap Analysis'
  ];

  const skillCategories = {
    technical: ['Programming', 'Data Analysis', 'Cloud Computing', 'AI/ML', 'Cybersecurity', 'Web Development', 'Mobile Development', 'Database Management', 'DevOps', 'UI/UX Design'],
    business: ['Project Management', 'Strategic Planning', 'Financial Analysis', 'Business Development', 'Operations Management', 'Process Improvement', 'Risk Management', 'Vendor Management'],
    leadership: ['Team Leadership', 'People Management', 'Coaching & Mentoring', 'Change Management', 'Decision Making', 'Conflict Resolution', 'Performance Management', 'Talent Development'],
    communication: ['Public Speaking', 'Written Communication', 'Stakeholder Management', 'Negotiation', 'Cross-cultural Communication', 'Customer Relations', 'Sales Presentations', 'Technical Writing'],
    analytical: ['Critical Thinking', 'Problem Solving', 'Research Skills', 'Statistical Analysis', 'Market Research', 'Competitive Analysis', 'Requirements Analysis', 'Process Analysis']
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSkillToggle = (skill, category) => {
    const fieldName = category === 'current' ? 'currentSkills' : 'targetSkills';
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].includes(skill)
        ? prev[fieldName].filter(s => s !== skill)
        : [...prev[fieldName], skill]
    }));
  };

  const analyzeSkillsGap = () => {
    const gapSkills = formData.targetSkills.filter(skill => !formData.currentSkills.includes(skill));
    const strengthSkills = formData.currentSkills.filter(skill => formData.targetSkills.includes(skill));
    const unusedSkills = formData.currentSkills.filter(skill => !formData.targetSkills.includes(skill));

    const priorityMapping = {
      'technical': 'High',
      'leadership': 'High',
      'business': 'Medium',
      'communication': 'Medium',
      'analytical': 'High'
    };

    const learningPaths = {
      'Programming': { time: '3-6 months', resources: ['Online courses', 'Bootcamps', 'Practice projects'] },
      'Data Analysis': { time: '2-4 months', resources: ['Online courses', 'Certifications', 'Real datasets'] },
      'Team Leadership': { time: '6-12 months', resources: ['Leadership programs', 'Mentorship', 'Practical experience'] },
      'Project Management': { time: '3-6 months', resources: ['PMP certification', 'Agile training', 'Project experience'] },
      'Public Speaking': { time: '2-3 months', resources: ['Toastmasters', 'Workshops', 'Practice sessions'] }
    };

    const analysisResult = {
      gapSkills: gapSkills.map(skill => ({
        name: skill,
        priority: priorityMapping[Object.keys(skillCategories).find(cat => skillCategories[cat].includes(skill))] || 'Medium',
        category: Object.keys(skillCategories).find(cat => skillCategories[cat].includes(skill)),
        learningPath: learningPaths[skill] || { time: '2-4 months', resources: ['Online courses', 'Practice', 'Certification'] }
      })),
      strengthSkills,
      unusedSkills,
      totalGaps: gapSkills.length,
      readinessScore: Math.max(0, Math.round(((strengthSkills.length / formData.targetSkills.length) * 100)))
    };

    setAnalysis(analysisResult);
    setCurrentStep(4);
  };

  const renderCareerInfo = () => (
    <div>
      <StepHeader iconColor="#3b82f6">
        <Target size={48} />
        <h2>Career Information</h2>
        <p>Tell us about your current situation and career goals</p>
      </StepHeader>

      <FormGrid>
        <FormGroup>
          <Label>Current Role</Label>
          <Input
            type="text"
            value={formData.currentRole}
            onChange={(e) => handleInputChange('currentRole', e.target.value)}
            placeholder="e.g., Software Developer, Marketing Manager"
          />
        </FormGroup>

        <FormGroup>
          <Label>Target Role</Label>
          <Input
            type="text"
            value={formData.targetRole}
            onChange={(e) => handleInputChange('targetRole', e.target.value)}
            placeholder="e.g., Senior Software Engineer, Product Manager"
          />
        </FormGroup>

        <FormGroup>
          <Label>Industry</Label>
          <Select
            value={formData.industry}
            onChange={(e) => handleInputChange('industry', e.target.value)}
          >
            <option value="">Select Industry</option>
            <option value="technology">Technology</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="retail">Retail</option>
            <option value="consulting">Consulting</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Timeframe</Label>
          <Select
            value={formData.timeframe}
            onChange={(e) => handleInputChange('timeframe', e.target.value)}
          >
            <option value="">Select Timeframe</option>
            <option value="3-months">3 months</option>
            <option value="6-months">6 months</option>
            <option value="1-year">1 year</option>
            <option value="2-years">2+ years</option>
          </Select>
        </FormGroup>
      </FormGrid>
    </div>
  );

  const renderSkillsAssessment = (isTarget = false) => (
    <div>
      <StepHeader iconColor="#10b981">
        <BookOpen size={48} />
        <h2>{isTarget ? 'Target Skills' : 'Current Skills Assessment'}</h2>
        <p>
          {isTarget 
            ? 'Select the skills required for your target role'
            : 'Select the skills you currently possess'
          }
        </p>
      </StepHeader>

      {Object.entries(skillCategories).map(([category, skills]) => (
        <SkillCategory key={category}>
          <CategoryHeader>
            {category === 'technical' && <TrendingUp size={20} />}
            {category === 'business' && <BarChart3 size={20} />}
            {category === 'leadership' && <Users size={20} />}
            {category === 'communication' && <Award size={20} />}
            {category === 'analytical' && <Star size={20} />}
            {category} Skills
          </CategoryHeader>
          <SkillsGrid>
            {skills.map(skill => {
              const isSelected = isTarget 
                ? formData.targetSkills.includes(skill)
                : formData.currentSkills.includes(skill);
              
              return (
                <SkillButton
                  key={skill}
                  onClick={() => handleSkillToggle(skill, isTarget ? 'target' : 'current')}
                  selected={isSelected}
                >
                  <SkillContent>
                    <span>{skill}</span>
                    {isSelected && <CheckCircle2 size={16} />}
                  </SkillContent>
                </SkillButton>
              );
            })}
          </SkillsGrid>
        </SkillCategory>
      ))}
    </div>
  );

  const renderLearningPreferences = () => (
    <div>
      <StepHeader iconColor="#8b5cf6">
        <Clock size={48} />
        <h2>Learning Preferences</h2>
        <p>How do you prefer to learn new skills?</p>
      </StepHeader>

      <FormGrid>
        <FormGroup>
          <Label>Experience Level</Label>
          <Select
            value={formData.experienceLevel}
            onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
          >
            <option value="">Select Experience Level</option>
            <option value="entry">Entry Level (0-2 years)</option>
            <option value="mid">Mid Level (3-5 years)</option>
            <option value="senior">Senior Level (6-10 years)</option>
            <option value="executive">Executive Level (10+ years)</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Learning Preference</Label>
          <Select
            value={formData.learningPreference}
            onChange={(e) => handleInputChange('learningPreference', e.target.value)}
          >
            <option value="">Select Learning Style</option>
            <option value="online">Online Courses</option>
            <option value="bootcamp">Bootcamps/Intensive Programs</option>
            <option value="mentorship">Mentorship/Coaching</option>
            <option value="certification">Professional Certifications</option>
            <option value="hands-on">Hands-on/Project-based</option>
            <option value="formal">Formal Education</option>
          </Select>
        </FormGroup>
      </FormGrid>
    </div>
  );

  const renderAnalysis = () => (
    <div>
      <StepHeader iconColor="#f59e0b">
        <AlertCircle size={48} />
        <h2>Your Skills Gap Analysis</h2>
        <p>Personalized recommendations for your career growth</p>
      </StepHeader>

      {/* Readiness Score */}
      <AnalysisCard bgColor="#f0f9ff" borderColor="#bfdbfe">
        <ScoreContainer>
          <AnalysisHeader>Career Readiness Score</AnalysisHeader>
          <ScoreValue>{analysis.readinessScore}%</ScoreValue>
        </ScoreContainer>
        <ProgressBarSmall>
          <ProgressFillSmall style={{ width: `${analysis.readinessScore}%` }} />
        </ProgressBarSmall>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          You have {analysis.strengthSkills.length} out of {formData.targetSkills.length} required skills
        </p>
      </AnalysisCard>

      {/* Skills Gap */}
      <AnalysisCard bgColor="#fef2f2" borderColor="#fecaca">
        <AnalysisHeader textColor="#991b1b">
          <AlertCircle size={20} />
          Skills to Develop ({analysis.totalGaps})
        </AnalysisHeader>
        <div style={{ marginTop: '1rem' }}>
          {analysis.gapSkills.map((skill, index) => (
            <SkillItem key={index} borderColor="#fca5a5">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontWeight: 600, color: '#111827', margin: 0 }}>{skill.name}</h4>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0, textTransform: 'capitalize' }}>{skill.category} • {skill.priority} Priority</p>
                </div>
                <PriorityBadge priority={skill.priority}>
                  {skill.priority}
                </PriorityBadge>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '0.75rem' }}>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', marginBottom: '0.25rem' }}>Estimated Learning Time:</p>
                  <p style={{ fontSize: '0.875rem', color: '#111827', margin: 0 }}>{skill.learningPath.time}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', marginBottom: '0.25rem' }}>Recommended Resources:</p>
                  <p style={{ fontSize: '0.875rem', color: '#111827', margin: 0 }}>{skill.learningPath.resources.join(', ')}</p>
                </div>
              </div>
            </SkillItem>
          ))}
        </div>
      </AnalysisCard>

      {/* Strengths */}
      {analysis.strengthSkills.length > 0 && (
        <AnalysisCard bgColor="#f0fdf4" borderColor="#bbf7d0">
          <AnalysisHeader textColor="#166534">
            <CheckCircle2 size={20} />
            Your Strengths ({analysis.strengthSkills.length})
          </AnalysisHeader>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {analysis.strengthSkills.map((skill, index) => (
              <div key={index} style={{ backgroundColor: 'white', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #dcfce7' }}>
                <p style={{ fontWeight: 500, color: '#111827', margin: 0 }}>{skill}</p>
              </div>
            ))}
          </div>
        </AnalysisCard>
      )}

      {/* Action Plan */}
      <AnalysisCard bgColor="#eff6ff" borderColor="#bfdbfe">
        <AnalysisHeader textColor="#1e40af">Recommended Action Plan</AnalysisHeader>
        <div style={{ marginTop: '1rem' }}>
          <ActionPlanItem>
            <ActionNumber>1</ActionNumber>
            <ActionContent>
              <p>Focus on High Priority Skills First</p>
              <p>Start with the skills marked as "High Priority" for maximum impact</p>
            </ActionContent>
          </ActionPlanItem>
          <ActionPlanItem>
            <ActionNumber>2</ActionNumber>
            <ActionContent>
              <p>Leverage Your Strengths</p>
              <p>Highlight your existing skills while developing new ones</p>
            </ActionContent>
          </ActionPlanItem>
          <ActionPlanItem>
            <ActionNumber>3</ActionNumber>
            <ActionContent>
              <p>Create a Learning Schedule</p>
              <p>Based on your {formData.timeframe} timeline, allocate time for skill development</p>
            </ActionContent>
          </ActionPlanItem>
        </div>
      </AnalysisCard>
    </div>
  );

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.currentRole && formData.targetRole && formData.industry && formData.timeframe;
      case 1:
        return formData.currentSkills.length > 0;
      case 2:
        return formData.targetSkills.length > 0;
      case 3:
        return formData.experienceLevel && formData.learningPreference;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      analyzeSkillsGap();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const resetAnalysis = () => {
    setCurrentStep(0);
    setFormData({
      currentRole: '',
      targetRole: '',
      industry: '',
      timeframe: '',
      currentSkills: [],
      targetSkills: [],
      experienceLevel: '',
      learningPreference: ''
    });
    setAnalysis(null);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        {/* Header */}
        <Header>
          <h1>Skills Gap Analyzer</h1>
          <p>Identify the skills you need to develop to reach your career goals</p>
        </Header>

        {/* Progress Bar */}
        <ProgressContainer>
          <ProgressSteps>
            {steps.map((step, index) => (
              <ProgressStep key={index}>
                <StepNumber active={index <= currentStep}>{index + 1}</StepNumber>
                <StepLabel>{step}</StepLabel>
              </ProgressStep>
            ))}
          </ProgressSteps>
          <ProgressBar>
            <ProgressFill style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }} />
          </ProgressBar>
        </ProgressContainer>

        {/* Content */}
        <div style={{ minHeight: '24rem' }}>
          {currentStep === 0 && renderCareerInfo()}
          {currentStep === 1 && renderSkillsAssessment(false)}
          {currentStep === 2 && renderSkillsAssessment(true)}
          {currentStep === 3 && renderLearningPreferences()}
          {currentStep === 4 && analysis && renderAnalysis()}
        </div>

        {/* Navigation */}
        <Navigation>
          {currentStep > 0 && currentStep < 4 && (
            <SecondaryButton onClick={handlePrevious}>
              Previous
            </SecondaryButton>
          )}
          
          {currentStep === 4 ? (
            <PrimaryButton onClick={resetAnalysis}>
              Start New Analysis
              <ArrowRight size={16} />
            </PrimaryButton>
          ) : (
            <PrimaryButton
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {currentStep === 3 ? 'Analyze Skills Gap' : 'Next'}
              <ChevronRight size={16} />
            </PrimaryButton>
          )}
        </Navigation>
      </Container>
    </>
  );
};

export default SkillsGapAnalyzer;