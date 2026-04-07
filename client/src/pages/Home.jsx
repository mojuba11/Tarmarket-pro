import React, { useState, useEffect, useRef } from 'react';
import FeatureCards from '../components/FeatureCards';

// --- Helper: CountUp Component ---
const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const endValue = parseInt(end.replace(/\D/g, ""));
    const increment = endValue / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
};

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [tasksPerDay, setTasksPerDay] = useState(25);
  const [showToast, setShowToast] = useState(false);
  const [currentToast, setCurrentToast] = useState({ name: "Ade", amount: "2,500" });

  // --- 1. Dynamic Favicon Logic ---
  const updateFavicon = (hasAlert) => {
    const favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) return;
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = favicon.href;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 32, 32);
      if (hasAlert) {
        ctx.beginPath();
        ctx.arc(24, 8, 6, 0, 2 * Math.PI);
        ctx.fillStyle = '#ff0000';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      favicon.href = canvas.toDataURL('image/png');
    };
  };

  // --- 2. Synthetic Audio Feedback (No file needed) ---
  const playClickSound = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
  };

  const toggleFaq = (index) => setActiveFaq(activeFaq === index ? null : index);

  useEffect(() => {
    const names = ["Uche", "Amina", "Chidi", "Blessing", "Tunde", "Fatima", "Okon", "Yinka"];
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAmount = (Math.floor(Math.random() * 15) + 5) * 500;
      setCurrentToast({ name: randomName, amount: randomAmount.toLocaleString() });
      setShowToast(true);
      updateFavicon(true); // Alert on tab
      
      setTimeout(() => {
        setShowToast(false);
        updateFavicon(false); // Remove alert
      }, 4000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-tarmarket-cream min-h-screen font-sans flex flex-col text-tarmarket-umber overflow-x-hidden relative">
      
      {/* LIVE PAYOUT TOAST */}
      <div className={`fixed bottom-6 left-6 z-[100] bg-white p-4 rounded-2xl shadow-2xl border-l-4 border-tarmarket-umber transition-all duration-500 transform ${showToast ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <p className="text-sm font-bold text-tarmarket-umber">
            {currentToast.name} just withdrew <span className="text-tarmarket-clay">₦{currentToast.amount}</span>
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto w-full bg-white shadow-xl md:shadow-2xl relative">
        <div className="absolute top-40 -left-20 w-96 h-96 bg-tarmarket-tan rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        
        <nav className="p-4 md:p-6 flex justify-between items-center border-b border-tarmarket-tan sticky top-0 bg-white/90 backdrop-blur-md z-50">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter">TARMARKET</h1>
          <button className="text-sm md:text-base font-bold px-6 py-2 rounded-full bg-tarmarket-umber text-white hover:scale-105 active:scale-95 transition-all">
            Login
          </button>
        </nav>

        <main className="flex-grow relative z-10">
          <section className="py-16 md:py-32 px-6 text-center max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight">
              WHERE CREATORS AMPLIFY <br className="hidden md:block" /> AND WORKERS EARN.
            </h2>
            <p className="text-tarmarket-clay text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
              The bridge between content creators seeking real engagement and workers ready to earn from home.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button className="bg-tarmarket-umber text-white px-10 py-4 rounded-xl shadow-xl hover:-translate-y-1 transition-all font-bold text-lg">FOR INFLUENCERS</button>
              <button className="bg-white text-tarmarket-umber px-10 py-4 rounded-xl border-2 border-tarmarket-umber hover:bg-tarmarket-tan transition-all font-bold text-lg">FOR WORKERS</button>
            </div>
          </section>

          <div className="bg-tarmarket-tan/20 py-8 border-y border-tarmarket-tan/50 overflow-hidden flex whitespace-nowrap">
            <div className="flex shrink-0 animate-marquee gap-12 px-6 opacity-40 font-black text-xl tracking-widest uppercase">
              <span>YouTube</span><span>TikTok</span><span>Instagram</span><span>Facebook</span><span>Threads</span><span>Twitter</span>
            </div>
            <div className="flex shrink-0 animate-marquee gap-12 px-6 opacity-40 font-black text-xl tracking-widest uppercase">
              <span>YouTube</span><span>TikTok</span><span>Instagram</span><span>Facebook</span><span>Threads</span><span>Twitter</span>
            </div>
          </div>

          {/* REAL-TIME STATS with COUNT-UP */}
          <section className="py-16 md:py-24 bg-white border-b border-tarmarket-tan/30">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="space-y-2 group">
                <p className="text-5xl md:text-6xl font-black"><CountUp end="50000" suffix="+" /></p>
                <p className="text-tarmarket-clay font-bold text-sm tracking-widest uppercase">Watch Hours Delivered</p>
              </div>
              <div className="space-y-2 group">
                <p className="text-5xl md:text-6xl font-black"><CountUp end="12000" suffix="+" /></p>
                <p className="text-tarmarket-clay font-bold text-sm tracking-widest uppercase">Verified Workers</p>
              </div>
              <div className="space-y-2 group">
                <p className="text-5xl md:text-6xl font-black">₦<CountUp end="10000000" suffix="+" /></p>
                <p className="text-tarmarket-clay font-bold text-sm tracking-widest uppercase">Total Payouts</p>
              </div>
            </div>
          </section>

          {/* EARNINGS CALCULATOR with SOUND */}
          <section className="py-20 px-6">
            <div className="max-w-3xl mx-auto bg-tarmarket-cream border border-tarmarket-tan p-8 md:p-12 rounded-[3rem] shadow-sm text-center">
              <h3 className="text-2xl md:text-4xl font-black mb-4">What could you earn?</h3>
              <p className="text-tarmarket-clay mb-8 font-medium">Drag the slider to see your potential monthly income</p>
              <input 
                type="range" min="5" max="100" value={tasksPerDay} 
                onChange={(e) => {
                  setTasksPerDay(e.target.value);
                  playClickSound(); // Audio feedback
                }}
                className="w-full h-3 bg-tarmarket-tan rounded-lg appearance-none cursor-pointer accent-tarmarket-umber mb-6"
              />
              <div className="flex justify-between font-bold text-sm text-tarmarket-clay mb-10">
                <span>{tasksPerDay} Tasks/Day</span>
                <span>Rate: ₦50/Task</span>
              </div>
              <div className="py-6 border-t border-tarmarket-tan/50">
                <p className="text-5xl md:text-7xl font-black text-tarmarket-umber animate-pulse">
                  ₦{ (tasksPerDay * 50 * 30).toLocaleString() }
                </p>
                <p className="text-xs font-black uppercase tracking-widest mt-2 opacity-50">Estimated Monthly Earnings</p>
              </div>
            </div>
          </section>

          <section className="py-20 md:py-32 px-6 bg-tarmarket-cream/30">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h3 className="text-3xl md:text-5xl font-black mb-4">How It Works</h3>
              <p className="text-tarmarket-clay text-lg font-medium">Your journey to growth or earnings starts here.</p>
            </div>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { id: "01", t: "Sign Up", d: "Choose your role and set up your profile in minutes." },
                { id: "02", t: "Engage", d: "Workers complete tasks; Creators see instant growth." },
                { id: "03", t: "Withdraw", d: "Secure payments delivered straight to your bank account." }
              ].map((step, i) => (
                <div key={i} className="bg-white p-10 rounded-3xl border border-tarmarket-tan/50 shadow-sm relative overflow-hidden group hover:border-tarmarket-umber hover:-translate-y-2 transition-all duration-300">
                  <span className="absolute -top-4 -right-4 text-8xl font-black text-tarmarket-tan/10 group-hover:text-tarmarket-tan/20 transition">{step.id}</span>
                  <h4 className="font-bold text-2xl mb-4 relative z-10">{step.t}</h4>
                  <p className="text-tarmarket-clay leading-relaxed relative z-10 font-medium">{step.d}</p>
                </div>
              ))}
            </div>
          </section>

          <FeatureCards />

          {/* FAQ SECTION */}
          <section className="py-24 px-6 bg-tarmarket-cream">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-black text-center mb-12">Common Questions</h3>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <div key={index} className="bg-white rounded-2xl border border-tarmarket-tan overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <button onClick={() => toggleFaq(index)} className="w-full p-6 text-left flex justify-between items-center font-bold text-lg">
                      {faq.question}
                      <span className={`text-2xl transition-transform duration-300 ${activeFaq === index ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    <div className={`transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <div className="px-6 pb-6 text-tarmarket-clay border-t border-tarmarket-tan/50 pt-4 leading-relaxed font-medium">{faq.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-20 md:py-32 px-6 text-center bg-tarmarket-umber text-white relative">
            <div className="relative z-10">
              <h3 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to take the next step?</h3>
              <button className="bg-tarmarket-tan text-tarmarket-umber px-14 py-5 rounded-full text-xl font-black hover:bg-white hover:scale-110 active:scale-95 transition-all shadow-xl uppercase tracking-widest">Get Started Now</button>
            </div>
          </section>
        </main>

        <footer className="py-16 border-t border-tarmarket-tan text-center bg-white px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left mb-16">
            <div>
              <h4 className="font-black text-2xl mb-4 tracking-tighter">TARMARKET</h4>
              <p className="text-tarmarket-clay text-sm font-medium">Empowering the Nigerian digital economy through authentic engagement.</p>
            </div>
            <div className="flex flex-col gap-2 font-bold text-sm">
              <a href="#" className="hover:text-tarmarket-clay transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-tarmarket-clay transition-colors">Privacy Policy</a>
            </div>
            <div className="flex flex-col gap-2 font-bold text-sm">
              <a href="#" className="hover:text-tarmarket-clay transition-colors">Twitter / X</a>
              <a href="#" className="hover:text-tarmarket-clay transition-colors">WhatsApp Support</a>
            </div>
          </div>
          <p className="text-tarmarket-clay text-[10px] md:text-xs tracking-[0.2em] font-black uppercase border-t border-tarmarket-tan pt-8">
            &copy; {new Date().getFullYear()} Target Multiconcepts Venture.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
