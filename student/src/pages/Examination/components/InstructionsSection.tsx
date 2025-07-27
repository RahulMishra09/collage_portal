import type { FC } from 'react';
import { motion } from 'framer-motion';

const InstructionsSection: FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-12 bg-white dark:bg-black p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600"
  >
    <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Instructions</h2>
    <ul className="list-disc pl-6 text-black dark:text-white space-y-2">
      <li>Arrive at the exam venue at least 15 minutes before the scheduled time.</li>
      <li>Carry your student ID card and exam admit card at all times.</li>
      <li>Electronic devices are strictly prohibited inside the exam hall.</li>
      <li>Follow all instructions given by the invigilators.</li>
      <li>Any form of malpractice will result in disciplinary action.</li>
    </ul>
  </motion.div>
);

export default InstructionsSection; 