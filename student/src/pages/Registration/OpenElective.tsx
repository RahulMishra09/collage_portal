import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Card} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {Progress} from "@/components/ui/progress";
import {Fragment, useState, useEffect} from "react";

import type { Course } from '@/pages/Registration/models/Courses';

export default function OpenElective() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data from API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:3000/api/students/open-elective-courses");

                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status}`);
                }

                const data = await response.json();

                // Map API response to ensure all required fields are present
                const formattedCourses = data.map((course: any) => ({
                    courseName: course.course_name || "Unknown Course",
                    courseNumber: course.course_code || course.department || "Unknown Code",
                    description: course.description || "No description available",
                    filled: typeof course.filled === 'number' ? course.filled : Math.floor(Math.random() * 100), // Random fill if not provided
                    selected: false
                }));

                setCourses(formattedCourses);
                setError(null);
            } catch (error) {
                // Fallback to JSON file
                fetch('/src/pages/Registration/data/openElectiveCourses.json')
                    .then(res => res.json())
                    .then(data => setCourses(data));
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    // Handle checkbox toggle
    const handleSelectToggle = (courseNumber: string) => {
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
                course.courseNumber === courseNumber
                    ? {...course, selected: !course.selected}
                    : course
            )
        );
    };

    // Calculate total selected courses
    const totalSelected = courses.filter((course) => course.selected).length;

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading courses...</div>;
    }

    return (
        <Fragment>
            <Card className="p-3 mt-3">
                <h1><b>Open-Elective Courses</b></h1>
                {error && <div className="text-red-500 mb-2">{error}</div>}
                <Table>
                    <TableCaption>A list of available courses.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Select</TableHead>
                            <TableHead className="">Course Name</TableHead>
                            <TableHead>Course Number</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Filled</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {courses.map((course) => (
                            <TableRow key={course.courseNumber}>
                                <TableCell>
                                    <Checkbox
                                        checked={course.selected}
                                        onCheckedChange={() => handleSelectToggle(course.courseNumber)}
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{course.courseName}</TableCell>
                                <TableCell>{course.courseNumber}</TableCell>
                                <TableCell>{course.description}</TableCell>
                                <TableCell>
                                    {course.filled}
                                    <Progress value={course.filled} className="w-32"/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total Selected</TableCell>
                            <TableCell className="text-right">{totalSelected}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Card>
            <div
                className="fixed bottom-0 w-full md:w-[calc(100%-20rem)] bg-white/70 shadow-md py-4 flex justify-end pr-10 dark:bg-stone-800/50">
                <button
                    className="left-0 px-4 py-2 bg-ManipalAccent text-white rounded-lg"
                    onClick={() => {
                        const selectedCourses = courses.filter((course) => course.selected);
                        fetch("https://api.example.com/submit-courses", {
                            method: "POST",
                            headers: {"Content-Type": "application/json"},
                            body: JSON.stringify(selectedCourses),
                        })
                            .then((response) => response.json())
                            .then((data) => console.log("Selection submitted successfully:", data))
                            .catch((error) => console.error("Error submitting selection:", error));
                    }}
                >
                    Confirm Selection
                </button>
            </div>
        </Fragment>
    );
}