// Utility functions for Finance page

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
} 