import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
// import './index.css';
import Router from './Router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MantineProvider>
    <NotificationsProvider>
      <Router />
    </NotificationsProvider>
  </MantineProvider>,
);
