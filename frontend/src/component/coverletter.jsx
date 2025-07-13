import React, { useState } from 'react';
import { FaDownload, FaTrash, FaSave, FaPlus, FaEdit } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

const CoverLetterBuilder = () => {
  const [coverLetter, setCoverLetter] = useState({
    title: 'Professional Cover Letter',
    date: new Date().toLocaleDateString(),
    recipientName: 'Hiring Manager',
    recipientTitle: '',
    companyName: 'Company Name',
    companyAddress: '123 Business Rd.\nCity, State 12345',
    salutation: 'Dear Hiring Manager,',
    introduction: 'I am excited to apply for the [Position Name] position at [Company Name]. With my [X years] of experience in [Relevant Field/Industry], I am confident in my ability to contribute effectively to your team.',
    body: 'In my current role at [Current Company], I have successfully [describe key achievement or responsibility]. This experience has allowed me to develop strong [relevant skills] that align well with the requirements for this position.\n\nWhat excites me most about this opportunity is [specific aspect of the company or position]. My ability to [key skill] combined with my experience in [relevant area] would enable me to [specific contribution].',
    closing: 'I would welcome the opportunity to discuss how my skills and experiences align with your needs. Thank you for your time and consideration. I look forward to the possibility of contributing to your team.',
    signature: 'Sincerely,\n[Your Name]\n[Your Phone Number]\n[Your Email]',
    saved: false
  });

  const [templates, setTemplates] = useState([
    { id: 1, name: 'Professional', selected: true },
    { id: 2, name: 'Modern', selected: false },
    { id: 3, name: 'Creative', selected: false }
  ]);

  const [savedLetters, setSavedLetters] = useState([]);
  const [editingField, setEditingField] = useState(null);

  const handleInputChange = (field, value) => {
    setCoverLetter(prev => ({
      ...prev,
      [field]: value,
      saved: false
    }));
  };

  const handleTemplateSelect = (id) => {
    setTemplates(templates.map(template => ({
      ...template,
      selected: template.id === id
    })));
  };

  const saveLetter = () => {
    const newSavedLetter = {
      id: Date.now(),
      title: coverLetter.title,
      date: new Date().toLocaleDateString(),
      preview: coverLetter.introduction.substring(0, 50) + '...'
    };
    setSavedLetters([...savedLetters, newSavedLetter]);
    setCoverLetter(prev => ({ ...prev, saved: true }));
  };

  const downloadPDF = () => {
    const element = document.getElementById('cover-letter-preview');
    const opt = {
      margin: 10,
      filename: `${coverLetter.title.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  const startEditing = (field) => {
    setEditingField(field);
  };

  const stopEditing = () => {
    setEditingField(null);
  };

  return (
    <div className="cover-letter-builder">
      <style>{`
        :root {
          --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          --success-gradient: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          --dark-bg: #0a0a0a;
          --dark-card: #1a1a1a;
          --light-text: #ffffff;
          --muted-text: #a0a0a0;
          --border-color: rgba(255, 255, 255, 0.1);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        .cover-letter-builder {
          display: flex;
          min-height: 100vh;
          background: var(--dark-bg);
          color: var(--light-text);
          padding: 20px;
          gap: 20px;
        }

        .builder-sidebar {
          width: 300px;
          background: var(--dark-card);
          border-radius: 10px;
          padding: 20px;
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .builder-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .builder-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--dark-card);
          border-radius: 10px;
          padding: 15px 20px;
          border: 1px solid var(--border-color);
        }

        .builder-title {
          font-size: 1.5rem;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .builder-actions {
          display: flex;
          gap: 10px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 15px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .save-btn {
          background: var(--accent-gradient);
          color: white;
        }

        .download-btn {
          background: var(--success-gradient);
          color: white;
        }

        .delete-btn {
          background: rgba(244, 67, 54, 0.2);
          color: #f44336;
        }

        .action-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        .builder-content {
          display: flex;
          gap: 20px;
          flex: 1;
        }

        .editor-section {
          flex: 1;
          background: var(--dark-card);
          border-radius: 10px;
          padding: 20px;
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .editor-section h2 {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: var(--light-text);
        }

        .editor-group {
          margin-bottom: 15px;
        }

        .editor-label {
          display: block;
          margin-bottom: 8px;
          font-size: 0.9rem;
          color: var(--muted-text);
        }

        .editor-input, .editor-textarea {
          width: 100%;
          padding: 10px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid var(--border-color);
          border-radius: 5px;
          color: var(--light-text);
          font-size: 0.95rem;
        }

        .editor-textarea {
          min-height: 100px;
          resize: vertical;
        }

        .preview-section {
          flex: 1;
          background: white;
          border-radius: 10px;
          padding: 40px;
          color: #333;
          display: flex;
          flex-direction: column;
        }

        .templates-section {
          background: var(--dark-card);
          border-radius: 10px;
          padding: 15px;
          border: 1px solid var(--border-color);
        }

        .templates-title {
          font-size: 1rem;
          margin-bottom: 10px;
          color: var(--light-text);
        }

        .templates-list {
          display: flex;
          gap: 10px;
        }

        .template-btn {
          padding: 8px 15px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid var(--border-color);
          color: var(--muted-text);
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .template-btn.selected {
          background: var(--accent-gradient);
          color: white;
          border-color: transparent;
        }

        .template-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .saved-letters {
          background: var(--dark-card);
          border-radius: 10px;
          padding: 15px;
          border: 1px solid var(--border-color);
          flex: 1;
        }

        .saved-title {
          font-size: 1rem;
          margin-bottom: 10px;
          color: var(--light-text);
        }

        .saved-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .saved-item {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 5px;
          padding: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .saved-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .saved-item-info h4 {
          font-size: 0.9rem;
          margin-bottom: 3px;
        }

        .saved-item-info p {
          font-size: 0.8rem;
          color: var(--muted-text);
        }

        .saved-item-actions {
          display: flex;
          gap: 5px;
        }

        .saved-action-btn {
          background: none;
          border: none;
          color: var(--muted-text);
          cursor: pointer;
          font-size: 0.9rem;
        }

        .saved-action-btn:hover {
          color: var(--light-text);
        }

        /* Cover Letter Preview Styles */
        #cover-letter-preview {
          font-family: 'Georgia', serif;
          line-height: 1.6;
          flex: 1;
        }

        .cl-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
        }

        .cl-date {
          color: #666;
        }

        .cl-recipient {
          margin-bottom: 20px;
        }

        .cl-salutation {
          margin-bottom: 15px;
        }

        .cl-body {
          margin-bottom: 15px;
        }

        .cl-body p {
          margin-bottom: 15px;
        }

        .cl-closing {
          margin-bottom: 15px;
        }

        .cl-signature {
          margin-top: 40px;
        }

        /* Inline Editing */
        .editable-field {
          position: relative;
          cursor: pointer;
          padding: 2px 5px;
          border-radius: 3px;
        }

        .editable-field:hover {
          background: rgba(79, 172, 254, 0.1);
        }

        .editable-field.editing {
          background: rgba(79, 172, 254, 0.2);
          padding: 5px;
        }

        .editable-input {
          width: 100%;
          background: transparent;
          border: 1px solid #4facfe;
          border-radius: 3px;
          padding: 5px;
          color: #333;
          font-family: inherit;
          font-size: inherit;
        }

        /* Responsive Styles */
        @media (max-width: 1200px) {
          .cover-letter-builder {
            flex-direction: column;
          }

          .builder-sidebar {
            width: 100%;
            flex-direction: row;
            flex-wrap: wrap;
          }

          .templates-section, .saved-letters {
            flex: 1;
            min-width: 300px;
          }
        }

        @media (max-width: 768px) {
          .builder-content {
            flex-direction: column;
          }

          .editor-section, .preview-section {
            width: 100%;
          }

          .builder-header {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }

          .builder-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }

        @media (max-width: 480px) {
          .builder-sidebar {
            flex-direction: column;
          }

          .action-btn span {
            display: none;
          }

          .templates-list {
            flex-wrap: wrap;
          }
        }
      `}</style>

      <div className="builder-sidebar">
        <div className="templates-section">
          <h3 className="templates-title">Templates</h3>
          <div className="templates-list">
            {templates.map(template => (
              <button
                key={template.id}
                className={`template-btn ${template.selected ? 'selected' : ''}`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>

        <div className="saved-letters">
          <h3 className="saved-title">Saved Letters</h3>
          <div className="saved-list">
            {savedLetters.length > 0 ? (
              savedLetters.map(letter => (
                <div key={letter.id} className="saved-item">
                  <div className="saved-item-info">
                    <h4>{letter.title}</h4>
                    <p>{letter.date} • {letter.preview}</p>
                  </div>
                  <div className="saved-item-actions">
                    <button className="saved-action-btn">
                      <FaEdit />
                    </button>
                    <button className="saved-action-btn">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--muted-text)', fontSize: '0.9rem' }}>
                No saved letters yet. Create one and click "Save" to store it here.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="builder-main">
        <div className="builder-header">
          <h1 className="builder-title">Cover Letter Builder</h1>
          <div className="builder-actions">
            <button 
              className="action-btn save-btn"
              onClick={saveLetter}
              disabled={coverLetter.saved}
            >
              <FaSave />
              <span>Save</span>
            </button>
            <button className="action-btn download-btn" onClick={downloadPDF}>
              <FaDownload />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        <div className="builder-content">
          <div className="editor-section">
            <h2>Edit Your Cover Letter</h2>
            
            <div className="editor-group">
              <label className="editor-label">Title</label>
              <input
                type="text"
                className="editor-input"
                value={coverLetter.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
            </div>

            <div className="editor-group">
              <label className="editor-label">Recipient Details</label>
              <input
                type="text"
                className="editor-input"
                placeholder="Recipient Name"
                value={coverLetter.recipientName}
                onChange={(e) => handleInputChange('recipientName', e.target.value)}
              />
              <input
                type="text"
                className="editor-input"
                style={{ marginTop: '8px' }}
                placeholder="Recipient Title (optional)"
                value={coverLetter.recipientTitle}
                onChange={(e) => handleInputChange('recipientTitle', e.target.value)}
              />
              <input
                type="text"
                className="editor-input"
                style={{ marginTop: '8px' }}
                placeholder="Company Name"
                value={coverLetter.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
              />
              <textarea
                className="editor-textarea"
                style={{ marginTop: '8px', minHeight: '80px' }}
                placeholder="Company Address"
                value={coverLetter.companyAddress}
                onChange={(e) => handleInputChange('companyAddress', e.target.value)}
              />
            </div>

            <div className="editor-group">
              <label className="editor-label">Salutation</label>
              <input
                type="text"
                className="editor-input"
                value={coverLetter.salutation}
                onChange={(e) => handleInputChange('salutation', e.target.value)}
              />
            </div>

            <div className="editor-group">
              <label className="editor-label">Introduction</label>
              <textarea
                className="editor-textarea"
                value={coverLetter.introduction}
                onChange={(e) => handleInputChange('introduction', e.target.value)}
              />
            </div>

            <div className="editor-group">
              <label className="editor-label">Body</label>
              <textarea
                className="editor-textarea"
                value={coverLetter.body}
                onChange={(e) => handleInputChange('body', e.target.value)}
              />
            </div>

            <div className="editor-group">
              <label className="editor-label">Closing</label>
              <textarea
                className="editor-textarea"
                value={coverLetter.closing}
                onChange={(e) => handleInputChange('closing', e.target.value)}
              />
            </div>

            <div className="editor-group">
              <label className="editor-label">Signature</label>
              <textarea
                className="editor-textarea"
                value={coverLetter.signature}
                onChange={(e) => handleInputChange('signature', e.target.value)}
              />
            </div>
          </div>

          <div className="preview-section">
            <div id="cover-letter-preview">
              <div className="cl-header">
                <div className="cl-sender">
                  <div>{coverLetter.signature.split('\n')[0]}</div>
                  <div>{coverLetter.signature.split('\n')[2]}</div>
                  <div>{coverLetter.signature.split('\n')[3]}</div>
                </div>
                <div className="cl-date">{coverLetter.date}</div>
              </div>

              <div className="cl-recipient">
                <div>{coverLetter.recipientName}{coverLetter.recipientTitle && `, ${coverLetter.recipientTitle}`}</div>
                <div>{coverLetter.companyName}</div>
                <div style={{ whiteSpace: 'pre-line' }}>{coverLetter.companyAddress}</div>
              </div>

              <div className="cl-salutation">{coverLetter.salutation}</div>

              <div className="cl-body">
                {coverLetter.introduction.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                {coverLetter.body.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="cl-closing">{coverLetter.closing}</div>

              <div className="cl-signature" style={{ whiteSpace: 'pre-line' }}>
                {coverLetter.signature}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterBuilder;