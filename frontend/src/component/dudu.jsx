import React, { useState } from 'react';
import { Download, User, Mail, Phone, MapPin, Plus, Trash2, Edit3 } from 'lucide-react';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';

// Replace your current downloadResume function with this implementation:
const downloadResume = async (format) => {
  setShowDownloadOptions(false);
  
  try {
    const resumeElement = document.querySelector('.preview-container');
    <div className="bg-gray-100 rounded-lg p-6 max-h-screen overflow-y-auto">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Preview</h2>
  <div className="transform scale-90 origin-top preview-container">
    {renderTemplate()}
  </div>
</div>
    
    switch(format) {
      case 'pdf':
        // Generate PDF
        const canvas = await html2canvas(resumeElement, {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm'
        });
        
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${resumeData.personalInfo.name}-resume.pdf`);
        break;
        
      case 'docs':
        // Generate DOCX
        const docxChildren = [];
        
        // Add personal info
        docxChildren.push(
          new Paragraph({
            text: resumeData.personalInfo.name,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER
          }),
          new Paragraph({
            text: resumeData.personalInfo.title,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}`,
                size: 22
              })
            ],
            alignment: AlignmentType.CENTER
          }),
          new Paragraph({
            text: "PROFESSIONAL SUMMARY",
            heading: HeadingLevel.HEADING_3
          }),
          new Paragraph(resumeData.personalInfo.summary)
        );
        
        // Add experience
        docxChildren.push(
          new Paragraph({
            text: "WORK EXPERIENCE",
            heading: HeadingLevel.HEADING_3
          })
        );
        
        resumeData.experience.forEach(exp => {
          docxChildren.push(
            new Paragraph({
              text: exp.position,
              heading: HeadingLevel.HEADING_4
            }),
            new Paragraph({
              text: `${exp.company} | ${exp.duration}`,
              italics: true
            }),
            new Paragraph(exp.description)
          );
        });
        
        // Add education
        docxChildren.push(
          new Paragraph({
            text: "EDUCATION",
            heading: HeadingLevel.HEADING_3
          })
        );
        
        resumeData.education.forEach(edu => {
          docxChildren.push(
            new Paragraph({
              text: edu.degree,
              heading: HeadingLevel.HEADING_4
            }),
            new Paragraph({
              text: `${edu.school} | ${edu.duration}`,
              italics: true
            }),
            ...(edu.gpa ? [new Paragraph(`GPA: ${edu.gpa}`)] : [])
          );
        });
        
        // Add skills
        docxChildren.push(
          new Paragraph({
            text: "SKILLS",
            heading: HeadingLevel.HEADING_3
          }),
          new Paragraph(resumeData.skills.join(', '))
        );
        
        const doc = new Document({
          sections: [{
            properties: {},
            children: docxChildren
          }]
        });
        
        Packer.toBlob(doc).then(blob => {
          saveAs(blob, `${resumeData.personalInfo.name}-resume.docx`);
        });
        break;
        
      case 'png':
        // Generate PNG
        const pngCanvas = await html2canvas(resumeElement, {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true
        });
        
        pngCanvas.toBlob(blob => {
          saveAs(blob, `${resumeData.personalInfo.name}-resume.png`);
        }, 'image/png');
        break;
        
      default:
        // Default to JSON download
        const element = document.createElement('a');
        const file = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        element.download = `${resumeData.personalInfo.name}-resume.json`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
  } catch (error) {
    console.error('Error generating download:', error);
    alert('Error generating download. Please try again.');
  }
};


