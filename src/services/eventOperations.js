export const USER_ID_STORAGE_KEY = 'rescue_rituals_user_id';

export const getOrCreateUserId = () => {
  let userId = localStorage.getItem(USER_ID_STORAGE_KEY);
  if (!userId) {
    userId = `usr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    localStorage.setItem(USER_ID_STORAGE_KEY, userId);
  }
  return userId;
};

export const isEventClosed = (event) => {
  if (!event) return false;
  const count = Array.isArray(event.rsvps) ? event.rsvps.length : (event.attendeesCount || 0);
  const isFull = event.capacity > 0 && count >= event.capacity;
  const isExpired = event.date && event.date < new Date().toISOString().split('T')[0];
  return Boolean(isFull || isExpired);
};

export const calculateHostMetrics = (userEvents = []) => {
  let closedCount = 0;
  let openCount = 0;

  userEvents.forEach((evt) => {
    if (isEventClosed(evt)) closedCount++;
    else openCount++;
  });

  return { total: userEvents.length, openCount, closedCount };
};

export const getEventById = (events, id) => {
  return events.find((e) => String(e.id) === String(id)) || null;
};

export const addEventItem = (events, newEventData, userId) => {
  const newEvent = {
    id: `evt-user-${Date.now()}`,
    ...newEventData,
    hostId: userId || getOrCreateUserId(),
    rsvps: [],
    attendeesCount: 0,
    isUserCreated: true,
  };
  return [newEvent, ...events];
};

export const editEventItem = (events, id, updatedData) => {
  return events.map((e) => (String(e.id) === String(id) ? { ...e, ...updatedData } : e));
};

export const toggleEventRsvp = (events, id, userId) => {
  const uid = userId || getOrCreateUserId();

  return events.map((evt) => {
    if (String(evt.id) !== String(id) || evt.hostId === uid) return evt;

    const rsvps = Array.isArray(evt.rsvps) ? evt.rsvps : [];
    const isGoing = rsvps.includes(uid);
    const nextRsvps = isGoing ? rsvps.filter((u) => u !== uid) : [...rsvps, uid];

    return {
      ...evt,
      rsvps: nextRsvps,
      attendeesCount: nextRsvps.length,
    };
  });
};
