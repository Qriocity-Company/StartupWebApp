import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAddCircleOutline } from "react-icons/io";
import communitiesimage from '../assets/communities.jpeg';

const CreateCommunity = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object and append the necessary fields
    const formData = new FormData();
    formData.append('title', title);          // Title of the community
    formData.append('description', description);  // Description of the community
    formData.append('image', image);          // Image file for the community

    const token = localStorage.getItem('token');  // Retrieve token from localStorage

    if (!token) {
      console.log('No token found, user is not authenticated');
      return; // You can show a message or redirect to the login page here
    }

    try {
      const response = await axios.post('http://localhost:5000/api/communities', formData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Correct header for token
        },
      });

      console.log('Community created:', response.data); // Handle response if successful
      navigate('/communities');  // Redirect to communities page

    } catch (err) {
      console.error('Error creating community:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col items-center pt-20 pb-10"
      style={{ backgroundImage: `url(${communitiesimage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 w-full max-w-7xl px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-5">
            <div className="text-4xl text-white cursor-pointer hover:text-gray-300">
              <Link to={"/communities"}>
                <p className="hover:scale-125 transition-all -translate-y-14 -translate-x-14 fixed">⬅️</p>
              </Link>
            </div>
            <h1 className="text-5xl font-bold text-white">Create Community</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Community Details</h2>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-lg">Community Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-lg">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full shadow-sm hover:shadow-xl transition-all text-black rounded-xl px-3 py-2 border-0 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-lg">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-black transition-all shadow-sm hover:shadow-xl rounded-xl border-0 outline-none px-3 py-2"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button type="submit" className="bg-blue-600 hover:bg-blue-950 transition-all text-white px-4 py-2 rounded-lg">
              Create Community
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCommunity;
