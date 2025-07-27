import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { formatCurrency } from '../utils/financeUtils';
import type { FeeItem } from '../models';

const FeeSection: FC<{ title: string; data: FeeItem[] }> = ({ title, data }) => (
  <motion.div whileHover={{ scale: 1.02 }}>
    <Card className='p-6'>
      <h3 className="text-lg font-medium mb-4 text-black dark:text-white">{title}</h3>
      <ul className="space-y-3">
        {data.map(({ item, amount }) => (
          <li key={item} className="flex justify-between items-center text-gray-800 dark:text-gray-200">
            <span>{item}</span>
            <span className="font-semibold">{formatCurrency(Number(amount))}</span>
          </li>
        ))}
      </ul>
    </Card>
  </motion.div>
);

export default FeeSection; 