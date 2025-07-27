// API functions for Finance page
import { API_ENDPOINTS } from '../../../api/endpoints';
import { apiRequest } from '../../../api/client';

export function fetchFees() {
  return apiRequest(API_ENDPOINTS.finance.fees);
}

export function fetchPaymentOptions() {
  return apiRequest(API_ENDPOINTS.finance.paymentOptions);
} 