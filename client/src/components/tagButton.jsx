import React, { useState } from 'react';
import { FaTag } from 'react-icons/fa';
const TagButton = ({ tags }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to handle hover state
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="relative inline-block">
      {/* Tag Button */}
      <button 
      className="text-white p-2 text-xl mx-2 rounded bg-blue-800 hover:bg-blue-900 transition-all"
      onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FaTag />
        </button>
      

      {/* Popup for tagged users */}
      {isHovered && (
        <div
          className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}  // Keep popup open if hovering over it
        >
          <ul>
            {tags.length > 0 ? (
              tags.map((tag, index) => (
                <li key={index} className="text-gray-800 py-1">
                  {tag}
                </li>
              ))
            ) : (
              <li className="text-gray-500 px-2 py-1">No tagged users</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TagButton;
