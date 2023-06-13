import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Grid,
  Avatar,
  Box,
  Button as MuiButton,
  TableCell,
  TableRow,
  TableSortLabel,
  Select,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Input, IconButton, DateRangePicker } from '@/components/_shared/form';
import { Add } from '@mui/icons-material';
import Table from '@/components/_shared/form/Table';
import { Search, ArrowBack } from '@mui/icons-material';
import { FiCalendar } from 'react-icons/fi';
import AddEmployeesModal from '../payroll-assistant/create/AttendanceModal';
import AttendanceCalendarModal from '../payroll-assistant/create/AttendanceCalendar';
import { compareCheck, ifThenElse } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';

const ButtonWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '.1rem'
}));

const BackWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '1rem',
  marginTop: '.1rem'
}));

const NameWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  margin: '0'
}));

const ContentWrapper = styled(Card)(({
  padding: '1rem'
}));

const headerItems = [
  { id: 'user.name', label: 'Employee Name' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'absent', label: 'Absent' },
  { id: 'paidLeave', label: 'Paid Leave' },
  { id: 'unpaidLeave', label: 'Unpaid Leave' },
  { id: 'overtime', label: 'Overtime Hours' },
  { id: 'total', label: 'Total Hours' },
  { id: 'average', label: 'Average hours work/day' },
  { id: 'action', label: '' },
];

type Order = 'asc' | 'desc'

// const data = {
//   items: [
//     {
//       id: 1,
//       name: 'Budi Irawan',
//       attendance: '30 Days',
//       absent: '2 Days',
//       paidLeave: '3 Days',
//       unpaidLeave: '4 Days',
//       overtime: '8 Days',
//       totalHours: '175 Days',
//       averageHours: '30 Days',
//     },
//     {
//       id: 2,
//       name: 'Budi Irawan',
//       attendance: '30 Days',
//       absent: '2 Days',
//       paidLeave: '3 Days',
//       unpaidLeave: '4 Days',
//       overtime: '8 Days',
//       totalHours: '175 Days',
//       averageHours: '30 Days',
//     },
//     {
//       id: 3,
//       name: 'Budi Irawan',
//       attendance: '30 Days',
//       absent: '2 Days',
//       paidLeave: '3 Days',
//       unpaidLeave: '4 Days',
//       overtime: '8 Days',
//       totalHours: '175 Days',
//       averageHours: '30 Days',
//     },
//     {
//       id: 4,
//       name: 'Budi Irawan',
//       attendance: '30 Days',
//       absent: '2 Days',
//       paidLeave: '3 Days',
//       unpaidLeave: '4 Days',
//       overtime: '8 Days',
//       totalHours: '175 Days',
//       averageHours: '30 Days',
//     },
//     {
//       id: 5,
//       name: 'Budi Irawan',
//       attendance: '30 Days',
//       absent: '2 Days',
//       paidLeave: '3 Days',
//       unpaidLeave: '4 Days',
//       overtime: '8 Days',
//       totalHours: '175 Days',
//       averageHours: '30 Days',
//     },
//   ],
//   itemTotals: 5
// };

