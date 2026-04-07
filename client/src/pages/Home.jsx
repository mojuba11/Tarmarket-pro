import React, { useState, useEffect, useRef } from 'react';
import FeatureCards from '../components/FeatureCards';

// --- 1. Sub-component for Counting Animation ---
const Counter = ({ endValue, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setHasStarted(true); },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const final = parseInt(endValue.replace(/\D/g, ''));
    const duration = 2000;
    const increment = final / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= final) {
        setCount(final);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, endValue]);

  return <span ref={elementRef}>{count.toLocaleString()}{suffix}</span>;
};

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [tasksPerDay, setTasksPerDay] = useState(25);
  const [showToast, setShowToast] = useState(false);
  const [currentToast, setCurrentToast] = useState({ name: "Ade", amount: "2,500" });

  const updateFavicon = (hasDot) => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) return;
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = favicon.href;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 32, 32);
      if (hasDot) {
        ctx.beginPath(); ctx.arc(24, 8, 7, 0, 2 * Math.PI);
        ctx.fillStyle = '#ff4b2b'; ctx.fill();
        ctx.strokeStyle = 'white'; ctx.lineWidth = 2; ctx.stroke();
      }
      favicon.href = canvas.toDataURL('image/png');
    };
  };

  const playSliderSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(120, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(); osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {}
  };

  const toggleFaq = (index) => setActiveFaq(activeFaq === index ? null : index);

  useEffect(() => {
    const names = ["Uche", "Amina", "Chidi", "Blessing", "Tunde", "Fatima", "Okon", "Yinka"];
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAmount = (Math.floor(Math.random() * 15) + 5) * 500;
      setCurrentToast({ name: randomName, amount: randomAmount.toLocaleString() });
      setShowToast(true);
      updateFavicon(true);
      setTimeout(() => { setShowToast(false); updateFavicon(false); }, 4000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const faqData = [
    { question: "How do I get paid?", answer: "Funds go to your Tarmarket wallet. Withdraw to your bank account at ₦2,000 minimum." },
    { question: "Is this safe?", answer: "Yes. We use real people for organic engagement, keeping accounts compliant." },
    { question: "Can I do both?", answer: "Yes! Use your earnings to fund your own content campaigns." }
  ];

  return (
    <div className="bg-tarmarket-cream min-h-screen font-sans flex flex-col text-tarmarket-umber overflow-x-hidden relative">
      
      {/* 1. LIVE PAYOUT TOAST */}
      <div className={`fixed bottom-4 left-4 z-[100] bg-white p-3 rounded-xl shadow-xl border-l-4 border-tarmarket-umber transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <p className="text-xs font-bold text-tarmarket-umber">
            {currentToast.name} withdrew <span className="text-tarmarket-clay">₦{currentToast.amount}</span>
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full bg-white shadow-xl relative">
        {/* COMPACT NAV */}
        <nav className="px-6 py-3 flex justify-between items-center border-b border-tarmarket-tan sticky top-0 bg-white/90 backdrop-blur-md z-50">
          <h1 className="text-lg font-black tracking-tighter">TARMARKET</h1>
          <button className="text-xs font-bold px-5 py-1.5 rounded-full bg-tarmarket-umber text-white hover:scale-105 transition-all">
            Login
          </button>
        </nav>

        <main className="flex-grow">
          {/* COMPACT HERO */}
          <section className="py-12 md:py-20 px-6 text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-4 leading-tight tracking-tight">
              AMPLIFY CONTENT. <br/> EARN REAL MONEY.
            </h2>
            <p className="text-tarmarket-clay text-base md:text-lg mb-6 max-w-xl mx-auto font-medium">
              The professional bridge between creators seeking engagement and workers ready to earn.
            </p>
            <div className="flex flex-row justify-center gap-3">
              <button className="bg-tarmarket-umber text-white px-6 py-3 rounded-lg shadow-md font-bold text-sm">FOR CREATORS</button>
              <button className="bg-white text-tarmarket-umber px-6 py-3 rounded-lg border border-tarmarket-umber font-bold text-sm">FOR WORKERS</button>
            </div>
          </section>

          {/* COMPACT MARQUEE */}
          <div className="bg-tarmarket-tan/10 py-4 border-y border-tarmarket-tan/30 overflow-hidden flex whitespace-nowrap">
            <div className="flex shrink-0 animate-marquee gap-8 px-4 opacity-40 font-black text-xs tracking-widest uppercase">
              <span>YouTube</span><span>TikTok</span><span>Instagram</span><span>Facebook</span><span>Threads</span><span>Twitter</span>
            </div>
            <div className="flex shrink-0 animate-marquee gap-8 px-4 opacity-40 font-black text-xs tracking-widest uppercase">
              <span>YouTube</span><span>TikTok</span><span>Instagram</span><span>Facebook</span><span>Threads</span><span>Twitter</span>
            </div>
          </div>

          {/* COMPACT STATS */}
          <section className="py-10 bg-white border-b border-tarmarket-tan/20">
            <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl md:text-4xl font-black"><Counter endValue="5000" suffix="k+" /></p>
                <p className="text-tarmarket-clay font-bold text-[10px] uppercase tracking-tighter">Hours Delivered</p>
              </div>
              <div>
                <p className="text-2xl md:text-4xl font-black"><Counter endValue="12000" suffix="+" /></p>
                <p className="text-tarmarket-clay font-bold text-[10px] uppercase tracking-tighter">Workers</p>
              </div>
              <div>
                <p className="text-2xl md:text-4xl font-black text-tarmarket-clay">₦<Counter endValue="10" suffix="M+" /></p>
                <p className="text-tarmarket-clay font-bold text-[10px] uppercase tracking-tighter">Paid Out</p>
              </div>
            </div>
          </section>

          {/* COMPACT CALCULATOR */}
          <section className="py-12 px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-tarmarket-cream/40 p-6 md:p-10 rounded-[2rem] border border-tarmarket-tan/40">
              <div className="space-y-4">
                <h3 className="text-3xl font-black text-tarmarket-umber leading-none">Calculate Earnings</h3>
                <p className="text-sm text-tarmarket-clay font-medium max-w-sm">Move the slider to see your monthly potential.</p>
                <div className="bg-white p-5 rounded-xl border border-tarmarket-tan/30">
                  <div className="flex justify-between mb-3 items-end">
                    <span className="text-[10px] font-black uppercase text-tarmarket-clay">Daily Tasks</span>
                    <span className="text-xl font-black text-tarmarket-umber">{tasksPerDay}</span>
                  </div>
                  <input type="range" min="5" max="100" step="5" value={tasksPerDay} onChange={(e) => { setTasksPerDay(e.target.value); playSliderSound(); }} className="w-full h-2 bg-tarmarket-tan rounded-lg appearance-none cursor-pointer accent-tarmarket-umber" />
                </div>
              </div>

              <div className="relative">
                <div className="bg-tarmarket-umber p-6 md:p-8 rounded-[1.5rem] shadow-xl text-white">
                  <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest mb-1">Estimated Monthly Wallet</p>
                  <h4 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">₦{(tasksPerDay * 50 * 30).toLocaleString()}</h4>
                  <div className="flex justify-between items-center py-3 border-t border-white/10 text-xs font-medium">
                    <span className="opacity-60">Status: <span className="text-green-400">Ready</span></span>
                    <button className="bg-tarmarket-tan text-tarmarket-umber px-4 py-2 rounded-lg font-black text-[10px] uppercase">Join Now</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* COMPACT HOW IT WORKS */}
          <section className="py-12 px-6 bg-tarmarket-cream/20">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: "01", t: "Sign Up", d: "Choose your role and profile in minutes." },
                { id: "02", t: "Engage", d: "Complete tasks or grow your audience." },
                { id: "03", t: "Withdraw", d: "Get paid straight to your bank account." }
              ].map((step, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-tarmarket-tan/30 flex gap-4 items-start">
                  <span className="text-2xl font-black text-tarmarket-tan">{step.id}</span>
                  <div>
                    <h4 className="font-bold text-lg leading-none mb-2">{step.t}</h4>
                    <p className="text-tarmarket-clay text-xs font-medium">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="py-6"><FeatureCards /></div>

          {/* COMPACT FAQ */}
          <section className="py-12 px-6">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-black text-center mb-6">Quick Help</h3>
              <div className="space-y-2">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg border border-tarmarket-tan overflow-hidden">
                    <button onClick={() => toggleFaq(index)} className="w-full p-4 text-left flex justify-between items-center font-bold text-sm">
                      {faq.question}
                      <span className={`transition-transform ${activeFaq === index ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    {activeFaq === index && <div className="px-4 pb-4 text-tarmarket-clay text-xs border-t border-tarmarket-tan/20 pt-3">{faq.answer}</div>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* COMPACT CTA */}
          <section className="py-12 px-6 text-center bg-tarmarket-umber text-white">
            <h3 className="text-3xl font-black mb-4">Start Growing Today</h3>
            <button className="bg-tarmarket-tan text-tarmarket-umber px-10 py-3 rounded-full text-sm font-black uppercase tracking-widest shadow-lg">Get Started</button>
          </section>
        </main>

        {/* COMPACT FOOTER */}
        <footer className="py-8 border-t border-tarmarket-tan bg-white px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h4 className="font-black text-lg tracking-tighter">TARMARKET</h4>
              <p className="text-tarmarket-clay text-[10px] font-medium">Empowering the Nigerian digital economy.</p>
            </div>
            <div className="flex gap-6 font-bold text-[10px] uppercase tracking-widest">
              <a href="#" className="hover:text-tarmarket-clay">Terms</a>
              <a href="#" className="hover:text-tarmarket-clay">Privacy</a>
              <a href="#" className="hover:text-tarmarket-clay">Support</a>
            </div>
            <p className="text-tarmarket-clay text-[10px] font-black">&copy; {new Date().getFullYear()} Target Multiconcepts</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
