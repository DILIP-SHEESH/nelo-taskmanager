"use client";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { useTasks } from "@/hooks/useTasks";

export default function Home() {
  const { tasks, addTask, updateTask, deleteTask, toggleComplete, isLoaded } = useTasks();

  if (!isLoaded) return null; // Prevents hydration mismatch

  return (
    <main className="main-container">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Nelo Tasks</h1>
        <p className="text-slate-500 mt-1">Manage your daily priorities</p>
      </header>

      <TaskForm onAdd={addTask} />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-700">Your Tasks</h2>
          <span className="text-sm bg-slate-200 px-2 py-0.5 rounded-full text-slate-600 font-medium">
            {tasks.length}
          </span>
        </div>

        <div className="space-y-1">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
                onToggle={toggleComplete}
              />
            ))
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
              <p className="text-slate-400">No tasks yet. Create one above!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}