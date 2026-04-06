import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen bg-tarmarket-cream flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-tarmarket-umber tracking-tighter">TARMARKET</h1>
          <p className="text-tarmarket-clay mt-2">Welcome back to the hub.</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-5 rounded-2xl bg-white border border-tarmarket-tan shadow-sm focus:ring-2 focus:ring-tarmarket-tan outline-none"
            />
          </div>
          <div className="relative">
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full p-5 rounded-2xl bg-white border border-tarmarket-tan shadow-sm focus:ring-2 focus:ring-tarmarket-tan outline-none"
            />
          </div>
          
          <button className="w-full bg-tarmarket-umber text-white py-5 rounded-2xl font-black shadow-lg active:scale-95 transition">
            LOG IN
          </button>
        </div>

        <p className="text-center mt-8 text-tarmarket-clay text-sm">
          New here? <Link to="/register" className="text-tarmarket-umber font-bold">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;