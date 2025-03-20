import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import ExamManager from './pages/ExamManager';
import Chat from './pages/Chat';
import Doubts from './pages/Doubts';
import StudyMaterial from './pages/StudyMaterial';
import MentorBooking from './pages/MentorBooking';
import Calendar from './pages/Calendar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/exam-manager" element={<ExamManager />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/doubts" element={<Doubts />} />
              <Route path="/study-material" element={<StudyMaterial />} />
              <Route path="/mentor-booking" element={<MentorBooking />} />
              <Route path="/calendar" element={<Calendar />} />
            </Routes>
          </main>
        </div>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;