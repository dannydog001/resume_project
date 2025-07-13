import React, { useState } from 'react';
import { FaUsers, FaFileAlt, FaChartLine, FaCog, FaBell, FaSearch, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New user registered', time: '2 mins ago', read: false },
    { id: 2, text: 'Resume template updated', time: '1 hour ago', read: false },
    { id: 3, text: 'System maintenance scheduled', time: '3 days ago', read: true },
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const stats = [
    { title: 'Total Users', value: '12,458', change: '+12%', trend: 'up' },
    { title: 'Active Subscriptions', value: '8,742', change: '+5%', trend: 'up' },
    { title: 'Resumes Created', value: '34,891', change: '+23%', trend: 'up' },
    { title: 'Job Applications', value: '19,453', change: '-3%', trend: 'down' },
  ];

  const recentUsers = [
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', plan: 'Professional', lastActive: '2 mins ago' },
    { id: 2, name: 'Sarah Williams', email: 'sarah@example.com', plan: 'Career Suite', lastActive: '15 mins ago' },
    { id: 3, name: 'Michael Chen', email: 'michael@example.com', plan: 'Basic', lastActive: '1 hour ago' },
    { id: 4, name: 'Emma Davis', email: 'emma@example.com', plan: 'Professional', lastActive: '3 hours ago' },
    { id: 5, name: 'James Wilson', email: 'james@example.com', plan: 'Career Suite', lastActive: '1 day ago' },
  ];

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>JobSeekerPro</h2>
          <span>Admin</span>
          <button className="close-sidebar" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
              <FaChartLine /> Dashboard
            </li>
            <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
              <FaUsers /> Users
            </li>
            <li className={activeTab === 'content' ? 'active' : ''} onClick={() => setActiveTab('content')}>
              <FaFileAlt /> Content
            </li>
            <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
              <FaCog /> Settings
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Navigation */}
        <header className="admin-header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <div className="search-bar">
            <FaSearch />
            <input type="text" placeholder="Search..." />
          </div>
          <div className="admin-actions">
            <div className="notifications">
              <FaBell />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="notification-badge">{notifications.filter(n => !n.read).length}</span>
              )}
              <div className="notification-dropdown">
                <h4>Notifications</h4>
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`notification-item ${notification.read ? 'read' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <p>{notification.text}</p>
                    <small>{notification.time}</small>
                  </div>
                ))}
              </div>
            </div>
            <div className="admin-profile">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Admin" />
              <span>Admin User</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="admin-content">
          {activeTab === 'dashboard' && (
            <>
              <h1>Dashboard Overview</h1>
              <div className="stats-grid">
                {stats.map((stat, index) => (
                  <div className="stat-card" key={index}>
                    <h3>{stat.title}</h3>
                    <div className="stat-value">{stat.value}</div>
                    <div className={`stat-change ${stat.trend}`}>
                      {stat.change} <span>{stat.trend === 'up' ? '↑' : '↓'}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="content-row">
                <div className="chart-container">
                  <h3>User Growth</h3>
                  <div className="chart-placeholder">
                    {/* Chart would be rendered here in a real app */}
                    <div className="mock-chart">
                      <div className="bar" style={{ height: '30%' }}></div>
                      <div className="bar" style={{ height: '45%' }}></div>
                      <div className="bar" style={{ height: '60%' }}></div>
                      <div className="bar" style={{ height: '80%' }}></div>
                      <div className="bar" style={{ height: '65%' }}></div>
                      <div className="bar" style={{ height: '90%' }}></div>
                    </div>
                  </div>
                </div>
                <div className="recent-activity">
                  <h3>Recent Users</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Plan</th>
                        <th>Last Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.map(user => (
                        <tr key={user.id}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td><span className={`plan-badge ${user.plan.toLowerCase().replace(' ', '-')}`}>{user.plan}</span></td>
                          <td>{user.lastActive}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'users' && (
            <div className="users-tab">
              <h1>User Management</h1>
              <div className="user-filters">
                <div className="search-filter">
                  <FaSearch />
                  <input type="text" placeholder="Search users..." />
                </div>
                <select>
                  <option>All Plans</option>
                  <option>Basic</option>
                  <option>Professional</option>
                  <option>Career Suite</option>
                </select>
                <select>
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Suspended</option>
                </select>
                <button className="export-btn">Export CSV</button>
              </div>
              <div className="users-table-container">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Plan</th>
                      <th>Status</th>
                      <th>Joined</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...recentUsers, ...recentUsers].map((user, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <div className="user-avatar">
                            <img src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${index + 10}.jpg`} alt={user.name} />
                            {user.name}
                          </div>
                        </td>
                        <td>{user.email}</td>
                        <td><span className={`plan-badge ${user.plan.toLowerCase().replace(' ', '-')}`}>{user.plan}</span></td>
                        <td><span className="status-badge active">Active</span></td>
                        <td>{new Date(Date.now() - (index * 86400000)).toLocaleDateString()}</td>
                        <td>
                          <button className="action-btn view">View</button>
                          <button className="action-btn edit">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="pagination">
                <button className="page-btn">Previous</button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <span>...</span>
                <button className="page-btn">10</button>
                <button className="page-btn">Next</button>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="content-tab">
              <h1>Content Management</h1>
              <div className="content-tabs">
                <button className={`content-tab-btn ${activeTab === 'templates' ? 'active' : ''}`}>Templates</button>
                <button className={`content-tab-btn ${activeTab === 'articles' ? 'active' : ''}`}>Articles</button>
                <button className={`content-tab-btn ${activeTab === 'resources' ? 'active' : ''}`}>Resources</button>
              </div>
              <div className="template-management">
                <div className="template-actions">
                  <button className="add-template-btn">+ Add New Template</button>
                  <div className="template-filters">
                    <select>
                      <option>All Categories</option>
                      <option>Modern</option>
                      <option>Classic</option>
                      <option>Creative</option>
                      <option>Executive</option>
                    </select>
                    <select>
                      <option>Sort by: Newest</option>
                      <option>Sort by: Oldest</option>
                      <option>Sort by: Most Popular</option>
                    </select>
                  </div>
                </div>
                <div className="templates-grid">
                  {[1, 2, 3, 4, 5, 6].map(template => (
                    <div className="template-card" key={template}>
                      <div className="template-preview">
                        <img src={`https://picsum.photos/300/200?random=${template}`} alt={`Template ${template}`} />
                      </div>
                      <div className="template-info">
                        <h3>Template {template}</h3>
                        <div className="template-meta">
                          <span className="template-category">Modern</span>
                          <span className="template-usage">1,234 uses</span>
                        </div>
                        <div className="template-actions">
                          <button className="edit-btn">Edit</button>
                          <button className="preview-btn">Preview</button>
                          <button className="delete-btn">Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-tab">
              <h1>System Settings</h1>
              <div className="settings-grid">
                <div className="settings-card">
                  <h3>General Settings</h3>
                  <div className="setting-item">
                    <label>Site Title</label>
                    <input type="text" defaultValue="JobSeekerPro" />
                  </div>
                  <div className="setting-item">
                    <label>Admin Email</label>
                    <input type="email" defaultValue="admin@jobseekerpro.com" />
                  </div>
                  <div className="setting-item">
                    <label>Timezone</label>
                    <select>
                      <option>(UTC-05:00) Eastern Time</option>
                      <option>(UTC-08:00) Pacific Time</option>
                      <option>(UTC+00:00) London</option>
                    </select>
                  </div>
                  <button className="save-btn">Save Changes</button>
                </div>

                <div className="settings-card">
                  <h3>Subscription Plans</h3>
                  <div className="plan-settings">
                    <div className="plan-item">
                      <h4>Basic Plan</h4>
                      <div className="plan-toggle">
                        <label className="switch">
                          <input type="checkbox" defaultChecked />
                          <span className="slider"></span>
                        </label>
                        <span>Enabled</span>
                      </div>
                    </div>
                    <div className="plan-item">
                      <h4>Professional Plan</h4>
                      <div className="plan-price">
                        <label>Price ($)</label>
                        <input type="number" defaultValue="9.99" min="0" step="0.01" />
                      </div>
                    </div>
                    <div className="plan-item">
                      <h4>Career Suite</h4>
                      <div className="plan-price">
                        <label>Price ($)</label>
                        <input type="number" defaultValue="24.99" min="0" step="0.01" />
                      </div>
                    </div>
                    <button className="save-btn">Update Plans</button>
                  </div>
                </div>

                <div className="settings-card">
                  <h3>System Maintenance</h3>
                  <div className="maintenance-item">
                    <label>Maintenance Mode</label>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="maintenance-item">
                    <label>Backup Database</label>
                    <button className="backup-btn">Create Backup Now</button>
                  </div>
                  <div className="maintenance-item">
                    <label>Clear Cache</label>
                    <button className="cache-btn">Clear All Cache</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// CSS Styles
const styles = `
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
    --sidebar-width: 280px;
    --header-height: 70px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
  }

  .admin-container {
    display: flex;
    min-height: 100vh;
    background: var(--dark-bg);
    color: var(--light-text);
    position: relative;
  }

  .admin-sidebar {
    width: var(--sidebar-width);
    background: var(--dark-card);
    border-right: 1px solid var(--border-color);
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    transition: transform 0.3s ease;
    overflow-y: auto;
  }

  .sidebar-header {
    padding: 20px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .sidebar-header h2 {
    font-size: 1.5rem;
    background: var(--primary-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 5px;
  }

  .sidebar-header span {
    font-size: 0.8rem;
    color: var(--muted-text);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .close-sidebar {
    position: absolute;
    top: 20px;
    right: 20px;
    background: none;
    border: none;
    color: var(--muted-text);
    font-size: 1.2rem;
    cursor: pointer;
    display: none;
  }

  .sidebar-nav {
    padding: 20px 0;
  }

  .sidebar-nav ul {
    list-style: none;
  }

  .sidebar-nav li {
    padding: 12px 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--muted-text);
  }

  .sidebar-nav li svg {
    margin-right: 10px;
    font-size: 1.1rem;
  }

  .sidebar-nav li:hover {
    background: rgba(255, 255, 255, 0.05);
    color: var(--light-text);
  }

  .sidebar-nav li.active {
    background: rgba(255, 255, 255, 0.1);
    color: var(--light-text);
    border-left: 3px solid #4facfe;
  }

  .sidebar-footer {
    padding: 20px;
    margin-top: auto;
    border-top: 1px solid var(--border-color);
  }

  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 10px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 5px;
    color: var(--light-text);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .logout-btn svg {
    margin-right: 8px;
  }

  .logout-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .admin-main {
    flex: 1;
    margin-left: var(--sidebar-width);
    min-height: 100vh;
    transition: margin 0.3s ease;
  }

  .admin-header {
    height: var(--header-height);
    background: var(--dark-card);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    position: sticky;
    top: 0;
    z-index: 90;
  }

  .menu-toggle {
    background: none;
    border: none;
    color: var(--light-text);
    font-size: 1.2rem;
    cursor: pointer;
    display: none;
  }

  .search-bar {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    padding: 8px 15px;
    width: 300px;
  }

  .search-bar svg {
    color: var(--muted-text);
    margin-right: 10px;
  }

  .search-bar input {
    background: transparent;
    border: none;
    color: var(--light-text);
    width: 100%;
    outline: none;
  }

  .search-bar input::placeholder {
    color: var(--muted-text);
  }

  .admin-actions {
    display: flex;
    align-items: center;
  }

  .notifications {
    position: relative;
    margin-right: 20px;
    cursor: pointer;
  }

  .notifications svg {
    font-size: 1.2rem;
    color: var(--muted-text);
    transition: color 0.3s ease;
  }

  .notifications:hover svg {
    color: var(--light-text);
  }

  .notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: var(--secondary-gradient);
    color: white;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: bold;
  }

  .notification-dropdown {
    position: absolute;
    top: 40px;
    right: 0;
    width: 300px;
    background: var(--dark-card);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    padding: 15px;
    display: none;
    z-index: 100;
  }

  .notifications:hover .notification-dropdown {
    display: block;
  }

  .notification-dropdown h4 {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid var(--border-color);
  }

  .notification-item {
    padding: 10px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    cursor: pointer;
  }

  .notification-item.read {
    opacity: 0.7;
  }

  .notification-item p {
    font-size: 0.9rem;
  }

  .notification-item small {
    color: var(--muted-text);
    font-size: 0.8rem;
  }

  .notification-item:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .admin-profile {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .admin-profile img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
  }

  .admin-profile span {
    font-size: 0.9rem;
  }

  .admin-content {
    padding: 20px;
    min-height: calc(100vh - var(--header-height));
  }

  .admin-content h1 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    background: var(--accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Stats Grid */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
  }

  .stat-card {
    background: var(--dark-card);
    border-radius: 10px;
    padding: 20px;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
  }

  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .stat-card h3 {
    font-size: 0.9rem;
    color: var(--muted-text);
    margin-bottom: 10px;
    font-weight: 500;
  }

  .stat-value {
    font-size: 1.8rem;
    font-weight: 700;
    margin-bottom: 5px;
  }

  .stat-change {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
  }

  .stat-change.up {
    color: #43e97b;
  }

  .stat-change.down {
    color: #f5576c;
  }

  .stat-change span {
    margin-left: 5px;
  }

  /* Content Row */
  .content-row {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
    margin-bottom: 30px;
  }

  @media (max-width: 1200px) {
    .content-row {
      grid-template-columns: 1fr;
    }
  }

  .chart-container, .recent-activity {
    background: var(--dark-card);
    border-radius: 10px;
    padding: 20px;
    border: 1px solid var(--border-color);
  }

  .chart-container h3, .recent-activity h3 {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: var(--light-text);
  }

  .chart-placeholder {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 5px;
  }

  .mock-chart {
    display: flex;
    align-items: flex-end;
    height: 80%;
    width: 90%;
    gap: 10px;
  }

  .mock-chart .bar {
    flex: 1;
    background: var(--accent-gradient);
    border-radius: 5px 5px 0 0;
    animation: grow 1s ease-out;
  }

  @keyframes grow {
    from { height: 0; }
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  table th, table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }

  table th {
    font-size: 0.8rem;
    color: var(--muted-text);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  table td {
    font-size: 0.9rem;
  }

  .plan-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .plan-badge.basic {
    background: rgba(255, 255, 255, 0.1);
    color: var(--light-text);
  }

  .plan-badge.professional {
    background: rgba(79, 172, 254, 0.2);
    color: #4facfe;
  }

  .plan-badge.career-suite {
    background: rgba(67, 233, 123, 0.2);
    color: #43e97b;
  }

  .status-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
  }

  .status-badge.active {
    background: rgba(67, 233, 123, 0.2);
    color: #43e97b;
  }

  .status-badge.inactive {
    background: rgba(255, 193, 7, 0.2);
    color: #ffc107;
  }

  .status-badge.suspended {
    background: rgba(244, 67, 54, 0.2);
    color: #f44336;
  }

  .user-avatar {
    display: flex;
    align-items: center;
  }

  .user-avatar img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: cover;
  }

  .action-btn {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-right: 5px;
  }

  .action-btn.view {
    background: rgba(79, 172, 254, 0.2);
    color: #4facfe;
  }

  .action-btn.edit {
    background: rgba(255, 193, 7, 0.2);
    color: #ffc107;
  }

  .action-btn.delete {
    background: rgba(244, 67, 54, 0.2);
    color: #f44336;
  }

  .action-btn:hover {
    opacity: 0.8;
  }

  /* Users Tab */
  .users-tab {
    margin-top: 20px;
  }

  .user-filters {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .search-filter {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    padding: 8px 15px;
    flex: 1;
    min-width: 250px;
  }

  .search-filter svg {
    color: var(--muted-text);
    margin-right: 10px;
  }

  .search-filter input {
    background: transparent;
    border: none;
    color: var(--light-text);
    width: 100%;
    outline: none;
  }

  .user-filters select {
    background: var(--dark-card);
    border: 1px solid var(--border-color);
    color: var(--light-text);
    padding: 8px 15px;
    border-radius: 5px;
    min-width: 150px;
  }

  .export-btn {
    background: var(--accent-gradient);
    color: var(--light-text);
    border: none;
    padding: 8px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .export-btn:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  .users-table-container {
    overflow-x: auto;
    margin-bottom: 20px;
  }

  .users-table {
    width: 100%;
    min-width: 800px;
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }

  .page-btn {
    background: var(--dark-card);
    border: 1px solid var(--border-color);
    color: var(--light-text);
    width: 35px;
    height: 35px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .page-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .page-btn.active {
    background: var(--accent-gradient);
    border-color: transparent;
  }

  /* Content Tab */
  .content-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 10px;
  }

  .content-tab-btn {
    background: none;
    border: none;
    color: var(--muted-text);
    padding: 8px 15px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
  }

  .content-tab-btn:hover {
    color: var(--light-text);
  }

  .content-tab-btn.active {
    color: var(--light-text);
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }

  .template-management {
    margin-top: 20px;
  }

  .template-actions {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
  }

  .add-template-btn {
    background: var(--accent-gradient);
    color: var(--light-text);
    border: none;
    padding: 8px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .add-template-btn:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  .template-filters {
    display: flex;
    gap: 10px;
  }

  .template-filters select {
    background: var(--dark-card);
    border: 1px solid var(--border-color);
    color: var(--light-text);
    padding: 8px 15px;
    border-radius: 5px;
    min-width: 150px;
  }

  .templates-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  .template-card {
    background: var(--dark-card);
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
  }

  .template-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .template-preview {
    height: 200px;
    overflow: hidden;
  }

  .template-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .template-card:hover .template-preview img {
    transform: scale(1.05);
  }

  .template-info {
    padding: 15px;
  }

  .template-info h3 {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }

  .template-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 0.8rem;
    color: var(--muted-text);
  }

  .template-actions {
    display: flex;
    gap: 10px;
  }

  .template-actions button {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8rem;
    transition: all 0.3s ease;
  }

  .edit-btn {
    background: rgba(79, 172, 254, 0.2);
    color: #4facfe;
  }

  .preview-btn {
    background: rgba(67, 233, 123, 0.2);
    color: #43e97b;
  }

  .delete-btn {
    background: rgba(244, 67, 54, 0.2);
    color: #f44336;
  }

  .template-actions button:hover {
    opacity: 0.8;
  }

  /* Settings Tab */
  .settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .settings-card {
    background: var(--dark-card);
    border-radius: 10px;
    padding: 20px;
    border: 1px solid var(--border-color);
  }

  .settings-card h3 {
    font-size: 1.2rem;
    margin-bottom: 20px;
    color: var(--light-text);
  }

  .setting-item {
    margin-bottom: 15px;
  }

  .setting-item label {
    display: block;
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: var(--muted-text);
  }

  .setting-item input, .setting-item select {
    width: 100%;
    padding: 10px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    color: var(--light-text);
  }

  .save-btn {
    background: var(--accent-gradient);
    color: var(--light-text);
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
    margin-top: 10px;
    transition: all 0.3s ease;
  }

  .save-btn:hover {
    opacity: 0.9;
  }

  .plan-item {
    margin-bottom: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--border-color);
  }

  .plan-item h4 {
    margin-bottom: 10px;
    font-size: 1rem;
  }

  .plan-toggle {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.1);
    transition: .4s;
    border-radius: 24px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background: var(--accent-gradient);
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  .plan-price {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .plan-price label {
    font-size: 0.9rem;
    color: var(--muted-text);
  }

  .plan-price input {
    width: 80px;
    padding: 8px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid var(--border-color);
    border-radius: 5px;
    color: var(--light-text);
  }

  .maintenance-item {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .backup-btn, .cache-btn {
    background: rgba(255, 255, 255, 0.1);
    color: var(--light-text);
    border: none;
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .backup-btn:hover, .cache-btn:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  /* Responsive Styles */
  @media (max-width: 992px) {
    .admin-sidebar {
      transform: translateX(-100%);
    }

    .admin-sidebar.open {
      transform: translateX(0);
    }

    .admin-main {
      margin-left: 0;
    }

    .close-sidebar {
      display: block;
    }

    .menu-toggle {
      display: block;
    }
  }

  @media (max-width: 768px) {
    .admin-header {
      flex-wrap: wrap;
      height: auto;
      padding: 10px;
    }

    .search-bar {
      width: 100%;
      order: 3;
      margin-top: 10px;
    }

    .admin-actions {
      margin-left: auto;
    }

    .stats-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 576px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }

    .user-filters select {
      min-width: 100%;
    }

    .template-filters {
      width: 100%;
    }

    .template-filters select {
      min-width: 0;
      flex: 1;
    }
  }
`;

// Inject the styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default AdminDashboard;