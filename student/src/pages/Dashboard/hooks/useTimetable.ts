import { useState, useEffect } from 'react';
import { fetchTimetableData } from '../api/dashboardApi';
import { formatClassTime } from '../utils/dashboardUtils';
import type { Class } from '../models';

export function useTimetable(classColors: string[], fallbackClasses: Class[], fallbackEvents: { title: string; date: string; time: string; location: string }[]) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<{ title: string; date: string; time: string; location: string }[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = JSON.parse(localStorage.getItem("user") || '{}');
        const timetableData = await fetchTimetableData(user.enrollmentNumber);
        const todaysClasses = timetableData.map((entry: any, index: number) => {
          const timeRange = formatClassTime(entry.timetable.start_time, entry.timetable.end_time);
          const colorIndex = index % classColors.length;
          const courseName = entry.timetable.course_name || `Course ${entry.timetable.course_id}`;
          return {
            name: courseName,
            time: timeRange,
            color: classColors[colorIndex],
            location: entry.timetable.location,
            mode: entry.timetable.mode
          };
        });
        setClasses(todaysClasses.length > 0 ? todaysClasses : fallbackClasses);
        setUpcomingEvents(fallbackEvents);
      } catch (error) {
        setClasses(fallbackClasses);
        setUpcomingEvents(fallbackEvents);
      }
    }
    fetchData();
  }, [classColors, fallbackClasses, fallbackEvents]);

  return {
    classes,
    upcomingEvents,
  };
} 