import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import communitiesimage from '../assets/communities.jpeg';
import { FaUserPlus, FaTrash } from 'react-icons/fa';

const Communities = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all communities
  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/communities');
        setCommunities(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchCommunities();
  }, []);

  // Function to join a community
  const handleJoin = async (communityId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/communities/join/${communityId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommunities((prevCommunities) =>
        prevCommunities.map((community) =>
          community._id === communityId
            ? { ...community, members: [...community.members, { _id: 'currentUserId' }] }
            : community
        )
      );
    } catch (err) {
      console.error('Failed to join community', err);
    }
  };

  // Function to delete a community
  const handleDelete = async (communityId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(
        `http://localhost:5000/api/communities/${communityId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommunities((prevCommunities) =>
        prevCommunities.filter((community) => community._id !== communityId)
      );
      alert(res.data.msg);
    } catch (err) {
      console.error('Failed to delete community', err);
      alert('Failed to delete community');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col items-center pt-20 pb-10"
      style={{ backgroundImage: `url(${communitiesimage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 w-full max-w-7xl px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-5">
            <div className="text-4xl text-white cursor-pointer hover:text-gray-300">
              <Sidebar />
            </div>
            <h1 className="text-5xl font-bold text-white">Communities</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/create-community"
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 transition"
            >
              Create Community
            </Link>
            <Profile />
          </div>
        </div>

        {/* Communities Grid */}
        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {communities.map((community) => (
              <div
                key={community._id}
                className="relative bg-white bg-opacity-90 p-6 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:bg-opacity-100"
              >
                {/* Community Image */}
                <img
                  src={`http://localhost:5000/${community.image}`}
                  alt="Community"
                  className="w-full h-40 object-cover rounded-lg"
                />

                {/* Community Title and Truncated Description */}
                <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                  {community.title}
                </h2>
                <p className="text-gray-600 mt-2">
                  {community.description.length > 100
                    ? `${community.description.substring(0, 100)}...`
                    : community.description}
                </p>

                {/* Expanded Content on Hover */}
<div className="absolute inset-0 flex flex-col justify-between p-6 bg-white bg-opacity-95 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
  {/* Full Description */}
  <div className="flex-1 mb-4 overflow-auto">
    <h3 className="text-xl font-semibold text-gray-900 mb-3">Description:</h3>
    <p className="text-gray-800 text-sm leading-relaxed">{community.description}</p>
  </div>

  {/* List of Members */}
  {community.members.length > 0 && (
    <div className="mb-4">
      <h4 className="font-semibold text-gray-900 text-lg mb-2">Participants:</h4>
      <div className="flex flex-wrap gap-2">
        {community.members.map((user) => (
          <div
            key={user._id}
            className="p-2 bg-green-200 text-gray-800 rounded-lg shadow hover:bg-green-300 transition"
          >
            {user.name}
          </div>
        ))}
      </div>
    </div>
  )}

  {/* Join and Delete Buttons */}
  <div className="flex gap-4 items-center mt-6">
    {/* Join Button */}
    <button
      onClick={() => handleJoin(community._id)}
      className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
    >
      <FaUserPlus size={20} />
      <span className="text-sm font-medium">Join</span>
    </button>

    {/* Delete Button */}
    <button
      onClick={() => handleDelete(community._id)}
      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
    >
      <FaTrash size={20} />
      <span className="text-sm font-medium">Delete</span>
    </button>
  </div>
</div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Communities;
