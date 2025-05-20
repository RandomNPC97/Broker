import React, { useState, useEffect } from "react";
import SideBar from './comps/SideBar';
import TopBar from './comps/TopBar';
import axiosInstance from "../../api";
import 'react-toastify/dist/ReactToastify.css';
import Toasts from "../../components/Toasts";



function Plans() {
  const tradePlans= [
    {
      name: "Basic Plan",
      price: 200,
      features: ["Access to Market Data", "Email Support", "Daily Market Updates", "Limited Trade Alerts"],
    },
    {
      name: "Standard Plan",
      price: 500,
      features: ["Basic Plan+", "Trade Alerts", "Access to Webinars", "Access Workshops"],
    },
    {
      name: "Premium Plan",
      price: 1000,
      features: ["Standard Plan+", "24/7 Priority Support", "Daily Market Updates", "Personal Account Manager"],
    }
  ]

  const MiningPlans = [
    {
        name: "Bronze Plan",
        price: 500.00,
        hashrate: 5.00,
        efficiency: 0.50,
    },
    {
        name: "Silver Plan",
        price: 2000.00,
        hashrate: 15.00,
        efficiency: 0.75,
    },
    {
        name: "Gold Plan",
        price: 5000.00,
        hashrate: 30.00,
        efficiency: 0.80,
    },
    {
      name: "Diamond Plan",
      price: 10000.00,
      hashrate: 50.00,
      efficiency: 0.85,
    },
    {
      name: "Platinum Plan",
      price: 20000.00,
      hashrate: 75.00,
      efficiency: 0.90,
    },
    {
      name: "VIP",
      price: 50000.00,
      hashrate: 90.00,
      efficiency: 0.95,
  }
  ]

  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const triggerSuccessToast = () => {
    setMessage("Plan Subscribed Successfully");
    setType("success");
    setTimeout(() => {
      setMessage("");
      setType("");
    }, 100);
  };

  const triggerErrorToast = () => {
    setMessage("An Error Occurred, Please Try Again");
    setType("error");
    setTimeout(() => {
      setMessage("");
      setType("");
    }, 100);
  };

  const triggerRepToast = () => {
    setMessage("You Are Already On this Plan");
    setType("error");
    setTimeout(() => {
      setMessage("");
      setType("");
    }, 100);
  };

  const triggerAmountToast = () => {
    setMessage("Insufficient Deposit Balance");
    setType("warning");
    setTimeout(() => {
      setMessage("");
      setType("");
    }, 10);
  };


  const handleTradingPurchase = async (planName) => {
    try {
      const response = await axiosInstance.post(`/api/user/purchase_trade_plan/${planName}/`);
      if (response.status === 201) {
        triggerSuccessToast();
      } else if (response.status== 203){
        triggerRepToast();
      } else if (response.status== 204){
        triggerAmountToast();
      }else{
        triggerErrorToast();
      }
    } catch (error) {
      triggerErrorToast();
    }
  };

  const handleMiningPurchase = async (planName) => {
    try {
      const response = await axiosInstance.post(`/api/user/purchase_mining_plan/${planName}/`);
      if (response.status === 201) {
        triggerSuccessToast();
      } else if (response.status== 203){
        triggerRepToast();
      } else if (response.status== 204){
        triggerAmountToast();
      }else{
        triggerErrorToast();
      }
    } catch (error) {
      triggerErrorToast();
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

        <div className="min-h-screen rounded-lg p-4 bg-gray-100 text-gray-900">
          <h1 className="text-[20px] font-bold text-center mb-8">Trading Plans</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tradePlans.map((plan) => (
            <div key={plan.name} className="bg-primary_theme p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
                <p className="text-xl font-bold mb-4">${plan.price}</p>
                <ul className="mb-4">
                  {plan.features.map((feature, index) => (
                      <li key={feature} className="text-text_theme">
                      {feature}
                      </li>
                  ))}
                </ul>
                <button
                className="w-full py-2 bg-secondary_theme2 text-white rounded-md hover:bg-secondary_theme"
                onClick={() => handleTradingPurchase(plan.name)}
                >
                Purchase
                </button>
            </div>
            ))}
          </div>
          <h1 className="text-[20px] mt-10 font-bold text-center mb-8">Mining Plans</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MiningPlans.map((plan) => (
            <div key={plan.name} className="bg-primary_theme p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
                <p className="text-xl font-bold mb-4">${plan.price}</p>
                <ul className="mb-4">
                  <li className="text-text_theme">Mining Hashrate - {plan.hashrate}TH/s</li>
                  <li className="text-text_theme">Mining Efficiency - {plan.efficiency}%</li>
                </ul>
                <button className="w-full py-2 bg-secondary_theme2 text-white rounded-md hover:bg-secondary_theme" onClick={() => handleMiningPurchase(plan.name)}>
                Purchase
                </button>
            </div>
            ))}
          </div>
          <Toasts message={message} type={type}/>
        </div>
      </div>
    </div>
  );
}

export default Plans;