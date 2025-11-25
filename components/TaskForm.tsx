"use client";
import { useState, FormEvent } from "react";
import { Task, Priority } from "@/types";

interface TaskFormProps {
  onAdd: (task: Omit<Task, "id" | "completed">) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium" as Priority,
    dueDate: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate Required Fields
    if (!formData.title.trim()) return;

    onAdd(formData);

    // Clear Form
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card mb-6">
      <h2 className="text-lg font-semibold mb-4 text-slate-800">Add New Task</h2>
      <div className="space-y-3">
        <input
          placeholder="Task Title *"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          className="input-primary"
          required
        />
        
        <div className="grid grid-cols-2 gap-3">
          <select
            value={formData.priority}
            onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Priority }))}
            className="select-primary"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
            className="input-primary"
          />
        </div>

        <textarea
          placeholder="Description (Optional)"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="input-primary min-h-[80px] resize-none"
        />

        <button type="submit" className="btn btn-submit">Create Task</button>
      </div>
    </form>
  );
}