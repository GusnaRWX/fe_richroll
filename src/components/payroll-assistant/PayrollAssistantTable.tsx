import React, { useState, useEffect } from 'react';
import {
  Grid,
  TableCell,
  TableRow,
  Box,
  TableSortLabel,
  Typography
} from '@mui/material';
import { Input, DateRangePicker } from '../_shared/form';
import { Search  } from '@mui/icons-material';
import Table from '../_shared/form/Table';
import { compareCheck, ifThenElse } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';
import PayrollAssistantRow from './PayrollAssistantRow';

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
  const data = {
    items: [
      {
        id: 1,
        name: 'Payroll 280123',
        daterange: '1/03/2023 - 31/03/2023',
        createdAt: '20/03/2023',
        lastUpdated: '20/03/2023',
      },
      {
        id: 2,
        name: 'Payroll 280123',
        daterange: '1/03/2023 - 31/03/2023',
        createdAt: '20/03/2023',
        lastUpdated: '20/03/2023',
      },
      {
        id: 3,
        name: 'Payroll 280123',
        daterange: '1/03/2023 - 31/03/2023',
        createdAt: '20/03/2023',
        lastUpdated: '20/03/2023',
      },
      {
        id: 4,
        name: 'Payroll 280123',
        daterange: '1/03/2023 - 31/03/2023',
        createdAt: '20/03/2023',
        lastUpdated: '20/03/2023',
      },
      {
        id: 5,
        name: 'Payroll 280123',
        daterange: '1/03/2023 - 31/03/2023',
        createdAt: '20/03/2023',
        lastUpdated: '20/03/2023',
      },
    ],
    itemTotals: 5
  };
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  // const [search, setSearch] = useState('');
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);

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
      console.log(tabValue);
      
    }
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
                <Search sx={{ color: '#9CA3AF' }}/>
              )
            }}
          />
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
                    <PayrollAssistantRow key={index} item={item} tabValue={tabValue} />
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
    </>
  );
}

export default PayrollAssistantTable;