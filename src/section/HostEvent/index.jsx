import React, { useState } from 'react';
import { toast } from '../../components/Toast';
import HeroBanner from './HeroBanner';
import HostMetrics from './HostMetrics';
import HostedEventsList from './HostedEventsList';
import ComingEventsList from './ComingEventsList';
import HostEventModal from '../../components/Modal/HostEventModal';
import { useEvents } from '../../hooks/useEvents';

export default function HostEvent() {
  const { userEvents, comingEvents, hostMetrics, addEvent, editEvent, toggleRsvp } = useEvents();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleOpenCreateModal = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleCancelRsvp = (event) => {
    toggleRsvp(event.id);
    toast.info(`RSVP cancelled for "${event.title}"`);
  };

  const handleFormSubmit = (formData) => {
    if (editingEvent) {
      editEvent(editingEvent.id, formData);
      toast.success('Event updated successfully!');
    } else {
      addEvent(formData);
      toast.success('Event created & published successfully!');
    }
    handleCloseModal();
  };

  return (
    <div className="min-h-screen pb-24 relative">
      {/* Hero Banner with Back Button & Bottom Fade */}
      <HeroBanner />

      {/* Main Management Layout: 70/30 Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (70%): HostMetrics & HostedEventsList */}
          <div className="lg:col-span-8 space-y-6">
            <HostMetrics
              total={hostMetrics.total}
              openCount={hostMetrics.openCount}
              closedCount={hostMetrics.closedCount}
            />
            <HostedEventsList
              events={userEvents}
              onEditEvent={handleEdit}
              onOpenCreate={handleOpenCreateModal}
            />
          </div>

          {/* Right Column (30%): ComingEventsList */}
          <div className="lg:col-span-4">
            <ComingEventsList
              events={comingEvents}
              onCancelRsvp={handleCancelRsvp}
            />
          </div>

        </div>
      </div>

      {/* Create / Edit Event Modal */}
      <HostEventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isEditing={Boolean(editingEvent)}
        editingEvent={editingEvent}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
