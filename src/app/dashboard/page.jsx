import React from "react";
import Expenses from "./components/expenses";

const DashboardPage = () => {
  return (
    <main className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4'>
      <div className='bg-card h-[50vh] border p-4 rounded-xl lg:col-span-2 xl:col-span-1 2xl:col-span-3'>
       <Expenses/>
      </div>
      <div className='bg-card border p-4 rounded-xl'></div>
      <div className='bg-card border p-4 rounded-xl lg:col-span-2 xl:col-span-1 2xl:col-span-2'>
        ber
      </div>
      <div className='bg-card border p-4 rounded-xl lg:col-span-2 xl:col-span-1 2xl:col-span-2'></div>
    </main>
  );
};

export default DashboardPage;
