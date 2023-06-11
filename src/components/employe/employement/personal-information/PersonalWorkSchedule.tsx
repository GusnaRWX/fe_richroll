import React, { useEffect, useState, useRef } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { Scheduler } from '@aldabil/react-scheduler';
import { Text } from '@/components/_shared/common';
import type { SchedulerRef } from '@aldabil/react-scheduler/types';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getUserWorkScheduleRequested } from '@/store/reducers/slice/employment/employmentSlice';


function PersonalWorkSchedule() {
  const calendarRef = useRef<SchedulerRef>(null);
  const [hydrated, setHydrated] = useState(false);
  const dispatch = useAppDispatch();
  const { profileName, grossHour, netHour, events } = useAppSelectors((state) => state.employment);

  useEffect(() => {
    dispatch({
      type: getUserWorkScheduleRequested.toString()
    });
  }, []);
  console.log(events);

  useEffect(() => {
    calendarRef?.current?.scheduler?.confirmEvent(events, 'create');
  }, [events]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return (
    <>
      <Grid
        container
        spacing={2}
        mb='1rem'
      >
        <Grid
          sm={12}
          item
        >
          <Text
            variant='text-lg'
            title='Work Schedule'
            fontWeight={700}
            color='primary.500'
          />
        </Grid>
        <Grid
          item
          sm={12}
        >
          <Text
            title='Scheduler Profile Name'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {profileName}
          </Typography>
        </Grid>
        <Grid
          item
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <Text
            title='Gross Hour'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {grossHour + ' '}Hours
          </Typography>
        </Grid>
        <Grid
          item
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <Text
            title='Net Hour'
            color='grey.400'
            fontWeight={500}
            mb={0.5}
          />
          <Typography fontWeight={400} color='grey.600'>
            {netHour + ' '}Hours
          </Typography>
        </Grid>
      </Grid>
      <Scheduler
        view='week'
        disableViewNavigator={true}
        ref={calendarRef}
        events={[]}
        navigation={true}
        editable={false}
        deletable={false}
        day={null}
        month={null}
        week={{
          weekDays: [0, 1, 2, 3, 4, 5, 6],
          weekStartOn: 1,
          startHour: 1,
          endHour: 23,
          step: 60,
          cellRenderer: () => {
            return (
              <Button
                onClick={() => {
                  return null;
                }}
              />
            );
          }
        }}
      />
    </>
  );
}

export default PersonalWorkSchedule;