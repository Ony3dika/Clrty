import React from "react";
import Component from "../../../components/custom-calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
const Calendar = () => {
  return (
    <Card className={"h-full"}>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
        <CardDescription>Don't get stuck behind...</CardDescription>
      </CardHeader>
      <CardContent className={"flex md:justify-start justify-center items-center"}>
        <Component />
      </CardContent>
    </Card>
  );
};

export default Calendar;
