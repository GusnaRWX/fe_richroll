import React from 'react';
import ItpDeductableComponentDetailContainer from '@/containers/income-tax-profile/ItpDeductableComponentDetailContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

const ItpDeductableComponent = () => {
  return (
    <>
      <MetaHead title='Income Tax Profile - Deductable Component Detail' />
      <ItpDeductableComponentDetailContainer />
    </>
  );
};

export default ItpDeductableComponent;