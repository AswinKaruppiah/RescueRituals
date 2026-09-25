import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getOrCreateUserId } from '../services/eventOperations';
import { getEvents } from '../services/jsonBinService';

export const EventContext = createContext(null);

export function EventProvider({ children }) {
  const [currentUserId, setCurrentUserId] = useState(() => getOrCreateUserId());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mutatingId, setMutatingId] = useState(null);
  const [events, setEvents] = useState([]);

  // Fetch from JSONBin cloud database
  const fetchCloudEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const remoteData = await getEvents();
      setEvents(Array.isArray(remoteData) ? remoteData : []);
    } catch (err) {
      console.error('Cloud DB fetch error:', err.message);
      setError(err.message || 'Failed to load events from cloud database');
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCloudEvents();
  }, [fetchCloudEvents]);

  return (
    <EventContext.Provider
      value={{
        events,
        setEvents,
        currentUserId,
        setCurrentUserId,
        loading,
        error,
        mutatingId,
        setMutatingId,
        refreshEvents: fetchCloudEvents,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
