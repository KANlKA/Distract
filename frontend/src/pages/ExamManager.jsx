import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, Timer } from 'lucide-react';
import { Button } from '../components/ui/button';

const ExamManager = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [focusMode, setFocusMode] = useState(false);
  const [timer, setTimer] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Exam Manager</h1>
        <div className="flex space-x-4">
          <Button
            variant={activeTab === 'upcoming' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Exams
          </Button>
          <Button
            variant={activeTab === 'focus' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('focus')}
          >
            Focus Mode
          </Button>
          <Button
            variant={activeTab === 'history' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('history')}
          >
            History
          </Button>
        </div>
      </div>

      {activeTab === 'upcoming' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              subject: 'Mathematics',
              date: '2024-03-20',
              time: '10:00 AM',
              duration: '3 hours',
              topics: ['Calculus', 'Linear Algebra', 'Probability'],
            },
            {
              subject: 'Physics',
              date: '2024-03-22',
              time: '2:00 PM',
              duration: '2 hours',
              topics: ['Mechanics', 'Thermodynamics'],
            },
            {
              subject: 'Chemistry',
              date: '2024-03-25',
              time: '11:00 AM',
              duration: '2.5 hours',
              topics: ['Organic Chemistry', 'Chemical Bonding'],
            },
          ].map((exam, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">{exam.subject}</h3>
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{exam.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{exam.time} ({exam.duration})</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-500">Topics:</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {exam.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'focus' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold mb-4">{formatTime(timer)}</div>
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  variant="primary"
                >
                  {isTimerRunning ? 'Pause' : 'Start'} Timer
                </Button>
                <Button
                  onClick={() => setTimer(25 * 60)}
                  variant="outline"
                >
                  Reset
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <Timer className="w-6 h-6 text-primary mr-3" />
                  <div>
                    <p className="font-medium">Focus Mode</p>
                    <p className="text-sm text-gray-600">Block distracting applications</p>
                  </div>
                </div>
                <Button
                  variant={focusMode ? 'primary' : 'outline'}
                  onClick={() => setFocusMode(!focusMode)}
                >
                  {focusMode ? 'Disable' : 'Enable'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Past Exams</h2>
            <div className="space-y-4">
              {[
                { subject: 'Biology', date: '2024-02-15', score: '85/100', grade: 'A' },
                { subject: 'History', date: '2024-02-10', score: '92/100', grade: 'A+' },
                { subject: 'English', date: '2024-02-05', score: '78/100', grade: 'B+' },
              ].map((exam, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <h3 className="font-medium">{exam.subject}</h3>
                    <p className="text-sm text-gray-600">{exam.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{exam.score}</p>
                    <p className="text-sm text-primary">{exam.grade}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamManager;
