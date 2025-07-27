import SubjectCard from './SubjectCard';
import type { DetailedSubject } from '../models';

interface SubjectCardListProps {
  subjects: DetailedSubject[];
  expandedSubject: number | null;
  toggleExpand: (serialNo: number) => void;
}

const SubjectCardList = ({ subjects, expandedSubject, toggleExpand }: SubjectCardListProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {subjects.map((subject) => (
      <SubjectCard
        key={subject.serialNo}
        subject={subject}
        expanded={expandedSubject === subject.serialNo}
        onToggle={toggleExpand}
      />
    ))}
  </div>
);

export default SubjectCardList; 