import { Box, Card, Flex, Group, Stack, Text } from '@mantine/core'
import { MoveDownLeft, MoveUpRight } from 'lucide-react'
import type { TTransaction } from '../../lib'
import dayjs from 'dayjs'

type Props = {
  transaction: TTransaction;
}
const TransactionCard = ({ transaction }: Props) => {
  const isDeposit = transaction.type === 'deposit';
  let textClass: string;

  if (isDeposit) {
    textClass = 'text-[#56616B]';
  } else {
    const isSuccessful = transaction.status.toLowerCase() === 'successful';
    const color = isSuccessful ? 'text-[#0EA163]' : 'text-[#A77A07]';
    textClass = `capitalize ${color}`;
  }

  return (
    <Card>
      <Card.Section>
        <Group justify="space-between">
          <Flex gap={14} align="center">
            <Box className={`p-[14px] rounded-full ${isDeposit ? 'bg-[#E3FCF2]' : 'bg-[#F9E3E0]'}`}>
              {
                transaction.type === 'deposit' ?
                <MoveDownLeft width={20} height={20} color="#075132" /> :
                <MoveUpRight width={20} height={20} color="#961100"  />
              }
            </Box>
            <Stack gap={9}>
              <Text fw="500" className="text-[#131316]">{isDeposit ? transaction.metadata!.product_name : 'Cash withdrawal'}</Text>
              <Text fz="sm" fw="500" className={textClass}>
                {isDeposit ? transaction.metadata!.name : transaction.status}
              </Text>
            </Stack>
          </Flex>
          <Stack align="end" gap={4}>
            <Text fw="bold" className="text-[#131316]">USD {transaction.amount}</Text>
            <Text fz="sm" fw="500" className="text-[#56616B]">{dayjs(transaction.date).format('MMM D,YYYY')}</Text>
          </Stack>
        </Group>
      </Card.Section>
    </Card>
  )
}

export default TransactionCard