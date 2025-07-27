import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Card } from "@/components/ui/card";
  import { Checkbox } from "@/components/ui/checkbox";
  import { Fragment, useState, useEffect } from "react";
  
  import type  {ReRegistrationCourse}  from '@/pages/Registration/models/ReRegistrationCourse'
  
  export default function MakeUp() {
    const [courses, setCourses] = useState<ReRegistrationCourse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    // Fetch data from API
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await fetch("https://api.example.com/Enrolledcourses"); // Replace with your API endpoint
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setCourses(data);
        } catch (error) {
          // Fallback to JSON file
          fetch('/src/pages/Registration/data/reRegistrationCourses.json')
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
            ? { ...course, selected: !course.selected }
            : course
        )
      );
    };
  
    // Calculate total selected courses
    const totalSelected = courses.filter((course) => course.selected).length;
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    return (
      <Fragment>
        <Card className="p-3 mt-3">
            <h1><b>Re-registration</b></h1>
          <Table>
            {/* <TableCaption>A list of available courses.</TableCaption> */}
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
                <TableRow key={course.courseNumber} >
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
                  {/* <TableCell>
                    {course.filled}
                    <Progress value={course.filled} className="w-32" />

                  </TableCell> */}
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
        <div className="fixed bottom-0 w-full md:w-[calc(100%-20rem)] bg-white/70 shadow-md py-4 flex justify-end pr-10 dark:bg-stone-800/50">
  <button
    className="left-0 px-4 py-2 bg-ManipalAccent text-white rounded-lg"
    onClick={() => {
      const selectedCourses = courses.filter((course) => course.selected);
      fetch("https://api.example.com/submit-courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedCourses),
      })
        .then((response) => response.json())
        .then((data) => console.log("Success:", data))
        .catch((error) => console.error("Error:", error));
    }}
  >
    Confirm Selection
  </button>
</div>

      </Fragment>
    );
  }
