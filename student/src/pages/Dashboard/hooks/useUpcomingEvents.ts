import { useEffect, useState } from 'react';
import type { Event } from '../models';
import { fetchUpcomingEvents } from '../api/fetchUpcomingEvents';

export function useUpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await fetchUpcomingEvents();
        setEvents(data);
      } catch (error) {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  return { events, loading };
} 