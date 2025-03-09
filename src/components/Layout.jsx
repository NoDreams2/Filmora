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
        width: '100%',
      }}
    >
      <div
        style={{
          width: '1920px',
          maxWidth: '100%',
          margin: '0 auto',
          flexGrow: 1,
        }}
      >
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
