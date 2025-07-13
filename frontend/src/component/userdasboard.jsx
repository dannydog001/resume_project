import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaCalendarAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const UserDashboard = () => {
  // Styles object
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '30px',
      backgroundColor: '#1a1a1a',
      borderRadius: '15px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      color: 'white',
      fontFamily: "'Inter', sans-serif"
    },
    title: {
      fontSize: '2rem',
      marginBottom: '30px',
      textAlign: 'center',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      padding: '15px 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      position: 'relative'
    },
    icon: {
      fontSize: '1.5rem',
      marginRight: '20px',
      color: '#667eea',
      minWidth: '24px'
    },
    label: {
      fontSize: '0.9rem',
      color: '#a0a0a0',
      marginBottom: '5px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    value: {
      fontSize: '1.1rem',
      color: 'white'
    },
    editButton: {
      position: 'absolute',
      right: '0',
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      color: '#667eea',
      border: 'none',
      borderRadius: '6px',
      padding: '8px 15px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.3s ease'
    },
    editField: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginTop: '10px',
      width: '100%'
    },
    input: {
      width: '100%',
      padding: '10px 15px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '8px',
      color: 'white',
      fontSize: '1rem',
      transition: 'all 0.3s ease'
    },
    inputError: {
      borderColor: '#f44336'
    },
    errorMessage: {
      color: '#f44336',
      fontSize: '0.8rem',
      marginTop: '-5px'
    },
    editActions: {
      display: 'flex',
      gap: '10px',
      marginTop: '5px'
    },
    saveButton: {
      padding: '8px 15px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.3s ease'
    },
    cancelButton: {
      padding: '8px 15px',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '0.9rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.3s ease'
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(102, 126, 234, 0.3)'
    },
    buttonIcon: {
      marginRight: '5px'
    }
  };

  // User data state
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    createdDate: ''
  });

  // Editable fields state
  const [editableFields, setEditableFields] = useState({
    name: false,
    email: false,
    password: false
  });

  // Form data state
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    newPassword: '',
    confirmPassword: ''
  });


  const [userData , setUserData] = useState([])

  // Errors state
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Toggle edit mode for a field
  const toggleEdit = (field) => {
    setEditableFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));

    // Reset form data when canceling edit
    if (editableFields[field]) {
      setFormData(prev => ({
        ...prev,
        [field]: user[field],
        newPassword: '',
        confirmPassword: ''
      }));
      setErrors(prev => ({
        ...prev,
        [field]: '',
        newPassword: '',
        confirmPassword: ''
      }));
    }
  };

  
    function getUserData() {
      // Fetch user data from localStorage or API
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUserData(JSON.parse(storedUser));

      } else {
        // Handle case where user data is not found
        console.error('No user data found');
      }
    }

useEffect(() => {
  getUserData();
},[])

