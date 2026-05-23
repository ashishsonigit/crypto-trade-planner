import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTrade } from '../store/tradesSlice';
import { calculateTrade } from '../utils/tradeCalculator';
import TradePreview from '../components/TradePreview';

const TradeForm: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    crypto: 'BTC',
    entryPrice: 0,
    stopLoss: 0,
    takeProfit: 0,
    leverage: 1,
    tradingFee: 0.1,
    exchange: 'Binance',
    riskAmount: 100,
  });

  const [preview, setPreview] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'crypto' || name === 'exchange' ? value : parseFloat(value) || 0,
    }));
  };

  const handleCalculate = () => {
    const calculation = calculateTrade(formData);
    setPreview(calculation);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (preview) {
      dispatch(addTrade(preview));
      alert('Trade added successfully!');
      setFormData({
        crypto: 'BTC',
        entryPrice: 0,
        stopLoss: 0,
        takeProfit: 0,
        leverage: 1,
        tradingFee: 0.1,
        exchange: 'Binance',
        riskAmount: 100,
      });
      setPreview(null);
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8">New Trade</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-gray-800 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cryptocurrency</label>
                <select
                  name="crypto"
                  value={formData.crypto}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600"
                >
                  <option>BTC</option>
                  <option>ETH</option>
                  <option>BNB</option>
                  <option>SOL</option>
                  <option>XRP</option>
                  <option>ADA</option>
                  <option>DOGE</option>
                  <option>MATIC</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Exchange</label>
                <select
                  name="exchange"
                  value={formData.exchange}
                  onChange={handleChange}
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600"
                >
                  <option>Binance</option>
                  <option>Coinbase</option>
                  <option>Kraken</option>
                  <option>Bybit</option>
                  <option>FTX</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Entry Price ($)</label>
              <input
                type="number"
                name="entryPrice"
                value={formData.entryPrice || ''}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Stop Loss ($)</label>
                <input
                  type="number"
                  name="stopLoss"
                  value={formData.stopLoss || ''}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Take Profit ($)</label>
                <input
                  type="number"
                  name="takeProfit"
                  value={formData.takeProfit || ''}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Leverage (x)</label>
                <input
                  type="number"
                  name="leverage"
                  value={formData.leverage || ''}
                  onChange={handleChange}
                  placeholder="1"
                  min="1"
                  max="125"
                  step="0.1"
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Trading Fee (%)</label>
                <input
                  type="number"
                  name="tradingFee"
                  value={formData.tradingFee || ''}
                  onChange={handleChange}
                  placeholder="0.1"
                  step="0.01"
                  className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Risk Amount ($)</label>
              <input
                type="number"
                name="riskAmount"
                value={formData.riskAmount || ''}
                onChange={handleChange}
                placeholder="100"
                step="10"
                className="w-full bg-gray-700 text-white rounded px-3 py-2 border border-gray-600"
              />
            </div>

            <div className="pt-4 space-y-2">
              <button
                type="button"
                onClick={handleCalculate}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
              >
                Calculate
              </button>
              {preview && (
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
                >
                  Save Trade
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Preview */}
        {preview && <TradePreview trade={preview} />}
      </div>
    </div>
  );
};

export default TradeForm;
