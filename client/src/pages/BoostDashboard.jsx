import React from 'react';
import { CampaignCard } from '../features/boost/CampaignCard';

const BoostDashboard = () => {
  return (
    <div className="min-h-screen bg-tarmarket-cream p-4 md:p-10">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-tarmarket-umber">Creator Hub</h1>
          <p className="text-tarmarket-clay">@TheAestheticQueen</p>
        </div>
        <div className="bg-white p-3 rounded-2xl border border-tarmarket-tan shadow-sm text-center">
          <p className="text-xs text-tarmarket-clay">Total Spend</p>
          <p className="text-xl font-bold text-tarmarket-umber">$124.50</p>
        </div>
      </header>

      {/* Analytics Mini-Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-tarmarket-tan/20 p-6 rounded-3xl border border-tarmarket-tan">
          <p className="text-tarmarket-clay text-sm">Views Roosted</p>
          <p className="text-3xl font-black text-tarmarket-umber">8,752 <span className="text-sm text-green-600">+16%</span></p>
        </div>
        <div className="bg-tarmarket-tan/20 p-6 rounded-3xl border border-tarmarket-tan">
          <p className="text-tarmarket-clay text-sm">Avg. Watch Time</p>
          <p className="text-3xl font-black text-tarmarket-umber">3:15 <span className="text-sm text-green-600">+22%</span></p>
        </div>
        <div className="bg-tarmarket-umber p-6 rounded-3xl text-white flex items-center justify-between">
          <span>New Campaign</span>
          <button className="bg-white text-tarmarket-umber w-10 h-10 rounded-full font-bold">+</button>
        </div>
      </div>

      <h2 className="text-xl font-bold text-tarmarket-umber mb-4">Active Campaigns</h2>
      <div className="grid gap-4">
        <CampaignCard title="YouTube 101" status="Live" progress={85} />
        <CampaignCard title="TikTok Viral Reel" status="Live" progress={42} />
      </div>
    </div>
  );
};

export default BoostDashboard;