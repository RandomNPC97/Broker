import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import HamburgerMenu from "./Hamburger";

const navlinks = [
  { id: 1, path: "/", name: "Home" },
  { id: 2, path: "/about", name: "About us" },
  { id: 3, path: "/services", name: "Our Services" },
  { id: 4, path: "/trading", name: "Trading" },
  { id: 7, path: "/education", name: "Education" },
  { id: 8, path: "/regulations", name: "Regulations" },
  { id: 9, path: "/contact", name: "Contact Us" },
];

function Navbar(props) {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-secondary_theme text-white text-center py-2 fixed inset-x-0 top-0 z-40">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="mailto:globalexpresstrade@gmail.com" className="hover:text-blue-300">
            globalexpresstrade@gmail.com
          </a>
          <a
            href="login"
            className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-500"
          >
            Login
          </a>
        </div>
      </div>

      {/* Navbar */}
      <header className="bg-primary_theme text-text_theme shadow-lg sticky top-12 z-50">
        <div className="container mx-auto flex justify-between items-center py-2 px-6 md:px-10">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link to="/">
              <img src="./assets/logo.png" alt="Logo" className="h-16 inline" />
            </Link>
          </div>

          {/* Hamburger Menu for Small Screens */}
          <div className="sm:hidden flex items-center space-x-4">
            <HamburgerMenu propData={navlinks} />
          </div>

          {/* Navigation Links for Larger Screens */}
          <div className="hidden sm:flex items-center space-x-8 w-full justify-end">
            <nav className="space-x-8">
              {navlinks.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-400 text-lg font-bold"
                      : "text-lg hover:text-blue-400 transition duration-300"
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
