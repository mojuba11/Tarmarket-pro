import React from 'react';
import Hero from '../components/Hero';
import FeatureCards from '../components/FeatureCards';

const Home = () => {
  return (
    <div className="bg-tarmarket-cream min-h-screen font-sans flex flex-col">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center border-b border-tarmarket-tan sticky top-0 bg-tarmarket-cream/80 backdrop-blur-md z-50">
        <h1 className="text-2xl font-bold text-tarmarket-umber">TARMARKET</h1>
        <button className="text-tarmarket-umber font-medium px-4 py-2 rounded-md hover:bg-tarmarket-tan transition">Login</button>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-10 text-center">
          <h2 className="text-5xl font-extrabold text-tarmarket-umber mb-6 leading-tight">
            WHERE CREATORS AMPLIFY <br /> AND WORKERS EARN.
          </h2>
          <p className="text-tarmarket-clay text-xl mb-10 max-w-2xl mx-auto">
            The all-in-one bridge between content creators looking for real engagement 
            and workers ready to earn from home.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-tarmarket-umber text-white px-8 py-4 rounded-lg shadow-lg hover:opacity-90 transition font-bold">
              FOR INFLUENCERS
            </button>
            <button className="bg-tarmarket-tan text-tarmarket-umber px-8 py-4 rounded-lg border border-tarmarket-umber hover:bg-opacity-80 transition font-bold">
              FOR WORKERS
            </button>
          </div>
        </section>

        {/* Trusted Platform Bar */}
        <div className="bg-tarmarket-tan/30 py-6 border-y border-tarmarket-tan text-center">
          <p className="text-tarmarket-umber/60 text-sm font-semibold tracking-widest uppercase mb-4">Supported Platforms</p>
          <div className="flex justify-center gap-8 md:gap-16 opacity-50 grayscale">
             <span className="font-bold text-xl">YouTube</span>
             <span className="font-bold text-xl">TikTok</span>
             <span className="font-bold text-xl">Instagram</span>
             <span className="font-bold text-xl">Facebook</span>
          </div>
        </div>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-black text-tarmarket-umber">50k+</p>
              <p className="text-tarmarket-clay font-medium">Watch Hours Delivered</p>
            </div>
            <div>
              <p className="text-4xl font-black text-tarmarket-umber">12k+</p>
              <p className="text-tarmarket-clay font-medium">Active Workers</p>
            </div>
            <div>
              <p className="text-4xl font-black text-tarmarket-umber">₦10M+</p>
              <p className="text-tarmarket-clay font-medium">Paid Out to Date</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-10 bg-tarmarket-cream">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h3 className="text-3xl font-bold text-tarmarket-umber">How It Works</h3>
            <p className="text-tarmarket-clay">Getting started is simple and transparent.</p>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="relative p-6 text-center">
              <div className="w-12 h-12 bg-tarmarket-umber text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h4 className="font-bold text-tarmarket-umber mb-2">Create an Account</h4>
              <p className="text-tarmarket-clay text-sm">Join as a creator to boost your reach or a worker to start earning.</p>
            </div>
            <div className="relative p-6 text-center">
              <div className="w-12 h-12 bg-tarmarket-umber text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h4 className="font-bold text-tarmarket-umber mb-2">Complete Tasks</h4>
              <p className="text-tarmarket-clay text-sm">Workers engage with content while creators watch their numbers climb.</p>
            </div>
            <div className="relative p-6 text-center">
              <div className="w-12 h-12 bg-tarmarket-umber text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h4 className="font-bold text-tarmarket-umber mb-2">Instant Payouts</h4>
              <p className="text-tarmarket-clay text-sm">Earned funds are processed securely once tasks are verified.</p>
            </div>
          </div>
        </section>

        {/* Feature Cards Component */}
        <FeatureCards />
      </main>

      {/* Footer Section */}
      <footer className="py-12 border-t border-tarmarket-tan text-center bg-white">
        <div className="mb-6">
           <h4 className="font-bold text-tarmarket-umber">TARMARKET</h4>
           <p className="text-tarmarket-clay text-sm mt-2">Empowering the digital economy.</p>
        </div>
        <p className="text-tarmarket-clay text-xs tracking-wide">
          &copy; {new Date().getFullYear()} Target Multiconcepts Venture. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
