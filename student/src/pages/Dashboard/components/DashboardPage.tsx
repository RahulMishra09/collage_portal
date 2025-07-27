import { Fragment } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import DashboardHeader from './DashboardHeader';
import DashboardMain from './DashboardMain';
import DashboardSidebar from './DashboardSidebar';

const DashboardPage = () => {
  const { classes, upcomingEvents } = useDashboard();

  return (
    <Fragment>
      <DashboardHeader />
      <div className="flex flex-col lg:flex-row gap-6 mt-5 dark:bg-neutral-950">
        <DashboardMain classes={classes} />
        <DashboardSidebar upcomingEvents={upcomingEvents} />
      </div>
    </Fragment>
  );
};

export default DashboardPage; 