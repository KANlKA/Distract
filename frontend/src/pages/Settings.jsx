import React, { useState } from 'react';
import { 
  Bell, 
  Moon, 
  Sun, 
  Lock, 
  User, 
  Mail, 
  Globe, 
  AlertTriangle,
  LogOut,
  Trash2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { useStore } from '../lib/store';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useStore();
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    language: 'English',
    notifications: {
      examReminders: true,
      mentorSessions: true,
      studyMaterial: false,
      doubtReplies: true
    },
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleNotificationToggle = (key) => {
    setProfileData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Settings
      </h1>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-900 shadow-glow' : 'bg-white shadow-lg'}`}>
          <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : ''}`}>
            <User className="w-5 h-5 mr-2" />
            Profile Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Name
              </label>
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="w-full p-2 rounded border bg-transparent text-inherit"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                className="w-full p-2 rounded border bg-transparent text-inherit"
              />
            </div>
          </div>
        </div>

        {/* Password Settings */}
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-900 shadow-glow' : 'bg-white shadow-lg'}`}>
          <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : ''}`}>
            <Lock className="w-5 h-5 mr-2" />
            Password Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Current Password
              </label>
              <input
                type="password"
                value={profileData.currentPassword}
                onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                className="w-full p-2 rounded border bg-transparent text-inherit"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                New Password
              </label>
              <input
                type="password"
                value={profileData.newPassword}
                onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                className="w-full p-2 rounded border bg-transparent text-inherit"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Confirm New Password
              </label>
              <input
                type="password"
                value={profileData.confirmPassword}
                onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                className="w-full p-2 rounded border bg-transparent text-inherit"
              />
            </div>
            <Button>Update Password</Button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-900 shadow-glow' : 'bg-white shadow-lg'}`}>
          <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : ''}`}>
            <Bell className="w-5 h-5 mr-2" />
            Notification Settings
          </h2>
          <div className="space-y-4">
            {Object.entries(profileData.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <Button
                  variant={value ? 'primary' : 'outline'}
                  onClick={() => handleNotificationToggle(key)}
                >
                  {value ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance Settings */}
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-900 shadow-glow' : 'bg-white shadow-lg'}`}>
          <h2 className={`text-xl font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : ''}`}>
            <Sun className="w-5 h-5 mr-2" />
            Appearance
          </h2>
          <div className="flex items-center justify-between">
            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Theme</span>
            <Button onClick={toggleDarkMode} variant="outline">
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="ml-2">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className={`p-6 rounded-lg border border-red-600 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <h2 className={`text-xl font-semibold mb-4 flex items-center text-red-600`}>
            <AlertTriangle className="w-5 h-5 mr-2" />
            Danger Zone
          </h2>
          <div className="space-y-4">
            <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
            <Button variant="outline" className="w-full">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;