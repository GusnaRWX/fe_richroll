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
import { IconButton } from '@/components/_shared/form';
import Table from '@/components/_shared/form/Table';
import { Image as ImageType } from '@/utils/assetsConstant';
import { ArrowBack } from '@mui/icons-material';
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
];

type Order = 'asc' | 'desc'

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

function GenerateGrossEmployee() {
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  // const [search, setSearch] = useState('');
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
    // setPage(0);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    const isAsc = compareCheck(sort === headId, direction === 'asc');
    setDirection(ifThenElse(isAsc, 'desc', 'asc'));
    setSort(headId);
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
              <Typography variant='h6' color='#4B5563'><b>Generate Gross Payroll Report</b></Typography>
              <Typography variant='text-base' color='#4B5563'><b>Payroll 280123 — </b>1/03/2023 - 14/03/2023</Typography>
            </Box>
          </BackWrapper>
        </Grid>
      </Grid>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Table
            count={data?.itemTotals}
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
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
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
                  onClick={() => { router.push('/payroll-disbursement/payroll/generate-gross/detail'); }}
                  sx={{ color: 'white' }}
                >Confirm</MuiButton>
              </ButtonWrapper>
            </Grid>
          </Grid>
        </Box>
      </ContentWrapper>
    </>
  );
}

export default GenerateGrossEmployee;