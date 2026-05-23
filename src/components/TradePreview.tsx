import React from 'react';

interface TradePreviewProps {
  trade: any;
}

const TradePreview: React.FC<TradePreviewProps> = ({ trade }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Trade Analysis</h2>

      <div className="space-y-4">
        <div className="bg-gray-700 rounded p-4">
          <p className="text-gray-400 text-sm">Position Size</p>
          <p className="text-2xl font-bold text-white">{trade.positionSize?.toFixed(6)} {trade.crypto}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded p-4">
            <p className="text-gray-400 text-sm">Risk Amount</p>
            <p className="text-xl font-bold text-red-400">${trade.riskAmount?.toFixed(2)}</p>
          </div>

          <div className="bg-gray-700 rounded p-4">
            <p className="text-gray-400 text-sm">Max Loss</p>
            <p className="text-xl font-bold text-red-400">${trade.maxLoss?.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded p-4">
            <p className="text-gray-400 text-sm">Potential Profit</p>
            <p className="text-xl font-bold text-green-400">${trade.potentialProfit?.toFixed(2)}</p>
          </div>

          <div className="bg-gray-700 rounded p-4">
            <p className="text-gray-400 text-sm">R/R Ratio</p>
            <p className="text-xl font-bold text-blue-400">{trade.rrRatio?.toFixed(2)}:1</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded p-4">
            <p className="text-gray-400 text-sm">Entry Price</p>
            <p className="text-lg font-bold text-white">${trade.entryPrice?.toFixed(2)}</p>
          </div>

          <div className="bg-gray-700 rounded p-4">
            <p className="text-gray-400 text-sm">Stop Loss</p>
            <p className="text-lg font-bold text-white">${trade.stopLoss?.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded p-4">
            <p className="text-gray-400 text-sm">Take Profit</p>
            <p className="text-lg font-bold text-white">${trade.takeProfit?.toFixed(2)}</p>
          </div>

          <div className="bg-gray-700 rounded p-4">
            <p className="text-gray-400 text-sm">Leverage</p>
            <p className="text-lg font-bold text-white">{trade.leverage?.toFixed(1)}x</p>
          </div>
        </div>

        <div className="bg-gray-700 rounded p-4">
          <p className="text-gray-400 text-sm">Total Fees</p>
          <p className="text-lg font-bold text-yellow-400">${trade.totalFees?.toFixed(2)}</p>
        </div>

        {trade.rrRatio >= 2 && (
          <div className="bg-green-900 border border-green-500 rounded p-4">
            <p className="text-green-300 font-semibold">✅ Good Risk/Reward Ratio</p>
            <p className="text-green-400 text-sm">This trade has a favorable risk/reward profile</p>
          </div>
        )}

        {trade.rrRatio < 1 && (
          <div className="bg-red-900 border border-red-500 rounded p-4">
            <p className="text-red-300 font-semibold">⚠️ Poor Risk/Reward Ratio</p>
            <p className="text-red-400 text-sm">Risk is greater than potential reward</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradePreview;
