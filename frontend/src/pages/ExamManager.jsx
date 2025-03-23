import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Timer, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useStore } from '../lib/store';

const ExamManager = () => {
  const { darkMode } = useStore();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [focusMode, setFocusMode] = useState(false);
  const [timer, setTimer] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [distractingApps, setDistractingApps] = useState([
    { id: 1, name: 'Instagram', blocked: false },
    { id: 2, name: 'Facebook', blocked: false },
    { id: 3, name: 'Twitter', blocked: false },
  ]);
  const [newApp, setNewApp] = useState('');

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addApp = () => {
    if (newApp.trim()) {
      setDistractingApps([
        ...distractingApps,
        { id: Date.now(), name: newApp, blocked: false },
      ]);
      setNewApp('');
    }
  };

  const removeApp = (id) => {
    setDistractingApps(distractingApps.filter((app) => app.id !== id));
  };

  const toggleAppBlock = (id) => {
    setDistractingApps(
      distractingApps.map((app) =>
        app.id === id ? { ...app, blocked: !app.blocked } : app
      )
    );
  };

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
    if (!focusMode) {
      // Block all apps when focus mode is enabled
      setDistractingApps(distractingApps.map((app) => ({ ...app, blocked: true })));
    } else {
      // Unblock all apps when focus mode is disabled
      setDistractingApps(distractingApps.map((app) => ({ ...app, blocked: false })));
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 pl-[144px]">
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : ''}`}>Exam Manager</h1>
        <div className="flex space-x-4">
          <Button
            variant={activeTab === 'upcoming' ? 'primary' : 'default'} // Changed to primary
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Exams
          </Button>
          <Button
            variant={activeTab === 'focus' ? 'primary' : 'default'} // Changed to primary
            onClick={() => setActiveTab('focus')}
          >
            Focus Mode
          </Button>
        </div>
      </div>

      {activeTab === 'focus' && (
        <div className="max-w-2xl mx-auto">
          <div className={`rounded-lg shadow-lg p-8 ${
            darkMode ? 'bg-gray-900 shadow-glow' : 'bg-white'
          }`}>
            <div className="text-center mb-8">
              <div className={`text-6xl font-bold mb-4 ${darkMode ? 'text-white' : ''}`}>
                {formatTime(timer)}
              </div>
              <div className="flex justify-center space-x-4">
                <Button onClick={() => setIsTimerRunning(!isTimerRunning)}>
                  {isTimerRunning ? 'Pause' : 'Start'} Timer
                </Button>
                <Button variant="primary" onClick={() => setTimer(25 * 60)}> {/* Changed to primary */}
                  Reset
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className={`font-medium ${darkMode ? 'text-white' : ''}`}>Focus Mode</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Block distracting applications
                    </p>
                  </div>
                  <Button
                    variant="primary" // Changed to primary
                    onClick={toggleFocusMode}
                  >
                    {focusMode ? 'Disable' : 'Enable'}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newApp}
                      onChange={(e) => setNewApp(e.target.value)}
                      placeholder="Add distracting app"
                      className={`flex-1 p-2 rounded border ${
                        darkMode ? 'bg-gray-700 text-white border-gray-600' : ''
                      }`}
                    />
                    <Button onClick={addApp}>Add</Button>
                  </div>

                  <div className="space-y-2">
                    {distractingApps.map((app) => (
                      <div
                        key={app.id}
                        className={`flex items-center justify-between p-2 rounded ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}
                      >
                        <span className={darkMode ? 'text-white' : ''}>
                          {app.name}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant={app.blocked ? 'primary' : 'default'} // Changed to primary
                            size="sm"
                            onClick={() => toggleAppBlock(app.id)}
                          >
                            {app.blocked ? 'Blocked' : 'Block'}
                          </Button>
                          <button
                            onClick={() => removeApp(app.id)}
                            className="p-1 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'upcoming' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Your existing upcoming exams content */}
        </div>
      )}
    </div>
  );
};

export default ExamManager;