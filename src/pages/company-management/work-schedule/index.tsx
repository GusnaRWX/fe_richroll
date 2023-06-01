import React from 'react';
import WorkScheduleContainer from '@/containers/work-schedule/WorkScheduleContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

function index() {
  return (
    <>
      <MetaHead title='Kayaroll - Work Schedule'/>
      <WorkScheduleContainer />
    </>
  );
}

export default index;