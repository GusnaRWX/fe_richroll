import React, { useState, useEffect } from 'react';
import {
  Grid,
  TableCell,
  TableRow,
  Box,
  TableSortLabel,
  Button as MuiButton
} from '@mui/material';
import { Input, DateRangePicker } from '../_shared/form';
import { Search } from '@mui/icons-material';
import Table from '../_shared/form/Table';
import { compareCheck, ifThenElse, getCompanyData } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';
import { IconButton } from '@/components/_shared/form';
import { BsTrashFill, BsFillEyeFill } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi';
import { HiOutlineInboxIn } from 'react-icons/hi';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ConfirmationModal } from '@/components/_shared/common';
import EmptyState from '../_shared/common/EmptyState';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getPayrollRequested } from '@/store/reducers/slice/payroll/payrollSlice';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 gap: .5rem;
`;

const TypeComponent = styled.div`
 background: #FFEDD5;
 border-radius: 4px;
 color: #9A3412;
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

function DisbursementTable({
  tabValue
}: EmployeeTableProps) {
  const dispatch = useAppDispatch();
  const data = useAppSelectors(state => state.payroll.data);
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
  const {t} = useTranslation();
  const t_colsItem = 'payroll_and_disbursement.disbursement.table.table_cols_item';

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
        workflow: 'DISBURSEMENT',
        status: ifThenElse(tabValue === 0, 'DRAFT', ifThenElse(tabValue === 1,  'COMPLETED', 'ARCHIVE'))
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
        <Grid item xs={6}>
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
                    {item.label === '' ? '' : t(`${t_colsItem}.${item.label}`)}
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
                      <TableCell><TypeComponent>Disbursement Receipt</TypeComponent></TableCell>
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
                                onClick={() => { router.push('/payroll-disbursement/disbursement/generate'); }}
                                icons={
                                  <BsFillEyeFill fontSize={20} color='#223567' />
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
                          {tabValue === 2 && (
                            <>
                              <IconButton
                                parentColor='#E9EFFF'
                                onClick={() => { router.push('/payroll-disbursement/disbursement/generate'); }}
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
        title='Delete Disbursement Receipt from Payroll Operation?'
        content='You are about to delete this disbursement receipt. This action cannot be undone.'
        withCallback
        noChange={true}
        callback={() => setDeleteConfirmation(false)}
      />
    </>
  );
}

export default DisbursementTable;