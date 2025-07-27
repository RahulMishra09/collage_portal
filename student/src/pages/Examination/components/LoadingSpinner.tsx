import type { FC } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import type { LoadingSpinnerProps } from '../models';

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center p-12"
    >
      <div className="flex flex-col items-center gap-4">
        <RefreshCw className="w-12 h-12 text-black dark:text-white animate-spin" />
        <p className="text-black dark:text-white">Loading examination schedules...</p>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner; 