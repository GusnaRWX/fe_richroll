import React, { useState, useEffect } from 'react';
import {
  Grid,
  TableCell,
  Avatar,
  TableRow,
  Box,
  TableSortLabel,
} from '@mui/material';
import { Input } from '../_shared/form';
import { Search } from '@mui/icons-material';
import Table from '../_shared/form/Table';
import { compareCheck, ifThenElse, getCompanyData } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';
import { IconButton } from '@/components/_shared/form';
import { BsTrashFill } from 'react-icons/bs';
import { HiPencilAlt } from 'react-icons/hi';
import styled from '@emotion/styled';
import { ConfirmationModal } from '@/components/_shared/common';
import AttendanceEntriesEdit from './AttendanceEntriesEdit';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getAttendanceRequested, putAttendanceRequested, deleteAttendanceRequested } from '@/store/reducers/slice/attendance-leave/attendanceEntriesSlice';
import { AttendanceLeave } from '@/types/attendanceLeave';
import dayjs from 'dayjs';
import EmptyState from '../_shared/common/EmptyState';

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 gap: .5rem;
`;

const NameWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 margin: 0;
`;

const headerItems = [
  { id: 'date', label: 'Date' },
  { id: 'id', label: 'Employee ID' },
  { id: 'name', label: 'Employee Name' },
  { id: 'clockIn', label: 'Check In' },
  { id: 'clockOut', label: 'Check Out' },
  { id: 'count', label: 'Count' },
  { id: 'action', label: '' },
];

type Order = 'asc' | 'desc'

const AttendanceEntriesTable = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelectors(state => state.attendanceEntries.data);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const companyData = getCompanyData();
  const [hydrated, setHaydrated] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AttendanceLeave.AttendanceType | undefined>();
  const [editConfirmation, setEditConfirmation] = useState(false);
  const { responser } = useAppSelectors((state) => state);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
  };

  const handleDelete = () => {
    setDeleteConfirmation(false);
    dispatch({
      type: deleteAttendanceRequested.toString(),
      payload: selectedItem?.id
    });
  };

  const handleUpdate = (dataUpdt: AttendanceLeave.PutAttendance) => {
    setEditConfirmation(false);
    dispatch({
      type: putAttendanceRequested.toString(),
      payload: {
        id: selectedItem?.id,
        data: {
          clockIn: dayjs(dataUpdt.clockIn).toISOString(),
          clockOut: dayjs(dataUpdt.clockOut).toISOString()
        }
      }
    });
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
      type: getAttendanceRequested.toString(),
      payload: {
        page: page,
        itemPerPage: rowsPerPage,
        sort: sort,
        direction: direction.toUpperCase(),
        search: search,
        companyID: companyData?.id
      }
    });
  }, [rowsPerPage, page, search, sort, direction, responser.code]);

  useEffect(() => {
    setHaydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
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
                    <TableRow key={index}>
                      <TableCell>{dayjs(item.date).format('DD/MM/YY')}</TableCell>
                      <TableCell>{item.employee.employeeID}</TableCell>
                      <TableCell>
                        <NameWrapper>
                          <Avatar
                            src={item.employee.picture}
                            alt={item.employee.name}
                            sx={{
                              width: 24, height: 24
                            }}
                          />
                          &nbsp;{item.employee.name}
                        </NameWrapper>
                      </TableCell>
                      <TableCell>{dayjs(item.clockIn).format('HH:mm')}</TableCell>
                      <TableCell>{dayjs(item.clockOut).format('HH:mm')}</TableCell>
                      <TableCell>{item.count}</TableCell>
                      <TableCell>
                        <ButtonWrapper>
                          <IconButton
                            parentColor='#E9EFFF'
                            onClick={() => {
                              setSelectedItem(item);
                              setEditConfirmation(true);
                            }}
                            icons={
                              <HiPencilAlt fontSize={20} color='#223567' />
                            }
                          />
                          <IconButton
                            parentColor='#FEE2E2'
                            onClick={() => {
                              setSelectedItem(item);
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
        title='Delete Attendance Entry'
        content='You are about to delete this attendance entry. This action cannot be undone.'
        withCallback
        noChange={true}
        type='delete'
        callback={() => handleDelete()}
      />
      <AttendanceEntriesEdit
        open={editConfirmation}
        handleClose={() => { setEditConfirmation(false); }}
        callback={(dataCb) => handleUpdate(dataCb)}
        item={selectedItem}
      />
    </>
  );
};

export default AttendanceEntriesTable;