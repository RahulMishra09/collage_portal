import AttendanceSummary from '@/components/attendance/AttendanceSummary';
import UpcomingEvents from '@/pages/Dashboard/components/UpcomingEvents';

interface DashboardSidebarProps {
  upcomingEvents: { title: string; date: string; time: string; location: string }[];
}

const DashboardSidebar = ({ }: DashboardSidebarProps) => (
  <div className="w-full lg:w-80 space-y-6">
    <AttendanceSummary />
    <UpcomingEvents  />
  </div>
);

export default DashboardSidebar; 