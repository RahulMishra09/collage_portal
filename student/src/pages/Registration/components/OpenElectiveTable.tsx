import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Fragment } from 'react';
import type { OpenElectiveTableProps } from '../models/OpenElectiveTableProps';

export default function OpenElectiveTable({ courses, loading,  handleSelectToggle, handleSubmit }: OpenElectiveTableProps) {
  if (loading) return <div className="flex justify-center items-center h-64">Loading courses...</div>;
  return (
    <Fragment>
      <Card className="p-3 mt-3">
        <h1><b>Open-Elective Courses</b></h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Select</TableHead>
              <TableHead>Course Name</TableHead>
              <TableHead>Course Number</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Filled</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map(course => (
              <TableRow key={course.courseNumber}>
                <TableCell>
                  <Checkbox checked={course.selected} onCheckedChange={() => handleSelectToggle(course.courseNumber)} />
                </TableCell>
                <TableCell className="font-medium">{course.courseName}</TableCell>
                <TableCell>{course.courseNumber}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>{course.filled}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total Selected</TableCell>
              <TableCell className="text-right">{courses.filter(c => c.selected).length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
      <div className="fixed bottom-0 w-full md:w-[calc(100%-20rem)] bg-white/70 shadow-md py-4 flex justify-end pr-10 dark:bg-stone-800/50">
        <button className="left-0 px-4 py-2 bg-ManipalAccent text-white rounded-lg" onClick={handleSubmit}>
          Confirm Selection
        </button>
      </div>
    </Fragment>
  );
} 