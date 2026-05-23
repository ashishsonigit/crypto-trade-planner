import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TradeForm from './pages/TradeForm';
import TradeHistory from './pages/TradeHistory';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-900">
        <Navigation />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/new-trade" element={<TradeForm />} />
            <Route path="/history" element={<TradeHistory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
