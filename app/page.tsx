"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import FilterBar from "@/components/FilterBar";
import { useTasks } from "@/hooks/useTasks";
import { useDebounce } from "@/hooks/useDebounce";
import { useTaskAutomation } from "@/hooks/useTaskAutomation";

export default function Home() {
  const router = useRouter();
  const { tasks, addTask, updateTask, deleteTask, toggleComplete } = useTasks();

  const [user, setUser] = useState<string | null>(null);

  // --- ACTIVATE AUTOMATION ---
  useTaskAutomation(tasks);

  useEffect(() => {
    // Check if user is logged in
    const sessionUser = sessionStorage.getItem("nelo_user");
    if (!sessionUser) {
      router.push("/login");
    } else {
      setUser(sessionUser);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("nelo_user");
    router.push("/login");
  };

  // --- FILTER STATE ---
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  const debouncedSearch = useDebounce(search, 300);

  // --- DERIVED STATE ---
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Status Filter
      if (status === "Completed" && !task.completed) return false;
      if (status === "Pending" && task.completed) return false;

      // 2. Priority Filter
      if (priority !== "All" && task.priority !== priority) return false;

      // 3. Search Filter (Case-insensitive)
      if (debouncedSearch) {
        const query = debouncedSearch.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDesc = task.description.toLowerCase().includes(query);
        return matchesTitle || matchesDesc;
      }

      return true;
    });
  }, [tasks, status, priority, debouncedSearch]);
  if (!user) return null;

  return (
    <main className="main-container">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Nelo Tasks</h1>
          <p className="text-slate-500 mt-1">Welcome, {user}</p>
        </div>
        <button 
          onClick={handleLogout} 
          className="text-sm font-medium text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-red-100"
        >
          Sign Out
        </button>
      </header>

      <TaskForm onAdd={addTask} />

      <FilterBar 
        search={search} onSearchChange={setSearch}
        status={status} onStatusChange={setStatus}
        priority={priority} onPriorityChange={setPriority}
      />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-700">Tasks</h2>
          <span className="text-sm bg-slate-200 px-2.5 py-0.5 rounded-full text-slate-600 font-medium">
            {filteredTasks.length} / {tasks.length}
          </span>
        </div>

        <div className="space-y-1">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onUpdate={updateTask}
                onDelete={deleteTask}
                onToggle={toggleComplete}
              />
            ))
          ) : (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
              <p className="text-slate-400">
                {tasks.length === 0 
                  ? "No tasks yet. Create one above!" 
                  : "No tasks match your filters."}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}