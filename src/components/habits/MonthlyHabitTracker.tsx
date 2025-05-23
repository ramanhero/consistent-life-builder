import React, { useState, useEffect } from 'react';
import { useHabits } from '@/contexts/HabitsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, CheckCircle2, Circle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { format, addMonths, subMonths, getDaysInMonth, startOfMonth, getDay, isSameDay } from 'date-fns';
interface Note {
  id: string;
  date: string;
  content: string;
}
const MonthlyHabitTracker = () => {
  const {
    habits,
    markHabitComplete
  } = useHabits();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteOpen, setNewNoteOpen] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [viewNoteOpen, setViewNoteOpen] = useState(false);
  useEffect(() => {
    // Load notes from localStorage
    const savedNotes = localStorage.getItem('habitTrackerNotes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);
  const saveNotes = (updatedNotes: Note[]) => {
    setNotes(updatedNotes);
    localStorage.setItem('habitTrackerNotes', JSON.stringify(updatedNotes));
  };
  const handlePreviousMonth = () => {
    setCurrentMonth(prevMonth => subMonths(prevMonth, 1));
  };
  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
  };
  const handleAddNote = () => {
    if (noteContent.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        date: format(new Date(), 'dd MMMM yyyy'),
        content: noteContent
      };
      const updatedNotes = [...notes, newNote];
      saveNotes(updatedNotes);
      setNoteContent('');
      setNewNoteOpen(false);
    }
  };
  const handleDeleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
    setViewNoteOpen(false);
  };
  const handleViewNote = (note: Note) => {
    setSelectedNote(note);
    setViewNoteOpen(true);
  };
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    return <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-center border-b border-border">
              <th className="p-2 font-medium text-sm text-left pl-4">Habits</th>
              {[...Array(daysInMonth)].map((_, index) => <th key={index} className="p-2 font-medium text-sm w-8 px-0 py-[10px] mx-0 my-0 rounded-none">
                  {index + 1}
                </th>)}
              <th className="p-2 font-medium text-sm">Goal</th>
              <th className="p-2 font-medium text-sm">Achieved</th>
            </tr>
          </thead>
          <tbody>
            {habits.map(habit => {
            // Calculate completed days for this month
            const completedDaysInMonth = habit.completedDates.filter(date => {
              const completedDate = new Date(date);
              return completedDate.getMonth() === currentMonth.getMonth() && completedDate.getFullYear() === currentMonth.getFullYear();
            });
            return <tr key={habit.id} className="border-b border-border hover:bg-muted/20">
                  <td className="p-2 font-medium pl-4">{habit.name}</td>
                  {[...Array(daysInMonth)].map((_, day) => {
                // Create a date object for this cell
                const cellDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day + 1);

                // Check if this day is completed
                const isCompleted = habit.completedDates.some(date => isSameDay(new Date(date), cellDate));

                // Determine background color based on category
                let bgColorClass = '';
                switch (habit.category.toLowerCase()) {
                  case 'health':
                    bgColorClass = isCompleted ? 'bg-green-100 dark:bg-green-950' : '';
                    break;
                  case 'productivity':
                    bgColorClass = isCompleted ? 'bg-blue-100 dark:bg-blue-950' : '';
                    break;
                  case 'personal':
                    bgColorClass = isCompleted ? 'bg-purple-100 dark:bg-purple-950' : '';
                    break;
                  default:
                    bgColorClass = isCompleted ? 'bg-primary/10' : '';
                }
                return <td key={day} className={`p-0 text-center ${bgColorClass} cursor-pointer hover:bg-muted/50 transition-colors`} onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();

                  // Only mark if the date is today or in the past
                  const today = new Date();
                  today.setHours(23, 59, 59, 999); // Set to end of today

                  if (cellDate <= today) {
                    const dateString = cellDate.toISOString().split('T')[0];
                    markHabitComplete(habit.id, dateString);
                  }
                }}>
                        <div className="w-full h-full flex items-center justify-center p-2 min-h-[2.5rem] px-[15px] py-0 mx-0 my-[20px]">
                          {isCompleted ? <CheckCircle2 className="h-4 w-4 text-primary" /> : <Circle className="h-4 w-4 text-muted-foreground/30" />}
                        </div>
                      </td>;
              })}
                  <td className="p-2 text-center">{habit.goal || '-'}</td>
                  <td className="p-2 text-center">
                    <span className={completedDaysInMonth.length >= (habit.goal || 0) ? 'text-green-500 font-bold' : ''}>
                      {completedDaysInMonth.length}
                    </span>
                  </td>
                </tr>;
          })}
          </tbody>
        </table>
      </div>;
  };
  return <div className="space-y-8">
      <Card className="shadow-sm">
        <CardHeader className="pb-2 pt-6 px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <CardTitle className="text-xl font-bold">Monthly Habit Tracker</CardTitle>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
                <ChevronLeft className="h-4 w-4 mr-1" /> 
                <span className="hidden sm:inline">Previous</span>
              </Button>
              <span className="text-lg font-medium">
                {format(currentMonth, 'MMMM yyyy')}
              </span>
              <Button variant="outline" size="sm" onClick={handleNextMonth}>
                <span className="hidden sm:inline">Next</span> 
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-2 py-4">
          {renderCalendarDays()}
        </CardContent>
      </Card>
      
      <Card className="shadow-sm">
        <CardHeader className="pb-2 px-6">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold">Notes</CardTitle>
            <Button size="sm" onClick={() => setNewNoteOpen(true)}>
              <Plus className="h-4 w-4 mr-1" /> New Note
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-6 py-4">
          {notes.length > 0 ? <div className="space-y-3">
              {[...notes].reverse().map(note => <div key={note.id} onClick={() => handleViewNote(note)} className="p-3 border border-border rounded-md hover:bg-accent/50 cursor-pointer transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">{note.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {note.content}
                  </p>
                </div>)}
            </div> : <div className="text-center py-[35px] mx-[8px]">
              <p className="text-muted-foreground">No notes yet. Add your first note.</p>
            </div>}
        </CardContent>
      </Card>
      
      {/* Add Note Dialog */}
      <Dialog open={newNoteOpen} onOpenChange={setNewNoteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Note</DialogTitle>
            <DialogDescription>
              Record your thoughts, progress, or reminders related to your habits.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <Textarea placeholder="Write your note here..." value={noteContent} onChange={e => setNoteContent(e.target.value)} className="min-h-[150px]" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewNoteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddNote}>
              Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Note Dialog */}
      <Dialog open={viewNoteOpen} onOpenChange={setViewNoteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Note</DialogTitle>
            <DialogDescription>
              {selectedNote?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="py-2">
            <div className="border border-border rounded-md p-4 min-h-[150px] bg-muted/20">
              {selectedNote?.content}
            </div>
          </div>
          <DialogFooter>
            <Button variant="destructive" onClick={() => selectedNote && handleDeleteNote(selectedNote.id)}>
              Delete Note
            </Button>
            <Button variant="outline" onClick={() => setViewNoteOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
};
export default MonthlyHabitTracker;