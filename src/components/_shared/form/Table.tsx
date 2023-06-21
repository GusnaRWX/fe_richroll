import React, { ReactNode, useState } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  Box,
  Pagination,
  Menu,
  MenuItem
} from '@mui/material';
import Button from './Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


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
  console.log(count);
  const [currentPage, setCurrentPage] = useState(rowsPerPageOptions[0]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const HeadComponent = headChildren;
  const BodyComponent = bodyChildren;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeRow = (page) => {
    setCurrentPage(page);
    setAnchorEl(null);
    if (onRowsPerPagesChange) {
      onRowsPerPagesChange(page);
    }
  };

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
      {/* <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component='div'
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onRowsPerPagesChange}
          sx={{ borderBottom: 'none' }}
        />
      </Box> */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: '24px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }} component='div' onClick={handleClick}>
              <Button
                label={`${currentPage} Records`}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                variant='outlined'
                sx={{
                  border: 'none',
                  ':hover': {
                    border: 'none'
                  }
                }}
              />
              <KeyboardArrowDownIcon sx={{ width: '20px', height: '20px' }} />
            </Box>
            <p>per pages</p>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id='records-pagination'
            keepMounted
            open={open}
            onClose={handleClose}
          >
            {rowsPerPageOptions?.map((value, index) => (
              <MenuItem key={index} onClick={() => { handleChangeRow(value); }}>{value + ' Records'}</MenuItem>
            ))}
          </Menu>
          <p>Showing <b>{page}</b> to <b>{rowsPerPage}</b> of <b>{count}</b> results</p>
        </Box>
        <Box>
          <Pagination count={Math.round(count / rowsPerPage) || 1} variant='outlined' shape='rounded' onChange={onChangePage} />
        </Box>
      </Box>
    </>

  );
}

export default Table;