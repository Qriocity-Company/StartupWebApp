import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import eventsImage from '../assets/events.jpeg';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [externalLink, setExternalLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('externalLink', externalLink);
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/events/create', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      navigate('/events');
    } catch (err) {
      console.error('Failed to create event:', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative pt-20 pb-10"
      style={{ backgroundImage: `url(${eventsImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between px-8 mb-8">
          <Sidebar />
          <h2 className="text-3xl font-bold text-white">Create New Event</h2>
          <Profile />
        </div>

        {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Title Input */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Event Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>

            {/* Description Input */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Event Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Event Image</label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="w-full"
                accept="image/*"
                required
              />
            </div>

            {/* External Link Input */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">External Link</label>
              <input
                type="text"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition ${
                loading ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Creating Event...' : 'Create Event'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
