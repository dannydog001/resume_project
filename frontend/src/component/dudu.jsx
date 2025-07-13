import React, { useState } from 'react';
import { Download, User, Mail, Phone, MapPin, Plus, Trash2, Edit3 } from 'lucide-react';

const ResumeMaker = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: 'John Doe',
      title: 'Software Developer',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      summary: 'Experienced software developer with 5+ years in full-stack development. Passionate about creating efficient, scalable solutions and leading development teams.'
    },
    experience: [
      {
        id: 1,
        position: 'Senior Software Developer',
        company: 'Tech Solutions Inc.',
        duration: 'Jan 2022 - Present',
        description: 'Led development of scalable web applications using React and Node.js. Managed team of 4 developers and improved deployment efficiency by 40%.'
      },
      {
        id: 2,
        position: 'Frontend Developer',
        company: 'Digital Innovations',
        duration: 'Jun 2020 - Dec 2021',
        description: 'Developed responsive web applications and collaborated with UX designers to implement user-friendly interfaces.'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of California, Berkeley',
        duration: '2016 - 2020',
        gpa: '3.8/4.0'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'MongoDB', 'Docker', 'AWS'],
    template: 'modern'
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      position: '',
      company: '',
      duration: '',
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const deleteExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      degree: '',
      school: '',
      duration: '',
      gpa: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const deleteEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, '']
    }));
  };

  const updateSkill = (index, value) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => i === index ? value : skill)
    }));
  };

  const deleteSkill = (index) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const downloadResume = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = 'resume.json';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const ModernTemplate = () => (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
      <div className="border-b-4 border-blue-600 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{resumeData.personalInfo.name}</h1>
        <h2 className="text-xl text-blue-600 mb-4">{resumeData.personalInfo.title}</h2>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            {resumeData.personalInfo.email}
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            {resumeData.personalInfo.phone}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {resumeData.personalInfo.location}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Professional Summary</h3>
        <p className="text-gray-600 leading-relaxed">{resumeData.personalInfo.summary}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Work Experience</h3>
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="mb-4 border-l-2 border-blue-200 pl-4">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-semibold text-gray-800">{exp.position}</h4>
              <span className="text-sm text-gray-500">{exp.duration}</span>
            </div>
            <p className="text-blue-600 font-medium mb-2">{exp.company}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Education</h3>
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="mb-3">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
              <span className="text-sm text-gray-500">{edu.duration}</span>
            </div>
            <p className="text-blue-600 font-medium">{edu.school}</p>
            {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const ClassicTemplate = () => (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
      <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{resumeData.personalInfo.name}</h1>
        <h2 className="text-lg text-gray-600 mb-4">{resumeData.personalInfo.title}</h2>
        <div className="text-sm text-gray-600">
          {resumeData.personalInfo.email} | {resumeData.personalInfo.phone} | {resumeData.personalInfo.location}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3 uppercase border-b border-gray-400">Summary</h3>
        <p className="text-gray-600 leading-relaxed">{resumeData.personalInfo.summary}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase border-b border-gray-400">Experience</h3>
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-gray-800">{exp.position}</h4>
              <span className="text-sm text-gray-500">{exp.duration}</span>
            </div>
            <p className="text-gray-700 font-medium mb-2">{exp.company}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase border-b border-gray-400">Education</h3>
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="mb-3">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-bold text-gray-800">{edu.degree}</h4>
              <span className="text-sm text-gray-500">{edu.duration}</span>
            </div>
            <p className="text-gray-700 font-medium">{edu.school}</p>
            {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3 uppercase border-b border-gray-400">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <span key={index} className="text-gray-700 text-sm">{skill}{index < resumeData.skills.length - 1 ? ',' : ''}</span>
          ))}
        </div>
      </div>
    </div>
  );

  const MinimalistTemplate = () => (
  <div className="bg-white p-8 max-w-4xl mx-auto">
    <div className="text-center mb-8">
      <h1 className="text-3xl font-light text-gray-800 mb-1">{resumeData.personalInfo.name}</h1>
      <h2 className="text-lg text-gray-500">{resumeData.personalInfo.title}</h2>
      <div className="flex justify-center gap-4 mt-3 text-sm text-gray-500">
        <span>{resumeData.personalInfo.email}</span>
        <span>•</span>
        <span>{resumeData.personalInfo.phone}</span>
        <span>•</span>
        <span>{resumeData.personalInfo.location}</span>
      </div>
    </div>

    <div className="mb-8">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Summary</h3>
      <p className="text-gray-600 leading-relaxed">{resumeData.personalInfo.summary}</p>
    </div>

    <div className="mb-8">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Experience</h3>
      {resumeData.experience.map((exp) => (
        <div key={exp.id} className="mb-5">
          <div className="flex justify-between items-start">
            <h4 className="font-normal text-gray-800">{exp.position}</h4>
            <span className="text-xs text-gray-500">{exp.duration}</span>
          </div>
          <p className="text-gray-600 text-sm mb-2">{exp.company}</p>
          <p className="text-gray-500 text-sm leading-relaxed">{exp.description}</p>
        </div>
      ))}
    </div>

    <div className="mb-8">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Education</h3>
      {resumeData.education.map((edu) => (
        <div key={edu.id} className="mb-4">
          <div className="flex justify-between items-start">
            <h4 className="font-normal text-gray-800">{edu.degree}</h4>
            <span className="text-xs text-gray-500">{edu.duration}</span>
          </div>
          <p className="text-gray-600 text-sm">{edu.school}</p>
          {edu.gpa && <p className="text-gray-500 text-xs mt-1">GPA: {edu.gpa}</p>}
        </div>
      ))}
    </div>

    <div>
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Skills</h3>
      <div className="flex flex-wrap gap-2">
        {resumeData.skills.map((skill, index) => (
          <span key={index} className="text-gray-600 text-sm">
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const ExecutiveTemplate = () => (
  <div className="bg-white shadow-sm p-8 max-w-4xl mx-auto">
    <div className="border-b border-gray-200 pb-6 mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">{resumeData.personalInfo.name}</h1>
      <h2 className="text-xl text-gray-600 mb-4">{resumeData.personalInfo.title}</h2>
      <div className="flex gap-4 text-sm text-gray-500">
        <span>{resumeData.personalInfo.email}</span>
        <span>|</span>
        <span>{resumeData.personalInfo.phone}</span>
        <span>|</span>
        <span>{resumeData.personalInfo.location}</span>
      </div>
    </div>

    <div className="mb-8">
      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">EXECUTIVE PROFILE</h3>
      <p className="text-gray-600 leading-relaxed">{resumeData.personalInfo.summary}</p>
    </div>

    <div className="mb-8">
      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">PROFESSIONAL EXPERIENCE</h3>
      {resumeData.experience.map((exp) => (
        <div key={exp.id} className="mb-5">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-bold text-gray-900">{exp.position}</h4>
            <span className="text-sm text-gray-500">{exp.duration}</span>
          </div>
          <p className="text-gray-700 italic mb-2">{exp.company}</p>
          <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
        </div>
      ))}
    </div>

    <div className="mb-8">
      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">EDUCATION</h3>
      {resumeData.education.map((edu) => (
        <div key={edu.id} className="mb-3">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-bold text-gray-900">{edu.degree}</h4>
            <span className="text-sm text-gray-500">{edu.duration}</span>
          </div>
          <p className="text-gray-700 italic">{edu.school}</p>
          {edu.gpa && <p className="text-gray-600 text-sm mt-1">GPA: {edu.gpa}</p>}
        </div>
      ))}
    </div>

    <div>
      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-3">CORE COMPETENCIES</h3>
      <div className="grid grid-cols-3 gap-2">
        {resumeData.skills.map((skill, index) => (
          <span key={index} className="text-gray-600 text-sm">
            • {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const TechTemplate = () => (
  <div className="bg-gray-900 text-gray-100 p-8 max-w-4xl mx-auto">
    <div className="border-b border-gray-700 pb-6 mb-6">
      <h1 className="text-4xl font-bold text-green-400 mb-2">{resumeData.personalInfo.name}</h1>
      <h2 className="text-xl text-gray-300 mb-4">{resumeData.personalInfo.title}</h2>
      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <Mail className="w-4 h-4" />
          {resumeData.personalInfo.email}
        </div>
        <div className="flex items-center gap-1">
          <Phone className="w-4 h-4" />
          {resumeData.personalInfo.phone}
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {resumeData.personalInfo.location}
        </div>
      </div>
    </div>

    <div className="mb-8">
      <h3 className="text-xl font-bold text-green-400 mb-3">SUMMARY</h3>
      <p className="text-gray-300 leading-relaxed">{resumeData.personalInfo.summary}</p>
    </div>

    <div className="mb-8">
      <h3 className="text-xl font-bold text-green-400 mb-3">EXPERIENCE</h3>
      {resumeData.experience.map((exp) => (
        <div key={exp.id} className="mb-5">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-bold text-gray-100">{exp.position}</h4>
            <span className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded">{exp.duration}</span>
          </div>
          <p className="text-green-400 mb-2">{exp.company}</p>
          <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
        </div>
      ))}
    </div>

    <div className="mb-8">
      <h3 className="text-xl font-bold text-green-400 mb-3">EDUCATION</h3>
      {resumeData.education.map((edu) => (
        <div key={edu.id} className="mb-3">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-bold text-gray-100">{edu.degree}</h4>
            <span className="text-sm text-gray-400 bg-gray-800 px-2 py-1 rounded">{edu.duration}</span>
          </div>
          <p className="text-green-400">{edu.school}</p>
          {edu.gpa && <p className="text-gray-400 text-sm mt-1">GPA: {edu.gpa}</p>}
        </div>
      ))}
    </div>

    <div>
      <h3 className="text-xl font-bold text-green-400 mb-3">TECHNICAL SKILLS</h3>
      <div className="grid grid-cols-3 gap-3">
        {resumeData.skills.map((skill, index) => (
          <div key={index} className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            <span className="text-gray-300 text-sm">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ArtisticTemplate = () => (
  <div className="bg-rose-50 p-8 max-w-4xl mx-auto">
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-rose-800 mb-2">{resumeData.personalInfo.name}</h1>
      <h2 className="text-xl font-serif italic text-rose-600 mb-4">{resumeData.personalInfo.title}</h2>
      <div className="flex justify-center gap-4 text-sm text-rose-700">
        <span>{resumeData.personalInfo.email}</span>
        <span>•</span>
        <span>{resumeData.personalInfo.phone}</span>
        <span>•</span>
        <span>{resumeData.personalInfo.location}</span>
      </div>
    </div>

    <div className="mb-8">
      <h3 className="text-lg font-serif italic text-rose-700 border-b border-rose-200 pb-1 mb-3">Profile</h3>
      <p className="text-rose-800 leading-relaxed">{resumeData.personalInfo.summary}</p>
    </div>

    <div className="mb-8">
      <h3 className="text-lg font-serif italic text-rose-700 border-b border-rose-200 pb-1 mb-3">Experience</h3>
      {resumeData.experience.map((exp) => (
        <div key={exp.id} className="mb-5 pl-4 border-l-2 border-rose-300">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-bold text-rose-800">{exp.position}</h4>
            <span className="text-sm text-rose-600">{exp.duration}</span>
          </div>
          <p className="text-rose-700 italic mb-2">{exp.company}</p>
          <p className="text-rose-800 text-sm leading-relaxed">{exp.description}</p>
        </div>
      ))}
    </div>

    <div className="mb-8">
      <h3 className="text-lg font-serif italic text-rose-700 border-b border-rose-200 pb-1 mb-3">Education</h3>
      {resumeData.education.map((edu) => (
        <div key={edu.id} className="mb-3 pl-4 border-l-2 border-rose-300">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-bold text-rose-800">{edu.degree}</h4>
            <span className="text-sm text-rose-600">{edu.duration}</span>
          </div>
          <p className="text-rose-700 italic">{edu.school}</p>
          {edu.gpa && <p className="text-rose-800 text-sm mt-1">GPA: {edu.gpa}</p>}
        </div>
      ))}
    </div>

    <div>
      <h3 className="text-lg font-serif italic text-rose-700 border-b border-rose-200 pb-1 mb-3">Skills</h3>
      <div className="flex flex-wrap gap-3">
        {resumeData.skills.map((skill, index) => (
          <span key={index} className="bg-rose-200 text-rose-800 px-3 py-1 rounded-full text-sm">
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const CorporateTemplate = () => (
  <div className="bg-white p-8 max-w-4xl mx-auto">
    <div className="flex items-start mb-8">
      <div className="w-1/3 border-r border-gray-200 pr-6">
        <h1 className="text-2xl font-bold text-blue-900 mb-1">{resumeData.personalInfo.name}</h1>
        <h2 className="text-lg text-blue-700 mb-4">{resumeData.personalInfo.title}</h2>
        
        <div className="space-y-3">
          <div>
            <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">Contact</h3>
            <p className="text-sm text-gray-600">{resumeData.personalInfo.email}</p>
            <p className="text-sm text-gray-600">{resumeData.personalInfo.phone}</p>
            <p className="text-sm text-gray-600">{resumeData.personalInfo.location}</p>
          </div>
          
          <div>
            <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1">Skills</h3>
            <ul className="space-y-1">
              {resumeData.skills.map((skill, index) => (
                <li key={index} className="text-sm text-gray-600">• {skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="w-2/3 pl-6">
        <div className="mb-6">
          <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Profile</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{resumeData.personalInfo.summary}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Experience</h3>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-bold text-gray-800">{exp.position}</h4>
                <span className="text-xs text-gray-500">{exp.duration}</span>
              </div>
              <p className="text-xs text-blue-700 mb-1">{exp.company}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
        
        <div>
          <h3 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">Education</h3>
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-bold text-gray-800">{edu.degree}</h4>
                <span className="text-xs text-gray-500">{edu.duration}</span>
              </div>
              <p className="text-xs text-blue-700">{edu.school}</p>
              {edu.gpa && <p className="text-xs text-gray-600 mt-1">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

  const CreativeTemplate = () => (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg mb-6">
        <h1 className="text-4xl font-bold mb-2">{resumeData.personalInfo.name}</h1>
        <h2 className="text-xl opacity-90 mb-4">{resumeData.personalInfo.title}</h2>
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            {resumeData.personalInfo.email}
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            {resumeData.personalInfo.phone}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {resumeData.personalInfo.location}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-purple-800 mb-3">Professional Summary</h3>
        <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-purple-800 mb-4">Work Experience</h3>
        {resumeData.experience.map((exp) => (
          <div key={exp.id} className="mb-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-semibold text-gray-800">{exp.position}</h4>
              <span className="text-sm text-gray-500 bg-purple-100 px-2 py-1 rounded">{exp.duration}</span>
            </div>
            <p className="text-purple-600 font-medium mb-2">{exp.company}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-purple-800 mb-4">Education</h3>
        {resumeData.education.map((edu) => (
          <div key={edu.id} className="mb-3 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-semibold text-gray-800">{edu.degree}</h4>
              <span className="text-sm text-gray-500 bg-purple-100 px-2 py-1 rounded">{edu.duration}</span>
            </div>
            <p className="text-purple-600 font-medium">{edu.school}</p>
            {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-purple-800 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {resumeData.skills.map((skill, index) => (
            <span key={index} className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate />;
      case 'classic':
        return <ClassicTemplate />;
      case 'creative':
        return <CreativeTemplate />;
      case 'minimalist':
        return <MinimalistTemplate />;
      case 'executive':
        return <ExecutiveTemplate />;
      case 'tech':
        return <TechTemplate />;
      case 'artistic':
        return <ArtisticTemplate />;
      case 'corporate':
        return <CorporateTemplate />;
      default:
        return <ModernTemplate />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Professional Resume Builder</h1>
          <p className="text-gray-600">Create and customize your professional resume with ease</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Edit Resume</h2>
              <button
                onClick={downloadResume}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>

            {/* Template Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Choose Template</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'modern', name: 'Modern', color: 'bg-blue-100 text-blue-800' },
                  { id: 'classic', name: 'Classic', color: 'bg-gray-100 text-gray-800' },
                  { id: 'creative', name: 'Creative', color: 'bg-purple-100 text-purple-800' },
                  { id: 'minimalist', name: 'Minimalist', color: 'bg-green-100 text-green-800' },
                  { id: 'executive', name: 'Executive', color: 'bg-gray-800 text-white' },
                  { id: 'tech', name: 'Tech', color: 'bg-green-900 text-green-300' },
                  { id: 'artistic', name: 'Artistic', color: 'bg-rose-100 text-rose-800' },
                  { id: 'corporate', name: 'Corporate', color: 'bg-blue-900 text-blue-100' }
                ].map(template => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      selectedTemplate === template.id 
                        ? `${template.color} ring-2 ring-blue-500 transform scale-105` 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {template.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={resumeData.personalInfo.name}
                  onChange={(e) => updatePersonalInfo('name', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Professional Title"
                  value={resumeData.personalInfo.title}
                  onChange={(e) => updatePersonalInfo('title', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={resumeData.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={resumeData.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <textarea
                  placeholder="Professional Summary"
                  value={resumeData.personalInfo.summary}
                  onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Work Experience */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-700">Work Experience</h3>
                <button
                  onClick={addExperience}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="border border-gray-200 rounded-lg p-4 mb-3">
                  <div className="flex justify-between items-start mb-3">
                    <Edit3 className="w-4 h-4 text-gray-400 mt-1" />
                    <button
                      onClick={() => deleteExperience(exp.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Position"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., Jan 2020 - Dec 2021)"
                      value={exp.duration}
                      onChange={(e) => updateExperience(exp.id, 'duration', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Job Description"
                      value={exp.description}
                      onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                      rows={3}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-700">Education</h3>
                <button
                  onClick={addEducation}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="border border-gray-200 rounded-lg p-4 mb-3">
                  <div className="flex justify-between items-start mb-3">
                    <Edit3 className="w-4 h-4 text-gray-400 mt-1" />
                    <button
                      onClick={() => deleteEducation(edu.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="School/University"
                      value={edu.school}
                      onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Duration (e.g., 2016 - 2020)"
                      value={edu.duration}
                      onChange={(e) => updateEducation(edu.id, 'duration', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="GPA (optional)"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-700">Skills</h3>
                <button
                  onClick={addSkill}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Skill"
                      value={skill}
                      onChange={(e) => updateSkill(index, e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => deleteSkill(index)}
                      className="text-red-600 hover:text-red-800 transition-colors p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="bg-gray-100 rounded-lg p-6 max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Preview</h2>
            <div className="transform scale-90 origin-top">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeMaker;