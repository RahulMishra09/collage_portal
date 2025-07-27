import { useState, useEffect } from 'react';
import { fetchFees, fetchPaymentOptions } from '../api/financeApi';
import type { FeeItem, PaymentOptionType } from '../models';

export function useFinance() {
  const [tuitionFees, setTuitionFees] = useState<FeeItem[]>([]);
  const [additionalCharges, setAdditionalCharges] = useState<FeeItem[]>([]);
  const [paymentOptions, setPaymentOptions] = useState<PaymentOptionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);
      try {
        const [fees, options] = await Promise.all([
          fetchFees(),
          fetchPaymentOptions()
        ]);
        setTuitionFees(fees.tuitionFees);
        setAdditionalCharges(fees.additionalCharges);
        setPaymentOptions(options);
      } catch {
        setError('Failed to load finance data.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return {
    tuitionFees,
    additionalCharges,
    paymentOptions,
    isLoading,
    error,
  };
} 