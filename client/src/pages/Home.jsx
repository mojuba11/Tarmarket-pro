import React, { useState } from 'react';
import FeatureCards from '../components/FeatureCards';

const Home = () => {
  // Logic for the FAQ accordion
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I get paid as a worker?",
      answer: "Once you complete a task and it's verified by our system, funds are added to your Tarmarket wallet. You can withdraw directly to your bank account once you hit the minimum threshold of ₦2,000."
    },
    {
      question: "Is this safe for my social media accounts?",
      answer: "Yes. We prioritize organic growth. Our workers are real people engaging naturally, which keeps your accounts safe and compliant with platform guidelines."
    },
    {
      question: "Can I be both a Creator and a Worker?",
      answer: "Absolutely! You can use your earnings from completing tasks to fund your own content amplification campaigns."
    }
  ];

  return (
    /* Outer container keeps the background color full-width */
    <div className="bg-tarmarket-cream min-h-screen font-sans flex flex-col text-tarmarket-umber">
      
      /* Inner wrapper limits the width on Desktop (max-w-7xl is ~1280px) */
      <div className="max-w-[1440px] mx-auto w-full bg-white shadow-xl md:shadow-2xl lg:my-0">
        
        {/* 1. Navigation - Mobile Optimized */}
        <nav className="p-4 md:p-6 flex justify-between items-center border-b border-tarmarket-tan sticky top-0 bg-tarmarket-cream/90 backdrop-blur-md z-50">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter">TARMARKET</h1>
          <button className="text-sm md:text-base font-bold px-5 py-2 rounded-full bg-tarmarket-umber text-white hover:opacity-90 transition">
            Login
          </button>
        </nav>

        <main className="flex-grow">
          
          {/* 2. Hero Section */}
          <section className="py-16 md:py-28 px-6 text-center max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
              WHERE CREATORS AMPLIFY <br className="hidden md:block" /> AND WORKERS EARN.
            </h2>
            <p className="text-tarmarket-clay text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
              The bridge between content creators seeking real engagement and workers ready to earn from home.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button className="bg-tarmarket-umber text-white px-10 py-4 rounded-xl shadow-2xl hover:scale-105 transition font-bold text-lg">
                FOR INFLUENCERS
              </button>
              <button className="bg-white text-tarmarket-umber px-10 py-4 rounded-xl border-2 border-tarmarket-umber hover:bg-tarmarket-tan transition font-bold text-lg">
                FOR WORKERS
              </button>
            </div>
          </section>

          {/* 3. Trusted By Bar */}
          <div className="bg-tarmarket-tan/20 py-8 border-y border-tarmarket-tan/50 overflow-hidden">
            <div className="flex justify-around items-center opacity-40 grayscale font-black text-sm md:text-xl tracking-widest uppercase gap-4 px-4">
               <span>YouTube</span>
               <span>TikTok</span>
               <span className="hidden md:inline">Instagram</span>
               <span>Facebook</span>
            </div>
          </div>

          {/* 4. Real-Time Stats */}
          <section className="py-16 md:py-24 bg-white border-b border-tarmarket-tan/30">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="space-y-2">
                <p className="text-5xl md:text-6xl font-black">50k+</p>
                <p className="text-tarmarket-clay font-bold text-sm tracking-widest uppercase">Watch Hours Delivered</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl md:text-6xl font-black">12k+</p>
                <p className="text-tarmarket-clay font-bold text-sm tracking-widest uppercase">Verified Workers</p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl md:text-6xl font-black">₦10M+</p>
                <p className="text-tarmarket-clay font-bold text-sm tracking-widest uppercase">Total Payouts</p>
              </div>
            </div>
          </section>

          {/* 5. How It Works (Step-by-Step) */}
          <section className="py-20 md:py-32 px-6 bg-tarmarket-cream/30">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h3 className="text-3xl md:text-5xl font-black mb-4">How It Works</h3>
              <p className="text-tarmarket-clay text-lg">Your journey to growth or earnings starts here.</p>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { id: "01", t: "Sign Up", d: "Choose your role and set up your profile in minutes." },
                { id: "02", t: "Engage", d: "Workers complete tasks; Creators see instant growth." },
                { id: "03", t: "Withdraw", d: "Secure payments delivered straight to your bank account." }
              ].map((step, i) => (
                <div key={i} className="bg-white p-10 rounded-3xl border border-tarmarket-tan/50 shadow-sm relative overflow-hidden group hover:border-tarmarket-umber transition">
                  <span className="absolute -top-4 -right-4 text-8xl font-black text-tarmarket-tan/10 group-hover:text-tarmarket-tan/20 transition">{step.id}</span>
                  <h4 className="font-bold text-2xl mb-4 relative z-10">{step.t}</h4>
                  <p className="text-tarmarket-clay leading-relaxed relative z-10 font-medium">{step.d}</p>
                </div>
              ))}
            </div>
          </section>

          <FeatureCards />

          {/* 6. Social Proof / Testimonials */}
          <section className="py-24 px-6 bg-white border-y border-tarmarket-tan/30">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="bg-tarmarket-cream p-10 rounded-[2.5rem] border border-tarmarket-tan italic text-lg text-tarmarket-clay">
                "Tarmarket is a game changer for Nigerian creators. I hit my 4k watch hours without the stress of bots."
                <p className="not-italic font-black text-tarmarket-umber mt-6 text-base">— Chidi K., YouTuber</p>
              </div>
              <div className="bg-tarmarket-cream p-10 rounded-[2.5rem] border border-tarmarket-tan italic text-lg text-tarmarket-clay">
                "Finally, a legitimate platform where I can earn extra cash daily. The payout process is seamless."
                <p className="not-italic font-black text-tarmarket-umber mt-6 text-base">— Amina B., Digital Worker</p>
              </div>
            </div>
          </section>

          {/* 7. Interactive FAQ */}
          <section className="py-24 px-6 bg-tarmarket-cream">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-black text-center mb-12">Common Questions</h3>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-white rounded-2xl border border-tarmarket-tan transition-all">
                    <button 
                      onClick={() => toggleFaq(index)}
                      className="w-full p-6 text-left flex justify-between items-center font-bold text-lg"
                    >
                      {faq.question}
                      <span className={`text-2xl transition-transform ${activeFaq === index ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    {activeFaq === index && (
                      <div className="px-6 pb-6 text-tarmarket-clay border-t border-tarmarket-tan/50 pt-4 leading-relaxed font-medium">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 8. Final Conversion Section */}
          <section className="py-20 md:py-32 px-6 text-center bg-tarmarket-umber text-white">
            <h3 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to take the next step?</h3>
            <button className="bg-tarmarket-tan text-tarmarket-umber px-14 py-5 rounded-full text-xl font-black hover:bg-white transition-all shadow-3xl uppercase tracking-widest">
              Get Started Now
            </button>
          </section>
        </main>

        {/* 9. Final Footer */}
        <footer className="py-16 border-t border-tarmarket-tan text-center bg-white px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-16">
            <div className="md:col-span-1">
              <h4 className="font-black text-2xl mb-4">TARMARKET</h4>
              <p className="text-tarmarket-clay text-sm font-medium">Empowering the Nigerian digital economy through authentic engagement and local opportunities.</p>
            </div>
            <div className="flex flex-col gap-2 font-bold text-sm">
              <a href="#" className="hover:text-tarmarket-clay">Terms of Service</a>
              <a href="#" className="hover:text-tarmarket-clay">Privacy Policy</a>
              <a href="#" className="hover:text-tarmarket-clay">Cookie Settings</a>
            </div>
            <div className="flex flex-col gap-2 font-bold text-sm">
              <a href="#" className="hover:text-tarmarket-clay">Instagram</a>
              <a href="#" className="hover:text-tarmarket-clay">Twitter / X</a>
              <a href="#" className="hover:text-tarmarket-clay">WhatsApp Support</a>
            </div>
          </div>
          <p className="text-tarmarket-clay text-[10px] md:text-xs tracking-[0.2em] font-black uppercase border-t border-tarmarket-tan pt-8">
            &copy; {new Date().getFullYear()} Target Multiconcepts Venture. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
