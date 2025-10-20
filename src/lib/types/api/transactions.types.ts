export type TWalletData = {
  balance: number,
  total_payout: number,
  total_revenue: number,
  pending_payout: number,
  ledger_balance: number
}

type TTransactionMetadata = {
  name: string,
  type: string,
  email: string,
  quantity: number,
  country: string,
  product_name?: string
}

export type TTransaction = {
  amount: number,
  metadata?: TTransactionMetadata,
  payment_reference?: string,
  status: string,
  type: "deposit" | "withdrawal",
  date: string
}

export type TTransactions = TTransaction[];
