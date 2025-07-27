import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useAttendance } from '../hooks/useAttendance';
import AttendanceStats from './AttendanceStats';
import SubjectCardList from './SubjectCardList';

const AttendancePage = () => {
  const {
    expandedSubject,
    subjects,
    toggleExpand,
    calculateOverallStats,
  } = useAttendance();

  const stats = calculateOverallStats();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold ml-4">Detailed Attendance</h1>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="text-sm py-1 px-3">
            Semester: Spring 2023
          </Badge>
          <Badge variant="outline" className="text-sm py-1 px-3">
            Department: Computer Science
          </Badge>
        </div>
      </div>
      {/* Summary Stats Row */}
      <AttendanceStats stats={stats} />
      {/* Main Content */}
      <div className="">
        {/* Left Column - Subject Cards */}
        <div className="lg:col-span-2 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Subject Attendance
            </h2>
            <Badge variant="secondary" className="text-sm">
              {subjects.length} Subjects
            </Badge>
          </div>
          <SubjectCardList
            subjects={subjects}
            expandedSubject={expandedSubject}
            toggleExpand={toggleExpand}
          />
        </div>
      </div>
    </div>
  );
};

export default AttendancePage; 