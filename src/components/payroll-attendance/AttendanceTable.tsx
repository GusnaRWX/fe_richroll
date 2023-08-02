import React, { useState, useEffect } from 'react';
import {
  Grid,
  TableCell,
  TableRow,
  Box,
  TableSortLabel,
  Button as MuiButton,
  Checkbox,
  Chip
} from '@mui/material';
import { Input } from '../_shared/form';
import { Search } from '@mui/icons-material';
import Table from '../_shared/form/Table';
import { compareCheck, ifThenElse, getCompanyData } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';
import { IconButton } from '@/components/_shared/form';
import { BsTrashFill, BsFillEyeFill } from 'react-icons/bs';
import { HiPencilAlt, HiOutlineInboxIn } from 'react-icons/hi';
import { FiDownload } from 'react-icons/fi';
import { TbFileImport } from 'react-icons/tb';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ConfirmationModal } from '@/components/_shared/common';
import EmptyState from '../_shared/common/EmptyState';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getPayrollRequested, postPayrollGrossesRequested, deletePayrollRequested, putPayrollWorkflowRequested } from '@/store/reducers/slice/payroll/payrollSlice';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 gap: .5rem;
`;

const DownloadWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-around;
 border-radius: 6px;
 cursor: pointer;
 background-color: #c5c5c5;
 padding: .5rem;
`;

const DownloadLabel = styled.div`
 display: inline-block;
 width: 120px;
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
`;

const headerItems = [
  { id: 'user.name', label: 'Name', translation: 'name' },
  { id: 'dateRange', label: 'Date Range', translation: 'date_range' },
  { id: 'type', label: 'Report Type', translation: 'report_type' },
  { id: 'user.createdAt', label: 'Created on', translation: 'created_on' },
  { id: 'user.lastUpdated', label: 'Last Updated', translation: 'last_updated' },
  { id: 'attachment', label: 'Attachment', translation: 'attachment' },
];

interface EmployeeTableProps {
  tabValue: number
}

type Order = 'asc' | 'desc'

interface CheckedTableProps {
  id: string;
  checked: boolean;
}

