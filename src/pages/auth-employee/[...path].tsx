import React from 'react';
import { useRouter } from 'next/router';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';
import HaveAccount from '@/components/have-an-account/HaveAccount';
import LoginContainer from '@/containers/auth/LoginContainer';
import SetNewPasswordComponent from '@/components/set-new-password/SetNewPasswordComponent';

const EmployeeLogin = () => {
  const { query } = useRouter();
  const checkPath = Array.isArray(query.path) ? query.path.join('') : '';
  console.log(query, 'query');
  switch (checkPath) {
    case 'have-an-account':
      return (
        <>
          <MetaHead title='Kayaroll - Have an account ?' />
          <HaveAccount
            email={query.email as string}
            token={query.token as string}
          />
        </>
      );
    case 'login':
      return (
        <>
          <MetaHead title='Kayaroll - Login' />
          <LoginContainer isAdmin={false} />
        </>
      );
    case 'set-new-password':
      return (
        <>
          <MetaHead title='Kayarol - Set new password' />
          <SetNewPasswordComponent
            email={query.email as string}
            token={query.token as string}
          />
        </>
      );
    default:
      console.error('invalid');
      return null; // Add a default return value to avoid errors
  }
};

export default EmployeeLogin;