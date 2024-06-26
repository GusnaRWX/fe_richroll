/* eslint-disable @typescript-eslint/no-explicit-any */

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
// import { getGenerateGrossPayrollRequested } from '@/store/reducers/slice/payroll/payrollSlice';
import EmptyState from '@/components/_shared/common/EmptyState';
import { useTranslation } from 'react-i18next';
import { getGenerateGrossesEmployeeRequested, putGenerateGrossesEmployeeRequested, getDetailPayrollRequested } from '@/store/reducers/slice/payroll/payrollSlice';

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
  { id: 'action', label: '', translation: '' },
  { id: 'user.name', label: 'Employee Name', translation: 'employee_name' },
  { id: 'attendance', label: 'Attendance', translation: 'attendance' },
  { id: 'absent', label: 'Absent', translation: 'absent' },
  { id: 'paidLeave', label: 'Paid Leave', translation: 'paid_leave' },
  { id: 'unpaidLeave', label: 'Unpaid Leave', translation: 'unpaid_leave' },
  { id: 'overtime', label: 'Overtime Hours', translation: 'overtime_hours' },
  { id: 'total', label: 'Total Hours', translation: 'total_hours' },
  { id: 'average', label: 'Average hours work/day', translation: 'average_hours' },
];

type Order = 'asc' | 'desc'

function GenerateGrossEmployee() {
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const { global, payroll } = useAppSelectors(state => state);
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);
  const [selectedTemp, setSelectedTemp] = useState<any>([]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const tPath = 'payroll_and_disbursement.attendance_summary.generate_gross_payroll.';

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
    setPage(1);
  };

  const onSelected = (item, e) => {
    if (e.target.checked) {
      const temp = [...selectedTemp, {
        id: item.id, name: item.employee.name, user_id: item.employee.id, attendance: item.attendance, absent: item.absent,
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
    const pageItemIds = items?.map(item => item.id);

    if (e.target.checked) {
      setSelectedTemp(prevSelectedTemp => {
        const updatedSelectedTemp = [...prevSelectedTemp];

        pageItemIds.forEach(itemId => {
          if (!updatedSelectedTemp.some(item => item.id === itemId)) {
            const pageItem = items.find(item => item.id === itemId);
            if (pageItem) {
              updatedSelectedTemp.push({
                id: pageItem.id,
                user_id: pageItem.employee.id,
                name: pageItem.employee.name,
                attendance: pageItem.attendance,
                absent: pageItem.absent,
                paidLeave: pageItem.paidLeave,
                unpaidLeave: pageItem.unpaidLeave,
                overtime: pageItem.overtime,
                totalHours: pageItem.totalHours,
                averageHours: pageItem.averageHours,
              });
            }
          }
        });

        return updatedSelectedTemp;
      });
    } else {
      setSelectedTemp(prevSelectedTemp =>
        prevSelectedTemp.filter(selectedItem => !pageItemIds.includes(selectedItem.id))
      );
    }
  };

  const checkValAll = (items) => {
    const checkedPerPage = selectedTemp?.filter(selectedItem =>
      items?.some(item => item.id === selectedItem.id)
    ).length;
    const lengthPerPage = items?.length;

    return checkedPerPage === lengthPerPage;
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    const isAsc = compareCheck(sort === headId, direction === 'asc');
    setDirection(ifThenElse(isAsc, 'desc', 'asc'));
    setSort(headId);
  };


  const handlePutGenerate = () => {
    dispatch({
      type: putGenerateGrossesEmployeeRequested.toString(),
      payload: {
        id: router.query.id,
        body: { employeeID: selectedTemp?.map(item => item.user_id) }
      }
    });
  };

  useEffect(() => {
    setHaydrated(true);
  }, []);

  useEffect(() => {
    if (router.query.id) {
      dispatch({
        type: getDetailPayrollRequested.toString(),
        payload: {
          id: router.query.id
        }
      });
    }
  }, [router.query.id]);

  useEffect(() => {
    if (router.isReady) {
      dispatch({
        type: getGenerateGrossesEmployeeRequested.toString(),
        payload: {
          page: 1,
          itemPerPage: rowsPerPage,
          sort: sort,
          direction: direction,
          countryCode: global?.language,
          id: router.query.id
        }
      });
    }

  }, [rowsPerPage, sort, direction, global?.language, router.query]);

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
              <Typography variant='h6' color='#4B5563'><b>{t(`${tPath}title`)}</b></Typography>
              <Typography variant='text-base' color='#4B5563'><b>{payroll?.name} — </b>{payroll?.start} - {payroll?.end}</Typography>
            </Box>
          </BackWrapper>
        </Grid>
      </Grid>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Table
            count={payroll?.grossesEmployee?.itemTotals}
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
                        <Checkbox onChange={(e) => onSelectedAll(payroll?.grossesEmployee?.items?.slice(0, rowsPerPage), e)} checked={checkValAll(payroll?.grossesEmployee?.items?.slice(0, rowsPerPage))} />
                      </TableCell>
                    ) : (
                      <TableCell key={item.id} sortDirection={ifThenElse(sort === item.id, direction, false)}>
                        <TableSortLabel
                          active={sort === item.id}
                          direction={ifThenElse(sort === item.id, direction, 'asc')}
                          onClick={(e) => handleRequestSort(e, item.id)}
                        >
                          {t(`${tPath}table.table_cols_item.${item.translation}`)}
                          {ifThenElse(sort === item.id, (
                            <Box component='span' sx={visuallyHidden}>
                              {ifThenElse(direction === 'asc', 'sorted descending', 'sorted ascending')}
                            </Box>
                          ), null)}
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
                  ifThenElse(typeof payroll?.grossesEmployee?.items !== 'undefined', (
                    ifThenElse(payroll?.grossesEmployee?.items?.length === 0, (
                      <TableRow>
                        <TableCell colSpan={12} align='center'>
                          <EmptyState />
                        </TableCell>
                      </TableRow>
                    ), (
                      payroll?.grossesEmployee?.items?.map((item) => (
                        <TableRow key={item.employee.name}>
                          <TableCell>
                            <CheckboxWrapper>
                              <Checkbox onChange={(e) => onSelected(item, e)} checked={checkVal(item?.id)} />
                            </CheckboxWrapper>
                          </TableCell>
                          <TableCell>
                            <NameWrapper>
                              <Avatar
                                src={ifThenElse(item.employee.picture, item.employee.picture, ImageType.AVATAR_PLACEHOLDER)}
                                alt={item.employee.name}
                                sx={{
                                  width: 24, height: 24
                                }}
                              />
                              &nbsp;{item.employee.name}
                            </NameWrapper>
                          </TableCell>
                          <TableCell>{item.attendance}</TableCell>
                          <TableCell>{item.absent}</TableCell>
                          <TableCell>{item.paidLeave}</TableCell>
                          <TableCell>{item.unpaidLeave}</TableCell>
                          <TableCell>{item.overtime}</TableCell>
                          <TableCell>{item.totalHours}</TableCell>
                          <TableCell>{ifThenElse(isNaN(item.averageHours), 0, item.averageHours)}</TableCell>
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
                >{t('button.cancel')}</MuiButton>
                <MuiButton
                  variant='contained'
                  size='small'
                  color='primary'
                  onClick={handlePutGenerate}
                  sx={{ color: 'white' }}
                >{t('button.confirm')}</MuiButton>
              </ButtonWrapper>
            </Grid>
          </Grid>
        </Box>
      </ContentWrapper>
    </>
  );
}

export default GenerateGrossEmployee;
