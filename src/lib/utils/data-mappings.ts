import type { TWalletData } from "../types"

export const getWallet = (walletData: TWalletData | undefined) => {
  return [
    {
      name: 'Available Balance',
      amount: walletData?.balance ?? null
    },
    {
      name: 'Ledger Balance',
      amount: walletData?.ledger_balance ?? null
    },
    {
      name: 'Total Payout',
      amount: walletData?.total_payout ?? null
    },
    {
      name: 'Total Revenue',
      amount: walletData?.total_revenue ?? null
    },
    {
      name: 'Pending Payout',
      amount: walletData?.pending_payout ?? null
    }
  ]
}
