import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { Text } from '../_shared/common';
import { Button } from '../_shared/form';
import { useAppDispatch } from '@/hooks/index';
import AddIcon from '@mui/icons-material/Add';
import LeaveEntriesTableComponent from './LeaveEntriesTableComponent';
// import LeaveEntriesCreateComponent from './LeaveEntriesCreateComponent';
import LeaveEntriesListComponent from './LeaveEntriesListComponent';

const LeaveEntriesComponent = () => {
  const dispatch = useAppDispatch();
  // const [openCreate, setOpenCreate] = useState(false);
  const [openAddEmployee, setOpenAddEmployee] = useState(false);

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
              setOpenAddEmployee(true);
            }}
          />
        </Grid>
      </Grid>
      <LeaveEntriesTableComponent dispatch={dispatch} />
      {/* <LeaveEntriesCreateComponent
        open={openCreate}
        onClose={() => {
          setOpenCreate(false);
        }}
        onOpenAddEmployee={() => {
          setOpenAddEmployee(true);
        }}
      /> */}
      <LeaveEntriesListComponent
        open={openAddEmployee}
        onClose={() => {
          setOpenAddEmployee(false);
        }}
        dispatch={dispatch}
      />
    </>
  );
};

export default LeaveEntriesComponent;