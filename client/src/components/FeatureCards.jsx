import React from 'react';

const FeatureCards = () => {
  const features = [
    {
      title: "For Influencers",
      desc: "Get real organic views, likes, and follows from verified human accounts. No bots, just growth.",
      button: "Create Campaign",
      color: "#4A3728"
    },
    {
      title: "For Workers",
      desc: "Turn your spare time into a digital income. Watch, engage, and withdraw earnings to your bank.",
      button: "Start Earning",
      color: "#D2B48C"
    }
  ];

  return (
    <section className="py-16 px-10 bg-[#FFFDD0]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {features.map((f, i) => (
          <div key={i} className="p-10 rounded-2xl border border-[#D2B48C] bg-white shadow-sm hover:shadow-md transition">
            <h3 className="text-3xl font-bold mb-4" style={{ color: '#4A3728' }}>{f.title}</h3>
            <p className="text-lg mb-8" style={{ color: '#8B735B' }}>{f.desc}</p>
            <button 
              className="w-full py-3 rounded-lg font-bold transition"
              style={{ 
                backgroundColor: f.color, 
                color: i === 0 ? 'white' : '#4A3728',
                border: i === 1 ? '1px solid #4A3728' : 'none'
              }}
            >
              {f.button}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;