useEffect(() => {
  if (userData) {
    setUser({
      name: userData.fullname,
      email: userData.email,
      password: userData.password,
      createdDate: userData.createdAt
    });
  }
}, [userData]);
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


     

  // Validate form fields
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email format';
        }
        break;
      case 'newPassword':
        if (value && value.length < 8) {
          error = 'Password must be at least 8 characters';
        }
        break;
      case 'confirmPassword':
        if (formData.newPassword && value !== formData.newPassword) {
          error = 'Passwords do not match';
        }
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
    
    return !error;
  };

  // Handle blur validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  // Save changes
  const saveChanges = (field) => {
    // Validate before saving
    const isValid = validateField(field, formData[field]);
    
    if (field === 'password') {
      const passwordValid = validateField('newPassword', formData.newPassword) && 
                          validateField('confirmPassword', formData.confirmPassword);
      if (!passwordValid) return;
    } else if (!isValid) return;

    // Update user data
    setUser(prev => ({
      ...prev,
      [field]: field === 'password' ? '********' : formData[field]
    }));

    // Exit edit mode
    setEditableFields(prev => ({
      ...prev,
      [field]: false
    }));

    // Reset password fields
    if (field === 'password') {
      setFormData(prev => ({
        ...prev,
        newPassword: '',
        confirmPassword: ''
      }));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Dashboard</h2>
      
      <div style={styles.card}>
        {/* Name Field */}
        <div style={styles.item}>
          <FaUser style={styles.icon} />
          <div style={{ flex: 1 }}>
            <h3 style={styles.label}>Name</h3>
            {editableFields.name ? (
              <div style={styles.editField}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    ...styles.input,
                    ...(errors.name ? styles.inputError : {})
                  }}
                />
                {errors.name && <span style={styles.errorMessage}>{errors.name}</span>}
                <div style={styles.editActions}>
                  <button 
                    style={styles.saveButton}
                    onClick={() => saveChanges('name')}
                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'none'}
                  >
                    <FaSave style={styles.buttonIcon} /> Save
                  </button>
                  <button 
                    style={styles.cancelButton}
                    onClick={() => toggleEdit('name')}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                  >
                    <FaTimes style={styles.buttonIcon} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p style={styles.value}>{user.name}</p>
                <button 
                  style={styles.editButton}
                  onClick={() => toggleEdit('name')}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.2)'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.1)'}
                >
                  <FaEdit style={styles.buttonIcon} /> Edit
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Email Field */}
        <div style={styles.item}>
          <FaEnvelope style={styles.icon} />
          <div style={{ flex: 1 }}>
            <h3 style={styles.label}>Email</h3>
            {editableFields.email ? (
              <div style={styles.editField}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    ...styles.input,
                    ...(errors.email ? styles.inputError : {})
                  }}
                />
                {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
                <div style={styles.editActions}>
                  <button 
                    style={styles.saveButton}
                    onClick={() => saveChanges('email')}
                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'none'}
                  >
                    <FaSave style={styles.buttonIcon} /> Save
                  </button>
                  <button 
                    style={styles.cancelButton}
                    onClick={() => toggleEdit('email')}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                  >
                    <FaTimes style={styles.buttonIcon} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p style={styles.value}>{user.email}</p>
                <button 
                  style={styles.editButton}
                  onClick={() => toggleEdit('email')}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.2)'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.1)'}
                >
                  <FaEdit style={styles.buttonIcon} /> Edit
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Password Field */}
        <div style={styles.item}>
          <FaLock style={styles.icon} />
          <div style={{ flex: 1 }}>
            <h3 style={styles.label}>Password</h3>
            {editableFields.password ? (
              <div style={styles.editField}>
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    ...styles.input,
                    ...(errors.newPassword ? styles.inputError : {})
                  }}
                />
                {errors.newPassword && <span style={styles.errorMessage}>{errors.newPassword}</span>}
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    ...styles.input,
                    ...(errors.confirmPassword ? styles.inputError : {})
                  }}
                />
                {errors.confirmPassword && <span style={styles.errorMessage}>{errors.confirmPassword}</span>}
                <div style={styles.editActions}>
                  <button 
                    style={styles.saveButton}
                    onClick={() => saveChanges('password')}
                    onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'none'}
                  >
                    <FaSave style={styles.buttonIcon} /> Save
                  </button>
                  <button 
                    style={styles.cancelButton}
                    onClick={() => toggleEdit('password')}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                  >
                    <FaTimes style={styles.buttonIcon} /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p style={styles.value}>{user.password}</p>
                <button 
                  style={styles.editButton}
                  onClick={() => toggleEdit('password')}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.2)'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(102, 126, 234, 0.1)'}
                >
                  <FaEdit style={styles.buttonIcon} /> Edit
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Created Date (non-editable) */}
        <div style={{ ...styles.item, borderBottom: 'none' }}>
          <FaCalendarAlt style={styles.icon} />
          <div>
            <h3 style={styles.label}>Account Created</h3>
            <p style={styles.value}>{new Date(user.createdDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;