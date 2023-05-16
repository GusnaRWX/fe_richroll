import React from 'react';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';
import ForgotPasswordComponent from '@/components/auth/forgot-password/ForgotPasswordComponent';

function ForgotPasswordContainer() {
  return (
    <>
      <MetaHead title='Kayaroll - Forgot Password'/>
      <ForgotPasswordComponent />
    </>
  );
}

export default ForgotPasswordContainer;