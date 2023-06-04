import React, { useState } from 'react';
import {
  Grid,
  Select,
  MenuItem,
  TableCell,
  TableRow,
  Avatar,
  Box,
  TableSortLabel,
  Typography
} from '@mui/material';
import { IconButton } from '@/components/_shared/form';
import CustomModal from '@/components/_shared/common/CustomModal';
import { Image as ImageType } from '@/utils/assetsConstant';
import Table from '@/components/_shared/form/Table';
import { FiCalendar } from 'react-icons/fi';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { compareCheck, ifThenElse } from '@/utils/helper';
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

const headerItemsEmployees = [
  { id: 'user.name', label: 'Employee Name' },
  { id: 'position', label: 'Position' },
  { id: 'department', label: 'Department' },
];

type Order = 'asc' | 'desc'

interface AttendanceModalProp {
  open: boolean;
  handleClose: () => void;
}

function AttendanceModal({
  open,
  handleClose,
}: AttendanceModalProp) {
  const dataEmployees = {
    items: [
      {
        id: 1,
        name: 'Budi Irawan',
        position: 'Prep-Cook',
        department: 'Kitchen',
      },
      {
        id: 2,
        name: 'Budi Irawan',
        position: 'Prep-Cook',
        department: 'Kitchen',
      },
      {
        id: 3,
        name: 'Budi Irawan',
        position: 'Prep-Cook',
        department: 'Kitchen',
      },
      {
        id: 4,
        name: 'Budi Irawan',
        position: 'Prep-Cook',
        department: 'Kitchen',
      },
      {
        id: 5,
        name: 'Budi Irawan',
        position: 'Prep-Cook',
        department: 'Kitchen',
      },
    ],
    itemTotals: 5
  };
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 0));
    setPage(0);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    const isAsc = compareCheck(sort === headId, direction === 'asc');
    setDirection(ifThenElse(isAsc, 'desc', 'asc'));
    setSort(headId);
  };

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title='Select Employees'
      width='640px'
      handleConfirm={handleClose}
      submitText='Add Employee'
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Table
            count={dataEmployees?.itemTotals}
            rowsPerPageOptions={[5, 10, 15]}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onRowsPerPagesChange={(e) =>handleChangeRowsPerPage(e)}
            headChildren={
              <TableRow>
                {
                  headerItemsEmployees.map((item) => (
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
                <TableCell>
                  <Select
                    fullWidth
                    variant='outlined'
                    size='small'
                    placeholder='Sort by Status'
                    value={''}
                  >
                    <MenuItem value=''>All Status</MenuItem>
                    <MenuItem value='active'>Active</MenuItem>
                    <MenuItem value='inactive'>Inactive</MenuItem>
                    <MenuItem value='draft'>Draft</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            }
            bodyChildren={
              <>
                {
                  ifThenElse(typeof dataEmployees?.items !== 'undefined', (
                    ifThenElse(dataEmployees?.items?.length === 0, (
                      <TableRow>
                        <TableCell colSpan={12} align='center'><Typography>Data not found</Typography></TableCell>
                      </TableRow>
                    ), (
                      dataEmployees?.items?.map((item, index) => (
                        <TableRow key={index}>
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
                          <TableCell>{item.position}</TableCell>
                          <TableCell>{item.department}</TableCell>
                          <TableCell>
                            <ButtonWrapper>
                              <IconButton
                                parentColor='#E9EFFF'
                                onClick={() => { router.push('/payroll-disbursement/payroll-assistant/create'); }}
                                icons={
                                  <FiCalendar fontSize={20} color='#223567'/>
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
        </Grid>
      </Grid>
    </CustomModal>
  );
}

export default AttendanceModal;