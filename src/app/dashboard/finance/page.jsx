"use client";
import React from "react";
import { motion } from "framer-motion";
import Expenses from "../components/expenses";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { CalendarCheck, Plus, Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
const FinancePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <main className='mb-4'>
        <div className='flex items-center '>
          {" "}
          <Wallet className='border size-7 rounded-md p-2 bg-background dark:bg-input/30 dark:border-input' />
          <h1 className='font-semibold ml-2'>Finance</h1>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button className={"my-5 w-fit"} variant='outline'>
              <Plus />
              Add Expenses
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add Expense</DialogTitle>

              <DialogDescription>Update Expenses</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <div className='bg-card rounded-xl col-span-3'>
          <Expenses />
        </div>

        <div className='bg-card rounded-xl mt-5 col-span-3 p-3'>
          <h1 className='text-2xl font-semibold'>Finance Overview</h1>

          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[100px]'>Invoice</TableHead>
                <TableHead>Desc</TableHead>
                <TableHead className={"text-center"}>Date</TableHead>
                <TableHead className='text-right'>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className='font-medium'>INV001</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell className={"text-center"}>Credit Card</TableCell>
                <TableCell className='text-right'>$250.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </motion.div>
  );
};

export default FinancePage;
