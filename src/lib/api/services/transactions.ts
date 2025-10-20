import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { TTransactions, TWalletData } from '../../types';
import transactionsClient from '../clients/transactions';


export const useGetWalletData = (): UseQueryResult<TWalletData, Error> => {
  return useQuery<TWalletData, Error>({
    queryKey: ['wallet'],
    queryFn: () => transactionsClient.getWalletData(),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const useGetTransactions = (): UseQueryResult<TTransactions, Error> => {
  return useQuery<TTransactions, Error>({
    queryKey: ['transactions'],
    queryFn: () => transactionsClient.getTransactions(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
