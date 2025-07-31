"use client";
import React, { useState } from "react";
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
import { CalendarCheckIcon, Loader2, Plus, Wallet } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Calendar } from "../../../components/ui/calendar";
import {
  addFinanceOptions,
  fetchFinanceOptions,
} from "../../../lib/financeQueryFunctions";
import { useQuery } from "@tanstack/react-query";
import { cn } from "../../../lib/utils";
import { toast } from "sonner";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { Skeleton } from "../../../components/ui/skeleton";
import { useStore } from "../../store";
import BlurredPage from "../../../components/blurred-page";
import Link from "next/link";
const FinancePage = () => {
  const user = useStore((state) => state.user);

  const [date, setDate] = useState("");
  const [open, setOpen] = useState(false);

  const [financeForm, setFinanceForm] = useState({
    amount: "",
    budget: "",
    description: "",
    date: new Date(),
  });

  const { data: budgetInfo, isPending: isBudgetPending } = useQuery(
    fetchFinanceOptions()
  );

  const budget = budgetInfo?.data[0]?.budget;
  const expenditures = budgetInfo?.data[0]?.expenditures || [];
  const {
    mutate: addExpense,
    isPending,
    error,
    isSuccess,
  } = addFinanceOptions();
  const handleFinance = (e) => {
    e.preventDefault();
    addExpense(financeForm);
    toast.success("Expense added successfully.");
    setFinanceForm({
      amount: "",
      description: "",
      date: new Date(),
    });
  };
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

            <form onSubmit={handleFinance}>
              <div className='grid gap-4'>
                <div className='grid gap-3'>
                  <Label htmlFor='budget'>Budget</Label>
                  {/* Budget */}
                  <div className='relative'>
                    <Input
                      type={"number"}
                      disabled={budget}
                      value={financeForm.budget}
                      required
                      placeholder='0.00'
                      className={"peer ps-6 pe-12"}
                      onChange={(e) =>
                        setFinanceForm({
                          ...financeForm,
                          budget: e.target.value,
                        })
                      }
                    />
                    <span className='text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50'>
                      $
                    </span>
                    <span className='text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50'>
                      USD
                    </span>
                  </div>
                  {/* Amount */}
                </div>

                <div className='grid gap-3'>
                  <Label htmlFor='amount'>Amount</Label>
                  {/* Budget */}
                  <div className='relative'>
                    <Input
                      type={"number"}
                      value={financeForm.amount}
                      required
                      placeholder='0.00'
                      className={"peer ps-6 pe-12"}
                      onChange={(e) =>
                        setFinanceForm({
                          ...financeForm,
                          amount: e.target.value,
                        })
                      }
                    />
                    <span className='text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50'>
                      $
                    </span>
                    <span className='text-muted-foreground pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm peer-disabled:opacity-50'>
                      USD
                    </span>
                  </div>
                </div>

                <div className='grid gap-3'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea
                    value={financeForm.description}
                    onChange={(e) =>
                      setFinanceForm({
                        ...financeForm,
                        description: e.target.value,
                      })
                    }
                    className={"resize-none"}
                    placeholder='Optional info'
                  ></Textarea>
                </div>
                <Label htmlFor='date'>Date</Label>

                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      id='date'
                      className='w-full justify-between font-normal'
                    >
                      {financeForm.date
                        ? financeForm.date.toLocaleDateString()
                        : "Select Date"}
                      <CalendarCheckIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className='w-auto overflow-hidden p-0'
                    align='start'
                  >
                    <Calendar
                      mode='single'
                      selected={date}
                      onSelect={(date) => {
                        setFinanceForm({ ...financeForm, date: date });
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <DialogFooter className={"mt-5"}>
                <DialogClose asChild>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>
                <Button disabled={isPending} type='submit'>
                  {isPending ? (
                    <Loader2
                      className={cn("", { "animate-spin": isPending == true })}
                    />
                  ) : (
                    "Add"
                  )}{" "}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <div className='bg-card rounded-xl col-span-3'>
          <Expenses />
        </div>

        <div className='bg-card rounded-xl mt-5 col-span-3 p-3'>
          <h1 className='text-2xl font-semibold'>Finance Overview</h1>
          <ScrollArea className='h-[300px] mt-3'>
            <Table>
              <TableCaption>A list of your Expenses.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>Invoice</TableHead>
                  <TableHead>Desc</TableHead>
                  <TableHead className={"text-center"}>Date</TableHead>
                  <TableHead className='text-right'>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isBudgetPending &&
                  [1, 2, 3, 4, 5].map((index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton className={"h-4"} />
                      </TableCell>
                      <TableCell>
                        <Skeleton className={"h-4"} />
                      </TableCell>
                      <TableCell>
                        <Skeleton className={"h-4"} />
                      </TableCell>
                      <TableCell>
                        <Skeleton className={"h-4"} />
                      </TableCell>
                    </TableRow>
                  ))}
                {expenditures?.map((expense, index) => {
                  const date = new Date(expense.date);
                  const month = date.toLocaleString("default", {
                    month: "short",
                  });
                  const day = date.getDate().toString().padStart(2, "0");
                  const formattedDate = `${month} -${day}`;
                  return (
                    <TableRow key={expense._id}>
                      <TableCell className='font-medium'>
                        EXP-{index + 1}
                      </TableCell>
                      <TableCell>
                        {expense.description ? expense.description : "NULL"}
                      </TableCell>
                      <TableCell className={"text-center"}>
                        {formattedDate}
                      </TableCell>
                      <TableCell className='text-right'>
                        ${expense.amount}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      </main>
    </motion.div>
  );
};

export default FinancePage;
