import {Clock, ChevronRight} from 'lucide-react';

const LearningCurve = () => {
    return (
        <div className="p-6 rounded-lg bg-white dark:bg-compP">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Learning Curve</h2>
                <div className="flex gap-2">
                    <button className="p-2 bg-gray-300 dark:bg-slate-700 rounded-lg">
                        <Clock className="w-4 h-4"/>
                    </button>
                    <button className="p-2 bg-gray-300 dark:bg-slate-700 rounded-lg">
                        <ChevronRight className="w-4 h-4"/>
                    </button>
                </div>
            </div>
            {/* Learning curve content here */}
        </div>
    );
};

export default LearningCurve; 