import { useContext, useCallback, useMemo } from 'react';
import { EventContext } from '../context/EventContext';
import { toast } from '../components/Toast';
import {
  getEventById,
  addEventItem,
  editEventItem,
  toggleEventRsvp,
  calculateHostMetrics,
  isEventClosed,
  getOrCreateUserId,
} from '../services/eventOperations';
import { saveEvents } from '../services/jsonBinService';

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }

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

  // All events with isGoing and isHost dynamically resolved for the active user
  const resolvedEvents = useMemo(
    () =>
      events.map((evt) => ({
        ...evt,
        isGoing: Array.isArray(evt.rsvps) && evt.rsvps.includes(currentUserId),
        isHost: Boolean(currentUserId && evt.hostId === currentUserId),
      })),
    [events, currentUserId]
  );

  // Filter for events hosted by this specific user
  const userEvents = useMemo(
    () => resolvedEvents.filter((evt) => evt.isUserCreated && (evt.hostId === currentUserId || !evt.hostId)),
    [resolvedEvents, currentUserId]
  );

  // Filter for events where this user's ID is in the rsvps array
  const comingEvents = useMemo(
    () => resolvedEvents.filter((evt) => Array.isArray(evt.rsvps) && evt.rsvps.includes(currentUserId)),
    [resolvedEvents, currentUserId]
  );

  // Host metrics for user-created events
  const hostMetrics = useMemo(
    () => calculateHostMetrics(userEvents),
    [userEvents]
  );

  // Get a single event by ID, dynamically computing isGoing and isHost for the current user
  const getEvent = useCallback(
    (id) => {
      const evt = getEventById(events, id);
      if (!evt) return null;
      return {
        ...evt,
        isGoing: Array.isArray(evt.rsvps) && evt.rsvps.includes(currentUserId),
        isHost: Boolean(currentUserId && evt.hostId === currentUserId),
      };
    },
    [events, currentUserId]
  );

  // Add a new user event with current user ID - directly persists to JSONBin
  const addEvent = useCallback(
    async (newEventData) => {
      setMutatingId('create');
      try {
        const nextEvents = addEventItem(events, newEventData, currentUserId);
        const updated = await saveEvents(nextEvents);
        setEvents(Array.isArray(updated) ? updated : nextEvents);
        toast.success('Event hosted successfully!', {
          description: newEventData.title || 'Your new event is now live in the cloud database.',
        });
        return nextEvents;
      } catch (err) {
        toast.error('Cloud DB Save Failed', {
          description: err.message || 'Unable to save to JSONBin. The event was not created.',
        });
        throw err;
      } finally {
        setMutatingId(null);
      }
    },
    [events, setEvents, currentUserId, setMutatingId]
  );

  // Edit an existing user event - directly persists to JSONBin
  const editEvent = useCallback(
    async (id, updatedData) => {
      setMutatingId(id);
      try {
        const nextEvents = editEventItem(events, id, updatedData);
        const updated = await saveEvents(nextEvents);
        setEvents(Array.isArray(updated) ? updated : nextEvents);
        toast.success('Event updated successfully!', {
          description: updatedData.title ? `Updated details for ${updatedData.title}` : 'Changes saved.',
        });
        return nextEvents;
      } catch (err) {
        toast.error('Cloud DB Update Failed', {
          description: err.message || 'Unable to update JSONBin. Changes were not saved.',
        });
        throw err;
      } finally {
        setMutatingId(null);
      }
    },
    [events, setEvents, setMutatingId]
  );

  // Toggle RSVP status for current user ID - directly persists to JSONBin
  const toggleRsvp = useCallback(
    async (id) => {
      const target = events.find((e) => String(e.id) === String(id));
      if (!target) return;

      if (target.hostId && target.hostId === currentUserId) {
        toast.info("You're the host of this event", {
          description: 'Hosts cannot RSVP to their own listings.',
        });
        return;
      }

      setMutatingId(id);
      const isCurrentlyGoing = Array.isArray(target.rsvps) && target.rsvps.includes(currentUserId);
      const nextEvents = toggleEventRsvp(events, id, currentUserId);

      try {
        const updated = await saveEvents(nextEvents);
        setEvents(Array.isArray(updated) ? updated : nextEvents);

        if (isCurrentlyGoing) {
          toast.info('RSVP cancelled', {
            description: `You are no longer attending "${target.title}".`,
          });
        } else {
          toast.success('RSVP confirmed! 🎉', {
            description: `You're attending "${target.title}".`,
          });
        }
      } catch (err) {
        toast.error('Cloud DB RSVP Failed', {
          description: err.message || 'Unable to sync RSVP with JSONBin.',
        });
        throw err;
      } finally {
        setMutatingId(null);
      }
    },
    [events, setEvents, currentUserId, setMutatingId]
  );

  return {
    events: resolvedEvents,
    rawEvents: events,
    userEvents,
    comingEvents,
    hostMetrics,
    currentUserId,
    getOrCreateUserId,
    isEventClosed,
    getEvent,
    addEvent,
    editEvent,
    toggleRsvp,
    setEvents,
    loading,
    error,
    mutatingId,
    refreshEvents,
  };
}
