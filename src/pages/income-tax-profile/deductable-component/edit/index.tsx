import React from 'react';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';
import ItpEditNewComponentContainer from '@/containers/income-tax-profile/ItpEditNewComponentContainer';

const ItpEditNewComponent = () => {
  return (
    <>
      <MetaHead title='Income Tax Profile - Deductable Component Dashboard' />
      <ItpEditNewComponentContainer />
    </>
  );
};

export default ItpEditNewComponent;