import type { FC } from 'react';
import { motion } from 'framer-motion';
import { CardTitle } from '@/components/ui/card';

const PageHeader: FC = () => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-4 pt-3"
  >
    <CardTitle>Schedule {'>>'}</CardTitle>
  </motion.div>
);

export default PageHeader; 