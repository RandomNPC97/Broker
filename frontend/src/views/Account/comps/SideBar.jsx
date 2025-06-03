import React, { useState, useEffect } from 'react';
import { useAuth } from "../../../AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api";
import {
  FaBars,
  FaHome,
  FaPiggyBank,
  FaChartLine,
  FaBitcoin,
  FaUsers,
  FaExchangeAlt,
  FaHistory,
  FaCog,
  FaSignOutAlt,
  FaPlus,
} from 'react-icons/fa';

const SideBar = () => {
  const navigate = useNavigate();
  const { user_logout, isAuthenticated } = useAuth();

  // Define user profile state
  const [User1, setUser1] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("api/user/profile/");
        setUser1(response.data);
        console.log(User.deposit_balance)
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, []);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfile({ ...userProfile, profile_pic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scroll
    } else {
      document.body.style.overflow = ''; // Enable scroll
    }
    return () => {
      document.body.style.overflow = ''; // Clean up on unmount
    };
  }, [isOpen]);

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      user_logout();
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      {/* Toggle button for small screens */}
      <div className="md:hidden p-4 bg-gray-900 text-white flex fixed top-0 w-full justify-between items-center z-10">
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          <FaBars size={34} />
        </button>
        {/* Logo */}
        <div className="text-2xl font-bold">
          <img src="./assets/logo.png" alt="Logo" className="h-10 inline" />
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:fixed overflow-y-scroll scrollbar-thin scrollbar-gray-600 scrollbar-track-gray-200 w-[70%] md:w-[20%] bg-gray-900 text-white p-5 z-20`}
      >
        {/* Acount Details Section */}
        <div className="flex flex-col justify-center items-center mb-6 md:mb-3">
          <div className="relative">
            <div className="w-[100px] h-[100px] rounded-full flex items-center justify-center overflow-hidden">
              <img src='./assets/logo.png' alt="Profile" className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Profile Name */}
          <div>
            <h1 className="pt-4 text-[14px] text-center">{User1.full_name}</h1>
          </div>
        </div>

        {/* Sidebar Links */}
        <ul className="space-y-4">
          <a href="/dashboard" className="hover:bg-gray-700 p-2 rounded flex items-center">
            <FaHome className="mr-2" />
            <span>Dashboard</span>
          </a>
          <a href="/deposit" className="hover:bg-gray-700 p-2 rounded flex items-center">
            <FaPiggyBank className="mr-2" />
            <span>Deposit</span>
          </a>
          <a href="/plans" className="hover:bg-gray-700 p-2 rounded flex items-center">
            <FaChartLine className="mr-2" />
            <span>Upgrade Plans</span>
          </a>
          <a href="/traderoom" className="hover:bg-gray-700 p-2 rounded flex items-center">
            <FaExchangeAlt className="mr-2" />
            <span>Trade Room</span>
          </a>
          <a href="/mining" className="hover:bg-gray-700 p-2 rounded flex items-center">
            <FaBitcoin className="mr-2" />
            <span>Mining</span>
          </a>
          <a href="/referrals" className="hover:bg-gray-700 p-2 rounded flex items-center">
            <FaUsers className="mr-2" />
            <span>Referrals</span>
          </a>
          <a href="/withdrawal" className="hover:bg-gray-700 p-2 rounded flex items-center">
            <FaExchangeAlt className="mr-2" />
            <span>Withdrawal</span>
          </a>
          <a href="/transactions" className="hover:bg-gray-700 p-2 rounded flex items-center">
            <FaHistory className="mr-2" />
            <span>Transactions</span>
          </a>
          {/*<a href="/settings" className="hover:bg-gray-700 p-2 rounded flex items-center">
            <FaCog className="mr-2" />
            <span>Settings</span>
          </a>*/}
          <a onClick={handleLogout} className="hover:bg-gray-700 p-2 rounded flex items-center cursor-pointer">
            <FaSignOutAlt className="mr-2" />
            <span>Sign Out</span>
          </a>
        </ul>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed h-full inset-0 bg-black opacity-20 overflow-hidden md:hidden z-10"
        />
      )}
    </>
  );
};

export default SideBar;
