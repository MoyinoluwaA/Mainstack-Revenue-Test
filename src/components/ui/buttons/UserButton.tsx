import { forwardRef } from 'react';
import { Group, Avatar, UnstyledButton } from '@mantine/core';
import { Menu } from 'lucide-react';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  name: string;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ name, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        color: 'var(--mantine-color-text)',
        borderRadius: '100px',
        background: '#EFF1F6'
      }}
      py={4}
      pl={5}
      pr={12}
      {...others}
    >
      <Group>
        <Avatar radius="xl" name={name} color="white" 
          style={{
            background: 'linear-gradient(138.98deg, #5C6670 2.33%, #131316 96.28%)'
          }}
        />
        <Menu />
      </Group>
    </UnstyledButton>
  )
);

export default UserButton;