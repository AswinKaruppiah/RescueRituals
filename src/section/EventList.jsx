import React from "react";
import { useEvents } from "../hooks/useEvents";
import EventCard from "./EventCard";
import EventCardSkeleton from "./EventCardSkeleton";
import { Loader2, AlertTriangle, CalendarX, Sparkles, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

export default function EventList() {
  const { events, toggleRsvp, loading, error, mutatingId, refreshEvents } = useEvents();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6 sm:space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-800 pb-4 gap-3 sm:gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            All Events
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Browse upcoming community rituals, workshops, and gatherings.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {loading && (
            <span className="flex items-center gap-1.5 text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" /> Loading...
            </span>
          )}
          <span className="text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg font-medium">
            {events.length} Events Total
          </span>
        </div>
      </div>

      {/* 1. Initial Full Loading State (Skeletons) */}
      {loading && events.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <EventCardSkeleton key={idx} />
          ))}
        </div>
      ) : error && events.length === 0 ? (
        /* 2. Full Error State */
        <div className="p-8 sm:p-12 text-center rounded-2xl bg-neutral-900/60 border border-rose-900/40 space-y-4 max-w-xl mx-auto">
          <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto rounded-full bg-rose-950/80 border border-rose-800/80 flex items-center justify-center text-rose-400 shadow-lg">
            <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-white">Unable to Load Events</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto">
              {error || 'We had trouble connecting to the cloud database. Please check your network or credentials.'}
            </p>
          </div>
          <button
            onClick={refreshEvents}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold transition active:scale-95 cursor-pointer shadow-md"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Try Again
          </button>
        </div>
      ) : events.length === 0 ? (
        /* 3. Empty State (No Data) */
        <div className="p-10 sm:p-16 text-center rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 shadow-xl">
            <CalendarX className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base sm:text-lg font-bold text-white">No Events Found</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              There are no community gatherings currently listed. Be the first to host an experience!
            </p>
          </div>
          <Link
            to="/host"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold transition active:scale-95 cursor-pointer shadow-lg"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Host an Event
          </Link>
        </div>
      ) : (
        /* 4. Active Data Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRsvpToggle={toggleRsvp}
              isUpdating={mutatingId === event.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}
