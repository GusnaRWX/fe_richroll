import React from 'react';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';
import ResetPasswordComponent from '@/components/auth/reset-password/ResetPasswordComponent';

function ResetPasswordContainer() {
  return (
    <>
      <MetaHead title='Kayaroll - Reset Password'/>
      <ResetPasswordComponent />
    </>
  );
}

export default ResetPasswordContainer;