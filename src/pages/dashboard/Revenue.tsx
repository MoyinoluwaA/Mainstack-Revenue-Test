import { Badge, Box, Button, Divider, Flex, Grid, Group, Loader, Skeleton, Stack, Text } from "@mantine/core";
import { filterTransactions, formatAmount, getWallet, useGetTransactions, useGetWalletData, type TFilters, type TFiltersObj } from "../../lib";
import { FilterDrawer, FloatingBar, TransactionCard } from "../../components";
import { ChevronDown, Download, Info, ScrollText } from "lucide-react";
import { LineChart } from "@mantine/charts";
import dayjs from "dayjs";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";

const Revenue = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const defaultFilters: TFilters = {
    type: [],
    status: [],
    dateRange: { startDate: null, endDate: null, timePeriod: "All Time", period: "All Time" },
  };
  const [filters, setFilters] = useState<TFiltersObj>({
    pending: defaultFilters,
    applied: defaultFilters,
  });
  
  const { data: transactionData = [], isLoading = true } = useGetTransactions();
  const { data: walletData } = useGetWalletData();
  const wallet = getWallet(walletData);
  const groupedData = transactionData.reduce<Record<string, { date: string; revenue: number; payout: number }>>(
    (acc, curr) => {
      const date = dayjs(curr.date).format('YYYY-MM-DD');
      if (!acc[date]) {
        acc[date] = { date, revenue: 0, payout: 0 };
      }

      if (curr.type === 'deposit') {
        acc[date].revenue += curr.amount;
      } else if (curr.type === 'withdrawal') {
        acc[date].payout += curr.amount;
      }

      return acc;
    },
    {}
  );

  const sortedData = Object.values(groupedData).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const filteredTransactions = useMemo(
    () => filterTransactions({ 
      transactions: transactionData, 
      selectedTypes: filters.applied.type, 
      selectedStatuses: filters.applied.status, 
      dateRange: filters.applied.dateRange
    }),
    [transactionData, filters.applied]
  );

  const getFilterCount = () => {
    const isFilterByType = filters.applied.type.length > 0;
    const isFilterByStatus = filters.applied.status.length > 0;
    const isFilterByDateRange = filters.applied.dateRange.startDate && filters.applied.dateRange.endDate;

    const activeFilters = [isFilterByType, isFilterByStatus, isFilterByDateRange].filter(Boolean).length;
    return activeFilters;
  }

  const filterCount = getFilterCount();

  const handleResetFilters = () => {
    setFilters({
      pending: defaultFilters,
      applied: defaultFilters,
    });
  };

  let content;

  if (isLoading) {
    content = (
      <Stack>
        {Array.from({ length: 3 }).map((item, index) => 
          <Skeleton height={49} radius="xl" key={index} />
        )}
      </Stack>
    )
  } else if (filteredTransactions.length === 0) {
    content = (
      <Box maw={369} className="mx-auto">
        <span className="rounded-full p-3 mb-5">
          <ScrollText width={24} height={24} />
        </span>
        <Text>No matching transaction found for the selected filter</Text>
        <Text>Change your filters to see more results, or add a new product.</Text>
        <Button mt={32} className="rounded-[100px]" bg="#EFF1F6" c="#131316" onClick={handleResetFilters}>Clear Filter</Button>
      </Box>
    );
  } else if (transactionData.length === 0) {
    content = (
      <Box maw={369} className="mx-auto">
        <Text>No transaction found</Text>
      </Box>
    );
  } else {
    content = (
      <Stack gap={24}>
        {filteredTransactions.map((transaction, index) => (
          <TransactionCard key={index} transaction={transaction} />
        ))}
      </Stack>
    );
  }

  return (
    <Box maw={{ sm: '94%', lg: '80%' }} className="mx-auto py-16 px-4">
      <FloatingBar />
      <Grid mb={82} gutter={{ base: 36, lg: 24}} >
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Flex gap={{ base: 24, lg: 64 }} mb="lg">
            <Stack>
              <Text fz="sm" lh={1.2}>{wallet[0].name}</Text>
              <Text fz={36} fw="bold" className="text-[#131316] leading-12">
                {wallet[0]?.amount === null ? (
                  <Loader color="blue" type="dots" />
                ) : (
                  <>USD {formatAmount(wallet[0].amount, 2)}</>
                )}
              </Text>
            </Stack>
            <Button className="disabled rounded-[100px]" variant="filled" color="#131316" py={14} px={52} h={52}>Withdraw</Button>
          </Flex>
          <LineChart
            h={260}
            data={sortedData}
            dataKey="date"
            series={[
              { name: 'revenue', label: 'Revenue', color: 'blue.6' },
              { name: 'payout', label: 'Payout', color: 'green.6' },
            ]}
            curveType="linear"
            withDots={false}
            valueFormatter={(value) => `USD ${value}`}
            xAxisProps={{
              tickFormatter: (date) => dayjs(date).format('MMM D, YYYY'),
            }}
            // withLegend
            // legendProps={{ verticalAlign: 'bottom', height: 50 }}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 4 }} maw={{ lg: 271 }} className="ml-auto">
          <Grid gutter={{ base: 5, xs: 'md', md: 'xl' }}>
            {
              wallet.slice(1).map((data) => (
                <Grid.Col span={{ sm: 6, lg: 12 }} key={data.name}>
                  <Stack gap={8}>
                    <Flex justify="space-between">
                      <Text fz="sm" lh={1.2}>{data.name}</Text>
                      <Info width={20} height={20} />
                    </Flex>
                    <Text fz={28} fw="bold" className="text-[#131316] leading-9">
                      {data?.amount === null ? (
                        <Loader color="blue" type="dots" />
                      ) : (
                        <>USD {formatAmount(data.amount, 2)}</>
                      )}
                    </Text>
                  </Stack>
                </Grid.Col>
              ))
            }
          </Grid>
        </Grid.Col>
      </Grid>

      <Group justify="space-between">
        <Stack gap={0}>
          <Text fz={24} fw="bold" className="text-[#131316] leading-8">{filteredTransactions.length} Transactions</Text>
          <Text fz="sm" className="leading-4">Your transactions for {filters.applied.dateRange.timePeriod}</Text>
        </Stack>
        <Flex gap={12}>
          <Button h={48} className="rounded-[100px] py-3 pl-[30px] pr-5 bg-[#EFF1F6] text-[#131316]" onClick={open}>
            Filter
            {
              filterCount > 0 &&
              <Badge size="sm" circle bg="#131316" ml={4}>
                {filterCount}
              </Badge>
            }
            <ChevronDown width={14} height={14} className="ml-1" />
          </Button>
          <Button h={48} disabled className="rounded-[100px] py-3 pl-[30px] pr-5 bg-[#EFF1F6] text-[#131316]">
            Export list
            <Download width={14} height={14} className="ml-1" />
          </Button>
        </Flex>
      </Group>

      <Divider mt={24} mb={33} />
    
      <Box>{content}</Box>

      <FilterDrawer
        opened={opened} 
        close={close}
        // filters={filters}
        dateRange={filters.pending.dateRange}
        selectedTransactionStatus={filters.pending.status}
        selectedTransactionType={filters.pending.type}
        setFilters={setFilters}
        handleResetFilters={handleResetFilters}
      />
    </Box>
  )
}

export default Revenue;
