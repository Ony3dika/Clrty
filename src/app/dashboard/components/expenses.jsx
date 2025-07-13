"use client";
import React from "react";
import { TrendingUp, DollarSign } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive bar chart";
const chartData = [
  { date: "2025-07-01", expense: 222 },
  { date: "2025-07-02", expense: 150 },
  { date: "2025-07-03", expense: 300 },
  { date: "2025-07-04", expense: 100 },
  { date: "2025-07-05", expense: 250 },
  { date: "2025-07-06", expense: 200 },
  { date: "2025-07-07", expense: 120 },
  { date: "2025-07-08", expense: 180 },
  { date: "2025-07-09", expense: 150 },
  { date: "2025-07-10", expense: 280 },
  { date: "2025-07-11", expense: 220 },
  { date: "2025-07-12", expense: 300 },
  { date: "2025-07-13", expense: 250 },
  { date: "2025-07-14", expense: 200 },
  { date: "2025-07-15", expense: 150 },
  { date: "2025-07-16", expense: 100 },
  { date: "2025-07-17", expense: 180 },
  { date: "2025-07-18", expense: 220 },
  { date: "2025-07-19", expense: 250 },
  { date: "2025-07-20", expense: 300 },
  { date: "2025-07-21", expense: 280 },
  { date: "2025-07-22", expense: 200 },
  { date: "2025-07-23", expense: 150 },
  { date: "2025-07-24", expense: 180 },

  { date: "2025-07-31", expense: 100 },
];

const totalExpense = chartData.reduce((acc, curr) => acc + curr.expense, 0);

const chartConfig = {
  views: {
    label: "Daily Expenditure",
  },
  expense: {
    label: "Daily Expenditure",
    color: "var(--chart-2)",
  },
};
const Expenses = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses This Month</CardTitle>
        <CardDescription>July 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className={"max-h-[200px] w-full"} config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                const month = date.toLocaleString("default", {
                  month: "short",
                });
                const day = date.getDate().toString().padStart(2, "0");
                return `${month} -${day}`;
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey='expense' fill='var(--color-expense)' radius={8}></Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 leading-none font-medium text-lg'>
          $ {totalExpense}
        </div>
        <div>Get that Green rolling</div>
      </CardFooter>
    </Card>
  );
};

export default Expenses;
