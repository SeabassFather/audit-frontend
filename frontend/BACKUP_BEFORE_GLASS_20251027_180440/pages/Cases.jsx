import React, { useState } from 'react';

const Cases = () => {
  const [selectedCase, setSelectedCase] = useState(null);

  const cases = [
    {
      id: 1,
      title: "Mortgage Compliance Review - ABC Bank",
      status: "In Progress",
      priority: "High",
      assignee: "Jane Smith",
      created: "2024-01-15",
      dueDate: "2024-02-15",
      description: "Comprehensive review of mortgage loan documentation for regulatory compliance",
      progress: 65
    },
    {
      id: 2,
      title: "Agricultural Subsidy Audit - Farm Co",
      status: "Pending Review",
      priority: "Medium",
      assignee: "John Doe",
      created: "2024-01-10",
      dueDate: "2024-01-25",
      description: "USDA subsidy program compliance verification and documentation review",
      progress: 90
    },
    {
      id: 3,
      title: "Trade Finance Documentation - Global Exports",
      status: "Completed",
      priority: "Low",
      assignee: "Mike Johnson",
      created: "2024-01-05",
      dueDate: "2024-01-20",
      description: "Letter of credit and export documentation compliance check",
      progress: 100
    },
    {
      id: 4,
      title: "Risk Assessment - Regional Credit Union",
      status: "New",
      priority: "High",
      assignee: "Sarah Wilson",
      created: "2024-01-20",
      dueDate: "2024-02-20",
      description: "Comprehensive risk analysis for new lending products",
      progress: 10
    },
    {
      id: 5,
      title: "Compliance Monitoring - Community Bank",
      status: "In Progress",
      priority: "Medium",
      assignee: "David Brown",
      created: "2024-01-12",
      dueDate: "2024-02-12",
      description: "Ongoing regulatory compliance monitoring and reporting",
      progress: 45
    }
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      'New': 'bg-primary text-white',
      'In Progress': 'bg-warning text-dark',
      'Pending Review': 'bg-info text-white',
      'Completed': 'bg-success text-white'
    };
    return statusClasses[status] || 'bg-secondary text-white';
  };

  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      'High': 'bg-danger text-white',
      'Medium': 'bg-warning text-dark',
      'Low': 'bg-success text-white'
    };
    return priorityClasses[priority] || 'bg-secondary text-white';
  };

  return (
    <div className="container py-5">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="display-4 fw-bold text-secondary-blue mb-2">
            Case Management
          </h1>
          <p className="text-muted">
            Track and manage audit cases with comprehensive workflow tools
          </p>
        </div>
        <button className="btn btn-secondary-blue">
          + New Case
        </button>
      </div>

      {/* Stats Cards */}
      <div className="row g-4 mb-5">
        <div className="col-lg-3 col-md-6">
          <div className="card card-auditdna">
            <div className="card-body text-center">
              <div className="h2 fw-bold text-secondary-blue mb-1">
                {cases.filter(c => c.status === 'New').length}
              </div>
              <div className="text-muted small">New Cases</div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card card-auditdna">
            <div className="card-body text-center">
              <div className="h2 fw-bold text-warning mb-1">
                {cases.filter(c => c.status === 'In Progress').length}
              </div>
              <div className="text-muted small">In Progress</div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card card-auditdna">
            <div className="card-body text-center">
              <div className="h2 fw-bold text-info mb-1">
                {cases.filter(c => c.status === 'Pending Review').length}
              </div>
              <div className="text-muted small">Pending Review</div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="card card-auditdna">
            <div className="card-body text-center">
              <div className="h2 fw-bold text-success mb-1">
                {cases.filter(c => c.status === 'Completed').length}
              </div>
              <div className="text-muted small">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cases Table */}
      <div className="card card-auditdna">
        <div className="card-header bg-accent-yellow">
          <h5 className="card-title mb-0 text-dark">All Cases</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Case ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Assignee</th>
                  <th>Due Date</th>
                  <th>Progress</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cases.map(caseItem => (
                  <tr key={caseItem.id}>
                    <td className="fw-bold">#{caseItem.id}</td>
                    <td>
                      <div className="fw-semibold">{caseItem.title}</div>
                      <small className="text-muted">{caseItem.description}</small>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(caseItem.status)}`}>
                        {caseItem.status}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getPriorityBadge(caseItem.priority)}`}>
                        {caseItem.priority}
                      </span>
                    </td>
                    <td>{caseItem.assignee}</td>
                    <td>{caseItem.dueDate}</td>
                    <td>
                      <div className="progress" style={{height: '8px'}}>
                        <div 
                          className="progress-bar bg-secondary-blue" 
                          style={{width: `${caseItem.progress}%`}}
                        ></div>
                      </div>
                      <small className="text-muted">{caseItem.progress}%</small>
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => setSelectedCase(caseItem)}
                      >
                        View
                      </button>
                      <button className="btn btn-sm btn-outline-primary">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Case Details Modal */}
      {selectedCase && (
        <div className="modal show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-secondary-blue text-white">
                <h5 className="modal-title">
                  Case #{selectedCase.id} - {selectedCase.title}
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setSelectedCase(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Status:</strong>
                    <span className={`badge ms-2 ${getStatusBadge(selectedCase.status)}`}>
                      {selectedCase.status}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <strong>Priority:</strong>
                    <span className={`badge ms-2 ${getPriorityBadge(selectedCase.priority)}`}>
                      {selectedCase.priority}
                    </span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Assignee:</strong> {selectedCase.assignee}
                  </div>
                  <div className="col-md-6">
                    <strong>Due Date:</strong> {selectedCase.dueDate}
                  </div>
                </div>
                <div className="mb-3">
                  <strong>Description:</strong>
                  <p className="mt-2">{selectedCase.description}</p>
                </div>
                <div className="mb-3">
                  <strong>Progress:</strong>
                  <div className="progress mt-2" style={{height: '12px'}}>
                    <div 
                      className="progress-bar bg-secondary-blue" 
                      style={{width: `${selectedCase.progress}%`}}
                    >
                      {selectedCase.progress}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary-blue">Update Status</button>
                <button className="btn btn-accent-green">Add Note</button>
                <button className="btn btn-outline-secondary" onClick={() => setSelectedCase(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cases;
