import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', role: 'worker' 
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic: Send formData to Node.js /api/auth/register
    console.log("Registering:", formData);
    // On success:
    navigate(formData.role === 'influencer' ? '/dashboard/boost' : '/dashboard/earn');
  };

  return (
    <div className="min-h-screen bg-tarmarket-cream flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-tarmarket-tan max-w-md w-full">
        <h2 className="text-3xl font-black text-tarmarket-umber mb-2 text-center">Join Tarmarket</h2>
        <p className="text-tarmarket-clay text-center mb-8">Start your "Work From Home" journey.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Toggle */}
          <div className="flex bg-tarmarket-cream p-1 rounded-xl mb-6">
            <button 
              type="button"
              onClick={() => setFormData({...formData, role: 'worker'})}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${formData.role === 'worker' ? 'bg-tarmarket-umber text-white shadow-md' : 'text-tarmarket-clay'}`}
            >
              Worker
            </button>
            <button 
              type="button"
              onClick={() => setFormData({...formData, role: 'influencer'})}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition ${formData.role === 'influencer' ? 'bg-tarmarket-umber text-white shadow-md' : 'text-tarmarket-clay'}`}
            >
              Influencer
            </button>
          </div>

          <input 
            type="text" placeholder="Username" 
            className="w-full p-4 rounded-xl border border-tarmarket-tan bg-tarmarket-cream focus:outline-tarmarket-umber"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <input 
            type="email" placeholder="Email Address" 
            className="w-full p-4 rounded-xl border border-tarmarket-tan bg-tarmarket-cream focus:outline-tarmarket-umber"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full p-4 rounded-xl border border-tarmarket-tan bg-tarmarket-cream focus:outline-tarmarket-umber"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          <button type="submit" className="w-full bg-tarmarket-umber text-white py-4 rounded-xl font-bold mt-4 hover:bg-[#32251B] transition">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;