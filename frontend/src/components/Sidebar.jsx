import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  HelpCircle, 
  FileText, 
  Users,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
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

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <div className="space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
              location.pathname === item.path
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;