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
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { getPayrollGrossesRequested } from '@/store/reducers/slice/payroll/payrollSlice';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { numberFormat } from '@/utils/format';

const ContentWrapper = styled(Card)(({
  padding: '1rem',
  marginBottom: '1rem'
}));

const headerItems = [
  { id: 'user.name', label: 'Full Name', translation: 'fullname' },
  { id: 'attendance', label: 'Base Compensation', translation: 'base_compensation' },
  { id: 'absent', label: 'Supplementary Compensation', translation: 'Supplementary_compensation' },
  { id: 'paidLeave', label: 'Ad Hoc Compensation', translation: 'ad_hoc_compensation' },
  { id: 'unpaidLeave', label: 'Gross Compensation', translation: 'gross_compensation' },
  // { id: 'action', label: '' },
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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const dataGross = useAppSelectors(state => state.payroll.grossesEmployeeDetail);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);
  const { t } = useTranslation();
  const tPath = 'payroll_and_disbursement.attendance_summary.generate_gross_payroll.detail.';

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

  useEffect(() => {
    if (router.isReady) {
      dispatch({
        type: getPayrollGrossesRequested.toString(),
        payload: router.query.id
      });
    }
  }, [router.query]);

  if (!hydrated) {
    return null;
  }


  return (
    <>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <SimpleAccordion title={t(`${tPath}operational_department.title`)}>
            <ContentWrapper>
              <Grid container spacing={2}>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>
                    {t(`${tPath}operational_department.card_items.total_base_compensation`)}
                  </Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp {numberFormat(dataGross?.totalBaseCompensation)}</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>
                    {t(`${tPath}operational_department.card_items.total_supplementary_compensation`)}
                  </Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp {numberFormat(dataGross?.totalSupplementaryCompensation)}</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>
                    {t(`${tPath}operational_department.card_items.total_ad_hoc_compensation`)}
                  </Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp {numberFormat(dataGross?.totalAddHokCompensation)}</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>
                    {t(`${tPath}operational_department.card_items.total_gross_payroll`)}
                  </Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp {numberFormat(dataGross?.totalGrossCompensation)}</Typography>
                </Grid>
              </Grid>
            </ContentWrapper>

            <Table
              count={dataGross?.gross?.length}
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
                          {t(`${tPath}operational_department.table.table_cols_item.${item.translation}`)}
                          {sort === item.id ? (
                            <Box component='span' sx={visuallyHidden}>
                              {ifThenElse(direction === 'asc', 'sorted descending', 'sorted ascending')}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    ))
                  }
                  <TableCell />
                </TableRow>
              }
              bodyChildren={
                <>
                  {
                    ifThenElse(typeof dataGross?.gross !== 'undefined', (
                      ifThenElse(dataGross?.gross?.length === 0, (
                        <TableRow>
                          <TableCell colSpan={12} align='center'><Typography>Data not found</Typography></TableCell>
                        </TableRow>
                      ), (
                        dataGross?.gross?.map((item, index) => (
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
          <SimpleAccordion title={t(`${tPath}delivery_department.title`)}>
            <ContentWrapper>
              <Grid container spacing={2}>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>
                    {t(`${tPath}delivery_department.card_items.total_base_compensation`)}
                  </Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 10.000.000</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>
                    {t(`${tPath}delivery_department.card_items.total_supplementary_compensation`)}
                  </Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 5.000.000</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>
                    {t(`${tPath}delivery_department.card_items.total_ad_hoc_compensation`)}
                  </Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 2.000.000</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>
                    {t(`${tPath}delivery_department.card_items.total_gross_payroll`)}
                  </Typography>
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
                  <TableCell />
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