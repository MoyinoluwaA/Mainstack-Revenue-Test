import { Box, Button, Drawer, Group, Text } from '@mantine/core'
import DateRangePicker, { type TDateRange } from './DateRangePicker'
import MultiSelectDropdown from './MultiSelectDropdown'
import { transactionStatus, transactionType, type TFilters, type TFiltersObj } from '../../lib'
import type { Dispatch } from 'react';

interface Props {
  opened: boolean;
  close: () => void;
  dateRange: TDateRange;
  selectedTransactionType: string[];
  selectedTransactionStatus: string[]; 
  setFilters: Dispatch<React.SetStateAction<TFiltersObj>>;
  handleResetFilters: () => void;
}
const FilterDrawer = ({ 
  opened, 
  close,
  dateRange, 
  selectedTransactionType, 
  selectedTransactionStatus,   
  setFilters,
  handleResetFilters,
}: Props) => {

  const handlePendingChange = (key: keyof TFilters, value: string[] | TDateRange) => {
    setFilters((prev) => ({
      ...prev,
      pending: {
        ...prev.pending,
        [key]: value,
      },
    }));
  };

  const handleApplyFilters = () => {
    setFilters((prev) => ({
      ...prev,
      applied: { ...prev.pending },
    }));
    close();
  };

  return (
    <Drawer
      offset={12} 
      radius="md" 
      opened={opened} 
      onClose={close} 
      title="Filter" 
      position="right" 
      size={460}
      transitionProps={{ duration: 350, timingFunction: 'linear' }}
      classNames={{
        header: 'px-6 py-5',
        title: 'font-bold text-[#131316] text-[24px] leading-8',
        body: 'px-[22px]',
        close: 'rounded-full cursor-pointer text-md w-[32px] h-[32px]'
      }}
    >  
      <DateRangePicker dateRange={dateRange} setDateRange={(val) => handlePendingChange('dateRange', val)} />
      <Box className="mb-6">
        <Text fw="600" mb={12} lh={1}>Transaction Type</Text>
        <MultiSelectDropdown
          data={transactionType}
          value={selectedTransactionType}
          setValue={(val) => handlePendingChange('type', val)}
        />
      </Box>
      <Box>
        <Text fw="600" mb={12} lh={1}>Transaction Status</Text>
        <MultiSelectDropdown
          data={transactionStatus}
          value={selectedTransactionStatus}
          setValue={(val) => handlePendingChange('status', val)}
        />
      </Box>
      <Box pos="fixed" bottom={0} py={20} left={24} right={24}>
        <Group grow gap={12}>
          <Button
            variant='outline'
            bd="1px solid #EFF1F6"
            c="#131316"
            className='rounded-[100px]'
            onClick={handleResetFilters}
            h={48}
          >
            Clear
          </Button>
          <Button
            variant='filled'
            bg="#131316"
            className='rounded-[100px]'
            onClick={handleApplyFilters}
            h={48}
          >
            Apply
          </Button>
        </Group>
      </Box>
    </Drawer>
  )
}

export default FilterDrawer