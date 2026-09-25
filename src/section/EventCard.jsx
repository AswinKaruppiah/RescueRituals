import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

export default function EventCard({ event, onRsvpToggle }) {
  return (
    <div className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden flex flex-col justify-between">
      
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

        {/* Date, Location, and Capacity Info */}
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
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-neutral-400" />
              <span>{event.attendeesCount} / {event.capacity} Spots</span>
            </span>
            <span className="text-[11px] text-neutral-500 font-medium">
              By {event.organizer}
            </span>
          </div>
        </div>

        {/* RSVP Action */}
        <button
          onClick={() => onRsvpToggle && onRsvpToggle(event.id)}
          className={`w-full py-2.5 rounded-xl text-xs font-bold transition duration-200 active:scale-95 ${
            event.isGoing
              ? 'bg-white text-black hover:bg-neutral-200'
              : 'bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700'
          }`}
        >
          {event.isGoing ? '✓ RSVP Confirmed' : 'RSVP Now'}
        </button>
      </div>
    </div>
  );
}
