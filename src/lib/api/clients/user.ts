import type { TGetUserData } from '../../types';
import Client from './axios';

const userClient = {
  /**
   * Description - Retrieves user data
   * @returns
   */
  getUserData: async () => {
    return await Client.get<TGetUserData>('user');
  },
};

export default userClient;
