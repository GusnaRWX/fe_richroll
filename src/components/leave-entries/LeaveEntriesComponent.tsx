import React, { useState } from 'react';
import { Box, Grid, styled } from '@mui/material';
import { Text } from '../_shared/common';
import { Button } from '../_shared/form';
import { useAppDispatch } from '@/hooks/index';
import AddIcon from '@mui/icons-material/Add';
import LeaveEntriesTableComponent from './LeaveEntriesTableComponent';
import LeaveEntriesListComponent from './LeaveEntriesListComponent';
import LeaveEntriesEmployeeCreateComponent from './LeaveEntriesEmployeeCreateComponent';

const ButtonWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '.1rem'
});

const LeaveEntriesComponent = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  return (
    <>
      <Grid container spacing={2} justifyContent='space-between'>
        <Grid item xs={9}>
          <Text title='Attendance & Leave' color='primary.main' variant='h5' />
          <Text title='Leave Entry' variant='text-base' color='#4B5563' />
        </Grid>
        <Grid item xs={3}>
          <ButtonWrapper>
            <Button
              label='Create Leave Entry'
              startIcon={<AddIcon />}
              onClick={() => {
                setOpen(true);
              }}
              sx={{ width: '180px' }}
            />
          </ButtonWrapper>
        </Grid>
      </Grid>
      <LeaveEntriesTableComponent dispatch={dispatch} />
      <LeaveEntriesListComponent
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        dispatch={dispatch}
        setSelectedEmployee={setSelectedEmployee}
        selectedEmployee={selectedEmployee}
        setOpenCreateModal={setOpenCreateModal}
      />
      <LeaveEntriesEmployeeCreateComponent
        dispatch={dispatch}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
        setOpenModal={setOpen}
      />
    </>
  );
};

export default LeaveEntriesComponent;