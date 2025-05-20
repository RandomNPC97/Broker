import React, { useState } from 'react';
import SideBar from './comps/SideBar';
import TopBar from './comps/TopBar';
//import Transactions from './Transactions';
import 'react-toastify/dist/ReactToastify.css';
import Toasts from "../../components/Toasts";
const Withdrawal = () => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [wallet, setWallet] = useState('trade_balance');
  const [btcAddress, setBtcAddress] = useState('');
  const [code, setCode] = useState(""); // Correct the state setter here

  const triggerSuccessToast = () => {
    setMessage("Withdrawal Opened Successfully");
    setType("success");
  };

  const triggerErrorToast = () => {
    setMessage("An Error Occurred, Please Try Again");
    setType("error");
  };

  const triggerInsufficientToast = () => {
    setMessage("Insufficient Amount");
    setType("error");
  };

  const triggerAmountToast = () => {
    setMessage("The Minimum Withdrawal is $1000");
    setType("error");
  };

  const triggerCodeToast = () => {
    setMessage("Invalid Code, Contact an admin");
    setType("error");
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    if (amount.trim() === '' || isNaN(amount) || amount <= 999) {
      triggerAmountToast();
      return;
    } else {
      if (code === "BE6Y91") { // Correctly compare code value
        const formData = new FormData();
        formData.append("amount", amount);
        formData.append("method", "BTC");
        formData.append("type", "Withdrawal");
        formData.append("wallet", wallet);

        try {
          const response = await axiosInstance.post("api/user/transactions/", formData);
          if (response.status === 201) {
            setStep(2);
            triggerSuccessToast();
          } else if (response.status === 203) {
            triggerInsufficientToast();
          } else {
            triggerErrorToast();
          }
        } catch (error) {
          triggerErrorToast();
        }
      } else {
        triggerCodeToast();
        return;
      }
    }
  };

  const renderDepositSteps = () => (
    <div className="bg-gray-100 p-0 w-full text-gray-900">
      {step === 1 ? (
        <div className="mt-[100px]">
          <h2 className="text-[20px] font-bold mb-5 text-center">Open A Withdrawal</h2>
          <div className="mb-4">
            <label className="block text-text_theme text-sm font-bold mb-2" htmlFor="amount">
              Withdrawal Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              className="shadow appearance-none border rounded w-full py-4 px-5 text-text_theme leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-text_theme text-sm font-bold mb-2" htmlFor="paymentMethod">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              className="shadow appearance-none border rounded w-full py-4 px-5 text-text_theme leading-tight focus:outline-none focus:shadow-outline"
            >
              <option>Bitcoin</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-text_theme text-sm font-bold mb-2" htmlFor="wallet">
              Withdrawal Wallet
            </label>
            <select
              id="wallet"
              className="shadow appearance-none border rounded w-full py-4 px-5 text-text_theme leading-tight focus:outline-none focus:shadow-outline"
              value={wallet}
              onChange={(e) => setWallet(e.target.value)}
            >
              <option value="trade_balance">Trade Balance</option>
              <option value="mining_balance">Mining Balance</option>
              <option value="bonus_balance">Bonus Balance</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-text_theme text-sm font-bold mb-2" htmlFor="btcAddress">
              Bitcoin Wallet Address
            </label>
            <input
              type="text"
              id="btcAddress"
              className="shadow appearance-none border rounded w-full py-4 px-5 text-text_theme leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Bitcoin Wallet Address"
              value={btcAddress}
              onChange={(e) => setBtcAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-text_theme text-sm font-bold mb-2" htmlFor="withdrawalCode">
              Withdrawal Code (Contact an admin)
            </label>
            <input
              type="text"
              id="withdrawalCode"
              className="shadow appearance-none border rounded w-full py-4 px-5 text-text_theme leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Withdrawal Code"
              value={code}
              onChange={(e) => setCode(e.target.value)} // Use setCode correctly here
            />
          </div>
          <div className="mt-20">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              onClick={handleNextStep}
            >
              Next
            </button>
            <Toasts message={message} type={type} />
          </div>
        </div>
      ) : (
        <div className="mt-[50px]">
          <h2 className="text-2xl font-bold mb-5 text-center">Withdrawal Opened Successfully</h2>
          <div className="mb-4">
            <label className="block text-text_theme text-sm font-bold mb-2">
              Withdrawn Amount ($)
            </label>
            <div className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-text_theme leading-tight">
              {amount}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-text_theme text-sm font-bold mb-2">
              Bitcoin Wallet Address
            </label>
            <div className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-text_theme leading-tight">
              {btcAddress}
            </div>
          </div>
          <Toasts message={message} type={type} />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 md:ml-[20%] p-3">
        {/* Top Bar */}
        <TopBar />
        <div className="min-h-screen flex flex-col pl-7 pr-7 space-y-5">
          {renderDepositSteps()}
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
