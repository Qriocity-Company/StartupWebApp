import { useState } from 'react';
import { LuMenuSquare } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Menu Icon */}
      <LuMenuSquare
        onClick={toggleSidebar}
        className="text-white text-3xl cursor-pointer hover:text-gray-300 transition"
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 backdrop-blur-md bg-gray-800 bg-opacity-30 text-white shadow-lg transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="pt-20 px-8">
          <h2 className="text-3xl font-bold mb-10 text-center">Menu</h2>
          <ul className="space-y-6 text-lg">
            <Link to="/home" onClick={toggleSidebar}>
              <li className="flex items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-700/40 transition">
                <span>🏠</span>
                <span>Posts</span>
              </li>
            </Link>
            <Link to="/events" onClick={toggleSidebar}>
              <li className="flex items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-700/40 transition">
                <span>📅</span>
                <span>Events</span>
              </li>
            </Link>
            <Link to="/communities" onClick={toggleSidebar}>
              <li className="flex items-center gap-2 py-3 px-4 rounded-md hover:bg-gray-700/40 transition">
                <span>👥</span>
                <span>Communities</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
