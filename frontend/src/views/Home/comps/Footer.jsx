import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-secondary_theme text-white py-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Quick Links */}
          <div className="mb-6 md:mb-0 flex-1">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-blue-400">About Us</a></li>
              <li><a href="/trading" className="hover:text-blue-400">Trading</a></li>
              <li><a href="/regulations" className="hover:text-blue-400">Regulations</a></li>
              <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="mb-6 md:mb-0 flex-1">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">First St. Vincent Bank Ltd</p>
            <p className="text-sm"> James Street, PO Box 1574, Kingstown, St. Vincent and the Grenadines</p>
            <p className="text-sm">Email: <a href="mailto:globalexpresstrade@gmail.com" className="hover:text-blue-400">globalexpresstrade@gmail.com</a></p>
            {/*<p className="text-sm">Phone: <a href="tel:+1234567890" className="hover:text-blue-400">(123) 456-7890</a></p>*/}
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-center md:items-start flex-1">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-blue-400"><FaFacebookF size={24} /></a>
              <a href="#" className="text-white hover:text-blue-400"><FaTwitter size={24} /></a>
              <a href="#" className="text-white hover:text-blue-400"><FaInstagram size={24} /></a>
              <a href="#" className="text-white hover:text-blue-400"><FaLinkedinIn size={24} /></a>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm">&copy; 2024. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
