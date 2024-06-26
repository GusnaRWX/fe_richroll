import React, { useEffect, useState } from 'react';
import { Card } from '../_shared/common';
import { Grid, TableCell, TableRow, Avatar, TableSortLabel, Box, Chip } from '@mui/material';
import { IconButton, Input } from '../_shared/form';
import { Search } from '@mui/icons-material';
import Table from '../_shared/form/Table';
import { HiPencilAlt } from 'react-icons/hi';
import { BsTrashFill } from 'react-icons/bs';
import { visuallyHidden } from '@mui/utils';
import { ConfirmationModal } from '@/components/_shared/common';
import LeaveEntriesEditComponent from './LeaveEntriesEditComponent';
import EmptyState from '../_shared/common/EmptyState';
import dayjs from 'dayjs';
import { LeaveTypeItems, LeaveTypeStatus } from '@/utils/options';
import styled from '@emotion/styled';
import { compareCheck, getCompanyData, ifThenElse } from '@/utils/helper';
import store from '@/store/index';
import { getLeaveEntriesRequested, deleteLeaveEntriesRequested } from '@/store/reducers/slice/attendance-leave/leaveEntriesSlice';
import { useAppSelectors } from '@/hooks/index';
import { AttendanceLeave } from '@/types/attendanceLeave';
import { useTranslation } from 'react-i18next';

