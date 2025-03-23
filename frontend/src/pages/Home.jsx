import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useStore } from '../lib/store';

const Home = () => {
  const navigate = useNavigate();
  const { darkMode } = useStore();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className={`text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Distract
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Your all-in-one education platform designed to enhance focus, manage studies, 
          and connect with mentors. Block distractions, set goals, and achieve academic excellence.
        </p>
        <div className="space-x-4">
          <Button
            size="lg"
            onClick={() => navigate('/dashboard')}
            className="bg-primary hover:bg-primary/90 text-white px-8"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            onClick={() => navigate('/auth')}
            className="bg-primary hover:bg-primary/90 text-white px-8"
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;