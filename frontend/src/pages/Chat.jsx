import React, { useState } from 'react';
import { Send, Search, User } from 'lucide-react';
import { Button } from '../components/ui/button';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [activeChat, setActiveChat] = useState('1');

  const contacts = [
    { id: '1', name: 'Sarah Wilson', status: 'online', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { id: '2', name: 'Michael Chen', status: 'offline', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
    { id: '3', name: 'Emma Thompson', status: 'online', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  ];

  const messages = [
    { id: 1, sender: '1', text: "Hey, how's your study going?", time: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Pretty good! Working on calculus right now.', time: '10:31 AM' },
    { id: 3, sender: '1', text: 'Need any help with that?', time: '10:32 AM' },
    { id: 4, sender: 'me', text: 'Actually, yes! Could you explain derivatives?', time: '10:33 AM' },
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Here you would typically send the message to the backend
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 flex bg-transparent pl-60"> {/* Shifted to the right with pl-16 */}
      {/* Contacts Sidebar */}
      <div className="w-64 bg-transparent backdrop-blur-sm"> {/* Transparent background */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-white border-gray-600 backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setActiveChat(contact.id)}
              className={`w-full p-4 flex items-center space-x-4 hover:bg-gray-700/50 ${
                activeChat === contact.id ? 'bg-gray-700/50' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
                    contact.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                  }`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">{contact.name}</p>
                <p className="text-sm text-gray-400">{contact.status}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chatbox */}
      <div className="flex-1 flex flex-col bg-transparent backdrop-blur-sm"> {/* Transparent background */}
        {/* Chat Header */}
        <div className="bg-transparent p-4 flex items-center space-x-4 backdrop-blur-sm">
          <img
            src={contacts.find(c => c.id === activeChat)?.avatar}
            alt="Contact"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="font-medium text-white">{contacts.find(c => c.id === activeChat)?.name}</h2>
            <p className="text-sm text-gray-400">
              {contacts.find(c => c.id === activeChat)?.status}
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                  msg.sender === 'me'
                    ? 'bg-primary/50 text-white' // Semi-transparent primary color
                    : 'bg-gray-700/50 text-white' // Semi-transparent gray color
                }`}
              >
                <p>{msg.text}</p>
                <p className={`text-xs mt-1 ${
                  msg.sender === 'me' ? 'text-white/80' : 'text-gray-400'
                }`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-transparent p-4 backdrop-blur-sm">
          <div className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-white border-gray-500 backdrop-blur-sm"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <Button onClick={handleSend} className="bg-primary/50 hover:bg-primary/70"> {/* Semi-transparent button */}
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;