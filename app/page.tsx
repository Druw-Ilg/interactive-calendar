"use client";
import React, { useState } from "react";
import { EventProvider, Event } from "./context/EventContext";
import { CalendarNav } from "./components/CalendarNav";
import { MonthView } from "./components/MonthView";
import { WeekView } from "./components/WeekView";
import { DayView } from "./components/DayView";
import { EventModal } from "./components/EventModal";
import { EventDetailsModal } from "./components/EventDetailsModal";

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const openCreateModal = () => setShowCreateModal(true);

  // When an event is clicked we set it and open details
  const handleEventClick = (evt: Event) => {
    setSelectedEvent(evt);
    setShowDetailsModal(true);
  };

  return (
    <EventProvider>
      <main className="py-6">
        <div className="flex justify-between items-center mx-3 mb-4">
          <h1 className="text-2xl font-bold">My Calendar</h1>
        </div>
        <CalendarNav
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          view={view}
          setView={setView}
          onCreateClick={openCreateModal}
        />
        <div className="mt-4">
          {view === "month" && (
            <MonthView
              currentDate={currentDate}
              onEventClick={handleEventClick}
            />
          )}
          {view === "week" && (
            <WeekView
              currentDate={currentDate}
              onEventClick={handleEventClick}
            />
          )}
          {view === "day" && (
            <DayView
              currentDate={currentDate}
              onEventClick={handleEventClick}
            />
          )}
        </div>
        <EventModal
          show={showCreateModal}
          closeModal={() => setShowCreateModal(false)}
          defaultDate={currentDate}
        />
        <EventDetailsModal
          show={showDetailsModal}
          event={selectedEvent}
          closeModal={() => setShowDetailsModal(false)}
        />
      </main>
    </EventProvider>
  );
}
