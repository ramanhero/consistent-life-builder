
import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import WeeklyChart from '@/components/stats/WeeklyChart';
import MonthlyHabitTracker from '@/components/habits/MonthlyHabitTracker';
import { useHabits } from '@/contexts/HabitsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Award, Calendar, BarChart } from 'lucide-react';

const Insights = () => {
  const { habits, isLoading } = useHabits();

  const getTotalCompletions = () => {
    return habits.reduce((total, habit) => total + habit.completedDates.length, 0);
  };

  const getMostConsistentHabit = () => {
    if (habits.length === 0) return null;
    
    return habits.reduce((most, current) => {
      return (current.streak > (most?.streak || 0)) ? current : most;
    }, habits[0]);
  };

  const getCompletionRate = () => {
    if (habits.length === 0) return 0;
    
    const totalPossibleDays = habits.reduce((total, habit) => {
      const daysSinceCreation = Math.floor(
        (new Date().getTime() - new Date(habit.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      ) + 1;
      return total + daysSinceCreation;
    }, 0);
    
    const totalCompletions = getTotalCompletions();
    
    return totalPossibleDays > 0 
      ? Math.round((totalCompletions / totalPossibleDays) * 100) 
      : 0;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Insights</h1>
              <p className="text-muted-foreground mt-1">
                Track your progress and gain insights on your habits
              </p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-card to-card/95">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  Total Completions
                </CardDescription>
                <CardTitle className="text-3xl">
                  {isLoading ? <Skeleton className="h-9 w-16" /> : getTotalCompletions()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Total number of times you've completed your habits
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-card to-card/95">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center">
                  <Award className="h-4 w-4 mr-2 text-primary" />
                  Best Streak
                </CardDescription>
                <CardTitle className="text-3xl">
                  {isLoading ? (
                    <Skeleton className="h-9 w-32" />
                  ) : (
                    <>{getMostConsistentHabit()?.streak || 0} days</>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {isLoading ? (
                    <Skeleton className="h-4 w-40" />
                  ) : (
                    getMostConsistentHabit()
                      ? `"${getMostConsistentHabit()?.name}" is your most consistent habit`
                      : "Start building your streak today"
                  )}
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-card to-card/95">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center">
                  <BarChart className="h-4 w-4 mr-2 text-primary" />
                  Completion Rate
                </CardDescription>
                <CardTitle className="text-3xl">
                  {isLoading ? <Skeleton className="h-9 w-16" /> : `${getCompletionRate()}%`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Percentage of habit completions since you started
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Tab content */}
          <Tabs defaultValue="monthly" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="weekly">Weekly Overview</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Tracker</TabsTrigger>
            </TabsList>
            
            <TabsContent value="weekly">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle>Weekly Progress</CardTitle>
                  <CardDescription>
                    Your habit completion over the past week
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  {isLoading ? (
                    <div className="h-64 flex items-center justify-center">
                      <Skeleton className="h-56 w-full" />
                    </div>
                  ) : (
                    <WeeklyChart habits={habits} />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="monthly">
              <MonthlyHabitTracker />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Insights;
