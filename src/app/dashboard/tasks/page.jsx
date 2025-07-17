"use client";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";
import { CalendarCheck, Plus, CalendarCheckIcon } from "lucide-react";

import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../../../components/ui/dialog";
import { Calendar } from "../../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group";
const TaskPage = () => {
  // {
  //     id: 1,
  //     title: "Design homepage mockup",
  //     status: "completed",
  //     assignee: "Chidi",
  //     priority: "high",
  //     due: "Jul 18",
  //   },
  //   {
  //     id: 2,
  //     title: "Set up project repo",
  //     status: "in-progress",
  //     assignee: "Ada",
  //     priority: "medium",
  //     due: "Jul 20",
  //   },
  //   {
  //     id: 3,
  //     title: "Write content plan",
  //     status: "pending",
  //     assignee: "Uche",
  //     priority: "low",
  //     due: "Jul 22",
  //   },
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: null,
    priority: "high",
  });
  const [date, setDate] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      ...formData,
      id: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);

    // Optional: Reset form
    setFormData({
      title: "",
      description: "",
      assignee: "",
      dueDate: null,
      priority: "high",
    });
    setDate(null); // if you're using separate state for date
    console.log(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <main>
        <div className='flex items-center '>
          {" "}
          <CalendarCheck className='bg-primary rounded-full p-0.5' />
          <h1 className='font-semibold ml-2'>Tasks</h1>
        </div>

        {/* Add Task Dialog */}
        <Dialog>
          <form onSubmit={()=>{handleSubmit(e)}}>
            <DialogTrigger asChild>
              <Button className={"my-5"} variant='outline'>
                {" "}
                <Plus /> Add Tasks
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Add Task</DialogTitle>
                <DialogDescription>
                  Add a new task to the list
                </DialogDescription>
              </DialogHeader>
              <div className='grid gap-4'>
                {/* Task Title */}
                <div className='grid gap-3'>
                  <Label htmlFor='name-1'>Title</Label>
                  <Input
                    value={formData.title}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    id='name-1'
                    name='title'
                    placeholder='New Task'
                  />
                </div>

                {/* Task Description */}
                <div className='grid gap-3'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea
                    value={formData.description}
                    required
                    className={"resize-none"}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder='Describe the task'
                  />
                </div>
                {/* Task Assignee */}
                <div className='grid gap-3'>
                  <Label htmlFor='name-2'>Assignee</Label>
                  <Input
                    value={formData.assignee}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, assignee: e.target.value })
                    }
                    id='name-2'
                    name='asignee'
                    placeholder='Ada'
                  />
                </div>

                {/* Task Due Date */}
                <Label htmlFor='date'>Due Date</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      id='date'
                      className='w-full justify-between font-normal'
                    >
                      {formData.dueDate
                        ? formData.dueDate.toLocaleDateString()
                        : "Select date"}
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
                      captionLayout='dropdown'
                      onSelect={(date) => {
                        setFormData({ ...formData, dueDate: date });
                        setOpen(false);
                      }}
                    />
                  </PopoverContent>
                </Popover>

                <Label htmlFor='priority'>Priority</Label>
                {/* Task Priority */}
                <RadioGroup
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData({ ...formData, priority: value })
                  }
                  className={"flex"}
                  defaultValue='high'
                >
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      code={"fill-red-500"}
                      value='high'
                      id='high'
                    />
                    <Label htmlFor='high'>High</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      code='fill-yellow-500'
                      value='medium'
                      id='medium'
                    />
                    <Label htmlFor='medium'>Medium</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <RadioGroupItem
                      code='fill-green-500'
                      value='low'
                      id='low'
                    />
                    <Label htmlFor='low'>Low</Label>
                  </div>
                </RadioGroup>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant='outline'>Cancel</Button>
                </DialogClose>
                <Button type='submit'>Add</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>

        {/* Tasks */}
        <section className='grid md:grid-cols-3 grid-cols-1 gap-4 h-96'>
          <div className='bg-secondary rounded'></div>

          <div className='bg-secondary rounded'></div>
          <div className='bg-secondary rounded'></div>
        </section>
      </main>
    </motion.div>
  );
};

export default TaskPage;
