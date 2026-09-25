import React from 'react';
import { Share2 } from 'lucide-react';

export default function EventInfo({ event, onShare, copied }) {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Title & Location | Date | Spaces Card */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-6 shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug pb-2">
          {event.title}
        </h1>

        {/* Full Width Location Box */}
        <div className="bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-4 space-y-1">
          <span className="text-neutral-400 text-xs font-semibold uppercase tracking-wider block">
            Location
          </span>
          <p className="text-white font-medium leading-relaxed">
            {event.location}
          </p>
        </div>

        {/* Date & Time and Available Spots Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-4 space-y-1">
            <span className="text-neutral-400 text-xs font-semibold uppercase tracking-wider block">
              Date & Time
            </span>
            <p className="text-white font-medium leading-relaxed">
              {event.date} • {event.time}
            </p>
          </div>

          <div className="bg-neutral-950/80 border border-neutral-800/80 rounded-xl p-4 space-y-1">
            <span className="text-neutral-400 text-xs font-semibold uppercase tracking-wider block">
              Available Spots
            </span>
            <p className="text-white font-medium leading-relaxed">
              {Math.max(0, event.capacity - event.attendeesCount)} spots left
            </p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
        <h3 className="text-lg font-bold text-white">About This Gathering</h3>
        <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line">
          {event.description}
        </p>
      </div>

      {/* Share & Invite Section */}
      <div className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-white">
            Share with Friends & Invite Guests
          </h4>
          <p className="text-xs text-neutral-400 max-w-md">
            Gatherings are better together. Send an invite link to your friends, family, or community to join this ritual.
          </p>
        </div>
        <button
          onClick={onShare}
          className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white flex items-center justify-center gap-2 transition active:scale-95 cursor-pointer flex-shrink-0"
        >
          <Share2 className="w-4 h-4" />
          {copied ? 'Link Copied!' : 'Share Event'}
        </button>
      </div>
    </div>
  );
}
