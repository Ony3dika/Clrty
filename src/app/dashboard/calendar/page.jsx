"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../../../src/styles/calendar.css" 
const CalendarPage = () => {
  const [tasks, setTasks] = useState([]);
  function convertTasksToEvents(tasks) {
    return tasks
      .filter((task) => task.dueDate) // skip if no dueDate
      .map((task) => ({
        id: task.id,
        title: task.title,
        start: new Date(task.dueDate),
        end: new Date(task.dueDate), // You can adjust duration if needed
        allDay: false, // can be true if you want it as an all-day event
        resource: {
          description: task.description,
          assignee: task.assignee,
          priority: task.priority,
          status: task.status || "pending",
        },
      }));
  }
  // Fetch Tasks
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Failed to parse tasks:", error);
      }
    }
  }, []);
  const events = convertTasksToEvents(tasks);
  const localizer = momentLocalizer(moment);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className=''>
        {" "}
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor='start'
        
          endAccessor='end'
          style={{ height: 500 }}
          popup
        />
      </div>
    </motion.div>
  );
};

export default CalendarPage;
