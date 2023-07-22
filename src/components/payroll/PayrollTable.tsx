import React, { useState, useEffect } from 'react';
import {
  Grid,
  TableCell,
  TableRow,
  Box,
  TableSortLabel,
  Button as MuiButton
} from '@mui/material';
import { Input } from '../_shared/form';
import { Search } from '@mui/icons-material';
import Table from '../_shared/form/Table';
import { compareCheck, ifThenElse, getCompanyData } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';
import { IconButton } from '@/components/_shared/form';
import { BsTrashFill, BsFillEyeFill } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi';
import { TbFileImport } from 'react-icons/tb';
import { HiOutlineInboxIn } from 'react-icons/hi';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ConfirmationModal } from '@/components/_shared/common';
import EmptyState from '../_shared/common/EmptyState';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getPayrollRequested } from '@/store/reducers/slice/payroll/payrollSlice';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { HiPencilAlt } from 'react-icons/hi';

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 gap: .5rem;
`;

const GrossComponent = styled.div`
 background: #FEF9C3;
 border-radius: 4px;
 color: #854D0E;
 padding: 3px 12px;
 text-align: center;
`;

const NetComponent = styled.div`
 background: #DCFCE7;
 border-radius: 4px;
 color: #166534;
 padding: 3px 12px;
 text-align: center;
`;

const headerItems = [
  { id: 'user.name', label: 'name' },
  { id: 'dateRange', label: 'date_range' },
  { id: 'type', label: 'report_type' },
  { id: 'user.createdAt', label: 'created_on' },
  { id: 'user.lastUpdated', label: 'last_updated' },
  { id: 'attachment', label: 'attachment' },
  { id: 'action', label: '' },
];

interface EmployeeTableProps {
  tabValue: number
}

type Order = 'asc' | 'desc'

function PayrollTable({
  tabValue
}: EmployeeTableProps) {
  const { data } = useAppSelectors(state => state.payroll);

  const Tabs = {
    0: 'DRAFT',
    1: 'CONFIRMED',
    2: 'COMPLETED',
    3: 'ARCHIVE'
  };

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const companyData = getCompanyData();
  const { responser } = useAppSelectors((state) => state);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const t_tableCols = 'payroll_and_disbursement.payroll_report.table.table_cols_item';

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
        direction: direction,
        search: search,
        countryCode: '',
        companyID: companyData?.id,
        workflow: 'payroll',
        status: Tabs[tabValue]
      }
    });
  }, [page, rowsPerPage, sort, direction, search, responser.code, tabValue]);

  useEffect(() => {
    setHaydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return (
    <>
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
        {/* <Grid item xs={6}>
          <DateRangePicker
            withAsterisk
            // value={formik.values.startDate as unknown as Date}
            onChange={(date: unknown) => console.log(date)}
          // error={formik.touched.startDate && formik.errors.startDate ? String(formik.errors.startDate) : ''}
          />
        </Grid> */}
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
                    {item.label === '' ? '' : t(`${t_tableCols}.${item.label}`)}
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
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{dayjs(item.start).format('DD/MM/YYYY')} - {dayjs(item.end).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>{ifThenElse(item.workflow === 1, <GrossComponent>Gross Payroll Report</GrossComponent>, <NetComponent>Net Payroll Report</NetComponent>)}</TableCell>
                      <TableCell>{dayjs(item.createdAt).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>{dayjs(item.updatedAt).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>
                        <MuiButton
                          variant='contained'
                          color='inherit'
                          size='small'
                          sx={{ color: '#111827' }}
                          onClick={() => { console.log(true); }}
                        >
                          {item.attachment.filename} &nbsp;<FiDownload fontSize='small' />
                        </MuiButton>
                      </TableCell>
                      <TableCell>
                        <ButtonWrapper>
                          {tabValue === 0 && (
                            <>
                              <IconButton
                                parentColor='#E9EFFF'
                                onClick={() => { item.workflow === 1 ? router.push({ pathname: '/payroll-disbursement/payroll/generate-gross/detail', query: { id: item?.id } }) : router.push('/payroll-disbursement/payroll/net-detail'); }}
                                icons={
                                  <HiPencilAlt fontSize={20} color='#223567' />
                                }
                              />
                              <IconButton
                                parentColor='#FEE2E2'
                                onClick={() => setDeleteConfirmation(true)}
                                icons={
                                  <BsTrashFill fontSize={20} color='#EF4444' />
                                }
                              />
                            </>
                          )}
                          {tabValue === 1 && (
                            <>
                              <IconButton
                                parentColor='#E9EFFF'
                                onClick={() => { item.workflow === 1 ? router.push('/payroll-disbursement/payroll/gross-detail') : router.push('/payroll-disbursement/payroll/net-detail'); }}
                                icons={
                                  <TbFileImport fontSize={20} color='#223567' />
                                  //<BsFillEyeFill fontSize={20} color='#223567' />
                                }
                              />
                              <IconButton
                                parentColor='#FEE2E2'
                                onClick={() => setDeleteConfirmation(true)}
                                icons={

                                  <BsTrashFill fontSize={20} color='#EF4444' />
                                }
                              />
                            </>
                          )}
                          {tabValue === 2 && (
                            <>
                              <IconButton
                                parentColor='#E9EFFF'
                                icons={
                                  <HiOutlineInboxIn fontSize={20} color='#223567' />
                                }
                              />
                              <IconButton
                                parentColor='#FEE2E2'
                                onClick={() => setDeleteConfirmation(true)}
                                icons={
                                  <BsTrashFill fontSize={20} color='#EF4444' />
                                }
                              />
                            </>
                          )}
                          {tabValue === 3 && (
                            <>
                              <IconButton
                                parentColor='#E9EFFF'
                                onClick={() => { item.reportType === 'gross' ? router.push('/payroll-disbursement/payroll/gross-detail') : router.push('/payroll-disbursement/payroll/net-detail'); }}
                                icons={
                                  <BsFillEyeFill fontSize={20} color='#223567' />
                                }
                              />
                            </>
                          )}
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
      <ConfirmationModal
        open={deleteConfirmation}
        handleClose={() => setDeleteConfirmation(false)}
        title='Delete Payroll from Payroll Operation?'
        content='You are about to delete this payroll report. This action cannot be undone.'
        withCallback
        noChange={true}
        callback={() => setDeleteConfirmation(false)}
      />
    </>
  );
}

export default PayrollTable;