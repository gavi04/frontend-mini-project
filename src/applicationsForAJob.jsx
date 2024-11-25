/* eslint-disable no-undef */
import {  useState } from 'react';
import axios from 'axios';

const JobApplications = () => {
  const backendUrl = process.env.VITE_REACT_APP_BACKEND_URL;
  const [jobId, setJobId] = useState('');
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchApplications = async () => {
    if (!jobId.trim()) {
      setError('Please enter a valid Job ID');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `${backendUrl}/jobs/list/${jobId}/applications`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`, // Use admin token for authentication
          },
        }
      );
      setApplications(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Applications</h1>

      <div className="mb-4">
        <input
          type="text"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          placeholder="Enter Job ID"
          className="border px-4 py-2 mr-2"
        />
        <button
          onClick={fetchApplications}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch Applications
        </button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {!loading && applications.length > 0 && (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Student ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">CGPA</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td className="border px-4 py-2">{application.student.id}</td>
                <td className="border px-4 py-2">{application.student.name}</td>
                <td className="border px-4 py-2">{application.student.email}</td>
                <td className="border px-4 py-2">{application.student.cgpa}</td>
                <td className="border px-4 py-2">{application.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobApplications;
