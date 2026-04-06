export const WalletCard = ({ balance, pending }) => (
  <div className="bg-tarmarket-sand p-6 rounded-3xl text-tarmarket-umber shadow-xl">
    <p className="text-sm opacity-80 mb-1">Available Balance</p>
    <h2 className="text-4xl font-black mb-4">${balance}</h2>
    <div className="border-t border-tarmarket-umber/10 pt-4 flex justify-between items-center">
      <div>
        <p className="text-xs opacity-70">Pending Verification</p>
        <p className="font-bold">${pending}</p>
      </div>
      <button className="bg-tarmarket-umber text-white px-4 py-2 rounded-xl text-sm font-bold">
        Withdraw Now
      </button>
    </div>
  </div>
);