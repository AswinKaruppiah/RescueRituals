import React, { createContext, useState } from 'react';
import { DUMMY_EVENTS } from '../constant/events';
import { getOrCreateUserId } from '../services/eventOperations';

export const EventContext = createContext(null);

export function EventProvider({ children }) {
  // Ensure persistent user ID is initialized on initial app load across any route
  const [currentUserId, setCurrentUserId] = useState(() => getOrCreateUserId());

  // Initialize shared events array from default constant list
  const [events, setEvents] = useState(() =>
    DUMMY_EVENTS.map((evt) => ({
      ...evt,
      isUserCreated: false,
    }))
  );

  return (
    <EventContext.Provider value={{ events, setEvents, currentUserId, setCurrentUserId }}>
      {children}
    </EventContext.Provider>
  );
}
