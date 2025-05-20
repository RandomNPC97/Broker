import React, { useState, useEffect } from 'react';
import { IoLogoBitcoin } from "react-icons/io5";

const namesWithCountries = [
  { name: 'Emily Johnson', country: 'USA' },
  { name: 'Jacob Smith', country: 'Canada' },
  { name: 'Olivia Brown', country: 'UK' },
  { name: 'Michael Davis', country: 'Australia' },
  { name: 'Ava Martinez', country: 'Spain' },
  { name: 'Ethan Garcia', country: 'Mexico' },
  { name: 'Sophia Rodriguez', country: 'Argentina' },
  { name: 'William Wilson', country: 'New Zealand' },
  { name: 'Isabella Anderson', country: 'Norway' },
  { name: 'James Taylor', country: 'Ireland' },
  { name: 'Mia Thomas', country: 'South Africa' },
  { name: 'Alexander Hernandez', country: 'Brazil' },
  { name: 'Charlotte Moore', country: 'France' },
  { name: 'Daniel Martin', country: 'Germany' },
  { name: 'Amelia Jackson', country: 'Italy' },
  { name: 'Matthew Thompson', country: 'Sweden' },
  { name: 'Harper White', country: 'Netherlands' },
  { name: 'Lucas Harris', country: 'Switzerland' },
  { name: 'Abigail Lewis', country: 'Denmark' },
  { name: 'Henry Lee', country: 'South Korea' },
  { name: 'Ella Walker', country: 'Japan' },
  { name: 'Jackson Hall', country: 'China' },
  { name: 'Grace Allen', country: 'Singapore' },
  { name: 'Sebastian Young', country: 'Malaysia' },
  { name: 'Lily King', country: 'India' },
  { name: 'Benjamin Wright', country: 'Russia' },
  { name: 'Scarlett Scott', country: 'Ukraine' },
  { name: 'Samuel Green', country: 'Israel' },
  { name: 'Victoria Adams', country: 'Greece' },
  { name: 'Aiden Baker', country: 'Portugal' },
];

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomPerson = () => {
  const randomIndex = Math.floor(Math.random() * namesWithCountries.length);
  return namesWithCountries[randomIndex];
};

const WithdrawalNotification = () => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateMessage = () => {
      const person = getRandomPerson();
      const amount = getRandomNumber(1000, 100000);
      setMessage(`${person.name} from ${person.country} just withdrew $${amount}`);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 4000); // Hide message after 4 seconds
    };

    updateMessage(); // Initial message
    const interval = setInterval(updateMessage, 6000); // Update every 6 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className={`fixed top-20 left-3 z-50 bg-secondary_theme2 w-[300px] py-2 px-2 inline-block transition duration-1000 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center">
            <IoLogoBitcoin size={35} color='white' className="mr-2" />
        <p className='text-[15px] text-white'>{message}</p>
      </div>
    </div>
  );
};

export default WithdrawalNotification;
