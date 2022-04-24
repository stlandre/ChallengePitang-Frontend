import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Registry from './pages/Registry';
import Schedules from './pages/Schedules';

function Router() {
  return (
    <MantineProvider>
      <NotificationsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route element={<Registry />} index />
              <Route path="/schedule" element={<Schedules />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default Router;
