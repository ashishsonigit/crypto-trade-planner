export interface TradeInput {
  crypto: string;
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  leverage: number;
  tradingFee: number;
  exchange: string;
  riskAmount: number;
}

export interface TradeResult extends TradeInput {
  id: string;
  positionSize: number;
  maxLoss: number;
  potentialProfit: number;
  rrRatio: number;
  totalFees: number;
  createdAt: string;
}

export function calculateTrade(input: TradeInput): TradeResult {
  // Calculate price movement
  const priceDifference = input.entryPrice - input.stopLoss;
  const profitDifference = input.takeProfit - input.entryPrice;

  // Position size based on risk
  const positionSize = input.riskAmount / priceDifference;

  // Maximum loss (with leverage)
  const maxLoss = priceDifference * positionSize * input.leverage;

  // Potential profit (with leverage)
  const potentialProfit = profitDifference * positionSize * input.leverage;

  // Trading fees (entry and exit)
  const entryFee = (input.entryPrice * positionSize * input.leverage) * (input.tradingFee / 100);
  const exitFee = (input.takeProfit * positionSize * input.leverage) * (input.tradingFee / 100);
  const totalFees = entryFee + exitFee;

  // Risk/Reward ratio
  const rrRatio = potentialProfit > 0 ? potentialProfit / maxLoss : 0;

  return {
    ...input,
    id: Date.now().toString(),
    positionSize,
    maxLoss,
    potentialProfit: potentialProfit - totalFees,
    rrRatio,
    totalFees,
    createdAt: new Date().toISOString(),
  };
}
