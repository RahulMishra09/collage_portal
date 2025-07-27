import { useState, useEffect } from 'react';
import type { Class } from '../models';

export function useDashboardData() {
  const [classColors, setClassColors] = useState<string[]>([]);
  const [fallbackClasses, setFallbackClasses] = useState<Class[]>([]);
  const [fallbackEvents, setFallbackEvents] = useState<{ title: string; date: string; time: string; location: string }[]>([]);

  useEffect(() => {
    fetch('/src/pages/Dashboard/data/classColors.json').then(res => res.json()).then(setClassColors);
    fetch('/src/pages/Dashboard/data/classes.json').then(res => res.json()).then(setFallbackClasses);
    fetch('/src/pages/Dashboard/data/events.json').then(res => res.json()).then(setFallbackEvents);
  }, []);

  return {
    classColors,
    fallbackClasses,
    fallbackEvents,
  };
} 