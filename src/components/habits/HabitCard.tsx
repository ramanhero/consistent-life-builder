
import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Habit } from '@/types';
import { useHabits } from '@/contexts/HabitsContext';

interface HabitCardProps {
  habit: Habit;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
  const { markHabitComplete } = useHabits();
  const today = new Date().toISOString().split('T')[0];
  const isCompletedToday = habit.completedDates.includes(today);

  // Calculate progress percentage (for the visual indicator)
  let progressPercentage = 0;
  
  if (habit.completedDates.length > 0) {
    // For the progress circle, just check if completed today
    progressPercentage = isCompletedToday ? 100 : 0;
  }

  // Determine category color
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'health':
        return 'bg-green-100 text-green-800';
      case 'work':
        return 'bg-blue-100 text-blue-800';
      case 'personal':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{habit.name}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(habit.category)}`}>
            {habit.category}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative w-12 h-12">
              {/* Circle progress indicator */}
              <svg className="w-12 h-12" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-muted"
                  strokeWidth="2"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-primary"
                  strokeWidth="2"
                  strokeDasharray="100"
                  strokeDashoffset={100 - progressPercentage}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                {isCompletedToday ? '✓' : ''}
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">{habit.frequency}</p>
              <p className="font-medium">
                {habit.streak} day{habit.streak !== 1 ? 's' : ''} streak
              </p>
            </div>
          </div>
        </div>
        
        {habit.notes && (
          <p className="mt-2 text-sm text-muted-foreground truncate">{habit.notes}</p>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full"
          disabled={isCompletedToday}
          onClick={() => markHabitComplete(habit.id)}
        >
          {isCompletedToday ? 'Completed' : 'Mark Complete'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HabitCard;
