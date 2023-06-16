import React, { useState, useEffect } from 'react';
import {
  TableCell,
  TableRow,
  Box,
  TableSortLabel,
  Typography,
} from '@mui/material';
import Table from '@/components/_shared/form/Table';
import { IconButton } from '@/components/_shared/form';
import styled from '@emotion/styled';
import { visuallyHidden } from '@mui/utils';

// Import Icon React Icon
import DeleteIcon from '@mui/icons-material/Delete';
import { HiPencilAlt } from 'react-icons/hi';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
`;

const headerItems = [
  { id: 'name', label: 'Company Name' },
  { id: 'country', label: 'Country' },
  { id: 'contributor', label: 'Contributor(s)' },
  { id: 'type', label: 'Rate Type' },
  { id: 'created', label: 'Created On' },
  { id: 'last_update', label: 'last Updated' },
  { id: 'action', label: '' },
];

interface SutatoryBenefitComponentTableProps {
  tabValue: number;
}

type Order = 'asc' | 'desc';

function SutatoryBenefitComponentTable({
  // tabValue,
}: SutatoryBenefitComponentTableProps) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);

  const data = {
    items: [
      {
        id: 1,
        companyName: 'PT. Cari Jodoh Sejahterah',
        country: 'Indonesian',
        contributors: 'Employee',
        type: 'Fixed rate',
        created: '20/20/2020',
        last_update: '20/20/2020',
      },
      {
        id: 1,
        companyName: 'PT. Cari Jodoh Sejahterah',
        country: 'Indonesian',
        contributors: 'Employee',
        type: 'Fixed rate',
        created: '20/20/2020',
        last_update: '20/20/2020',
      },
      {
        id: 1,
        companyName: 'PT. Cari Jodoh Sejahterah',
        country: 'Indonesian',
        contributors: 'Employee',
        type: 'Fixed rate',
        created: '20/20/2020',
        last_update: '20/20/2020',
      },
      {
        id: 1,
        companyName: 'PT. Cari Jodoh Sejahterah',
        country: 'Indonesian',
        contributors: 'Employee',
        type: 'Fixed rate',
        created: '20/20/2020',
        last_update: '20/20/2020',
      },
      {
        id: 1,
        companyName: 'PT. Cari Jodoh Sejahterah',
        country: 'Indonesian',
        contributors: 'Employee',
        type: 'Fixed rate',
        created: '20/20/2020',
        last_update: '20/20/2020',
      },
    ],
    itemTotals: 5,
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 0));
    setPage(0);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    headId: string
  ) => {
    const isAsc = sort === headId && direction === 'asc';
    setDirection(isAsc ? 'desc' : 'asc');
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
        count={data?.items.length}
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
                sortDirection={sort === item.id ? direction : false}
              >
                <TableSortLabel
                  active={sort === item.id}
                  direction={sort === item.id ? direction : 'asc'}
                  onClick={(e) => handleRequestSort(e, item.id)}
                >
                  {item.label}
                  {sort === item.id ? (
                    <Box component='span' sx={visuallyHidden}>
                      {direction === 'asc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        }
        bodyChildren={
          <>
            {typeof data?.items !== 'undefined' ? (
              data?.items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={12} align='center'>
                    <Typography>Data not found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data?.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.companyName}</TableCell>
                    <TableCell>{item.country}</TableCell>
                    <TableCell>{item.contributors}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.created}</TableCell>
                    <TableCell>{item.last_update}</TableCell>
                    <TableCell>
                      <ButtonWrapper>
                        <IconButton
                          parentColor='primary.50'
                          icons={<HiPencilAlt fontSize={20} color='#223567' />}
                        />
                        <IconButton
                          parentColor='red.100'
                          icons={<DeleteIcon sx={{ color: '#EF4444' }} />}
                        />
                      </ButtonWrapper>
                    </TableCell>
                  </TableRow>
                ))
              )
            ) : (
              <TableRow>
                <TableCell colSpan={12} align='center'>
                  <Typography>Data not found</Typography>
                </TableCell>
              </TableRow>
            )}
          </>
        }
      />
    </>
  );
}

export default SutatoryBenefitComponentTable;
