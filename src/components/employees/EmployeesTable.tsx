import React, { useState, useEffect } from 'react';
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
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getEmployeeRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';

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

interface EmployeeTableProps {
  tabValue: number
}

function EmployeesTable({
  tabValue
}: EmployeeTableProps) {
  const dispatch = useAppDispatch();
  const data = useAppSelectors(state => state.employee.data);
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    dispatch({
      type: getEmployeeRequested.toString(),
      payload: {
        page: newPage + 1,
        itemPerPage: rowsPerPage,
        sort: '',
        direction: false,
        search: search,
        isActive: tabValue === 0 ? true : false,
        companyID: 4
      }
    });
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 0));
    setPage(0);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.key === 'Enter') {
      dispatch({
        type: getEmployeeRequested.toString(),
        payload: {
          page: page + 1,
          itemPerPage: rowsPerPage,
          sort: '',
          direction: false,
          search: e.target.value,
          isActive: tabValue === 0 ? true : false,
          companyID: 4
        }
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: getEmployeeRequested.toString(),
      payload: {
        page: page + 1,
        itemPerPage: rowsPerPage,
        sort: '',
        direction: false,
        search: search,
        isActive: tabValue === 0 ? true : false,
        companyID: 4
      }
    });
  }, [rowsPerPage, page, tabValue]);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            name='search'
            size='small'
            placeholder='Search'
            onKeyDown={(e) => handleSearch(e)}
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
            <MenuItem value='inactive'>Inactive</MenuItem>
            <MenuItem value='draft'>Draft</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Table
        count={data?.itemTotals}
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onRowsPerPagesChange={(e) =>handleChangeRowsPerPage(e)}
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
              typeof data?.items !== 'undefined' ? (
                data?.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <NameWrapper>
                        <Avatar
                          src={item.user.userInformation.picture}
                          alt={item.user.userInformation.picture}
                          sx={{
                            width: 24, height: 24
                          }}
                        />
                    &nbsp;{item.user.name}
                      </NameWrapper>
                    </TableCell>
                    <TableCell>{item.position.name}</TableCell>
                    <TableCell>{item.department.name}</TableCell>
                    <TableCell>{item.user.isActive ? (
                      <Chip color='secondary' label='active' />
                    ):(
                      <Chip label='Non Active' sx={{ backgroundColor: '#FEE2E2' }}/>
                    )}</TableCell>
                    <TableCell>{item.user.createdAt}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <ButtonWrapper>
                        <IconButton
                          parentColor='primary.50'
                          onClick={() => { router.push('/company-management/employees/detail/' + item.id); }}
                          icons={
                            <HiPencilAlt fontSize={20} color='#223567'/>
                          }
                        />
                        <IconButton
                          parentColor='grey.100'
                          disabled
                          icons={
                            <BsTrashFill fontSize={20} color='#D1D5DB'/>
                          }
                        />
                      </ButtonWrapper>
                    </TableCell>
                  </TableRow>
                ))
              ): (
                <TableRow>
                  <TableCell colSpan={12} align='center'>Data not found</TableCell>
                </TableRow>
              )
            }
          </>
        }
      />
    </>
  );
}

export default EmployeesTable;