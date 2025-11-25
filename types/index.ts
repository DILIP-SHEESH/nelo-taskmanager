export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  completed: boolean;
}