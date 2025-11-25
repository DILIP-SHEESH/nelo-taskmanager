"use client";

interface FilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  status: string;
  onStatusChange: (val: string) => void;
  priority: string;
  onPriorityChange: (val: string) => void;
}

export default function FilterBar({ 
  search, onSearchChange, 
  status, onStatusChange, 
  priority, onPriorityChange 
}: FilterBarProps) {
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-3">
      {/* Search - Takes up available space */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search title or description..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-primary"
        />
      </div>

      {/* Filters - Fixed width for consistency */}
      <div className="flex gap-2">
        <select 
          value={status} 
          onChange={(e) => onStatusChange(e.target.value)}
          className="select-primary min-w-[130px]"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <select 
          value={priority} 
          onChange={(e) => onPriorityChange(e.target.value)}
          className="select-primary min-w-[130px]"
        >
          <option value="All">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
    </div>
  );
}