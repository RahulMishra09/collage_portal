import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import type { EmptyStateProps } from '../models';

const EmptyState: FC<EmptyStateProps> = ({ isVisible }) => {
  if (!isVisible) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center p-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
    >
      <Search className="w-16 h-16 mx-auto mb-4 text-black dark:text-white opacity-50" />
      <h3 className="text-xl font-semibold text-black dark:text-white mb-2">No examinations found</h3>
      <p className="text-black dark:text-white">Try adjusting your search criteria</p>
    </motion.div>
  );
};

export default EmptyState; 