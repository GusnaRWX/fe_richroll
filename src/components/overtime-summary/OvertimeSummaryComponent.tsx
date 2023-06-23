import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Grid,
  Box,
  Button as MuiButton,
  TableRow,
  TableCell,
  Avatar,
  Select,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomModal from '@/components/_shared/common/CustomModal';
import OvertimeSummaryTable from './OvertimeSummaryTable';
import { DatePicker, IconButton } from '../_shared/form';
import { BsTrashFill } from 'react-icons/bs';
import Table from '@/components/_shared/form/Table';
import { Add } from '@mui/icons-material';
import styled from '@emotion/styled';
import { ifThenElse } from '@/utils/helper';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AiOutlineSwapRight } from 'react-icons/ai';
import AddEmployeeModal from '@/components/payroll-assistant/create/AttendanceModal';

const ButtonWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '.1rem'
}));

const NameWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 margin: 0;
`;

const headerItems = [
  { id: 'employeeID', label: 'Employee ID' },
  { id: 'user.name', label: 'Employee Name' },
  { id: 'overtimeFrom', label: 'Overtime From' },
  { id: 'swap', label: '' },
  { id: 'overtimeTo', label: 'Overtime To' },
  { id: 'multiplier', label: 'Multiplier' },
  { id: 'actions', label: '' }
];

const ContentWrapper = styled(Card)(({
  padding: '1rem'
}));

function OvertimeSummaryComponent() {
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(Array<object>);
  const [hydrated, setHaydrated] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
    // setPage(0);
  };


  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteItem = (index) => {
    const tempData = [...selected];
    tempData.splice(index, 1);
    setSelected(tempData);
  };

  useEffect(() => {
    setHaydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='h5' color='primary.main'>Attendance & Leave</Typography>
          <Typography variant='text-base' color='#4B5563'>Overtime Entry</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='contained'
              size='small'
              color='primary'
              startIcon={<AddIcon />}
              sx={{ color: 'white' }}
              onClick={() => { setOpen(true); }}
            >Create Overtime Entry</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <OvertimeSummaryTable />
        </Box>
      </ContentWrapper>

      <CustomModal
        open={open}
        handleClose={handleClose}
        title='New Overtime Entry'
        width='1100px'
        handleConfirm={handleClose}
        submitText='Create Entry'
      >
        <Grid container spacing={2} mt='.5rem' mb='.5rem'>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <DatePicker
              customLabel='Select Date'
              withAsterisk
              onChange={(date: unknown) => console.log(date)}
            />
          </Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}></Grid>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} textAlign='end' alignSelf='end'>
            <MuiButton
              variant='contained'
              size='medium'
              color='primary'
              onClick={() => setEmployeeOpen(true)}
            ><Add fontSize='small' />&nbsp; Add Employee</MuiButton>
          </Grid>
        </Grid>
        <Table
          count={selected?.length}
          rowsPerPageOptions={[5, 10, 15]}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onRowsPerPagesChange={(e) => handleChangeRowsPerPage(e)}
          headChildren={
            <TableRow>
              {
                headerItems.map((item) => (
                  <TableCell key={item.id}>
                    {item.label}
                  </TableCell>
                ))
              }
            </TableRow>
          }
          bodyChildren={
            <>
              {
                ifThenElse(typeof selected !== 'undefined', (
                  ifThenElse(selected?.length === 0, (
                    <TableRow>
                      <TableCell colSpan={12} align='center'>
                        <Typography>
                        Data not found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ), (
                    selected?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item['id']}</TableCell>
                        <TableCell>
                          <NameWrapper>
                            <Avatar
                              src={item['picture']}
                              alt={item['name']}
                              sx={{
                                width: 24, height: 24
                              }}
                            />
                          &nbsp;{item['name']}
                          </NameWrapper>
                        </TableCell>
                        <TableCell sx={{ width: '200px' }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                              sx={{
                                '& .MuiOutlinedInput-input': {
                                  padding: '8.5px 14px',
                                  border: 'none !important'
                                },
                                width: '90%'
                              }}
                            />
                          </LocalizationProvider>
                        </TableCell>
                        <TableCell>
                          <AiOutlineSwapRight />
                        </TableCell>
                        <TableCell sx={{ width: '200px' }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker
                              sx={{
                                '& .MuiOutlinedInput-input': {
                                  padding: '8.5px 14px',
                                  border: 'none !important'
                                },
                                width: '90%'
                              }}
                            />
                          </LocalizationProvider>
                        </TableCell>
                        <TableCell>
                          <Select
                            fullWidth
                            variant='outlined'
                            size='small'
                            placeholder=''
                            value={''}
                            sx={{
                              width: '100%'
                            }}
                          >
                            <MenuItem value='0.0'>0.0x</MenuItem>
                            <MenuItem value='0.5'>0.5x</MenuItem>
                            <MenuItem value='1.0'>1.0x</MenuItem>
                            <MenuItem value='1.5'>1.5x</MenuItem>
                            <MenuItem value='2.0'>2.0x</MenuItem>
                            <MenuItem value='2.5'>2.5x</MenuItem>
                            <MenuItem value='3.0'>3.0x</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            parentColor='#FEE2E2'
                            icons={
                              <BsTrashFill fontSize={20} color='#EF4444' />
                            }
                            onClick={() => handleDeleteItem(index)}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ))
                ), (
                  <TableRow>
                    <TableCell colSpan={12} align='center'><Typography>Data not found</Typography></TableCell>
                  </TableRow>
                ))
              }
            </>
          }
        />
      </CustomModal>

      <AddEmployeeModal
        open={employeeOpen}
        handleClose={() => setEmployeeOpen(false)}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
}

export default OvertimeSummaryComponent;