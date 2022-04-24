import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Group,
  ActionIcon,
  MediaQuery,
  Burger,
  useMantineTheme,
  MantineProvider,
  // useMantineColorScheme,
} from '@mantine/core';
import { Sun, MoonStars } from 'tabler-icons-react';

import { Outlet } from 'react-router-dom';
import MainLinks from './MainLinks';
import Logo from './Logo';

function Layout() {
  // const { toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [dark, setTheme] = useState(false);
  const [schemeColor, setColor] = useState('light');
  const [opened, setOpened] = useState(false);

  const alternateTheme = () => {
    if (dark) {
      setTheme(false);
      setColor('light');
    } else {
      setTheme(true);
      setColor('dark');
    }
  };

  return (
    <MantineProvider theme={{ colorScheme: schemeColor }} withGlobalStyles>
      <AppShell
        styles={{
          main: {
            background: dark ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        fixed
        navbar={(
        // eslint-disable-next-line no-undef
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <Navbar.Section grow mt="xs">
              <MainLinks />
            </Navbar.Section>
          </Navbar>
        )}
        header={(
          <Header height={70} p="md">
            <div style={{
              display: 'flex', alignItems: 'center', height: '100%',
            }}
            >
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Group sx={{ height: '100%' }} px={20} position="apart">
                <Logo colorScheme={schemeColor} />
                <ActionIcon variant="default" onClick={() => { alternateTheme(); }} size={30}>
                  {dark ? <Sun size={16} /> : <MoonStars size={16} />}
                </ActionIcon>
              </Group>
            </div>
          </Header>
        )}
      >
        <Outlet />
      </AppShell>

    </MantineProvider>
  );
}

export default Layout;
