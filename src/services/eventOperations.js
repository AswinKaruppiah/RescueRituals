/**
 * Event Operations Helper
 * Standalone functions for getting, adding, editing, calculating event metrics,
 * and managing persistent user identification.
 * Note: Default events (from events.js) cannot be modified or owned.
 */

export const USER_ID_STORAGE_KEY = 'rescue_rituals_user_id';

// Generate a unique user ID
export const generateUserId = () => {
  return `usr_${Math.random().toString(36).substring(2, 9)}_${Date.now().toString(36)}`;
};

// Retrieve existing user ID from localStorage or generate, persist, and return a new one
export const getOrCreateUserId = () => {
  try {
    const existingId = localStorage.getItem(USER_ID_STORAGE_KEY);
    if (existingId) {
      return existingId;
    }
    const newId = generateUserId();
    localStorage.setItem(USER_ID_STORAGE_KEY, newId);
    return newId;
  } catch (error) {
    console.warn('localStorage is not accessible, using generated user id:', error);
    return generateUserId();
  }
};

// Helper to determine if an event is closed (capacity reached or date expired)
export const isEventClosed = (event) => {
  if (!event) return false;

  // Check if event capacity is completely filled
  const isFull =
    Number(event.capacity) > 0 &&
    Number(event.attendeesCount || 0) >= Number(event.capacity);

  // Check if event date has passed
  let isExpired = false;
  if (event.date) {
    const todayStr = new Date().toISOString().split('T')[0];
    isExpired = event.date < todayStr;
  }

  return isFull || isExpired;
};

// Calculate metrics for user-hosted events (Total, Current Open, Closed)
export const calculateHostMetrics = (userEvents = []) => {
  const total = userEvents.length;
  let closedCount = 0;
  let openCount = 0;

  userEvents.forEach((evt) => {
    if (isEventClosed(evt)) {
      closedCount += 1;
    } else {
      openCount += 1;
    }
  });

  return {
    total,
    openCount,
    closedCount,
  };
};

// Get an event by its ID
export const getEventById = (events, id) => {
  return events.find((item) => String(item.id) === String(id)) || null;
};

// Add a new user-owned event to the events array
export const addEventItem = (events, newEventData) => {
  const currentUserId = getOrCreateUserId();

  const newEvent = {
    id: `evt-user-${Date.now()}`,
    ...newEventData,
    hostId: currentUserId,
    attendeesCount: 0,
    isGoing: false,
    isUserCreated: true,
  };

  return [newEvent, ...events];
};

// Edit an existing user-created event in the events array
export const editEventItem = (events, id, updatedData) => {
  return events.map((item) => {
    // Only allow editing if it is user-created
    if (String(item.id) === String(id) && item.isUserCreated) {
      return {
        ...item,
        ...updatedData,
      };
    }
    return item;
  });
};

// Toggle RSVP status and attendee count for an event
export const toggleEventRsvp = (events, id) => {
  return events.map((evt) => {
    if (String(evt.id) === String(id)) {
      const nextStatus = !evt.isGoing;
      return {
        ...evt,
        isGoing: nextStatus,
        attendeesCount: nextStatus
          ? evt.attendeesCount + 1
          : Math.max(0, evt.attendeesCount - 1),
      };
    }
    return evt;
  });
};
