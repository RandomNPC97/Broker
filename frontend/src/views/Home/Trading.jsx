// src/pages/TradingProcess.jsx
import React from 'react';
import Navbar from './comps/Navbar';
import Footer from './comps/Footer';

function TradingProcess() {
  return (
    <div className="bg-white">
      <Navbar />
      {/* Hero Section */}
      <section
        id="hero"
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('./assets/2.webp')" }} // Update to a trading-related image
      >
        <div className="bg-black bg-opacity-50 h-full w-full flex items-center justify-center py-24">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">TRADING PROCESS</h1>
            <p className="text-lg md:text-2xl mb-8">Simplifying your journey to successful trading</p>
            <a
              href="#steps"
              className="bg-blue-500 text-white py-4 px-6 rounded-full hover:bg-blue-700 transition duration-300"
            >
              GET STARTED NOW
            </a>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-center text-gray-700 mb-16">
            Join our platform to unlock powerful tools and expert insights. Our trading process is streamlined to make your experience smooth and profitable.
          </p>

          {/* Trading Steps */}
          <div id="steps" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-3">Step 1: Create an Account</h3>
              <p className="text-gray-700">
                Sign up for a free account to access our trading platform and tools. Registration is quick and easy.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-3">Step 2: Verify Your Identity</h3>
              <p className="text-gray-700">
                Complete the KYC process by submitting your identification documents to ensure a secure trading environment.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-3">Step 3: Fund Your Wallet</h3>
              <p className="text-gray-700">
                Deposit funds into your trading wallet using a variety of secure payment methods.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-3">Step 4: Start Trading</h3>
              <p className="text-gray-700">
                Explore the markets, analyze trends, and place trades with confidence using our advanced tools.
              </p>
            </div>
          </div>

          {/* Contact for More Info */}
          <div className="text-center mt-12">
            <p className="text-gray-700">
              Need assistance? Contact our support team at <strong>globalexpresstrade@gmail.com</strong>.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default TradingProcess;
