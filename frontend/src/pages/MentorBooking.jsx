import React, { useState } from 'react';
import { Calendar, Clock, Star, Video } from 'lucide-react';
import { Button } from '../components/ui/button';

const MentorBooking = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');

  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Wilson',
      subjects: ['Mathematics', 'Physics'],
      rating: 4.8,
      reviews: 124,
      price: 25,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      availability: ['Mon', 'Wed', 'Fri'],
      nextAvailable: '2:00 PM Today',
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      subjects: ['Chemistry', 'Biology'],
      rating: 4.9,
      reviews: 98,
      price: 30,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop',
      availability: ['Tue', 'Thu', 'Sat'],
      nextAvailable: 'Tomorrow 10:00 AM',
    },
  ];

  const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];

  return (
    <div className="flex min-h-screen bg-transparent">
      {/* Sidebar */}
      <div className="w-64"></div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto py-8 px-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Book a Mentor</h1>
            <p className="text-gray-400">Find and schedule sessions with expert mentors</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">My Bookings</Button>
        </div>

        {/* Subject Filters */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={selectedSubject === subject.toLowerCase() ? 'default' : 'outline'}
              onClick={() => setSelectedSubject(subject.toLowerCase())}
              className={`whitespace-nowrap ${
                selectedSubject === subject.toLowerCase()
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-gray-800/50 hover:bg-purple-600/20 text-purple-400 backdrop-blur-sm'
              }`}
            >
              {subject}
            </Button>
          ))}
        </div>

        {/* Mentor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-md overflow-hidden hover:bg-gray-700/50 transition-colors duration-300"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-white">{mentor.name}</h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{mentor.rating}</span>
                      <span className="mx-1">•</span>
                      <span>{mentor.reviews} reviews</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {mentor.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-3 py-1 bg-purple-600/10 text-purple-400 rounded-full text-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Next available: {mentor.nextAvailable}</span>
                  </div>

                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Available on: {mentor.availability.join(', ')}</span>
                  </div>

                  <div className="flex items-center text-gray-400">
                    <Video className="w-4 h-4 mr-2" />
                    <span>Online Session</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div>
                    <span className="text-2xl font-bold text-white">${mentor.price}</span>
                    <span className="text-gray-400">/hour</span>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">Book Session</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorBooking;