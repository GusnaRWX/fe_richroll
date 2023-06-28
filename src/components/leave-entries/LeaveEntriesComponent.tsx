import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Text } from '../_shared/common';
import { Button } from '../_shared/form';
import { useAppDispatch } from '@/hooks/index';
import AddIcon from '@mui/icons-material/Add';
import LeaveEntriesTableComponent from './LeaveEntriesTableComponent';
import LeaveEntriesListComponent from './LeaveEntriesListComponent';
import LeaveEntriesEmployeeCreateComponent from './LeaveEntriesEmployeeCreateComponent';

const LeaveEntriesComponent = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Text title='Attendance & Leave' color='primary.main' variant='h5' />
          <Text title='Leave Entry' variant='text-base' color='#4B5563' />
        </Grid>
        <Grid item xs={2}>
          <Button
            label='Create Leave Entry'
            startIcon={<AddIcon />}
            onClick={() => {
              setOpen(true);
            }}
          />
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
        openCreateModal={openCreateModal}
        setOpenCreateModal={setOpenCreateModal}
      />
    </>
  );
};

export default LeaveEntriesComponent;