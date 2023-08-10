import React from 'react';
import AnnualWorkCalendarContainer from '@/containers/annual-work-calendar/AnnualWorkCalendarContainer';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';

function index() {
  return (
    <>
      <MetaHead title='Kayaroll - Annual Work Calendar'/>
      <AnnualWorkCalendarContainer />
    </>
  );
}

export default index;