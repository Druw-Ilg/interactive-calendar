# Calendar App

A responsive single-page web application built with Next.js, TypeScript, Tailwind CSS, and Context API that mimics Google Calendar’s basic features.

## Architecture & Design Decisions

- **Next.js + TypeScript**: Leverages the App Router for a client-rendered SPA with server/client separation.
- **Context API (`EventContext`)**: Manages event state (`events`, `addEvent`, `getEventsForDate`). Ensures any component in the tree can access or update events without prop drilling.
- **Date-fns**: Handles date manipulation (calculating month/week grids, formatting, comparisons). Favorable for tree-shaking and immutable date operations.
- **Tailwind CSS**: Utility-first styling ensures rapid UI development and consistent design tokens.
- **Component Structure**:
  - `CalendarNav`: Responsive navigation (Today/Prev/Next buttons and view selector). On desktop, a full-text "+ Create" button; on mobile, a floating "+" icon.
  - `MonthView`, `WeekView`, `DayView`: Render mock events in grid or list form, highlight “today,” and use a lighter gray border style on cells.
  - `EventModal`: Modal dialog for creating new events. Uses `aria-label` on “Event Title” for accessibility and proper testing with React Testing Library.
  - `EventDetailsModal`: Pop-up showing event details when clicking an existing event.

## Functional Overview

**Calendar Display & Navigation**

- Default to **Month View**, with **Week** and **Day** toggles via a `<select>` dropdown.
- “Today,” “Previous,” and “Next” buttons adapt based on current view (month/week/day). The calendar grid takes full width on mobile; borders are lighter gray.
- Responsiveness:
  - On mobile, the “+” create button floats at top-left; view selector is full-width.
  - On desktop, "+ Create" sits beside “Today” and arrows.

**Mock Event Creation**

- Clicking "+ Create" (desktop) or "+" (mobile) opens `EventModal` with fields:
  - **Event Title** (`aria-label="Event Title"`) for screen readers and RTL tests.
  - **Start Date & Time** (`label` + `id="startDate"`).
  - **End Date & Time** (`label` + `id="endDate"`).
  - **Description (optional)** (`aria-label="description"`).
- On submit, `handleSubmit` calls `addEvent` (from Context) then `closeModal`. Inputs use `defaultDate?.toISOString().substring(0,16)` for proper `datetime-local` formatting.

**Mock Event Display & Details**

- In each view, events are fetched via `getEventsForDate(date)` and displayed as colored blocks with `cursor-pointer` and hover feedback. Clicking triggers `EventDetailsModal`.
- `EventDetailsModal` shows definition details (title, date range, description) in a centered pop-up with a “Close” button.

**Accessibility & Testing**

- **Accessibility**:
  - Semantic HTML (`<label>`, `<button>`, `<form>`).
  - `aria-label` on Event Title input and Description textarea.
  - Keyboard focus states on controls, and color contrast checks for readability.
- **Testing**:
  - **Jest + React Testing Library (RTL)**: Chosen to write user-centric tests that query by `getByLabelText`, `getByRole`, and simulate events with `fireEvent`.
  - **EventModal Tests**: Wrapped in `EventProvider` to provide `addEvent`. Verified:
    1.  Modal doesn’t render when `show=false`.
    2.  Renders all fields when `show=true`, including `aria-label` field.
    3.  “Cancel” button calls `closeModal`.
    4.  “Save” button fills inputs (`getByLabelText('title')`) and submits, then calls `closeModal` once.

## Known Issues or Limitations

- No backend persistence; data is lost on reload.
- No drag-and-drop for event resizing or moving.
- No timezone handling; uses local browser time.
- Event overlap styling is minimal.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
