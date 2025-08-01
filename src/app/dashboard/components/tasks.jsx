"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { ChartContainer } from "../../../components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { fetchTaskOptions } from "../../../lib/taskQueryFunctions.jsx";
import { Skeleton } from "../../../components/ui/skeleton";
export const description = "Weekly Task Completion";

const Tasks = () => {
  const { data, isPending } = useQuery(fetchTaskOptions());

  const totalTasks = data?.data.length;
  const completedTasks = data?.data.filter(
    (task) => task.status === "completed"
  ).length;
  const completionRate = (completedTasks / totalTasks) * 100;
  const endAngle = (completionRate / 100) * 360;
  const chartData = [
    {
      name: "Task Completion",
      value: completionRate,
      fill: "var(--chart-2)",
    },
  ];

  const chartConfig = {
    tasks: {
      label: "Tasks",
    },
  };
  return (
    <>
      {isPending && (
        <Card
          className={"h-full flex flex-col justify-center items-center p-4"}
        >
          <Skeleton className={"h-8 w-full"} />

          <Skeleton className={"h-32 w-full"} />
          <Skeleton className={"h-8 w-full"} />
        </Card>
      )}

      <Card className='flex flex-col h-full'>
        <CardHeader className='items-center pb-0'>
          <CardTitle className={"text-center"}>Project Progress</CardTitle>
          <CardDescription className={"text-center"}>
            Completion Rate
          </CardDescription>
        </CardHeader>
        <CardContent className='flex-1 pb-0'>
          <ChartContainer
            config={chartConfig}
            className='mx-auto aspect-square max-h-[200px]'
          >
            <RadialBarChart
              data={chartData}
              startAngle={0}
              endAngle={endAngle}
              innerRadius={80}
              outerRadius={110}
            >
              <PolarGrid
                gridType='circle'
                radialLines={false}
                stroke='none'
                polarRadius={[86, 74]}
              />
              <RadialBar dataKey='value' background cornerRadius={10} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor='middle'
                          dominantBaseline='middle'
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className='fill-foreground text-3xl font-bold'
                          >
                            {completedTasks}/{totalTasks}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className='fill-muted-foreground text-sm'
                          >
                            Completed
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className='flex-col gap-2 text-sm'>
          <div className='flex items-center gap-2 leading-none font-medium'>
            {completionRate.toFixed(1)}% of tasks done{" "}
            <TrendingUp className='h-4 w-4' />
          </div>
          <div className='text-muted-foreground leading-none'>
            Tracking team progress
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default Tasks;
