import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  TableCell,
  TableRow,
  Avatar,
  Box,
  TableSortLabel,
  Typography,
} from '@mui/material';
import Table from '@/components/_shared/form/Table';
import styled from '@emotion/styled';
import { visuallyHidden } from '@mui/utils';
import { ifThenElse, compareCheck } from '@/utils/helper';

const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
`;

const headerItems = [
  { id: 'no', label: 'No' },
  { id: 'name', label: 'Employee Name' },
  { id: 'leave', label: 'Leave Date' },
  { id: 'type', label: 'Type' },
  { id: 'change', label: 'Changes' },
];

interface LeaveBalanceHistoryTableProps {
  tabValue: number;
}

type Order = 'asc' | 'desc';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
function LeaveBalanceHistoryTable({ tabValue }: LeaveBalanceHistoryTableProps) {
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const EmployeeName = router.query.name;
  const [hydrated, setHaydrated] = useState(false);

  const data = {
    items: [
      {
        no: 1,
        employeeImage: EmployeeName?.toString(),
        employeeName: EmployeeName?.toString(),
        leave: '00/00/0000 - 00/00/0000',
        type: 'No Pay leave',
        change: '99 Days',
      },
      {
        no: 2,
        employeeImage: EmployeeName?.toString(),
        employeeName: EmployeeName?.toString(),
        leave: '00/00/0000 - 00/00/0000',
        type: 'No Pay leave',
        change: '99 Days',
      },
      {
        no: 3,
        employeeImage: EmployeeName?.toString(),
        employeeName: EmployeeName?.toString(),
        leave: '00/00/0000 - 00/00/0000',
        type: 'No Pay leave',
        change: '99 Days',
      },
    ],
    itemTotals: 3,
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    headId: string
  ) => {
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
      <Table
        count={data?.itemTotals}
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onRowsPerPagesChange={(e) => handleChangeRowsPerPage(e)}
        headChildren={
          <TableRow>
            {headerItems.map((item) => (
              <TableCell
                key={item.id}
                sortDirection={ifThenElse(sort === item.id, direction, false)}
              >
                <TableSortLabel
                  active={sort === item.id}
                  direction={ifThenElse(sort === item.id, direction, 'asc')}
                  onClick={(e) => handleRequestSort(e, item.id)}
                >
                  {item.label}
                  {ifThenElse(sort === item.id, (
                    <Box component='span' sx={visuallyHidden}>
                      {ifThenElse(direction === 'asc', 'sorted descending', 'sorted ascending')}
                    </Box>
                  ), null)}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        }
        bodyChildren={
          <>
            {ifThenElse(typeof data?.items !== 'undefined', (
              ifThenElse(data?.items.length === 0, (
                <TableRow>
                  <TableCell colSpan={12} align='center'>
                    <Typography>Data not found</Typography>
                  </TableCell>
                </TableRow>
              ), (
                data?.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.no}</TableCell>
                    <TableCell>
                      <NameWrapper>
                        <Avatar
                          src={ifThenElse(item.employeeImage !== null, item.employeeImage, item.employeeName)}
                          alt={ifThenElse(item.employeeImage !== null, item.employeeImage, item.employeeName)}
                          sx={{
                            width: 24,
                            height: 24,
                          }}
                        />
                        &nbsp;{item.employeeName}
                      </NameWrapper>
                    </TableCell>
                    <TableCell>{item.leave}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.change}</TableCell>
                  </TableRow>
                ))
              ))
            ), (
              <TableRow>
                <TableCell colSpan={12} align='center'>
                  <Typography>Data not found</Typography>
                </TableCell>
              </TableRow>
            ))}
          </>
        }
      />
    </>
  );
}

export default LeaveBalanceHistoryTable;
