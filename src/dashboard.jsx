import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('openings');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    location: 'all'
  });

  // Get token and user info from localStorage
  const token = localStorage.getItem('token');
  const userInfo = token ? JSON.parse(atob(token.split('.')[1])) : null;

  useEffect(() => {
    fetchJobs();
    if (userInfo?.userId) {
      fetchUserApplications();
    }
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/jobs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(response.data);
    } catch (err) {
      setError('Failed to fetch jobs');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserApplications = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userInfo.userId}/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(response.data);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await axios.post('http://localhost:3000/applications', {
        studentId: userInfo.userId,
        jobId: jobId,
        status: 'pending'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh applications after applying
      fetchUserApplications();
      
      alert('Application submitted successfully!');
    } catch (err) {
      alert('Failed to submit application');
      console.error('Error applying:', err);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.type === 'all' || job.type === filters.type;
    const matchesLocation = filters.location === 'all' || job.location === filters.location;
    return matchesSearch && matchesType && matchesLocation;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back, {userInfo?.email}</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('openings')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'openings'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Job Openings
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-2 rounded-lg ${
              activeTab === 'applications'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            My Applications
          </button>
        </div>

        {activeTab === 'openings' && (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-wrap gap-4">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="full-time">Full Time</option>
                  <option value="internship">Internship</option>
                  <option value="contract">Contract</option>
                </select>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Locations</option>
                  <option value="remote">Remote</option>
                  <option value="onsite">Onsite</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            {/* Job Listings */}
            {loading ? (
              <div className="text-center py-10">Loading...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-600">{error}</div>
            ) : (
              <div className="grid gap-6">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                        <p className="text-gray-600">{job.company}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {job.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600">Location: {job.location || 'Not specified'}</p>
                        <p className="text-gray-600">Type: {job.type || 'Not specified'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Package: {job.package || 'Not disclosed'}</p>
                        <p className="text-gray-600">CGPA Cutoff: {job.cgpaCutoff || 'None'}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        Deadline: {formatDate(job.deadline)}
                      </p>
                      <button
                        onClick={() => handleApply(job.id)}
                        disabled={applications.some(app => app.jobId === job.id)}
                        className={`px-4 py-2 rounded-lg ${
                          applications.some(app => app.jobId === job.id)
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {applications.some(app => app.jobId === job.id) ? 'Applied' : 'Apply Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'applications' && (
          <div className="grid gap-6">
            {applications.map((application) => (
              <div key={application.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{application.job.title}</h2>
                    <p className="text-gray-600">{application.job.company}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    application.status === 'approved' ? 'bg-green-100 text-green-800' :
                    application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {application.status}
                  </span>
                </div>
                <div className="text-gray-600">
                  <p>Applied on: {formatDate(application.appliedAt)}</p>
                  <p>Package: {application.job.package || 'Not disclosed'}</p>
                </div>
              </div>
            ))}
            {applications.length === 0 && (
              <div className="text-center py-10 text-gray-600">
                You have not  applied to any jobs yet.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;