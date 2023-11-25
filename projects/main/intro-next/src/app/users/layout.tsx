import { Breadcrumb } from '@/components';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Users - page',
  description: 'Users - page',
  keywords: 'Users - page',
  openGraph: {
    title: 'Acme',
    description: 'Acme is a...',
    type: 'website',
    locale: 'en_IE',
  },
};

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Breadcrumb />
      {children}
    </div>
  );
}

export default layout;
