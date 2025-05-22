
import React from 'react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  onAddHabit: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAddHabit }) => {
  return (
    <div className="text-center py-12 px-4 rounded-lg border-2 border-dashed border-muted">
      <div className="animate-pulse-scale">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-primary"
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
        </div>
      </div>
      <h3 className="text-lg font-medium mb-2">No habits yet</h3>
      <p className="text-muted-foreground mb-6">
        Start building better routines by adding your first habit.
      </p>
      <Button onClick={onAddHabit}>
        Add Your First Habit
      </Button>
    </div>
  );
};

export default EmptyState;
