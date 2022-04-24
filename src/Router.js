import React, { useState } from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Registry from './pages/Registry';
import Schedules from './pages/Schedules';

function Router() {
  const [redirect, setRedirect] = useState(true);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<Registry redirect={redirect} setRedirect={setRedirect} />} index />
          <Route path="/schedule" element={<Schedules />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
