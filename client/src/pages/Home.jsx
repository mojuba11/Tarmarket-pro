import React from 'react';
import Hero from '../components/Hero';
import FeatureCards from '../components/FeatureCards';

const Home = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen font-sans">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center border-b border-[#D2B48C]">
        <h1 className="text-2xl font-bold text-[#4A3728]">TARMARKET</h1>
        <button className="text-[#4A3728] font-medium">Login</button>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-10 text-center">
        <h2 className="text-5xl font-extrabold text-[#4A3728] mb-6">
          Amplify Content. Empower Earners.
        </h2>
        <p className="text-[#8B735B] text-xl mb-10 max-w-2xl mx-auto">
          The all-in-one bridge between content creators looking for real engagement 
          and workers ready to earn from home.
        </p>

        <div className="flex justify-center gap-6">
          <button className="bg-[#4A3728] text-white px-8 py-4 rounded-lg shadow-lg hover:bg-[#32251B] transition">
            Start Boosting (Influencers)
          </button>
          <button className="bg-[#D2B48C] text-[#4A3728] px-8 py-4 rounded-lg border border-[#4A3728] hover:bg-[#C19A6B] transition">
            Start Earning (Workers)
          </button>
        </div>
      </section>

      {/* Dual Value Proposition */}
      <FeatureCards />
    </div>
  );
};

export default Home;