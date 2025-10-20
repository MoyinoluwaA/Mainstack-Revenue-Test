import type { FC } from "react";
import { AppShell, Burger, Image, NavLink, ScrollArea, Stack } from "@mantine/core";
import { navItems } from "../../lib";
import { useLocation } from "react-router-dom";

interface Props {
  opened: boolean;
  onClick: () => void;
}
const Sidebar: FC<Props> = ({ opened, onClick }) => {
  const { pathname } = useLocation();

  return (
    <>
      <AppShell.Section>
        <Burger opened={opened} onClick={onClick} hiddenFrom="lg" />
        <div className="p-4 text-2xl font-bold">Mainstack</div>
      </AppShell.Section>
      <AppShell.Section component={ScrollArea} grow>
        <Stack gap={16}>
          {
            navItems.map((link) => (
              <NavLink
                href={link.link ?? '#'}
                label={link.name}
                leftSection={link.icon && <Image src={link.icon} width={20} height={20} />}
                disabled={!link.link}
                key={link.name}
                active={link.link === pathname}
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
        </Stack>
      </AppShell.Section>
    </>
  );
};

export default Sidebar;
