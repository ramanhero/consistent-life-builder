
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { BarChart, Calendar, LogOut, Settings, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: BarChart,
  },
  {
    title: 'Today',
    url: '/today',
    icon: Calendar,
  },
  {
    title: 'Habits',
    url: '/habits',
    icon: ClipboardList,
  },
  {
    title: 'Insights',
    url: '/insights',
    icon: BarChart,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-background border-r border-border z-10 transition-all duration-300 ease-in-out ${
        isHovered ? 'w-64' : 'w-16'
      } shadow-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 p-2">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
                  location.pathname === item.url 
                    ? 'bg-accent text-accent-foreground font-medium' 
                    : 'text-muted-foreground'
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className={`transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                } ${isHovered ? 'block' : 'hidden'}`}>
                  {item.title}
                </span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="p-2 border-t border-border">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className={`w-full justify-start gap-3 px-3 py-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground`}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span className={`transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            } ${isHovered ? 'block' : 'hidden'}`}>
              Logout
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
