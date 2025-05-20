// src/pages/Contact.jsx
import React from 'react';
import Navbar from './comps/Navbar';
import Footer from './comps/Footer';

function Contact() {
  return (
    <div className="bg-white">
      <Navbar />
      {/* Hero Section */}
      <section id="hero" className="relative bg-cover bg-center" style={{ backgroundImage: "url('./assets/hero-bg-3.jpg')" }}>
        <div className="bg-black bg-opacity-50 h-full w-full flex items-center justify-center py-24">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">CONTACT US</h1>
            <p className="text-lg md:text-2xl mb-8">For more enquiries kindly notify us using the form below</p>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <form className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your Name" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your Email" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Message</label>
              <textarea id="message" rows="4" placeholder="Your Message" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300">Send Message</button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
