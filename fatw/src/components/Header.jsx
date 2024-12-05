import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-yellow">
      <h1 className="text-2xl font-bold font-raleway">Fest Finder</h1>
      <nav className="space-x-6">
        <a href="/info" className="text-black font-medium">Info</a>
        <a href="/members" className="text-black font-medium">Members</a>
        <a href="/contact" className="text-black font-medium">Contact</a>
        <button className="bg-pink text-white px-4 py-2 rounded-full">Buy a Ticket</button>
        <button className="bg-pink border-solid border-2 border-black text-white px-4 py-2 rounded-full">Book a Flight</button>
      </nav>
    </header>
  );
};

export default Header;
