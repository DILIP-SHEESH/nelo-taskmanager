"use client";
import { useState } from "react";
import { Task, Priority } from "@/types";

interface TaskItemProps {
  task: Task;
  onUpdate: (id: number, data: Partial<Task>) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}

export default function TaskItem({ task, onUpdate, onDelete, onToggle }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...task });

  const handleSave = () => {
    if (!editData.title.trim()) return;
    onUpdate(task.id, editData);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Delete this task permanently?")) {
      onDelete(task.id);
    }
  };

  // --- EDIT MODE UI ---
  if (isEditing) {
    return (
      <div className="card space-y-3 border-blue-200 ring-2 ring-blue-50">
        <input
          value={editData.title}
          onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
          className="input-primary"
          autoFocus
        />
        <div className="flex gap-2">
          <select
            value={editData.priority}
            onChange={(e) => setEditData(prev => ({ ...prev, priority: e.target.value as Priority }))}
            className="select-primary text-sm py-1"
          >
            <option>Low</option><option>Medium</option><option>High</option>
          </select>
          <input
            type="date"
            value={editData.dueDate}
            onChange={(e) => setEditData(prev => ({ ...prev, dueDate: e.target.value }))}
            className="input-primary py-1 text-sm"
          />
        </div>
        <textarea
          value={editData.description}
          onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
          className="input-primary text-sm"
        />
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={() => setIsEditing(false)} className="btn btn-cancel">Cancel</button>
          <button onClick={handleSave} className="btn btn-save">Save Changes</button>
        </div>
      </div>
    );
  }

  // --- VIEW MODE UI ---
  return (
    <div className={`card mb-3 group hover:border-slate-300 ${task.completed ? "bg-slate-50" : ""}`}>
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1.5 w-5 h-5 cursor-pointer accent-slate-900"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className={`task-title ${task.completed ? "task-completed" : ""}`}>
              {task.title}
            </h3>
            <span className={`badge badge-${task.priority}`}>{task.priority}</span>
          </div>

          {task.description && (
            <p className={`text-sm text-slate-600 mb-2 ${task.completed ? "text-slate-400" : ""}`}>
              {task.description}
            </p>
          )}

          {task.dueDate && (
            <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
              📅 Due: {task.dueDate}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
          <button onClick={handleDelete} className="btn-delete">Delete</button>
        </div>
      </div>
    </div>
  );
}