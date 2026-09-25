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

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventProvider');
  }

  const { events, setEvents, currentUserId } = context;

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

  // Add a new user event with current user ID
  const addEvent = useCallback(
    (newEventData) => {
      setEvents((prevEvents) => addEventItem(prevEvents, newEventData, currentUserId));
      toast.success('Event hosted successfully!', {
        description: newEventData.title || 'Your new event is now live.',
      });
    },
    [setEvents, currentUserId]
  );

  // Edit an existing user event
  const editEvent = useCallback(
    (id, updatedData) => {
      setEvents((prevEvents) => editEventItem(prevEvents, id, updatedData));
      toast.success('Event updated successfully!', {
        description: updatedData.title ? `Updated details for ${updatedData.title}` : 'Changes saved.',
      });
    },
    [setEvents]
  );

  // Toggle RSVP status for current user ID in the event's rsvps array
  const toggleRsvp = useCallback(
    (id) => {
      const target = events.find((e) => String(e.id) === String(id));
      if (!target) return;

      if (target.hostId && target.hostId === currentUserId) {
        toast.info("You're the host of this event", {
          description: 'Hosts cannot RSVP to their own listings.',
        });
        return;
      }

      const isCurrentlyGoing = Array.isArray(target.rsvps) && target.rsvps.includes(currentUserId);
      setEvents((prevEvents) => toggleEventRsvp(prevEvents, id, currentUserId));

      if (isCurrentlyGoing) {
        toast.info('RSVP cancelled', {
          description: `You are no longer attending "${target.title}".`,
        });
      } else {
        toast.success('RSVP confirmed! 🎉', {
          description: `You're attending "${target.title}".`,
        });
      }
    },
    [events, setEvents, currentUserId]
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
  };
}
