import StudentDetails from '@/pages/Dashboard/components/StudentDetail';
import TodaysLecture from '@/pages/Dashboard/components/TodaysLecture';
import TodaysClasses from '@/pages/Dashboard/components/TodaysClasses';

interface DashboardMainProps {
  classes: any[];
}

const DashboardMain = ({ classes }: DashboardMainProps) => (
  <div className="flex-1 flex flex-col gap-6">
    <StudentDetails />
    <div className="flex flex-col xl:flex-row gap-6">
      <TodaysLecture />
      <div className="flex-1">
        <TodaysClasses classes={classes} />
      </div>
    </div>
  </div>
);

export default DashboardMain; 