import React, { useState, useEffect } from 'react';
import {
  Grid,
  TableCell,
  TableRow,
  Box,
  TableSortLabel
} from '@mui/material';
import { Input, DateRangePicker } from '../_shared/form';
import { Search } from '@mui/icons-material';
import Table from '../_shared/form/Table';
import { compareCheck, ifThenElse, getCompanyData } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';
import PayrollAssistantRow from './PayrollAssistantRow';
import EmptyState from '../_shared/common/EmptyState';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getPayrollRequested } from '@/store/reducers/slice/payroll/payrollSlice';

const headerItems = [
  { id: 'user.name', label: 'Name' },
  { id: 'dateRange', label: 'Date Range' },
  { id: 'user.createdAt', label: 'Created on' },
  { id: 'user.lastUpdated', label: 'Last Updated' },
  { id: 'action', label: '' },
];

interface EmployeeTableProps {
  tabValue: number
}

type Order = 'asc' | 'desc'

function PayrollAssistantTable({
  tabValue
}: EmployeeTableProps) {
  const dispatch = useAppDispatch();
  const data = useAppSelectors(state => state.payroll.data);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [direction, setDirection] = useState<Order>('desc');
  // const [date, setDate] = useState<Date | null>(new Date());
  const [sort, setSort] = useState('');
  const companyData = getCompanyData();
  const [hydrated, setHaydrated] = useState(false);
  const { responser } = useAppSelectors((state) => state);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
    setPage(1);
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

  useEffect(() => {
    dispatch({
      type: getPayrollRequested.toString(),
      payload: {
        page: page,
        itemPerPage: rowsPerPage,
        sort: sort,
        direction: direction.toUpperCase(),
        search: search,
        countryCode: 'ID',
        companyID: companyData?.id,
        workflow: ifThenElse(tabValue === 0, 'ATTENDANCE', 'PAYROLL_COMPLETE'),
        status: ifThenElse(tabValue === 0, 'DRAFT', 'COMPLETED')
      }
    });
  }, [rowsPerPage, page, search, sort, direction, responser.code, tabValue]);

  useEffect(() => {
    setHaydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
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
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <DateRangePicker
            withAsterisk
            // value={formik.values.startDate as unknown as Date}
            // value={date}
            // onChange={(date: unknown) => console.log(date)}
            onChange={(v) => console.log(v)}
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
                    <TableCell colSpan={12} align='center'>
                      <EmptyState />
                    </TableCell>
                  </TableRow>
                ), (
                  data?.items?.map((item, index) => (
                    <PayrollAssistantRow key={index} item={item} tabValue={tabValue} />
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
    </>
  );
}

export default PayrollAssistantTable;