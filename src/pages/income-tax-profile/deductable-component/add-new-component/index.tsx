
import React from 'react';
import ItpCreateNewComponentContainer from '@/containers/income-tax-profile/ItpAddNewComponentContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

const ItpCreateNewComponent = () => {
  return (
    <>
      <MetaHead title='Income Tax Profile - Deductable Component Dashboard' />
      <ItpCreateNewComponentContainer />
    </>
  );
};

export default ItpCreateNewComponent;