import { CiUser } from "react-icons/ci";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";

const Notification = () => {
  const [isuserOpen, setIsuserOpen] = useState(true);
  const toggleUser = () => {
    setIsuserOpen(!isuserOpen);
  };

  return (
    <div className="bg-blue-300 hover:bg-blue-500 mx-2 h-fit text-2xl cursor-pointer hover:shadow-md transition-all hover:shadow-black shadow p-2 rounded relative">
      <IoIosNotifications onClick={toggleUser} />
      <div
        className={`absolute bg-blue-300 rounded mt-4 w-40 ${isuserOpen ? "hidden" : "visible"} transition-all ease-in-out duration-300`}
        style={{
          top: '100%', // Position it right below the button
          left: '0',  // Align it to the left of the button (you can tweak this if needed)
          zIndex: 1000, // Ensure it stays above other content
        }}
      >
        <ul>
          
          
            <li className="text-center text-lg transition-all rounded-md cursor-pointer">
              No New Notifications
            </li>
          
         
        </ul>
      </div>
    </div>
  );
};

export default Notification;
