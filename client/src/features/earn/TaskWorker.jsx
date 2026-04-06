import React, { useState, useEffect } from 'react';

const TaskWorker = ({ videoUrl, requiredTime = 60 }) => {
  const [secondsLeft, setSecondsLeft] = useState(requiredTime);
  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanSubmit(true);
    }
  }, [secondsLeft]);

  return (
    <div className="bg-white p-6 rounded-2xl border border-tarmarket-tan">
      <div className="aspect-video mb-4 bg-black rounded-xl overflow-hidden">
        {/* Embed Video Player here */}
        <iframe width="100%" height="100%" src={videoUrl} title="Work Task"></iframe>
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-tarmarket-clay text-sm">
          {canSubmit ? "✓ Minimum watch time reached" : `Watch for ${secondsLeft} more seconds...`}
        </p>
        <button 
          disabled={!canSubmit}
          className={`px-6 py-2 rounded-lg font-bold transition ${
            canSubmit ? 'bg-tarmarket-umber text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Submit for $0.50
        </button>
      </div>
    </div>
  );
};