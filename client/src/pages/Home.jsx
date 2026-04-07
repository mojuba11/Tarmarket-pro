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

  // --- 2. Dynamic Favicon Dot ---
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
        ctx.beginPath();
        ctx.arc(24, 8, 7, 0, 2 * Math.PI);
        ctx.fillStyle = '#ff4b2b';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      favicon.href = canvas.toDataURL('image/png');
    };
  };

  // --- 3. Interaction Sound (Slider Pop) ---
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
    } catch (e) { /* Audio fails silently */ }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  useEffect(() => {
    const names = ["Uche", "Amina", "Chidi", "Blessing", "Tunde", "Fatima", "Okon", "Yinka"];
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomAmount = (Math.floor(Math.random() * 15) + 5) * 500;
      setCurrentToast({ name: randomName, amount: randomAmount.toLocaleString() });
      setShowToast(true);
      updateFavicon(true);
      setTimeout(() => {
        setShowToast(false);
        updateFavicon(false);
      }, 4000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const faqData = [
    { question: "How do I get paid as a worker?", answer: "Once you complete a task and it's verified by our system, funds are added to your Tarmarket wallet. You can withdraw directly to your bank account once you hit the minimum threshold of ₦2,000." },
    { question: "Is this safe for my social media accounts?", answer: "Yes. We prioritize organic growth. Our workers are real people engaging naturally, which keeps your accounts safe and compliant with platform guidelines." },
    { question: "Can I be both a Creator and a Worker?", answer: "Absolutely! You can use your earnings from completing tasks to fund your own content amplification campaigns." }
  ];

  return (
    <div className="bg-tarmarket-cream min-h-screen font-sans flex flex-col text-tarmarket-umber overflow-x-hidden relative">
      
      {/* 1. LIVE PAYOUT TOAST */}
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

        {/* NAVIGATION */}
        <nav className="p-4 md:p-6 flex justify-between items-center border-b border-tarmarket-tan sticky top-0 bg-white/90 backdrop-blur-md z-50">
          <h1 className="text-xl md:text-2xl font-black tracking-tighter">TARMARKET</h1>
          <button className="text-sm md:text-base font-bold px-6 py-2 rounded-full bg-tarmarket-umber text-white hover:scale-105 active:scale-95 transition-all">
            Login
          </button>
        </nav>

        <main className="flex-grow relative z-10">
          {/* HERO SECTION */}
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

          {/* INFINITE MARQUEE BAR */}
          <div className="bg-tarmarket-tan/20 py-8 border-y border-tarmarket-tan/50 overflow-hidden flex whitespace-nowrap">
            <div className="flex shrink-0 animate-marquee gap-12 px-6 opacity-40 font-black text-xl tracking-widest uppercase">
              <span>YouTube</span><span>TikTok</span><span>Instagram</span><span>Facebook</span><span>Threads</span><span>Twitter</span>
            </div>
            <div className="flex shrink-0 animate-marquee gap-12 px-6 opacity-40 font-black text-xl tracking-widest uppercase">
              <span>YouTube</span><span>TikTok</span><span>Instagram</span><span>Facebook</span><span>Threads</span><span>Twitter</span>
            </div>
          </div>

          {/* REAL-TIME STATS */}
          <section className="py-16 md:py-24 bg-white border-b border-tarmarket-tan/30">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="space-y-2 group">
                <p className="text-5xl md:text-6xl font-black group-hover:text-tarmarket-clay transition-colors">
                  <Counter endValue="5000" suffix="k+" />
                </p>
                <p className="text-tarmarket-clay font-bold text-sm tracking-widest uppercase">Watch Hours Delivered</p>
              </div>
              <div className="space-y-2 group">
                <p className="text-5xl md:text-6xl font-black">
                  <Counter endValue="12000" suffix="+" />
                </p>
                <p className="text-tarmarket-clay font-bold text-sm tracking-widest uppercase">Verified Workers</p>
              </div>
              <div className="space-y-2 group">
                <p className="text-5xl md:text-6xl font-black">
                  ₦<Counter endValue="10" suffix="M+" />
                </p>
                <p className="text-tarmarket-clay font-bold text-sm tracking-widest uppercase">Total Payouts</p>
              </div>
            </div>
          </section>

          {/* DYNAMIC TWO-COLUMN EARNINGS CALCULATOR */}
          <section className="py-24 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-tarmarket-cream/30 p-8 md:p-16 rounded-[4rem] border border-tarmarket-tan/50 shadow-sm">
                
                {/* Column 1: Controls */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-4xl md:text-5xl font-black mb-4 leading-tight text-tarmarket-umber">
                      Turn your spare time into <span className="text-tarmarket-clay">real cash.</span>
                    </h3>
                    <p className="text-lg text-tarmarket-clay font-medium max-w-md">
                      Adjust the slider to see your potential monthly income. The more you engage, the more you grow.
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-tarmarket-tan/40">
                    <div className="flex justify-between mb-6 items-end">
                      <span className="text-xs font-black uppercase tracking-widest text-tarmarket-clay">Daily Task Goal</span>
                      <span className="text-2xl font-black text-tarmarket-umber">{tasksPerDay} Tasks</span>
                    </div>
                    
                    <input 
                      type="range" min="5" max="100" step="5" value={tasksPerDay} 
                      onChange={(e) => {
                        setTasksPerDay(e.target.value);
                        playSliderSound();
                      }}
                      className="w-full h-3 bg-tarmarket-tan rounded-lg appearance-none cursor-pointer accent-tarmarket-umber mb-4"
                    />
                    
                    <div className="flex justify-between text-[10px] font-bold text-tarmarket-clay/50 uppercase tracking-tighter">
                      <span>Starter (5)</span>
                      <span>Active (50)</span>
                      <span>Pro (100)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-tarmarket-umber/5 rounded-2xl border border-tarmarket-umber/10">
                    <div className="w-10 h-10 bg-tarmarket-umber rounded-full flex items-center justify-center text-white font-bold shrink-0">₦</div>
                    <p className="text-sm font-medium text-tarmarket-umber/80 leading-snug">
                      Average payout is <strong>₦50 per task</strong>. Top workers complete their daily goals in under 45 minutes.
                    </p>
                  </div>
                </div>

                {/* Column 2: Visual Wallet Preview */}
                <div className="relative">
                  {/* Backdrop Glow */}
                  <div className="absolute inset-0 bg-tarmarket-tan blur-3xl opacity-20 rounded-full scale-75"></div>
                  
                  <div className="relative bg-tarmarket-umber p-8 md:p-12 rounded-[3rem] shadow-2xl text-white transform hover:-translate-y-2 transition-transform duration-500 overflow-hidden">
                    {/* Decorative Card Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                    
                    <div className="flex justify-between items-start mb-12">
                      <div>
                        <p className="text-xs font-bold opacity-60 uppercase tracking-widest mb-1">Estimated Monthly Wallet</p>
                        <h4 className="text-5xl md:text-6xl font-black tracking-tighter">
                          ₦{(tasksPerDay * 50 * 30).toLocaleString()}
                        </h4>
                      </div>
                      <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-4 border-t border-white/10 text-sm font-medium">
                        <span className="opacity-60">Status</span>
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          Ready to Withdraw
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-4 border-t border-white/10 text-sm font-medium">
                        <span className="opacity-60">Payout Frequency</span>
                        <span>Weekly / Instant</span>
                      </div>
                    </div>

                    <button className="w-full mt-8 bg-tarmarket-tan text-tarmarket-umber py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-all active:scale-95 shadow-lg">
                      Start Earning Now
                    </button>
                  </div>

                  {/* Trust Badge */}
                  <div className="absolute -bottom-6 right-8 bg-white py-3 px-6 rounded-2xl shadow-xl border border-tarmarket-tan hidden md:flex items-center gap-2">
                    <span className="text-green-600 text-lg">✓</span>
                    <p className="text-tarmarket-umber font-black text-xs uppercase tracking-tight">Verified Bank Transfers</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}
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

          {/* FINAL CTA */}
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
              <p className="text-tarmarket-clay text-sm font-medium">Empowering the Nigerian digital economy through authentic engagement and local opportunities.</p>
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
