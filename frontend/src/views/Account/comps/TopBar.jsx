import React from 'react';

const TopBar = () => {
  return (
    <div className="bg-white p-4 flex flex-col md:flex-row justify-between mt-20 md:mt-0 items-start md:items-center shadow">
      <h1 className="text-xl font-semibold mb-4 md:mb-0">Welcome!</h1>
      <div className="flex items-center space-x-4">
        <a href='/deposit' className="bg-blue-500 text-white py-2 px-4 rounded">New Deposit</a>

      </div>
    </div>
  );
};

export default TopBar;
