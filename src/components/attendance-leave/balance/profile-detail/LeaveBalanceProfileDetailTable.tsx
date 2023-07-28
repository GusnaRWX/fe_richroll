import React, { useState, useEffect } from 'react';
import {
  TableCell,
  TableRow,
  Box,
  TableSortLabel,
  Typography,
} from '@mui/material';
import Table from '@/components/_shared/form/Table';
import { visuallyHidden } from '@mui/utils';
import { ifThenElse, compareCheck } from '@/utils/helper';

const headerItems = [
  { id: 'anual', label: 'Annual Leave' },
  { id: 'child_care', label: 'Child Care Leave' },
  { id: 'nopay', label: 'No Pay Leave' },
  { id: 'maternity', label: 'Maternity Leave' },
  { id: 'paternity', label: 'Paternity Leave' },
  { id: 'shared', label: 'Shared Parental Leave' },
];

type Order = 'asc' | 'desc';

function LeaveBalanceProfileDetailTable() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);

  const data = {
    items: [
      {
        annual: '15/15',
        childCare: '15/15',
        noPay: '15/15',
        maternity: '15/15',
        paternity: '15/15',
        sharedParental: '15/15',
      },
    ],
    itemTotals: 1,
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
                    <TableCell>{item.annual}</TableCell>
                    <TableCell>{item.childCare}</TableCell>
                    <TableCell>{item.noPay}</TableCell>
                    <TableCell>{item.maternity}</TableCell>
                    <TableCell>{item.paternity}</TableCell>
                    <TableCell>{item.sharedParental}</TableCell>
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

export default LeaveBalanceProfileDetailTable;
