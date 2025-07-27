import { motion } from 'framer-motion';
import type { JSX } from 'react';
import { GraduationCap, CreditCard, PiggyBank } from 'lucide-react';
import { CardTitle } from '@/components/ui/card';
import FeeSection from './FeeSection';
import PaymentOption from './PaymentOption';
import { useFinance } from '../hooks/useFinance';

const iconMap: Record<string, JSX.Element> = {
  'Full Payment': <PiggyBank />,
  'Installment Plan': <CreditCard />,
  'Scholarship': <GraduationCap />,
};

const FinancePage = () => {
  const { tuitionFees, additionalCharges, paymentOptions, isLoading, error } = useFinance();

  const paymentOptionsWithIcons = paymentOptions.map(option => ({
    ...option,
    icon: iconMap[option.title] || <GraduationCap />,
  }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 max-w-6xl mx-auto dark:bg-black-300 dark:text-white">
      <motion.h1 initial={{ y: -20 }} animate={{ y: 0 }} className=" mb-8 text-black dark:text-white">
        <CardTitle>Finance {'>>'}</CardTitle>
      </motion.h1>
      <motion.div initial={{ x: -20 }} animate={{ x: 0 }} className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <GraduationCap className="text-black dark:text-white" />
          College Fees (2024-25)
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <FeeSection title="Tuition Fees" data={tuitionFees} />
          <FeeSection title="Additional Charges" data={additionalCharges} />
        </div>
      </motion.div>
      <motion.div initial={{ x: 20 }} animate={{ x: 0 }} className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <CreditCard className="text-black dark:text-white" />
          Payment Options
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {paymentOptionsWithIcons.map(option => (
            <PaymentOption key={option.title} {...option} />
          ))}
        </div>
      </motion.div>
      {isLoading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
    </motion.div>
  );
};

export default FinancePage; 