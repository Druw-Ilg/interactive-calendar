// Displays MonthView
"use client";
import React from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { useEventContext, Event } from "@/app/context/EventContext";

interface MonthViewProps {
  currentDate: Date;
  onEventClick: (event: Event) => void; // callback
}

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  onEventClick,
}) => {
  const { getEventsForDate } = useEventContext();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const firstWeek = endOfWeek(monthStart);

  const rows = [];
  let days = [];
  let day = startDate;

  // Build calendar grid rows
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      const formattedDate = format(day, "d");
      const formattedDayOfWeek = format(day, "eee");
      const events = getEventsForDate(cloneDay);
      days.push(
        <div
          key={day.toString()}
          className={`border border-gray-300 min-h-11 md:min-h-15 overflow-y-auto ${
            !isSameMonth(day, monthStart) ? "text-gray-400" : ""
          } `}
        >
          <div className="flex flex-col text-xs items-center">
            {day <= firstWeek && <span>{formattedDayOfWeek}</span>}
            <span
              className={`font-medium text-[14px] py-2 px-3.5 ${
                isSameDay(day, new Date())
                  ? "text-white rounded-full bg-blue-700"
                  : ""
              }`}
            >
              {formattedDate}
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
      day = addDays(day, 1);
    }
    rows.push(
      <div key={day.toString()} className="grid grid-cols-7">
        {days}
      </div>
    );
    days = [];
  }

  return <div className="bg-white h-screen">{rows}</div>;
};
