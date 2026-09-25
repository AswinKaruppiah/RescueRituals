import React, { useState } from 'react';
import HeroBanner from './HeroBanner';
import HostMetrics from './HostMetrics';
import HostForm from './HostForm';
import HostedEventsList from './HostedEventsList';
import { DUMMY_EVENTS } from '../../constant/events';

export default function HostEvent() {
  const [events, setEvents] = useState(DUMMY_EVENTS);
  const [editingEvent, setEditingEvent] = useState(null);

  // Calculate metrics
  const totalEvents = events.length;
  const closedEvents = 1; // sample closed count
  const openEvents = Math.max(0, totalEvents - closedEvents);

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Banner with Back Button & Bottom Fade */}
      <HeroBanner />

      {/* Main Management Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: All Added Events List */}
          <div className="lg:col-span-7">
            <HostedEventsList events={events} onEditEvent={handleEdit} />
          </div>

          {/* Right Side: Stats & Add/Edit Event Form */}
          <div className="lg:col-span-5 space-y-6">
            <HostMetrics
              total={totalEvents}
              openCount={openEvents}
              closedCount={closedEvents}
            />
            <HostForm
              isEditing={Boolean(editingEvent)}
              editingEvent={editingEvent}
              onCancel={handleCancelEdit}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
