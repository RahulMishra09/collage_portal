import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, BookOpen, Clock } from 'lucide-react';
import { getBadgeColor } from '../utils/examinationUtils';
import type { ExamCardProps } from '../models';

const ExamCard: FC<ExamCardProps> = ({ exam, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 5 }}
    whileHover={{ scale: 1.01, translateY: -2 }}
    className="dark:bg-gradient-to-br from-neutral-900 to-zinc-900 text-card-foreground p-3 rounded-xl shadow-lg border-l-4 border border-gray-200 dark:border-gray-800 relative overflow-hidden hover:shadow-2xl transition-shadow"
    key={index}
  >
    <div className={`absolute top-0 right-0 px-4 py-1 text-sm font-semibold rounded-bl-lg ${getBadgeColor(exam.exam_type)} text-white`}>
      {exam.exam_type}
    </div>
    <h3 className="text-lg font-bold mb-2 pl-1 text-black dark:text-white">
      {exam.course_name}
    </h3>
    <div className="grid md:grid-cols-2 gap-4 text-sm">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-black dark:text-white" />
          <span className="text-black dark:text-white">
            {new Date(exam.exam_date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-black dark:text-white" />
          <span className="text-black dark:text-white">{exam.location}</span>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-black dark:text-white" />
          <span className="text-black dark:text-white">Course ID: {exam.course_id}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-black dark:text-white" />
          <span className="text-black dark:text-white">Maximum Marks: {exam.total_marks}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

export default ExamCard; 