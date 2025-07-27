import type { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import type { PaymentOptionType } from '../models';

const PaymentOption: FC<PaymentOptionType & { icon: ReactNode }> = ({ title, icon, buttonColor }) => (
  <motion.div whileHover={{ scale: 1.05 }}>
    <Card className='p-6'>
      <div className="flex items-center gap-2 mb-3 text-black dark:text-white">
        {icon}
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`${buttonColor} text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300`}>
        Pay Now
      </motion.button>
    </Card>
  </motion.div>
);

export default PaymentOption; 