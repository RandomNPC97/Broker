import SideBar from './comps/SideBar';
import TopBar from './comps/TopBar';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const History = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of transactions to display per page

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosInstance.get("api/user/transactions/");
        setTransactions(response.data.transaction_history);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Calculate the index of the first and last transactions on the current page
  const indexOfLastTransaction = currentPage * itemsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Calculate the total number of pages
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  // Method to handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 md:ml-[20%] p-3">
        {/* Top Bar */}
        <TopBar />

        {/* Transactions Section */}
        <div className="bg-white p-4 mt-10 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Your Transaction History</h2>



          {/* Card layout for smaller screens */}
          <div className="block  space-y-4">
            {currentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="border rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <p className="text-sm font-medium">
                  <span className="font-bold">Type:</span> {transaction.type}
                </p>
                <p className="text-sm">
                  <span className="font-bold">Amount:</span> ${transaction.amount}
                </p>
                <p className="text-sm">
                  <span className="font-bold">Date:</span> {transaction.date}
                </p>
                <p className="text-sm">
                  <span className="font-bold">Method:</span> {transaction.method}
                </p>
                <p className="text-sm">
                  <span className="font-bold">Status:</span> {transaction.status}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              className={`py-2 px-4 ${currentPage === 1 ? 'text-gray-500' : 'text-blue-500'}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaArrowLeft /> Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`py-2 px-4 ${currentPage === totalPages ? 'text-gray-500' : 'text-blue-500'}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
