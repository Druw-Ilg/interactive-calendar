// context/EventContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

interface EventContextType {
  events: Event[];
  addEvent: (event: Event) => void;
  getEventsForDate: (date: Date) => Event[];
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (event: Event) => {
    setEvents((prev) => [...prev, event]);
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(
      (evt) => evt.start.toDateString() === date.toDateString()
    );
  };

  return (
    <EventContext.Provider value={{ events, addEvent, getEventsForDate }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = (): EventContextType => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within EventProvider");
  }
  return context;
};
