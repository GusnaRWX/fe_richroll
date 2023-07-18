import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  TableCell,
  TableRow,
  Box,
  TableSortLabel,
  Typography
} from '@mui/material';
import { SimpleAccordion } from '@/components/_shared/common';
import Table from '@/components/_shared/form/Table';
import styled from '@emotion/styled';
import { compareCheck, ifThenElse } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';
import GrossRow from './GrossRow';

const ContentWrapper = styled(Card)(({
  padding: '1rem',
  marginBottom: '1rem'
}));

const headerItems = [
  { id: 'user.name', label: 'Full Name' },
  { id: 'attendance', label: 'Base Compensation' },
  { id: 'absent', label: 'Supplementary Compensation' },
  { id: 'paidLeave', label: 'Ad Hoc Compensation' },
  { id: 'unpaidLeave', label: 'Gross Compensation' },
  { id: 'action', label: '' },
];

type Order = 'asc' | 'desc'

const data = {
  items: [
    {
      id: 1,
      name: 'Budi Irawan',
      attendance: 'Rp 5.000.000,00',
      absent: 'Rp 2.500.000,00',
      paidLeave: 'Rp 2.000.000,00',
      unpaidLeave: 'Rp 9.500.000,00',
    },
    {
      id: 2,
      name: 'Budi Irawan',
      attendance: 'Rp 5.000.000,00',
      absent: 'Rp 2.500.000,00',
      paidLeave: 'Rp 2.000.000,00',
      unpaidLeave: 'Rp 9.500.000,00',
    },
    {
      id: 3,
      name: 'Budi Irawan',
      attendance: 'Rp 5.000.000,00',
      absent: 'Rp 2.500.000,00',
      paidLeave: 'Rp 2.000.000,00',
      unpaidLeave: 'Rp 9.500.000,00',
    },
    {
      id: 4,
      name: 'Budi Irawan',
      attendance: 'Rp 5.000.000,00',
      absent: 'Rp 2.500.000,00',
      paidLeave: 'Rp 2.000.000,00',
      unpaidLeave: 'Rp 9.500.000,00',
    },
    {
      id: 5,
      name: 'Budi Irawan',
      attendance: 'Rp 5.000.000,00',
      absent: 'Rp 2.500.000,00',
      paidLeave: 'Rp 2.000.000,00',
      unpaidLeave: 'Rp 9.500.000,00',
    },
  ],
  itemTotals: 5
};

function GrossContent(att) {
  const { isPreview } = att;
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
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
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <SimpleAccordion title='Operational Department'>
            <ContentWrapper>
              <Grid container spacing={2}>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Base Compensation</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 10.000.000</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Supplementary Compensation</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 5.000.000</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Ad Hoc Compensation</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 2.000.000</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Gross Payroll</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 17.000.000</Typography>
                </Grid>
              </Grid>
            </ContentWrapper>

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
                          <GrossRow key={index} isPreview={isPreview} item={item} />
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
          </SimpleAccordion>
        </Box>
      </ContentWrapper>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <SimpleAccordion title='Delivery Department'>
            <ContentWrapper>
              <Grid container spacing={2}>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Base Compensation</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 10.000.000</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Supplementary Compensation</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 5.000.000</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Ad Hoc Compensation</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 2.000.000</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Gross Payroll</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 17.000.000</Typography>
                </Grid>
              </Grid>
            </ContentWrapper>

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
                          <GrossRow
                            key={index}
                            isPreview={isPreview}
                            item={item}
                          />
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
          </SimpleAccordion>
        </Box>
      </ContentWrapper>
    </>
  );
}

export default GrossContent;