const NameWrapper = styled.div`
   display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: 0;
`;

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 gap: .5rem;
`;

type Order = 'asc' | 'desc'

interface LeaveEntriesTableProps {
  dispatch: typeof store.dispatch
}

const LeaveEntriesTableComponent = ({
  dispatch
}: LeaveEntriesTableProps) => {

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [direction, setDirection] = useState<Order>('desc');
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AttendanceLeave.LeaveEntriesList | null>(null);
  const [editConfirmation, setEditConfirmation] = useState(false);
  const companyData = getCompanyData();
  const leaveEntries = useAppSelectors(state => state.leaveEntries);
  const [searchData, setSearchData] = useState('');
  const { responser } = useAppSelectors((state) => state);
  const {t} = useTranslation();
  const t_tableHeader = 'attendance_&_leave.leave_entries.table.table_cols_item';
  const t_tableCustomValue = 'attendance_&_leave.leave_entries.table.custom_value';
  const t_deletePopup = 'attendance_&_leave.leave_entries.popup.delete';

  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    const isAsc = compareCheck(sort === headId, direction === 'asc');
    setDirection(ifThenElse(isAsc, 'desc', 'asc'));
    setSort(headId);
  };

  const headers = [
    { id: 'employee.code', label: t(`${t_tableHeader}.employee_id`) },
    { id: 'employee.user.name', label: t(`${t_tableHeader}.employee_name`) },
    { id: 'items.start', label: t(`${t_tableHeader}.date`)},
    { id: '', label: t(`${t_tableHeader}.From`)},
    { id: 'items.leaveType', label: t(`${t_tableHeader}.leave_type`) },
    { id: 'items.leaveStatus', label: t(`${t_tableHeader}.status`) },
    { id: 'action', label: '' }
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
  };

  const handleDelete = () => {
    setDeleteConfirmation(false);
    dispatch({
      type: deleteLeaveEntriesRequested.toString(),
      payload: {
        id: selectedItem?.id,
      }
    });
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchData(e.target.value);
    }
  };

  useEffect(() => {
    dispatch({
      type: getLeaveEntriesRequested.toString(),
      payload: {
        page: page,
        itemPerPage: rowsPerPage,
        sort: sort,
        direction: direction.toUpperCase(),
        search: searchData,
        companyID: companyData?.id
      }
    });
  }, [rowsPerPage, page, sort, direction, searchData, responser.code]);

  const renderLeaveType = (type: number) => {
    return LeaveTypeItems.find(item => +item.value === type)?.label;
  };

  const renderLeaveStatus = (type: number) => {
    const statusType = LeaveTypeStatus.find(item => +item.value === type);
    if (statusType) {
      switch (+statusType?.value) {
        case 1:
          return <Chip label={statusType?.label} sx={{ color: '#166534', backgroundColor: '#DCFCE7' }} />;
        case 2:
          return <Chip label={statusType?.label} sx={{ color: '#991B1B', backgroundColor: '#FEE2E2' }} />;
        default:
          return null;
      }
    }
  };

  const renderIsHalfday = (halfday: boolean) => {
    if (halfday) {
      return <Chip label={t(`${t_tableCustomValue}.half_day`)} sx={{ color: '#9A3412', backgroundColor: '#FFEDD5' }} />;
    } else {
      return <Chip label={t(`${t_tableCustomValue}.full_day`)} sx={{ color: '#075985', backgroundColor: '#E0F2FE' }} />;
    }
  };

  console.log(leaveEntries?.leaveEntriesData?.items);

  return (
    <Card sx={{ marginTop: '16px' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Input
            name='search'
            size='small'
            placeholder='Search'
            type='text'
            InputProps={{
              startAdornment: (
                <Search sx={{ color: '#9CA3AF' }} />
              )
            }}
            onKeyDown={(e) => handleSearch(e)}
          />
        </Grid>
      </Grid>
      <Table
        count={leaveEntries?.leaveEntriesData?.itemTotals}
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onRowsPerPagesChange={(e) => handleChangeRowsPerPage(e)}
        headChildren={
          <TableRow>
            {
              headers?.map(item => (
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
              ifThenElse(typeof leaveEntries?.leaveEntriesData?.items !== 'undefined', (
                ifThenElse(leaveEntries?.leaveEntriesData?.items?.length === 0, (
                  <TableRow>
                    <TableCell colSpan={12} align='center'>
                      <EmptyState />
                    </TableCell>
                  </TableRow>
                ), (
                  leaveEntries?.leaveEntriesData?.items?.map(value => (
                    <TableRow key={value?.id}>
                      <TableCell>{ifThenElse(value.employee?.code === null, '-', value.employee?.code)}</TableCell>
                      <TableCell>
                        <NameWrapper>
                          <Avatar
                            src={value?.employee?.picture}
                            sx={{
                              width: 24, height: 24
                            }}
                          />
                          &nbsp;{value.employee?.name}
                        </NameWrapper>
                      </TableCell>
                      <TableCell>{dayjs(value.start).format('DD/MM/YY')}</TableCell>
                      <TableCell>{dayjs(value.start).format('HH:mm')}</TableCell>
                      <TableCell>{renderLeaveType(value?.leaveType)}</TableCell>
                      <TableCell>
                        <Grid container alignItems='center' justifyContent='space-between'>
                          <Grid item>{renderIsHalfday(value?.isHalfday as boolean)}</Grid>
                          <Grid item>{renderLeaveStatus(value?.leaveStatus)}</Grid>
                        </Grid>
                      </TableCell>
                      <TableCell>
                        <ButtonWrapper>
                          <IconButton
                            parentColor='primary.50'
                            onClick={() => {
                              setSelectedItem(value);
                              setEditConfirmation(true);
                            }}
                            icons={
                              <HiPencilAlt fontSize={20} color='#223567' />
                            }
                          />
                          <IconButton
                            parentColor='red.50'
                            onClick={() => {
                              setSelectedItem(value);
                              setDeleteConfirmation(true);
                            }}
                            icons={
                              <BsTrashFill fontSize={20} color='#EF4444' />
                            }
                          />
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
        title={t(`${t_deletePopup}.title`)}
        content={t(`${t_deletePopup}.desc`)}
        withCallback
        noChange
        type='delete'
        callback={handleDelete}
      />
      <LeaveEntriesEditComponent
        open={editConfirmation}
        selectedItem={selectedItem}
        handleClose={() => setEditConfirmation(false)}
        setSelectedItem={setSelectedItem}
      />
    </Card>
  );
};

export default LeaveEntriesTableComponent;