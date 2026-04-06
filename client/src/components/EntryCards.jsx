const EntryCards = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 px-10 pb-20">
      {/* Influencer Side */}
      <div className="bg-[#D2B48C] p-8 rounded-2xl shadow-sm border border-[#4A3728]/10 hover:shadow-md transition">
        <h3 className="text-2xl font-bold text-[#4A3728]">I want to Boost</h3>
        <p className="text-[#4A3728]/80 my-4">Upload your links, set a budget, and get real human engagement.</p>
        <ul className="text-sm space-y-2 mb-6">
          <li>✓ Real-time Analytics</li>
          <li>✓ Custom Budgeting</li>
          <li>✓ Verified Views</li>
        </ul>
        <button className="w-full bg-[#4A3728] text-white py-3 rounded-lg font-bold">Create Campaign</button>
      </div>

      {/* Worker Side */}
      <div className="bg-[#F4A460]/20 p-8 rounded-2xl border-2 border-dashed border-[#D2B48C] hover:bg-[#F4A460]/30 transition">
        <h3 className="text-2xl font-bold text-[#4A3728]">I want to Earn</h3>
        <p className="text-[#4A3728]/80 my-4">Watch content you love and get paid directly to your bank.</p>
        <ul className="text-sm space-y-2 mb-6">
          <li>✓ Work from Home</li>
          <li>✓ Instant Withdrawals</li>
          <li>✓ Daily Tasks</li>
        </ul>
        <button className="w-full bg-white text-[#4A3728] border border-[#4A3728] py-3 rounded-lg font-bold">Start Working</button>
      </div>
    </div>
  );
};