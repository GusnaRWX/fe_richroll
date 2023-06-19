import React from 'react';
import ItpDeductableComponentContainer from '@/containers/income-tax-profile/ItpDeductableComponentContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

const ItpDeductableComponent = () => {
  return (
    <>
      <MetaHead title='Income Tax Profile - Deductable Component Dashboard' />
      <ItpDeductableComponentContainer />
    </>
  );
};

export default ItpDeductableComponent;