import React, { useState, useEffect } from 'react';
import {
  Grid,
  TableCell,
  TableRow,
  Avatar,
  Box,
  TableSortLabel,
  Select,
  MenuItem,
  Typography
} from '@mui/material';
import { Input } from '../_shared/form';
import { Search } from '@mui/icons-material';
import Table from '../_shared/form/Table';
import { Image as ImageType } from '@/utils/assetsConstant';
import { compareCheck, ifThenElse } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';
import { IconButton } from '@/components/_shared/form';
import { BsTrashFill } from 'react-icons/bs';
import { RiUserReceived2Fill } from 'react-icons/ri';
import { AiOutlineStop } from 'react-icons/ai';
import styled from '@emotion/styled';
import { ConfirmationModal } from '@/components/_shared/common';

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
  { id: 'accountID', label: 'Account ID' },
  { id: 'user.name', label: 'Full Name' },
  { id: 'email', label: 'Email' },
  { id: 'type', label: 'User Type' },
  { id: 'user.lastLogin', label: 'Last Login' },
  { id: 'user.createdAt', label: 'Created on' },
  { id: 'action', label: '' },
];

interface EmployeeTableProps {
  tabValue: number
}

type Order = 'asc' | 'desc'

function AttendanceTable({
  tabValue
}: EmployeeTableProps) {
  const data = {
    items: [
      {
        id: 1,
        accountID: '018379127',
        name: 'Budi Irawan',
        email: 'budirawan@gmail.com',
        type: 'HR Admin',
        createdAt: '01/02/22',
        lastLogin: '01/02/23, 12:00',
      },
      {
        id: 2,
        accountID: '018379127',
        name: 'Budi Irawan',
        email: 'budirawan@gmail.com',
        type: 'HR Admin',
        createdAt: '01/02/22',
        lastLogin: '01/02/23, 12:00',
      },
      {
        id: 3,
        accountID: '018379127',
        name: 'Budi Irawan',
        email: 'budirawan@gmail.com',
        type: 'HR Admin',
        createdAt: '01/02/22',
        lastLogin: '01/02/23, 12:00',
      },
      {
        id: 4,
        accountID: '018379127',
        name: 'Budi Irawan',
        email: 'budirawan@gmail.com',
        type: 'HR Admin',
        createdAt: '01/02/22',
        lastLogin: '01/02/23, 12:00',
      },
      {
        id: 5,
        accountID: '018379127',
        name: 'Budi Irawan',
        email: 'budirawan@gmail.com',
        type: 'HR Admin',
        createdAt: '01/02/22',
        lastLogin: '01/02/23, 12:00',
      },
    ],
    itemTotals: 5
  };
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  // const [search, setSearch] = useState('');
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [suspendConfirmation, setSuspendConfirmation] = useState(false);
  const [reactivateConfirmation, setReactivateConfirmation] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
    // setPage(0);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // setSearch(e.target.value);
      console.log(e.target.value);
      console.log(tabValue);

    }
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
        <Grid item xs={2}>
          <Select
            fullWidth
            variant='outlined'
            size='small'
            placeholder='Sort by Status'
            value={''}
          >
            <MenuItem value='company'>Company Listed</MenuItem>
            <MenuItem value='name'>Employee Name</MenuItem>
            <MenuItem value='all'>All</MenuItem>
          </Select>
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
                    <TableCell colSpan={12} align='center'><Typography>Data not found</Typography></TableCell>
                  </TableRow>
                ), (
                  data?.items?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.accountID}</TableCell>
                      <TableCell>
                        <NameWrapper>
                          <Avatar
                            src={ImageType.AVATAR_PLACEHOLDER}
                            alt={item.name}
                            sx={{
                              width: 24, height: 24
                            }}
                          />
                          &nbsp;{item.name}
                        </NameWrapper>
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.lastLogin}</TableCell>
                      <TableCell>{item.createdAt}</TableCell>
                      <TableCell>
                        <ButtonWrapper>
                          {tabValue === 0 && (
                            <>
                              <IconButton
                                parentColor='#FFEDD5'
                                onClick={() => setSuspendConfirmation(true)}
                                icons={
                                  <AiOutlineStop fontSize={20} color='#F97316' />
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
                          {tabValue !== 0 && (
                            <IconButton
                              parentColor='#DCFCE7'
                              onClick={() => setReactivateConfirmation(true)}
                              icons={
                                <RiUserReceived2Fill fontSize={20} color='#22C55E' />
                              }
                            />
                          )}
                        </ButtonWrapper>
                      </TableCell>
                    </TableRow>
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
      <ConfirmationModal
        open={deleteConfirmation}
        handleClose={() => setDeleteConfirmation(false)}
        title='Confirm Account Deletion'
        content='Are you sure you want to delete the selected account?'
        withCallback
        noChange={true}
        callback={() => setDeleteConfirmation(false)}
        type='delete'
      />
      <ConfirmationModal
        open={suspendConfirmation}
        handleClose={() => setSuspendConfirmation(false)}
        title='Confirm Account Suspension'
        content='Are you sure you want to suspend the selected account? You can reactivate account later.'
        withCallback
        noChange={true}
        callback={() => setSuspendConfirmation(false)}
        type='suspend'
      />
      <ConfirmationModal
        open={reactivateConfirmation}
        handleClose={() => setReactivateConfirmation(false)}
        title='Confirm Account Reactivation'
        content='Are you sure you want to reactivate the selected account?'
        withCallback
        noChange={true}
        callback={() => setReactivateConfirmation(false)}
        type='reactivate'
      />
    </>
  );
}

export default AttendanceTable;