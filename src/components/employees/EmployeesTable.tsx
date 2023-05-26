import React, { useState, useEffect } from 'react';
import {
  Grid,
  Select,
  MenuItem,
  TableCell,
  TableRow,
  Avatar,
  Chip,
  Box,
  TableSortLabel,
  Typography
} from '@mui/material';
import { Input, IconButton } from '../_shared/form';
import { Search  } from '@mui/icons-material';
import Table from '../_shared/form/Table';
import { HiPencilAlt } from 'react-icons/hi';
import { BsTrashFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getEmployeeRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { getCompanyData, compareCheck, ifThenElse } from '@/utils/helper';
import dayjs from 'dayjs';
import { visuallyHidden } from '@mui/utils';

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
  { id: 'id', label: 'ID' },
  { id: 'user.name', label: 'Name' },
  { id: 'position.name', label: 'Position' },
  { id: 'department.name', label: 'Department' },
  { id: 'isActive', label: 'Status' },
  { id: 'user.createdAt', label: 'Created on' },
  { id: 'user.lastLogin', label: 'Last Login' },
];

interface EmployeeTableProps {
  tabValue: number
}

type Order = 'asc' | 'desc'

function EmployeesTable({
  tabValue
}: EmployeeTableProps) {
  const dispatch = useAppDispatch();
  const data = useAppSelectors(state => state.employee.data);
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);
  const companyData = getCompanyData();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 0));
    setPage(0);
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
    console.log(companyData);

    dispatch({
      type: getEmployeeRequested.toString(),
      payload: {
        page: page + 1,
        itemPerPage: rowsPerPage,
        sort: sort,
        direction: direction.toUpperCase(),
        search: search,
        isActive: ifThenElse(tabValue === 0, true, false),
        companyID: companyData?.id
      }
    });
  }, [rowsPerPage, page, tabValue, search, sort, direction]);

  useEffect(() => {
    setHaydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
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
                    ): null}
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
                ifThenElse(data?.items.length === 0, (
                  <TableRow>
                    <TableCell colSpan={12} align='center'><Typography>Data not found</Typography></TableCell>
                  </TableRow>
                ), (
                  data?.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        <NameWrapper>
                          <Avatar
                            src={ifThenElse(item?.user?.userInformation !== null, item?.user?.userInformation.picture, item.user.name)}
                            alt={ifThenElse(item?.user?.userInformation !== null, item?.user?.userInformation.picture, item.user.name)}
                            sx={{
                              width: 24, height: 24
                            }}
                          />
                    &nbsp;{item.user.name}
                        </NameWrapper>
                      </TableCell>
                      <TableCell>{item.position.name}</TableCell>
                      <TableCell>{item.department.name}</TableCell>
                      <TableCell>{ifThenElse(item.isActive, (
                        <Chip color='secondary' label='active' />
                      ), (
                        <Chip label='Non Active' sx={{ backgroundColor: '#FEE2E2' }}/>
                      ))}</TableCell>
                      <TableCell>{dayjs(item.user.createdAt).format('YYYY-MM-DD H:m:s')}</TableCell>
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
    </>
  );
}

export default EmployeesTable;