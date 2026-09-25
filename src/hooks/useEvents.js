import { useContext, useMemo } from 'react';
import { EventContext } from '../context/EventContext';
import { toast } from '../components/Toast';
import {
  addEventItem,
  editEventItem,
  toggleEventRsvp,
  calculateHostMetrics,
} from '../services/eventOperations';
import { saveEvents } from '../services/jsonBinService';

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) throw new Error('useEvents must be used within an EventProvider');

  const {
    events,
    setEvents,
    currentUserId,
    loading,
    error,
    mutatingId,
    setMutatingId,
    refreshEvents,
  } = context;

  // Resolve dynamic user state (isGoing, isHost)
  const resolvedEvents = useMemo(
    () =>
      events.map((evt) => ({
        ...evt,
        isGoing: Array.isArray(evt.rsvps) && evt.rsvps.includes(currentUserId),
        isHost: Boolean(currentUserId && evt.hostId === currentUserId),
      })),
    [events, currentUserId]
  );

  const userEvents = useMemo(
    () => resolvedEvents.filter((evt) => evt.isUserCreated && (evt.hostId === currentUserId || !evt.hostId)),
    [resolvedEvents, currentUserId]
  );

  const comingEvents = useMemo(
    () => resolvedEvents.filter((evt) => Array.isArray(evt.rsvps) && evt.rsvps.includes(currentUserId)),
    [resolvedEvents, currentUserId]
  );

  const hostMetrics = useMemo(() => calculateHostMetrics(userEvents), [userEvents]);

  const getEvent = (id) => resolvedEvents.find((e) => String(e.id) === String(id)) || null;

  // Generic cloud save helper
  const syncWithCloud = async (actionId, nextEvents, successMsg) => {
    setMutatingId(actionId);
    try {
      const updated = await saveEvents(nextEvents);
      setEvents(Array.isArray(updated) ? updated : nextEvents);
      if (successMsg) toast.success(successMsg.title, { description: successMsg.desc });
      return nextEvents;
    } catch (err) {
      toast.error('Cloud Sync Failed', { description: err.message });
      throw err;
    } finally {
      setMutatingId(null);
    }
  };

  const addEvent = (newEventData) =>
    syncWithCloud(
      'create',
      addEventItem(events, newEventData, currentUserId),
      { title: 'Event hosted successfully!', desc: newEventData.title || 'Your event is now live.' }
    );

  const editEvent = (id, updatedData) =>
    syncWithCloud(
      id,
      editEventItem(events, id, updatedData),
      { title: 'Event updated successfully!', desc: updatedData.title ? `Updated details for ${updatedData.title}` : 'Changes saved.' }
    );

  const toggleRsvp = async (id) => {
    const target = events.find((e) => String(e.id) === String(id));
    if (!target) return;

    if (target.hostId === currentUserId) {
      toast.info("You're the host of this event", { description: 'Hosts cannot RSVP to their own listings.' });
      return;
    }

    const isCurrentlyGoing = Array.isArray(target.rsvps) && target.rsvps.includes(currentUserId);
    const nextEvents = toggleEventRsvp(events, id, currentUserId);

    await syncWithCloud(id, nextEvents);
    if (isCurrentlyGoing) {
      toast.info('RSVP cancelled', { description: `You are no longer attending "${target.title}".` });
    } else {
      toast.success('RSVP confirmed! 🎉', { description: `You're attending "${target.title}".` });
    }
  };

  return {
    events: resolvedEvents,
    userEvents,
    comingEvents,
    hostMetrics,
    currentUserId,
    getEvent,
    addEvent,
    editEvent,
    toggleRsvp,
    loading,
    error,
    mutatingId,
    refreshEvents,
  };
}