function AttendanceTable({
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
  const [deleteConfirmation, setDeleteConfirmation] = useState({ id: 0, open: false });
  const [archivedConfirmation, setArchivedConfirmation] = useState({ id: 0, open: false });
  const companyData = getCompanyData();
  const { responser } = useAppSelectors((state) => state);
  const router = useRouter();
  const { t } = useTranslation();
  const tPath = 'payroll_and_disbursement.attendance_summary.';
  const [selectedTemp, setSelectedTemp] = useState<CheckedTableProps[]>([]);

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

  const onSelected = (id, e) => {
    if (e.target.checked) {
      const temp = [...selectedTemp, { id: id, checked: true }];
      setSelectedTemp(temp);
    } else {
      const temp = selectedTemp.filter(v => v['id'] !== id);
      setSelectedTemp(temp);
    }
  };

  const checkVal = (id) => {
    return selectedTemp.some(v => v['id'] === id);
  };

  const onAll = (e) => {
    if (e.target.checked) {
      const temp = data?.items?.map((v) => {
        return { id: v.id, checked: true };
      });
      setSelectedTemp(temp);
    } else {
      setSelectedTemp([]);
    }
  };

  const checkAll = () => {
    return selectedTemp.length === rowsPerPage;
  };

  const handlePostGrosses = () => {
    dispatch({
      type: postPayrollGrossesRequested.toString(),
      payload: {
        data: {
          payrollID: selectedTemp.map(item => item?.id)
        },
        isAssist: false
      }
    });
  };

  const deletePayroll = (IdDel: string | number) => {
    dispatch({
      type: deletePayrollRequested.toString(),
      payload: IdDel
    });
  };

  const handleDeleteOpen = (id) => {
    setDeleteConfirmation({ id: id, open: true });
  };

  const handleDeleteClose = () => {
    setDeleteConfirmation({ id: 0, open: false });
  };

  const archivedPayroll = (IdArch: string | number) => {
    dispatch({
      type: putPayrollWorkflowRequested.toString(),
      payload: {
        id: IdArch,
        data: {
          workflow: 0,
          status: 3
        }
      }
    });
  };

  const handleArchivedOpen = (id) => {
    setArchivedConfirmation({ id: id, open: true });
  };

  const handleArchivedClose = () => {
    setArchivedConfirmation({ id: 0, open: false });
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
        workflow: 'ATTENDANCE',
        status: ifThenElse(tabValue === 0, 'DRAFT', ifThenElse(tabValue === 1, 'CONFIRMED', ifThenElse(tabValue === 2, 'COMPLETED', 'ARCHIVE')))
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
              tabValue === 1 && (
                <TableCell>
                  <Checkbox onChange={(e) => onAll(e)} checked={checkAll()} />
                </TableCell>
              )
            }
            {
              headerItems.map((item) => (
                <TableCell key={item.id} sortDirection={ifThenElse(sort === item.id, direction, false)}>
                  <TableSortLabel
                    active={sort === item.id}
                    direction={sort === item.id ? direction : 'asc'}
                    onClick={(e) => handleRequestSort(e, item.id)}
                  >
                    {t(`${tPath}table.table_cols_item.${item.translation}`)}
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
                    <TableCell colSpan={12} align='center'>
                      <EmptyState />
                    </TableCell>
                  </TableRow>
                ), (
                  data?.items?.map((item) => (
                    <TableRow key={item.id}>
                      {
                        tabValue === 1 && (
                          <TableCell>
                            <Checkbox onChange={(e) => onSelected(item?.id, e)} checked={checkVal(item?.id)} />
                          </TableCell>
                        )
                      }
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{dayjs(item.start).format('DD/MM/YYYY')} - {dayjs(item.end).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>
                        <Chip label='Attendance Report' sx={{ color: '#075985', backgroundColor: '#E0F2FE', borderRadius: '6px' }} />
                      </TableCell>
                      <TableCell>{dayjs(item.createdAt).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>{dayjs(item.updatedAt).format('DD/MM/YYYY')}</TableCell>
                      <TableCell>
                        {
                          ifThenElse(item.attachment.url !== null,
                            (
                              <>
                                <DownloadWrapper onClick={() => { window.open(item?.attachment?.url, '_blank'); }}>
                                  <DownloadLabel>
                                    {item.attachment.name}
                                  </DownloadLabel>
                                  <FiDownload fontSize='small' />
                                </DownloadWrapper>
                              </>
                            ),
                            'Generating'
                          )
                        }
                      </TableCell>
                      <TableCell>
                        <ButtonWrapper>
                          {tabValue === 0 && (
                            <>
                              <IconButton
                                disabled={!!selectedTemp.length}
                                parentColor='#E9EFFF'
                                onClick={() => { router.push({ pathname: '/payroll-disbursement/attendance/generate', query: { id: item?.id } }); }}
                                icons={
                                  <HiPencilAlt fontSize={20} color='#223567' />
                                  // <TbFileImport fontSize={20} color='#223567' />
                                }
                              />
                              <IconButton
                                disabled={!!selectedTemp.length}
                                parentColor='#FEE2E2'
                                onClick={() => handleDeleteOpen(item?.id)}
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
                                onClick={() => {
                                  dispatch({
                                    type: postPayrollGrossesRequested.toString(),
                                    payload: {
                                      data: {
                                        payrollID: [String(item.id)]
                                      },
                                      isAssist: false
                                    }
                                  });
                                }}
                                icons={
                                  <TbFileImport fontSize={20} color='#223567' />
                                }
                              />
                              {/* <IconButton
                                parentColor='#FEE2E2'
                                onClick={() => console.log('here')}
                                icons={
                                  <BsTrashFill fontSize={20} color='#EF4444' />
                                }
                              /> */}
                            </>
                          )}
                          {tabValue === 2 && (
                            <>
                              <IconButton
                                parentColor='#E9EFFF'
                                onClick={() => handleArchivedOpen(item?.id)}
                                icons={
                                  <HiOutlineInboxIn fontSize={20} color='#223567' />
                                }
                              />
                              <IconButton
                                parentColor='#E9EFFF'
                                onClick={() => { router.push('/payroll-disbursement/attendance/generate'); }}
                                icons={
                                  <BsFillEyeFill fontSize={20} color='#223567' />
                                }
                              />
                              <IconButton
                                parentColor='#FEE2E2'
                                onClick={() => handleDeleteOpen(item?.id)}
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
                                onClick={() => { router.push('/payroll-disbursement/attendance/generate'); }}
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
      {tabValue === 1 &&
        <Grid container spacing={2} mt='1rem'>
          <Grid item xs={9} sm={9} md={9} lg={9} xl={9}></Grid>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <MuiButton
              disabled={!selectedTemp.length}
              variant='contained'
              size='small'
              color='primary'
              onClick={handlePostGrosses}
            >{t('button.generate_gross_payroll')}</MuiButton>
          </Grid>
        </Grid>
      }
      <ConfirmationModal
        open={deleteConfirmation?.open}
        handleClose={handleDeleteClose}
        title={t(`${tPath}popup.delete.title`)}
        content={t(`${tPath}popup.delete.desc`)}
        withCallback
        noChange={true}
        callback={() => deletePayroll(deleteConfirmation?.id)}
      />
      <ConfirmationModal
        open={archivedConfirmation?.open}
        handleClose={handleArchivedClose}
        title='Archive Attendance from Payroll Operation'
        content='You are about to archive this payroll report. This action cannot be undone.'
        withCallback
        noChange={true}
        callback={() => archivedPayroll(archivedConfirmation?.id)}
      />
    </>
  );
}

export default AttendanceTable;