import React, { ReactNode } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination
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
  console.log(count);
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
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component='div'
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onRowsPerPagesChange}
      />
    </>

  );
}

export default Table;