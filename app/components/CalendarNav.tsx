// components/CalendarNav.tsx
"use client";
import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { format } from "date-fns";

interface CalendarNavProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  view: "month" | "week" | "day";
  setView: (view: "month" | "week" | "day") => void;
  onCreateClick: () => void;
}

export const CalendarNav: React.FC<CalendarNavProps> = ({
  currentDate,
  setCurrentDate,
  view,
  setView,
  onCreateClick,
}) => {
  const goToToday = () => setCurrentDate(new Date());

  const goToPrevious = () => {
    const prev = new Date(currentDate);
    if (view === "month") {
      prev.setMonth(prev.getMonth() - 1);
    } else if (view === "week") {
      prev.setDate(prev.getDate() - 7);
    } else {
      prev.setDate(prev.getDate() - 1);
    }
    setCurrentDate(prev);
  };

  const goToNext = () => {
    const nxt = new Date(currentDate);
    if (view === "month") {
      nxt.setMonth(nxt.getMonth() + 1);
    } else if (view === "week") {
      nxt.setDate(nxt.getDate() + 7);
    } else {
      nxt.setDate(nxt.getDate() + 1);
    }
    setCurrentDate(nxt);
  };

  const displayShortDate = () => {
    if (view === "month" || view === "week") {
      return format(currentDate, "MMMM yyyy");
    } else {
      return format(currentDate, "MMMM d, yyyy");
    }
  };

  return (
    <div className="relative mb-4">
      {/* Mobile Create Button: top-left over calendar */}
      <button
        onClick={onCreateClick}
        className="absolute top-0 left-3 z-10 p-2 border border-gray-400 rounded-full md:hidden shadow-md"
        aria-label="Create Event"
      >
        <PlusIcon className="h-5 w-5" />
      </button>

      {/* Desktop Nav Bar */}
      <div className="hidden md:flex items-center justify-between mx-3">
        <div className="flex items-center gap-2">
          <button
            onClick={onCreateClick}
            className="px-3 py-1 border border-gray-400 rounded-full hover:bg-gray-100"
          >
            + Create
          </button>
          <button
            onClick={goToToday}
            className="px-2 py-1 border-gray-400 text-black rounded-full hover:bg-gray-200 border"
          >
            Today
          </button>
          <button
            onClick={goToPrevious}
            className="p-2 rounded hover:bg-gray-200"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button onClick={goToNext} className="p-2 rounded hover:bg-gray-200">
            <ChevronRightIcon className="h-5 w-5" />
          </button>
          <h1 className="ml-2 font-[400] text-2xl">{displayShortDate()}</h1>
        </div>

        <select
          value={view}
          onChange={(e) => setView(e.target.value as "month" | "week" | "day")}
          className="px-2 py-1 border border-gray-500 rounded-full text-gray-700 hover:bg-gray-100"
        >
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="day">Day</option>
        </select>
      </div>

      {/* Mobile Nav Controls: stacked, full-width */}
      <div className="flex md:hidden flex-col gap-2 pt-10 mx-3">
        <div className="flex items-center justify-between">
          <button
            onClick={goToToday}
            className="text-xs flex-1 p-1 text-black rounded-full hover:bg-gray-200 border border-gray-400"
          >
            Today
          </button>
          <button
            onClick={goToPrevious}
            className="p-1 rounded hover:bg-gray-200"
          >
            <ChevronLeftIcon className="h-3 w-3" />
          </button>
          <button onClick={goToNext} className="p-1 rounded hover:bg-gray-200">
            <ChevronRightIcon className="h-3 w-3" />
          </button>
          <h1 className="font-[400] text-lg">{displayShortDate()}</h1>
          <select
            value={view}
            onChange={(e) =>
              setView(e.target.value as "month" | "week" | "day")
            }
            className="px-2 py-1 border border-gray-400 rounded-full text-gray-700"
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
        </div>
      </div>
    </div>
  );
};