function AttendanceGenerateComponent() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(Array<object>);
  // const [search, setSearch] = useState('');
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);
  const [openCal, setOpenCal] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 0));
    setPage(0);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // setSearch(e.target.value);
      console.log(e.target.value);
      
    }
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    const isAsc = compareCheck(sort === headId, direction === 'asc');
    setDirection(ifThenElse(isAsc, 'desc', 'asc'));
    setSort(headId);
  };

  const handleClose = () => {
    setOpen(false);
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
          <BackWrapper >
            <IconButton
              parentColor='primary.500'
              icons={
                <ArrowBack sx={{ color: '#FFFFFF' }} />
              }
              onClick={() => {router.push('/payroll-disbursement/attendance');}}
            />
            <Box>
              <Typography variant='h6' color='#4B5563'><b>Generate Attendant Report</b></Typography>
              <Typography variant='text-base' color='#4B5563'><b>Payroll 280123 — </b>1/03/2023 - 14/03/2023</Typography>
            </Box>
          </BackWrapper>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='outlined'
              size='small'
              color='primary'
              onClick={() => {router.push('/payroll-disbursement/attendance');}}
            >Cancel</MuiButton>
            <MuiButton
              variant='contained'
              size='small'
              color='primary'
              onClick={() => {router.push('/payroll-disbursement/attendance');}}
              sx={{ color: 'white' }}
            >Save</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
              <Input
                name='search'
                size='small'
                placeholder='Search'
                onKeyDown={(e) => handleSearch(e)}
                type='text'
                InputProps={{
                  startAdornment: (
                    <Search sx={{ color: '#9CA3AF' }}/>
                  )
                }}
              />
            </Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
              <Select
                fullWidth
                variant='outlined'
                size='small'
                placeholder='Sort by Status'
                value={''}
              >
                <MenuItem value=''>All Status</MenuItem>
                <MenuItem value='active'>Active</MenuItem>
                <MenuItem value='inactive'>Inactive</MenuItem>
                <MenuItem value='draft'>Draft</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <DateRangePicker
                withAsterisk
                // value={formik.values.startDate as unknown as Date}
                onChange={(date: unknown) => console.log(date)}
                // error={formik.touched.startDate && formik.errors.startDate ? String(formik.errors.startDate) : ''}
              />
            </Grid>
          </Grid>
          <Table
            count={selected.length}
            rowsPerPageOptions={[5, 10, 15]}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onRowsPerPagesChange={(e) =>handleChangeRowsPerPage(e)}
            headChildren={
              <TableRow>
                {
                  headerItems.map((item) => (
                    <TableCell key={item.id} sortDirection={ifThenElse(sort === item.id, direction, false)}>
                      <TableSortLabel
                        active={sort === item.id}
                        direction={sort === item.id ? direction : 'asc'}
                        onClick={(e) => handleRequestSort(e, item.id)}
                      >
                        {item.label}
                        {sort === item.id ? (
                          <Box component='span' sx={visuallyHidden}>
                            {ifThenElse(direction === 'asc', 'sorted descending', 'sorted ascending')}
                          </Box>
                        ): null}
                      </TableSortLabel>
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
                        <TableCell colSpan={12} align='center'><Typography>Data not found</Typography></TableCell>
                      </TableRow>
                    ), (
                      selected?.map((item, index) => (
                        <TableRow key={index}>
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
                          <TableCell>{item['attendance']}</TableCell>
                          <TableCell>{item['absent']}</TableCell>
                          <TableCell>{item['paidLeave']}</TableCell>
                          <TableCell>{item['unpaidLeave']}</TableCell>
                          <TableCell>{item['overtime']}</TableCell>
                          <TableCell>{item['totalHours']}</TableCell>
                          <TableCell>{item['averageHours']}</TableCell>
                          <TableCell>
                            <ButtonWrapper>
                              <IconButton
                                parentColor='#E9EFFF'
                                onClick={() => { setOpenCal(true); }}
                                icons={
                                  <FiCalendar fontSize={20} color='#223567'/>
                                }
                              />
                            </ButtonWrapper>
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
          <Grid container spacing={2}>
            <Grid item xs={9} sm={9} md={9} lg={9} xl={9}></Grid>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <MuiButton
                variant='contained'
                size='small'
                color='primary'
                onClick={() => { setOpen(true); }}
              ><Add fontSize='small' />&nbsp; Add Employee</MuiButton>
            </Grid>
          </Grid>
        </Box>
      </ContentWrapper>

      <AttendanceCalendarModal
        open={openCal}
        handleClose={() => setOpenCal(false)}
        handleConfirm={() => setOpenCal(false)}
      />

      <AddEmployeesModal
        open={open}
        handleClose={handleClose}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
}

export default AttendanceGenerateComponent;