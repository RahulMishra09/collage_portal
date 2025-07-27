import {Card} from '@/components/ui/card';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import type { Subject, AttendanceRecord } from '../../pages/Attendance/models';

const AttendanceSummary = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [fallbackSubjects, setFallbackSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        fetch('/src/data/attendance/summarySubjects.json')
          .then(res => res.json())
          .then(data => setFallbackSubjects(data));
    }, []);

    useEffect(() => {
        async function fetchAttendanceData() {
            try {
                setLoading(true);

                // Get user from localStorage
                const user = JSON.parse(localStorage.getItem("user") || '{}');

                // Fetch attendance data
                const url = new URL('http://localhost:3000/api/students/attendance?regNo=ENR1');
                url.searchParams.append('enrollment_number', user.enrollmentNumber);
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to fetch attendance data');
                }

                const attendanceData: AttendanceRecord[] = await response.json();

                // Process the attendance data
                const courseAttendance: {
                    [key: number]: {
                        present: number;
                        total: number;
                        name: string;
                    }
                } = {};

                // Count present and total classes for each course
                attendanceData.forEach(record => {
                    if (!courseAttendance[record.course_id]) {
                        courseAttendance[record.course_id] = {
                            present: 0,
                            total: 0,
                            name: record.course_name
                        };
                    }

                    courseAttendance[record.course_id].total += 1;
                    if (record.status === 'Present') {
                        courseAttendance[record.course_id].present += 1;
                    }
                });

                // Calculate attendance percentage for each course
                const calculatedSubjects: Subject[] = Object.entries(courseAttendance).map(([courseId, data]) => {
                    const id = parseInt(courseId);
                    const percentage = Math.round((data.present / data.total) * 100);
                    return {
                        name: data.name,
                        attendance: percentage,
                        courseId: id
                    };
                });

                setSubjects(calculatedSubjects.length > 0 ? calculatedSubjects : fallbackSubjects);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
                setSubjects(fallbackSubjects);
            } finally {
                setLoading(false);
            }
        }

        if (fallbackSubjects.length > 0) {
            fetchAttendanceData();
        }
    }, [fallbackSubjects]);

    const getProgressColor = (percentage: number): string => {
        if (percentage >= 90) return 'bg-green-500';
        if (percentage >= 80) return 'bg-blue-500';
        if (percentage >= 75) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    const calculateAverage = (subjects: Subject[]): string => {
        return (subjects.reduce((acc, curr) => acc + curr.attendance, 0) / subjects.length).toFixed(1);
    };

    return (
        <Card className='p-6'>
            <h2 className="text-xl font-semibold mb-4">Attendance Summary</h2>

            {loading ? (
                <div className="py-8 text-center">Loading attendance data...</div>
            ) : (
                <div className="space-y-3">
                    {subjects.map((subject) => (
                        <div key={`${subject.courseId}-${subject.name}`} className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span>{subject.name}</span>
                                <span className="font-medium">{subject.attendance}%</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-stone-700">
                                <div
                                    className={`h-full rounded-full transition-all duration-300 ease-in-out ${getProgressColor(subject.attendance)}`}
                                    style={{width: `${subject.attendance}%`}}
                                />
                            </div>
                        </div>
                    ))}

                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-stone-700">
                        <div className="flex justify-between text-sm">
                            <span className="opacity-70">Average</span>
                            <span className="font-medium">
                    {calculateAverage(subjects)}%
                  </span>
                  <Link to="/attendance" className="text-blue-500"><span className="font-medium">Detailed Attendance</span></Link>
                            
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default AttendanceSummary;