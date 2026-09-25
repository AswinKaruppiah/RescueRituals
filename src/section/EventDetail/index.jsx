import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents';
import HeroBanner from './HeroBanner';
import EventInfo from './EventInfo';
import RsvpCard from './RsvpCard';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEvent, toggleRsvp, events } = useEvents();

  const event = getEvent(id) || events[0];
  const [copied, setCopied] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#262626] text-white flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold">Event Not Found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-white text-black font-semibold rounded-xl"
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
          <RsvpCard event={event} onRsvpToggle={handleRsvpToggle} />
        </div>
      </div>
    </div>
  );
}
