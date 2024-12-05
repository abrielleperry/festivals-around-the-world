import React from 'react';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-yellow py-6 text-center">
      <div className="flex justify-center space-x-4 text-black">
        <button
          className="text-2xl bg-transparent border-none cursor-pointer"
          aria-label="TikTok"
          onClick={() => window.open('https://tiktok.com', '_blank')}
        >
          <FaTiktok />
        </button>
        <button
          className="text-2xl bg-transparent border-none cursor-pointer"
          aria-label="Instagram"
          onClick={() => window.open('https://instagram.com', '_blank')}
        >
          <FaInstagram />
        </button>
        <button
          className="text-2xl bg-transparent border-none cursor-pointer"
          aria-label="Facebook"
          onClick={() => window.open('https://facebook.com', '_blank')}
        >
          <FaFacebook />
        </button>
      </div>
      <p className="mt-4 text-sm font-raleway">&copy; Festivals Around The World 2022</p>
    </footer>
  );
};

export default Footer;
