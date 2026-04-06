export const CampaignCard = ({ title, status, progress }) => (
  <div className="bg-white p-5 rounded-2xl border border-tarmarket-tan/40 shadow-sm">
    <div className="flex justify-between items-center mb-4">
      <h4 className="font-bold text-tarmarket-umber">{title}</h4>
      <span className="text-xs bg-tarmarket-tan/20 px-2 py-1 rounded text-tarmarket-clay">{status}</span>
    </div>
    <div className="w-full bg-tarmarket-cream h-2 rounded-full overflow-hidden">
      <div className="bg-tarmarket-tan h-full" style={{ width: `${progress}%` }}></div>
    </div>
    <p className="text-right text-xs mt-2 text-tarmarket-clay">{progress}% Complete</p>
  </div>
);