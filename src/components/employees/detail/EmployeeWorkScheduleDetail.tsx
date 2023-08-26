import React, { useEffect, useRef } from 'react';
import { Input } from '@/components/_shared/form';
import { Grid, InputAdornment, Typography, Button } from '@mui/material';
import { Scheduler } from '@aldabil/react-scheduler';
import type { SchedulerRef } from '@aldabil/react-scheduler/types';
import { useAppSelectors, useAppDispatch } from '@/hooks/index';
import { useRouter } from 'next/router';
import { getViewWorkScheduleRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { useTranslation } from 'react-i18next';

function EmployeeWorkScheduleDetail() {
  const calendarRef = useRef<SchedulerRef>(null);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const t_employeeWorkSchedule = 'company_management.employees.form_&_detail.work_schedule_section';
  const router = useRouter();
  const { employee } = useAppSelectors((state) => state);

  const handleDeleteEventSchedule = () => {
    const eventLength = calendarRef?.current?.scheduler?.events?.length;
    calendarRef?.current?.scheduler?.events?.splice(0, eventLength);
  };

  useEffect(() => {
    dispatch({
      type: getViewWorkScheduleRequested.toString(),
      payload: router.query.id
    });
  }, []);
  useEffect(() => {
    handleDeleteEventSchedule();
    calendarRef?.current?.scheduler?.confirmEvent(employee?.workScheduleDetail?.events, 'create');
  }, [employee?.workScheduleDetail?.events]);

  console.log(employee?.isLoading);


  return (
    <>
      <Grid container spacing={4} mb='1rem' alignItems='center'>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Input
            name='workScheduleID'
            customLabel={t(`${t_employeeWorkSchedule}.schedule_profile_name`)}
            size='small'
            fullWidth
            disabled={true}
            value={employee?.workScheduleDetail?.name}
          />
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            name='weeklyGross'
            withAsterisk={false}
            customLabel={t(`${t_employeeWorkSchedule}.weekly_gross_hours`)}
            placeholder='Input Weekly Gross'
            size='small'
            disabled
            type='number'
            value={employee?.workScheduleDetail?.grossHour}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Typography color='grey.500'>{t(`${t_employeeWorkSchedule}.hours_week`)}</Typography>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            name='weeklyNet'
            withAsterisk={false}
            customLabel={t(`${t_employeeWorkSchedule}.weekly_net_hours`)}
            placeholder='Input Weekly Net'
            size='small'
            disabled
            value={employee?.workScheduleDetail?.netHour}
            type='number'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Typography color='grey.500'>{t(`${t_employeeWorkSchedule}.hours_week`)}</Typography>
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>
      <Scheduler
        view='week'
        ref={calendarRef}
        events={[]}
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