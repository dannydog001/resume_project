import React, { useState, useRef, useEffect } from 'react';
import { PDFDownloadLink, PDFViewer, Document, Page } from '@react-pdf/renderer';
import { toPng, toJpeg, toSvg } from 'html-to-image';
import { saveAs } from 'file-saver';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiEdit2, FiTrash2, FiPlus, FiDownload, FiEye, FiEyeOff, 
  FiUser, FiBriefcase, FiBook, FiAward, 
  FiMoon, FiSun, FiSave, FiShare2, FiCopy, FiUpload,
  FiChevronUp, FiChevronDown, FiGrid, FiList, FiLock, FiUnlock
} from 'react-icons/fi';
import { FaRandom, FaRobot, FaHistory, FaUsers } from 'react-icons/fa';
import { ChromePicker } from 'react-color';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

// Template Components
const ProfessionalTemplate = ({ data, color }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = data;
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color, fontSize: '32px', marginBottom: '5px' }}>
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '10px' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
        </div>
        {personalInfo.linkedin && <div>LinkedIn: {personalInfo.linkedin}</div>}
        {personalInfo.portfolio && <div>Portfolio: {personalInfo.portfolio}</div>}
      </header>

      {personalInfo.summary && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ color, borderBottom: `2px solid ${color}`, paddingBottom: '5px' }}>Summary</h2>
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
          <h2 style={{ color, borderBottom: `2px solid ${color}`, paddingBottom: '5px' }}>Experience</h2>
          {experience.map((exp, idx) => (
            <div key={idx} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ margin: '0' }}>{exp.jobTitle}</h3>
                <div>
                  {exp.startDate} - {exp.endDate || 'Present'}
                </div>
              </div>
              <div style={{ fontStyle: 'italic', marginBottom: '5px' }}>{exp.company}</div>
              <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                {exp.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      <div style={{ display: 'flex', gap: '30px' }}>
        <div style={{ flex: 2 }}>
          {education.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{ color, borderBottom: `2px solid ${color}`, paddingBottom: '5px' }}>Education</h2>
              {education.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ margin: '0', fontSize: '16px' }}>{edu.degree}</h3>
                    <div>{edu.year}</div>
                  </div>
                  <div style={{ fontStyle: 'italic' }}>{edu.institution}</div>
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{ color, borderBottom: `2px solid ${color}`, paddingBottom: '5px' }}>Projects</h2>
              {projects.map((proj, idx) => (
                <div key={idx} style={{ marginBottom: '15px' }}>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '16px' }}>{proj.name}</h3>
                  <p style={{ margin: '0 0 5px 0' }}>{proj.description}</p>
                  <div style={{ fontStyle: 'italic' }}>Technologies: {proj.technologies}</div>
                </div>
              ))}
            </section>
          )}
        </div>

        <div style={{ flex: 1 }}>
          {skills.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{ color, borderBottom: `2px solid ${color}`, paddingBottom: '5px' }}>Skills</h2>
              <ul style={{ margin: '0', paddingLeft: '20px' }}>
                {skills.map((skill, idx) => (
                  <li key={idx}>{skill}</li>
                ))}
              </ul>
            </section>
          )}

          {certifications.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{ color, borderBottom: `2px solid ${color}`, paddingBottom: '5px' }}>Certifications</h2>
              {certifications.map((cert, idx) => (
                <div key={idx} style={{ marginBottom: '10px' }}>
                  <h3 style={{ margin: '0', fontSize: '16px' }}>{cert.name}</h3>
                  <div style={{ fontStyle: 'italic' }}>{cert.issuer} ({cert.year})</div>
                </div>
              ))}
            </section>
          )}

          {languages.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{ color, borderBottom: `2px solid ${color}`, paddingBottom: '5px' }}>Languages</h2>
              {languages.map((lang, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{lang.language}</span>
                  <span>{lang.proficiency}</span>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

const ModernTemplate = ({ data, color }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = data;
  
  return (
    <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '40px 30px', backgroundColor: '#fff' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <div>
          <h1 style={{ color, fontSize: '36px', margin: '0 0 5px 0', fontWeight: '700' }}>
            {personalInfo.firstName} <span style={{ fontWeight: '300' }}>{personalInfo.lastName}</span>
          </h1>
          <h2 style={{ fontSize: '18px', margin: '0', color: '#64748b', fontWeight: '400' }}>
            {personalInfo.summary?.split('.')[0]}.
          </h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ marginBottom: '5px' }}>{personalInfo.email}</div>
          <div style={{ marginBottom: '5px' }}>{personalInfo.phone}</div>
          {personalInfo.linkedin && <div>linkedin.com/{personalInfo.linkedin}</div>}
        </div>
      </header>

      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: 2 }}>
          {experience.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                color: '#fff', 
                backgroundColor: color,
                padding: '8px 15px',
                fontSize: '16px',
                display: 'inline-block',
                marginBottom: '15px'
              }}>
                EXPERIENCE
              </h2>
              {experience.map((exp, idx) => (
                <div key={idx} style={{ marginBottom: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <h3 style={{ margin: '0', fontSize: '18px', fontWeight: '600' }}>{exp.jobTitle}</h3>
                    <div style={{ color: '#64748b' }}>
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </div>
                  </div>
                  <div style={{ fontStyle: 'italic', marginBottom: '10px', color: '#64748b' }}>{exp.company}</div>
                  <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} style={{ marginBottom: '5px' }}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                color: '#fff', 
                backgroundColor: color,
                padding: '8px 15px',
                fontSize: '16px',
                display: 'inline-block',
                marginBottom: '15px'
              }}>
                EDUCATION
              </h2>
              {education.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>{edu.degree}</h3>
                    <div style={{ color: '#64748b' }}>{edu.year}</div>
                  </div>
                  <div style={{ fontStyle: 'italic', color: '#64748b' }}>{edu.institution}</div>
                </div>
              ))}
            </section>
          )}
        </div>

        <div style={{ flex: 1 }}>
          {personalInfo.summary && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                color: '#fff', 
                backgroundColor: color,
                padding: '8px 15px',
                fontSize: '16px',
                display: 'inline-block',
                marginBottom: '15px'
              }}>
                PROFILE
              </h2>
              <p style={{ lineHeight: '1.6' }}>{personalInfo.summary}</p>
            </section>
          )}

          {skills.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                color: '#fff', 
                backgroundColor: color,
                padding: '8px 15px',
                fontSize: '16px',
                display: 'inline-block',
                marginBottom: '15px'
              }}>
                SKILLS
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map((skill, idx) => (
                  <div key={idx} style={{
                    backgroundColor: '#f1f5f9',
                    padding: '5px 10px',
                    borderRadius: '20px',
                    fontSize: '14px'
                  }}>
                    {skill}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                color: '#fff', 
                backgroundColor: color,
                padding: '8px 15px',
                fontSize: '16px',
                display: 'inline-block',
                marginBottom: '15px'
              }}>
                PROJECTS
              </h2>
              {projects.map((proj, idx) => (
                <div key={idx} style={{ marginBottom: '15px' }}>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: '600' }}>{proj.name}</h3>
                  <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{proj.description}</p>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Technologies: {proj.technologies}</div>
                </div>
              ))}
            </section>
          )}

          {languages.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                color: '#fff', 
                backgroundColor: color,
                padding: '8px 15px',
                fontSize: '16px',
                display: 'inline-block',
                marginBottom: '15px'
              }}>
                LANGUAGES
              </h2>
              {languages.map((lang, idx) => (
                <div key={idx} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '500' }}>{lang.language}</span>
                    <span style={{ color: '#64748b' }}>{lang.proficiency}</span>
                  </div>
                  <div style={{ 
                    height: '4px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${(['Native', 'Fluent'].includes(lang.proficiency) ? 100 : 
                              lang.proficiency === 'Intermediate' ? 66 : 33)}%`,
                      height: '100%',
                      backgroundColor: color
                    }} />
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

const CreativeTemplate = ({ data, color }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = data;
  
  return (
    <div style={{ 
      fontFamily: 'Georgia, serif', 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '40px',
      backgroundColor: '#fff',
      border: `10px solid ${color}`,
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        borderBottom: `3px solid ${color}`,
        paddingBottom: '20px'
      }}>
        <h1 style={{ 
          color: '#1e293b', 
          fontSize: '42px', 
          margin: '0 0 10px 0',
          fontWeight: '700',
          letterSpacing: '1px'
        }}>
          {personalInfo.firstName} <span style={{ color }}>{personalInfo.lastName}</span>
        </h1>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          marginBottom: '15px',
          fontSize: '16px'
        }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.linkedin && <span>LinkedIn: {personalInfo.linkedin}</span>}
        </div>
      </header>

      <div style={{ display: 'flex', gap: '40px' }}>
        <div style={{ flex: 1 }}>
          {personalInfo.summary && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                color,
                fontSize: '20px',
                borderBottom: `2px solid ${color}`,
                paddingBottom: '5px',
                marginBottom: '15px'
              }}>
                ABOUT ME
              </h2>
              <p style={{ lineHeight: '1.6', textAlign: 'justify' }}>{personalInfo.summary}</p>
            </section>
          )}

          {skills.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                color,
                fontSize: '20px',
                borderBottom: `2px solid ${color}`,
                paddingBottom: '5px',
                marginBottom: '15px'
              }}>
                SKILLS
              </h2>
              <ul style={{ 
                listStyleType: 'none',
                padding: 0,
                margin: 0,
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px'
              }}>
                {skills.map((skill, idx) => (
                  <li key={idx} style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{ 
                      width: '10px',
                      height: '10px',
                      backgroundColor: color,
                      borderRadius: '50%'
                    }} />
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {languages.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                color,
                fontSize: '20px',
                borderBottom: `2px solid ${color}`,
                paddingBottom: '5px',
                marginBottom: '15px'
              }}>
                LANGUAGES
              </h2>
              {languages.map((lang, idx) => (
                <div key={idx} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: '500' }}>{lang.language}</span>
                    <span style={{ color: '#64748b' }}>{lang.proficiency}</span>
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        <div style={{ flex: 2 }}>
          {experience.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                color,
                fontSize: '20px',
                borderBottom: `2px solid ${color}`,
                paddingBottom: '5px',
                marginBottom: '15px'
              }}>
                WORK EXPERIENCE
              </h2>
              {experience.map((exp, idx) => (
                <div key={idx} style={{ marginBottom: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <h3 style={{ margin: '0', fontSize: '18px', fontWeight: '600' }}>{exp.jobTitle}</h3>
                    <div style={{ color: '#64748b', fontStyle: 'italic' }}>
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </div>
                  </div>
                  <div style={{ 
                    fontStyle: 'italic', 
                    marginBottom: '10px',
                    color: color,
                    fontWeight: '500'
                  }}>
                    {exp.company}
                  </div>
                  <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} style={{ marginBottom: '8px', lineHeight: '1.4' }}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          )}

          {education.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                color,
                fontSize: '20px',
                borderBottom: `2px solid ${color}`,
                paddingBottom: '5px',
                marginBottom: '15px'
              }}>
                EDUCATION
              </h2>
              {education.map((edu, idx) => (
                <div key={idx} style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h3 style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>{edu.degree}</h3>
                    <div style={{ color: '#64748b' }}>{edu.year}</div>
                  </div>
                  <div style={{ fontStyle: 'italic' }}>{edu.institution}</div>
                </div>
              ))}
            </section>
          )}

          {projects.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ 
                color,
                fontSize: '20px',
                borderBottom: `2px solid ${color}`,
                paddingBottom: '5px',
                marginBottom: '15px'
              }}>
                PROJECTS
              </h2>
              {projects.map((proj, idx) => (
                <div key={idx} style={{ marginBottom: '15px' }}>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', fontWeight: '600' }}>{proj.name}</h3>
                  <p style={{ margin: '0 0 5px 0', fontStyle: 'italic' }}>{proj.description}</p>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>Technologies: {proj.technologies}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

// Template data
const TEMPLATES = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and traditional design for corporate environments',
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166',
    component: ProfessionalTemplate,
    category: 'Corporate'
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Sleek contemporary design with bold typography',
    thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
    component: ModernTemplate,
    category: 'Creative'
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Unique layout for designers and artists',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
    component: CreativeTemplate,
    category: 'Creative'
  }
];

// PDF Template Component
const TemplatePDF = ({ data, templateId, color }) => {
  const TemplateComponent = TEMPLATES.find(t => t.id === templateId)?.component || ProfessionalTemplate;
  
  return (
    <Document>
      <Page size="A4" style={{ padding: 30 }}>
        <TemplateComponent data={data} color={color} />
      </Page>
    </Document>
  );
};

// AI Suggestion Component
const AISuggestionPanel = ({ onApplySuggestion }) => {
  const [suggestions, setSuggestions] = useState([
    "Try quantifying your achievements with metrics",
    "Consider adding more action verbs",
    "Your summary could be more concise",
    "Add relevant certifications to boost credibility"
  ]);
  
  const [isLoading, setIsLoading] = useState(false);

  const generateSuggestions = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSuggestions([
        ...suggestions,
        "Highlight leadership experience for managerial roles",
        "Tailor skills to match job description keywords"
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', fontWeight: '600', gap: '10px' }}>
        <FaRobot /> AI Suggestions
        <button 
          onClick={generateSuggestions} 
          disabled={isLoading}
          style={{ padding: '6px 12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px' }}
        >
          {isLoading ? 'Generating...' : 'Get More'}
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {suggestions.map((suggestion, index) => (
          <div key={index} style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ marginRight: '10px', fontSize: '14px' }}>{suggestion}</p>
            <button 
              onClick={() => onApplySuggestion(suggestion)}
              style={{ padding: '4px 8px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', fontSize: '12px' }}
            >
              Apply
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Version History Component
const VersionHistory = ({ versions, onRestore }) => {
  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', fontWeight: '600' }}>
        <FaHistory /> Version History
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '300px', overflowY: 'auto' }}>
        {versions.map((version, index) => (
          <div key={version.id} style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong>Version {versions.length - index}</strong>
              <span style={{ fontSize: '12px', color: '#64748b' }}>{new Date(version.timestamp).toLocaleString()}</span>
            </div>
            <button 
              onClick={() => onRestore(version.data)}
              style={{ padding: '6px 12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px' }}
            >
              Restore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>Failed to render this section.</div>;
    }
    return this.props.children;
  }
}

// Main App Component
const ResumeBuilder = () => {
  const SAMPLE_DATA = {
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '(123) 456-7890',
      address: '123 Main St, City, Country',
      linkedin: 'linkedin.com/in/johndoe',
      portfolio: 'johndoe.dev',
      summary: 'Experienced software engineer with 5+ years of experience in full-stack development. Specialized in React, Node.js, and cloud technologies.'
    },
    experience: [
      {
        jobTitle: 'Senior Software Engineer',
        company: 'Tech Corp Inc.',
        startDate: '2019-01',
        endDate: 'Present',
        responsibilities: [
          'Lead a team of 5 developers to build scalable web applications',
          'Implemented CI/CD pipeline reducing deployment time by 40%',
          'Architected microservices that improved system reliability'
        ]
      }
    ],
    education: [
      {
        degree: 'M.S. Computer Science',
        institution: 'State University',
        year: '2016'
      }
    ],
    skills: [
      'JavaScript (ES6+)',
      'React & Redux',
      'Node.js',
      'TypeScript',
      'AWS'
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Built a full-stack e-commerce solution with React, Node.js, and MongoDB',
        technologies: 'React, Node.js, MongoDB, Stripe API'
      }
    ],
    certifications: [
      {
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        year: '2020'
      }
    ],
    languages: [
      {
        language: 'English',
        proficiency: 'Native'
      }
    ]
  };

  const [resumeData, setResumeData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      portfolio: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: []
  });
  
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [activeTab, setActiveTab] = useState('personal');
  const [previewMode, setPreviewMode] = useState('desktop');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [accentColor, setAccentColor] = useState('#3b82f6');
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [versions, setVersions] = useState([]);
  const [isCollaborating, setIsCollaborating] = useState(false);
  const previewRef = useRef();

  // Save version history
  const saveVersion = () => {
    const newVersion = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      data: JSON.parse(JSON.stringify(resumeData))
    };
    setVersions([newVersion, ...versions.slice(0, 9)]);
  };

  // Restore version
  const restoreVersion = (data) => {
    setResumeData(data);
  };

  // Update resume data
  const updateResumeData = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
    saveVersion();
  };

  // Handle input changes
  const handleInputChange = (section, field, value) => {
    setResumeData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    saveVersion();
  };

  // Handle array item changes
  const handleArrayItemChange = (section, index, field, value) => {
    setResumeData(prev => {
      const newArray = [...prev[section]];
      if (field) {
        newArray[index] = {
          ...newArray[index],
          [field]: value
        };
      } else {
        newArray[index] = value;
      }
      return {
        ...prev,
        [section]: newArray
      };
    });
    saveVersion();
  };

  // Add new array item
  const addArrayItem = (section, newItem) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
    saveVersion();
  };

  // Remove array item
  const removeArrayItem = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
    saveVersion();
  };

  // Handle drag and drop reordering
  const handleDragEnd = (result, section) => {
    if (!result.destination) return;
    
    const items = Array.from(resumeData[section]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setResumeData(prev => ({
      ...prev,
      [section]: items
    }));
    saveVersion();
  };

  // Export image
  const exportImage = async (format) => {
    try {
      let dataUrl;
      const element = previewRef.current;
      
      switch (format) {
        case 'png':
          dataUrl = await toPng(element);
          break;
        case 'jpeg':
          dataUrl = await toJpeg(element);
          break;
        case 'svg':
          dataUrl = await toSvg(element);
          break;
        default:
          return;
      }
      
      saveAs(dataUrl, `resume_${selectedTemplate}.${format}`);
    } catch (error) {
      console.error('Error exporting image:', error);
    }
  };

  // Generate random resume data
  const randomizeResume = () => {
    setResumeData(JSON.parse(JSON.stringify(SAMPLE_DATA)));
    saveVersion();
  };

  // Apply AI suggestion
  const applyAISuggestion = (suggestion) => {
    if (suggestion.includes("summary")) {
      handleInputChange(
        'personalInfo', 
        'summary', 
        "Results-driven professional with a proven track record of success. Adept at collaborating with cross-functional teams to deliver high-impact solutions."
      );
    }
  };

  // Get current template component
  const TemplateComponent = TEMPLATES.find(t => t.id === selectedTemplate)?.component || ProfessionalTemplate;

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
      color: darkMode ? '#f8fafc' : '#1e293b',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '20px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
          <h1 style={{ 
            margin: '0', 
            fontSize: '32px', 
            fontWeight: '700', 
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Resume Craft Pro
          </h1>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              style={{
                padding: '12px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                color: darkMode ? '#f8fafc' : '#1e293b'
              }}
            >
              {darkMode ? <FiSun /> : <FiMoon />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button 
              onClick={randomizeResume}
              style={{
                padding: '12px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                backgroundColor: '#f59e0b',
                color: 'white'
              }}
            >
              <FaRandom /> Randomize
            </button>
            <button 
              onClick={saveVersion}
              style={{
                padding: '12px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                color: darkMode ? '#f8fafc' : '#1e293b'
              }}
            >
              <FiSave /> Save
            </button>
          </div>
        </header>
        
        {/* Template Selector */}
        <div style={{ 
          marginBottom: '30px',
          backgroundColor: darkMode ? '#1e293b' : '#ffffff',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: darkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2>Choose a Template</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                style={{
                  padding: '8px 12px',
                  border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                  backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '14px',
                  transition: 'all 0.2s',
                  color: darkMode ? '#f8fafc' : '#1e293b'
                }}
              >
                <FiGrid /> All
              </button>
            </div>
          </div>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px',
            marginTop: '15px'
          }}>
            {TEMPLATES.map(template => (
              <div 
                key={template.id}
                style={{
                  border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                  position: 'relative',
                  border: selectedTemplate === template.id ? `3px solid #3b82f6` : `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                  boxShadow: selectedTemplate === template.id ? '0 5px 15px rgba(59, 130, 246, 0.2)' : 'none'
                }}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <img 
                  src={template.thumbnail} 
                  alt={template.name} 
                  style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ padding: '15px' }}>
                  <p style={{ margin: '0 0 5px', fontWeight: '600', fontSize: '16px' }}>{template.name}</p>
                  <p style={{ margin: '0', fontSize: '14px', color: darkMode ? '#94a3b8' : '#64748b' }}>{template.description}</p>
                  <small style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>{template.category}</small>
                </div>
                {selectedTemplate === template.id && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px', 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    padding: '3px 8px', 
                    borderRadius: '20px', 
                    fontSize: '12px', 
                    fontWeight: '500' 
                  }}>
                    Selected
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Main Builder Area */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '300px 1fr 300px',
          gap: '30px',
          marginBottom: '30px'
        }}>
          {/* Left Side Panel */}
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            position: 'sticky',
            top: '20px',
            height: 'fit-content'
          }}>
            <AISuggestionPanel onApplySuggestion={applyAISuggestion} />
            <VersionHistory versions={versions} onRestore={restoreVersion} />
          </div>
          
          {/* Form Container */}
          <div style={{ 
            backgroundColor: darkMode ? '#1e293b' : '#ffffff',
            padding: '25px',
            borderRadius: '12px',
            boxShadow: darkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.1)',
            height: 'fit-content',
            position: 'sticky',
            top: '20px'
          }}>
            <div style={{ 
              display: 'flex',
              borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
              marginBottom: '20px',
              overflowX: 'auto'
            }}>
              <button 
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontWeight: '500',
                  color: activeTab === 'personal' ? '#3b82f6' : darkMode ? '#94a3b8' : '#64748b',
                  position: 'relative',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => setActiveTab('personal')}
              >
                <FiUser /> Personal
              </button>
              <button 
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontWeight: '500',
                  color: activeTab === 'experience' ? '#3b82f6' : darkMode ? '#94a3b8' : '#64748b',
                  position: 'relative',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => setActiveTab('experience')}
              >
                <FiBriefcase /> Experience
              </button>
              <button 
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontWeight: '500',
                  color: activeTab === 'education' ? '#3b82f6' : darkMode ? '#94a3b8' : '#64748b',
                  position: 'relative',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => setActiveTab('education')}
              >
                <FiBook /> Education
              </button>
              <button 
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontWeight: '500',
                  color: activeTab === 'skills' ? '#3b82f6' : darkMode ? '#94a3b8' : '#64748b',
                  position: 'relative',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => setActiveTab('skills')}
              >
                <FiAward /> Skills
              </button>
            </div>
            
            <AnimatePresence mode="wait">
              {activeTab === 'personal' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}` }}>
                    <h3>Personal Information</h3>
                    {Object.entries(resumeData.personalInfo).map(([key, value]) => (
                      <div key={key} style={{ marginBottom: '15px' }}>
                        <label style={{ 
                          display: 'block', 
                          marginBottom: '8px', 
                          fontWeight: '500', 
                          fontSize: '14px', 
                          color: darkMode ? '#f8fafc' : '#1e293b'
                        }}>
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                        </label>
                        {key === 'summary' ? (
                          <textarea
                            value={value}
                            onChange={(e) => handleInputChange('personalInfo', key, e.target.value)}
                            style={{
                              width: '100%',
                              padding: '12px',
                              border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                              borderRadius: '8px',
                              fontFamily: 'inherit',
                              minHeight: '120px',
                              resize: 'vertical',
                              fontSize: '15px',
                              transition: 'all 0.2s',
                              backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                              color: darkMode ? '#f8fafc' : '#1e293b'
                            }}
                          />
                        ) : (
                          <input
                            type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                            value={value}
                            onChange={(e) => handleInputChange('personalInfo', key, e.target.value)}
                            style={{
                              width: '100%',
                              padding: '12px',
                              border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                              borderRadius: '8px',
                              fontFamily: 'inherit',
                              fontSize: '15px',
                              transition: 'all 0.2s',
                              backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                              color: darkMode ? '#f8fafc' : '#1e293b'
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'experience' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <h3>Experience</h3>
                      <button
                        onClick={() => addArrayItem('experience', {
                          jobTitle: '',
                          company: '',
                          startDate: '',
                          endDate: '',
                          responsibilities: []
                        })}
                        style={{
                          padding: '12px 20px',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '15px',
                          backgroundColor: '#3b82f6',
                          color: 'white'
                        }}
                      >
                        <FiPlus /> Add Experience
                      </button>
                    </div>
                    
                    <DragDropContext onDragEnd={(result) => handleDragEnd(result, 'experience')}>
                      <Droppable droppableId="experience">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {resumeData.experience.map((exp, idx) => (
                              <Draggable key={`exp-${idx}`} draggableId={`exp-${idx}`} index={idx}>
                                {(provided) => (
                                  <div 
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    style={{
                                      backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
                                      padding: '20px',
                                      borderRadius: '8px',
                                      marginBottom: '15px',
                                      position: 'relative',
                                      border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div 
                                          {...provided.dragHandleProps}
                                          style={{
                                            padding: '6px',
                                            cursor: 'grab',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '4px',
                                            backgroundColor: darkMode ? '#1e293b' : '#e2e8f0'
                                          }}
                                        >
                                          <FiList style={{ color: darkMode ? '#f8fafc' : '#1e293b' }} />
                                        </div>
                                        <h4 style={{ margin: 0 }}>Experience {idx + 1}</h4>
                                      </div>
                                      <button
                                        onClick={() => removeArrayItem('experience', idx)}
                                        style={{
                                          padding: '6px',
                                          border: 'none',
                                          backgroundColor: 'transparent',
                                          cursor: 'pointer',
                                          color: '#ef4444'
                                        }}
                                      >
                                        <FiTrash2 />
                                      </button>
                                    </div>
                                    
                                    <div style={{ marginBottom: '15px' }}>
                                      <label style={{ 
                                        display: 'block', 
                                        marginBottom: '8px', 
                                        fontWeight: '500', 
                                        fontSize: '14px', 
                                        color: darkMode ? '#f8fafc' : '#1e293b'
                                      }}>
                                        Job Title
                                      </label>
                                      <input
                                        type="text"
                                        value={exp.jobTitle}
                                        onChange={(e) => handleArrayItemChange('experience', idx, 'jobTitle', e.target.value)}
                                        style={{
                                          width: '100%',
                                          padding: '12px',
                                          border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                          borderRadius: '8px',
                                          fontFamily: 'inherit',
                                          fontSize: '15px',
                                          transition: 'all 0.2s',
                                          backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                                          color: darkMode ? '#f8fafc' : '#1e293b'
                                        }}
                                      />
                                    </div>
                                    
                                    <div style={{ marginBottom: '15px' }}>
                                      <label style={{ 
                                        display: 'block', 
                                        marginBottom: '8px', 
                                        fontWeight: '500', 
                                        fontSize: '14px', 
                                        color: darkMode ? '#f8fafc' : '#1e293b'
                                      }}>
                                        Company
                                      </label>
                                      <input
                                        type="text"
                                        value={exp.company}
                                        onChange={(e) => handleArrayItemChange('experience', idx, 'company', e.target.value)}
                                        style={{
                                          width: '100%',
                                          padding: '12px',
                                          border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                          borderRadius: '8px',
                                          fontFamily: 'inherit',
                                          fontSize: '15px',
                                          transition: 'all 0.2s',
                                          backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                                          color: darkMode ? '#f8fafc' : '#1e293b'
                                        }}
                                      />
                                    </div>
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                                      <div>
                                        <label style={{ 
                                          display: 'block', 
                                          marginBottom: '8px', 
                                          fontWeight: '500', 
                                          fontSize: '14px', 
                                          color: darkMode ? '#f8fafc' : '#1e293b'
                                        }}>
                                          Start Date
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="YYYY-MM"
                                          value={exp.startDate}
                                          onChange={(e) => handleArrayItemChange('experience', idx, 'startDate', e.target.value)}
                                          style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                            borderRadius: '8px',
                                            fontFamily: 'inherit',
                                            fontSize: '15px',
                                            transition: 'all 0.2s',
                                            backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                                            color: darkMode ? '#f8fafc' : '#1e293b'
                                          }}
                                        />
                                      </div>
                                      <div>
                                        <label style={{ 
                                          display: 'block', 
                                          marginBottom: '8px', 
                                          fontWeight: '500', 
                                          fontSize: '14px', 
                                          color: darkMode ? '#f8fafc' : '#1e293b'
                                        }}>
                                          End Date
                                        </label>
                                        <input
                                          type="text"
                                          placeholder="YYYY-MM or Present"
                                          value={exp.endDate}
                                          onChange={(e) => handleArrayItemChange('experience', idx, 'endDate', e.target.value)}
                                          style={{
                                            width: '100%',
                                            padding: '12px',
                                            border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                            borderRadius: '8px',
                                            fontFamily: 'inherit',
                                            fontSize: '15px',
                                            transition: 'all 0.2s',
                                            backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                                            color: darkMode ? '#f8fafc' : '#1e293b'
                                          }}
                                        />
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <label style={{ 
                                        display: 'block', 
                                        marginBottom: '8px', 
                                        fontWeight: '500', 
                                        fontSize: '14px', 
                                        color: darkMode ? '#f8fafc' : '#1e293b'
                                      }}>
                                        Responsibilities
                                      </label>
                                      {exp.responsibilities.map((resp, respIdx) => (
                                        <div key={respIdx} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                          <input
                                            type="text"
                                            value={resp}
                                            onChange={(e) => {
                                              const newResponsibilities = [...exp.responsibilities];
                                              newResponsibilities[respIdx] = e.target.value;
                                              handleArrayItemChange('experience', idx, 'responsibilities', newResponsibilities);
                                            }}
                                            style={{
                                              flex: 1,
                                              padding: '12px',
                                              border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                              borderRadius: '8px',
                                              fontFamily: 'inherit',
                                              fontSize: '15px',
                                              transition: 'all 0.2s',
                                              backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                                              color: darkMode ? '#f8fafc' : '#1e293b'
                                            }}
                                          />
                                          <button
                                            onClick={() => {
                                              const newResponsibilities = exp.responsibilities.filter((_, i) => i !== respIdx);
                                              handleArrayItemChange('experience', idx, 'responsibilities', newResponsibilities);
                                            }}
                                            style={{
                                              padding: '0 12px',
                                              border: 'none',
                                              backgroundColor: '#ef4444',
                                              color: 'white',
                                              borderRadius: '8px',
                                              cursor: 'pointer'
                                            }}
                                          >
                                            <FiTrash2 />
                                          </button>
                                        </div>
                                      ))}
                                      <button
                                        onClick={() => {
                                          const newResponsibilities = [...exp.responsibilities, ''];
                                          handleArrayItemChange('experience', idx, 'responsibilities', newResponsibilities);
                                        }}
                                        style={{
                                          padding: '10px 15px',
                                          border: 'none',
                                          backgroundColor: '#3b82f6',
                                          color: 'white',
                                          borderRadius: '8px',
                                          cursor: 'pointer',
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: '8px',
                                          fontSize: '14px',
                                          marginTop: '10px'
                                        }}
                                      >
                                        <FiPlus /> Add Responsibility
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'education' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <h3>Education</h3>
                      <button
                        onClick={() => addArrayItem('education', {
                          degree: '',
                          institution: '',
                          year: ''
                        })}
                        style={{
                          padding: '12px 20px',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '15px',
                          backgroundColor: '#3b82f6',
                          color: 'white'
                        }}
                      >
                        <FiPlus /> Add Education
                      </button>
                    </div>
                    
                    <DragDropContext onDragEnd={(result) => handleDragEnd(result, 'education')}>
                      <Droppable droppableId="education">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {resumeData.education.map((edu, idx) => (
                              <Draggable key={`edu-${idx}`} draggableId={`edu-${idx}`} index={idx}>
                                {(provided) => (
                                  <div 
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    style={{
                                      backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
                                      padding: '20px',
                                      borderRadius: '8px',
                                      marginBottom: '15px',
                                      position: 'relative',
                                      border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div 
                                          {...provided.dragHandleProps}
                                          style={{
                                            padding: '6px',
                                            cursor: 'grab',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '4px',
                                            backgroundColor: darkMode ? '#1e293b' : '#e2e8f0'
                                          }}
                                        >
                                          <FiList style={{ color: darkMode ? '#f8fafc' : '#1e293b' }} />
                                        </div>
                                        <h4 style={{ margin: 0 }}>Education {idx + 1}</h4>
                                      </div>
                                      <button
                                        onClick={() => removeArrayItem('education', idx)}
                                        style={{
                                          padding: '6px',
                                          border: 'none',
                                          backgroundColor: 'transparent',
                                          cursor: 'pointer',
                                          color: '#ef4444'
                                        }}
                                      >
                                        <FiTrash2 />
                                      </button>
                                    </div>
                                    
                                    <div style={{ marginBottom: '15px' }}>
                                      <label style={{ 
                                        display: 'block', 
                                        marginBottom: '8px', 
                                        fontWeight: '500', 
                                        fontSize: '14px', 
                                        color: darkMode ? '#f8fafc' : '#1e293b'
                                      }}>
                                        Degree
                                      </label>
                                      <input
                                        type="text"
                                        value={edu.degree}
                                        onChange={(e) => handleArrayItemChange('education', idx, 'degree', e.target.value)}
                                        style={{
                                          width: '100%',
                                          padding: '12px',
                                          border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                          borderRadius: '8px',
                                          fontFamily: 'inherit',
                                          fontSize: '15px',
                                          transition: 'all 0.2s',
                                          backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                                          color: darkMode ? '#f8fafc' : '#1e293b'
                                        }}
                                      />
                                    </div>
                                    
                                    <div style={{ marginBottom: '15px' }}>
                                      <label style={{ 
                                        display: 'block', 
                                        marginBottom: '8px', 
                                        fontWeight: '500', 
                                        fontSize: '14px', 
                                        color: darkMode ? '#f8fafc' : '#1e293b'
                                      }}>
                                        Institution
                                      </label>
                                      <input
                                        type="text"
                                        value={edu.institution}
                                        onChange={(e) => handleArrayItemChange('education', idx, 'institution', e.target.value)}
                                        style={{
                                          width: '100%',
                                          padding: '12px',
                                          border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                          borderRadius: '8px',
                                          fontFamily: 'inherit',
                                          fontSize: '15px',
                                          transition: 'all 0.2s',
                                          backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                                          color: darkMode ? '#f8fafc' : '#1e293b'
                                        }}
                                      />
                                    </div>
                                    
                                    <div>
                                      <label style={{ 
                                        display: 'block', 
                                        marginBottom: '8px', 
                                        fontWeight: '500', 
                                        fontSize: '14px', 
                                        color: darkMode ? '#f8fafc' : '#1e293b'
                                      }}>
                                        Year
                                      </label>
                                      <input
                                        type="text"
                                        value={edu.year}
                                        onChange={(e) => handleArrayItemChange('education', idx, 'year', e.target.value)}
                                        style={{
                                          width: '100%',
                                          padding: '12px',
                                          border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                          borderRadius: '8px',
                                          fontFamily: 'inherit',
                                          fontSize: '15px',
                                          transition: 'all 0.2s',
                                          backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                                          color: darkMode ? '#f8fafc' : '#1e293b'
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'skills' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <h3>Skills</h3>
                      <button
                        onClick={() => addArrayItem('skills', '')}
                        style={{
                          padding: '12px 20px',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: '500',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '15px',
                          backgroundColor: '#3b82f6',
                          color: 'white'
                        }}
                      >
                        <FiPlus /> Add Skill
                      </button>
                    </div>
                    
                    <DragDropContext onDragEnd={(result) => handleDragEnd(result, 'skills')}>
                      <Droppable droppableId="skills">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {resumeData.skills.map((skill, idx) => (
                              <Draggable key={`skill-${idx}`} draggableId={`skill-${idx}`} index={idx}>
                                {(provided) => (
                                  <div 
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    style={{
                                      backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
                                      padding: '20px',
                                      borderRadius: '8px',
                                      marginBottom: '15px',
                                      position: 'relative',
                                      border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div 
                                          {...provided.dragHandleProps}
                                          style={{
                                            padding: '6px',
                                            cursor: 'grab',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '4px',
                                            backgroundColor: darkMode ? '#1e293b' : '#e2e8f0'
                                          }}
                                        >
                                          <FiList style={{ color: darkMode ? '#f8fafc' : '#1e293b' }} />
                                        </div>
                                        <h4 style={{ margin: 0 }}>Skill {idx + 1}</h4>
                                      </div>
                                      <button
                                        onClick={() => removeArrayItem('skills', idx)}
                                        style={{
                                          padding: '6px',
                                          border: 'none',
                                          backgroundColor: 'transparent',
                                          cursor: 'pointer',
                                          color: '#ef4444'
                                        }}
                                      >
                                        <FiTrash2 />
                                      </button>
                                    </div>
                                    
                                    <div>
                                      <label style={{ 
                                        display: 'block', 
                                        marginBottom: '8px', 
                                        fontWeight: '500', 
                                        fontSize: '14px', 
                                        color: darkMode ? '#f8fafc' : '#1e293b'
                                      }}>
                                        Skill Name
                                      </label>
                                      <input
                                        type="text"
                                        value={skill}
                                        onChange={(e) => handleArrayItemChange('skills', idx, null, e.target.value)}
                                        style={{
                                          width: '100%',
                                          padding: '12px',
                                          border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                                          borderRadius: '8px',
                                          fontFamily: 'inherit',
                                          fontSize: '15px',
                                          transition: 'all 0.2s',
                                          backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                                          color: darkMode ? '#f8fafc' : '#1e293b'
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Right Side Panel - Preview */}
          <div style={{ 
            position: 'sticky',
            top: '20px',
            height: 'fit-content'
          }}>
            <div style={{ 
              backgroundColor: darkMode ? '#1e293b' : '#ffffff',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: darkMode ? '0 4px 6px rgba(0,0,0,0.3)' : '0 4px 6px rgba(0,0,0,0.1)',
              marginBottom: '30px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Preview</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button 
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    style={{
                      padding: '8px 12px',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '14px',
                      backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                      border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                      color: darkMode ? '#f8fafc' : '#1e293b'
                    }}
                  >
                    <div style={{ 
                      width: '16px', 
                      height: '16px', 
                      backgroundColor: accentColor,
                      borderRadius: '4px'
                    }} />
                    Color
                  </button>
                  <button 
                    onClick={() => setIsPDFViewerOpen(!isPDFViewerOpen)}
                    style={{
                      padding: '8px 12px',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '14px',
                      backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                      border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                      color: darkMode ? '#f8fafc' : '#1e293b'
                    }}
                  >
                    {isPDFViewerOpen ? <FiEyeOff /> : <FiEye />}
                    {isPDFViewerOpen ? 'Hide PDF' : 'Show PDF'}
                  </button>
                </div>
              </div>
              
              {showColorPicker && (
                <div style={{ position: 'absolute', zIndex: 100, right: '30px', top: '70px' }}>
                  <ChromePicker 
                    color={accentColor} 
                    onChangeComplete={(color) => setAccentColor(color.hex)}
                  />
                </div>
              )}
              
              <div style={{ 
                display: 'flex',
                gap: '10px',
                marginBottom: '20px',
                flexWrap: 'wrap'
              }}>
                <button 
                  onClick={() => setPreviewMode('desktop')}
                  style={{
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    backgroundColor: previewMode === 'desktop' ? '#3b82f6' : (darkMode ? '#1e293b' : '#ffffff'),
                    color: previewMode === 'desktop' ? 'white' : (darkMode ? '#f8fafc' : '#1e293b'),
                    border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`
                  }}
                >
                  Desktop
                </button>
                <button 
                  onClick={() => setPreviewMode('mobile')}
                  style={{
                    padding: '8px 12px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    backgroundColor: previewMode === 'mobile' ? '#3b82f6' : (darkMode ? '#1e293b' : '#ffffff'),
                    color: previewMode === 'mobile' ? 'white' : (darkMode ? '#f8fafc' : '#1e293b'),
                    border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`
                  }}
                >
                  Mobile
                </button>
              </div>
              
              <div style={{ 
                display: 'flex',
                gap: '10px',
                marginBottom: '20px',
                flexWrap: 'wrap'
              }}>
                <PDFDownloadLink 
                  document={<TemplatePDF data={resumeData} templateId={selectedTemplate} color={accentColor} />} 
                  fileName={`resume_${selectedTemplate}.pdf`}
                  style={{
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '15px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    textDecoration: 'none'
                  }}
                >
                  <FiDownload /> Download PDF
                </PDFDownloadLink>
                
                <button 
                  onClick={() => exportImage('png')}
                  style={{
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '15px',
                    backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                    border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                    color: darkMode ? '#f8fafc' : '#1e293b'
                  }}
                >
                  <FiDownload /> Download PNG
                </button>
              </div>
              
              {isPDFViewerOpen && (
                <div style={{ 
                  height: '500px',
                  border: `1px solid ${darkMode ? '#334155' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  marginBottom: '20px',
                  overflow: 'hidden'
                }}>
                  <PDFViewer width="100%" height="100%">
                    <TemplatePDF data={resumeData} templateId={selectedTemplate} color={accentColor} />
                  </PDFViewer>
                </div>
              )}
              
              <div 
                ref={previewRef}
                style={{ 
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  transform: previewMode === 'mobile' ? 'scale(0.6)' : 'scale(1)',
                  transformOrigin: 'top center',
                  width: previewMode === 'mobile' ? 'calc(100% / 0.6)' : '100%',
                  margin: previewMode === 'mobile' ? '0 0 -200px 0' : '0'
                }}
              >
                <ErrorBoundary>
                  <TemplateComponent data={resumeData} color={accentColor} />
                </ErrorBoundary>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;