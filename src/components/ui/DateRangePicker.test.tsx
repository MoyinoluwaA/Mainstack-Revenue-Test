import { render, screen, fireEvent } from '../../lib';
import { vi } from 'vitest';
import dayjs from 'dayjs';
import DateRangePicker, { type TDateRange } from './DateRangePicker';

// Mock the DatePickerCustomInput since we only want to test parent logic
vi.mock('./DatePickerInput', () => ({
  default: ({ placeholder }: { placeholder: string }) => (
    <input placeholder={placeholder} />
  ),
}));

// Mock the filterButtons array
vi.mock('../../lib', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../lib')>();
  return {
    ...actual,
    filterButtons: [
      { text: 'Today' },
      { text: 'Last 7 days' },
      { text: 'This month' },
      { text: 'Last 3 months' },
    ],
  };
});

describe('DateRangePicker', () => {
  const mockSetDateRange = vi.fn();

  const initialRange: TDateRange = {
    startDate: null,
    endDate: null,
    timePeriod: 'All Time',
    period: 'All Time',
  };

  beforeEach(() => {
    mockSetDateRange.mockClear();
  });

  it('renders quick range buttons and date pickers', () => {
    render(<DateRangePicker dateRange={initialRange} setDateRange={mockSetDateRange} />);
    
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('Last 7 days')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Pick start date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Pick end date')).toBeInTheDocument();
  });

  it('calls setDateRange when clicking a quick range button', () => {
    render(<DateRangePicker dateRange={initialRange} setDateRange={mockSetDateRange} />);
    mockSetDateRange.mockClear();

    const todayButton = screen.getByText('Today');
    fireEvent.click(todayButton);

    expect(mockSetDateRange).toHaveBeenCalledTimes(1);
    const arg = mockSetDateRange.mock.calls[0][0];
    expect(arg.timePeriod).toBe('today');
    expect(dayjs(arg.startDate).isSame(dayjs(), 'day')).toBe(true);
    expect(dayjs(arg.endDate).isSame(dayjs(), 'day')).toBe(true);
  });

  it('applies "filled" variant to the active quick range button', () => {
    const activeRange: TDateRange = {
      startDate: new Date(),
      endDate: new Date(),
      timePeriod: 'today',
      period: 'Today',
    };

    render(<DateRangePicker dateRange={activeRange} setDateRange={mockSetDateRange} />);

    const todayButton = screen.getByRole('button', { name: 'Today' });
    const last7Button = screen.getByRole('button', { name: 'Last 7 days' });

    expect(todayButton).toHaveAttribute('data-variant', 'filled');
    expect(last7Button).toHaveAttribute('data-variant', 'outline');
  });

  it('resets to All Time when both start and end dates are cleared', () => {
    const { rerender } = render(
      <DateRangePicker dateRange={initialRange} setDateRange={mockSetDateRange} />
    );

    // simulate setting dates manually
    rerender(
      <DateRangePicker
        dateRange={{
          startDate: new Date(),
          endDate: new Date(),
          timePeriod: 'Custom',
          period: 'Custom',
        }}
        setDateRange={mockSetDateRange}
      />
    );

    // manually clear both dates to trigger reset
    rerender(
      <DateRangePicker
        dateRange={{
          startDate: null,
          endDate: null,
          timePeriod: 'All Time',
          period: 'All Time',
        }}
        setDateRange={mockSetDateRange}
      />
    );

    // it should have called setDateRange with All Time
    expect(mockSetDateRange).toHaveBeenCalledWith({
      startDate: null,
      endDate: null,
      timePeriod: 'All Time',
      period: 'All Time',
    });
  });
});
