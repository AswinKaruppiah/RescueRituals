import React from 'react';
import { Users, CheckCircle } from 'lucide-react';

export default function RsvpCard({ event, onRsvpToggle }) {
  return (
    <div className="space-y-4">
      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6 sticky top-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <span className="text-xs font-semibold text-neutral-400 uppercase">
            Admission
          </span>
          <span className="text-2xl font-black text-white">
            {event.price}
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-neutral-300">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-white" /> Attendance
            </span>
            <span className="font-bold text-white">
              {event.attendeesCount} / {event.capacity} Spots
            </span>
          </div>
          <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{
                width: `${Math.min(100, (event.attendeesCount / event.capacity) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onRsvpToggle}
          className={`w-full py-3.5 rounded-xl text-sm font-bold transition duration-200 active:scale-95 flex items-center justify-center gap-2 ${
            event.isGoing
              ? 'bg-white text-black hover:bg-neutral-200'
              : 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
          }`}
        >
          {event.isGoing ? (
            <>
              <CheckCircle className="w-4 h-4" />
              RSVP Confirmed (Click to Cancel)
            </>
          ) : (
            'Confirm RSVP'
          )}
        </button>
      </div>
    </div>
  );
}
