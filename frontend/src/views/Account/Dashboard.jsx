import React, { useState, useEffect } from "react";
import SideBar from './comps/SideBar';
import TopBar from './comps/TopBar';
import AccountCard from './comps/AccountCard';
import TradingViewWidget3 from '../../components/TradingViewWidget3';
import axiosInstance from "../../../api";
import {
  FaFileAlt,
  FaPiggyBank,
  FaChartLine,
  FaExchangeAlt,
} from 'react-icons/fa';


function Dashboard() {
  const [User, setUser] = useState({});
  const [Trades, setTrades] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("api/user/profile/");
        setUser(response.data);
        console.log(User.deposit_balance)
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchTrades = async () => {
      try {
        const response = await axiosInstance.get("api/user/trades/");
        setTrades(response.data.trades);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
    fetchTrades();
  }, []);

    // Calculate the indices for slicing the Trades array
    const indexOfLastTrade = currentPage * itemsPerPage;
    const indexOfFirstTrade = indexOfLastTrade - itemsPerPage;
    const currentTrades = Trades.slice(indexOfFirstTrade, indexOfLastTrade);  
    const totalPages = Math.ceil(Trades.length / itemsPerPage);

  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 md:ml-[20%] p-3">
        {/* Top Bar */}
        <TopBar />
        <TradingViewWidget3 />

        {/* Account Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
          <AccountCard accountName="Deposit Balance" balance={User.deposit_balance} />
          <AccountCard accountName="Trading Profit/Loss" balance={User.trade_balance} />
          <AccountCard accountName="Mining Balance" balance={User.mining_balance} />
          <AccountCard accountName="Bonus Balance" balance={User.bonus_balance} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md my-6">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="grid grid-cols-2 gap-4 sm:flex sm:justify-around sm:space-y-0 space-y-3">
            <li className="flex flex-col items-center hover:bg-gray-100 p-4 rounded-lg cursor-pointer transition-colors">
              <a href="/plans" className="flex flex-col items-center w-full">
                <FaChartLine className="text-indigo-600 mb-2" size={36}  />
                <span className="text-sm sm:text-base text-gray-800">Upgrade Plans</span>
              </a>
            </li>
            <li className="flex flex-col items-center hover:bg-gray-100 p-4 rounded-lg cursor-pointer transition-colors">
              <a href="/deposit" className="flex flex-col items-center w-full">
                <FaPiggyBank className="text-pink-600 mb-2" size={36} />
                <span className="text-sm sm:text-base text-gray-800">Make a Deposit</span>
              </a>
            </li>
            <li className="flex flex-col items-center hover:bg-gray-100 p-4 rounded-lg cursor-pointer transition-colors">
              <a href="/traderoom" className="flex flex-col items-center w-full">
                <FaExchangeAlt className="text-green-600 mb-2" size={36} />
                <span className="text-sm sm:text-base text-gray-800">Traderoom</span>
              </a>
            </li>
            <li className="flex flex-col items-center hover:bg-gray-100 p-4 rounded-lg cursor-pointer transition-colors">
              <a href="/withdrawal" className="flex flex-col items-center w-full">
                <FaFileAlt className="text-blue-600 mb-2" size={36} />
                <span className="text-sm sm:text-base text-gray-800">Make a withdrawal</span>
              </a>
            </li>
          </ul>

        </div>

        {/*<div className="w-[97%] border border-black overflow-hidden">
          <TradingViewWidget2 />
        </div>*/}

        


        {/* Transactions Section */}
        <div className="bg-white p-4 rounded-lg shadow-md my-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[15px]">Trades</h2>
          </div>
          <ul className="divide-y divide-gray-300">
            {currentTrades.map((trade) => (
              <li key={trade.id} className="py-2">
                <p className="text-[12px] text-text_theme">
                  {new Date(trade.date).toLocaleDateString()} 
                </p>
                <p className="text-[22px]">
                  {trade.asset} - {trade.quantity}
                </p>
                <p className="text-[18px] text-text_theme">
                  {trade.type} - ${trade.price}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-4">
            <button 
              onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-secondary_theme text-white rounded-md"
            >
              Previous
            </button>
            <p className="text-text_theme">
              Page {currentPage} of {totalPages}
            </p>
            <button 
              onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-secondary_theme text-white rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
