// Displays EventModal
"use client";
import React, { useState } from "react";
import { useEventContext, Event } from "@/app/context/EventContext";
import { v4 as uuidv4 } from "uuid";
import { formatISO } from "date-fns";

interface EventModalProps {
  show: boolean;
  closeModal: () => void;
  defaultDate?: Date;
}

export const EventModal: React.FC<EventModalProps> = ({
  show,
  closeModal,
  defaultDate,
}) => {
  const { addEvent } = useEventContext();
  const [title, setTitle] = useState("");
  const [start, setStart] = useState(
    defaultDate ? formatISO(defaultDate).substring(0, 16) : ""
  );
  const [end, setEnd] = useState(
    defaultDate ? formatISO(defaultDate).substring(0, 16) : ""
  );
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create Event object
    const newEvent: Event = {
      id: uuidv4(),
      title,
      start: new Date(start),
      end: new Date(end),
      description,
    };
    addEvent(newEvent);
    closeModal();
  };

  if (!show) return null;

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center ">
      <div className="bg-foreground rounded-4xl p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Create New Event</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            aria-label="title"
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <label htmlFor="startDate" className="text-sm">
            Start Date & Time
          </label>
          <input
            type="datetime-local"
            id="startDate"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <label htmlFor="endDate" className="text-sm">
            End Date & Time
          </label>
          <input
            type="datetime-local"
            id="endDate"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <textarea
            placeholder="Description (optional)"
            aria-label="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded h-20"
          />
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
