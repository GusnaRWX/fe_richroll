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
  TableSortLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Input, IconButton } from '@/components/_shared/form';
import { Add, Search, ArrowBack } from '@mui/icons-material';
import Table from '@/components/_shared/form/Table';
import { FiCalendar } from 'react-icons/fi';
import ListEmployeeModal from '../payroll-assistant/create/ListEmployeeModal';
//import AddEmployeesModal from '../payroll-assistant/create/AttendanceModal';
import AttendanceCalendarModal from '../payroll-assistant/create/AttendanceCalendar';
import { compareCheck, ifThenElse } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';
import EmptyState from '../_shared/common/EmptyState';
import { useAppSelectors, useAppDispatch } from '@/hooks/index';
import { getSelectedEmployeeRequested, getDetailAttendanceRequested, putPayrollWorkflowRequested } from '@/store/reducers/slice/payroll/payrollSlice';

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

interface SelectedProp {
  id: string;
  name: string;
  picture?: string;
}

function AttendanceGenerateComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const payrollId = router?.query?.id;
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Array<SelectedProp>>(Array<SelectedProp>);
  const { name, start, end, selectedEmployee } = useAppSelectors((state) => state.payroll);
  const [search, setSearch] = useState('');
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);
  const [openCal, setOpenCal] = useState(false);
  const { responser } = useAppSelectors((state) => state);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
    setPage(1);
  };

  // function for open modal calendar
  const handleOpenCalendar = async (itemId, employeeId) => {
    await dispatch({
      type: getDetailAttendanceRequested.toString(),
      payload: {
        id: payrollId,
        attendanceID: itemId,
        employeeID: employeeId
      }
    });
    setOpenCal(true);
  };

  // function for close modal calendar
  const handleCloseCalendar = () => {
    setOpenCal(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    const isAsc = compareCheck(sort === headId, direction === 'asc');
    setDirection(ifThenElse(isAsc, 'desc', 'asc'));
    setSort(headId);
  };

  const handleSave = () => {
    dispatch({
      type: putPayrollWorkflowRequested.toString(),
      payload: {
        id: payrollId,
        data: {
          workflow: 0,
          status: 1
        }
      }
    });
    router.push('/payroll-disbursement/attendance');
  };

  useEffect(() => {
    dispatch({
      type: getSelectedEmployeeRequested.toString(),
      payload: {
        page: page,
        itemPerPage: rowsPerPage,
        sort: sort,
        direction: direction.toUpperCase(),
        search: search,
        countryCode: '',
        payrollID: payrollId
      }
    });
  }, [rowsPerPage, page, search, sort, direction, responser.code]);

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
              onClick={() => { router.push('/payroll-disbursement/attendance'); }}
            />
            <Box>
              <Typography variant='h6' color='#4B5563'><b>Generate Attendant Report</b></Typography>
              <Typography variant='text-base' color='#4B5563'><b>{name} — </b>{start} - {end}</Typography>
            </Box>
          </BackWrapper>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='outlined'
              size='small'
              color='primary'
              onClick={() => { router.push('/payroll-disbursement/attendance'); }}
            >Cancel</MuiButton>
            <MuiButton
              variant='contained'
              size='small'
              color='primary'
              onClick={() => { handleSave(); }}
              sx={{ color: 'white' }}
            >Confirm</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Input
                name='search'
                size='small'
                placeholder='Search'
                onKeyDown={(e) => handleSearch(e)}
                type='text'
                InputProps={{
                  startAdornment: (
                    <Search sx={{ color: '#9CA3AF' }} />
                  )
                }}
              />
            </Grid>
          </Grid>
          <Table
            count={selectedEmployee?.itemTotals}
            rowsPerPageOptions={[5, 10, 15]}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onRowsPerPagesChange={(e) => handleChangeRowsPerPage(e)}
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
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))
                }
              </TableRow>
            }
            bodyChildren={
              <>
                {
                  ifThenElse(typeof selectedEmployee?.items !== 'undefined', (
                    ifThenElse(selectedEmployee?.items?.length === 0, (
                      <TableRow>
                        <TableCell colSpan={12} align='center'>
                          <EmptyState />
                        </TableCell>
                      </TableRow>
                    ), (
                      selectedEmployee?.items?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <NameWrapper>
                              <Avatar
                                src={item?.employee?.picture || item?.employee?.name}
                                alt={item?.employee?.name}
                                sx={{
                                  width: 24, height: 24
                                }}
                              />
                              &nbsp;{item?.employee?.name}
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
                                onClick={() => { handleOpenCalendar(item?.id, item?.employee?.id); }}
                                icons={
                                  <FiCalendar fontSize={20} color='#223567' />
                                }
                              />
                            </ButtonWrapper>
                          </TableCell>
                        </TableRow>
                      ))
                    ))
                  ), (
                    <TableRow>
                      <TableCell colSpan={12} align='center'>
                        <EmptyState />
                      </TableCell>
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
        handleClose={() => handleCloseCalendar()}
        handleConfirm={() => handleCloseCalendar()}
      />
      <ListEmployeeModal
        open={open}
        handleClose={handleClose}
        selected={selected}
        setSelected={setSelected}
      />
      {/* <AddEmployeesModal
        open={open}
        handleClose={handleClose}
        selected={selected}
        setSelected={setSelected}
        withConfirm={true}
        handleConfirm={() => console.log('test')}
      /> */}
    </>
  );
}

export default AttendanceGenerateComponent;