
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Habit } from '../types';
import { mockHabits } from '../data/mockData';
import { useToast } from '@/components/ui/use-toast';

interface HabitsContextType {
  habits: Habit[];
  isLoading: boolean;
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates'>) => void;
  updateHabit: (id: string, habitData: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  markHabitComplete: (id: string) => void;
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export const HabitsProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching habits from an API
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setHabits(mockHabits);
      } catch (error) {
        console.error('Error fetching habits:', error);
        toast({
          title: 'Error',
          description: 'Failed to load habits',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchHabits();
  }, [toast]);

  const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'completedDates'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      completedDates: [],
    };

    setHabits(prevHabits => [...prevHabits, newHabit]);
    toast({
      title: 'Habit Added',
      description: `"${habitData.name}" has been added to your habits`,
    });
  };

  const updateHabit = (id: string, habitData: Partial<Habit>) => {
    setHabits(prevHabits =>
      prevHabits.map(habit =>
        habit.id === id ? { ...habit, ...habitData } : habit
      )
    );
    toast({
      title: 'Habit Updated',
      description: 'Your habit has been updated successfully',
    });
  };

  const deleteHabit = (id: string) => {
    const habitToDelete = habits.find(h => h.id === id);
    setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
    toast({
      title: 'Habit Deleted',
      description: habitToDelete ? `"${habitToDelete.name}" has been deleted` : 'Habit has been deleted',
    });
  };

  const markHabitComplete = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setHabits(prevHabits =>
      prevHabits.map(habit => {
        if (habit.id === id) {
          // Check if already completed today
          if (habit.completedDates.includes(today)) {
            return habit;
          }
          
          // Calculate streak
          const sortedDates = [...habit.completedDates, today].sort();
          let newStreak = 1;
          
          // For daily habits, check consecutive days
          if (habit.frequency === 'Daily') {
            for (let i = sortedDates.length - 1; i > 0; i--) {
              const currentDate = new Date(sortedDates[i]);
              const prevDate = new Date(sortedDates[i - 1]);
              
              // Calculate difference in days
              const diffTime = currentDate.getTime() - prevDate.getTime();
              const diffDays = diffTime / (1000 * 60 * 60 * 24);
              
              if (diffDays === 1) {
                newStreak++;
              } else {
                break;
              }
            }
          } 
          // For weekly habits, just count the number of weeks
          else if (habit.frequency === 'Weekly') {
            newStreak = Math.ceil(sortedDates.length / 7);
          }
          
          return {
            ...habit,
            completedDates: [...habit.completedDates, today],
            streak: newStreak,
          };
        }
        return habit;
      })
    );
    
    // Find the habit for the toast message
    const completedHabit = habits.find(h => h.id === id);
    
    toast({
      title: 'Habit Completed!',
      description: completedHabit 
        ? `Great job completing "${completedHabit.name}" today!` 
        : 'Great job completing your habit!',
    });
  };

  return (
    <HabitsContext.Provider value={{ habits, isLoading, addHabit, updateHabit, deleteHabit, markHabitComplete }}>
      {children}
    </HabitsContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitsContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
};
