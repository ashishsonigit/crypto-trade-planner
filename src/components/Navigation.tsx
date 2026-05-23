import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-64 bg-gray-800 text-white p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">💹 Trade Planner</h1>
        <p className="text-sm text-gray-400">Crypto Trading Assistant</p>
      </div>

      <ul className="space-y-2">
        <li>
          <Link
            to="/"
            className={`block px-4 py-2 rounded transition ${
              isActive('/') 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/new-trade"
            className={`block px-4 py-2 rounded transition ${
              isActive('/new-trade') 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            ➕ New Trade
          </Link>
        </li>
        <li>
          <Link
            to="/history"
            className={`block px-4 py-2 rounded transition ${
              isActive('/history') 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            📈 History
          </Link>
        </li>
      </ul>

      <div className="mt-8 pt-8 border-t border-gray-700">
        <p className="text-xs text-gray-400">v1.0.0</p>
      </div>
    </nav>
  );
};

export default Navigation;
