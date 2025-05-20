import React, { useState } from 'react';
import SideBar from './comps/SideBar';
import TopBar from './comps/TopBar';

const Settings = () => {
  const [selectedSection, setSelectedSection] = useState('email');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [notifications, setNotifications] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle settings update logic here
    console.log({
      username,
      email,
      password,
      bio,
      notifications,
    });
    alert('Settings updated');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 md:ml-[20%] p-3">
        {/* Top Bar */}
        <TopBar />

        <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-auto mt-10">
          <h1 className="text-2xl font-semibold mb-6 text-center">Settings</h1>

          {/* Section Tabs */}
          <div className="mb-6 flex space-x-4">
            <button
              onClick={() => setSelectedSection('email')}
              className={`px-4 py-2 rounded-md ${selectedSection === 'email' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Change Email
            </button>
            <button
              onClick={() => setSelectedSection('password')}
              className={`px-4 py-2 rounded-md ${selectedSection === 'password' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Change Password
            </button>
            <button
              onClick={() => setSelectedSection('bio')}
              className={`px-4 py-2 rounded-md ${selectedSection === 'bio' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Update Bio
            </button>
          </div>

          {selectedSection === 'email' && (
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  New Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your new email address"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Update Email
              </button>
            </form>
          )}

          {selectedSection === 'password' && (
            <form onSubmit={handleSubmit}>
              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your new password"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Update Password
              </button>
            </form>
          )}

          {selectedSection === 'bio' && (
            <form onSubmit={handleSubmit}>
              {/* Bio */}
              <div className="mb-4">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Update your bio"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Save Bio
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
