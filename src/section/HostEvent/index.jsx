import React, { useState } from 'react';
import { toast } from '../../components/Toast';
import HeroBanner from './HeroBanner';
import HostMetrics from './HostMetrics';
import HostedEventsList from './HostedEventsList';
import HostEventModal from '../../components/Modal/HostEventModal';
import { useEvents } from '../../hooks/useEvents';

export default function HostEvent() {
  const { userEvents, hostMetrics, addEvent, editEvent } = useEvents();
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

      {/* Main Management Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10 space-y-6">
        {/* Top Metrics Row */}
        <HostMetrics
          total={hostMetrics.total}
          openCount={hostMetrics.openCount}
          closedCount={hostMetrics.closedCount}
        />

        {/* User Hosted Events List */}
        <HostedEventsList
          events={userEvents}
          onEditEvent={handleEdit}
          onOpenCreate={handleOpenCreateModal}
        />
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
