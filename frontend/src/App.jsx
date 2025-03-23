import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Settings from './pages/Settings';
import ExamManager from './pages/ExamManager';
import Chat from './pages/Chat';
import Doubts from './pages/Doubts';
import StudyMaterial from './pages/StudyMaterial';
import MentorBooking from './pages/MentorBooking';
import Calendar from './pages/Calendar';
import Goals from './pages/Goals';
import ThreeBackground from './pages/ThreeBackground';
import Profile from './pages/Profile';
import { useStore } from './lib/store';

function App() {
  const { darkMode, setDarkMode } = useStore();

  useEffect(() => {
    // Set dark mode as default
    setDarkMode(true);
  }, [setDarkMode]);

  return (
    <Router>
      <div className={`h-full flex flex-col overflow-hidden ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <ThreeBackground />
        <div className="flex-1 relative z-10 flex flex-col h-full">
          <Navbar />
          <div className="flex flex-1 h-full">
            <Sidebar />
            <main className="flex-1 p-4 md:p-6 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/exam-manager" element={<ExamManager />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/doubts" element={<Doubts />} />
                <Route path="/study-material" element={<StudyMaterial />} />
                <Route path="/mentor-booking" element={<MentorBooking />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;