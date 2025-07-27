import type { Class } from '../models';
import {Card} from '@/components/ui/card.tsx';
const TodaysClasses = ({classes}: { classes: Class[] }) => {
    return (
        <Card className='p-6 rounded-lg shadow-md'>
            <h2 className="text-xl font-semibold mb-4">Today's classes</h2>
            <div className="space-y-3">
                {classes.map((cls) => (
                    <div
                        key={cls.name}
                        className={`border-l-4 ${cls.color}  shadow-md p-4 rounded-lg`}
                    >
                        <div className="font-medium">{cls.name}</div>
                        <div className="text-sm ">{cls.time}</div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default TodaysClasses; 