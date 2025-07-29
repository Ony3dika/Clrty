"use client";
import React from "react";
import Overview from "./components/overview";
import Expenses from "./components/expenses";
import Tasks from "./components/tasks";
import Calendar from "./components/calendar";
import { motion } from "framer-motion";
import BlurredPage from "../../components/blurred-page";
import { useStore } from "../store";

const DashboardPage = () => {
  const user = useStore((state) => state.user);
  if (!user.email) {
    return <BlurredPage />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <main className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4'>
        {/* Overview */}
        <div className='bg-card rounded-xl lg:col-span-2 xl:col-span-1 xl:row-span-2'>
          <Overview />
        </div>
        <div className='bg-card rounded-xl lg:col-span-2 xl:col-span-3 2xl:col-span-3'>
          <Expenses />
        </div>
        {/* Tasks */}
        <div className='bg-card rounded-xl'>
          <Tasks />
        </div>

        <div className='bg-card rounded-xl lg:col-span-1 xl:col-span-2 2xl:col-span-2'>
          <Calendar />
        </div>
        {/* Expenses */}
      </main>
    </motion.div>
  );
};

export default DashboardPage;
