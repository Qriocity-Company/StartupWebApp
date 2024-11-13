import { useNavigate } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import { useState, useContext } from 'react';
import loginimage from '../assets/login.jpeg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isLoginSuccessful = await login(email, password);
      if (isLoginSuccessful) {
        navigate('/home'); // Navigate to home page on successful login
      } else {
        alert("Invalid credentials!"); // Show error if login fails
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${loginimage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Login Form Container */}
      <div className="relative z-10 w-full max-w-md p-10 bg-white bg-opacity-90 shadow-xl rounded-xl">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Login
            </button>
          </div>

          {/* Additional Links */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
            <p className="text-sm text-gray-500">
              <a href="#" className="text-blue-600 hover:underline">
                Forgot your password?
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
