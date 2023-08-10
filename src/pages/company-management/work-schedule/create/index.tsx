import React from 'react';
import WorkScheduleCreateContainer from '@/containers/work-schedule/WorkScheduleCreateContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

function index() {
  return (
    <>
      <MetaHead title='Kayaroll - Create Work Schedule'/>
      <WorkScheduleCreateContainer />
    </>
  );
}

export default index;