import React, { useState, useEffect } from "react";
import SideBar from './comps/SideBar';
import TopBar from './comps/TopBar';
import axiosInstance from "../../api";
import 'react-toastify/dist/ReactToastify.css';
import Toasts from "../../components/Toasts";



function Mining() {
    const [miningStatus, setMiningStatus] = useState();
    const [miningPlan, setMiningPlan] = useState();
    const [miningHashrate, setMiningHashrate] = useState();
    const [miningEfficiency, setMiningEfficiency] = useState();
    const [miningBalance, setMiningBalance] = useState();
    const [message, setMessage] = useState("");
    const [type, setType] = useState("");
    const [cooldown, setCooldown] = useState(false);
  
    const triggerStartToast = () => {
      setMessage("Started Mining");
      setType("success");
      setTimeout(() => {
        setMessage("");
        setType("");
      }, 100);
    };
  
    const triggerSubToast = () => {
      setMessage("Please Subscribe to a mining plan");
      setType("info");
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
  
    const triggerStopToast = () => {
      setMessage("Stopped Mining");
      setType("warning");
      setTimeout(() => {
        setMessage("");
        setType("");
      }, 100);
    };
  
    useEffect(() => {
      const fetchMiningInfo = async () => {
        try {
          const response = await axiosInstance.get("api/user/profile/");
          setMiningStatus(response.data.mining_status);
          setMiningPlan(response.data.mining_plan);
          setMiningBalance(response.data.mining_balance);
          setMiningHashrate(response.data.mining_hashrate);
          setMiningEfficiency(response.data.mining_efficiency);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
      fetchMiningInfo();
    }, []);
  
    const startMining = async () => {
      try {
        const response = await axiosInstance.post('/api/user/start_mining/');
        if (response.status === 200) {
          triggerStartToast();
          setMiningStatus("Active");
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
  
    const stopMining = async () => {
      try {
        const response = await axiosInstance.post('/api/user/stop_mining/');
        if (response.status === 200) {
          triggerStopToast();
          setMiningStatus("Inactive");
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

        <div className="min-h-screen p-2 bg-gray-100 text-gray-900">
            <h1 className="text-[20px] font-bold text-center mb-8">Mining Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Mining Statistics */}
                <div className="bg-primary_theme p-4 text-gray-900 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Mining Statistics</h2>
                <div className="grid grid-cols-2 gap-4">
                    {miningPlan ? (
                    <>
                        <div>
                        <p className="text-lg font-semibold">Current Hashrate:</p>
                        <p className="text-lg">{ miningHashrate }TH/s</p>
                        </div>
                        <div>
                        <p className="text-lg font-semibold">Mining Efficiency:</p>
                        <p className="text-lg">{ miningEfficiency }%</p>
                        </div>
                        <div>
                        <p className="text-lg font-semibold">Mining Plan:</p>
                        <p className="text-lg">{ miningPlan }</p>
                        </div>
                    </>
                    ) : (
                    <>
                        <div>
                        <p className="text-lg font-semibold">Current Hashrate:</p>
                        <p className="text-lg">-- TH/s</p>
                        </div>
                        <div>
                        <p className="text-lg font-semibold">Mining Efficiency:</p>
                        <p className="text-lg">--%</p>
                        </div>
                        <div>
                        <p className="text-lg font-semibold">Mining Plan:</p>
                        <p className="text-lg">No Plan</p>
                        </div>              
                    </>
                    )}

                    <div>
                    <p className="text-lg font-semibold">Status:</p>
                    <p className={`text-lg ${miningStatus === "Active" ? "text-green-600" : "text-red-600"}`}>
                        {miningStatus}
                    </p>
                    </div>
                </div>
                </div>

                {/* Mining Process */}
                <div className="bg-primary_theme text-gray-900 p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Mining Process</h2>
                <div className="mt-4">
                    <p className="text-lg mb-10">Mining Balance: ${miningBalance}</p>
                    {miningStatus === "Inactive" ? (
                    <button 
                        onClick={startMining} 
                        className={`mt-4 px-4 py-2 ${cooldown ? 'bg-gray-500' : 'bg-blue-500'} text-white rounded-md ${!cooldown && 'hover:bg-blue-600'} transition duration-200`}
                        disabled={cooldown}
                    >
                        {cooldown ? "Cooldown..." : "Start Mining"}
                    </button>
                    ) : (
                    <button 
                        onClick={stopMining} 
                        className={`mt-2 px-4 py-2 ${cooldown ? 'bg-gray-500' : 'bg-red-500'} text-white rounded-md ${!cooldown && 'hover:bg-red-600'} transition duration-200`}
                        disabled={cooldown}
                    >
                        {cooldown ? "Cooldown..." : "Stop Mining"}
                    </button>
                    )}
                </div>
                <Toasts message={message} type={type} />
                </div>
            </div>
            </div>
      </div>
    </div>
  );
}

export default Mining;