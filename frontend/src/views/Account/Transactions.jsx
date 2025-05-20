import React from 'react';

const Transactions = () => {
  const transactions = [
    { id: 1, description: 'Grocery Store', amount: '-$50.00', date: '2024-09-07' },
    { id: 2, description: 'Salary', amount: '+$5000.00', date: '2024-09-05' },
    { id: 3, description: 'Utility Bill', amount: '-$120.00', date: '2024-09-03' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <ul className="space-y-4">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="flex justify-between items-center">
            <span>{transaction.description}</span>
            <span className={`font-semibold ${transaction.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {transaction.amount}
            </span>
            <span className="text-gray-500">{transaction.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
