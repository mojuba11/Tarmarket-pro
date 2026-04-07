import React, { useState } from 'react';
import Hero from '../components/Hero';
import FeatureCards from '../components/FeatureCards';

const Home = () => {
  // State for the FAQ accordion
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I get paid as a worker?",
      answer: "Once you complete a task and it's verified by our system, funds are added to your Tarmarket wallet. You can withdraw directly to your bank account once you hit the minimum threshold."
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
    <div className="bg-tarmarket-cream min-h-screen font-sans flex flex-col text-tarmarket-umber">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center border-b border-tarmarket-tan sticky top-0 bg-tarmarket-cream/80 backdrop-blur-md z-50">
        <h1 className="text-2xl font-bold">TARMARKET</h1>
        <button className="text-tarmarket-umber font-medium px-4 py-2 rounded-md hover:bg-tarmarket-tan transition border border-tarmarket-umber/20">Login / Signup</button>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-24 px-10 text-center bg-gradient-to-b from-transparent to-tarmarket-tan/10">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            WHERE CREATORS AMPLIFY <br /> AND WORKERS EARN.
          </h2>
          <p className="text-tarmarket-clay text-xl mb-10 max-w-2xl mx-auto">
            The all-in-one bridge between content creators looking for real engagement 
            and workers ready to earn from home.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-tarmarket-umber text-white px-8 py-4 rounded-lg shadow-xl hover:scale-105 transition-transform font-bold">
              FOR INFLUENCERS
            </button>
            <button className="bg-white text-tarmarket-umber px-8 py-4 rounded-lg border-2 border-tarmarket-umber hover:bg-tarmarket-tan transition font-bold">
              FOR WORKERS
            </button>
          </div>
        </section>

        {/* Trusted Platform Bar */}
        <div className="bg-tarmarket-tan/30 py-6 border-y border-tarmarket-tan text-center">
          <p className="text-tarmarket-umber/60 text-sm font-semibold tracking-widest uppercase mb-4">Supported Platforms</p>
          <div className="flex justify-center gap-8 md:gap-16 opacity-40 grayscale font-bold text-lg md:text-xl">
             <span>YouTube</span>
             <span>TikTok</span>
             <span>Instagram</span>
             <span>Facebook</span>
          </div>
        </div>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <p className="text-5xl font-black text-tarmarket-umber">50k+</p>
              <p className="text-tarmarket-clay font-semibold mt-2 uppercase text-sm tracking-wide">Watch Hours Delivered</p>
            </div>
            <div className="p-6">
              <p className="text-5xl font-black text-tarmarket-umber">12k+</p>
              <p className="text-tarmarket-clay font-semibold mt-2 uppercase text-sm tracking-wide">Active Workers</p>
            </div>
            <div className="p-6">
              <p className="text-5xl font-black text-tarmarket-umber">₦10M+</p>
              <p className="text-tarmarket-clay font-semibold mt-2 uppercase text-sm tracking-wide">Paid Out to Date</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 px-10 bg-tarmarket-cream">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h3 className="text-4xl font-bold mb-4">Simple. Transparent. Effective.</h3>
            <p className="text-tarmarket-clay text-lg">We've removed the complexity from digital growth.</p>
          </div>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: "1", title: "Create Account", desc: "Sign up and choose your path as a Creator or a Worker." },
              { step: "2", title: "Execute Tasks", desc: "Engagement is verified through our proprietary tracking system." },
              { step: "3", title: "Scale & Earn", desc: "Creators get results; Workers get paid. It's a win-win." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-tarmarket-tan/50 hover:shadow-md transition">
                <div className="w-10 h-10 bg-tarmarket-umber text-white rounded-full flex items-center justify-center font-bold mb-6">{item.step}</div>
                <h4 className="font-bold text-xl mb-3">{item.title}</h4>
                <p className="text-tarmarket-clay leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature Cards Component */}
        <FeatureCards />

        {/* Testimonials */}
        <section className="py-24 px-10 bg-white">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-16">What Our Users Say</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-tarmarket-cream p-8 rounded-3xl border border-tarmarket-tan relative">
                <span className="text-6xl text-tarmarket-tan absolute top-4 left-4 opacity-50">"</span>
                <p className="text-lg text-tarmarket-clay mb-6 relative z-10 italic">Tarmarket is the only platform I trust for real watch hours. My channel was monetized in record time without any strikes.</p>
                <p className="font-bold">— David A., Tech Reviewer</p>
              </div>
              <div className="bg-tarmarket-cream p-8 rounded-3xl border border-tarmarket-tan relative">
                <span className="text-6xl text-tarmarket-tan absolute top-4 left-4 opacity-50">"</span>
                <p className="text-lg text-tarmarket-clay mb-6 relative z-10 italic">The extra income I earn here covers my monthly utilities. The tasks are easy and the payments are always on time.</p>
                <p className="font-bold">— Blessing E., Student</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-10 bg-tarmarket-cream">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold text-center mb-12">Common Questions</h3>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl border border-tarmarket-tan overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full p-6 text-left flex justify-between items-center font-bold"
                  >
                    {faq.question}
                    <span className="text-2xl">{activeFaq === index ? '−' : '+'}</span>
                  </button>
                  {activeFaq === index && (
                    <div className="px-6 pb-6 text-tarmarket-clay border-t border-tarmarket-tan pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-10 text-center bg-tarmarket-umber text-white">
          <h3 className="text-4xl md:text-5xl font-black mb-6">Start Your Journey Today.</h3>
          <p className="mb-10 text-tarmarket-tan/80 max-w-xl mx-auto text-lg">Whether you're building an empire or earning a side income, Tarmarket is your home.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-tarmarket-tan text-tarmarket-umber px-12 py-5 rounded-full text-lg font-black hover:bg-white transition shadow-2xl">
              GET STARTED NOW
            </button>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="py-16 border-t border-tarmarket-tan text-center bg-white px-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 text-left">
          <div>
            <h4 className="font-bold text-xl mb-4">TARMARKET</h4>
            <p className="text-tarmarket-clay text-sm leading-relaxed">The premier bridge for the Nigerian digital economy. Helping creators grow and workers thrive through authentic engagement.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-tarmarket-clay">Quick Links</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><a href="#" className="hover:text-tarmarket-clay">About Us</a></li>
              <li><a href="#" className="hover:text-tarmarket-clay">Influencer Program</a></li>
              <li><a href="#" className="hover:text-tarmarket-clay">Earning Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-tarmarket-clay">Legal & Support</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li><a href="#" className="hover:text-tarmarket-clay">Terms of Service</a></li>
              <li><a href="#" className="hover:text-tarmarket-clay">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-tarmarket-clay">Contact Support</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-tarmarket-tan/50">
          <p className="text-tarmarket-clay text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} Target Multiconcepts Venture. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
