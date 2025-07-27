import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {Card} from "@/components/ui/card";
import {Checkbox} from "@/components/ui/checkbox";
import {Fragment, useState, useEffect} from "react";
import type { SemesterCourses } from '@/pages/Registration/models/SemesterCourse';
import type { ApiCourse } from './models/ApiCourse';

export default function MakeUp() {
    const [courses, setCourses] = useState<SemesterCourses[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data from API
    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch("http://localhost:3000/api/students/ENR1/courses");
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status}`);
                }
                const data: ApiCourse[] = await response.json();

                // Map API data to our interface
                const mappedCourses: SemesterCourses[] = data.map(apiCourse => ({
                    courseName: apiCourse.course_name,
                    courseNumber: apiCourse.course_code,
                    // Since API doesn't provide description or credits, use placeholders
                    description: `Course ID: ${apiCourse.course_id}, Semester: ${apiCourse.semester}`,
                    credits: 3, // Default value
                    selected: false
                }));

                setCourses(mappedCourses);
            } catch (error) {
                // Fallback to JSON file
                fetch('/src/pages/Registration/data/semesterCourses.json')
                    .then(res => res.json())
                    .then(data => setCourses(data));
                setError("Failed to load courses from the server. Using default courses instead.");
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
        return <div className="flex justify-center items-center h-40">Loading courses...</div>;
    }

    return (
        <Fragment>
            <Card className="p-3 mt-3">
                <h1><b>Register for Semester Courses</b></h1>
                {error && (
                    <div className="mb-4 p-2 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                        {error}
                    </div>
                )}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Select</TableHead>
                            <TableHead className="">Course Name</TableHead>
                            <TableHead>Course Number</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Credits</TableHead>
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
                                <TableCell>{course.credits}</TableCell>
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

                        // Parse the course_id from the description, which has format "Course ID: X, Semester: Y"
                        const registrationRequests = selectedCourses.map(course => {
                            const courseIdMatch = course.description.match(/Course ID: (\d+)/);
                            const courseId = courseIdMatch ? parseInt(courseIdMatch[1]) : 0;
                            const user = JSON.parse(localStorage.getItem("user") || '{}');

                            return {
                                enrollment_number: user.enrollmentNumber, // Hardcoded for now, could be extracted from user context
                                course_id: courseId,
                                status: "registered"
                            };
                        });

                        // Send registration requests to the API
                        Promise.all(
                            registrationRequests.map(request =>
                                fetch("http://localhost:3000/api/students/course/register", {
                                    method: "POST",
                                    headers: {"Content-Type": "application/json"},
                                    body: JSON.stringify(request),
                                }).then(response => {
                                    console.log("Response:", response);
                                    console.log("Body:", request);
                                    if (!response.ok) {
                                        throw new Error(`Registration failed: ${response.status}`);
                                    }
                                    return response.json();
                                })
                            )
                        )
                            .then(results => {
                                console.log("Success:", results);
                                alert("Courses registered successfully!");
                            })
                            .catch(error => {
                                console.error("Error:", error);
                                alert("Failed to register courses. Please try again.");
                            });
                    }}
                >
                    Confirm Selection
                </button>
            </div>
        </Fragment>
    );
}