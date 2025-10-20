import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { TGetUserData } from '../../types';
import userClient from '../clients/user';

export const useGetUserData = (): UseQueryResult<TGetUserData, Error> => {
  return useQuery<TGetUserData, Error>({
    queryKey: ['user'],
    queryFn: () => userClient.getUserData(),
    staleTime: 1000 * 60 * 5,
  });
};
