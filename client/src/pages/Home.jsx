import React, { useState, useEffect, useRef } from 'react';
import FeatureCards from '../components/FeatureCards';

// --- CountUp Component (Safe Intersection Observer) ---
const CountUp = ({ end, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const finalValue = parseInt(end);
    const duration = 2000; 
    const increment = finalValue / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= finalValue) {
        setCount(finalValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end]);

  return <span ref={elementRef}>{count.toLocaleString()}{suffix}</span>;
};

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [tasksPerDay, setTasksPerDay] = useState(25);
  const [showToast, setShowToast] = useState(false);
  const [currentToast, setCurrentToast] = useState({ name: "Ade", amount: "2,500" });

  // --- Dynamic Favicon ---
  const updateFavicon = (hasAlert) => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) return;
    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = favicon.href;
    img.crossOrigin = "anonymous"; 
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 32, 32);
      if (hasAlert) {
        ctx.beginPath();
        ctx.arc(24, 8, 7, 0, 2 * Math.PI);
        ctx.fillStyle = '#ef4444';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      favicon.href = canvas.toDataURL('image/png');
    };
  };

  // --- Safe Audio Context (Triggers only on change) ---
  const playClickSound = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) { console.log("Audio blocked"); }
  };

  useEffect(() => {
    const names = ["Uche", "Amina", "Chidi", "Blessing", "Tunde", "Fatima"];
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

  return (
    <div className="bg-tarmarket-cream min-h-screen font-sans flex flex-col text-tarmarket-umber overflow-x-hidden relative">
      
      {/* PAYOUT TOAST */}
      <div className={`fixed bottom-6 left-6 z-[100] bg-white p-4 rounded-2xl shadow-2xl border-l-4 border-tarmarket-umber transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <p className="text-sm font-bold text-tarmarket-umber">
            {currentToast.name} just withdrew <span className="text-tarmarket-clay">₦{currentToast.amount}</span>
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full bg-white shadow-xl relative">
        {/* NAV */}
        <nav className="p-4 md:p-6 flex justify-between items-center border-b border-tarmarket-tan sticky top-0 bg-white/90 backdrop-blur-md z-50">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter">TARMARKET</h1>
          <button className="px-6 py-2 rounded-full bg-tarmarket-umber text-white font-bold hover:scale-105 active:scale-95 transition-all">Login</button>
        </nav>

        {/* HERO */}
        <section className="py-20 md:py-32 px-6 text-center max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">WHERE CREATORS AMPLIFY AND WORKERS EARN.</h2>
          <p className="text-tarmarket-clay text-lg md:text-xl mb-10 max-w-2xl mx-auto">The bridge between real engagement and real income.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button className="bg-tarmarket-umber text-white px-10 py-4 rounded-xl font-bold">FOR INFLUENCERS</button>
            <button className="bg-white text-tarmarket-umber px-10 py-4 rounded-xl border-2 border-tarmarket-umber font-bold">FOR WORKERS</button>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="bg-tarmarket-tan/20 py-8 border-y border-tarmarket-tan/50 overflow-hidden flex whitespace-nowrap">
          <div className="flex shrink-0 animate-marquee gap-12 px-6 opacity-40 font-black text-xl uppercase tracking-widest">
            <span>YouTube</span><span>TikTok</span><span>Instagram</span><span>Facebook</span><span>Threads</span><span>Twitter</span>
          </div>
          <div className="flex shrink-0 animate-marquee gap-12 px-6 opacity-40 font-black text-xl uppercase tracking-widest">
            <span>YouTube</span><span>TikTok</span><span>Instagram</span><span>Facebook</span><span>Threads</span><span>Twitter</span>
          </div>
        </div>

        {/* STATS SECTION */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <p className="text-5xl font-black"><CountUp end="50000" suffix="+" /></p>
              <p className="text-tarmarket-clay font-bold text-xs uppercase tracking-widest">Watch Hours</p>
            </div>
            <div>
              <p className="text-5xl font-black"><CountUp end="12000" suffix="+" /></p>
              <p className="text-tarmarket-clay font-bold text-xs uppercase tracking-widest">Verified Workers</p>
            </div>
            <div>
              <p className="text-5xl font-black">₦<CountUp end="10000000" suffix="+" /></p>
              <p className="text-tarmarket-clay font-bold text-xs uppercase tracking-widest">Total Payouts</p>
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="py-20 px-6 bg-tarmarket-cream/20">
          <div className="max-w-3xl mx-auto bg-white border border-tarmarket-tan p-8 md:p-12 rounded-[3rem] text-center shadow-lg">
            <h3 className="text-3xl font-black mb-4">Earnings Calculator</h3>
            <input 
              type="range" min="5" max="100" value={tasksPerDay} 
              onChange={(e) => { setTasksPerDay(e.target.value); playClickSound(); }}
              className="w-full h-3 bg-tarmarket-tan rounded-lg appearance-none cursor-pointer accent-tarmarket-umber mb-10"
            />
            <div className="py-6 border-t border-tarmarket-tan/50">
              <p className="text-6xl font-black text-tarmarket-umber">₦{(tasksPerDay * 50 * 30).toLocaleString()}</p>
              <p className="text-xs font-black uppercase opacity-50 mt-2">Potential Monthly Income</p>
            </div>
          </div>
        </section>

        <FeatureCards />

        {/* FAQ */}
        <section className="py-20 px-6 bg-tarmarket-cream">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-black text-center mb-10">Common Questions</h3>
            <div className="space-y-4">
              {[{q: "How do I get paid?", a: "Withdraw directly to your bank account once you hit ₦2,000."}, {q: "Is it safe?", a: "Yes, we use real people for organic growth."}].map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-tarmarket-tan overflow-hidden">
                  <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full p-5 text-left font-bold flex justify-between">
                    {faq.q} <span>{activeFaq === i ? '-' : '+'}</span>
                  </button>
                  {activeFaq === i && <div className="p-5 pt-0 text-tarmarket-clay">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-10 border-t border-tarmarket-tan text-center text-xs font-bold uppercase tracking-widest text-tarmarket-clay">
          &copy; {new Date().getFullYear()} Target Multiconcepts Venture.
        </footer>
      </div>
    </div>
  );
};

export default Home;
