import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

const Doubts = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];

  const doubts = [
    {
      id: 1,
      subject: 'Mathematics',
      question: 'How do I solve quadratic equations?',
      askedBy: 'John Doe',
      timestamp: '2 hours ago',
      upvotes: 5,
      downvotes: 1,
      resolved: false,
      replies: [
        {
          id: 1,
          author: 'Dr. Smith',
          text: 'You can solve quadratic equations using the formula: ax² + bx + c = 0',
          timestamp: '1 hour ago',
          isMentor: true,
        },
      ],
    },
    {
      id: 2,
      subject: 'Physics',
      question: "Can someone explain Newton's third law?",
      askedBy: 'Jane Smith',
      timestamp: '3 hours ago',
      upvotes: 3,
      downvotes: 0,
      resolved: true,
      replies: [],
    },
  ];

  return (
    <div className="flex min-h-screen bg-transparent text-white">
      {/* Transparent Sidebar Space */}
      <div className="w-64"></div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Doubts Heading */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Doubts</h1> {/* Added Doubts heading */}
          <Button className="bg-purple-600 hover:bg-purple-700">Ask a Question</Button>
        </div>

        {/* Subject Filters */}
        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={selectedSubject === subject.toLowerCase() ? 'default' : 'outline'}
              onClick={() => setSelectedSubject(subject.toLowerCase())}
              className={`whitespace-nowrap ${
                selectedSubject === subject.toLowerCase()
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              {subject}
            </Button>
          ))}
        </div>

        {/* Doubts List */}
        <div className="space-y-6">
          {doubts.map((doubt) => (
            <div key={doubt.id} className="bg-gray-800/50 rounded-lg shadow-md p-6 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-purple-600/10 text-purple-400 rounded-full text-sm mb-2">
                    {doubt.subject}
                  </span>
                  <h3 className="text-lg font-semibold">{doubt.question}</h3>
                  <p className="text-sm text-gray-400">
                    Asked by {doubt.askedBy} • {doubt.timestamp}
                  </p>
                </div>
                {doubt.resolved && (
                  <span className="flex items-center text-green-500">
                    <CheckCircle className="w-5 h-5 mr-1" />
                    Resolved
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4 mb-4">
                <button className="flex items-center text-gray-400 hover:text-purple-400">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {doubt.upvotes}
                </button>
                <button className="flex items-center text-gray-400 hover:text-purple-400">
                  <ThumbsDown className="w-4 h-4 mr-1" />
                  {doubt.downvotes}
                </button>
                <button className="flex items-center text-gray-400 hover:text-purple-400">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {doubt.replies.length} replies
                </button>
              </div>

              {/* Replies */}
              {doubt.replies.length > 0 && (
                <div className="border-t border-gray-700/50 pt-4 mt-4 space-y-4">
                  {doubt.replies.map((reply) => (
                    <div key={reply.id} className="flex space-x-4">
                      <div className="flex-1 bg-gray-700/50 rounded-lg p-4 backdrop-blur-sm">
                        <div className="flex items-center mb-2">
                          <span className="font-medium">{reply.author}</span>
                          {reply.isMentor && (
                            <span className="ml-2 px-2 py-1 bg-purple-600/10 text-purple-400 rounded-full text-xs">
                              Mentor
                            </span>
                          )}
                          <span className="ml-2 text-sm text-gray-400">
                            {reply.timestamp}
                          </span>
                        </div>
                        <p className="text-gray-200">{reply.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doubts;