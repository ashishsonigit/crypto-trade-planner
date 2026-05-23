import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TradeResult } from '../utils/tradeCalculator';

interface TradesState {
  trades: TradeResult[];
}

const initialState: TradesState = {
  trades: [],
};

const tradesSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {
    addTrade: (state, action: PayloadAction<TradeResult>) => {
      state.trades.push(action.payload);
    },
    deleteTrade: (state, action: PayloadAction<string>) => {
      state.trades = state.trades.filter(trade => trade.id !== action.payload);
    },
    clearTrades: (state) => {
      state.trades = [];
    },
  },
});

export const { addTrade, deleteTrade, clearTrades } = tradesSlice.actions;
export default tradesSlice.reducer;
