import React from 'react';

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-yellow min-h-screen text-center">
      <h1 className="text-6xl font-extrabold text-pink font-raleway">MUSE FEST</h1>
      <p className="text-lg mt-4 text-black font-raleway">
        Celebrate music, creativity, and togetherness.
      </p>
      <div className="mt-6">
        <button className="bg-pink text-white px-6 py-3 rounded-full text-lg">
          Explore Festivals
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
