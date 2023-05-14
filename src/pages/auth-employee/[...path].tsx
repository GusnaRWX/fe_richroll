import React from 'react';
import { useRouter } from 'next/router';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';
import HaveAccount from '@/components/have-an-account/HaveAccount';
import LoginContainer from '@/containers/auth/LoginContainer';
import SetNewPasswordComponent from '@/components/set-new-password/SetNewPasswordComponent';

const EmployeeLogin = () => {
  const { query: { path } } = useRouter();
  const checkPath = Array.isArray(path) ? path.join('') : '';

  switch (checkPath) {
    case 'have-an-account':
      return (
        <>
          <MetaHead title='Kayaroll - Have an account ?' />
          <HaveAccount />
        </>
      );
    case 'login':
      return (
        <>
          <MetaHead title='Kayaroll - Login' />
          <LoginContainer />
        </>
      );
    case 'set-new-password':
      return (
        <>
          <MetaHead title='Kayarol - Set new password' />
          <SetNewPasswordComponent />
        </>
      );
    default:
      console.error('invalid');
      return null; // Add a default return value to avoid errors
  }
};

export default EmployeeLogin;