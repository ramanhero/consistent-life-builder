
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    // Only show footer on the dashboard page
    const hideFooterPages = ['/habits', '/insights', '/settings'];
    setShowFooter(!hideFooterPages.includes(location.pathname));
  }, [location.pathname]);

  if (!showFooter) return null;

  return (
    <footer className="bg-card py-8 mt-auto border-t border-border shadow-sm">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-2xl font-bold text-primary">
              Daily<span className="text-foreground">Habit</span>
            </Link>
            <p className="mt-2 text-muted-foreground">
              Empowering you to build better habits and transform your life.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-muted-foreground">
              Have questions or feedback? <br />
              <a href="mailto:support@dailyhabit.com" className="text-primary hover:underline">
                support@dailyhabit.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Daily Habit Tracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
