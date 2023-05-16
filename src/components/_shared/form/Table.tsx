import React, { ReactNode} from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  Box
} from '@mui/material';

interface TableProps {
  headChildren: unknown,
  bodyChildren: unknown,
  rowsPerPageOptions: Array<number>,
  count: number,
  page: number,
  rowsPerPage: number,
  onChangePage: any,
  onRowsPerPagesChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
}

function Table({
  headChildren,
  bodyChildren,
  rowsPerPageOptions,
  count,
  page,
  onChangePage,
  rowsPerPage,
  onRowsPerPagesChange
}: TableProps) {
  const HeadComponent = headChildren;
  const BodyComponent = bodyChildren;
  return (
    <>
      <TableContainer>
        <MuiTable>
          <TableHead>
            {HeadComponent as ReactNode}
          </TableHead>
          <TableBody>
            {BodyComponent as ReactNode}
          </TableBody>
        </MuiTable>
      </TableContainer>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onRowsPerPagesChange}
          sx={{ borderBottom: 'none' }}
        />
      </Box>
    </>

  );
}

export default Table;