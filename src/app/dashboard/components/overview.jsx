"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { CalendarClock } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import Link from "next/link";
import { Skeleton } from "../../../components/ui/skeleton";
import { fetchTaskOptions } from "../../../lib/taskQueryFunctions.jsx";
const Overview = () => {
  const { data, isPending } = useQuery(fetchTaskOptions());

  return (
    <Card className={"h-full"}>
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <CardDescription>
          <div className='text-muted-foreground flex items-center'>
            <p> On-Going Tasks</p>
            <div className='h-2 w-2 ml-2 rounded-full bg-yellow-400 animate-pulse'></div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col gap-y-3'>
          {isPending &&
            [1, 2, 3, 4, 5].map((index) => (
              <div key={index} className='border bg-secondary p-2 rounded-md'>
                <Skeleton className={"h-4"} />

                <Skeleton className={"h-8 my-3 "} />
                <Skeleton className={"h-4"} />
              </div>
            ))}
          {data &&
            data.data
              .filter((task) => task.status === "in-progress")
              .slice(0, 5)
              .map((task, index) => (
                <div key={index} className='border bg-secondary p-2 rounded-md'>
                  <div className='flex justify-between items-center'>
                    <h2 className='font-semibold text-base'>{task.title}</h2>
                  </div>
                  <p className='text-sm my-3 text-muted-foreground'>
                    {task.description}
                  </p>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center text-muted-foreground text-sm'>
                      <CalendarClock size={20} className='mr-1' />{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : "No due date"}
                    </div>{" "}
                    <div
                      className={cn("text-xs border px-2 py-0.5 rounded", {
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
                  </div>
                </div>
              ))}
          <Button asChild variant={"outline"} className='mt-auto w-full'>
            <Link href={"/dashboard/tasks"}>View All</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Overview;
