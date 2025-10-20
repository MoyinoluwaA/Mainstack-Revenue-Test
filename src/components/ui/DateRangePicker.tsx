import { Box, Button, Group, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { filterButtons } from '../../lib';
import { useEffect, useState } from 'react';
import DatePickerCustomInput from './DatePickerInput';

export type TDateRange = {
  startDate: Date | null;
  endDate: Date | null;
  timePeriod: string;
  period: string;
}
interface Props {
  dateRange: TDateRange;
  setDateRange: (val: TDateRange) => void;
}
const DateRangePicker = ({ dateRange, setDateRange }: Props) => {
  const [activePicker, setActivePicker] = useState<"start" | "end" | null>(null);
  const [startDate, setStartDate] = useState<string | null>(dateRange.startDate ? dayjs(dateRange.startDate)?.format('DD MMM YYYY') : null);
  const [endDate, setEndDate] = useState<string | null>(dateRange.endDate ? dayjs(dateRange.endDate)?.format('DD MMM YYYY') : null);
  const [skipEffect, setSkipEffect] = useState(false);

  useEffect(() => {
    if (skipEffect) {
      setSkipEffect(false);
      return;
    }

    if (startDate && endDate) {
      setDateRange({
        startDate: dayjs(startDate).toDate(),
        endDate: dayjs(endDate).toDate(),
        timePeriod: `Custom Range: ${startDate} - ${endDate}`,
        period: `${dayjs(startDate).format('MMM dd, YYYY')} - ${dayjs(endDate).format('MMM dd, YYYY')}`
      });
    } else if (!startDate && !endDate) {
      // reset to empty if both are cleared
      setDateRange({ startDate: null, endDate: null, timePeriod: "All Time", period: "All Time" });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);
  
  const handleQuickRangeChange = (value: string) => {
    const today = dayjs();
    let startDate: Date | null = null;
    let endDate: Date | null = null;
    let timePeriod;

    switch (value) {
      case "Today":
        startDate = today.startOf("day").toDate();
        endDate = today.endOf("day").toDate();
        timePeriod = "today"
        break;

      case "Last 7 days":
        startDate = today.subtract(6, "day").startOf("day").toDate();
        endDate = today.endOf("day").toDate();
        timePeriod = "the last 7 days"
        break;

      case "This month":
        startDate = today.startOf("month").toDate();
        endDate = today.endOf("month").toDate();
        timePeriod = "this month"
        break;

      case "Last 3 months":
        startDate = today.subtract(3, "month").toDate();
        endDate = today.toDate();
        timePeriod = "the last 3 months"
        break;

      default:
        timePeriod = "All Time"
        break;
    }
    setSkipEffect(true);
    setStartDate(dayjs(startDate).format('DD MMM YYYY'));
    setEndDate(dayjs(endDate).format('DD MMM YYYY'));

    setDateRange({ startDate, endDate, timePeriod, period: value });
  };

  return (
    <Stack gap={24}>
      <Group gap={8} mx={-6}>
        {
          filterButtons.map((button) => (
            <Button key={button.text} 
              variant={ dateRange.period === button.text ? 'filled' : 'outline'} 
              color="#EFF1F6" fz="sm" fw="600" 
              className="rounded-[100px] text-[#131316] hover:bg-[#EFF1F6]"
              onClick={() => handleQuickRangeChange(button.text)}
            >
              {button.text}
            </Button>
          ))
        }
      </Group>
      <Box className="mb-6">
        <Text fw="600" mb={12} lh={1}>Date Range</Text>
        <Group gap={6} grow>
          <DatePickerCustomInput 
            placeholder="Pick start date"
            isOpen={activePicker === 'start'}
            value={startDate}
            setValue={setStartDate}
            datePickerType='start'
            setActivePicker={setActivePicker}
            dateRange={dateRange}
          />

          <DatePickerCustomInput 
            placeholder="Pick end date"
            isOpen={activePicker === 'end'}
            value={endDate}
            setValue={setEndDate}
            datePickerType='end'
            setActivePicker={setActivePicker}
            dateRange={dateRange}
          />
        </Group>
      </Box>
    </Stack>
  )
}

export default DateRangePicker