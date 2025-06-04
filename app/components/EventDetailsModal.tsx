// Displays Event Details in a Modal
"use client";
import React from "react";
import { Event } from "@/app/context/EventContext";

interface EventDetailsModalProps {
  show: boolean;
  event: Event | null;
  closeModal: () => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  show,
  event,
  closeModal,
}) => {
  if (!show || !event) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-foreground rounded-4xl p-6 w-80">
        <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
        <p className="text-sm text-gray-600 mb-4">
          From: {event.start.toLocaleString()} <br />
          To: {event.end.toLocaleString()}
        </p>
        {event.description && (
          <p className="text-base text-gray-800 mb-4">{event.description}</p>
        )}
        <button
          onClick={closeModal}
          className="mt-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};
