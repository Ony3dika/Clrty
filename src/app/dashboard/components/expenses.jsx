"use client";
import React from "react";
import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart";
import { fetchFinanceOptions } from "../../../lib/financeQueryFunctions";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../../../components/ui/skeleton";
export const description = "An interactive bar chart";

const Expenses = () => {
  const {
    data: financeData,
    isPending,
    error,
  } = useQuery(fetchFinanceOptions());
  const chartConfig = {
    views: {
      label: "Daily Expenditure",
    },
    expense: {
      label: "Daily Expenditure",
      color: "var(--chart-2)",
    },
  };

  const chartData =
    financeData?.data[0]?.expenditures?.sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    ) || [];
  const budget = financeData?.data[0]?.budget || 0;
  const totalExpense = chartData?.reduce((acc, curr) => acc + curr.amount, 0);

  const percentageSpent = ((totalExpense / budget) * 100).toFixed(1) || 0;


  if (error) return <div>Error loading finance data</div>;
  if (isPending)
    return (
      <Card className={"h-full"}>
        <CardHeader>
          {" "}
          <CardTitle>Expenses This Month</CardTitle>
          <Skeleton className={"h-20 w-full"} />
        </CardHeader>

        <CardContent>
          <Skeleton className={"h-40 w-full"} />
        </CardContent>

        <CardFooter>
          <Skeleton className={"h-10 w-full"} />
        </CardFooter>
      </Card>
    );
  return (
    <Card className={"h-full"}>
      <CardHeader>
        <CardTitle>Expenses This Month</CardTitle>
        <section className='flex md:flex-row flex-col md:items-center my-3'>
          {/* Budget */}
          <div className='flex basis-1/3 flex-col justify-start border rounded-xl px-3 py-2'>
            <p className='text-sm text-muted-foreground'>Budget</p>
            <h2 className='font-semibold md:text-3xl text-2xl ml-0 p-0 font-sans'>
              $ {budget.toLocaleString("en-US")}
            </h2>
          </div>

          {/* Spent */}
          <div className='flex md:mt-0 mt-3 md:ml-5 basis-1/3 flex-col justify-start border rounded-xl px-3 py-2'>
            <p className='text-sm text-muted-foreground'>Spent</p>
            <div className='flex items-center'>
              {" "}
              <h2 className='font-semibold md:text-3xl text-2xl font-sans'>
                ${totalExpense.toLocaleString("en-US")}
              </h2>
              <div
                className={`ml-2 px-1 text-sm h-fit flex items-center rounded ${
                  percentageSpent > 100
                    ? " bg-red-400/30 text-red-400"
                    : "bg-green-400/30 text-green-400"
                }`}
              >
                <TrendingUp size={15} className='mr-1' />
                <span> {percentageSpent == "NaN" ? 0 : percentageSpent}</span>
              </div>
            </div>
          </div>
        </section>
        <CardDescription>July 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className={"max-h-[200px] w-full"} config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey='amount'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis
              dataKey='date'
              tickLine={false}
              tickMargin={5}
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
            />{" "}
            <defs>
              <linearGradient id='fillExpense' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-expense)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-expense)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              type='natural'
              dataKey='amount'
              fill='url(#fillExpense)'
              stroke='var(--color-expense)'
              fillOpacity={0.4}
            ></Area>
          </AreaChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 leading-none font-medium text-lg'>
          $ {totalExpense}
        </div>
        <div></div>
      </CardFooter> */}
    </Card>
  );
};

export default Expenses;
