import { useGetTransactions, useGetWalletData, filterTransactions, type TTransaction, type TWalletData } from '../../lib';
import { render, screen, fireEvent, waitFor } from "../../lib";
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Revenue from './Revenue';

vi.mock('@mantine/hooks', () => ({
  useDisclosure: vi.fn(() => [false, { open: vi.fn(), close: vi.fn() }]),
}));

vi.mock('../../lib', async () => {
  const actual = await vi.importActual<object>('../../lib');

  return {
    ...actual,
    useGetTransactions: vi.fn(() => ({
      data: [],
      isLoading: true,
      error: null,
    })),

    useGetWalletData: vi.fn(() => ({
      data: undefined,
      isLoading: true,
      error: null,
    })),

    filterTransactions: vi.fn(() => []),

    formatAmount: (val: number) => val.toFixed(2),
    getWallet: (walletData: TWalletData) => [
      { name: 'Available Balance', amount: walletData?.balance ?? null },
      { name: 'Ledger Balance', amount: walletData?.ledger_balance ?? null },
    ],
  };
});

vi.mock('../../components', () => ({
  FloatingBar: () => <div data-testid="floating-bar" />,
  TransactionCard: ({ transaction }: {
    transaction: TTransaction;
  }) => (
    <div data-testid="transaction-card">{transaction.type}</div>
  ),
  FilterDrawer: () => <div data-testid="filter-drawer" />,
}));

vi.mock('@mantine/charts', () => ({
  LineChart: () => <div data-testid="line-chart" />,
}));


describe('<Revenue />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders skeletons when loading', () => {
    const useGetTransactions = vi.fn(() => ({ data: [], isLoading: true, error: null }));
    vi.doMock('../../lib', () => ({ useGetTransactions }));
    (useGetWalletData as ReturnType<typeof vi.fn>).mockReturnValue({ data: { balance: null, ledger_balance: null } });

    render(<Revenue />);
    expect(screen.getAllByTestId('loader')).toHaveLength(2);
    expect(screen.getAllByTestId('skeleton')).toHaveLength(3);
  });

  it('renders wallet amounts correctly', () => {
    (useGetTransactions as ReturnType<typeof vi.fn>).mockReturnValue({ data: [], isLoading: false });
    (useGetWalletData as ReturnType<typeof vi.fn>).mockReturnValue({
      data: { balance: 1000, ledger_balance: 800 },
    });

    render(<Revenue />);
    expect(screen.getByText(/USD 1000.00/)).toBeInTheDocument();
    expect(screen.getByText(/USD 800.00/)).toBeInTheDocument();
  });

  it('renders transactions when available', () => {
    const mockTransactions = [
      { type: 'deposit', amount: 200, date: '2022-03-01' },
      { type: 'withdrawal', amount: 100, date: '2022-03-02' },
    ];

    (useGetTransactions as ReturnType<typeof vi.fn>).mockReturnValue({
      data: mockTransactions,
      isLoading: false,
    });
    (useGetWalletData as ReturnType<typeof vi.fn>).mockReturnValue({ data: { balance: 500, ledger_balance: 300 } });
    (filterTransactions as ReturnType<typeof vi.fn>).mockReturnValue(mockTransactions);

    render(<Revenue />);

    expect(screen.getAllByTestId('transaction-card').length).toBe(2);
    expect(screen.getByTestId('line-chart')).toBeInTheDocument();
  });

  it('shows empty state message when no transactions', () => {
    (useGetTransactions as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [],
      isLoading: false,
    });

    render(<Revenue />);
    expect(screen.getByText(/No transaction found/i)).toBeInTheDocument();
  });

  it('shows empty state message when no transactions match filters', () => {
    (useGetTransactions as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [],
      isLoading: false,
    });
    (useGetWalletData as ReturnType<typeof vi.fn>).mockReturnValue({ data: { balance: 0, ledger_balance: 0 } });
    (filterTransactions as ReturnType<typeof vi.fn>).mockReturnValue([]);

    render(<Revenue />);
    expect(screen.getByText(/No matching transaction found for the selected filter/i)).toBeInTheDocument();
  });

  it('handles Clear Filter button click', async () => {
    (useGetTransactions as ReturnType<typeof vi.fn>).mockReturnValue({
      data: [],
      isLoading: false,
    });
    (useGetWalletData as ReturnType<typeof vi.fn>).mockReturnValue({ data: { balance: 0, ledger_balance: 0 } });
    (filterTransactions as ReturnType<typeof vi.fn>).mockReturnValue([]);

    render(<Revenue />);
    const clearButton = screen.getByRole('button', { name: /Clear Filter/i });
    fireEvent.click(clearButton);

    screen.debug();
    await waitFor(() => {
      expect(clearButton).toBeInTheDocument();
    });
  });
});

