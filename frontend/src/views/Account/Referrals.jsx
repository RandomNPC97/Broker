import React, { useState, useEffect } from "react";
import SideBar from './comps/SideBar';
import TopBar from './comps/TopBar';
import axiosInstance from "../../api";
import 'react-toastify/dist/ReactToastify.css';
import Toasts from "../../components/Toasts";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaShareAlt, FaCopy } from 'react-icons/fa';

function Referrals() {
  const [referrals, setReferrals] = useState([]);
  const [referralCode, SetReferralCode] = useState("");
  const referralLink = `http://192.168.43.8:5173/signup?code=${referralCode}`;

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        const response = await axiosInstance.get("api/user/referrals/");
        SetReferralCode(response.data.referral_code);
        setReferrals(response.data.referred_users);
      } catch (error) {
        console.error("Error fetching referrals:", error);
      }
    };

    fetchReferrals();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 md:ml-[20%] p-3">
        {/* Top Bar */}
        <TopBar />
        <div className="min-h-screen bg-gray-100 text-gray-900 p-3">
          <h1 className="text-[20px] font-bold text-center mb-8">Referral Program</h1>
          <div className="w-full mx-auto bg-primary_theme p-4 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Referral Link</h2>
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 text-black p-2 border rounded-md mr-2"
              />
              <CopyToClipboard text={referralLink}>
                <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200 flex items-center">
                  <FaCopy className="mr-2" /> Copy
                </button>
              </CopyToClipboard>
            </div>
          </div>
          <div className="w-full mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Your Referrals</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">ID</th>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Plan</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((referral) => (
                  <tr key={referral.id}>
                    <td className="py-2 px-4">{referral.id}</td>
                    <td className="py-2 px-4">{referral.full_name}</td>
                    <td className="py-2 px-4">{referral.trade_plan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Referrals;