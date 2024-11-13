import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAddCircleOutline } from "react-icons/io";
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import homeimage from '../assets/home.jpeg';  // Same background as the Home page

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [showTag, setShowTag] = useState(false);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  // Toggles showing the "Add Tag" section
  const showAddTag = () => setShowTag(true);

  // Adds the new tag to the tags array
  const handleTagAdd = () => {
    if (newTag.trim() !== "") {
      setTags(prevTags => [...prevTags, newTag.trim()]);
      setNewTag(""); // Clear input after adding
    }
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('tags', JSON.stringify(tags));
    try {
      await axios.post('http://localhost:5000/api/posts', formData);
      navigate('/home');
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
            <h1 className="text-5xl font-bold text-white">Create Post</h1>
          </div>
          <div className="flex items-center gap-4">
            <Profile />
          </div>
        </div>

        {/* Post Form */}
        <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <label className="block text-gray-800">Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-3 py-2 rounded-md border border-gray-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300"
              required
            />
          </div>

          <div>
            <label className="block text-gray-800">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300"
              required
            />
          </div>

          {/* Tags Section */}
          <button
            type="button"
            className={`bg-green-600 p-2 rounded transition-all hover:bg-green-800 ${showTag ? "hidden" : ""}`}
            onClick={showAddTag}
          >
            Add Tag
          </button>
          <div>
            {showTag && (
              <>
                <input
                  type="text"
                  value={newTag}
                  className="text-black border-none outline-none rounded h-10 p-2"
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Username"
                />
                <button className="bg-green-700 transition-all hover:bg-green-900 rounded m-2 p-2" type="button" onClick={handleTagAdd}>
                  <IoMdAddCircleOutline />
                </button>
              </>
            )}
          </div>

          {tags.length > 0 && (
            <div className="flex gap-4">
              {tags.map((tag, index) => (
                <div key={index} className="bg-gray-500 p-2 rounded-xl">{tag}</div>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-700 p-2 rounded-xl w-full text-white text-xl shadow-md transition-all hover:bg-blue-900"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
