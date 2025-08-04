import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from '@shared/components/Navbar';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '@shared/components/Breadcrumbs';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  const isPublicRoute = ['/login', '/register', '/reset-password'].includes(pathname);

  return (
    <>
      {!isPublicRoute && <Navbar />}
      <section className="container-fluid mt-5 mb-5 px-5">
        <Toaster />
        {!isPublicRoute && <Breadcrumbs />}
        {children}
      </section>
    </>
  );
};

export default MainLayout;
