import { useContext, useCallback, useMemo } from 'react';
import { EventContext } from '../context/EventContext';
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
    },
    [setEvents, currentUserId]
  );

  // Edit an existing user event
  const editEvent = useCallback(
    (id, updatedData) => {
      setEvents((prevEvents) => editEventItem(prevEvents, id, updatedData));
    },
    [setEvents]
  );

  // Toggle RSVP status for current user ID in the event's rsvps array
  const toggleRsvp = useCallback(
    (id) => {
      setEvents((prevEvents) => toggleEventRsvp(prevEvents, id, currentUserId));
    },
    [setEvents, currentUserId]
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
