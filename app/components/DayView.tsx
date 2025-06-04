// Displays DayView
"use client";
import React from "react";
import { format } from "date-fns";
import { useEventContext, Event } from "@/app/context/EventContext";

interface DayViewProps {
  currentDate: Date;
  onEventClick: (event: Event) => void;
}

export const DayView: React.FC<DayViewProps> = ({
  currentDate,
  onEventClick,
}) => {
  const { getEventsForDate } = useEventContext();
  const events = getEventsForDate(currentDate);

  return (
    <div className="bg-white h-screen">
      <div className="font-semibold ml-3 mb-2">
        {format(currentDate, "eee")} <br /> {format(currentDate, "d")}
      </div>
      <div className="space-y-2">
        {events.length > 0 ? (
          events.map((evt) => (
            <div
              key={evt.id}
              onClick={() => onEventClick(evt)}
              className="p-2 bg-green-200 rounded cursor-pointer hover:bg-green-300"
            >
              <div className="font-medium">{evt.title}</div>
              <div className="text-xs">
                {format(evt.start, "hh:mm a")} - {format(evt.end, "hh:mm a")}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No events for today.</div>
        )}
      </div>
    </div>
  );
};
