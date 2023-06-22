import React from 'react';
import AccountManagementContainer from '@/containers/account-management/AccountManagementContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

export default function Index() {
  return (
    <>
      <MetaHead title='Kayaroll - Account Management' />
      <AccountManagementContainer />
    </>
  );
}