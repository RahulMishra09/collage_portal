import type { FC } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import type { ErrorMessageProps } from '../models';

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800"
    >
      <div className="flex items-center gap-2">
        <AlertCircle className="w-5 h-5" />
        <p>{message}</p>
      </div>
    </motion.div>
  );
};

export default ErrorMessage; 