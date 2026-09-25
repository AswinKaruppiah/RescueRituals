import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Crown, Loader2 } from 'lucide-react';

export default function EventCard({ event, onRsvpToggle, isUpdating = false }) {
  const navigate = useNavigate();
  const isFull = event.capacity > 0 && event.attendeesCount >= event.capacity;

  return (
    <div
      onClick={() => navigate(`/events/${event.id}`)}
      className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      {/* Top Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <span className="absolute top-3 left-3 px-3 py-1 bg-black/80 text-white text-xs font-semibold rounded-full border border-neutral-700">
          {event.category}
        </span>
        <span className="absolute top-3 right-3 px-2.5 py-1 bg-white text-black text-xs font-bold rounded-lg">
          {event.price}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-white line-clamp-1">{event.title}</h3>
          <p className="text-neutral-400 text-xs line-clamp-2 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Info */}
        <div className="space-y-2 text-xs text-neutral-400 pt-2 border-t border-neutral-800">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="truncate">{event.date} • {event.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-neutral-400" />
              <span>{event.attendeesCount} / {event.capacity} Spots</span>
            </div>
            {isFull && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-wider">
                Slots Full
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        {event.isHost ? (
          <div className="w-full py-2.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center gap-1.5 cursor-default">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>You're the Host</span>
          </div>
        ) : (
          <button
            type="button"
            disabled={isUpdating || (!event.isGoing && isFull)}
            onClick={(e) => {
              e.stopPropagation();
              onRsvpToggle && onRsvpToggle(event.id);
            }}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition duration-200 active:scale-95 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed ${
              event.isGoing
                ? 'bg-white text-black hover:bg-neutral-200'
                : isFull
                ? 'bg-neutral-800 text-neutral-500 border border-neutral-800'
                : 'bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700'
            }`}
          >
            {isUpdating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            {isUpdating
              ? 'Updating...'
              : event.isGoing
              ? '✓ RSVP Confirmed'
              : isFull
              ? 'Slots Full'
              : 'RSVP Now'}
          </button>
        )}
      </div>
    </div>
  );
}
