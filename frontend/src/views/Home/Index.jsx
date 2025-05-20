import React, { useState } from 'react';
import Navbar from './comps/Navbar';
import Footer from './comps/Footer';
import Swipper from './comps/Swipper';
import AOS from "aos";
import "aos/dist/aos.css"; 
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import WithdrawalNotification from './comps/PopUp';

AOS.init();

const swipeData = [
  {
    id: 1,
    imgUrl: "./assets/user2.jpg",
    userName: "Emma Carter",
    quote: `The platform is incredibly intuitive and makes trading seamless. I’ve been able to make informed decisions with the help of their tools and analytics.`,
    role: "Trader"
  },
  {
    id: 2,
    imgUrl: "./assets/user1.jpg",
    userName: "Liam Johnson",
    quote: `The mining plans offered are excellent. I’ve seen consistent returns and appreciate the transparency in the payout process.`,
    role: "Miner"
  },
  {
    id: 3,
    imgUrl: "./assets/user3.jpg",
    userName: "Olivia Martin",
    quote: `As an investor, I value the detailed insights and market reports provided. They’ve helped me diversify my portfolio effectively.`,
    role: "Investor"
  },
  {
    id: 4,
    imgUrl: "./assets/user4.jpg",
    userName: "James Anderson",
    quote: `Working as an analyst here has been a rewarding experience. The data-driven approach and collaboration make it an exceptional workplace.`,
    role: "Market Analyst"
  },
  {
    id: 5,
    imgUrl: "./assets/user6.jpg",
    userName: "Sophia Taylor",
    quote: `Partnering with this platform has been an outstanding decision. Their professionalism and focus on innovation are unmatched.`,
    role: "Business Partner"
  },
  {
    id: 6,
    imgUrl: "./assets/user5.jpg",
    userName: "Aiden Moore",
    quote: `The customer service team is always responsive and helpful. I feel confident knowing I have support whenever I need it.`,
    role: "Client"
  }
];


