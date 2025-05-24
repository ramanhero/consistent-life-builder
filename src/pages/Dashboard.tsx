
import React, { useState } from 'react';
import HabitCard from '@/components/habits/HabitCard';
import EmptyState from '@/components/habits/EmptyState';
import WeeklyChart from '@/components/stats/WeeklyChart';
import AddHabitForm from '@/components/habits/AddHabitForm';
import { useHabits } from '@/contexts/HabitsContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const Dashboard = () => {
  const { habits, isLoading } = useHabits();
  const { user } = useAuth();
  const [addHabitOpen, setAddHabitOpen] = useState(false);

  const getTotalCompletions = () => {
    return habits.reduce((total, habit) => total + habit.completedDates.length, 0);
  };

  const getLongestStreak = () => {
    return habits.reduce((longest, habit) => Math.max(longest, habit.streak), 0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow py-8 px-4 ml-17 mx-0">
        <div className="container max-w-7xl mx-auto">
          {/* Welcome Section */}
          <section className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold">
                  Hey {user?.name || 'there'}, let's crush it today!
                </h1>
                <p className="text-muted-foreground mt-1">
                  Track your progress and build better habits
                </p>
              </div>
              <Button onClick={() => setAddHabitOpen(true)}>
                Add New Habit
              </Button>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Habits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-10 w-16" />
                  ) : (
                    <p className="text-3xl font-bold">{habits.length}</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Completions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-10 w-16" />
                  ) : (
                    <p className="text-3xl font-bold">{getTotalCompletions()}</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Longest Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <Skeleton className="h-10 w-16" />
                  ) : (
                    <p className="text-3xl font-bold">{getLongestStreak()} days</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Weekly Progress Chart */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Weekly Progress</h2>
            <Card>
              <CardContent className="pt-6">
                {isLoading ? (
                  <div className="h-64 flex items-center justify-center">
                    <Skeleton className="h-56 w-full" />
                  </div>
                ) : (
                  <WeeklyChart habits={habits} />
                )}
              </CardContent>
            </Card>
          </section>
          
          {/* Habits Grid */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Habits</h2>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <Skeleton className="h-6 w-3/4" />
                    </CardHeader>
                    <CardContent className="pb-4 space-y-3">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardContent>
                    <div className="px-6 pb-6">
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : habits.length === 0 ? (
              <EmptyState onAddHabit={() => setAddHabitOpen(true)} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {habits.map(habit => (
                  <HabitCard key={habit.id} habit={habit} />
                ))}
              </div>
            )}
          </section>
          
          {/* Floating Action Button (mobile only) */}
          <div className="fixed bottom-6 right-6 md:hidden">
            <Button 
              size="lg" 
              className="h-14 w-14 rounded-full shadow-lg"
              onClick={() => setAddHabitOpen(true)}
            >
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </Button>
          </div>
        </div>
      </main>
      
      {/* Add Habit Dialog */}
      <Dialog open={addHabitOpen} onOpenChange={setAddHabitOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Habit</DialogTitle>
          </DialogHeader>
          <AddHabitForm onSuccess={() => setAddHabitOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
