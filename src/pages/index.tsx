import React from 'react';
import LandingContainer from '@/containers/landing/LandingContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

const Landing = () => {
  return (
    <>
      <MetaHead title='Kayaroll - Payroll & HR Solutions Specially Curated For SMEs And Start-Ups' />
      <LandingContainer />
    </>
  );
};

export default Landing;