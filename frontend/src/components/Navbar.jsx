import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Settings, User, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useStore } from '../lib/store';

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useStore();

  return (
    <nav className={`${
      darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
    } border-b sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className={`text-2xl font-bold ${
              darkMode ? 'text-white' : 'text-primary'
            }`}>
              Distract
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className={darkMode ? 'text-white' : ''}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={darkMode ? 'text-white' : ''}
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Link to="/settings">
              <Button
                variant="ghost"
                size="sm"
                className={darkMode ? 'text-white' : ''}
              >
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/profile">
              <Button
                variant="ghost"
                size="sm"
                className={darkMode ? 'text-white' : ''}
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;