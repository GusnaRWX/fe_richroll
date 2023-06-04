import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  Select,
  MenuItem,
  TableCell,
  TableRow,
  Avatar,
  Box,
  TableSortLabel,
  Button as MuiButton,
  Typography
} from '@mui/material';
import { Input, IconButton, DateRangePicker } from '@/components/_shared/form';
import { Add } from '@mui/icons-material';
import { Image as ImageType } from '@/utils/assetsConstant';
import { Search  } from '@mui/icons-material';
import Table from '@/components/_shared/form/Table';
import { FiCalendar } from 'react-icons/fi';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { compareCheck, ifThenElse } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';
import AddEmployeesModal from './AttendanceModal';

const ContentWrapper = styled(Card)(({
  padding: '1rem',
  marginBottom: '1rem'
}));

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 gap: .5rem;
`;

const NameWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 margin: 0;
`;

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

function AttendanceContent() {
  const data = {
    items: [
      {
        id: 1,
        name: 'Budi Irawan',
        attendance: '30 Days',
        absent: '2 Days',
        paidLeave: '3 Days',
        unpaidLeave: '4 Days',
        overtime: '8 Days',
        totalHours: '175 Days',
        averageHours: '30 Days',
      },
      {
        id: 2,
        name: 'Budi Irawan',
        attendance: '30 Days',
        absent: '2 Days',
        paidLeave: '3 Days',
        unpaidLeave: '4 Days',
        overtime: '8 Days',
        totalHours: '175 Days',
        averageHours: '30 Days',
      },
      {
        id: 3,
        name: 'Budi Irawan',
        attendance: '30 Days',
        absent: '2 Days',
        paidLeave: '3 Days',
        unpaidLeave: '4 Days',
        overtime: '8 Days',
        totalHours: '175 Days',
        averageHours: '30 Days',
      },
      {
        id: 4,
        name: 'Budi Irawan',
        attendance: '30 Days',
        absent: '2 Days',
        paidLeave: '3 Days',
        unpaidLeave: '4 Days',
        overtime: '8 Days',
        totalHours: '175 Days',
        averageHours: '30 Days',
      },
      {
        id: 5,
        name: 'Budi Irawan',
        attendance: '30 Days',
        absent: '2 Days',
        paidLeave: '3 Days',
        unpaidLeave: '4 Days',
        overtime: '8 Days',
        totalHours: '175 Days',
        averageHours: '30 Days',
      },
    ],
    itemTotals: 5
  };
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  // const [search, setSearch] = useState('');
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);
  const [open, setOpen] = useState(false);

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
          count={data?.itemTotals}
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
                ifThenElse(typeof data?.items !== 'undefined', (
                  ifThenElse(data?.items?.length === 0, (
                    <TableRow>
                      <TableCell colSpan={12} align='center'><Typography>Data not found</Typography></TableCell>
                    </TableRow>
                  ), (
                    data?.items?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <NameWrapper>
                            <Avatar
                              src={ImageType.AVATAR_PLACEHOLDER}
                              alt={item.name}
                              sx={{
                                width: 24, height: 24
                              }}
                            />
                            &nbsp;{item.name}
                          </NameWrapper>
                        </TableCell>
                        <TableCell>{item.attendance}</TableCell>
                        <TableCell>{item.absent}</TableCell>
                        <TableCell>{item.paidLeave}</TableCell>
                        <TableCell>{item.unpaidLeave}</TableCell>
                        <TableCell>{item.overtime}</TableCell>
                        <TableCell>{item.totalHours}</TableCell>
                        <TableCell>{item.averageHours}</TableCell>
                        <TableCell>
                          <ButtonWrapper>
                            <IconButton
                              parentColor='#E9EFFF'
                              onClick={() => { router.push('/payroll-disbursement/payroll-assistant/create'); }}
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
        <AddEmployeesModal
          open={open}
          handleClose={handleClose}
        />
      </Box>
    </ContentWrapper>
  );
}

export default AttendanceContent;