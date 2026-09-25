import React from 'react';
import { Calendar, MapPin, ExternalLink, UserCheck, XCircle, Compass, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ComingEventsList({ events = [], onCancelRsvp, mutatingId = null, loading = false }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 shadow-2xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
        <div>
          <span className="inline-block px-3 py-1 bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-[10px] sm:text-xs font-semibold rounded-full uppercase tracking-wider mb-1.5">
            Attending Portal
          </span>
          <h2 className="text-lg sm:text-xl font-black text-white">
            I'm Coming ({loading ? '...' : events.length})
          </h2>
        </div>
        <div className="p-2 bg-neutral-800 rounded-xl text-emerald-400">
          <UserCheck className="w-5 h-5" />
        </div>
      </div>

      {/* Loading Skeletons */}
      {loading && events.length === 0 ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-2.5 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-neutral-800 flex-shrink-0"></div>
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 w-1/3 bg-neutral-800 rounded"></div>
                  <div className="h-4 w-4/5 bg-neutral-800 rounded"></div>
                  <div className="h-3 w-1/2 bg-neutral-800/60 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        /* Empty State */
        <div className="py-10 px-4 text-center rounded-xl bg-neutral-950/50 border border-neutral-800/80 space-y-3">
          <div className="w-10 h-10 mx-auto rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-white">No RSVPs Yet</h3>
          <p className="text-xs text-neutral-400">
            You haven't RSVP'd to any events yet. Explore upcoming rituals to join.
          </p>
          <Link
            to="/"
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold transition active:scale-95 cursor-pointer shadow-md"
          >
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-neutral-700 transition space-y-3"
            >
              {/* Thumbnail & Info */}
              <div className="flex items-start gap-3 min-w-0">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-neutral-800"
                />
                <div className="min-w-0 space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 bg-neutral-800 text-neutral-300 text-[9px] font-semibold rounded uppercase tracking-wider">
                      {evt.category}
                    </span>
                    <span className="px-1.5 py-0.5 bg-emerald-950/60 text-emerald-400 border border-emerald-900/40 text-[9px] font-semibold rounded uppercase tracking-wider flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400"></span> Confirmed
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                    {evt.title}
                  </h3>

                  <div className="flex flex-col gap-0.5 text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-neutral-500 flex-shrink-0" /> {evt.date} • {evt.time}
                    </span>
                    {evt.location && (
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-neutral-500 flex-shrink-0" /> {evt.location.split(',')[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                <Link
                  to={`/events/${evt.id}`}
                  className="inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Event
                </Link>

                <button
                  type="button"
                  disabled={mutatingId === evt.id}
                  onClick={() => onCancelRsvp && onCancelRsvp(evt)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-rose-950/40 hover:text-rose-300 text-neutral-300 text-[11px] font-medium border border-neutral-700 hover:border-rose-800/60 transition active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Cancel RSVP"
                >
                  {mutatingId === evt.id ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin text-rose-400" />
                      <span>Cancelling...</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3" />
                      <span>Cancel</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
