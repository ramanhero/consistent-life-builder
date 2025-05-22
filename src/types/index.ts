
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Habit {
  id: string;
  name: string;
  category: 'Health' | 'Work' | 'Personal' | string;
  frequency: 'Daily' | 'Weekly' | 'Custom';
  customDays?: string[];
  streak: number;
  notes?: string;
  createdAt: string;
  completedDates: string[];
  reminder?: {
    enabled: boolean;
    time?: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
