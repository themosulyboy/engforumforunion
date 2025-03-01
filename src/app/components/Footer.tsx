import React from 'react';
import { FaFacebook, FaInstagram, FaTelegramPlane } from 'react-icons/fa';
import { SiX } from 'react-icons/si'; // X icon

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10 border-t border-gray-700" dir="rtl">
      <div className="container mx-auto px-6 md:px-12">
        {/* Bottom Row */}
        <div className="flex justify-between items-center flex-wrap">
          <p className="text-lg text-gray-400">
            © 2025 محمد فخري، جميع الحقوق محفوظة.
          </p>
          <div className="flex space-x-6 text-gray-400 text-xl rtl:space-x-reverse">
            {/* Facebook */}
            <a href="https://www.facebook.com/muhamedfakhri" target='_blank' className="hover:text-blue-500 transition duration-300">
              <FaFacebook className="w-6.5 h-6.5" />
            </a>

            {/* Instagram */}
            <a href="https://www.instagram.com/muhamedfakhri/" target='_blank' className="hover:text-pink-500 transition duration-300">
              <FaInstagram className="w-6.5 h-6.5" />
            </a>

            {/* Telegram */}
            <a href="https://t.me/muhamedfkahri" target='_blank' className="hover:text-blue-400 transition duration-300">
              <FaTelegramPlane className="w-6.5 h-6.5" />
            </a>
            <div></div>
            {/* X */}
            <a href="https://x.com/muhamedfakhri" target='_blank' className="hover:text-gray-200 transition duration-300">
              <SiX className="w-6.5 h-6.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
