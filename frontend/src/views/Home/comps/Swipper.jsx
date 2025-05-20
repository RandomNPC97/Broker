// components/HeroCarousel.jsx

import React from 'react';

// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay, Grid } from "swiper/modules";

const Swipper = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      //navigation
      pagination={{ clickable: false }}
      autoplay={{ delay: 2000 }}
      loop
      className="h-screen"
    >
      <SwiperSlide>
        <div
          className="bg-cover bg-center h-screen text-center flex items-center justify-center"
          style={{ backgroundImage: 'url(./assets/hero-bg-1.jpg)' }}
        >
          {/* Make the inner div flex and center items both horizontally and vertically */}
          <div className="flex flex-col items-center justify-center bg-black bg-opacity-50 p-10 h-full w-full mx-0 rounded-lg">
            <h2 className="text-4xl text-white font-bold mb-4">THE WORLD'S LEADING TRADING PLATFORM</h2>
            <p className="text-white mb-8">1000+ Forex pairs & CFDs on Shares, Indices, Energies, Metals & ETFs*.</p>
            <a href="/signup" className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700">
            Start investing today.
            </a>
          </div>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div
          className="bg-cover bg-center h-screen text-center flex items-center justify-center"
          style={{ backgroundImage: 'url(./assets/hero-bg-2.jpg)' }}
        >
          {/* Make the inner div flex and center items both horizontally and vertically */}
          <div className="flex flex-col items-center justify-center bg-black bg-opacity-50 p-10 h-full w-full mx-0 rounded-lg">
            <h2 className="text-4xl text-white font-bold mb-4">THE WORLD'S LEADING TRADING PLATFORM</h2>
            <p className="text-white mb-8">1000+ Forex pairs & CFDs on Shares, Indices, Energies, Metals & ETFs*.</p>
            <a href="/signup" className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700">
            Start investing today.
            </a>
          </div>
        </div>
      </SwiperSlide>


      <SwiperSlide>
        <div
          className="bg-cover bg-center h-screen text-center flex items-center justify-center"
          style={{ backgroundImage: 'url(./assets/hero-bg-3.jpg)' }}
        >
          {/* Make the inner div flex and center items both horizontally and vertically */}
          <div className="flex flex-col items-center justify-center bg-black bg-opacity-50 p-10 h-full w-full mx-0 rounded-lg">
            <h2 className="text-4xl text-white font-bold mb-4">THE WORLD'S LEADING TRADING PLATFORM</h2>
            <p className="text-white mb-8">1000+ Forex pairs & CFDs on Shares, Indices, Energies, Metals & ETFs*.</p>
            <a href="/signup" className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700">
            Start investing today.
            </a>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Swipper;
