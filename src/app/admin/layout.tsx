'use client';

import { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminNavigation } from '@/components/Navigation/AdminNavigation';

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated (simple client-side check)
    const isAuthenticated = localStorage.getItem('meetjs-admin-auth') === 'true';
    
    // Skip login check for login page
    if (window.location.pathname === '/admin/login') {
      return;
    }
    
    if (!isAuthenticated) {
      router.push('/admin/login');
    }
  }, [router]);

  return (
    <div className="admin-layout">
      <AdminNavigation />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}