
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { ClipboardList, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="py-4 border-b">
      <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <ClipboardList className="h-7 w-7 text-primary" />
          <span className="text-2xl font-bold text-primary">
            Daily<span className="text-foreground">Habit</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link to="/habits" className="text-foreground hover:text-primary transition-colors">
                Habits
              </Link>
              <Link to="/insights" className="text-foreground hover:text-primary transition-colors">
                Insights
              </Link>
              <Link to="/settings" className="text-foreground hover:text-primary transition-colors">
                Settings
              </Link>
              <Button 
                variant="outline" 
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Log Out
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-foreground hover:text-primary transition-colors">
                Log In
              </Link>
              <Button onClick={() => navigate('/signup')}>Get Started</Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" className="text-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
