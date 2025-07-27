import { Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { FC } from 'react';
import { useUpcomingEvents } from '../hooks/useUpcomingEvents';

const UpcomingEvents: FC = () => {
    const { events, loading } = useUpcomingEvents();

    if (loading) {
        return (
            <Card className='p-6 rounded-lg shadow-md'>
                <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                <div className="text-sm text-stone-600 dark:text-stone-400">Loading...</div>
            </Card>
        );
    }

    if (!events || events.length === 0) {
        return (
            <Card className='p-6 rounded-lg shadow-md'>
                <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                <div className="text-sm text-stone-600 dark:text-stone-400">No upcoming events</div>
            </Card>
        );
    }

    return (
        <Card className='p-6 rounded-lg shadow-md'>
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <ul className="space-y-4">
                {events.map((event) => (
                    <li key={event.id} className="flex items-center gap-4">
                        <Calendar className="w-5 h-5" />
                        <div>
                            <div className="font-medium">{event.title}</div>
                            <div className="text-sm text-stone-600 dark:text-stone-400">
                                {new Date(event.date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </Card>
    );
};

export default UpcomingEvents;
