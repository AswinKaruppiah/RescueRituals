import React from 'react';
import { ShieldCheck, Share2 } from 'lucide-react';

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

      {/* Host / Organizer Info */}
      <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white text-black font-bold flex items-center justify-center">
            {event.organizer.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-sm text-white flex items-center gap-1">
              {event.organizer}
              <ShieldCheck className="w-4 h-4 text-white" />
            </h4>
            <p className="text-xs text-neutral-400">Community Host & Organizer</p>
          </div>
        </div>
        <button
          onClick={onShare}
          className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-white flex items-center gap-1.5 transition"
        >
          <Share2 className="w-3.5 h-3.5" />
          {copied ? 'Link Copied!' : 'Share'}
        </button>
      </div>
    </div>
  );
}
