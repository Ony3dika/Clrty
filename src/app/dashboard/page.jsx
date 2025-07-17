"use client";
import React from "react";
import Overview from "./components/overview";
import Expenses from "./components/expenses";
import Tasks from "./components/tasks";
import { motion } from "framer-motion";

const DashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <main className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4'>
        {/* Overview */}
        <div className='bg-card rounded-xl lg:col-span-2 xl:col-span-1 2xl:col-span-3'>
          <Overview />
        </div>
        {/* Tasks */}
        <div className='bg-card rounded-xl'>
          <Tasks />
        </div>
        {/* Expenses */}
        <div className='bg-card rounded-xl lg:col-span-2 xl:col-span-1 2xl:col-span-4'>
          <Expenses />
        </div>
      </main>
    </motion.div>
  );
};

export default DashboardPage;
