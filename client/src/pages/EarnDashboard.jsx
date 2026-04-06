import React from 'react';
import { WalletCard } from '../features/earn/WalletCard';

const EarnDashboard = () => {
  return (
    <div className="min-h-screen bg-tarmarket-cream p-4 md:p-10">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-black text-tarmarket-umber uppercase tracking-tighter">Task Center</h1>
        <div className="w-10 h-10 bg-tarmarket-tan rounded-full border-2 border-tarmarket-umber"></div>
      </header>

      {/* Main Wallet Area */}
      <div className="mb-10">
        <WalletCard balance="32.40" pending="15.10" />
      </div>

      {/* Task List */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-tarmarket-umber">Available Tasks</h2>
          <button className="text-sm text-tarmarket-clay underline">View All</button>
        </div>

        <div className="space-y-4">
          {[
            { id: 1, platform: 'YouTube', reward: '$0.50', time: '3 mins' },
            { id: 2, platform: 'TikTok', reward: '$0.25', time: '1 min' },
            { id: 3, platform: 'Instagram', reward: '$0.30', time: '2 mins' },
          ].map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-2xl border border-tarmarket-tan/30 flex justify-between items-center hover:shadow-md transition cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-tarmarket-cream rounded-xl flex items-center justify-center font-bold text-tarmarket-umber">
                  {task.platform[0]}
                </div>
                <div>
                  <p className="font-bold text-tarmarket-umber">{task.platform} Engagement</p>
                  <p className="text-xs text-tarmarket-clay">{task.time} watch time</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-tarmarket-umber">{task.reward}</p>
                <p className="text-[10px] text-green-600 font-bold uppercase">Instant Pay</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EarnDashboard;