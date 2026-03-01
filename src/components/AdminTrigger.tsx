import { useState } from 'react';
import { Settings } from 'lucide-react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export const AdminTrigger = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogin(false);
  };

  if (isLoggedIn) {
    return (
      <AdminDashboard onClose={handleLogout} />
    );
  }

  if (showLogin) {
    return (
      <AdminLogin
        onLogin={() => setIsLoggedIn(true)}
        onCancel={() => setShowLogin(false)}
      />
    );
  }

  return (
    <button
      onClick={() => setShowLogin(true)}
      className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      aria-label="Admin Dashboard"
      title="Admin Dashboard"
    >
      <Settings size={24} />
      <span className="absolute -top-10 right-0 bg-foreground text-white px-3 py-1 rounded-md text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Admin
      </span>
    </button>
  );
};

export default AdminTrigger;
