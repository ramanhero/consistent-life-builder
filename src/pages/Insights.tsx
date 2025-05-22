
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import { useHabits } from '@/contexts/HabitsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const Insights = () => {
  const { habits, isLoading } = useHabits();

  // Prepare data for the 30-day line chart
  const getLast30DaysData = () => {
    const today = new Date();
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() - 29 + i);
      return {
        date: date.toISOString().split('T')[0],
        day: i + 1,
        count: 0,
      };
    });

    // Count completions for each day
    habits.forEach(habit => {
      habit.completedDates.forEach(completedDate => {
        const dayData = last30Days.find(day => day.date === completedDate);
        if (dayData) {
          dayData.count += 1;
        }
      });
    });

    return last30Days;
  };

  // Prepare data for the category pie chart
  const getCategoryData = () => {
    const categories: Record<string, number> = {};
    
    habits.forEach(habit => {
      if (categories[habit.category]) {
        categories[habit.category] += 1;
      } else {
        categories[habit.category] = 1;
      }
    });
    
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  };
  
  // Get milestones and achievements
  const getMilestones = () => {
    const milestones = [];
    
    habits.forEach(habit => {
      if (habit.streak >= 10) {
        milestones.push({
          habitName: habit.name,
          achievement: `${habit.streak} day streak`,
          message: `You've hit ${habit.streak} days of "${habit.name}" - amazing!`,
        });
      }
      
      if (habit.completedDates.length >= 20) {
        milestones.push({
          habitName: habit.name,
          achievement: `${habit.completedDates.length} total completions`,
          message: `You've completed "${habit.name}" ${habit.completedDates.length} times!`,
        });
      }
    });
    
    return milestones;
  };
  
  // Colors for the pie chart
  const COLORS = ['#FF6F61', '#6B7280', '#4CAF50', '#2196F3', '#9C27B0'];

  // Format date to show only day
  const formatXAxis = (value: string) => {
    return value;
  };

  const lineChartData = getLast30DaysData();
  const pieChartData = getCategoryData();
  const milestones = getMilestones();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Insights</h1>
            <p className="text-muted-foreground mt-1">
              Analyze your habit patterns and celebrate your achievements
            </p>
          </div>
          
          {/* 30-Day Trend */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">30-Day Completion Trend</h2>
            <Card>
              <CardContent className="pt-6">
                {isLoading ? (
                  <div className="h-80 flex items-center justify-center">
                    <Skeleton className="h-72 w-full" />
                  </div>
                ) : (
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={lineChartData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="day"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12 }}
                          tickFormatter={formatXAxis}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12 }}
                          allowDecimals={false}
                          domain={[0, 'auto']}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--background))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                          }}
                          formatter={(value) => [`${value} habits`, 'Completed']}
                          labelFormatter={(label) => `Day ${label}`}
                        />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                          dot={{
                            fill: 'hsl(var(--primary))',
                            strokeWidth: 0,
                          }}
                          activeDot={{
                            r: 6,
                            fill: 'hsl(var(--primary))',
                            stroke: 'hsl(var(--background))',
                            strokeWidth: 2,
                          }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
          
          {/* Category Distribution */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1">
                <CardContent className="pt-6">
                  {isLoading ? (
                    <div className="h-64 flex items-center justify-center">
                      <Skeleton className="h-56 w-full rounded-full" />
                    </div>
                  ) : pieChartData.length > 0 ? (
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="hsl(var(--primary))"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'hsl(var(--background))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '0.5rem',
                              fontSize: '0.875rem',
                            }}
                            formatter={(value) => [`${value} habits`, 'Count']}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-64 flex items-center justify-center">
                      <p className="text-muted-foreground">No data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ) : pieChartData.length > 0 ? (
                    <div className="space-y-4">
                      {pieChartData.map((category, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{category.name}</span>
                            <span className="text-muted-foreground">
                              {category.value} habit{category.value !== 1 ? 's' : ''}
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div
                              className="h-2.5 rounded-full"
                              style={{
                                width: `${(category.value / habits.length) * 100}%`,
                                backgroundColor: COLORS[index % COLORS.length],
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No categories available</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Achievements */}
          <section>
            <h2 className="text-xl font-semibold mb-4">Your Milestones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {isLoading ? (
                <>
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-32 w-full" />
                </>
              ) : milestones.length > 0 ? (
                milestones.map((milestone, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="h-1 bg-primary"></div>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{milestone.achievement}</h3>
                          <p className="text-muted-foreground">{milestone.message}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="md:col-span-2">
                  <CardContent className="py-6">
                    <div className="text-center">
                      <p className="text-muted-foreground">
                        No milestones achieved yet. Keep building your streaks to unlock achievements!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Insights;
