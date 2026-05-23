import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { deleteTrade } from '../store/tradesSlice';
import { exportToCSV, exportToPDF } from '../utils/exporters';

const TradeHistory: React.FC = () => {
  const dispatch = useDispatch();
  const trades = useSelector((state: RootState) => state.trades.trades);
  const [sortBy, setSortBy] = useState('date');

  const sortedTrades = [...trades].sort((a, b) => {
    switch (sortBy) {
      case 'profit':
        return b.potentialProfit - a.potentialProfit;
      case 'risk':
        return b.riskAmount - a.riskAmount;
      case 'rrRatio':
        return b.rrRatio - a.rrRatio;
      case 'date':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this trade?')) {
      dispatch(deleteTrade(id));
    }
  };

  const handleExportCSV = () => {
    exportToCSV(trades);
  };

  const handleExportPDF = () => {
    exportToPDF(trades);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Trade History</h1>
        <div className="space-x-2">
          <button
            onClick={handleExportCSV}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
          >
            📥 Export CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition"
          >
            📄 Export PDF
          </button>
        </div>
      </div>

      {trades.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No trades yet</p>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-700 text-white rounded px-3 py-2 border border-gray-600"
            >
              <option value="date">Date (Latest)</option>
              <option value="profit">Potential Profit</option>
              <option value="risk">Risk Amount</option>
              <option value="rrRatio">R/R Ratio</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-700 bg-gray-700">
                <tr>
                  <th className="text-left py-3 px-3">Date</th>
                  <th className="text-left py-3 px-3">Crypto</th>
                  <th className="text-left py-3 px-3">Exchange</th>
                  <th className="text-left py-3 px-3">Entry</th>
                  <th className="text-left py-3 px-3">Stop Loss</th>
                  <th className="text-left py-3 px-3">Leverage</th>
                  <th className="text-left py-3 px-3">Risk ($)</th>
                  <th className="text-left py-3 px-3">Profit ($)</th>
                  <th className="text-left py-3 px-3">R/R Ratio</th>
                  <th className="text-center py-3 px-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedTrades.map((trade) => (
                  <tr key={trade.id} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-3 px-3 text-gray-400 text-xs">
                      {new Date(trade.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-3 font-semibold">{trade.crypto}</td>
                    <td className="py-3 px-3">{trade.exchange}</td>
                    <td className="py-3 px-3">${trade.entryPrice.toFixed(2)}</td>
                    <td className="py-3 px-3">${trade.stopLoss.toFixed(2)}</td>
                    <td className="py-3 px-3">{trade.leverage.toFixed(1)}x</td>
                    <td className="py-3 px-3 text-red-400">${trade.riskAmount.toFixed(2)}</td>
                    <td className={`py-3 px-3 ${trade.potentialProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${trade.potentialProfit.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 font-semibold">{trade.rrRatio.toFixed(2)}:1</td>
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => handleDelete(trade.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs transition"
                      >
                        Delete
                      </button>
                    </td>
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

export default TradeHistory;
