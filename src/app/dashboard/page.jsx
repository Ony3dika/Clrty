"use client";
import React from "react";
import Overview from "./components/overview";
import Expenses from "./components/expenses";
import Tasks from "./components/tasks";
import Calendar from "./components/calendar";
import { motion } from "framer-motion";

const DashboardPage = () => {
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <main className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4'>
        {/* Overview */}
        <div className='bg-card rounded-xl lg:col-span-2 xl:col-span-1 xl:row-span-2'>
          <Overview />
        </div>
        <div className='bg-card rounded-xl lg:col-span-2 xl:col-span-2 2xl:col-span-3'>
          <Expenses />
        </div>
        {/* Tasks */}
        <div className='bg-card rounded-xl'>
          <Tasks />
        </div>

        <div className='bg-card rounded-xl xl:col-span-2 2xl:col-span-2'>
          <Calendar />
        </div>
        {/* Expenses */}
      </main>
    </motion.div>
  );
};

export default DashboardPage;
