import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Profile from '../components/Profile';
import homeimage from '../assets/home.jpeg';

const SettingsPage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [editMode, setEditMode] = useState(false);
  const [changePasswordMode, setChangePasswordMode] = useState(false); // New state to toggle password change mode
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newDetails, setNewDetails] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');  
        const res = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(res.data);
        setNewDetails({
          name: res.data.name,
          email: res.data.email,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserDetails();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/auth/me', newDetails, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUser(newDetails);
      setEditMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePasswordChange = async () => {
    console.log("Old Password: ", oldPassword);  // Log old password
    console.log("New Password: ", newPassword);  // Log new password
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/api/auth/update-password', {
        password: oldPassword,  // Ensure the key is 'password' not 'oldPassword'
        newPassword: newPassword,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      console.log(response.data);  // Log success response
      setOldPassword('');
      setNewPassword('');
      setChangePasswordMode(false); // Hide the password fields after successful change
    } catch (err) {
      console.error('Error updating password:', err.response ? err.response.data : err);
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
            <h1 className="text-5xl font-bold text-white">Settings</h1>
          </div>
          <div className="flex items-center gap-4">
            <Profile />
          </div>
        </div>

        {/* Settings Content */}
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Personal Details</h2>
          {editMode ? (
            <>
              <div className="mb-4">
                <input
                  type="text"
                  value={newDetails.name}
                  onChange={(e) => setNewDetails({ ...newDetails, name: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  value={newDetails.email}
                  onChange={(e) => setNewDetails({ ...newDetails, email: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700"><strong>Name:</strong> {user.name}</p>
              <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
              <div className="mt-4">
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-all"
                >
                  Edit Details
                </button>
              </div>
            </>
          )}

          {/* Security Section */}
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700">Security</h2>
            {changePasswordMode ? (
              <>
                <div className="mb-4">
                <input
  type="password"
  value={oldPassword}
  onChange={(e) => {
    setOldPassword(e.target.value);
    console.log('Old Password:', e.target.value);  // Log the old password on each change
  }}
  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
  placeholder="Enter old password"
/>
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handlePasswordChange}
                    className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-all"
                  >
                    Change Password
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-start">
                <button
                  onClick={() => setChangePasswordMode(true)}
                  className="bg-orange-600 text-white py-2 px-6 rounded-md hover:bg-orange-700 transition-all"
                >
                  Change Password
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
