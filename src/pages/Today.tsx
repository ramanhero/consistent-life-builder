import React, { useState, useEffect } from 'react';
import Header from '@/components/shared/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X, MoreHorizontal, Edit, Trash2, Copy, FileText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from '@/components/ui/context-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'not started' | 'in progress' | 'completed';
  dueDate?: string;
  tags?: string[];
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
  const [tasksModalOpen, setTasksModalOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);

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
      status: 'not started',
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

  const handleColumnClick = (column: Column) => {
    setSelectedColumn(column);
    setTasksModalOpen(true);
  };

  const handleRenameColumn = (columnId: string) => {
    const newTitle = prompt('Enter new list name:');
    if (newTitle && newTitle.trim()) {
      setColumns(prev => prev.map(col => 
        col.id === columnId 
          ? { ...col, title: newTitle.trim() }
          : col
      ));
      
      toast({
        title: 'List Renamed',
        description: `List has been renamed to "${newTitle}"`,
      });
    }
  };

  const handleDuplicateColumn = (column: Column) => {
    const newColumn: Column = {
      id: Date.now().toString(),
      title: `${column.title} Copy`,
      tasks: [...column.tasks],
    };

    setColumns(prev => [...prev, newColumn]);
    
    toast({
      title: 'List Duplicated',
      description: `"${column.title}" has been duplicated`,
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
              <ContextMenu key={column.id}>
                <ContextMenuTrigger asChild>
                  <Card className="h-fit cursor-pointer" onClick={() => handleColumnClick(column)}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{column.title}</CardTitle>
                        {columns.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteColumn(column.id);
                            }}
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
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteTask(column.id, task.id);
                              }}
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
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            addTask(column.id);
                          }}
                          className="w-full justify-start text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add a task
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onClick={() => handleColumnClick(column)}>
                    <FileText className="h-4 w-4 mr-2" />
                    Open Tasks
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem onClick={() => handleRenameColumn(column.id)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Rename
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => handleDuplicateColumn(column)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  {columns.length > 1 && (
                    <ContextMenuItem 
                      onClick={() => deleteColumn(column.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </ContextMenuItem>
                  )}
                </ContextMenuContent>
              </ContextMenu>
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

      {/* Tasks Modal */}
      <Dialog open={tasksModalOpen} onOpenChange={setTasksModalOpen}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Tasks - {selectedColumn?.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-6">
            <div className="bg-muted/20 rounded-lg p-6">
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Table
                  </Button>
                  <h2 className="text-xl font-semibold">{selectedColumn?.title}</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-background rounded-lg">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Task</th>
                        <th className="text-left p-4 font-medium">Tags</th>
                        <th className="text-left p-4 font-medium">Task Status</th>
                        <th className="text-left p-4 font-medium">Due Date</th>
                        <th className="text-left p-4 font-medium">Files</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedColumn?.tasks.map((task, index) => (
                        <tr key={task.id} className="border-b hover:bg-muted/50">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{task.title}</p>
                              {task.description && (
                                <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-1">
                              {task.tags?.map((tag, tagIndex) => (
                                <span key={tagIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                                  {tag}
                                </span>
                              )) || (
                                <span className="text-muted-foreground text-sm">-</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              task.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                              task.status === 'in progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                            }`}>
                              {task.status || 'not started'}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="text-sm">
                              {task.dueDate || '-'}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="text-muted-foreground text-sm">-</span>
                          </td>
                        </tr>
                      ))}
                      {(!selectedColumn?.tasks || selectedColumn.tasks.length === 0) && (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-muted-foreground">
                            No tasks in this list yet. Add some tasks to get started!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Today;
