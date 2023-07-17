import React from 'react';
import WorkScheduleEditContainer from '@/containers/work-schedule/WorkScheduleEditContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

function index() {
  return (
    <>
      <MetaHead title='Kayaroll - Edit Work Schedule'/>
      <WorkScheduleEditContainer />
    </>
  );
}

export default index;