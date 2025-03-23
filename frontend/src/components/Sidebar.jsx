import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  HelpCircle, 
  FileText, 
  Users,
  Target,
  Settings,
  Menu
} from 'lucide-react';
import { useStore } from '../lib/store';
import { cn } from '../lib/utils';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: BookOpen, label: 'Exam Manager', path: '/exam-manager' },
  { icon: MessageSquare, label: 'Chat', path: '/chat' },
  { icon: HelpCircle, label: 'Doubts', path: '/doubts' },
  { icon: FileText, label: 'Study Material', path: '/study-material' },
  { icon: Users, label: 'Mentor Booking', path: '/mentor-booking' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: Target, label: 'Goals', path: '/goals' },
];

const Sidebar = () => {
  const location = useLocation();
  const { darkMode } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sidebarClasses = cn(
    'fixed left-0 h-[calc(100vh-4rem)] mt-16 transition-all duration-300 z-50',
    isOpen ? 'w-60' : 'w-0' // Removed background and border
  );

  return (
    <>
      <div
        className="fixed left-0 top-1/2 -translate-y-1/2 w-2 h-32 cursor-pointer z-40"
        onMouseEnter={() => setIsOpen(true)}
      />
      <div
        ref={sidebarRef}
        className={sidebarClasses}
        onMouseEnter={() => setIsOpen(true)}
      >
        {/* Hamburger Menu */}
        <button
          className="fixed top-[4.5rem] left-4 z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
        </button>

        {/* Menu Icons */}
        <div className="p-4 mt-0"> {/* Reduced mt-12 to mt-8 to shift icons up */}
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center space-x-3 pl-0.5 py-2 rounded-lg transition-colors', // Reduced pl-4 to pl-3 to shift icons left
                  location.pathname === item.path
                    ? 'bg-primary text-white'
                    : darkMode
                    ? 'text-white hover:bg-gray-800'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0 ml-0" /> {/* Reduced ml-2 to ml-1 to shift icons left */}
                {isOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="w-16 flex-shrink-0" />
    </>
  );
};

export default Sidebar;