import React, { useState } from 'react';
import { FileText, Video, Download, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';

const StudyMaterial = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
  const types = ['All', 'Notes', 'Videos', 'Practice Papers'];

  const materials = [
    {
      id: 1,
      title: 'Calculus Fundamentals',
      subject: 'Mathematics',
      type: 'Notes',
      author: 'Dr. Smith',
      date: '2024-03-15',
      downloads: 234,
      fileSize: '2.5 MB',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'Quantum Mechanics Lecture',
      subject: 'Physics',
      type: 'Video',
      author: 'Prof. Johnson',
      date: '2024-03-14',
      duration: '45 mins',
      views: 567,
      thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=300&h=200&fit=crop',
    },
  ];

  return (
    <div className="flex min-h-screen bg-transparent">
      {/* Sidebar Space */}
      <div className="w-24"></div>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto py-8 px-4 pl-[170px]">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Study Material</h1>
            <p className="text-gray-400">Access comprehensive study resources</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">Upload Material</Button>
        </div>

        <div className="mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search study materials..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-gray-800/50 text-white border-gray-700 backdrop-blur-sm"
              />
            </div>
            <Button variant="outline" className="bg-purple-600/10 text-purple-400 hover:bg-purple-600/20 hover:text-purple-500">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex space-x-4 mb-4 overflow-x-auto pb-2">
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

          <div className="flex space-x-4 overflow-x-auto pb-2">
            {types.map((type) => (
              <Button
                key={type}
                variant={selectedType === type.toLowerCase() ? 'default' : 'outline'}
                onClick={() => setSelectedType(type.toLowerCase())}
                className={`whitespace-nowrap ${
                  selectedType === type.toLowerCase()
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'bg-gray-800/50 hover:bg-purple-600/20 text-purple-400 backdrop-blur-sm'
                }`}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map((material) => (
            <div
              key={material.id}
              className="bg-gray-800/50 rounded-lg shadow-md overflow-hidden backdrop-blur-sm hover:bg-purple-600/10 transition-all duration-300"
            >
              <img
                src={material.thumbnail}
                alt={material.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-white">{material.title}</h3>
                    <p className="text-sm text-gray-400">By {material.author}</p>
                  </div>
                  {material.type === 'Notes' ? (
                    <FileText className="w-6 h-6 text-purple-400" />
                  ) : (
                    <Video className="w-6 h-6 text-purple-400" />
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <span className="px-2 py-1 bg-purple-600/10 text-purple-400 rounded-full">
                      {material.subject}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{material.type}</span>
                  </div>

                  <p className="text-sm text-gray-400">
                    {material.type === 'Notes' ? (
                      <>
                        <Download className="w-4 h-4 inline mr-1" />
                        {material.downloads} downloads • {material.fileSize}
                      </>
                    ) : (
                      <>Duration: {material.duration} • {material.views} views</>
                    )}
                  </p>
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  {material.type === 'Notes' ? 'Download' : 'Watch Now'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterial;