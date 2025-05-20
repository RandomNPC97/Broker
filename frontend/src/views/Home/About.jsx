import React from 'react';
import Navbar from './comps/Navbar';
import Footer from './comps/Footer';

function About() {
  return (
    <div className="bg-white">
      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('./assets/hero-bg-3.jpg')" }}
      >
        <div className="bg-black bg-opacity-50 h-full w-full flex items-center justify-center py-24">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">ABOUT US</h1>
            <p className="text-lg md:text-2xl mb-8">Driving Innovation in Brokerage and Mining Services</p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section id="history" className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our History</h2>
          <p className="text-gray-700 mb-6 text-center max-w-2xl mx-auto">
            Established in 2010, we have grown from a small financial services provider to a global leader in brokerage and mining solutions. Over the years, we have built a reputation for innovation, transparency, and client satisfaction, empowering individuals and businesses to achieve their financial goals.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center">
            {/* Image Section */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img
                src="./assets/3.jpeg" // Replace with your image path
                alt="About Us"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Text Section */}
            <div className="md:w-1/2 md:pl-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">About Us</h2>
              <p className="text-gray-700 mb-6">
                Our platform is dedicated to providing cutting-edge solutions for trading, investing, and cryptocurrency mining. With a focus on customer success, we offer state-of-the-art tools, real-time analytics, and personalized support to help clients maximize their potential in the financial and mining sectors.
              </p>

              {/* Mission and Vision */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Our Mission & Vision</h3>
                <p className="text-gray-700 mb-4">
                  Our mission is to empower individuals and businesses by simplifying access to financial markets and mining operations. We envision a future where anyone can thrive in the fast-paced world of digital finance and mining, backed by our expertise and technology.
                </p>
              </div>

              {/* Key Values Section */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Our Core Values:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>
                    <strong>Integrity:</strong> Ensuring transparency and trust in all our interactions and services.
                  </li>
                  <li>
                    <strong>Innovation:</strong> Continuously evolving our platform to meet the needs of modern traders and miners.
                  </li>
                  <li>
                    <strong>Excellence:</strong> Providing top-tier services and resources for unmatched client success.
                  </li>
                  <li>
                    <strong>Community:</strong> Building a network of clients and partners who share our vision for a prosperous future.
                  </li>
                </ul>
              </div>

              {/* Call to Action Button */}
              <div className="flex justify-center md:justify-start">
                <a
                  href="#contact"
                  className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300"
                >
                  Join Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default About;
