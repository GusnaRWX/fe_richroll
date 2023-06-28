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

  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    const isAsc = compareCheck(sort === headId, direction === 'asc');
    setDirection(ifThenElse(isAsc, 'desc', 'asc'));
    setSort(headId);
  };

  const headers = [
    { id: 'date', label: 'Date' },
    { id: 'emp.id', label: 'Employee ID' },
    { id: 'emp.name', label: 'Employee Name' },
    { id: 'leave.from', label: 'Leave From' },
    { id: 'leave.to', label: 'Leave To' },
    { id: 'leave.type', label: 'Leave Type' },
    { id: 'status', label: 'Status' },
    { id: 'action', label: '' }
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
  };

  const loadDataLeaveEntries = () => {
    dispatch({
      type: getLeaveEntriesRequested.toString(),
      payload: {
        page: page,
        itemPerPage: rowsPerPage,
        sort: sort,
        direction: direction.toUpperCase(),
        search: '',
        companyID: companyData?.id
      }
    });
  };

  const handleDelete = () => {
    setDeleteConfirmation(false);
    dispatch({
      type: deleteLeaveEntriesRequested.toString(),
      payload: selectedItem?.id
    });
    loadDataLeaveEntries();
  };

  useEffect(() => {
    loadDataLeaveEntries();
  }, [rowsPerPage, page, sort, direction]);

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
          />
        </Grid>
      </Grid>
      <Table
        count={leaveEntries?.leaveEntriesData?.items?.length}
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onRowsPerPagesChange={handleChangeRowsPerPage}
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
                    <TableRow key={value.date}>
                      <TableCell>{dayjs(value.date).format('DD/MM/YY')}</TableCell>
                      <TableCell>{value.employee?.employeeID}</TableCell>
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
                      <TableCell>{dayjs(value.to).format('DD/MM/YY')}</TableCell>
                      <TableCell>{renderLeaveType(value?.leaveType)}</TableCell>
                      <TableCell>{renderLeaveStatus(value?.leaveStatus)}</TableCell>
                      <TableCell>
                        <ButtonWrapper>
                          <IconButton
                            parentColor='primary.50'
                            onClick={() => {
                              setSelectedItem(value.date);
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
        title='Delete Data Entry'
        content='You are about to delete this leave data entry. This action cannot be undone'
        withCallback
        noChange
        type='delete'
        callback={handleDelete}
      />
      <LeaveEntriesEditComponent
        open={editConfirmation}
        // item={selectedItem}
        handleClose={() => setEditConfirmation(false)}
      />
    </Card>
  );
};

export default LeaveEntriesTableComponent;