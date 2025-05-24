
import React, { useState, useEffect } from 'react';
import Header from '@/components/shared/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Task {
  id: string;
  title: string;
  description?: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const Today = () => {
  const { toast } = useToast();
  const [columns, setColumns] = useState<Column[]>([
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'doing', title: 'Doing', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] },
  ]);
  const [newTaskInputs, setNewTaskInputs] = useState<{ [key: string]: string }>({});
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [showNewColumnInput, setShowNewColumnInput] = useState(false);

  useEffect(() => {
    const savedColumns = localStorage.getItem('todayColumns');
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todayColumns', JSON.stringify(columns));
  }, [columns]);

  const addTask = (columnId: string) => {
    const taskTitle = newTaskInputs[columnId]?.trim();
    if (!taskTitle) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskTitle,
    };

    setColumns(prev => prev.map(col => 
      col.id === columnId 
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col
    ));

    setNewTaskInputs(prev => ({ ...prev, [columnId]: '' }));
    
    toast({
      title: 'Task Added',
      description: `"${taskTitle}" has been added to ${columns.find(c => c.id === columnId)?.title}`,
    });
  };

  const deleteTask = (columnId: string, taskId: string) => {
    setColumns(prev => prev.map(col => 
      col.id === columnId 
        ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
        : col
    ));
  };

  const addColumn = () => {
    if (!newColumnTitle.trim()) return;

    const newColumn: Column = {
      id: Date.now().toString(),
      title: newColumnTitle.trim(),
      tasks: [],
    };

    setColumns(prev => [...prev, newColumn]);
    setNewColumnTitle('');
    setShowNewColumnInput(false);

    toast({
      title: 'List Added',
      description: `"${newColumnTitle}" list has been created`,
    });
  };

  const deleteColumn = (columnId: string) => {
    if (columns.length <= 1) return;
    
    setColumns(prev => prev.filter(col => col.id !== columnId));
    
    toast({
      title: 'List Deleted',
      description: 'The list has been removed',
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="container max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Today</h1>
            <p className="text-muted-foreground mt-1">
              Organize your daily tasks and priorities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {columns.map((column) => (
              <Card key={column.id} className="h-fit">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{column.title}</CardTitle>
                    {columns.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteColumn(column.id)}
                        className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {column.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 bg-muted rounded-md group hover:bg-muted/80 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{task.title}</p>
                          {task.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {task.description}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTask(column.id, task.id)}
                          className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="space-y-2">
                    <Input
                      placeholder="Add a task..."
                      value={newTaskInputs[column.id] || ''}
                      onChange={(e) => setNewTaskInputs(prev => ({
                        ...prev,
                        [column.id]: e.target.value
                      }))}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addTask(column.id);
                        }
                      }}
                      className="text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addTask(column.id)}
                      className="w-full justify-start text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add a task
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add new column card */}
            <Card className="h-fit border-dashed">
              <CardContent className="p-6">
                {showNewColumnInput ? (
                  <div className="space-y-3">
                    <Input
                      placeholder="List title..."
                      value={newColumnTitle}
                      onChange={(e) => setNewColumnTitle(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addColumn();
                        }
                      }}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={addColumn}>
                        Add List
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setShowNewColumnInput(false);
                          setNewColumnTitle('');
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => setShowNewColumnInput(true)}
                    className="w-full h-20 border-dashed border-2 hover:border-primary/50"
                  >
                    <Plus className="h-6 w-6 mr-2" />
                    Add another list
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Today;
