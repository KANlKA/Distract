import React from 'react';
import { Clock, Brain, Calendar as CalendarIcon, Trophy } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = [
  { name: 'Mon', hours: 4 },
  { name: 'Tue', hours: 3 },
  { name: 'Wed', hours: 5 },
  { name: 'Thu', hours: 2 },
  { name: 'Fri', hours: 6 },
  { name: 'Sat', hours: 4 },
  { name: 'Sun', hours: 3 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 pl-44 pb-8"> {/* Removed bg-gray-900 for transparent background */}
      <h1 className="text-2xl font-bold text-white">Dashboard</h1> {/* White text for visibility */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-transparent p-6 rounded-lg shadow-sm border border-gray-700"> {/* Transparent background */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Study Hours</p>
              <p className="text-2xl font-bold text-white">27h</p>
            </div>
            <Clock className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="bg-transparent p-6 rounded-lg shadow-sm border border-gray-700"> {/* Transparent background */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Focus Sessions</p>
              <p className="text-2xl font-bold text-white">12</p>
            </div>
            <Brain className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="bg-transparent p-6 rounded-lg shadow-sm border border-gray-700"> {/* Transparent background */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Upcoming Exams</p>
              <p className="text-2xl font-bold text-white">3</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="bg-transparent p-6 rounded-lg shadow-sm border border-gray-700"> {/* Transparent background */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Points Earned</p>
              <p className="text-2xl font-bold text-white">850</p>
            </div>
            <Trophy className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>

      <div className="bg-transparent p-6 rounded-lg shadow-sm border border-gray-700"> {/* Transparent background */}
        <h2 className="text-lg font-semibold mb-4 text-white">Study Hours This Week</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" /> {/* Dark mode grid lines */}
              <XAxis dataKey="name" stroke="#CBD5E0" /> {/* Dark mode axis text */}
              <YAxis stroke="#CBD5E0" /> {/* Dark mode axis text */}
              <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: 'none' }} /> {/* Dark mode tooltip */}
              <Bar dataKey="hours" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-transparent p-6 rounded-lg shadow-sm border border-gray-700"> {/* Transparent background */}
          <h2 className="text-lg font-semibold mb-4 text-white">Upcoming Exams</h2>
          <div className="space-y-4">
            {[
              { subject: 'Mathematics', date: '2024-03-20', time: '10:00 AM' },
              { subject: 'Physics', date: '2024-03-22', time: '2:00 PM' },
              { subject: 'Chemistry', date: '2024-03-25', time: '11:00 AM' },
            ].map((exam, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"> {/* Dark mode inner box */}
                <div>
                  <p className="font-medium text-white">{exam.subject}</p>
                  <p className="text-sm text-gray-400">{exam.date} at {exam.time}</p>
                </div>
                <CalendarIcon className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-transparent p-6 rounded-lg shadow-sm border border-gray-700"> {/* Transparent background */}
          <h2 className="text-lg font-semibold mb-4 text-white">Recent Activities</h2>
          <div className="space-y-4">
            {[
              { action: 'Completed Physics Assignment', time: '2 hours ago' },
              { action: 'Attended Math Tutorial', time: '5 hours ago' },
              { action: 'Solved Practice Problems', time: 'Yesterday' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"> {/* Dark mode inner box */}
                <div>
                  <p className="font-medium text-white">{activity.action}</p>
                  <p className="text-sm text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;