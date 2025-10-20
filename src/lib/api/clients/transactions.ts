import type { TTransactions, TWalletData } from '../../types';
import Client from './axios';

const transactionsClient = {
  /**
   * Description - Retrieve wallet data
   * @returns
   */
  getWalletData: async () => {
    return await Client.get<TWalletData>('wallet');
  },
  /**
   * Description - Retrieve all transactions
   * @returns
   */
  getTransactions: async () => {
    return await Client.get<TTransactions>('transactions');
  },
};

export default transactionsClient;
