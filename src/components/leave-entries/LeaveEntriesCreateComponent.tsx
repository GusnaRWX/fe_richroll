import React, { useState } from 'react';
import { FormControlLabel, Grid, Switch, SwitchProps, TableCell, TableRow } from '@mui/material';
import { CustomModal, Text } from '../_shared/common';
import { Button, DatePicker } from '../_shared/form';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import Table from '../_shared/form/Table';

interface LeaveEntriesCreateProps {
  open: boolean;
  onClose: () => void;
  onOpenAddEmployee: () => void
}

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#223567' : '#223568',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#223567',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const LeaveEntriesCreateComponent: React.FC<LeaveEntriesCreateProps> = ({
  open,
  onClose,
  onOpenAddEmployee
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
  };

  const headerItems = [
    { id: 'employeeID', label: 'Employee ID' },
    { id: 'user.name', label: 'Employee Name' },
    { id: 'leave.from', label: 'Leave From' },
    { id: 'leave.to', label: 'Leave To' },
    { id: 'leave.type', label: 'Leave Type' },
    { id: 'status', label: 'Status' }
  ];

  return (
    <CustomModal
      open={open}
      title='New Attendance Entry'
      width='840px'
      submitText='Create Entry'
      keepMounted={false}
      handleClose={onClose}
      handleConfirm={() => { console.log('here'); }}
    >
      <Grid container mt='1rem' mb='1rem' justifyContent='flex-end' alignItems='flex-end'>
        <Grid item xs={5}>
          <DatePicker
            customLabel='Select Date'
            withAsterisk
          />
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'end' }}>
          <FormControlLabel
            sx={{ ml: '1rem', mb: '.5rem' }}
            label='Auto'
            control={
              <IOSSwitch sx={{ mr: '.5rem' }} />
            }
          />
        </Grid>
        <Grid item xs={3}>
          <Button label='Add Employee' startIcon={<AddIcon />} onClick={onOpenAddEmployee} />
        </Grid>
      </Grid>
      <Table
        count={0}
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onRowsPerPagesChange={(e) => handleChangeRowsPerPage(e)}
        headChildren={
          <TableRow>
            {headerItems.map(item => (
              <TableCell key={item.id}>{item.label}</TableCell>
            ))}
          </TableRow>
        }
        bodyChildren={
          <TableRow>
            <TableCell colSpan={12} align='center'>
              <Text title='Data not found' />
            </TableCell>
          </TableRow>
        }
      />
    </CustomModal>
  );
};

export default LeaveEntriesCreateComponent;