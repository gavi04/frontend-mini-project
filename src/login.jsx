/* eslint-disable no-undef */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ThaparLogin = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  if (!backendUrl) {
    console.error("Error: BACKEND_URL is not defined in the environment variables.");
  }

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login request
        const response = await axios.post(`${backendUrl}/login`, {
          email: formData.email,
          password: formData.password
        });

        // Store the token in localStorage
        localStorage.setItem('token', response.data.token);

        // Redirect to dashboard on successful login
        console.log('Login successful', response.data);
        navigate('/dashboard');
      } else {
        // Signup request
        const response = await axios.post(`${backendUrl}/signup`, {
          email: formData.email,
          password: formData.password,
          name: formData.name
        });

        console.log('Signup successful', response.data);
        setIsLogin(true); // Automatically switch to login after signup
      }
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Thapar University</h1>
          <p className="text-gray-600">Placement Portal</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>

          {/* Toggle between Login and Sign Up */}
          <div className="text-center mt-4 flex justify-evenly">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </button>
            <button
              onClick={() => navigate('/adminlogin')}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Admin Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ThaparLogin;
