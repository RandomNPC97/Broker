import React, { useState, useEffect } from 'react';
import SideBar from './comps/SideBar';
import TopBar from './comps/TopBar';
import QRCode from 'react-qr-code';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import axiosInstance from "./../../api";
import 'react-toastify/dist/ReactToastify.css';
import Toasts from "../../components/Toasts";
import sendNotification from '../../components/sendNotification';

const paymentMethods = {
  BTC: '179DkQYraiVJ5K99fwDGTMvv58Vy78fsS3',
  ETH: '0xc50777c73880aae294bf3d53ca72279115f5ca29',
};

const Deposit = () => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('BTC');
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [cryptoAmount, setCryptoAmount] = useState(null);
  const [qrCodeValue, setQrCodeValue] = useState('');
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const triggerSuccessToast = () => {
    setMessage("Deposit Opened Successfully");
    setType("success");
  };

  const triggerErrorToast = () => {
    setMessage("An Error Occurred, Please Try Again");
    setType("error");
  };

  const triggerAmountToast = () => {
    setMessage("The Minimum Deposit is $100");
    setType("error");
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextStep = (e) => {
    if (amount.trim() === '' || isNaN(amount) || amount <= 99) {
      triggerAmountToast();
      return;
    } else {
      e.preventDefault();
      const formData = new FormData();
      formData.append("amount", amount);
      formData.append("method", paymentMethod);
      formData.append("type", "Deposit");
  
      axiosInstance.post("api/user/transactions/", formData)
        .then(response => {  
          if (response.status === 201) {
            triggerSuccessToast();
          } else {
            triggerErrorToast();
          }
          fetchCryptoAmount();
        })
        .catch(error => {
          triggerErrorToast();
        });
    }
  };
  

  const fetchCryptoAmount = async () => {
    try {
      let payMethod = paymentMethod.toLowerCase();
      if (paymentMethod === 'BTC') payMethod = 'bitcoin';
      else if (paymentMethod === 'ETH') payMethod = 'ethereum';

      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${payMethod}&vs_currencies=usd`);
      const rate = response.data[payMethod].usd;
      const cryptoAmt = (amount / rate).toFixed(8);
      setCryptoAmount(cryptoAmt);
      const uri = generatePaymentURI(paymentMethods[paymentMethod], cryptoAmt);
      setQrCodeValue(uri);
      setStep(2);
      sendNotification(amount, {
        title: "Deposit",
        priority: 3
      });
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  };

  const generatePaymentURI = (address, amount) => {
    let uri;
    if (paymentMethod === 'BTC') {
      uri = `bitcoin:${address}?amount=${amount}`;
    } else if (paymentMethod === 'ETH') {
      const weiAmount = (amount * 1e18).toFixed(0); // Convert to Wei
      uri = `ethereum:${address}?value=${weiAmount}`;
    }
    return uri;
  };

  const renderDepositSteps = () => (
    <div className="bg-gray-100 text-gray-900 p-5 w-full">
      {step === 1 ? (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-8 text-center">Enter Deposit Details</h2>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
              Deposit Amount (USD)
            </label>
            <input
              type="number"
              id="amount"
              className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter amount - Minimum Deposit is $50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMethod">
              Payment Method
            </label>
            <select
              id="paymentMethod"
              className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              {Object.keys(paymentMethods).map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded focus:outline-none w-full transition-all mt-8"
            onClick={handleNextStep}
          >
            Next
          </button>
          <Toasts message={message} type={type} />
        </div>
      ) : (
        <div className="mt-5">
          <h2 className="text-xl font-bold mb-6 text-center">Deposit Details (Your deposit will be rectified in 1 hour)</h2>
          <div className="mb-6 flex justify-center">
            <QRCode value={qrCodeValue} size={180} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Payment Amount (USD)
            </label>
            <input
              type="text"
              className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 bg-gray-50 focus:outline-none focus:ring focus:border-blue-500"
              value={`$ ${amount}`}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Payment Amount ({paymentMethod})
            </label>
            <div className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 bg-gray-50 focus:outline-none focus:ring focus:border-blue-500">
              {cryptoAmount} {paymentMethod}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Payment Address ({paymentMethod})
            </label>
            <input
              type="text"
              className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-500"
              value={paymentMethods[paymentMethod]}
              readOnly
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Time Remaining
            </label>
            <div className="text-2xl font-bold text-red-600">{formatTime(timeLeft)}</div>
          </div>
          <div className="mb-6">
            <CopyToClipboard text={paymentMethods[paymentMethod]} onCopy={() => setCopied(true)}>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded focus:outline-none w-full transition-all">
                {copied ? 'Copied' : 'Copy Address'}
              </button>
            </CopyToClipboard>
          </div>
          <Toasts message={message} type={type} />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-200">
      <SideBar />
      <div className="flex-1 md:ml-[20%] p-3">
        <TopBar />
        <div className="flex flex-col justify-center items-center mt-5">
          {renderDepositSteps()}
        </div>
      </div>
    </div>
  );
};

export default Deposit;
