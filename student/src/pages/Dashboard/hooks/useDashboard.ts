import { useDashboardData } from './useDashboardData';
import { useTimetable } from './useTimetable';

export function useDashboard() {
  const { classColors, fallbackClasses, fallbackEvents } = useDashboardData();
  const { classes, upcomingEvents } = useTimetable(classColors, fallbackClasses, fallbackEvents);
  return { classes, upcomingEvents };
} 