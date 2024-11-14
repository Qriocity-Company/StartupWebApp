import { useState, useEffect } from "react";
import { IoIosNotifications } from "react-icons/io";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000/");

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false); // Start closed
  const [notifications, setNotifications] = useState([]);

  const toggleUser = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    // Listen for new post notifications
    socket.on("newPost", (data) => {
      setNotifications((prev) => [...prev, data.message]);
      console.log(notifications)
    });

    // Cleanup on component unmount
    return () => {
      socket.off("newPost");
    };
  }, []);

  return (
    <div className="bg-blue-300 hover:bg-blue-500 mx-2 h-fit text-2xl cursor-pointer hover:shadow-md transition-all hover:shadow-black shadow p-2 rounded relative">
      <IoIosNotifications onClick={toggleUser} />
      <div
        className={`absolute bg-blue-300 rounded mt-4 w-52 ${
          isOpen ? "block" : "hidden"
        } transition-all ease-in-out duration-300`}
        style={{
          top: '0',
          left: '0',
          zIndex: 0, // Make sure this is on top of other elements
        }}
      >
        <ul>
          {notifications.map((notification, index) => (
            <li
              key={index}
              className="text-center text-lg m-1 transition-all rounded-md"
            >
              <div className="flex">
                <IoIosNotifications className="size-10 m-1" /> {notification}
                
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notification;
