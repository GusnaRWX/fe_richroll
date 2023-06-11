import React, { useEffect, useState, useRef } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { Scheduler } from '@aldabil/react-scheduler';
import { Text } from '@/components/_shared/common';
import type { SchedulerRef } from '@aldabil/react-scheduler/types';

function PersonalWorkSchedule() {
  const calendarRef = useRef<SchedulerRef>(null);
  const [hydrated, setHydrated] = useState(false);

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
            Day Shift

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
            40 Hours
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
            40 Hours
          </Typography>
        </Grid>
      </Grid>
      <Scheduler
        view='week'
        disableViewNavigator={false}
        ref={calendarRef}
        events={[]}
        navigation={false}
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