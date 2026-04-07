import React from 'react';
import Hero from '../components/Hero';
import FeatureCards from '../components/FeatureCards';

const Home = () => {
  return (
    <div className="bg-tarmarket-cream min-h-screen font-sans">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center border-b border-tarmarket-tan">
        <h1 className="text-2xl font-bold text-tarmarket-umber">TARMARKET</h1>
        <button className="text-tarmarket-umber font-medium px-4 py-2 rounded-md hover:bg-tarmarket-tan transition">Login</button>
      </nav>

      {/* Main Content */}
      <main>
        <section className="py-20 px-10 text-center">
          <h2 className="text-5xl font-extrabold text-tarmarket-umber mb-6">
            WHERE CREATOR AMPLIFY, AND WORKERS EARN.
          </h2>
          <p className="text-tarmarket-clay text-xl mb-10 max-w-2xl mx-auto">
            The all-in-one bridge between content creators looking for real watch-hour,engagement 
            and workers ready to earn from home.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-tarmarket-umber text-white px-8 py-4 rounded-lg shadow-lg hover:opacity-90 transition">
              Start Boosting (Influencers)
            </button>
            <button className="bg-tarmarket-tan text-tarmarket-umber px-8 py-4 rounded-lg border border-tarmarket-umber hover:bg-opacity-80 transition">
              Start Earning (Workers)
            </button>
          </div>
        </section>

        {/* This will now render the cards correctly */}
        <FeatureCards />
      </main>
    </div>
  );
};

export default Home;
