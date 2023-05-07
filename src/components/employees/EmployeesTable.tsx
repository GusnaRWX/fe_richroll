import React, { useState } from 'react';
import {
  Grid,
  Select,
  MenuItem,
  TableCell,
  TableRow,
  Avatar,
  Chip
} from '@mui/material';
import { Input } from '../_shared/form';
import { Search  } from '@mui/icons-material';
import Table from '../_shared/form/Table';
import { IconButton } from '../_shared/form';
import { HiPencilAlt } from 'react-icons/hi';
import { BsTrashFill } from 'react-icons/bs';
import styled from '@emotion/styled';

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
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'position', label: 'Position' },
  { key: 'department', label: 'Department' },
  { key: 'status', label: 'Status' },
  { key: 'created_at', label: 'Created on' },
  { key: 'last_login', label: 'Last Login' },
];

const dataItems = [
  {
    id: '1',
    name: 'john',
    position: 'Cook',
    department: 'XXX',
    status: false,
    created_at: '12/08/2023',
    last_login: '14/08/2023 17:00',
    images: 'https://unsplash.com/photos/iJnZwLBOB1I'

  },
  {
    id: '2',
    name: 'john',
    position: 'Cook',
    department: 'XXX',
    status: true,
    created_at: '12/08/2023',
    last_login: '14/08/2023 17:00',
    images: 'https://unsplash.com/photos/iJnZwLB0B1I'
  },
  {
    id: '3',
    name: 'john',
    position: 'Cook',
    department: 'XXX',
    status: false,
    created_at: '12/08/2023',
    last_login: '14/08/2023 17:00',
    images: 'https://unsplash.com/photos/iJnZwLB0B1I'
  },
  {
    id: '4',
    name: 'john',
    position: 'Cook',
    department: 'XXX',
    status: true,
    created_at: '12/08/2023',
    last_login: '14/08/2023 17:00',
    images: 'https://unsplash.com/photos/iJnZwLB0B1I'
  },
  {
    id: '5',
    name: 'john',
    position: 'Cook',
    department: 'XXX',
    status: false,
    created_at: '12/08/2023',
    last_login: '14/08/2023 17:00',
    images: 'https://unsplash.com/photos/iJnZwLB0B1I'
  },
  {
    id: '6',
    name: 'john',
    position: 'Cook',
    department: 'XXX',
    status: true,
    created_at: '12/08/2023',
    last_login: '14/08/2023 17:00',
    images: 'https://unsplash.com/photos/iJnZwLB0B1I'
  },
  {
    id: '7',
    name: 'john',
    position: 'Cook',
    department: 'XXX',
    status: false,
    created_at: '12/08/2023',
    last_login: '14/08/2023 17:00',
    images: 'https://unsplash.com/photos/iJnZwLB0B1I'
  },
  {
    id: '7',
    name: 'john',
    position: 'Cook',
    department: 'XXX',
    status: true,
    created_at: '12/08/2023',
    last_login: '14/08/2023 17:00',
    images: 'https://unsplash.com/photos/iJnZwLB0B1I'
  },
  {
    id: '1',
    name: 'john',
    position: 'Cook',
    department: 'XXX',
    status: false,
    created_at: '12/08/2023',
    last_login: '14/08/2023 17:00',
    images: 'https://unsplash.com/photos/iJnZwLB0B1I'
  },
  {
    id: '1',
    name: 'john',
    position: 'Cook',
    department: 'XXX',
    status: false,
    created_at: '12/08/2023',
    last_login: '14/08/2023 17:00',
    images: 'https://unsplash.com/photos/iJnZwLB0B1I'
  },
  {
    id: '1',
    name: 'john',
    position: 'Cook',
    department: 'XXX',
    status: false,
    created_at: '12/08/2023',
    last_login: '14/08/2023 17:00',
    images: 'https://unsplash.com/photos/iJnZwLB0B1I'
  },
  {
    id: '1',
    name: 'john',
    position: 'Cook',
    department: 'XXX',
    status: false,
    created_at: '12/08/2023',
    last_login: '14/08/2023 17:00',
    images: 'https://unsplash.com/photos/iJnZwLB0B1I'
  },
  {
    id: '1',
    name: 'john',
    position: 'Cook',
    department: 'XXX',
    status: false,
    created_at: '12/08/2023',
    last_login: '14/08/2023 17:00',
    images: 'https://unsplash.com/photos/iJnZwLB0B1I'
  },
  {
    id: '1',
    name: 'john',
    position: 'Cook',
    department: 'XXX',
    status: false,
    created_at: '12/08/2023',
    last_login: '14/08/2023 17:00',
    images: 'https://unsplash.com/photos/iJnZwLB0B1I'
  },
  {
    id: '1',
    name: 'john',
    position: 'Cook',
    department: 'XXX',
    status: false,
    created_at: '12/08/2023',
    last_login: '14/08/2023 17:00',
    images: 'https://unsplash.com/photos/iJnZwLB0B1I'
  },
];

function EmployeesTable() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const handleChangePage = () => {
    setPage(page + 1);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            name='password'
            size='small'
            placeholder='Search'
            type='text'
            InputProps={{
              startAdornment: (
                <Search sx={{ color: '#9CA3AF' }}/>
              )
            }}
          />
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Select
            fullWidth
            variant='outlined'
            size='small'
            placeholder='Sort by Status'
          >
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='active'>Inactive</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Table
        count={dataItems.length}
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onRowsPerPagesChange={handleChangeRowsPerPage}
        headChildren={
          <TableRow>
            {
              headerItems.map((item, index) => (
                <TableCell key={index}>{item.label}</TableCell>
              ))
            }
          </TableRow>
        }
        bodyChildren={
          <>
            {
              dataItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>
                    <NameWrapper>
                      <Avatar
                        src={item.images}
                        alt={item.images}
                        sx={{
                          width: 24, height: 24
                        }}
                      />
                    &nbsp;{item.name}
                    </NameWrapper>
                  </TableCell>
                  <TableCell>{item.position}</TableCell>
                  <TableCell>{item.department}</TableCell>
                  <TableCell>{item.status ? (
                    <Chip color='secondary' label='active' />
                  ):(
                    <Chip label='Non Active' sx={{ backgroundColor: '#FEE2E2' }}/>
                  )}</TableCell>
                  <TableCell>{item.created_at}</TableCell>
                  <TableCell>{item.last_login}</TableCell>
                  <TableCell>
                    <ButtonWrapper>
                      <IconButton
                        parentColor='primary.50'
                        icons={
                          <HiPencilAlt fontSize={20} color='#223567'/>
                        }
                      />
                      <IconButton
                        parentColor='red.100'
                        icons={
                          <BsTrashFill fontSize={20} color='#EF4444'/>
                        }
                      />
                    </ButtonWrapper>
                  </TableCell>
                </TableRow>
              ))
            }
          </>
        }
      />
    </>
  );
}

export default EmployeesTable;