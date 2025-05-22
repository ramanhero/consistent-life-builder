
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { useAuth } from '@/contexts/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-coral-50 to-background">
          <div className="container max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  Master Your Habits, Transform Your Life
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Join millions building better routines with Daily Habit Tracker—simple, smart, and free.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button asChild size="lg" className="text-lg">
                    <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                      {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                    </Link>
                  </Button>
                  {!isAuthenticated && (
                    <Button asChild variant="outline" size="lg" className="text-lg">
                      <Link to="/login">Log In</Link>
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="relative">
                <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1517021897933-0e0319cfbc28?q=80&w=2070&auto=format&fit=crop" 
                    alt="Person tracking habits" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full -z-10"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full -z-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Simple. Powerful. Effective.</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our thoughtfully designed features help you build lasting habits with less effort.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-card rounded-xl p-6 shadow-sm card-hover">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Any Habit</h3>
                <p className="text-muted-foreground">
                  From daily meditation to weekly meal prep, track any routine that matters to you.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-card rounded-xl p-6 shadow-sm card-hover">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Build Momentum</h3>
                <p className="text-muted-foreground">
                  Visualize your progress with streaks and stats that keep you motivated day after day.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-card rounded-xl p-6 shadow-sm card-hover">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
                <p className="text-muted-foreground">
                  Never forget your habits with customizable reminders that fit your schedule.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4 bg-accent">
          <div className="container max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What People Are Saying</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands who have transformed their lives with Daily Habit Tracker.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-card rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-secondary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah J.</h4>
                    <p className="text-sm text-muted-foreground">Product Designer</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "I've tried dozens of habit trackers, but this one finally helped me stick with meditation. The streaks feature is so motivating!"
                </p>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-card rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-primary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Mark T.</h4>
                    <p className="text-sm text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "The clean interface makes it so easy to track my daily coding practice. I've improved so much since I started using this app."
                </p>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-card rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 bg-secondary rounded-full"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">Emily R.</h4>
                    <p className="text-sm text-muted-foreground">Health Coach</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "I recommend this to all my clients. The insights feature helps them see patterns and stay accountable to their health goals."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-primary/5">
          <div className="container max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Habits?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of others who have already started their journey to better habits and improved lives.
            </p>
            <Button asChild size="lg" className="text-lg">
              <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                {isAuthenticated ? "Go to Dashboard" : "Start For Free"}
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
