# Crypto Trade Planner

A desktop application to plan and analyze cryptocurrency trades with detailed risk management calculations.

## Features

- 📊 **Trade Planning**: Input trade details (crypto, entry price, stop loss, leverage, trading fee, exchange)
- 💰 **Risk/Reward Calculations**: Automatic calculation of potential profit/loss and risk ratios
- 📈 **Position Sizing**: Recommended position size based on risk tolerance
- 📝 **Trade History**: Track and review all planned trades
- 💾 **Data Export**: Export trades to CSV and PDF formats
- 🔗 **Exchange Integration**: Support for multiple crypto exchanges

## Tech Stack

- **Desktop Framework**: Electron
- **UI Framework**: React
- **Styling**: Tailwind CSS
- **State Management**: Redux
- **Database**: SQLite (local storage)
- **Export**: PDF (pdfkit), CSV (csv-writer)

## Installation

```bash
npm install
npm start
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── main/          # Electron main process
├── components/    # React components
├── pages/         # Application pages
├── store/         # Redux store
├── utils/         # Utility functions
└── styles/        # Tailwind CSS styles
```

## License

MIT
