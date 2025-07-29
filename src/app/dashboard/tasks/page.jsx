"use client";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "../../../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
  CalendarCheck,
  Plus,
  CalendarCheckIcon,
  CircleCheckBig,
  Timer,
  BriefcaseBusiness,
  CalendarClock,
  User2Icon,
  Ellipsis,
  File,
  Loader2,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
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
import { ScrollArea } from "../../../components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { cn } from "../../../lib/utils";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  fetchTaskOptions,
  addTaskOptions,
  updateStatusOptions,
  deleteTaskOptions,
} from "../../../lib/taskQueryFunctions.jsx";
import { useStore } from "../../store";
import BlurredPage from "../../../components/blurred-page";
const TaskPage = () => {
  const user = useStore((state) => state.user);
  if (!user.email) {
    return <BlurredPage />;
  }

  const [open, setOpen] = useState(false);

  const { data: tasks, isPending, error } = useQuery(fetchTaskOptions());
  const { mutate: addTask, isPending: isMutating } = addTaskOptions();

  const { mutate: updateStatus } = updateStatusOptions();

  const { mutate: deleteTask } = deleteTaskOptions();
  // Error handling
  if (error) {
    toast.error("Failed to fetch tasks");
  }

  const pendingTasks = tasks?.data.filter((task) => task.status === "pending");
  const uncompletedTasks = tasks?.data.filter(
    (task) => task.status === "in-progress"
  );
  const completedTasks = tasks?.data.filter(
    (task) => task.status === "completed"
  );
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: new Date(),
    priority: "high",
  });
  const [date, setDate] = useState("");

  // Save Tasks
  const handleSubmit = (e) => {
    e.preventDefault();

    addTask(formData);
    // Optional: Reset form
    setFormData({
      title: "",
      description: "",
      assignee: "",
      dueDate: null,
      priority: "high",
    });
    setDate(null);
    toast.success("Task created.", {
      description: "Your task has been added.",
      action: {
        icon: "Close",
        onClick: () => toast.dismiss(),
      },
    });
  };

  //Update Task
  const updateTaskStatus = async (taskId, status) => {
    updateStatus({ taskId, status });
    toast.info(`Task status updated to ${status}`);
  };

  const handleDelete = async (taskId) => {
    deleteTask(taskId);
    toast.info("Task deleted successfully.");
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <main className='h-full flex flex-col overflow-hidden'>
        <div className='flex items-center '>
          {" "}
          <CalendarCheck className='border size-7 rounded-md p-2 bg-background dark:bg-input/30 dark:border-input' />
          <h1 className='font-semibold ml-2'>Tasks</h1>
        </div>

        {/* Add Task Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className={"my-5 w-fit"} variant='outline'>
              {" "}
              <Plus /> Add Tasks
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>

              <DialogDescription>Add a new task to the list</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
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
              <DialogFooter className={"mt-5"}>
                <DialogClose asChild>
                  <Button variant='outline'>Cancel</Button>
                </DialogClose>
                <Button disabled={isMutating} type='submit'>
                  {isMutating ? (
                    <Loader2
                      className={cn("", { "animate-spin": isMutating == true })}
                    />
                  ) : (
                    "Add Task"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Tasks */}
        <section className='grid flex-1 md:grid-cols-3 grid-cols-1 gap-4 overflow-auto md:mb-0 mb-5'>
          {/* Working */}
          <div className='bg-secondary rounded-md flex flex-col'>
            {" "}
            <div className='flex justify-between items-center p-2 rounded-t-md bg-input'>
              {" "}
              <div className='flex items-center'>
                <BriefcaseBusiness className='text-blue-500 size-5' />
                <p className='text-sm ml-2'>Backlog</p>
              </div>
              <button className='cursor-pointer'>
                <File size={20} />
              </button>
            </div>
            <ScrollArea className='h-fit lg:h-[60vh] p-2 flex flex-col'>
              {isPending &&
                [1, 2, 3].map((index) => (
                  <Card
                    className={"p-3 shadow-none rounded-xl gap-3 my-2"}
                    key={index}
                  >
                    <Skeleton className={"p-0 h-4"} />

                    <Skeleton className={"p-0 h-8 my-3"} />
                    <Skeleton className={"p-0 h-4"} />
                  </Card>
                ))}

              {pendingTasks?.map((task) => (
                <Card
                  key={task._id}
                  className={"p-3 shadow-none rounded-xl gap-3 my-2"}
                >
                  <CardHeader className={"p-0"}>
                    <CardTitle
                      className={
                        "text-sm flex items-center font-normal justify-between"
                      }
                    >
                      {task.title}

                      {/* DropDown to Move to Progress Column */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost'>
                            <Ellipsis />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-40'>
                          <DropdownMenuLabel>Status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup
                            value={task.status}
                            onValueChange={(value) =>
                              updateTaskStatus(task._id, value)
                            }
                          >
                            <DropdownMenuRadioItem
                              value='in-progress'
                              className={"px"}
                            >
                              In Progress
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value='completed'>
                              Completed
                            </DropdownMenuRadioItem>
                            <Button
                              variant={"ghost"}
                              className={
                                "focus:text-accent-foreground text-red-500 relative flex justify-start cursor-default items-center rounded-sm py-1.5 text-sm outline-hidden w-full"
                              }
                              onClick={() => handleDelete(task._id)}
                            >
                              <Trash2 className='mr-1' />
                              Delete
                            </Button>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardTitle>
                    <CardDescription className={"flex items-center mt-2"}>
                      <User2Icon size={20} className='mr-1' />

                      <p>{task.assignee}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className={"p-0"}>
                    <CardDescription>{task.description}</CardDescription>
                  </CardContent>
                  <CardFooter
                    className={
                      "p-0 mt-2 flex justify-between items-center text-sm"
                    }
                  >
                    <div className='flex items-center text-muted-foreground'>
                      <CalendarClock size={20} className='mr-1' />{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : "No due date"}
                    </div>
                    <div
                      className={cn("text-sm border px-2 py-0.5 rounded", {
                        "bg-red-500/60 border-red-500":
                          task.priority === "high",
                        "bg-yellow-500/60 border-yellow-500":
                          task.priority === "medium",
                        "bg-green-500/60 border-green-500":
                          task.priority === "low",
                      })}
                    >
                      {task.priority}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </ScrollArea>
          </div>

          {/* In Progress */}
          <div className='bg-secondary rounded-md'>
            <div className='flex justify-between items-center p-2 rounded-t-md bg-input '>
              {" "}
              <div className='flex items-center'>
                <Timer className='text-yellow-500 size-5' />
                <p className='text-sm ml-2'>In Progress</p>
              </div>
              <button className='cursor-pointer'>
                <File size={20} />
              </button>
            </div>

            <ScrollArea className='h-fit lg:h-[60vh] p-2 flex flex-col'>
              {isPending &&
                [1, 2, 3].map((index) => (
                  <Card
                    className={"p-3 shadow-none rounded-xl gap-3 my-2"}
                    key={index}
                  >
                    <Skeleton className={"p-0 h-4"} />

                    <Skeleton className={"p-0 h-8 my-3"} />
                    <Skeleton className={"p-0 h-4"} />
                  </Card>
                ))}

              {uncompletedTasks?.map((task) => (
                <Card
                  key={task._id}
                  className={"p-3 shadow-none rounded-xl gap-3 my-2"}
                >
                  <CardHeader className={"p-0"}>
                    <CardTitle
                      className={
                        "text-sm flex items-center font-normal justify-between"
                      }
                    >
                      {task.title}
                      {/* DropDown to Move to Progress Column */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost'>
                            <Ellipsis />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-40'>
                          <DropdownMenuLabel>Status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup
                            value={task.status}
                            onValueChange={(value) =>
                              updateTaskStatus(task._id, value)
                            }
                          >
                            <DropdownMenuRadioItem
                              value='pending'
                              className={"px"}
                            >
                              Not Started
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value='completed'>
                              Completed
                            </DropdownMenuRadioItem>
                            <Button
                              variant={"ghost"}
                              className={
                                "focus:text-accent-foreground text-red-500 relative flex justify-start cursor-default items-center rounded-sm py-1.5 text-sm outline-hidden w-full"
                              }
                              onClick={() => handleDelete(task._id)}
                            >
                              <Trash2 className='mr-1' />
                              Delete
                            </Button>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardTitle>
                    <CardDescription className={"flex items-center mt-2"}>
                      <User2Icon size={20} className='mr-1' />

                      <p>{task.assignee}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className={"p-0"}>
                    <CardDescription>{task.description}</CardDescription>
                  </CardContent>
                  <CardFooter
                    className={
                      "p-0 mt-2 flex justify-between items-center text-sm"
                    }
                  >
                    <div className='flex items-center text-muted-foreground'>
                      <CalendarClock size={20} className='mr-1' />{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : "No due date"}
                    </div>
                    <div
                      className={cn("text-sm border px-2 py-0.5 rounded", {
                        "bg-red-500/60 border-red-500":
                          task.priority === "high",
                        "bg-yellow-500/60 border-yellow-500":
                          task.priority === "medium",
                        "bg-green-500/60 border-green-500":
                          task.priority === "low",
                      })}
                    >
                      {task.priority}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </ScrollArea>
          </div>

          {/* Completed */}
          <div className='bg-secondary rounded-md'>
            <div className='flex justify-between items-center p-2 rounded-t-md bg-input '>
              {" "}
              <div className='flex items-center'>
                <CircleCheckBig className='text-green-500 size-5' />
                <p className='text-sm ml-2'>Completed</p>
              </div>
              <button className='cursor-pointer'>
                <File size={20} />
              </button>
            </div>

            <ScrollArea className='h-fit lg:h-[60vh] p-2 flex flex-col'>
              {isPending &&
                [1, 2, 3].map((index) => (
                  <Card
                    className={"p-3 shadow-none rounded-xl gap-3 my-2"}
                    key={index}
                  >
                    <Skeleton className={"p-0 h-4"} />

                    <Skeleton className={"p-0 h-8 my-3"} />
                    <Skeleton className={"p-0 h-4"} />
                  </Card>
                ))}

              {completedTasks?.map((task) => (
                <Card
                  key={task._id}
                  className={"p-3 shadow-none rounded-xl gap-3 my-2"}
                >
                  <CardHeader className={"p-0"}>
                    <CardTitle
                      className={
                        "text-sm flex items-center font-normal justify-between"
                      }
                    >
                      {task.title}
                      {/* DropDown to Move to Progress Column */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost'>
                            <Ellipsis />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-40'>
                          <DropdownMenuLabel>Status</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuRadioGroup
                            value={task.status}
                            onValueChange={(value) =>
                              updateTaskStatus(task._id, value)
                            }
                          >
                            <DropdownMenuRadioItem
                              value='pending'
                              className={"px"}
                            >
                              Not Started
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem
                              value='in-progress'
                              className={"px"}
                            >
                              In Progress
                            </DropdownMenuRadioItem>
                            <Button
                              variant={"ghost"}
                              className={
                                "focus:text-accent-foreground text-red-500 relative flex justify-start cursor-default items-center rounded-sm py-1.5 text-sm outline-hidden w-full"
                              }
                              onClick={() => handleDelete(task._id)}
                            >
                              <Trash2 className='mr-1' />
                              Delete
                            </Button>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardTitle>
                    <CardDescription className={"flex items-center mt-2"}>
                      <User2Icon size={20} className='mr-1' />

                      <p>{task.assignee}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className={"p-0"}>
                    <CardDescription>{task.description}</CardDescription>
                  </CardContent>
                  <CardFooter
                    className={
                      "p-0 mt-2 flex justify-between items-center text-sm"
                    }
                  >
                    <div className='flex items-center text-muted-foreground'>
                      <CalendarClock size={20} className='mr-1' />{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : "No due date"}
                    </div>
                    <div
                      className={cn("text-sm border px-2 py-0.5 rounded", {
                        "bg-red-500/60 border-red-500":
                          task.priority === "high",
                        "bg-yellow-500/60 border-yellow-500":
                          task.priority === "medium",
                        "bg-green-500/60 border-green-500":
                          task.priority === "low",
                      })}
                    >
                      {task.priority}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </ScrollArea>
          </div>
        </section>
      </main>
    </motion.div>
  );
};

export default TaskPage;
