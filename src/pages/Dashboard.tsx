import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import StatCard from '../components/StatCard';

const Dashboard: React.FC = () => {
  const trades = useSelector((state: RootState) => state.trades.trades);

  const totalTrades = trades.length;
  const profitableTrades = trades.filter(t => t.potentialProfit > 0).length;
  const totalRisk = trades.reduce((sum, t) => sum + t.riskAmount, 0);
  const totalProfit = trades.reduce((sum, t) => sum + t.potentialProfit, 0);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Total Trades"
          value={totalTrades}
          icon="📊"
          color="blue"
        />
        <StatCard
          title="Profitable"
          value={profitableTrades}
          icon="✅"
          color="green"
        />
        <StatCard
          title="Total Risk"
          value={`$${totalRisk.toFixed(2)}`}
          icon="⚠️"
          color="red"
        />
        <StatCard
          title="Potential Profit"
          value={`$${totalProfit.toFixed(2)}`}
          icon="💰"
          color="yellow"
        />
      </div>

      {trades.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400 mb-4">No trades planned yet</p>
          <p className="text-gray-500">Start by creating a new trade plan</p>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Trades</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left py-2 px-2">Crypto</th>
                  <th className="text-left py-2 px-2">Entry</th>
                  <th className="text-left py-2 px-2">Stop Loss</th>
                  <th className="text-left py-2 px-2">Risk</th>
                  <th className="text-left py-2 px-2">Profit</th>
                  <th className="text-left py-2 px-2">R/R Ratio</th>
                </tr>
              </thead>
              <tbody>
                {trades.slice(0, 5).map((trade) => (
                  <tr key={trade.id} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-3 px-2 font-semibold">{trade.crypto}</td>
                    <td className="py-3 px-2">${trade.entryPrice.toFixed(2)}</td>
                    <td className="py-3 px-2">${trade.stopLoss.toFixed(2)}</td>
                    <td className="py-3 px-2 text-red-400">${trade.riskAmount.toFixed(2)}</td>
                    <td className={`py-3 px-2 ${trade.potentialProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${trade.potentialProfit.toFixed(2)}
                    </td>
                    <td className="py-3 px-2">{trade.rrRatio.toFixed(2)}:1</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
