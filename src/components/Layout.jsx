import { Container } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './ui/Footer';
import Navbar from './ui/Navbar';

export default function Layout() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#14191f',
      }}
    >
      <Navbar />
      <Container fixed sx={{ py: 8, flexGrow: 1 }}>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}
