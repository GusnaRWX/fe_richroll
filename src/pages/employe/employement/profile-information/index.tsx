import React from 'react';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';
import EmployeContainer from '@/containers/employe/EmployeContainer';

const ProfileInformation = () => {
  return (
    <>
      <MetaHead title='Kayaroll - Employe' />
      <EmployeContainer />
    </>
  );
};

export default ProfileInformation;