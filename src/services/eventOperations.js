/**
 * Event Operations Helper
 * Standalone functions for getting, adding, editing, calculating event metrics,
 * and managing persistent user identification and RSVP user arrays.
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
  const attendeesCount = Array.isArray(event.rsvps) ? event.rsvps.length : (event.attendeesCount || 0);
  const isFull =
    Number(event.capacity) > 0 &&
    Number(attendeesCount) >= Number(event.capacity);

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

// Add a new user-owned event to the events array with hostId and empty rsvps array
export const addEventItem = (events, newEventData, userId) => {
  const currentUserId = userId || getOrCreateUserId();

  const newEvent = {
    id: `evt-user-${Date.now()}`,
    ...newEventData,
    hostId: currentUserId,
    rsvps: [],
    attendeesCount: 0,
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

// Toggle RSVP status and maintain the rsvps array of user IDs
export const toggleEventRsvp = (events, id, userId) => {
  const currentUserId = userId || getOrCreateUserId();

  return events.map((evt) => {
    if (String(evt.id) === String(id)) {
      // If the current user is the host of this event, do not allow RSVPing
      if (evt.hostId && evt.hostId === currentUserId) {
        return evt;
      }

      const currentRsvps = Array.isArray(evt.rsvps) ? [...evt.rsvps] : [];
      const hasRsvp = currentRsvps.includes(currentUserId);
      
      let nextRsvps;
      if (hasRsvp) {
        // Remove user ID from rsvps array
        nextRsvps = currentRsvps.filter((uid) => uid !== currentUserId);
      } else {
        // Add user ID to rsvps array
        nextRsvps = [...currentRsvps, currentUserId];
      }

      const nextIsGoing = !hasRsvp;
      const baseCount = typeof evt.attendeesCount === 'number' ? evt.attendeesCount : 0;
      const nextCount = nextIsGoing ? baseCount + 1 : Math.max(0, baseCount - 1);

      return {
        ...evt,
        rsvps: nextRsvps,
        attendeesCount: nextCount,
      };
    }
    return evt;
  });
};
