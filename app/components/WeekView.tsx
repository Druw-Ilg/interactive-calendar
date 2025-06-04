// Displays WeekView
"use client";
import React from "react";
import { startOfWeek, addDays, format, isSameDay } from "date-fns";
import { useEventContext, Event } from "@/app/context/EventContext";

interface WeekViewProps {
  currentDate: Date;
  onEventClick: (event: Event) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  onEventClick,
}) => {
  const { getEventsForDate } = useEventContext();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const days = [];

  for (let i = 0; i < 7; i++) {
    const day = addDays(weekStart, i);
    const events = getEventsForDate(day);
    days.push(
      <div
        key={day.toString()}
        className="flex-1 p-2 bg-white border border-gray-300 min-h-11 md:min-h-15 overflow-y-auto"
      >
        <div className="flex flex-col text-xs items-center">
          <span>{format(day, "eee")}</span>
          <span
            className={`font-medium md:text-xl text-xs text-center ${
              isSameDay(day, new Date())
                ? "text-white rounded-full bg-blue-700 md:py-3 md:px-5 py-1 px-2"
                : ""
            }`}
          >
            {format(day, "d")}
          </span>
        </div>
        {events.map((evt) => (
          <div
            key={evt.id}
            onClick={() => onEventClick(evt)}
            className="mt-1 bg-green-200 text-xs rounded px-1 truncate cursor-pointer hover:bg-green-300"
          >
            {evt.title}
          </div>
        ))}
      </div>
    );
  }

  return <div className="flex bg-white h-screen">{days}</div>;
};
