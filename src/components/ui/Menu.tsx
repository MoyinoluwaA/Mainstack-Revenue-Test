import { Menu } from '@mantine/core';
import type { ReactElement } from 'react';

type Props = {
  target: ReactElement;
  dropdown: ReactElement;
};
const AppMenu = ({ target, dropdown }: Props) => {
  return (
    <Menu shadow="card" width={200} position="bottom-end" radius="md">
      <Menu.Target>{target}</Menu.Target>

      <Menu.Dropdown w={304} pb={8}>
        {dropdown}
      </Menu.Dropdown>
    </Menu>
  );
};

export default AppMenu;
