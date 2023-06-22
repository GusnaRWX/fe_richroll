import React from 'react';
import LoginContainer from '@/containers/auth/LoginContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

const Admin = () => {
  return (
    <>
      <MetaHead title='Kayaroll - Admin' />
      <LoginContainer isAdmin={true} />
    </>
  );
};

export default Admin;