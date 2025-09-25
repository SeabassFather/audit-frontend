import React, { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const systemStats = {
    totalUsers: 245,
    activeCases: 18,
    filesProcessed: 1247,
    systemUptime: '99.9%'
  };

  const recentActivities = [
    {
      id: 1,
      action: "New user registered",
      user: "john.doe@company.com",
      timestamp: "2 hours ago",
      type: "user"
    },
    {
      id: 2,
      action: "Case #125 completed",
      user: "jane.smith@auditdna.com",
      timestamp: "4 hours ago",
      type: "case"
    },
    {
      id: 3,
      action: "System backup completed",
      user: "system",
      timestamp: "6 hours ago",
      type: "system"
    },
    {
      id: 4,
      action: "Document uploaded",
      user: "mike.johnson@client.com",
      timestamp: "8 hours ago",
      type: "file"
    }
  ];

  const systemHealth = [
    { service: "API Gateway", status: "Healthy", uptime: "99.9%" },
    { service: "Database", status: "Healthy", uptime: "100%" },
    { service: "File Storage", status: "Warning", uptime: "98.5%" },
    { service: "Authentication", status: "Healthy", uptime: "99.8%" },
    { service: "Notification Service", status: "Healthy", uptime: "99.2%" }
  ];

  const getActivityIcon = (type) => {
    const icons = {
      'user': '👤',
      'case': '📋',
      'system': '⚙️',
      'file': '📁'
    };
    return icons[type] || '📝';
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Healthy': 'bg-success text-white',
      'Warning': 'bg-warning text-dark',
      'Critical': 'bg-danger text-white'
    };
    return statusClasses[status] || 'bg-secondary text-white';
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div>
            {/* System Stats */}
            <div className="row g-4 mb-5">
              <div className="col-lg-3 col-md-6">
                <div className="card card-auditdna">
                  <div className="card-body text-center">
                    <div className="display-4 mb-2">👥</div>
                    <div className="h2 fw-bold text-secondary-blue mb-1">
                      {systemStats.totalUsers}
                    </div>
                    <div className="text-muted small">Total Users</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="card card-auditdna">
                  <div className="card-body text-center">
                    <div className="display-4 mb-2">📋</div>
                    <div className="h2 fw-bold text-warning mb-1">
                      {systemStats.activeCases}
                    </div>
                    <div className="text-muted small">Active Cases</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="card card-auditdna">
                  <div className="card-body text-center">
                    <div className="display-4 mb-2">📁</div>
                    <div className="h2 fw-bold text-info mb-1">
                      {systemStats.filesProcessed}
                    </div>
                    <div className="text-muted small">Files Processed</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="card card-auditdna">
                  <div className="card-body text-center">
                    <div className="display-4 mb-2">⚡</div>
                    <div className="h2 fw-bold text-success mb-1">
                      {systemStats.systemUptime}
                    </div>
                    <div className="text-muted small">System Uptime</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="row">
              <div className="col-lg-8">
                <div className="card card-auditdna">
                  <div className="card-header bg-accent-yellow">
                    <h5 className="card-title mb-0 text-dark">Recent Activities</h5>
                  </div>
                  <div className="card-body">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                        <div className="me-3">
                          <span className="fs-4">{getActivityIcon(activity.type)}</span>
                        </div>
                        <div className="flex-grow-1">
                          <div className="fw-semibold">{activity.action}</div>
                          <small className="text-muted">by {activity.user}</small>
                        </div>
                        <div className="text-muted small">
                          {activity.timestamp}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card card-auditdna">
                  <div className="card-header bg-accent-green">
                    <h5 className="card-title mb-0 text-dark">Quick Actions</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-grid gap-2">
                      <button className="btn btn-secondary-blue">
                        Create New User
                      </button>
                      <button className="btn btn-accent-green">
                        Generate Report
                      </button>
                      <button className="btn btn-primary-silver">
                        System Backup
                      </button>
                      <button className="btn btn-outline-secondary">
                        View Logs
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="card card-auditdna">
            <div className="card-header bg-accent-yellow">
              <h5 className="card-title mb-0 text-dark">User Management</h5>
            </div>
            <div className="card-body">
              <p className="text-muted mb-4">Manage user accounts, permissions, and access controls.</p>
              <div className="d-flex gap-3 mb-4">
                <button className="btn btn-secondary-blue">Add New User</button>
                <button className="btn btn-accent-green">Import Users</button>
                <button className="btn btn-outline-secondary">Export Users</button>
              </div>
              <div className="alert alert-info">
                <strong>Demo Mode:</strong> User management functionality would be implemented here with full CRUD operations, role management, and permissions.
              </div>
            </div>
          </div>
        );

      case 'system':
        return (
          <div>
            <div className="card card-auditdna mb-4">
              <div className="card-header bg-accent-yellow">
                <h5 className="card-title mb-0 text-dark">System Health</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Service</th>
                        <th>Status</th>
                        <th>Uptime</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {systemHealth.map((service, index) => (
                        <tr key={index}>
                          <td className="fw-semibold">{service.service}</td>
                          <td>
                            <span className={`badge ${getStatusBadge(service.status)}`}>
                              {service.status}
                            </span>
                          </td>
                          <td>{service.uptime}</td>
                          <td>
                            <button className="btn btn-sm btn-outline-secondary me-2">
                              Monitor
                            </button>
                            <button className="btn btn-sm btn-outline-primary">
                              Restart
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="card card-auditdna">
              <div className="card-header bg-accent-green">
                <h5 className="card-title mb-0 text-dark">System Configuration</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-3">General Settings</h6>
                    <div className="mb-3">
                      <label className="form-label">System Name</label>
                      <input type="text" className="form-control" value="AuditDNA Platform" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Max File Size (MB)</label>
                      <input type="number" className="form-control" value="10" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold mb-3">Security Settings</h6>
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" checked />
                      <label className="form-check-label">
                        Enable Two-Factor Authentication
                      </label>
                    </div>
                    <div className="form-check mb-2">
                      <input className="form-check-input" type="checkbox" checked />
                      <label className="form-check-label">
                        Require Password Complexity
                      </label>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="d-flex gap-2">
                  <button className="btn btn-secondary-blue">Save Changes</button>
                  <button className="btn btn-outline-secondary">Reset to Defaults</button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-secondary-blue mb-3">
          Admin Dashboard
        </h1>
        <p className="lead text-muted">
          System administration and configuration management console
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="card card-auditdna mb-4">
        <div className="card-header bg-primary-silver p-0">
          <ul className="nav nav-tabs nav-fill">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'overview' ? 'active text-secondary-blue fw-bold' : 'text-muted'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'users' ? 'active text-secondary-blue fw-bold' : 'text-muted'}`}
                onClick={() => setActiveTab('users')}
              >
                User Management
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'system' ? 'active text-secondary-blue fw-bold' : 'text-muted'}`}
                onClick={() => setActiveTab('system')}
              >
                System Settings
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
