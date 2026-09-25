import React from 'react';
import { Calendar, Clock, MapPin, Edit3, Users, ExternalLink, CalendarPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { isEventClosed } from '../../services/eventOperations';

export default function HostedEventsList({ events = [], onEditEvent, onOpenCreate, loading = false }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <span className="inline-block px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
            Organizer Portal
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Your Hosted Events ({loading ? '...' : events.length})
          </h2>
        </div>
        {onOpenCreate && (
          <button
            type="button"
            onClick={onOpenCreate}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold transition active:scale-95 shadow-md cursor-pointer inline-flex items-center gap-1"
          >
            + New Event
          </button>
        )}
      </div>

      {/* Loading Skeletons */}
      {loading && events.length === 0 ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex gap-4 items-center animate-pulse"
            >
              <div className="w-16 h-16 rounded-xl bg-neutral-800 flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/2 bg-neutral-800 rounded"></div>
                <div className="h-3 w-1/3 bg-neutral-800/60 rounded"></div>
              </div>
              <div className="h-8 w-20 bg-neutral-800 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        /* Empty State */
        <div className="py-12 px-4 text-center rounded-xl bg-neutral-950/50 border border-neutral-800/80 space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400">
            <CalendarPlus className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">No Hosted Events Yet</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            You haven't published any community gatherings yet. Launch your first event with the "+ New Event" button above.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {events.map((evt) => {
            const closed = isEventClosed(evt);

            return (
              <div
                key={evt.id}
                className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 transition flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
              >
                {/* Left Thumbnail & Details */}
                <div className="flex items-start sm:items-center gap-3.5 min-w-0 w-full sm:w-auto">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-neutral-800"
                  />
                  <div className="min-w-0 space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 bg-neutral-800 text-neutral-300 text-[10px] font-semibold rounded uppercase tracking-wider">
                        {evt.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-[10px] font-semibold rounded uppercase tracking-wider ${
                          closed
                            ? 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                            : 'bg-emerald-950/60 text-emerald-400 border border-emerald-900/40'
                        }`}
                      >
                        {closed ? 'Closed' : 'Active'}
                      </span>
                      <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                        <Users className="w-3 h-3 text-neutral-500" /> {evt.attendeesCount || 0}/{evt.capacity || 50}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white truncate max-w-xs sm:max-w-sm">
                      {evt.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-neutral-500" /> {evt.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-neutral-500" /> {evt.time}
                      </span>
                      {evt.location && (
                        <span className="flex items-center gap-1 truncate max-w-[140px]">
                          <MapPin className="w-3 h-3 text-neutral-500 flex-shrink-0" /> {evt.location.split(',')[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800">
                  <Link
                    to={`/events/${evt.id}`}
                    className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition"
                    title="View public event"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => onEditEvent && onEditEvent(evt)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold border border-neutral-700 transition active:scale-95 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
