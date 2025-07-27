import type { FC } from 'react';
import { AnimatePresence } from 'framer-motion';
import ExamCard from './ExamCard';
import type { ExamListProps } from '../models';

const ExamList: FC<ExamListProps> = ({ exams, isLoading }) => (
  <div className="grid gap-6 mt-6">
    <AnimatePresence>
      {!isLoading && exams.map((exam, idx) => (
        <ExamCard key={exam.exam_id} exam={exam} index={idx} />
      ))}
    </AnimatePresence>
  </div>
);

export default ExamList; 