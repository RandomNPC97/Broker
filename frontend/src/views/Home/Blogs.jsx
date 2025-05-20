// src/pages/Blogs.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './comps/Navbar';
import Footer from './comps/Footer';

function Blogs() {
  const blogPosts = [
    {
      id: 1,
      title: 'Understanding React Hooks',
      summary: 'A deep dive into React hooks, how they work, and how to use them effectively in your applications.',
      date: 'August 20, 2024',
      path: '/blogs/understanding-react-hooks',
    },
    {
      id: 2,
      title: 'The Evolution of Web Design',
      summary: 'Explore the trends and transformations in web design over the past decades and what to expect in the future.',
      date: 'September 5, 2024',
      path: '/blogs/the-evolution-of-web-design',
    },
    {
      id: 3,
      title: 'Getting Started with Tailwind CSS',
      summary: 'An introductory guide to Tailwind CSS, covering its utility-first approach and how to get started with it in your projects.',
      date: 'September 15, 2024',
      path: '/blogs/getting-started-with-tailwind-css',
    },
    // Add more blog posts as needed
  ];

  return (
    <div className="bg-white">
      <Navbar />
      {/* Hero Section */}
      <section id="hero" className="relative bg-cover bg-center" style={{ backgroundImage: "url('./assets/hero-bg-3.jpg')" }}>
        <div className="bg-black bg-opacity-50 h-full w-full flex items-center justify-center py-24">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">OUR BLOGS</h1>
            <p className="text-lg md:text-2xl mb-8">Empowering students to achieve their dreams</p>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold mb-3">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.summary}</p>
                <p className="text-gray-400 text-sm mb-6">{post.date}</p>
                <Link to={post.path} className="text-blue-500 hover:underline">Read More</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Blogs;
