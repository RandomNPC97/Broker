import React from "react";
import { Sling as Hamburger } from 'hamburger-react'
import { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { NavLink, Link } from 'react-router-dom';
import { FaAngleDoubleRight } from "react-icons/fa";


const HamburgerMenu = ({propData}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
      document.body.style.overflow = 'visible'; // Enable scrolling
    }

    // Cleanup function to ensure scrolling is enabled when the component unmounts
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <>
    <OutsideClickHandler
        onOutsideClick={() => {
          setIsOpen(false);
        }}
      >
        <div className="overflow-auto text-white">
          <Hamburger 
            toggled={isOpen} 
            toggle={setIsOpen} 
            size={32}
            rounded
            distance="sm"
            color="black"
            />
            {isOpen && (
              <div className="fixed z-10 hamburger-style h-full bg-primary_theme w-[70%] top-0 right-0 p-4 overflow-clip" data-aos="slide-left">
                <div className="w-full flex justify-start pr-4">
                  <FaAngleDoubleRight className="hover:cursor-pointer text-black hover:scale-105" onClick={handleToggle} size={36}/>
                </div>
                <div className="grid place-content-start gap-y-5 pt-10 pb-10">
                  {propData.map((item) => (
                    <NavLink
                      to={item.path}
                      key={item.id}
                      className={({ isActive }) =>
                        `text-lg transition transform ease-in-out delay-75 border-b-2 border-transparent ${
                          isActive ? "text-black border-b-black" : "text-gray-500 hover:text-slate-600 hover:scale-110 hover:border-b-[#d4cfcc]"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>

                  ))
                  }
                </div>
              </div>
            )}
        </div>
      </OutsideClickHandler>  
    </>
  );
};

export default HamburgerMenu;