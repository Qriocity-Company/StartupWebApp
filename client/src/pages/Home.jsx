import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaCommentAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import TagButton from '../components/tagButton';
import homeimage from '../assets/home.jpeg';
import Notification from '../components/Notification';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [showTags, setshowTags] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const toggleTags = () => setshowTags(!showTags);

  // Fetch posts data from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  // Handle post deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id)); // Update UI
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative flex flex-col items-center pt-20 pb-10" style={{ backgroundImage: `url(${homeimage})` }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 mb-8">
          <div className="flex items-center gap-5">
            <div className="text-4xl text-white cursor-pointer hover:text-gray-300">
              <Sidebar />
            </div>
            <h1 className="text-5xl font-bold text-white">Posts</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/create"
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 transition"
            >
              Create Post
            </Link>
            <Notification/>
            <Profile />
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.slice(0).reverse().map((post) => (
            <div key={post._id} className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg transition transform">
              <img
                src={`http://localhost:5000/${post.image}`}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="flex justify-between items-start mt-4">
                <div>
                  <h2 className="text-3xl font-semibold text-gray-800">{post.title}</h2>
                  <p className="text-gray-600 mt-2">{post.description}</p>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <TagButton tags={post.tags} />
                  <button className="text-white p-2 rounded bg-emerald-600 hover:bg-emerald-800 transition">
                    <FaCommentAlt />
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-white p-2 rounded bg-red-600 hover:bg-red-800 transition"
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-4">
                <p className="font-semibold text-gray-700">Comments:</p>
                <div className="space-y-2 mt-2">
                  {post.comments.map((comment, index) => (
                    <p key={index} className="p-2 bg-gray-200 rounded">
                      {comment}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
