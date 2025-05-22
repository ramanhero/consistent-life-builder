
import { Habit, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
};

export const mockHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    category: 'Health',
    frequency: 'Daily',
    streak: 5,
    notes: '10 minutes of mindfulness',
    createdAt: '2023-05-15',
    completedDates: [
      '2023-05-15',
      '2023-05-16',
      '2023-05-17',
      '2023-05-18',
      '2023-05-19',
    ],
    reminder: {
      enabled: true,
      time: '08:00',
    },
  },
  {
    id: '2',
    name: 'Read a Book',
    category: 'Personal',
    frequency: 'Daily',
    streak: 3,
    notes: '30 minutes of reading',
    createdAt: '2023-05-10',
    completedDates: [
      '2023-05-17',
      '2023-05-18',
      '2023-05-19',
    ],
    reminder: {
      enabled: false,
    },
  },
  {
    id: '3',
    name: 'Weekly Planning',
    category: 'Work',
    frequency: 'Weekly',
    streak: 2,
    notes: 'Plan tasks for the week',
    createdAt: '2023-04-30',
    completedDates: [
      '2023-05-07',
      '2023-05-14',
    ],
    reminder: {
      enabled: true,
      time: '18:00',
    },
  },
];
