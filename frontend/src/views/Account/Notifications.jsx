import React from 'react';
import SideBar from './comps/SideBar';
import TopBar from './comps/TopBar';

const Notifications = () => {
  const notifications = [
    { id: 1, message: 'Your account statement is ready for download.', date: '2024-09-07' },
    { id: 2, message: 'A scheduled transfer has been completed.', date: '2024-09-05' },
    { id: 3, message: 'New promotional offers are available for you.', date: '2024-09-03' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 p-3">
        {/* Top Bar */}
        <TopBar />

        {/* Notifications Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-auto mt-10">
          <h1 className="text-2xl font-semibold mb-6">Notifications</h1>
          {notifications.length > 0 ? (
            <ul className="space-y-4">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm flex justify-between items-center"
                >
                  <span>{notification.message}</span>
                  <span className="text-sm text-gray-500">{notification.date}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-gray-700">You have no new notifications.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
