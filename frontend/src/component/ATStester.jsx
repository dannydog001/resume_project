
import React, { useState, useCallback, useEffect } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Star, Download, Eye, XCircle } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// Set workerSrc to CDN as a string URL


// Set PDF.js worker path
const setPdfWorker = async () => {
  try {
    // Try CDN first
   pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

    
    // Verify the worker is actually available
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = pdfjsLib.GlobalWorkerOptions.workerSrc;
      script.onload = resolve;
      script.onerror = () => {
        document.head.removeChild(script);
        reject(new Error('CDN worker failed to load'));
      };
      document.head.appendChild(script);
    });
  } catch (error) {
    console.warn('Failed to load PDF.js worker from CDN, falling back to local worker');
    try {
      // Fallback to local worker
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url
      ).toString();
    } catch (e) {
      console.error('Failed to set PDF.js worker:', e);
      throw new Error('PDF.js worker could not be initialized');
    }
  }
};

const ATSResumeTester = () => {
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [viewMode, setViewMode] = useState('upload');
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState(null);
  const [pdfWorkerInitialized, setPdfWorkerInitialized] = useState(false);

  // Initialize PDF worker on component mount
  useEffect(() => {
    setPdfWorker()
      .then(() => setPdfWorkerInitialized(true))
      .catch(err => {
        console.error('PDF worker initialization error:', err);
        setError('Failed to initialize PDF processor. Please refresh the page or try again later.');
      });
  }, []);

  // Enhanced PDF text extraction
  const extractTextFromPdf = async (file) => {
    if (!pdfWorkerInitialized) {
      throw new Error('PDF processor is not ready yet. Please try again.');
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument(arrayBuffer);
      const pdf = await loadingTask.promise;
      
      let fullText = '';
      
      // Extract text from each page
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map(item => item.str)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
        
        fullText += pageText + '\n\n';
      }
      
      return fullText;
    } catch (err) {
      console.error('PDF extraction error:', err);
      let errorMsg = 'Failed to extract text from PDF. ';
      
      if (err.message.includes('password')) {
        errorMsg += 'The PDF appears to be password protected.';
      } else if (err.message.includes('Invalid PDF')) {
        errorMsg += 'The PDF file appears to be corrupted or invalid.';
      } else {
        errorMsg += 'Please ensure the file is valid and try again.';
      }
      
      setError(errorMsg);
      throw err;
    }
  };

  const extractTextFromFile = async (file) => {
    const fileType = file.type;
    const fileName = file.name.toLowerCase();
    setFileName(file.name);
    setError(null);

    try {
      // For plain text files
      if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
        return await file.text();
      }

      // For PDF files
      if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
        return await extractTextFromPdf(file);
      }

      // For Word documents
      if (fileType === 'application/msword' || 
          fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          fileName.endsWith('.doc') || 
          fileName.endsWith('.docx')) {
        // Basic text extraction for DOCX
        const arrayBuffer = await file.arrayBuffer();
        const textDecoder = new TextDecoder('utf-8');
        const text = textDecoder.decode(arrayBuffer);
        return text.replace(/[^\x20-\x7E]/g, ' ').replace(/\s+/g, ' ').trim();
      }

      // Fallback for other file types
      return await file.text();
    } catch (err) {
      console.error('File extraction error:', err);
      let errorMsg = 'Failed to extract text from file. ';
      
      if (err.message.includes('PDF')) {
        errorMsg += 'The PDF might be password protected or corrupted.';
      } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
        errorMsg += 'For Word documents, please try converting to PDF for better results.';
      } else {
        errorMsg += 'Please try a PDF, Word document, or plain text file.';
      }
      
      setError(errorMsg);
      throw err;
    }
  };

  // Mock AI analysis function
  const analyzeResume = useCallback((text) => {
    // Simulate AI analysis delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const keywords = ['javascript', 'react', 'node.js', 'python', 'sql', 'aws', 'git', 'agile', 'api', 'database'];
        const foundKeywords = keywords.filter(keyword => 
          text.toLowerCase().includes(keyword.toLowerCase())
        );

        const hasContact = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/.test(text) || /@/.test(text);
        const hasExperience = /experience|work|employment/i.test(text);
        const hasEducation = /education|degree|university|college/i.test(text);
        const hasSkills = /skills|technologies|proficient/i.test(text);
        
        const wordCount = text.split(/\s+/).length;
        const hasProperLength = wordCount >= 200 && wordCount <= 800;
        
        const hasActionVerbs = /\b(achieved|developed|implemented|managed|led|created|improved|increased|reduced|optimized)\b/i.test(text);
        const hasQuantifiableResults = /\b\d+%|\$\d+|\d+\s*(years?|months?|people|projects?|clients?)\b/i.test(text);
        
        const formatScore = Math.min(100, Math.max(0, 
          (hasContact ? 20 : 0) +
          (hasExperience ? 20 : 0) +
          (hasEducation ? 15 : 0) +
          (hasSkills ? 15 : 0) +
          (hasProperLength ? 15 : 0) +
          (hasActionVerbs ? 10 : 0) +
          (hasQuantifiableResults ? 5 : 0)
        ));

        const keywordScore = Math.min(100, (foundKeywords.length / keywords.length) * 100);
        const overallScore = Math.round((formatScore + keywordScore) / 2);

        resolve({
          overallScore,
          formatScore,
          keywordScore,
          foundKeywords,
          missingKeywords: keywords.filter(k => !foundKeywords.includes(k)),
          sections: {
            contact: hasContact,
            experience: hasExperience,
            education: hasEducation,
            skills: hasSkills
          },
          recommendations: [
            !hasContact && "Add contact information including phone number and email",
            !hasExperience && "Include work experience section with job descriptions",
            !hasEducation && "Add education section with degrees and institutions",
            !hasSkills && "Include a skills section highlighting relevant technologies",
            !hasActionVerbs && "Use more action verbs like 'achieved', 'developed', 'implemented'",
            !hasQuantifiableResults && "Include quantifiable results and metrics in achievements",
            !hasProperLength && `Optimize resume length (current: ${wordCount} words, ideal: 200-800 words)`,
            foundKeywords.length < 3 && "Include more industry-relevant keywords"
          ].filter(Boolean),
          wordCount,
          readabilityScore: Math.min(100, Math.max(0, 100 - (text.split('.').length * 2))),
          atsCompatibility: {
            parsing: formatScore > 70,
            keywords: keywordScore > 50,
            structure: hasContact && hasExperience && hasSkills,
            formatting: true
          }
        });
      }, 2000);
    });
  }, []);

  const handleFileUpload = useCallback(async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    // Check file size (5MB max)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (uploadedFile.size > MAX_FILE_SIZE) {
      setError('File size exceeds 5MB limit. Please upload a smaller file.');
      return;
    }

    setFile(uploadedFile);
    setIsAnalyzing(true);
    setError(null);
    
    try {
      if (!pdfWorkerInitialized && (uploadedFile.type === 'application/pdf' || uploadedFile.name.toLowerCase().endsWith('.pdf'))) {
        throw new Error('PDF processor is still initializing. Please try again in a moment.');
      }

      const text = await extractTextFromFile(uploadedFile);
      if (!text || text.trim().length === 0) {
        throw new Error('The file appears to be empty or we couldn\'t extract any text.');
      }
      
      setResumeText(text);
      const result = await analyzeResume(text);
      setAnalysis(result);
      setViewMode('results');
    } catch (error) {
      console.error('Error processing file:', error);
      if (!error.message.startsWith('Failed to extract')) {
        setError(error.message || 'An unknown error occurred while processing your file.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  }, [analyzeResume, pdfWorkerInitialized]);

  const ScoreCircle = ({ score, size = 'large' }) => {
    const radius = size === 'large' ? 45 : 30;
    const strokeWidth = size === 'large' ? 8 : 5;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    
    const getColor = (score) => {
      if (score >= 80) return '#10b981';
      if (score >= 60) return '#f59e0b';
      return '#ef4444';
    };

    return (
      <div style={{ position: 'relative' }}>
        <svg 
          width={radius * 2 + 20} 
          height={radius * 2 + 20} 
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx={radius + 10}
            cy={radius + 10}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={radius + 10}
            cy={radius + 10}
            r={radius}
            stroke={getColor(score)}
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            fill="none"
            strokeLinecap="round"
            style={{ transition: 'all 1000ms ease-out' }}
          />
        </svg>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <span style={{ 
            fontWeight: 'bold', 
            fontSize: size === 'large' ? '1.5rem' : '1.125rem', 
            color: '#1f2937' 
          }}>
            {score}%
          </span>
        </div>
      </div>
    );
  };

  const ScoreCard = ({ title, score, description, icon: Icon }) => (
    <div style={{ 
      backgroundColor: 'white', 
      borderRadius: '0.75rem', 
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
      padding: '1.5rem', 
      border: '1px solid #e5e7eb',
      transition: 'box-shadow 0.3s, border-color 0.3s'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginBottom: '1rem' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Icon style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937' }}>{title}</h3>
        </div>
        <ScoreCircle score={score} size="small" />
      </div>
      <p style={{ color: '#4b5563', fontSize: '0.875rem' }}>{description}</p>
    </div>
  );

  if (viewMode === 'upload') {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)', 
        padding: '1rem',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}>
        <div style={{ 
          maxWidth: '56rem', 
          marginLeft: 'auto', 
          marginRight: 'auto' 
        }}>
          {/* Error display */}
          {error && (
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle style={{ width: '1.25rem', height: '1.25rem' }} />
              <span>{error}</span>
            </div>
          )}

          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ 
              fontSize: '2.25rem', 
              fontWeight: 'bold', 
              color: '#1f2937', 
              marginBottom: '1rem' 
            }}>
              ATS Resume Tester
            </h1>
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#4b5563', 
              maxWidth: '42rem', 
              marginLeft: 'auto', 
              marginRight: 'auto' 
            }}>
              Upload your resume and get instant AI-powered feedback on ATS compatibility, 
              keyword optimization, and formatting suggestions
            </p>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '1.5rem', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
            padding: '2rem', 
            marginBottom: '2rem' 
          }}>
            <div style={{ 
              display: 'grid', 
              gap: '2rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
            }}>
              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: '#1f2937', 
                  marginBottom: '1rem' 
                }}>
                  Upload Resume
                </h2>
                <div style={{ 
                  border: '2px dashed #d1d5db', 
                  borderRadius: '0.75rem', 
                  padding: '2rem', 
                  textAlign: 'center',
                  transition: 'border-color 0.3s'
                }}>
                  <Upload style={{ 
                    width: '3rem', 
                    height: '3rem', 
                    color: '#9ca3af', 
                    marginLeft: 'auto', 
                    marginRight: 'auto', 
                    marginBottom: '1rem' 
                  }} />
                  <p style={{ color: '#4b5563', marginBottom: '1rem' }}>
                    Drop your resume here or click to browse
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                    id="resume-upload"
                    disabled={!pdfWorkerInitialized}
                  />
                  <label
                    htmlFor="resume-upload"
                    style={{ 
                      backgroundColor: !pdfWorkerInitialized ? '#9ca3af' : '#2563eb', 
                      color: 'white', 
                      padding: '0.75rem 1.5rem', 
                      borderRadius: '0.5rem', 
                      cursor: !pdfWorkerInitialized ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.3s',
                      display: 'inline-block'
                    }}
                  >
                    {!pdfWorkerInitialized ? 'Initializing...' : 'Choose File'}
                  </label>
                  {file && (
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: '#059669', 
                      marginTop: '0.5rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      <CheckCircle style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
                      {file.name} uploaded
                    </p>
                  )}
                  <p style={{ 
                    fontSize: '0.75rem', 
                    color: '#6b7280', 
                    marginTop: '0.5rem' 
                  }}>
                    Supported formats: PDF, DOC, DOCX, TXT (max 5MB)
                  </p>
                  {!pdfWorkerInitialized && (
                    <p style={{ 
                      fontSize: '0.75rem', 
                      color: '#d97706', 
                      marginTop: '0.5rem' 
                    }}>
                      PDF processing is initializing, please wait...
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h2 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: '#1f2937', 
                  marginBottom: '1rem' 
                }}>
                  Or Paste Resume Text
                </h2>
                <textarea
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your resume content here..."
                  style={{ 
                    width: '100%', 
                    height: '12rem', 
                    padding: '1rem', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '0.5rem',
                    resize: 'none'
                  }}
                />
                <button
                  onClick={async () => {
                    if (!resumeText.trim()) return;
                    setIsAnalyzing(true);
                    setError(null);
                    try {
                      const result = await analyzeResume(resumeText);
                      setAnalysis(result);
                      setViewMode('results');
                      setFileName('Pasted Text');
                    } catch (error) {
                      setError('An error occurred while analyzing the pasted text.');
                    } finally {
                      setIsAnalyzing(false);
                    }
                  }}
                  style={{ 
                    marginTop: '1rem', 
                    width: '100%', 
                    background: !resumeText.trim() || isAnalyzing ? 
                      'linear-gradient(to right, #9ca3af, #9ca3af)' : 
                      'linear-gradient(to right, #2563eb, #7c3aed)', 
                    color: 'white', 
                    padding: '0.75rem 1.5rem', 
                    borderRadius: '0.5rem', 
                    fontWeight: '600',
                    transition: 'all 0.3s',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    opacity: !resumeText.trim() ? '0.5' : '1',
                    cursor: !resumeText.trim() ? 'not-allowed' : 'pointer'
                  }}
                  disabled={!resumeText.trim() || isAnalyzing}
                >
                  {isAnalyzing ? (
                    'Analyzing...'
                  ) : (
                    <>
                      <FileText style={{ width: '1.25rem', height: '1.25rem', display: 'inline', marginRight: '0.5rem' }} />
                      Analyze Resume
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '0.75rem', 
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
            padding: '1.5rem' 
          }}>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              color: '#1f2937', 
              marginBottom: '1rem' 
            }}>
              What We Check
            </h3>
            <div style={{ 
              display: 'grid', 
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
            }}>
              <div style={{ 
                textAlign: 'center', 
                padding: '1rem', 
                borderRadius: '0.5rem', 
                backgroundColor: '#eff6ff'
              }}>
                <CheckCircle style={{ 
                  width: '2rem', 
                  height: '2rem', 
                  color: '#10b981', 
                  marginLeft: 'auto', 
                  marginRight: 'auto', 
                  marginBottom: '0.5rem' 
                }} />
                <h4 style={{ fontWeight: '600', color: '#1f2937' }}>ATS Compatibility</h4>
                <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Format and parsing optimization</p>
              </div>
              <div style={{ 
                textAlign: 'center', 
                padding: '1rem', 
                borderRadius: '0.5rem', 
                backgroundColor: '#fffbeb'
              }}>
                <Star style={{ 
                  width: '2rem', 
                  height: '2rem', 
                  color: '#f59e0b', 
                  marginLeft: 'auto', 
                  marginRight: 'auto', 
                  marginBottom: '0.5rem' 
                }} />
                <h4 style={{ fontWeight: '600', color: '#1f2937' }}>Keyword Analysis</h4>
                <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Industry-relevant keyword density</p>
              </div>
              <div style={{ 
                textAlign: 'center', 
                padding: '1rem', 
                borderRadius: '0.5rem', 
                backgroundColor: '#f5f3ff'
              }}>
                <Eye style={{ 
                  width: '2rem', 
                  height: '2rem', 
                  color: '#3b82f6', 
                  marginLeft: 'auto', 
                  marginRight: 'auto', 
                  marginBottom: '0.5rem' 
                }} />
                <h4 style={{ fontWeight: '600', color: '#1f2937' }}>Content Quality</h4>
                <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Structure and readability scoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)', 
      padding: '1rem',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <div style={{ 
        maxWidth: '72rem', 
        marginLeft: 'auto', 
        marginRight: 'auto' 
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '1.875rem', 
              fontWeight: 'bold', 
              color: '#1f2937' 
            }}>
              Resume Analysis Results
            </h1>
            {fileName && <p style={{ 
              color: '#4b5563', 
              fontSize: '0.875rem', 
              marginTop: '0.25rem' 
            }}>
              Analyzed file: {fileName}
            </p>}
          </div>
          <button
            onClick={() => {
              setViewMode('upload');
              setFile(null);
              setResumeText('');
              setAnalysis(null);
              setError(null);
            }}
            style={{ 
              backgroundColor: '#2563eb', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              borderRadius: '0.5rem',
              transition: 'background-color 0.3s',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Upload style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
            Test Another Resume
          </button>
        </div>

        {isAnalyzing ? (
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '0.75rem', 
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
            padding: '3rem', 
            textAlign: 'center' 
          }}>
            <div style={{ 
              animation: 'spin 1s linear infinite', 
              borderRadius: '9999px', 
              width: '4rem', 
              height: '4rem', 
              borderBottom: '2px solid #2563eb', 
              marginLeft: 'auto', 
              marginRight: 'auto', 
              marginBottom: '1rem' 
            }}></div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#1f2937', 
              marginBottom: '0.5rem' 
            }}>
              Analyzing Your Resume
            </h2>
            <p style={{ color: '#4b5563' }}>Our AI is checking ATS compatibility, keywords, and formatting...</p>
          </div>
        ) : analysis ? (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {/* Overall Score */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '0.75rem', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
              padding: '2rem', 
              textAlign: 'center' 
            }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                color: '#1f2937', 
                marginBottom: '1.5rem' 
              }}>
                Overall ATS Score
              </h2>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ScoreCircle score={analysis.overallScore} />
              </div>
              <p style={{ 
                color: '#4b5563', 
                marginTop: '1rem', 
                fontSize: '1.125rem' 
              }}>
                {analysis.overallScore >= 80 ? (
                  <span style={{ color: '#059669', fontWeight: '500' }}>Excellent! Your resume is highly ATS-compatible.</span>
                ) : analysis.overallScore >= 60 ? (
                  <span style={{ color: '#d97706', fontWeight: '500' }}>Good! Some improvements can boost your ATS score.</span>
                ) : (
                  <span style={{ color: '#dc2626', fontWeight: '500' }}>Needs improvement. Follow our recommendations to optimize for ATS.</span>
                )}
              </p>
            </div>

            {/* Detailed Scores */}
            <div style={{ 
              display: 'grid', 
              gap: '1.5rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
            }}>
              <ScoreCard
                title="Format & Structure"
                score={analysis.formatScore}
                description="How well your resume is structured for ATS parsing"
                icon={FileText}
              />
              <ScoreCard
                title="Keyword Optimization"
                score={analysis.keywordScore}
                description="Relevance and density of industry keywords"
                icon={Star}
              />
            </div>

            {/* ATS Compatibility Check */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '0.75rem', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
              padding: '1.5rem' 
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                color: '#1f2937', 
                marginBottom: '1rem' 
              }}>
                ATS Compatibility Check
              </h3>
              <div style={{ 
                display: 'grid', 
                gap: '1rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
              }}>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    padding: '0.75rem', 
                    borderRadius: '0.5rem'
                  }}>
                    {analysis.atsCompatibility.parsing ? 
                      <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} /> : 
                      <XCircle style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444' }} />
                    }
                    <span style={{ color: '#374151' }}>Parsing Quality</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    padding: '0.75rem', 
                    borderRadius: '0.5rem'
                  }}>
                    {analysis.atsCompatibility.keywords ? 
                      <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} /> : 
                      <XCircle style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444' }} />
                    }
                    <span style={{ color: '#374151' }}>Keyword Density</span>
                  </div>
                </div>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    padding: '0.75rem', 
                    borderRadius: '0.5rem'
                  }}>
                    {analysis.atsCompatibility.structure ? 
                      <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} /> : 
                      <XCircle style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444' }} />
                    }
                    <span style={{ color: '#374151' }}>Section Structure</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.75rem', 
                    padding: '0.75rem', 
                    borderRadius: '0.5rem'
                  }}>
                    {analysis.atsCompatibility.formatting ? 
                      <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#10b981' }} /> : 
                      <XCircle style={{ width: '1.25rem', height: '1.25rem', color: '#ef4444' }} />
                    }
                    <span style={{ color: '#374151' }}>Format Compatibility</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Keywords Analysis */}
            <div style={{ 
              display: 'grid', 
              gap: '1.5rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
            }}>
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '0.75rem', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
                padding: '1.5rem' 
              }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold', 
                  color: '#1f2937', 
                  marginBottom: '1rem' 
                }}>
                  Found Keywords
                </h3>
                {analysis.foundKeywords.length > 0 ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {analysis.foundKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        style={{ 
                          backgroundColor: '#d1fae5', 
                          color: '#065f46', 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '9999px', 
                          fontSize: '0.875rem', 
                          fontWeight: '500' 
                        }}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No relevant keywords found</p>
                )}
              </div>
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '0.75rem', 
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
                padding: '1.5rem' 
              }}>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 'bold', 
                  color: '#1f2937', 
                  marginBottom: '1rem' 
                }}>
                  Missing Keywords
                </h3>
                {analysis.missingKeywords.length > 0 ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {analysis.missingKeywords.map((keyword, index) => (
                      <span
                        key={index}
                        style={{ 
                          backgroundColor: '#fee2e2', 
                          color: '#b91c1c', 
                          padding: '0.25rem 0.75rem', 
                          borderRadius: '9999px', 
                          fontSize: '0.875rem', 
                          fontWeight: '500' 
                        }}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#059669', fontStyle: 'italic' }}>All relevant keywords found!</p>
                )}
              </div>
            </div>

            {/* Recommendations */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '0.75rem', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
              padding: '1.5rem' 
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                color: '#1f2937', 
                marginBottom: '1rem' 
              }}>
                Recommendations
              </h3>
              {analysis.recommendations.length > 0 ? (
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {analysis.recommendations.map((rec, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '0.75rem', 
                      padding: '0.75rem', 
                      backgroundColor: '#fffbeb',
                      borderRadius: '0.5rem' 
                    }}>
                      <AlertCircle style={{ 
                        width: '1.25rem', 
                        height: '1.25rem', 
                        color: '#d97706',
                        flexShrink: 0 
                      }} />
                      <p style={{ color: '#374151' }}>{rec}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  padding: '0.75rem', 
                  backgroundColor: '#ecfdf5',
                  borderRadius: '0.5rem' 
                }}>
                  <CheckCircle style={{ width: '1.25rem', height: '1.25rem', color: '#059669' }} />
                  <p style={{ color: '#374151' }}>Your resume looks great! No major improvements needed.</p>
                </div>
              )}
            </div>

            {/* Resume Stats */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '0.75rem', 
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
              padding: '1.5rem' 
            }}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                color: '#1f2937', 
                marginBottom: '1rem' 
              }}>
                Resume Statistics
              </h3>
              <div style={{ 
                display: 'grid', 
                gap: '1rem',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
              }}>
                <div style={{ 
                  textAlign: 'center', 
                  padding: '1rem', 
                  backgroundColor: '#eff6ff',
                  borderRadius: '0.5rem' 
                }}>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    color: '#2563eb' 
                  }}>
                    {analysis.wordCount}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>Words</div>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    marginTop: '0.25rem',
                    color: analysis.wordCount >= 200 && analysis.wordCount <= 800 ? 
                      '#059669' : '#dc2626'
                  }}>
                    {analysis.wordCount >= 200 && analysis.wordCount <= 800 ? 
                      'Ideal length' : 
                      analysis.wordCount < 200 ? 'Too short' : 'Too long'
                    }
                  </div>
                </div>
                <div style={{ 
                  textAlign: 'center', 
                  padding: '1rem', 
                  backgroundColor: '#ecfdf5',
                  borderRadius: '0.5rem' 
                }}>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    color: '#059669' 
                  }}>
                    {analysis.foundKeywords.length}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>Keywords Found</div>
                  <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    out of {analysis.foundKeywords.length + analysis.missingKeywords.length}
                  </div>
                </div>
                <div style={{ 
                  textAlign: 'center', 
                  padding: '1rem', 
                  backgroundColor: '#f5f3ff',
                  borderRadius: '0.5rem' 
                }}>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    color: '#7c3aed' 
                  }}>
                    {analysis.readabilityScore}%
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#4b5563' }}>Readability</div>
                  <div style={{ 
                    fontSize: '0.75rem', 
                    marginTop: '0.25rem',
                    color: analysis.readabilityScore > 70 ? 
                      '#059669' : analysis.readabilityScore > 50 ? '#d97706' : '#dc2626'
                  }}>
                    {analysis.readabilityScore > 70 ? 
                      'Excellent' : analysis.readabilityScore > 50 ? 'Good' : 'Needs improvement'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ATSResumeTester;