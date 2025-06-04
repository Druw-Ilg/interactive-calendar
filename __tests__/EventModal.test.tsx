// test of the EventModal
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { EventProvider } from "@/app/context/EventContext";
import { EventModal } from "@/app/components/EventModal";
import "@testing-library/jest-dom";

describe("EventModal Component with Context", () => {
  const closeMock = jest.fn();
  const defaultDateStr = "2023-01-01T10:00";

  const renderWithProvider = () =>
    render(
      <EventProvider>
        <EventModal
          show={true}
          closeModal={closeMock}
          defaultDate={new Date(defaultDateStr)}
        />
      </EventProvider>
    );

  it("renders form fields", () => {
    renderWithProvider();
    expect(screen.getByText("Create New Event")).toBeInTheDocument();
    expect(screen.getByLabelText("title")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Date & Time")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date & Time")).toBeInTheDocument();
    expect(screen.getByLabelText("description")).toBeInTheDocument();
  });

  it("submits form and closes modal on Save", () => {
    renderWithProvider();

    fireEvent.change(screen.getByLabelText("title"), {
      target: { value: "Test Event" },
    });
    fireEvent.change(screen.getByLabelText("Start Date & Time"), {
      target: { value: defaultDateStr },
    });
    fireEvent.change(screen.getByLabelText("End Date & Time"), {
      target: { value: "2023-01-01T11:00" },
    });

    // Ensure form submission by clicking Save
    fireEvent.click(screen.getByRole("button", { name: /Save/i }));

    expect(closeMock).toHaveBeenCalledTimes(1);
  });
});
