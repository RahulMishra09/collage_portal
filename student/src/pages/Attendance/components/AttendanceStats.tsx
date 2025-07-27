import { Users, Calendar, Percent } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

interface AttendanceStatsProps {
  stats: {
    totalPresent: number;
    totalAbsent: number;
    totalClasses: number;
    overallPercentage: string;
  };
}

const AttendanceStats = ({ stats }: AttendanceStatsProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div className="flex items-center p-6 rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 shadow-sm">
      <div className="rounded-full bg-green-100 dark:bg-green-800/30 p-3 mr-4">
        <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-green-600 dark:text-green-400">Present</h3>
        <p className="text-3xl font-bold">{stats.totalPresent}</p>
      </div>
    </div>
    <div className="flex items-center p-6 rounded-lg bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 shadow-sm">
      <div className="rounded-full bg-red-100 dark:bg-red-800/30 p-3 mr-4">
        <Users className="h-6 w-6 text-red-600 dark:text-red-400" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-red-600 dark:text-red-400">Absent</h3>
        <p className="text-3xl font-bold">{stats.totalAbsent}</p>
      </div>
    </div>
    <div className="flex items-center p-6 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 shadow-sm">
      <div className="rounded-full bg-blue-100 dark:bg-blue-800/30 p-3 mr-4">
        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Classes</h3>
        <p className="text-3xl font-bold">{stats.totalClasses}</p>
      </div>
    </div>
    <div className="flex items-center p-6 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 shadow-sm">
      <div className="rounded-full bg-purple-100 dark:bg-purple-800/30 p-3 mr-4">
        <Percent className="h-6 w-6 text-purple-600 dark:text-purple-400" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-purple-600 dark:text-purple-400">Overall</h3>
        <p className="text-3xl font-bold">{stats.overallPercentage}%</p>
      </div>
    </div>
  </div>
);

export default AttendanceStats; 