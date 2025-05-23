import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, Star, Users, TrendingUp } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Join 50,000+ habit builders</span>
                </div>
                
                {/* Main heading */}
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    Build
                    <span className="text-primary"> Better</span>
                    <br />
                    Habits
                    <span className="text-secondary"> Daily</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                    Transform your life one habit at a time. Track, analyze, and celebrate your progress with our intelligent habit tracker.
                  </p>
                </div>

                {/* Features list */}
                <div className="flex flex-col sm:flex-row gap-6 text-left">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Free forever</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">No ads</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">Privacy first</span>
                  </div>
                </div>
                
                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Button asChild size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                      {isAuthenticated ? "Go to Dashboard" : "Start Building Habits"}
                    </Link>
                  </Button>
                  {!isAuthenticated && (
                    <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-accent/50 transition-all duration-300">
                      <Link to="/login">Sign In</Link>
                    </Button>
                  )}
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-6 pt-8">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">50K+ users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">2M+ habits tracked</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">4.9/5</span>
                  </div>
                </div>
              </div>
              
              {/* Hero image */}
              <div className="relative lg:pl-8">
                <div className="relative">
                  {/* Main image container */}
                  <div className="relative z-20 rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
                      {/* Mock app interface */}
                      <div className="bg-background rounded-xl shadow-lg h-full p-6 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">Today's Habits</h3>
                          <div className="text-2xl">🔥</div>
                        </div>
                        
                        {/* Mock habit items */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                            <div className="w-5 h-5 bg-primary rounded-full"></div>
                            <span className="font-medium">Morning Exercise</span>
                            <div className="ml-auto text-primary font-bold">✓</div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-secondary/5 rounded-lg">
                            <div className="w-5 h-5 bg-secondary rounded-full"></div>
                            <span className="font-medium">Read 30 minutes</span>
                            <div className="ml-auto text-secondary font-bold">✓</div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="w-5 h-5 bg-muted-foreground/20 rounded-full"></div>
                            <span className="font-medium text-muted-foreground">Meditation</span>
                            <div className="ml-auto w-5 h-5 border-2 border-muted-foreground/20 rounded-full"></div>
                          </div>
                        </div>
                        
                        {/* Progress indicator */}
                        <div className="pt-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Daily Progress</span>
                            <span className="font-semibold">67%</span>
                          </div>
                          <div className="w-full bg-muted/30 rounded-full h-2">
                            <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{ width: '67%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 z-30 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg text-sm font-medium">
                    7 day streak! 🎉
                  </div>
                  <div className="absolute -bottom-4 -left-4 z-30 bg-secondary text-secondary-foreground px-4 py-2 rounded-full shadow-lg text-sm font-medium">
                    +150 XP earned
                  </div>
                </div>
                
                {/* Background decorative shapes */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full -z-10"></div>
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary/10 rounded-full -z-10"></div>
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
