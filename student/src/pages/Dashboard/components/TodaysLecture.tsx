import {Calendar, MapPin, Video} from 'lucide-react';
import {Card} from '@/components/ui/card';
import type { FC } from 'react';
import { useTodaysLecture } from '../hooks/useTodaysLecture';

const TodaysLecture: FC = () => {
    const { currentLecture, loading } = useTodaysLecture();

    const formattedDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    if (loading) {
        return (
            <Card className='p-6 rounded-lg shadow-md'>
                <h2 className="text-xl font-semibold mb-4">Current Lecture</h2>
                <div className="text-sm text-stone-600 dark:text-stone-400">Loading...</div>
            </Card>
        );
    }

    if (!currentLecture) {
        return (
            <Card className='p-6 rounded-lg shadow-md'>
                <h2 className="text-xl font-semibold mb-4">Current Lecture</h2>
                <div className="text-sm text-stone-600 dark:text-stone-400">No lecture data available</div>
            </Card>
        );
    }

    const startTime = currentLecture.timetable?.start_time?.substring(0, 5) || '';
    const endTime = currentLecture.timetable?.end_time?.substring(0, 5) || '';
    const timeRange = startTime && endTime ? `${startTime}-${endTime}` : '';

    return (
        <Card className='p-6 rounded-lg shadow-md'>
            <h2 className="text-xl font-semibold mb-4">Current Lecture</h2>
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <Calendar className="w-5 h-5" />
                    <div>
                        <div className="text-sm text-stone-600 dark:text-stone-400">{formattedDate}</div>
                        <div>{timeRange}</div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <MapPin className="w-5 h-5" />
                    <div>
                        <div className="text-sm text-stone-600 dark:text-stone-400">Location</div>
                        <div>{currentLecture.timetable?.location}</div>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Video className="w-5 h-5" />
                    <div>
                        <div className="text-sm text-stone-600 dark:text-stone-400">Mode</div>
                        <div>{currentLecture.timetable?.mode}</div>
                    </div>
                </div>
                <div className="mt-2 font-medium">
                    {currentLecture.timetable?.course_name || `Course ${currentLecture.timetable?.course_id}`}
                </div>
            </div>
        </Card>
    );
};

export default TodaysLecture; 