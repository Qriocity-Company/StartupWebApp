import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCommentAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile";
import TagButton from "../components/tagButton";
import homeimage from "../assets/home.jpeg";
import { useSocket } from "../context/SocketContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [activeCommentBox, setActiveCommentBox] = useState(null); // Track which post is showing the input
  const [commentText, setCommentText] = useState(""); // Track comment input
  const socket = useSocket();

  const toggleUser = () => {
    setIsUserOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchPosts();

    if (socket) {
      socket.on("newNotif", (data) => {
        setNotifications((prev) => [...prev, data.message]);
      });
      return () => {
        socket.off("newNotif");
      };
    }
  }, [socket]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const toggleCommentBox = (postId) => {
    setActiveCommentBox((prev) => (prev === postId ? null : postId));
    setCommentText(""); // Clear input when toggling
  };

  const submitComment = async (postId) => {
    if (!commentText.trim()) return;
    try {
      const res = await axios.post(`http://localhost:5000/api/posts/${postId}/comments`, {
        comment: commentText,
      });
      // Update the specific post's comments in the state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, comments: res.data.comments } : post
        )
      );
      setActiveCommentBox(null); // Hide the comment input box
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative flex flex-col items-center pt-20 pb-10"
      style={{ backgroundImage: `url(${homeimage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 mb-8">
          <div className="flex items-center gap-5">
            <Sidebar />
            <h1 className="text-5xl font-bold text-white">Posts</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/create"
              className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 transition"
            >
              Create Post
            </Link>
            <div className="relative">
              <IoIosNotifications
                onClick={toggleUser}
                className="text-3xl cursor-pointer text-white hover:text-gray-300"
              />
              <div
                className={`absolute bg-blue-300 rounded mt-4 w-52 ${
                  isUserOpen ? "block" : "hidden"
                } transition-all ease-in-out duration-300`}
              >
                <ul>
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <li key={index} className="text-center text-lg m-1">
                        {notification}
                      </li>
                    ))
                  ) : (
                    <li className="text-center text-lg m-1">
                      No new notifications
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <Profile />
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg"
            >
              <img
                src={`http://localhost:5000/${post.image}`}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="flex justify-between items-start mt-4">
                <div>
                  <h2 className="text-3xl font-semibold text-gray-800">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mt-2">{post.description}</p>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <TagButton tags={post.tags} />
                  <button
                    onClick={() => toggleCommentBox(post._id)}
                    className="text-white p-2 rounded bg-emerald-600"
                  >
                    <FaCommentAlt className="size-8 text-white" />
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-white p-2 rounded bg-red-500 hover:bg-red-600"
                  >
                    <RiDeleteBin6Fill className="size-8 text-white" />
                  </button>
                </div>
              </div>

              {/* Comment Input Box */}
              {activeCommentBox === post._id && (
                <div className="mt-4">
                  <input
                    type="text"
                    className="border p-2 w-full rounded"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    onClick={() => submitComment(post._id)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Post Comment
                  </button>
                </div>
              )}

              {/* Comments Section */}
              <div className="mt-4">
                {post.comments.map((comment, index) => (
                  <p key={index} className="text-gray-600">
                    {comment}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