// CSS styles converted from Tailwind
const styles = `
  .resume-maker-container {
    min-height: 100vh;
    background-color: #f9fafb;
  }
    .preview-container {
  width: 210mm; /* A4 width */
  min-height: 297mm; /* A4 height */
  margin: 0 auto;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20mm;
}

@media print {
  body * {
    visibility: hidden;
  }
  .preview-container, .preview-container * {
    visibility: visible;
  }
  .preview-container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    box-shadow: none;
  }
}
  
  .container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
  
  .text-center {
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }
  
  .text-gray-600 {
    color: #4b5563;
  }
  
  .grid {
    display: grid;
  }
  
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  
  @media (min-width: 1024px) {
    .lg\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  
  .gap-8 {
    gap: 2rem;
  }
  
  .bg-white {
    background-color: #ffffff;
  }
  
  .rounded-lg {
    border-radius: 0.5rem;
  }
  
  .shadow-lg {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }
  
  .p-6 {
    padding: 1.5rem;
  }
  
  .max-h-screen {
    max-height: 100vh;
  }
  
  .overflow-y-auto {
    overflow-y: auto;
  }
  
  .flex {
    display: flex;
  }
  
  .justify-between {
    justify-content: space-between;
  }
  
  .items-center {
    align-items: center;
  }
  
  .mb-6 {
    margin-bottom: 1.5rem;
  }
  
  .text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
    color: #1f2937;
  }
  
  .bg-blue-600 {
    background-color: #2563eb;
  }
  
  .hover\\:bg-blue-700:hover {
    background-color: #1d4ed8;
  }
  
  .text-white {
    color: #ffffff;
  }
  
  .px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  
  .rounded-lg {
    border-radius: 0.5rem;
  }
  
  .gap-2 {
    gap: 0.5rem;
  }
  
  .transition-colors {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  
  .w-4 {
    width: 1rem;
  }
  
  .h-4 {
    height: 1rem;
  }
  
  .text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 500;
    color: #374151;
  }
  
  .mb-3 {
    margin-bottom: 0.75rem;
  }
  
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  .gap-2 {
    gap: 0.5rem;
  }
  
  .bg-blue-100 {
    background-color: #dbeafe;
  }
  
  .text-blue-800 {
    color: #1e40af;
  }
  
  .p-3 {
    padding: 0.75rem;
  }
  
  .text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
  }
  
  .rounded-lg {
    border-radius: 0.5rem;
  }
  
  .bg-gray-50 {
    background-color: #f9fafb;
  }
  
  .hover\\:bg-gray-100:hover {
    background-color: #f3f4f6;
  }
  
  .ring-2 {
    box-shadow: 0 0 0 2px #3b82f6;
  }
  
  .ring-blue-500 {
    --tw-ring-color: #3b82f6;
  }
  
  .transform {
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
  
  .scale-105 {
    --tw-scale-x: 1.05;
    --tw-scale-y: 1.05;
  }
  
  .space-y-3 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 0.75rem;
  }
  
  .w-full {
    width: 100%;
  }
  
  .p-3 {
    padding: 0.75rem;
  }
  
  .border {
    border-width: 1px;
    border-color: #d1d5db;
  }
  
  .border-gray-300 {
    border-color: #d1d5db;
  }
  
  .focus\\:ring-2:focus {
    box-shadow: 0 0 0 2px #3b82f6;
  }
  
  .focus\\:ring-blue-500:focus {
    --tw-ring-color: #3b82f6;
  }
  
  .focus\\:border-transparent:focus {
    border-color: transparent;
  }
  
  .h-5 {
    height: 1.25rem;
  }
  
  .w-5 {
    width: 1.25rem;
  }
  
  .gap-2 {
    gap: 0.5rem;
  }
  
  .bg-green-600 {
    background-color: #16a34a;
  }
  
  .hover\\:bg-green-700:hover {
    background-color: #15803d;
  }
  
  .px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  
  .py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
  
  .border-gray-200 {
    border-color: #e5e7eb;
  }
  
  .p-4 {
    padding: 1rem;
  }
  
  .mb-3 {
    margin-bottom: 0.75rem;
  }
  
  .text-red-600 {
    color: #dc2626;
  }
  
  .hover\\:text-red-800:hover {
    color: #991b1b;
  }
  
  .p-2 {
    padding: 0.5rem;
  }
  
  .rounded {
    border-radius: 0.25rem;
  }
  
  .textarea {
    resize: none;
  }
  
  .rows-4 {
    rows: 4;
  }
  
  .flex-1 {
    flex: 1 1 0%;
  }
  
  .bg-gray-100 {
    background-color: #f3f4f6;
  }
  
  .transform {
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
  
  .scale-90 {
    --tw-scale-x: 0.9;
    --tw-scale-y: 0.9;
  }
  
  .origin-top {
    transform-origin: top;
  }
  
  /* Modern Template Styles */
  .modern-template {
    background-color: #ffffff;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    border-radius: 0.5rem;
    padding: 2rem;
    max-width: 56rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  .border-b-4 {
    border-bottom-width: 4px;
  }
  
  .border-blue-600 {
    border-color: #2563eb;
  }
  
  .pb-6 {
    padding-bottom: 1.5rem;
  }
  
  .text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }
  
  .text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
    color: #2563eb;
    margin-bottom: 1rem;
  }
  
  .flex-wrap {
    flex-wrap: wrap;
  }
  
  .gap-4 {
    gap: 1rem;
  }
  
  .text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #4b5563;
  }
  
  .items-center {
    align-items: center;
  }
  
  .gap-1 {
    gap: 0.25rem;
  }
  
  .leading-relaxed {
    line-height: 1.625;
  }
  
  .font-semibold {
    font-weight: 600;
  }
  
  .border-l-2 {
    border-left-width: 2px;
  }
  
  .border-blue-200 {
    border-color: #bfdbfe;
  }
  
  .pl-4 {
    padding-left: 1rem;
  }
  
  .text-blue-600 {
    color: #2563eb;
  }
  
  .font-medium {
    font-weight: 500;
  }
  
  .bg-blue-100 {
    background-color: #dbeafe;
  }
  
  .text-blue-800 {
    color: #1e40af;
  }
  
  .px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  
  .py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
  
  .rounded-full {
    border-radius: 9999px;
  }
  
  /* Classic Template Styles */
  .classic-template {
    background-color: #ffffff;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    border-radius: 0.5rem;
    padding: 2rem;
    max-width: 56rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  .border-b-2 {
    border-bottom-width: 2px;
  }
  
  .border-gray-300 {
    border-color: #d1d5db;
  }
  
  .text-center {
    text-align: center;
  }
  
  .uppercase {
    text-transform: uppercase;
  }
  
  .border-b {
    border-bottom-width: 1px;
  }
  
  .border-gray-400 {
    border-color: #9ca3af;
  }
  
  .text-gray-700 {
    color: #374151;
  }
  
  /* Minimalist Template Styles */
  .minimalist-template {
    background-color: #ffffff;
    padding: 2rem;
    max-width: 56rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  .text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 300;
    color: #1f2937;
    margin-bottom: 0.25rem;
  }
  
  .text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
    color: #6b7280;
  }
  
  .justify-center {
    justify-content: center;
  }
  
  .mt-3 {
    margin-top: 0.75rem;
  }
  
  .text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
  
  .font-medium {
    font-weight: 500;
  }
  
  .tracking-wider {
    letter-spacing: 0.05em;
  }
  
  .mb-2 {
    margin-bottom: 0.5rem;
  }
  
  .mb-5 {
    margin-bottom: 1.25rem;
  }
  
  .font-normal {
    font-weight: 400;
  }
  
  .text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
  }
  
  .mt-1 {
    margin-top: 0.25rem;
  }
  
  /* Executive Template Styles */
  .executive-template {
    background-color: #ffffff;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    padding: 2rem;
    max-width: 56rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  .border-b {
    border-bottom-width: 1px;
  }
  
  .border-gray-200 {
    border-color: #e5e7eb;
  }
  
  .text-3xl {
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.25rem;
  }
  
  .text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
    color: #4b5563;
    margin-bottom: 1rem;
  }
  
  .text-gray-900 {
    color: #111827;
  }
  
  .pb-2 {
    padding-bottom: 0.5rem;
  }
  
  .italic {
    font-style: italic;
  }
  
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  
  /* Tech Template Styles */
  .tech-template {
    background-color: #111827;
    color: #f3f4f6;
    padding: 2rem;
    max-width: 56rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  .border-gray-700 {
    border-color: #374151;
  }
  
  .text-green-400 {
    color: #4ade80;
  }
  
  .text-gray-300 {
    color: #d1d5db;
  }
  
  .text-gray-400 {
    color: #9ca3af;
  }
  
  .bg-gray-800 {
    background-color: #1f2937;
  }
  
  /* Artistic Template Styles */
  .artistic-template {
    background-color: #fff1f2;
    padding: 2rem;
    max-width: 56rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  .text-4xl {
    font-size: 2.25rem;
    line-height: 2.5rem;
    font-weight: 700;
    color: #9f1239;
    margin-bottom: 0.5rem;
  }
  
  .font-serif {
    font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  }
  
  .text-rose-600 {
    color: #e11d48;
  }
  
  .text-rose-700 {
    color: #be123c;
  }
  
  .border-rose-200 {
    border-color: #fecdd3;
  }
  
  .pb-1 {
    padding-bottom: 0.25rem;
  }
  
  .text-rose-800 {
    color: #9f1239;
  }
  
  .border-rose-300 {
    border-color: #fda4af;
  }
  
  .bg-rose-200 {
    background-color: #fecdd3;
  }
  
  /* Corporate Template Styles */
  .corporate-template {
    background-color: #ffffff;
    padding: 2rem;
    max-width: 56rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  .w-1\\/3 {
    width: 33.333333%;
  }
  
  .border-r {
    border-right-width: 1px;
  }
  
  .pr-6 {
    padding-right: 1.5rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    color: #1e3a8a;
    margin-bottom: 0.25rem;
  }
  
  .text-blue-700 {
    color: #1d4ed8;
  }
  
  .space-y-3 > :not([hidden]) ~ :not([hidden]) {
    margin-top: 0.75rem;
  }
  
  .w-2\\/3 {
    width: 66.666667%;
  }
  
  .pl-6 {
    padding-left: 1.5rem;
  }
  
  .text-blue-900 {
    color: #1e3a8a;
  }
  
  /* Creative Template Styles */
  .creative-template {
    background: linear-gradient(to bottom right, #f5f3ff, #eff6ff);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    border-radius: 0.5rem;
    padding: 2rem;
    max-width: 56rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  .bg-gradient-to-r {
    background-image: linear-gradient(to right, var(--tw-gradient-stops));
  }
  
  .from-purple-600 {
    --tw-gradient-from: #9333ea;
    --tw-gradient-to: rgb(147 51 234 / 0);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
  }
  
  .to-blue-600 {
    --tw-gradient-to: #2563eb;
  }
  
  .opacity-90 {
    opacity: 0.9;
  }
  
  .text-purple-800 {
    color: #6b21a8;
  }
  
  .bg-purple-100 {
    background-color: #f3e8ff;
  }
  
  .bg-gradient-to-r-from-purple-500-to-blue-500 {
    background-image: linear-gradient(to right, #8b5cf6, #3b82f6);
  }

  /* Download options dropdown */
  .download-options {
    position: relative;
    display: inline-block;
  }

  .download-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .download-dropdown {
    position: absolute;
    right: 0;
    top: 100%;
    margin-top: 0.5rem;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    z-index: 10;
    min-width: 180px;
    overflow: hidden;
  }

  .download-option {
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #4b5563;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .download-option:hover {
    background-color: #f3f4f6;
  }

  .download-option svg {
    width: 1rem;
    height: 1rem;
  }
`;

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
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

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

  const downloadResume = (format) => {
    setShowDownloadOptions(false);
    
    switch(format) {
      case 'pdf':
        // In a real app, you would use a library like jsPDF or html2pdf to generate PDF
        alert('PDF download would be implemented here. In a real app, this would generate and download a PDF file.');
        break;
      case 'docs':
        // In a real app, you would use a library like docx to generate DOCX
        alert('DOCS download would be implemented here. In a real app, this would generate and download a Word document.');
        break;
      case 'png':
        // In a real app, you would use a library like html-to-image to generate PNG
        alert('PNG download would be implemented here. In a real app, this would generate and download a PNG image of the resume.');
        break;
      default:
        // Default to JSON download
        const element = document.createElement('a');
        const file = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'application/json' });
        element.href = URL.createObjectURL(file);
        element.download = 'resume.json';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
  };

  const toggleDownloadOptions = () => {
    setShowDownloadOptions(!showDownloadOptions);
  };

  const ModernTemplate = () => (
    <div className="modern-template">
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
    <div className="classic-template">
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
    <div className="minimalist-template">
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
    <div className="executive-template">
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
    <div className="tech-template">
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
    <div className="artistic-template">
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
    <div className="corporate-template">
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
    <div className="creative-template">
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
    <>
      <style>{styles}</style>
      <div className="resume-maker-container">
        <div className="container">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Professional Resume Builder</h1>
            <p className="text-gray-600">Create and customize your professional resume with ease</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Editor Panel */}
            <div className="bg-white rounded-lg shadow-lg p-6 max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Edit Resume</h2>
                <div className="download-options">
                  <button
                    onClick={toggleDownloadOptions}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors download-button"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  {showDownloadOptions && (
                    <div className="download-dropdown">
                      <div className="download-option" onClick={() => downloadResume('pdf')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Download PDF
                      </div>
                      <div className="download-option" onClick={() => downloadResume('docs')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download DOCS
                      </div>
                      <div className="download-option" onClick={() => downloadResume('png')}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Download PNG
                      </div>
                    </div>
                  )}
                </div>
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
    </>
  );
};

export default ResumeMaker;