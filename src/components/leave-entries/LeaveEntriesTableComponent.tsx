import React, { useEffect, useState } from 'react';
import { Card } from '../_shared/common';
import { Grid, TableCell, TableRow, Avatar, TableSortLabel, Box } from '@mui/material';
import { IconButton, Input } from '../_shared/form';
import { Search } from '@mui/icons-material';
import Table from '../_shared/form/Table';
import { Image } from '@/utils/assetsConstant';
import { HiPencilAlt } from 'react-icons/hi';
import { BsTrashFill } from 'react-icons/bs';
import { visuallyHidden } from '@mui/utils';
import { ConfirmationModal } from '@/components/_shared/common';
import LeaveEntriesEditComponent from './LeaveEntriesEditComponent';
import EmptyState from '../_shared/common/EmptyState';

import styled from '@emotion/styled';
import { compareCheck, getCompanyData, ifThenElse } from '@/utils/helper';
import store from '@/store/index';
import { getLeaveEntriesRequested } from '@/store/reducers/slice/attendance-leave/leaveEntriesSlice';
import { useAppSelectors } from '@/hooks/index';

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
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [selectedItem, setSelectedItem] = useState('');
  const [editConfirmation, setEditConfirmation] = useState(false);
  const companyData = getCompanyData();
  const leaveEntries = useAppSelectors(state => state.leaveEntries);

  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    const isAsc = compareCheck(sort === headId, direction === 'asc');
    setDirection(ifThenElse(isAsc, 'desc', 'asc'));
    setSort(headId);
  };

  const handleDelete = () => {
    setDeleteConfirmation(false);
  };


  const data = [
    {
      date: '27/11/2022',
      employeeID: 'MIG1231123123',
      employeeName: 'Asep Subaru',
      leaveFrom: '09:00',
      leaveTo: '11:00',
      leaveType: 'Sick Leave',
      status: 'Paid'
    },
    {
      date: '27/11/2022',
      employeeID: 'MIG1231123123',
      employeeName: 'Asep Subaru',
      leaveFrom: '09:00',
      leaveTo: '11:00',
      leaveType: 'Sick Leave',
      status: 'Paid'
    }
  ];

  const headers = [
    { id: 'date', label: 'Date' },
    { id: 'emp.id', label: 'Employee ID' },
    { id: 'emp.name', label: 'Employee Name' },
    { id: 'leave.from', label: 'Leave From' },
    { id: 'leave.to', label: 'Leave To' },
    { id: 'leave.type', label: 'Leave Type' },
    { id: 'status', label: 'Status' },
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

  useEffect(() => {
    loadDataLeaveEntries();
  }, [rowsPerPage, page, sort, direction]);

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
        count={data?.length}
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
              ifThenElse(typeof data !== 'undefined', (
                ifThenElse(data.length === 0, (
                  <TableRow>
                    <TableCell colSpan={12} align='center'>
                      <EmptyState />
                    </TableCell>
                  </TableRow>
                ), (
                  leaveEntries?.leaveEntriesData?.items?.map(value => (
                    <TableRow key={value.date}>
                      <TableCell>{value.date}</TableCell>
                      <TableCell>{value.employeeID}</TableCell>
                      <TableCell>
                        <NameWrapper>
                          <Avatar
                            src={Image.EXAMPLE_EMPLOYE}
                            sx={{
                              width: 24, height: 24
                            }}
                          />
                          &nbsp;{value.employeeName}
                        </NameWrapper>
                      </TableCell>
                      <TableCell>{value.leaveFrom}</TableCell>
                      <TableCell>{value.leaveTo}</TableCell>
                      <TableCell>{value.leaveType}</TableCell>
                      <TableCell>{value.status}</TableCell>
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
                              setSelectedItem(value.date);
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