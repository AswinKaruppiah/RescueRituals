import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents';
import HeroBanner from './HeroBanner';
import EventInfo from './EventInfo';
import RsvpCard from './RsvpCard';
import { Loader2 } from 'lucide-react';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEvent, toggleRsvp, mutatingId, loading } = useEvents();

  const event = getEvent(id);
  const [copied, setCopied] = useState(false);

  if (loading && !event) {
    return (
      <div className="min-h-screen bg-[#262626] text-white flex flex-col items-center justify-center p-6 space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
        <p className="text-sm font-medium text-neutral-400">Loading Event Details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#262626] text-white flex flex-col items-center justify-center p-6 space-y-4">
        <div className="p-4 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
          <Loader2 className="w-8 h-8 opacity-0" />
        </div>
        <h2 className="text-2xl font-bold">Event Not Found</h2>
        <p className="text-xs text-neutral-400 max-w-sm text-center">
          The event you are looking for might have been removed or does not exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-2 px-5 py-2.5 bg-white text-black font-bold text-xs rounded-xl shadow-md transition active:scale-95 cursor-pointer"
        >
          Back to Events
        </button>
      </div>
    );
  }

  const handleRsvpToggle = () => {
    toggleRsvp(event.id);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pb-20">
      <HeroBanner event={event} />

      {/* Main Content Grid */}
      <div className="max-w-6xl -mt-24 mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <EventInfo event={event} onShare={handleShare} copied={copied} />
          <RsvpCard
            event={event}
            onRsvpToggle={handleRsvpToggle}
            isUpdating={mutatingId === event.id}
          />
        </div>
      </div>
    </div>
  );
}
