import { TradeResult } from './tradeCalculator';

export function exportToCSV(trades: TradeResult[]): void {
  const headers = [
    'Date',
    'Cryptocurrency',
    'Exchange',
    'Entry Price',
    'Stop Loss',
    'Take Profit',
    'Leverage',
    'Position Size',
    'Risk Amount',
    'Max Loss',
    'Potential Profit',
    'R/R Ratio',
    'Trading Fee %',
    'Total Fees',
  ];

  const rows = trades.map(trade => [
    new Date(trade.createdAt).toLocaleDateString(),
    trade.crypto,
    trade.exchange,
    trade.entryPrice.toFixed(2),
    trade.stopLoss.toFixed(2),
    trade.takeProfit.toFixed(2),
    trade.leverage.toFixed(1),
    trade.positionSize.toFixed(6),
    trade.riskAmount.toFixed(2),
    trade.maxLoss.toFixed(2),
    trade.potentialProfit.toFixed(2),
    trade.rrRatio.toFixed(2),
    trade.tradingFee.toFixed(2),
    trade.totalFees.toFixed(2),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `crypto-trades-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}

export function exportToPDF(trades: TradeResult[]): void {
  // This is a placeholder for PDF export
  // In production, you would use a library like pdfkit or puppeteer
  console.log('PDF export functionality to be implemented');
  alert('PDF export will be implemented in the next version');
}