function Home() {
  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const faqData = [
    {
      question: "What is the account registration process?",
      answer: "To register an account, fill out the online registration form, verify your email, and complete identity verification as per our compliance guidelines. Once verified, you can start trading or mining."
    },
    {
      question: "What are the trading hours?",
      answer: "Our trading platform operates 24/7, allowing you to trade anytime, including weekends and holidays. For specific market schedules, refer to the trading hours section on our website."
    },
    {
      question: "How do I start cryptocurrency mining?",
      answer: "To start mining, create an account, select a mining plan that suits your needs, and configure your hardware or use our cloud mining services. Detailed guides are available on our platform."
    },
    {
      question: "What is the withdrawal process?",
      answer: "You can withdraw funds by logging into your account, navigating to the withdrawal section, and submitting your request. Processing times vary based on the payment method chosen."
    },
    {
      question: "How can I track my earnings and investments?",
      answer: "You can track your earnings and investments through your account dashboard, which provides detailed reports, performance metrics, and real-time updates on your portfolio."
    }
  ];
  
  
  return (
    <div className="bg-white">
      {/* Navbar Component */}
      <Navbar />

      {/* Hero Section with Swiper Carousel */}
      <Swipper />

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-100">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center">
          {/* Image Section */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="./assets/hero-bg-4.jpg" // Replace with your image path
              alt="About Us"
              className="w-full h-auto rounded-lg shadow-lg"
              data-aos="fade-up" data-aos-offset="200" data-aos-delay="0" data-aos-duration="500"
            />
          </div>

          {/* Text Section */}
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left" data-aos="fade-up" data-aos-offset="200" data-aos-delay="50" data-aos-duration="500">About Us</h2>
            <p className="text-gray-700 mb-6" data-aos="fade-up" data-aos-offset="200" data-aos-delay="100" data-aos-duration="500">
              At Global Express Trade, we are dedicated to empowering individuals and businesses to achieve their financial goals through seamless and secure trading services. With a focus on transparency, innovation, and personalized support, we connect you to global markets with confidence. Our team of experienced professionals is committed to providing cutting-edge tools and insights, ensuring that every trade is a step toward your success. Whether you're a seasoned investor or just starting out, we're here to guide you every step of the way
            </p>
            <div className="flex justify-center md:justify-start">
              <a 
                href="/signup"
                className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300" data-aos="fade-up" data-aos-offset="200" data-aos-delay="150" data-aos-duration="500"
              >
                Start Trading Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>




    <section id="services" className="py-10 px-5 bg-primary_theme">
      <div className="w-full mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out-sine"
            className="bg-primary_theme rounded-lg shadow-lg"
          >
            <img
              src="./assets/brokage.jpg"
              className="w-full h-80 object-cover rounded-t-lg"
            />
            <h3 className="text-xl font-semibold mb-4 mt-4 text-black">Brokerage Services</h3>
            <p className="text-[13px] p-3 text-text_theme">
              We provide seamless brokerage services tailored to help investors make informed decisions in the financial markets. Whether it's stocks, forex, or commodities, we connect you with opportunities, ensuring precision and reliability in every trade.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="100"
            data-aos-duration="500"
            data-aos-easing="ease-in-out-sine"
            className="bg-primary_theme rounded-lg shadow-lg"
          >
            <img
              src="./assets/strategies.jpg"
              className="w-full h-80 object-cover rounded-t-lg"
            />
            <h3 className="text-xl font-semibold mb-4 mt-4 text-black">Investment Strategies</h3>
            <p className="text-[13px] p-3 text-text_theme">
              Our tailored investment strategies are designed to maximize returns and minimize risks. With a focus on data-driven insights, we help clients diversify portfolios and achieve their long-term financial goals in dynamic markets.
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="150"
            data-aos-duration="500"
            data-aos-easing="ease-in-out-sine"
            className="bg-primary_theme rounded-lg shadow-lg"
          >
            <img
              src="./assets/crypto_mining.jpg"
              className="w-full h-80 object-cover rounded-t-lg"
            />
            <h3 className="text-xl font-semibold mb-4 mt-4 text-black">Crypto Mining</h3>
            <p className="text-[13px] p-3 text-text_theme">
              Dive into the future of decentralized finance with our crypto mining services. From setup to optimization, we guide you through the process of earning digital assets securely and efficiently, ensuring long-term profitability in the blockchain ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>



    <section id='features' className="bg-primary_theme py-10 px-4">
      <div className="w-full mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-white">
          <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out-sine" className=" rounded-lg p-6">
            <img src="./assets/mission.jpg" className="mx-auto w-60 h-40 rounded-full"/>
            <h3 className="text-xl font-semibold mb-1 mt-0">Daily Mining Outputs</h3>
            <p className="text-[14px] text-text_theme">Returns made from either trading or mining transactions will be added to your account daily and automatically.</p>
          </div>

          <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="100" data-aos-duration="1000" data-aos-easing="ease-in-out-sine" className=" rounded-lg p-6 ">
            <img src="./assets/vision.jpg" className="mx-auto w-60 h-40 rounded-full"/>
            <h3 className="text-xl font-semibold mb-1 mt-0">State of the Art Mining</h3>
            <p className="text-[14px] text-text_theme">Productivity is a top notch quality for any investment. So, for every trade action or blockchain mining algorithm that we offer, we’re providing some of the highest performing systems and softwares that exist</p>
          </div>

          <div data-aos="fade-up" data-aos-offset="200" data-aos-delay="150" data-aos-duration="1000" data-aos-easing="ease-in-out-sine" className=" rounded-lg p-6 ">
            <img src="./assets/motto.jpg" className="mx-auto w-60 h-40 rounded-full"/>
            <h3 className="text-xl font-semibold mb-1 mt-0">Diverse Mining Portfolio</h3>
            <p className="text-[14px] text-text_theme">Choose from a wide range of target assets for trading and over 10 major mining algorithms that cut across 4 mineable cryptocurrencies.</p>
          </div>
        </div>
      </div>
    </section>


    <section className="bg-primary_theme2 text-white py-20 px-6">
      <div className="w-full mx-auto text-center">
        <h2 className="text-[20px] text-text_theme font-bold mb-8">
          Global Express Trade
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out-sine"
            className="rounded-lg p-8"
          >
            <h3 className="text-4xl font-bold mb-4 text-text_theme">1.2k+</h3>
            <p className="text-xl text-text_theme">ACTIVE CLIENTS</p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="100"
            data-aos-duration="500"
            data-aos-easing="ease-in-out-sine"
            className="rounded-lg p-8"
          >
            <h3 className="text-4xl font-bold mb-4 text-text_theme">500k+</h3>
            <p className="text-xl text-text_theme">COMPLETED TRANSACTIONS</p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="150"
            data-aos-duration="500"
            data-aos-easing="ease-in-out-sine"
            className="rounded-lg p-8"
          >
            <h3 className="text-4xl font-bold mb-4 text-text_theme">150+</h3>
            <p className="text-xl text-text_theme">CRYPTO MINING UNITS</p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="200"
            data-aos-duration="500"
            data-aos-easing="ease-in-out-sine"
            className="rounded-lg p-8"
          >
            <h3 className="text-4xl font-bold mb-4 text-text_theme">100+</h3>
            <p className="text-xl text-text_theme">MARKETS COVERED</p>
          </div>
        </div>
      </div>
    </section>

    
    <div id="testimonials">
      <div className="h-full w-full flex flex-col items-center justify-center bg-primary_theme pb-10 sm:pl-10 sm:pr-10 2xl:max-w-7xl">
        <div className="max-w-3xl h-full p-0 pt-10 pb-0 mx-auto text-center text-black">
          <h3 className="font-mono text-base pb-1 tracking-wider">
            Testimonials.
          </h3>
          <p className="text-2xl pb-8">What People Say About Us</p>
        </div>
      </div>
      <Swiper
        cssMode={true}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {swipeData.map((item) => (
          <SwiperSlide key={item.id} className="flex justify-center items-center">
            <div className="h-full w-full flex flex-col items-center justify-center bg-primary_theme pb-10 sm:pl-10 sm:pr-10 2xl:max-w-7xl">
              <div className="max-w-3xl h-full p-2 pt-0 pb-0 mx-auto text-center text-black">
                <div className="h-[90px] w-[90px] mx-auto rounded-full overflow-hidden shadow-md">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={item.imgUrl}
                    alt={item.userName}
                  />
                </div>
                <p className="pt-2 text-xl">{item.userName}</p>
                <p className="text-lg space-x-1">{item.quote}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>


    <div id='faqs' className="flex flex-col items-center justify-center pt-10 bg-primary_theme">
      <div className="w-full max-w-7xl p-2 mx-auto rounded-md text-white">
        <h2 className="text-2xl font-bold text-text_theme text-center mb-6">Frequently Asked Questions</h2>
        {faqData.map((item, i) => (
          <div key={i} className="mb-4 border-b border-gray-200">
            <button
              className="w-full text-left py-4 px-6 text-lg font-medium flex justify-between items-center focus:outline-none"
              onClick={() => toggle(i)}
            >
              <span className='text-text_theme'>{item.question}</span>
              <span className='text-text_theme'>{selected === i ? '-' : '+'}</span>
            </button>
            <div className={`px-6 py-4 ${selected === i ? 'block' : 'hidden'}`}>
              <p className="text-text_theme">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
      {/* Other sections like Academics, Admissions, Contact, etc. */}

      {/* Footer Component */}
      <WithdrawalNotification />
      <Footer />
    </div>
  );
}

export default Home;
