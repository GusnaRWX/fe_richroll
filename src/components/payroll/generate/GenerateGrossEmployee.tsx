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
  Checkbox
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { IconButton } from '@/components/_shared/form';
import Table from '@/components/_shared/form/Table';
import { Image as ImageType } from '@/utils/assetsConstant';
import { ArrowBack } from '@mui/icons-material';
import { compareCheck, ifThenElse } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getGenerateGrossPayrollRequested } from '@/store/reducers/slice/payroll/payrollSlice';
import EmptyState from '@/components/_shared/common/EmptyState';

const ButtonWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '.1rem'
}));

const CheckboxWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '.5rem'
});

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
  { id: 'action', label: '' },
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

function GenerateGrossEmployee() {
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const { global, payroll } = useAppSelectors(state => state);
  // const [search, setSearch] = useState('');
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);
  const [selectedTemp, setSelectedTemp] = useState<any>([]);
  const dispatch = useAppDispatch();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
    // setPage(0);
  };

  const onSelected = (item, e) => {
    if (e.target.checked) {
      const temp = [...selectedTemp, {
        id: item.id, name: item.name, attendance: item.attendance, absent: '2 Days',
        paidLeave: item.paidLeave,
        unpaidLeave: item.unpaidLeave,
        overtime: item.overtime,
        totalHours: item.totalHours,
        averageHours: item.averageHours,
      }];
      setSelectedTemp(temp as any);
    } else {
      const temp = selectedTemp.filter(v => v['id'] !== item.id);
      setSelectedTemp(temp);
    }
  };

  const checkVal = (id) => {
    return selectedTemp.some(v => v['id'] === id);
  };

  const onSelectedAll = (items, e) => {
    const pageItems = items?.map(item => ({
      id: item.id, name: item.name, attendance: item.attendance, absent: '2 Days',
      paidLeave: item.paidLeave,
      unpaidLeave: item.unpaidLeave,
      overtime: item.overtime,
      totalHours: item.totalHours,
      averageHours: item.averageHours,
    }));

    if (e.target.checked) {
      setSelectedTemp(prevSelectedTemp => [...prevSelectedTemp, ...pageItems]);
    } else {
      setSelectedTemp(prevSelectedTemp => prevSelectedTemp.filter(selectedItem => !pageItems?.some(item => item?.id === selectedItem['id'])));
    }
  };

  const checkValAll = (items) => {
    const checkedPerPage = selectedTemp?.filter(selectedItem => items?.some(item => item?.id === selectedItem['id'])).length;
    const lengthPerPage = rowsPerPage;

    return checkedPerPage === lengthPerPage;
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    const isAsc = compareCheck(sort === headId, direction === 'asc');
    setDirection(ifThenElse(isAsc, 'desc', 'asc'));
    setSort(headId);
  };

  useEffect(() => {
    setHaydrated(true);
  }, []);

  useEffect(() => {
    dispatch({
      type: getGenerateGrossPayrollRequested.toString(),
      payload: {
        page: 1,
        itemPerPage: rowsPerPage,
        sort: sort,
        direction: direction,
        countryCode: global?.language
      }
    });
  }, [rowsPerPage, sort, direction, global?.language]);

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
            count={payroll?.generateGrossPayroll?.itemTotals}
            rowsPerPageOptions={[5, 10, 15]}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onRowsPerPagesChange={(e) => handleChangeRowsPerPage(e)}
            headChildren={
              <TableRow>
                {
                  headerItems.map((item) => (
                    item.id === 'action' ? (
                      <TableCell key={item.id}>
                        <Checkbox onChange={(e) => onSelectedAll(payroll?.generateGrossPayroll?.items?.slice(0, rowsPerPage), e)} checked={checkValAll(payroll?.generateGrossPayroll?.items?.slice(0, rowsPerPage))} />
                      </TableCell>
                    ) : (
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
                    )
                  ))
                }
              </TableRow>
            }
            bodyChildren={
              <>
                {
                  ifThenElse(typeof payroll?.generateGrossPayroll?.items !== 'undefined', (
                    ifThenElse(payroll?.generateGrossPayroll?.items?.length === 0, (
                      <TableRow>
                        <TableCell colSpan={12} align='center'>
                          <EmptyState />
                        </TableCell>
                      </TableRow>
                    ), (
                      payroll?.generateGrossPayroll?.items?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <CheckboxWrapper>
                              <Checkbox onChange={(e) => onSelected(item, e)} checked={checkVal(item?.id)} />
                            </CheckboxWrapper>
                          </TableCell>
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