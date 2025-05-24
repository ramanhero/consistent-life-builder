import React from 'react';
import Header from '@/components/shared/Header';
import WeeklyChart from '@/components/stats/WeeklyChart';
import MonthlyHabitTracker from '@/components/habits/MonthlyHabitTracker';
import { useHabits } from '@/contexts/HabitsContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Award, Calendar, BarChart, Trophy, Target, Zap } from 'lucide-react';
const Insights = () => {
  const {
    habits,
    isLoading
  } = useHabits();
  const getTotalCompletions = () => {
    return habits.reduce((total, habit) => total + habit.completedDates.length, 0);
  };
  const getMostConsistentHabit = () => {
    if (habits.length === 0) return null;
    return habits.reduce((most, current) => {
      return current.streak > (most?.streak || 0) ? current : most;
    }, habits[0]);
  };
  const getCompletionRate = () => {
    if (habits.length === 0) return 0;
    const totalPossibleDays = habits.reduce((total, habit) => {
      const daysSinceCreation = Math.floor((new Date().getTime() - new Date(habit.createdAt).getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return total + daysSinceCreation;
    }, 0);
    const totalCompletions = getTotalCompletions();
    return totalPossibleDays > 0 ? Math.round(totalCompletions / totalPossibleDays * 100) : 0;
  };
  const getTodayCompletions = () => {
    const today = new Date().toISOString().split('T')[0];
    return habits.filter(habit => habit.completedDates.includes(today)).length;
  };
  const getWeeklyCompletions = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    return habits.reduce((total, habit) => {
      const weekCompletions = habit.completedDates.filter(date => {
        const completionDate = new Date(date);
        return completionDate >= weekStart && completionDate <= today;
      });
      return total + weekCompletions.length;
    }, 0);
  };
  const getKarmaScore = () => {
    // Calculate karma based on consistency and completion rates
    const streaks = habits.map(h => h.streak);
    const avgStreak = streaks.length > 0 ? streaks.reduce((a, b) => a + b, 0) / streaks.length : 0;
    const completionRate = getCompletionRate();
    return Math.round(avgStreak * 10 + completionRate * 2);
  };
  return <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4 ml-17 mx-0">
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
                  {isLoading ? <Skeleton className="h-9 w-32" /> : <>{getMostConsistentHabit()?.streak || 0} days</>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  {isLoading ? <Skeleton className="h-4 w-40" /> : getMostConsistentHabit() ? `"${getMostConsistentHabit()?.name}" is your most consistent habit` : "Start building your streak today"}
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

          {/* Daily, Weekly, Karma section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-sm">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center mb-2">
                  <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">Daily</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {getTodayCompletions()}/{habits.length}
                </div>
                <p className="text-sm text-muted-foreground">
                  Daily goal completed: {habits.length > 0 ? Math.round(getTodayCompletions() / habits.length * 100) : 0}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {getTodayCompletions() === habits.length ? "Well done!" : "Keep going!"}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center mb-2">
                  <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg">Weekly</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {getWeeklyCompletions()}
                </div>
                <p className="text-sm text-muted-foreground">
                  Habits completed this week
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {getWeeklyCompletions() > 0 ? "Great progress!" : "Start your week strong!"}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-full flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-lg">Karma</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {getKarmaScore()}
                </div>
                <p className="text-sm text-muted-foreground">
                  Your consistency score
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {getKarmaScore() > 100 ? "Amazing!" : getKarmaScore() > 50 ? "Good!" : "Keep building!"}
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
                  {isLoading ? <div className="h-64 flex items-center justify-center">
                      <Skeleton className="h-56 w-full" />
                    </div> : <WeeklyChart habits={habits} />}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="monthly">
              <MonthlyHabitTracker />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>;
};
export default Insights;