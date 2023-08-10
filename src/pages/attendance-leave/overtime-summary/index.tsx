import React from 'react';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';
import OvertimeSummaryContainer from '@/containers/overtime-summary/OvertimeSummaryContainer';

function index() {
  return (
    <>
      <MetaHead title='Kayaroll - Overtime Summary'/>
      <OvertimeSummaryContainer />
    </>
  );
}

export default index;