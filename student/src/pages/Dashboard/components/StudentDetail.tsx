import type { FC } from 'react';
import { User, GraduationCap, Medal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useStudentDetail } from '../hooks/useStudentDetail';

const StudentDetails: FC = () => {
    const { student, loading } = useStudentDetail();

    if (loading) {
        return <Card className='rounded-lg p-4 shadow-md'>Loading student details...</Card>;
    }

    return (
        <Card className='rounded-lg p-4 shadow-md'>
            <div className="flex items-center mb-6">
                <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center mr-4">
                    <User className="w-10 h-10 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold">{student?.name}</h2>
                    <p className="text-sm text-stone-600 dark:text-stone-400">{student?.major}</p>
                </div>
            </div>
            <div className="space-y-4">
                <div className="flex items-center">
                    <GraduationCap className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                    <div>
                        <p className="font-medium">Semester GPA</p>
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">{student?.gpa}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Medal className="w-6 h-6 mr-3 text-yellow-600 dark:text-yellow-400" />
                    <div>
                        <p className="font-medium">Academic Standing</p>
                        <p className="text-blue-700 dark:text-blue-300">{student?.academicStanding}</p>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-dashed border-stone-700 dark:border-stone-700">
                    <div className="grid grid-cols-3 text-center">
                        <div>
                            <p className="text-sm">Credits</p>
                            <p className="font-bold">{student?.credits}</p>
                        </div>
                        <div>
                            <p className="text-sm">Major</p>
                            <p className="font-bold">{student?.majorCode}</p>
                        </div>
                        <div>
                            <p className="text-sm">Year</p>
                            <p className="font-bold">{student?.year}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default StudentDetails; 