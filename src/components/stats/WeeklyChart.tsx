
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Habit } from '@/types';

interface WeeklyChartProps {
  habits: Habit[];
}

const WeeklyChart: React.FC<WeeklyChartProps> = ({ habits }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date();
  
  // Generate the past 7 days
  const pastDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - 6 + i);
    return {
      date: date.toISOString().split('T')[0],
      day: daysOfWeek[date.getDay()],
      count: 0,
    };
  });
  
  // Count completions for each day
  habits.forEach(habit => {
    habit.completedDates.forEach(completedDate => {
      const dayData = pastDays.find(day => day.date === completedDate);
      if (dayData) {
        dayData.count += 1;
      }
    });
  });

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={pastDays}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12 }}
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
            formatter={(value) => [`${value} habit${value !== 1 ? 's' : ''}`, 'Completed']}
            labelFormatter={(label) => `${label}`}
          />
          <Bar 
            dataKey="count" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]} 
            barSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyChart;
