import React, { useState, useEffect } from 'react';
import {
  Grid,
  TableCell,
  Avatar,
  TableRow,
  Box,
  TableSortLabel,
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
import { HiPencilAlt } from 'react-icons/hi';
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
  { id: 'date', label: 'Date' },
  { id: 'employeeID', label: 'Employee ID' },
  { id: 'name', label: 'Employee Name' },
  { id: 'clockIn', label: 'Clock In' },
  { id: 'clockOut', label: 'Clock Out' },
  { id: 'action', label: '' },
];

type Order = 'asc' | 'desc'

function AttendanceEntriesTable() {
  const data = {
    items: [
      {
        id: 1,
        employeeID: 'MIG21090101',
        name: 'Budi Irawan',
        date: '31/03/2023',
        clockIn: '09:00',
        clockOut: '17:00',
      },
      {
        id: 2,
        employeeID: 'MIG21090101',
        name: 'Budi Irawan',
        date: '31/03/2023',
        clockIn: '09:00',
        clockOut: '17:00',
      },
      {
        id: 3,
        employeeID: 'MIG21090101',
        name: 'Budi Irawan',
        date: '31/03/2023',
        clockIn: '09:00',
        clockOut: '17:00',
      },
      {
        id: 4,
        employeeID: 'MIG21090101',
        name: 'Budi Irawan',
        date: '31/03/2023',
        clockIn: '09:00',
        clockOut: '17:00',
      },
      {
        id: 5,
        employeeID: 'MIG21090101',
        name: 'Budi Irawan',
        date: '31/03/2023',
        clockIn: '09:00',
        clockOut: '17:00',
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
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.employeeID}</TableCell>
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
                      <TableCell>{item.clockIn}</TableCell>
                      <TableCell>{item.clockOut}</TableCell>
                      <TableCell>
                        <ButtonWrapper>
                          <IconButton
                            parentColor='#E9EFFF'
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
        title='Delete Data Entry'
        content='You are about to delete this attendance data entry. This action cannot be undone.'
        withCallback
        noChange={true}
        callback={() => setDeleteConfirmation(false)}
      />
    </>
  );
}

export default AttendanceEntriesTable;