import { describe, it, expect } from 'vitest';
import { filterTransactions } from './helpers';
import dayjs from 'dayjs';
import type { TTransactions } from '../types';

const mockTransactions: TTransactions = [
  { type: 'withdrawal', status: 'successful', date: '2022-03-01', amount: 300 },
  { type: 'deposit', status: 'pending', date: '2022-03-02', amount: 200 },
  { type: 'withdrawal', status: 'failed', date: '2022-04-01', amount: 100 },
];

describe('filterTransactions', () => {
  it('returns all when no filters applied', () => {
    const result = filterTransactions(mockTransactions, { 
      selectedTypes: [],
      selectedStatuses: [],
      dateRange: { startDate: null, endDate: null },
    });
    expect(result).toHaveLength(3);
  });

  it('filters by transaction type', () => {
    const result = filterTransactions(mockTransactions, {
      selectedTypes: ['Withdrawals'],
      selectedStatuses: [],
      dateRange: { startDate: null, endDate: null },
    });
    expect(result).toHaveLength(2);
    expect(result.every((tx) => tx.type === 'withdrawal')).toBe(true);
  });

  it('filters by status', () => {
    const result = filterTransactions(mockTransactions, {
      selectedTypes: [],
      selectedStatuses: ['pending'],
      dateRange: { startDate: null, endDate: null },
    });
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('pending');
  });

  it('filters by date range', () => {
    const result = filterTransactions(mockTransactions, {
      selectedTypes: [],
      selectedStatuses: [],
      dateRange: {
        startDate: dayjs('2022-03-01').toDate(),
        endDate: dayjs('2022-03-31').toDate(),
      },
    });
    expect(result).toHaveLength(2);
  });

  it('applies multiple filters together', () => {
    const result = filterTransactions(mockTransactions, {
      selectedTypes: ['Withdrawals'],
      selectedStatuses: ['successful'],
      dateRange: {
        startDate: dayjs('2022-03-01').toDate(),
        endDate: dayjs('2022-03-31').toDate(),
      },
    });
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('successful');
  });
});
