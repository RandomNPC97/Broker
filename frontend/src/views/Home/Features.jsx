import React from 'react';
import Navbar from './comps/Navbar';
import Footer from './comps/Footer';

function Features() {
  const programs = [
    {
      id: 1,
      title: 'Investment Brokerage',
      description: 'Our brokerage service offers tailored investment opportunities, real-time market insights, and expert financial guidance to maximize your returns.',
    },
    {
      id: 2,
      title: 'Cryptocurrency Mining Solutions',
      description: 'We provide state-of-the-art mining platforms, tools, and consultancy to help you harness the power of blockchain technology.',
    },
    {
      id: 3,
      title: 'Financial Planning & Analysis',
      description: 'Our financial experts deliver comprehensive planning and analytical services, ensuring you stay ahead in today’s dynamic markets.',
    },
    // Add more programs as needed
  ];

  return (
    <div className="bg-white">
      <Navbar />
      {/* Hero Section */}
      <section
        id="hero"
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('./assets/1.jpg')" }} // Update image to suit brokerage/mining theme
      >
        <div className="bg-black bg-opacity-50 h-full w-full flex items-center justify-center py-24">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">OUR SERVICES</h1>
            <p className="text-lg md:text-2xl mb-8">Empowering you to thrive in financial markets and mining industries</p>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Key Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map(program => (
              <div key={program.id} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-3">{program.title}</h3>
                <p className="text-gray-700">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default Features;
