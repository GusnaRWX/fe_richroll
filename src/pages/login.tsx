import React from 'react';
import LoginContainer from '@/containers/auth/LoginContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

const Login = () => {
  return (
    <>
      <MetaHead title='Kayaroll - Login' />
      <LoginContainer isAdmin={false} />
    </>
  );
};

export default Login;