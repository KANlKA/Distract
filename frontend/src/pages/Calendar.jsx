import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = [
    {
      id: 1,
      title: 'Mathematics Exam',
      date: '2024-03-20',
      time: '10:00 AM',
      duration: '3 hours',
      type: 'exam',
    },
    {
      id: 2,
      title: 'Physics Tutorial',
      date: '2024-03-22',
      time: '2:00 PM',
      duration: '1 hour',
      type: 'tutorial',
    },
    {
      id: 3,
      title: 'Study Group Session',
      date: '2024-03-25',
      time: '4:00 PM',
      duration: '2 hours',
      type: 'group',
    },
  ];

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 pl-[152px] bg-transparent">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Calendar</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">Add Event</Button>
      </div>

      {/* Calendar Container */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-md p-6">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={previousMonth}
            className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h2 className="text-xl font-semibold text-white">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-700/50 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Days of the Week */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {days.map((day) => (
            <div key={day} className="text-center font-medium text-gray-400">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="h-24 p-2" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dateStr = `${currentDate.getFullYear()}-${String(
              currentDate.getMonth() + 1
            ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = events.filter((event) => event.date === dateStr);

            return (
              <div
                key={day}
                className={`h-24 p-2 border border-gray-700 rounded-lg ${
                  dayEvents.length > 0 ? 'bg-purple-600/10' : 'bg-gray-800/50'
                } hover:bg-gray-700/50 transition-colors`}
              >
                <div className="font-medium mb-1 text-white">{day}</div>
                <div className="space-y-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-xs p-1 rounded bg-purple-600/20 text-purple-400 truncate"
                    >
                      <div className="font-medium text-white">{event.title}</div>
                      <div className="flex items-center text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {event.time}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Upcoming Events</h2>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-sm p-4 flex justify-between items-center hover:bg-gray-700/50 transition-colors"
            >
              <div>
                <h3 className="font-medium text-white">{event.title}</h3>
                <p className="text-sm text-gray-400">
                  {event.date} at {event.time} ({event.duration})
                </p>
              </div>
              <Button variant="outline" size="sm" className="bg-purple-600/10 text-purple-400 hover:bg-purple-600/20">
                View Details
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;