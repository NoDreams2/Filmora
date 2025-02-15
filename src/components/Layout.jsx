import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './ui/Footer';
import Navbar from './ui/Navbar';

export default function Layout() {
  return (
    <Container fixed sx={{ py: 8 }}>
      <Navbar />
      <Outlet />
      <Footer />
    </Container>
  );
}
