"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const timezones = [
  "UTC",
  "America/New_York",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Australia/Sydney",
  "Pacific/Auckland",
];

const TimezoneScheduler: React.FC = () => {
  const [selectedTimezones, setSelectedTimezones] = useState<string[]>([]);
  const [currentTimes, setCurrentTimes] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [selectedTimezones]);

  const updateTimes = () => {
    const newTimes: { [key: string]: string } = {};
    selectedTimezones.forEach((tz) => {
      newTimes[tz] = new Date().toLocaleTimeString("en-US", { timeZone: tz });
    });
    setCurrentTimes(newTimes);
  };

  const addTimezone = (timezone: string) => {
    if (!selectedTimezones.includes(timezone)) {
      setSelectedTimezones([...selectedTimezones, timezone]);
    }
  };

  const removeTimezone = (timezone: string) => {
    setSelectedTimezones(selectedTimezones.filter((tz) => tz !== timezone));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Timezone Meeting Scheduler</h1>
      <Select onValueChange={addTimezone}>
        <SelectTrigger>
          <SelectValue placeholder="Add a timezone" />
        </SelectTrigger>
        <SelectContent>
          {timezones.map((tz) => (
            <SelectItem key={tz} value={tz}>
              {tz}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-4">
        {selectedTimezones.map((tz) => (
          <Card key={tz} className="mb-2">
            <CardHeader className="py-2">
              <CardTitle className="text-sm font-medium">{tz}</CardTitle>
            </CardHeader>
            <CardContent className="py-2 flex justify-between items-center">
              <span>{currentTimes[tz]}</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeTimezone(tz)}
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TimezoneScheduler;
