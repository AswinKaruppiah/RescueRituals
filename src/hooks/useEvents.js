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

  // Filter for user-created / hosted events
  const userEvents = useMemo(
    () => events.filter((evt) => evt.isUserCreated),
    [events]
  );

  // Host metrics for user-created events
  const hostMetrics = useMemo(
    () => calculateHostMetrics(userEvents),
    [userEvents]
  );

  // Get a single event by ID
  const getEvent = useCallback(
    (id) => {
      return getEventById(events, id);
    },
    [events]
  );

  // Add a new user event
  const addEvent = useCallback(
    (newEventData) => {
      setEvents((prevEvents) => addEventItem(prevEvents, newEventData));
    },
    [setEvents]
  );

  // Edit an existing user event
  const editEvent = useCallback(
    (id, updatedData) => {
      setEvents((prevEvents) => editEventItem(prevEvents, id, updatedData));
    },
    [setEvents]
  );

  // Toggle RSVP status
  const toggleRsvp = useCallback(
    (id) => {
      setEvents((prevEvents) => toggleEventRsvp(prevEvents, id));
    },
    [setEvents]
  );

  return {
    events,
    userEvents,
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
