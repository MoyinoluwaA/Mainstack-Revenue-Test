import type { FC } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="lg"
      layout="alt"
      header={{ height: 64 }}
      navbar={{
        width: 276,
        breakpoint: 'lg',
        collapsed: { desktop: true, mobile: !opened },
      }}
      className="bg-white h-screen"
      withBorder={false}
    >
      <AppShell.Header className="p-4">
        <Header opened={opened} onClick={toggle} />
      </AppShell.Header>

      <AppShell.Navbar className="p-4 pb-5 bg-gray-200 h-full border-r-2 border-black">
        <Sidebar opened={opened} onClick={toggle} />
      </AppShell.Navbar>

      <AppShell.Main className="h-full">{<Outlet />}</AppShell.Main>
    </AppShell>
  );
};

export default Layout;
