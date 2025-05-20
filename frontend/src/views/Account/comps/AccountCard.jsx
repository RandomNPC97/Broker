import React from 'react';

const AccountCard = ({ accountName, balance }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{accountName}</h3>
      <p className="text-2xl font-bold mt-2">${balance}</p>
    </div>
  );
};

export default AccountCard;
