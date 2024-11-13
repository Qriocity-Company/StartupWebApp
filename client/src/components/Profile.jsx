import { CiUser } from "react-icons/ci";
import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [isuserOpen, setIsuserOpen] = useState(true);
  const toggleUser = () => {
    setIsuserOpen(!isuserOpen);
  };

  return (
    <div className="bg-blue-300 hover:bg-blue-500 mx-2 h-fit text-2xl cursor-pointer hover:shadow-md transition-all hover:shadow-black shadow p-2 rounded relative">
      <CiUser onClick={toggleUser} />
      <div
        className={`absolute bg-blue-300 rounded mt-4 w-24 ${isuserOpen ? "hidden" : "visible"} transition-all ease-in-out duration-300`}
        style={{
          top: '100%', // Position it right below the button
          left: '0',  // Align it to the left of the button (you can tweak this if needed)
          zIndex: 1000, // Ensure it stays above other content
        }}
      >
        <ul>
          
          <Link to={"/settings"}>
            <li className="hover:bg-blue-100 text-center py-2 text-lg transition-all rounded-md cursor-pointer">
              Settings
            </li>
          </Link>
          <Link to={"/"}>
            <li className="hover:bg-blue-100 text-center py-2 text-lg transition-all rounded-md cursor-pointer">
              Logout
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
