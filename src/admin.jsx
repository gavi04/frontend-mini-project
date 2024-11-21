/* eslint-disable no-unused-vars */
// import  { useState, useEffect } from "react";
// import axios from "axios";

// const Admin = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     company: "",
//     type: "",
//     location: "",
//     package: "",
//     deadline: "",
//     cgpaCutoff: "",
//     description: "",
//     applicationLink: "",
//     status: "open", // Default status
//   });
//   const [jobs, setJobs] = useState([]);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentJobId, setCurrentJobId] = useState(null);

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   const fetchJobs = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/jobs", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setJobs(response.data);
//     } catch (e){
//       setError("Failed to fetch jobs.");
//       console.log(e);
      
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     const isoDeadline = new Date(formData.deadline).toISOString();
//     const dataToSubmit = {
//       ...formData,
//       deadline: isoDeadline,
//     };

//     try {
//       if (isEditing) {
//         // Update job posting
//         await axios.put(`http://localhost:3000/jobs/update/${currentJobId}`, dataToSubmit, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setSuccess("Job posting updated successfully!");
//       } else {
//         // Create new job posting
//         await axios.post("http://localhost:3000/jobs", dataToSubmit, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setSuccess("Job posting created successfully!");
//       }

//       setFormData({
//         title: "",
//         company: "",
//         type: "",
//         location: "",
//         package: "",
//         deadline: "",
//         cgpaCutoff: "",
//         description: "",
//         applicationLink: "",
//         status: "open",
//       });
//       setIsEditing(false);
//       setCurrentJobId(null);
//       fetchJobs(); // Refresh job list
//     } catch (error) {
//       setError(error.response?.data?.error || "An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleEdit = (job) => {
//     setFormData(job);
//     setIsEditing(true);
//     setCurrentJobId(job.id);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this job posting?")) {
//       try {
//         await axios.delete(`http://localhost:3000/jobs/${id}`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         setSuccess("Job posting deleted successfully!");
//         fetchJobs(); // Refresh job list
//       } catch (error) {
//         setError("Failed to delete job posting.");
//         console.log(error);
        
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">{isEditing ? "Edit Job Posting" : "Create Job Posting"}</h1>

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         {success && (
//           <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
//             {success}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
//             <input
//               type="text"
//               name="company"
//               value={formData.company}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
//             <input
//               type="text"
//               name="type"
//               value={formData.type}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//             <input
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Package</label>
//             <input
//               type="text"
//               name="package"
//               value={formData.package}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
//             <input
//               type="date"
//               name="deadline"
//               value={formData.deadline}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">CGPA Cutoff</label>
//             <input
//               type="text"
//               name="cgpaCutoff"
//               value={formData.cgpaCutoff}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Application Link</label>
//             <input
//               type="url"
//               name="applicationLink"
//               value={formData.applicationLink}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className={`w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 ${
//               loading ? "opacity-50 cursor -not-allowed" : ""
//             }`}
//             disabled={loading}
//           >
//             {loading ? (isEditing ? "Updating..." : "Creating...") : (isEditing ? "Update Job Posting" : "Create Job Posting")}
//           </button>
//         </form>
//       </div>

//       <div className="mt-8 w-full max-w-md">
//         <h2 className="text-xl font-bold text-gray-800 mb-4">Job Postings</h2>
//         <ul className="space-y-4">
//           {jobs.map((job) => (
//             <li key={job.id} className="bg-white p-4 rounded shadow">
//               <h3 className="font-semibold">{job.title}</h3>
//               <p>{job.company}</p>
//               <p>{job.location}</p>
//               <p>{job.deadline}</p>
//               <div className="mt-2">
//                 <button
//                   onClick={() => handleEdit(job)}
//                   className="mr-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(job.id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Admin;




import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Admin = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    type: "",
    location: "",
    package: "",
    deadline: "",
    cgpaCutoff: "",
    description: "",
    applicationLink: "",
    status: "open",
  });
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/jobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setJobs(response.data);
    } catch (e) {
      setError("Failed to fetch jobs.");
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const isoDeadline = new Date(formData.deadline).toISOString();
    const dataToSubmit = {
      ...formData,
      deadline: isoDeadline,
    };

    try {
      if (isEditing) {
        console.log("not");
        
        await axios.put(`http://localhost:3000/jobs/update/${currentJobId}`, dataToSubmit, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSuccess("Job posting updated successfully!");
      } else {
        await axios.post("http://localhost:3000/jobs", dataToSubmit, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSuccess("Job posting created successfully!");
      }

      setFormData({
        title: "",
        company: "",
        type: "",
        location: "",
        package: "",
        deadline: "",
        cgpaCutoff: "",
        description: "",
        applicationLink: "",
        status: "open",
      });
      setIsEditing(false);
      setCurrentJobId(null);
      fetchJobs(); // Refresh job list
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove the token
    navigate('/'); // Navigate to the login page
  };

  const handleEdit = (job) => {
    setFormData(job);
    setIsEditing(true);
    setCurrentJobId(job.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      try {
        await axios.delete(`http://localhost:3000/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSuccess("Job posting deleted successfully!");
        fetchJobs(); // Refresh job list
      } catch (error) {
        setError("Failed to delete job posting.");
        console.log(error);
      }
    }
  };

  return (
    <div className="container">
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <button
        onClick={handleSignOut}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        style={{
          margin: "10px",
          float: "right",
          position: "absolute",
          top: "0",
          right: "0",
        }}
      >
        Sign Out
      </button>
      <div className=" bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h1>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500 text-white p-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job Title"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company Name"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Job Type"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="package"
            value={formData.package}
            onChange={handleChange}
            placeholder="Salary Package"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="cgpaCutoff"
            value={formData.cgpaCutoff}
            onChange={handleChange}
            placeholder="CGPA Cutoff"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Job Description"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="url"
            name="applicationLink"
            value={formData.applicationLink}
            onChange={handleChange}
            placeholder="Application Link"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200"
          >
            {isEditing ? "Update Job" : "Create Job"}
          </button>
        </form>
      </div>

      <div className="mt-8 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">Job Listings</h2>
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li key={job.id} className="bg-white rounded-lg shadow-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{job.title}</h3>
                <p className="text-gray-600">{job.company} - {job.location}</p>
                <p className="text-gray-500">{job.deadline}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(job)}
                  className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-200 flex items-center"
                >
                  <FaEdit className="mr-1" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200 flex items-center"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Admin;