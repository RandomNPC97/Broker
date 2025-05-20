
import SideBar from './comps/SideBar';
import TopBar from './comps/TopBar';

import { FaCreditCard, FaFileAlt, FaCalendarCheck, FaListUl } from 'react-icons/fa';
import React, { useState, useEffect } from "react";
import axiosInstance from "../../api";
import TradingViewWidget2 from "../../components/TradingViewWidget2";
import 'react-toastify/dist/ReactToastify.css';
import Toasts from "../../components/Toasts";
import axios from "axios";

const Assets = [
  // Cryptocurrencies
  "bitcoin",
  "ethereum",
  "litecoin",
  "ripple",
  "cardano",
  
  // Stocks
  "AAPL", // Apple
  "MSFT", // Microsoft
  "AMZN", // Amazon
  "GOOGL", // Google
  "FB", // Facebook
  "TSLA", // Tesla
  "NVDA", // Nvidia
  "JPM", // JPMorgan
  "V", // Visa
  "JNJ" // Johnson & Johnson
];




function TradeRoom() {
  const [User, setUser] = useState({});
  const [portfolio, setPortfolio] = useState([]);
  const [asset, setAsset] = useState(Assets[0]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Buy");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [Messagetype, setMessageType] = useState("");
  const [cooldown, setCooldown] = useState(false);
  const [TradeStatus, setTradeStatus] = useState();
  const [showGraph, setShowGraph] = useState(false); // State to toggle visibility

  const triggerOpenToast = () => {
    setMessage("Trade Opened Successfully");
    setMessageType("success");
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 100);
  };

  const triggerCloseToast = () => {
    setMessage("Insufficient Deposit Amount");
    setMessageType("error");
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 100);
  };

  const triggerClosToast = () => {
    setMessage("Insufficient Asset");
    setMessageType("error");
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 100);
  };

  const triggerCloToast = () => {
    setMessage("User does not own this asset");
    setMessageType("error");
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 100);
  };

  const triggerAmountToast = () => {
    setMessage("The Minimum Amount is $50");
    setMessageType("error");
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 100);
  };

  const triggerStartToast = () => {
    setMessage("Started Trading");
    setMessageType("success");
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 100);
  };

  const triggerSubToast = () => {
    setMessage("Please Subscribe to a trading plan");
    setMessageType("info");
    setTimeout(() => {
      setMessage("");
      setType("");
    }, 100);
  };

  const triggerErrorToast = () => {
    setMessage("An Error Occurred, Please Try Again");
    setMessageType("error");
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 100);
  };

  const triggerStopToast = () => {
    setMessage("Stopped Trading");
    setMessageType("warning");
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 100);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("api/user/profile/");
        setUser(response.data);
        setTradeStatus(response.data.trade_status);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    const fetchPortfolio = async () => {
      try {
        const response = await axiosInstance.get("api/user/trades/");
        setPortfolio(response.data.assets);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    };
    fetchUser();
    fetchPortfolio();
  }, []);

  const handleAssetSelect = (e) => {
    const selectedAsset = e.target.value;
    setAsset(selectedAsset);
    fetchAmount(selectedAsset, amount);
  };

  const fetchAmount = async (asset, amount) => {
    try {
      const isCrypto = ["bitcoin", "ethereum", "litecoin", "ripple", "cardano"].includes(asset);
      let rate;
      if (isCrypto) {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${asset}&vs_currencies=usd`);
        rate = response.data[asset].usd;
      } else {
        const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY';
        const response = await axios.get(`https://www.alphavantage.co/query`, {
          params: {
            function: 'TIME_SERIES_INTRADAY',
            symbol: asset,
            interval: '1min',
            apikey: apiKey
          }
        });

        const timeSeries = response.data['Time Series (1min)'];
        if (timeSeries) {
          const latestTime = Object.keys(timeSeries)[0];
          rate = parseFloat(timeSeries[latestTime]['4. close']);
        } else {
          throw new Error("Invalid API response for stock data");
        }
      }
      const assetAmt = (amount / rate).toFixed(8);
      setQuantity(assetAmt);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    fetchAmount(asset, newAmount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount.trim() === '' || isNaN(amount) || amount <= 49) {
      triggerAmountToast();
      return;
    }

    const formData = new FormData();
    formData.append("asset", asset);
    formData.append("price", amount);
    formData.append("quantity", quantity);
    formData.append("type", type);

    axiosInstance.post("api/user/trades/", formData)
    .then(response => {
      if (response.status === 201) {
        triggerOpenToast();
      } else if(response.status === 202){
        triggerCloseToast();
      } else if(response.status === 203){
        triggerClosToast();
      } else if(response.status === 204){
        triggerCloToast();
      } else {
        triggerErrorToast();
      }
    })
    .catch(error => {
      triggerErrorToast();
    });
  };

  const startTrading = async () => {
    try {
      const response = await axiosInstance.post('/api/user/start_trading/');
      if (response.status === 200) {
        triggerStartToast();
        setTradeStatus("Active");
      } else {
        triggerSubToast();
      }
      setCooldown(true);
      setTimeout(() => {
        setCooldown(false);
      }, 60000); // 1 minute cooldown
    } catch (error) {
      triggerErrorToast();
      setCooldown(false);
    }
  };

  const stopTrading = async () => {
    try {
      const response = await axiosInstance.post('/api/user/stop_trading/');
      if (response.status === 200) {
        triggerStopToast();
        setTradeStatus("Inactive");
      } else {
        triggerErrorToast();
      }
      setCooldown(true);
      setTimeout(() => {
        setCooldown(false);
      }, 60000); // 1 minute cooldown
    } catch (error) {
      triggerErrorToast();
      setCooldown(false);
    }
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="flex-1 md:ml-[20%] p-3">
        {/* Top Bar */}
        <TopBar />
        <div className="min-h-screen p-4 bg-gray-100 text-gray-900">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="lg:col-span-2">
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Deposit Balance */}
                    <div className="bg-primary_theme p-5 rounded-lg shadow-md lg:col-span-2 ">
                      <h2 className="text-[15px] mb-2">Deposit Balance</h2>
                      <p className="text-2xl font-bold">${User.deposit_balance}</p>
                    </div>

                    {/* Profit/Loss */}
                    <div className="bg-primary_theme p-5 rounded-lg shadow-md lg:col-span-2">
                      <h2 className="text-[15px] mb-2">Profit/Loss</h2>
                      <p className="text-2xl font-bold">${User.trade_balance}</p>
                    </div>
                  </div>
                  <div className="bg-primary_theme mt-5 rounded-lg mb-8">
                    <TradingViewWidget2 />
                  </div>

                  {/* Portfolio Section */}
                  <div className="bg-primary_theme p-5 mt-5 rounded-lg mb-8">
                    <h2 className="text-[20px] font-semibold mb-4">Portfolio</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {portfolio.length > 0 ? (
                        portfolio.map((item) => (
                          <div key={item.asset} className="bg-secondary_theme p-4 rounded-lg shadow-md">
                            <h3 className="text-[15px] mb-2 capitalize">{item.name}</h3>
                            <p className="text-xl font-bold">{item.quantity}</p>
                          </div>
                        ))
                        ) : (
                        <p className="text-center">No assets in portfolio.</p>
                      )}
                    </div>
                  </div>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                {/* Trade Statistics */}
                <div className="bg-primary_theme p-4 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-2">Trade Statistics</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-lg font-semibold">Status:</p>
                      <p className={`text-lg ${TradeStatus === "Active" ? "text-green-600" : "text-red-600"}`}>
                        {TradeStatus}
                      </p>
                    </div>
                    {User.trade_plan ? (
                      <>
                        <div>
                          <p className="text-lg font-semibold">Trade Plan:</p>
                          <p className="text-lg">{User.trade_plan}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <p className="text-lg font-semibold">Trade Plan:</p>
                          <p className="text-lg">No Plan</p>
                        </div>
                      </>
                    )}
                    <div>
                      <p className="text-lg font-semibold">Profit/Loss:</p>
                      <p className="text-lg">${User.trade_balance}</p>
                    </div>
                    <div>
                      {TradeStatus === "Inactive" ? (
                        <button
                          onClick={startTrading}
                          className={`mt-4 px-4 py-2 ${cooldown ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded-md ${!cooldown && 'hover:bg-blue-600'} transition duration-200`}
                          disabled={cooldown}
                        >
                          {cooldown ? "Cooldown..." : "Start Trade"}
                        </button>
                      ) : (
                        <button
                          onClick={stopTrading}
                          className={`mt-2 px-4 py-2 ${cooldown ? 'bg-gray-500' : 'bg-red-500'} text-white rounded-md ${!cooldown && 'hover:bg-red-600'} transition duration-200`}
                          disabled={cooldown}
                        >
                          {cooldown ? "Cooldown..." : "Stop Trade"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary_theme p-5 mt-5 rounded-lg mb-8">
                <h2 className="text-[20px] font-semibold mb-4">Place a Trade</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-white">Asset</label>
                    <select
                      value={asset}
                      onChange={handleAssetSelect}
                      className="mt-1 text-black p-2 w-full border rounded-md"
                    >
                      {Assets.map((asset) => (
                        <option key={asset} value={asset}>
                          {asset}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-white">Amount</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={handleAmountChange}
                      className="mt-1 text-black p-2 w-full border rounded-md"
                      placeholder="e.g. $50"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-white">Quantity</label>
                    <input
                      type="text"
                      value={quantity}
                      readOnly
                      className="mt-1 text-black p-2 w-full border rounded-md"
                      placeholder="Enter Quantity"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-white">Type</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="mt-1 text-black p-2 w-full border rounded-md"
                    >
                      <option value="Buy">Buy</option>
                      <option value="Sell">Sell</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full py-2 bg-secondary_theme2 text-white rounded-md hover:bg-secondary_theme transition duration-200">
                    Place Trade
                  </button>
                  <Toasts message={message} type={Messagetype} />
                </form>
              </div>
            </div>
          </div>
        </div>
    </div>



      </div>
    </div>
  );
}

export default TradeRoom;
