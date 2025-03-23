import React, { useState } from 'react';
import { Plus, Target, Clock, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useStore } from '../lib/store';

const Goals = () => {
  const { darkMode } = useStore();
  const [goals, setGoals] = useState({
    shortTerm: [
      { id: 1, title: 'Complete Calculus Chapter', deadline: '2024-03-20', completed: false },
      { id: 2, title: 'Submit Physics Assignment', deadline: '2024-03-22', completed: true },
    ],
    longTerm: [
      { id: 1, title: 'Graduate with Honors', deadline: '2024-12-15', completed: false },
      { id: 2, title: 'Master Machine Learning', deadline: '2024-06-30', completed: false },
    ],
  });

  const [newGoal, setNewGoal] = useState({ title: '', deadline: '', type: 'shortTerm' });
  const [isAdding, setIsAdding] = useState(false);

  const addGoal = () => {
    if (newGoal.title && newGoal.deadline) {
      setGoals(prev => ({
        ...prev,
        [newGoal.type]: [
          ...prev[newGoal.type],
          { id: Date.now(), title: newGoal.title, deadline: newGoal.deadline, completed: false },
        ],
      }));
      setNewGoal({ title: '', deadline: '', type: 'shortTerm' });
      setIsAdding(false);
    }
  };

  const toggleGoal = (type, id) => {
    setGoals(prev => ({
      ...prev,
      [type]: prev[type].map(goal =>
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      ),
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 pl-[170px]"> {/* Added pl-[170px] to shift content to the right */}
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Goals
        </h1>
        <Button onClick={() => setIsAdding(true)}>
          <Plus className="w-5 h-5 mr-2" />
          Add Goal
        </Button>
      </div>

      {isAdding && (
        <div className={`mb-8 p-6 rounded-lg ${
          darkMode ? 'bg-gray-800 shadow-glow' : 'bg-white shadow-lg'
        }`}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Goal title"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              className="w-full p-2 rounded border"
            />
            <input
              type="date"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
              className="w-full p-2 rounded border"
            />
            <select
              value={newGoal.type}
              onChange={(e) => setNewGoal({ ...newGoal, type: e.target.value })}
              className="w-full p-2 rounded border"
            >
              <option value="shortTerm">Short Term</option>
              <option value="longTerm">Long Term</option>
            </select>
            <div className="flex space-x-2">
              <Button onClick={addGoal}>Add Goal</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-8">
        <div>
          <h2 className={`text-xl font-semibold mb-4 flex items-center ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <Clock className="w-5 h-5 mr-2" />
            Short Term Goals
          </h2>
          <div className="space-y-4">
            {goals.shortTerm.map((goal) => (
              <div
                key={goal.id}
                className={`p-4 rounded-lg ${
                  darkMode
                    ? 'bg-gray-800 shadow-glow'
                    : 'bg-white shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`flex items-center ${darkMode ? 'text-white' : ''}`}>
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => toggleGoal('shortTerm', goal.id)}
                      className="mr-3 h-5 w-5"
                    />
                    <span className={goal.completed ? 'line-through opacity-50' : ''}>
                      {goal.title}
                    </span>
                  </div>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {goal.deadline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className={`text-xl font-semibold mb-4 flex items-center ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <Target className="w-5 h-5 mr-2" />
            Long Term Goals
          </h2>
          <div className="space-y-4">
            {goals.longTerm.map((goal) => (
              <div
                key={goal.id}
                className={`p-4 rounded-lg ${
                  darkMode
                    ? 'bg-gray-800 shadow-glow'
                    : 'bg-white shadow-lg'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`flex items-center ${darkMode ? 'text-white' : ''}`}>
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() => toggleGoal('longTerm', goal.id)}
                      className="mr-3 h-5 w-5"
                    />
                    <span className={goal.completed ? 'line-through opacity-50' : ''}>
                      {goal.title}
                    </span>
                  </div>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {goal.deadline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;