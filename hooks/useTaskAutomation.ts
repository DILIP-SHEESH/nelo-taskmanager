"use client";
import { useEffect, useRef } from "react";
import { Task } from "@/types";

// 20 minutes in milliseconds
const CRON_INTERVAL = 20 * 60 * 1000; 

export function useTaskAutomation(tasks: Task[]) {
  const tasksRef = useRef(tasks);
  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);
  useEffect(() => {
    const runJob = () => {
      const pendingTasks = tasksRef.current.filter((t) => !t.completed);

      if (pendingTasks.length > 0) {
        console.group("AUTOMATION: Task Reminder Service");
        console.log(`Time: ${new Date().toLocaleTimeString()}`);
        console.log(`Sending mock emails for ${pendingTasks.length} pending tasks...`);
        
        pendingTasks.forEach((task) => {
          console.log(`   ➡ To: user@nelo.com | Subject: Reminder: ${task.title}`);
        });
        
        console.groupEnd();
      }
    };

    const timerId = setInterval(runJob, CRON_INTERVAL);

    return () => clearInterval(timerId);
  }, []);
}