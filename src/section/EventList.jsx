import React, { useState } from "react";
import { DUMMY_EVENTS } from "../constant/events";
import EventCard from "./EventCard";

export default function EventList() {
  const [events, setEvents] = useState(DUMMY_EVENTS);

  const handleRsvpToggle = (eventId) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === eventId) {
          const newStatus = !e.isGoing;
          return {
            ...e,
            isGoing: newStatus,
            attendeesCount: newStatus
              ? e.attendeesCount + 1
              : e.attendeesCount - 1,
          };
        }
        return e;
      }),
    );
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8 border-b border-neutral-800 pb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            All Events
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Browse upcoming community rituals, workshops, and gatherings.
          </p>
        </div>
        <span className="text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg">
          {events.length} Events Total
        </span>
      </div>

      {/* Grid of Event Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onRsvpToggle={handleRsvpToggle}
          />
        ))}
      </div>
    </section>
  );
}
