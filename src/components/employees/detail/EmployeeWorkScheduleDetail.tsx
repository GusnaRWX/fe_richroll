import React, { useEffect, useState, useRef } from 'react';
import { Input, Select } from '@/components/_shared/form';
import { Grid, InputAdornment, Typography, Button } from '@mui/material';
import { Scheduler } from '@aldabil/react-scheduler';
import type { SchedulerRef } from '@aldabil/react-scheduler/types';
import { useAppSelectors, useAppDispatch } from '@/hooks/index';
import { useRouter } from 'next/router';
import { getViewWorkScheduleRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';


function EmployeeWorkScheduleDetail() {
  const calendarRef = useRef<SchedulerRef>(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { employee } = useAppSelectors((state) => state);
  const { listWorkSchedule } = useAppSelectors((state) => state.option);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    dispatch({
      type: getViewWorkScheduleRequested.toString(),
      payload: router.query.id
    });
  }, []);
  useEffect(() => {
    calendarRef?.current?.scheduler?.confirmEvent(employee?.workScheduleDetail?.events, 'create');
  }, [employee?.workScheduleDetail?.events]);


  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }


  return (
    <>
      <Grid container spacing={4} mb='1rem' alignItems='center'>
        <Grid item xs={10} sm={10} md={10} lg={10} xl={10}>
          <Select
            name='workScheduleID'
            withAsterisk={true}
            customLabel='Schedule Profile Name'
            size='small'
            fullWidth
            value={employee?.workScheduleDetail.workScheduleId}
            options={listWorkSchedule}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mb='1rem'>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Input
            name='weeklyGross'
            withAsterisk={false}
            customLabel='Weekly Gross Hours'
            placeholder='Input Weekly Gross'
            size='small'
            disabled
            type='number'
            value={employee?.workScheduleDetail?.grossHour}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Typography color='grey.500'>Hours/Week</Typography>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Input
            name='weeklyNet'
            withAsterisk={false}
            customLabel='Weekly Net Hours'
            placeholder='Input Weekly Net'
            size='small'
            disabled
            value={employee?.workScheduleDetail?.netHour}
            type='number'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Typography color='grey.500'>Hours/Week</Typography>
                </InputAdornment>
              )
            }}
          />
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

export default EmployeeWorkScheduleDetail;