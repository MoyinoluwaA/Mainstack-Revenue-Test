export type TDateRange = {
  startDate: Date | null;
  endDate: Date | null;
  timePeriod: string;
  period: string;
};

export type TFilters = {
  type: string[];
  status: string[];
  dateRange: TDateRange;
};

export type TFiltersObj = {
  pending: TFilters;
  applied: TFilters;
}

type DateRange = {
  startDate: Date | null;
  endDate: Date | null;
};

export type FilterParams = {
  selectedTypes: string[];
  selectedStatuses: string[];
  dateRange: DateRange;
};
