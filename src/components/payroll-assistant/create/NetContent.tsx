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
import NetRow from './NetRow';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { numberFormat } from '@/utils/format';
import { getNetPayrollRequested } from '@/store/reducers/slice/payroll/payrollSlice';

const ContentWrapper = styled(Card)(({
  padding: '1rem',
  marginBottom: '1rem'
}));


type Order = 'asc' | 'desc'

const headerItems = [
  {id: 'user.name', label: 'Full Name'},
  { id: 'gross', label: 'Gross Payroll' },
  { id: 'statutory', label: 'Satutory Benefit' },
  { id: 'tax', label: 'Tax' },
  { id: 'grossAfterTax', label: 'Gross After Tax' },
  { id: 'nonTaxableDeducation', label: 'Non-Taxable Deduction' },
  { id: 'net', label: 'Net Salary' },
  { id: 'action', label: '' },
];

function NetContent(att) {
  const {isPreview} = att;
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { netDetail } = useAppSelectors(state => state.payroll);
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
    if (router.isReady) {
      dispatch({
        type: getNetPayrollRequested.toString(),
        payload: router.query.id
      });
    }
  }, [router.query]);

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
                <Grid item xs={2}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Gross Payroll</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp. {numberFormat(netDetail?.gross)}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Satutory Benefits</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp {numberFormat(netDetail?.statutory)}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Tax</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp {numberFormat(netDetail?.tax)}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Gross After Tax</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp {numberFormat(netDetail?.grossAfterTax)}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Non-Taxable Deduction</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp {numberFormat(netDetail?.nonTaxableDeducation)}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Net Payroll</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp {numberFormat(netDetail?.net)}</Typography>
                </Grid>
              </Grid>
            </ContentWrapper>

            <Table
              count={netDetail?.net?.length}
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
                    ifThenElse(typeof netDetail?.nets !== 'undefined', (
                      ifThenElse(netDetail?.nets?.length === 0, (
                        <TableRow>
                          <TableCell colSpan={12} align='center'><Typography>Data not found</Typography></TableCell>
                        </TableRow>
                      ), (
                        netDetail?.nets?.map((item, index) => (
                          <NetRow key={index} item={item} isPreview={isPreview}/>
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

      {/* <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <SimpleAccordion title='Delivery Department'>
            <ContentWrapper>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Gross Payroll</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 17.000.000</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Satutory Benefits</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 1.048.000</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Tax</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 474.280</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Gross After Tax</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 19.773.000</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Non-Taxable Deduction</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 50.000</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Net Payroll</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 19.823.000</Typography>
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
                          <NetRow key={index} item={item} />
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
      </ContentWrapper> */}
    </>
  );
}

export default NetContent;