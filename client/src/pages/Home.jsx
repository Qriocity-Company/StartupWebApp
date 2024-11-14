import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCommentAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile";
import TagButton from "../components/tagButton";
import homeimage from "../assets/home.jpeg";
import { io } from "socket.io-client";
import { useSocket } from "../context/SocketContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const socket = useSocket();

  // Toggle for notifications menu
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
      console.log("Socket is connected:", socket.connected); // Check if connected
      socket.on("newNotif", (data) => {
        console.log("Received new post notification:", data.message);
        setNotifications((prev) => [...prev, data.message]);
      });
  
      return () => {
        socket.off("newnotif");
      };
    }
  }, []);

  // Handle post deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
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

            {/* Notification icon and dropdown */}
            <div className="relative">
              <IoIosNotifications
                onClick={toggleUser}
                className="text-3xl cursor-pointer text-white hover:text-gray-300"
              />
              <div
                className={`absolute bg-blue-300 rounded mt-4 w-52 ${
                  isUserOpen ? "block" : "hidden"
                } transition-all ease-in-out duration-300`}
                style={{ top: "100%", left: "0", zIndex: 1000 }}
              >
                <ul>
                  {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                      <li
                        key={index}
                        className="text-center text-lg m-1 transition-all rounded-md"
                      >
                        <div className="flex">
                          <IoIosNotifications className="size-10 m-1" />{" "}
                          {notification}
                        </div>
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
          {posts
            .slice(0)
            .reverse()
            .map((post) => (
              <div
                key={post._id}
                className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg transition transform"
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
                    <button className="text-white p-2 rounded bg-emerald-600">
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
