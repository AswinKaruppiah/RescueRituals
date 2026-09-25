import React, { useState } from 'react';
import HeroBanner from './HeroBanner';
import HostMetrics from './HostMetrics';
import HostedEventsList from './HostedEventsList';
import ComingEventsList from './ComingEventsList';
import HostEventModal from '../../components/Modal/HostEventModal';
import { useEvents } from '../../hooks/useEvents';

export default function HostEvent() {
  const {
    userEvents,
    comingEvents,
    hostMetrics,
    addEvent,
    editEvent,
    toggleRsvp,
    loading,
    error,
    mutatingId,
    refreshEvents,
  } = useEvents();
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
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingEvent) {
        await editEvent(editingEvent.id, formData);
      } else {
        await addEvent(formData);
      }
      handleCloseModal();
    } catch {
      // Modal stays open so user can retry without losing their form data
    }
  };

  const isSubmitting = mutatingId === 'create' || (editingEvent && mutatingId === editingEvent.id);

  return (
    <div className="min-h-screen pb-24 relative">
      {/* Hero Banner with Back Button & Bottom Fade */}
      <HeroBanner />

      {/* Main Management Layout: 70/30 Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10 space-y-6">
        {/* Error Alert / Retry Banner */}
        {error && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-300 text-xs flex items-center justify-between">
            <span>⚠️ {error}</span>
            <button
              onClick={refreshEvents}
              className="px-3 py-1.5 bg-rose-800 hover:bg-rose-700 text-white rounded-lg font-bold text-xs transition cursor-pointer"
            >
              Retry Sync
            </button>
          </div>
        )}

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
              loading={loading}
            />
          </div>

          {/* Right Column (30%): ComingEventsList */}
          <div className="lg:col-span-4">
            <ComingEventsList
              events={comingEvents}
              onCancelRsvp={handleCancelRsvp}
              mutatingId={mutatingId}
              loading={loading}
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
        isSubmitting={isSubmitting}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
