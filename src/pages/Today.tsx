
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, X, Table, CheckCircle2, Trash2, Copy, ExternalLink, MoreHorizontal, Edit, Star, Palette, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from '@/components/ui/context-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'not started' | 'in progress' | 'completed';
  dueDate?: string;
  tags?: string[];
  files?: string[];
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
      status: columnId === 'todo' ? 'not started' : columnId === 'doing' ? 'in progress' : 'completed',
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

  const duplicateColumn = (column: Column) => {
    const newColumn: Column = {
      id: Date.now().toString(),
      title: `${column.title} Copy`,
      tasks: [...column.tasks.map(task => ({ ...task, id: Date.now().toString() + Math.random() }))],
    };

    setColumns(prev => [...prev, newColumn]);
    
    toast({
      title: 'List Duplicated',
      description: `"${column.title}" has been duplicated`,
    });
  };

  const openTasksModal = (column: Column) => {
    setSelectedColumn(column);
    setTasksModalOpen(true);
  };

  // Sample task data for the table
  const sampleTasks = [
    {
      id: '1',
      name: 'Edit Article #18',
      tags: ['project management', 'blog post'],
      status: 'completed',
      dueDate: 'September 3, 2024',
      files: []
    },
    {
      id: '2',
      name: 'Research for Article #20',
      tags: ['productivity', 'blog post'],
      status: 'in progress',
      dueDate: 'September 5, 2024',
      files: ['Procurement R...']
    },
    {
      id: '3',
      name: 'Write a video script for TikTok',
      tags: ['time management', 'TikTok'],
      status: 'not started',
      dueDate: 'September 6, 2024',
      files: []
    },
    {
      id: '4',
      name: 'Prepare presentation for Monthly Team Meet',
      tags: ['presentation', 'team organization'],
      status: 'in progress',
      dueDate: 'September 8, 2024',
      files: ['Meeting notes...']
    },
    {
      id: '5',
      name: 'Schedule a meeting with Jessica',
      tags: ['team organization'],
      status: 'not started',
      dueDate: 'September 6, 2024',
      files: []
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'not started':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTagColor = (tag: string) => {
    const colors = [
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
      'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300',
      'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300',
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    ];
    const index = tag.length % colors.length;
    return colors[index];
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow py-8 px-4 ml-17 mx-0">
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
                <ContextMenuTrigger>
                  <Card className="h-fit cursor-pointer" onClick={() => openTasksModal(column)}>
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
                <ContextMenuContent className="w-64">
                  <div className="px-2 py-1.5">
                    <Input placeholder="Search actions..." className="h-8" />
                  </div>
                  <ContextMenuSeparator />
                  <ContextMenuItem onClick={() => deleteColumn(column.id)} disabled={columns.length <= 1}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                    <span className="ml-auto text-xs text-muted-foreground">Del or Ctrl+D</span>
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => duplicateColumn(column)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                    <span className="ml-auto text-xs text-muted-foreground">⌘+D</span>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Turn into
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => openTasksModal(column)}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open in new tab
                    <span className="ml-auto text-xs text-muted-foreground">⌘+Shift+↵</span>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Table className="h-4 w-4 mr-2" />
                    Open in side peek
                    <span className="ml-auto text-xs text-muted-foreground">⌃+Click</span>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy link
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Rename
                    <span className="ml-auto text-xs text-muted-foreground">⌘+Shift+R</span>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Move to
                    <span className="ml-auto text-xs text-muted-foreground">⌘+Shift+P</span>
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Star className="h-4 w-4 mr-2" />
                    Add to Favorites
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>
                    <MoreHorizontal className="h-4 w-4 mr-2" />
                    Icon
                  </ContextMenuItem>
                  <ContextMenuItem>
                    <Palette className="h-4 w-4 mr-2" />
                    Color
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <div className="px-2 py-1.5 text-xs text-muted-foreground">
                    Last edited by Milica Lukic
                    <br />
                    Today at 1:12 PM
                  </div>
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
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Table className="h-5 w-5" />
              Tasks
            </DialogTitle>
          </DialogHeader>
          
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{selectedColumn?.title}</h3>
          </div>

          <TableComponent>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Tasks</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Task Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Files</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell className="font-medium">{task.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {task.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className={`text-xs ${getTagColor(tag)}`}>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`text-xs ${getStatusColor(task.status)}`}>
                      {task.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{task.dueDate}</TableCell>
                  <TableCell>
                    {task.files.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {task.files.map((file, index) => (
                          <span key={index} className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            {file}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TableComponent>

          <DialogFooter>
            <Button variant="outline" onClick={() => setTasksModalOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Today;
