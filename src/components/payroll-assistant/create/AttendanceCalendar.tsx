import React, { useState } from 'react';
import { Modal, Grid, Box, Typography, Button as MuiButton } from '@mui/material';
import { Scheduler } from '@aldabil/react-scheduler';
import { ConfirmationModal } from '@/components/_shared/common';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  paddingTop: '10px',
  p:2
};

interface AttendanceCalendarProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}


function AttendanceCalendar({open, handleClose, handleConfirm}: AttendanceCalendarProps) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        keepMounted
        disableAutoFocus
      >
        <Box sx={modalStyle} width='1300px'>
          <Grid container spacing={2} mb='1.5rem'>
            <Grid item xs={9}>
              <Typography variant='text-xl' fontWeight={700} color='#4B5563'>
                Employee Calender
              </Typography>
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <MuiButton
                variant='outlined'
                size='small'
                color='primary'
                sx={{ mr: '1rem' }}
                onClick={handleClose}
              >Cancel</MuiButton>
              <MuiButton
                variant='contained'
                size='small'
                color='primary'
                // onClick={handleConfirm}
                onClick={() => setDeleteConfirmation(true)}
              >Save</MuiButton>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Scheduler
                events={[]}
                // ref={calendarRef}
                disableViewNavigator={true}
                view='month'
                day={null}
                deletable={true}
                week={null}
                month={{
                  weekDays: [0, 1,2,3,4,5,6],
                  weekStartOn: 1,
                  startHour: 1,
                  endHour: 23,
                  // cellRenderer: () => {
                  //   return (
                  //     <MuiButton onClick={() => {
                  //       return null;
                  //     }}/>
                  //   );
                  // }
                }}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography component='div' variant='text-base' fontWeight={700} color='#374151' mb='1.5rem' sx={{ textAlign: 'center' }}>
                Attendance Summary
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={500} color='#9CA3AF' mb='.5rem'>
                Full Name
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={400} color='#4B5563' mb='1.5rem'>
                Budi Irawan
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={500} color='#9CA3AF' mb='.5rem'>
                Attendance
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={400} color='#4B5563' mb='1.5rem'>
                30 Days
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={500} color='#9CA3AF' mb='.5rem'>
                Absent
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={400} color='#4B5563' mb='1.5rem'>
                2 Days
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={500} color='#9CA3AF' mb='.5rem'>
                Paid Leave
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={400} color='#4B5563' mb='1.5rem'>
                3 Days
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={500} color='#9CA3AF' mb='.5rem'>
                Unpaid Leave
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={400} color='#4B5563' mb='1.5rem'>
                4 Days
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={500} color='#9CA3AF' mb='.5rem'>
                Gross Hours
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={400} color='#4B5563' mb='1.5rem'>
                8 Days
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={500} color='#9CA3AF' mb='.5rem'>
                Total Hours (Nett)
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={400} color='#4B5563' mb='1.5rem'>
                175 Days
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={500} color='#9CA3AF' mb='.5rem'>
                Average Hours Work/Day
              </Typography>
              <Typography component='div' variant='text-base' fontWeight={400} color='#4B5563' mb='1.5rem'>
                30 Days
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <ConfirmationModal
        open={deleteConfirmation}
        handleClose={() => setDeleteConfirmation(false)}
        title='Confirm Data Submission'
        content='Are you sure you want to save this changes made into this attendance report? '
        withCallback
        noChange={true}
        callback={handleConfirm}
      />
    </>
  );
}

export default AttendanceCalendar;