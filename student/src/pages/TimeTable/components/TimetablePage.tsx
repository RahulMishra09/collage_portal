import Calendar from '@/components/screens/calendar/calendar';
import { CardTitle } from '@/components/ui/card';

const TimetablePage = () => {
  return (
    <div className="mt-5">
      <CardTitle className='ml-4'>Time Table {'>>'}</CardTitle>
      <Calendar />
    </div>
  );
};

export default TimetablePage; 