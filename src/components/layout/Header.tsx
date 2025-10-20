import { type FC } from "react";
import { Menu as AppMenu, UserButton } from "../ui";
import { headerItems, navItems, useGetUserData } from '../../lib';
import { Burger, Flex, Group, Image, Menu, NavLink, Text, UnstyledButton } from "@mantine/core";
import { LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";

interface Props {
  opened: boolean;
  onClick: () => void;
}
const Header: FC<Props> = ({ opened, onClick }) => {
  const { pathname } = useLocation();
  const { data } = useGetUserData();
  const user = {
    name: `${data?.first_name} ${data?.last_name}`,
    email: data?.email
  }

  const menu = [
    {
      text: 'Log out',
      icon: LogOut,
    }
  ]

  return (
    <Flex justify="space-between" align="center" className="h-16 pl-6 pr-3 w-full bg-white" gap={16}
      styles={{
        root: {
          boxShadow: '0px 2px 4px 0px #2D3B430D, 0px 2px 6px 0px #2D3B430F',
          border: '2px solid #FFFFFF',
          borderRadius: '100px',
        }
      }}
    >
      <Flex gap={4}>
        <Burger
          opened={opened}
          onClick={onClick}
          hiddenFrom="lg"
        />
        <Image src="/mainstack-logo.svg" />
      </Flex>

      <Flex gap={20} visibleFrom="lg" className="lg:ml-32">
        {
          navItems.map((link) => (
            <NavLink
              href={link.link ?? '#'}
              label={link.name}
              leftSection={link.icon && <Image src={link.icon} width={20} height={20} />}
              key={link.name}
              active={link.link === pathname}
              className={link.link ? 'cursor-pointer' : 'cursor-default'}
              classNames={{
                root: "data-hover:bg-grey data-active:bg-[#131316] text-black data-active:text-white rounded-[100px] pl-[14px] py-2 pr-[18px]",
                label: "font-semibold",
                section: "text-black mr-1",
              }}
              style={{ 
                minWidth: 'fit-content', 
              }}
            />
          ))
        }
      </Flex>

      <div className="flex items-center gap-2">
        {
          headerItems.map((item, index) => (
            <UnstyledButton px={10} py={6} className="relative" key={index}>
              <item.icon width={16} />
            </UnstyledButton>
          ))
        }
        <AppMenu
          target={
            <UserButton name={user.name} />
          }
          dropdown={
            <>
              <Group px="sm" pt="sm" pb="xs">
                {/* <Avatar src={userProfile.avatar} alt={userProfile.name} /> */}
                <div style={{ flex: 1 }}>
                  <Text c="grey.10" size="sm" fw={500} className="whitespace-nowrap tracking-tight">
                    {/* {userProfile.name} */}
                  </Text>

                  <Text c="grey.8" size="xs" truncate="end" w={214} className="tracking-tight">
                    {/* {user?.email} */}
                  </Text>
                </div>
              </Group>
              <Menu.Divider />
              {menu.map((menuItem) => (
                <Menu.Item
                  key={menuItem.text}
                  c="grey.10"
                  className="tracking-tight"
                  leftSection={<menuItem.icon />}
                  // onClick={menuItem.onClick}
                >
                  {menuItem.text}
                </Menu.Item>
              ))}
            </>
          }
        />
      </div>
    </Flex>
  );
};

export default Header;
