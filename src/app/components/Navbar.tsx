"use client";
import React, { useState } from 'react';
import Image from 'next/image';

const ForumNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black text-white p-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div>
          <Image
            src="https://www.ieu-iq.org/wp-content/uploads/ieu144.svg"
            alt="Logo"
            width={100}
            height={100}
            className="h-25"
          />
        </div>

        {/* Menu Items (for large screens) */}
        <div className="hidden md:flex space-x-6">
          <a href="https://www.ieu-iq.org/" target='_blank' className="hover:text-blue-500">الموقع الرسمي</a>
          <a href="#" className="hover:text-blue-500">صفحتنا على فيسبوك</a>
          <a href="#" className="hover:text-blue-500">واتساب</a>
        </div>

        {/* Hamburger Icon for small screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? (
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black p-4 space-y-4">
          <a href="https://www.ieu-iq.org/" target='_blank' className="hover:text-blue-500">الموقع الرسمي</a>
          <a href="#" className="hover:text-blue-500">صفحتنا على فيسبوك</a>
          <a href="#" className="hover:text-blue-500">واتساب</a>
        </div>
      )}
    </nav>
  );
};

export default ForumNavbar;
