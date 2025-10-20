import dayjs from "dayjs";
import type { FilterParams, TTransactions } from "../types";

/**
 * Description - Formats a number as a price with comma separators with decimal places.
 * @param amount - The number to format
 * @param decimalPlaces - The number of decimal
 * @returns - The formatted amount string
 */
export const formatAmount = (amount: number, decimalPlaces: number = 0): string => {
  return amount?.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });
};

/**
 * Description - Filters transaction based on transaction type, status and date range
 * @param transactions - All transactions
 * @param obj.selectedTypes - Array of all selected transaction types
 * @param obj.selectedStatuses - Array of all selected transaction status
 * @param obj.dateRange - date range
 * @returns - The formatted amount string
 */
export const filterTransactions = (transactions: TTransactions, {
  selectedTypes,
  selectedStatuses,
  dateRange,
}: FilterParams): TTransactions => {
  return transactions.filter((tx) => {
    // ✅ Match type
    const typeMatch =
      selectedTypes.length === 0 ||
      selectedTypes.some(
        (t) => t.toLowerCase() === tx.type.toLowerCase() || 
               (t === "Deposits" && tx.type === "deposit") ||
               (t === "Withdrawals" && tx.type === "withdrawal")
      );

    // ✅ Match status
    const statusMatch =
      selectedStatuses.length === 0 ||
      selectedStatuses.some(
        (s) => s.toLowerCase() === tx.status.toLowerCase()
      );

    // ✅ Match date range
    const dateMatch =
      !dateRange.startDate && !dateRange.endDate
        ? true // All time
        : (dayjs(tx.date).isAfter(dayjs(dateRange.startDate).subtract(1, "day")) &&
              dayjs(tx.date).isBefore(dayjs(dateRange.endDate).add(1, "day")))

    return typeMatch && statusMatch && dateMatch;
  });
};

