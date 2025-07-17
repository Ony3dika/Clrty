"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
const Overview = () => {
  return (
    <Card className={"h-full"}>
      <CardHeader>
        <CardTitle>
          Project: <span className='text-primary'>Zephyr Redevelopment</span>
        </CardTitle>
        <CardDescription>
          Redesing and develop the Zphyr application, enhancing the user
          experience and functionality.
          <div className='text-muted-foreground flex items-center'>
            <p>Status: In Progress</p>
            <div className='h-2 w-2 ml-2 rounded-full bg-yellow-400 animate-pulse'></div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Upcoming Deadline: Jul 20 - Launch Homepage</p>

       
      </CardContent>
    </Card>
  );
};

export default Overview;
