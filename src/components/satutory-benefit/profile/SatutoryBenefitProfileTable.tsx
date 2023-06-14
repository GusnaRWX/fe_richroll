import React, { useState, useEffect } from 'react';
import {
  TableCell,
  TableRow,
  Box,
  TableSortLabel,
  Typography,
} from '@mui/material';
import Table from '@/components/_shared/form/Table';
import { IconButton, Button } from '@/components/_shared/form';
import styled from '@emotion/styled';
import { visuallyHidden } from '@mui/utils';

// Import Icon React Icon
import DeleteIcon from '@mui/icons-material/Delete';
import { HiPencilAlt } from 'react-icons/hi';
import { FiCopy } from 'react-icons/fi';
import { HiUpload } from 'react-icons/hi';
import { HiOutlineArchive } from 'react-icons/hi';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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

interface SutatoryBenefitProfileTableProps {
  tabValue: number;
  DeleteAction?: boolean;
  EditAction?: boolean;
  CopyAction?: boolean;
  ActivateAction?: boolean;
  ArchivedAction?: boolean;
}

type Order = 'asc' | 'desc';

function SutatoryBenefitProfileTable({
  // tabValue,
  DeleteAction,
  EditAction,
  CopyAction,
  ActivateAction,
  ArchivedAction,
}: SutatoryBenefitProfileTableProps) {
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
                        {ActivateAction && (
                          <Button
                            color='green'
                            sx={{ bgcolor: '#DCFCE7', color: '#16A34A' }}
                            startIcon={<HiUpload />}
                            label='Activate'
                          />
                        )}
                        {CopyAction && (
                          <IconButton
                            parentColor='base'
                            sx={{
                              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                            }}
                            icons={<FiCopy fontSize={20} color='#374151' />}
                          />
                        )}
                        {EditAction && (
                          <IconButton
                            parentColor='primary.50'
                            icons={
                              <HiPencilAlt fontSize={20} color='#223567' />
                            }
                          />
                        )}
                        {DeleteAction && (
                          <IconButton
                            parentColor='red.100'
                            icons={<DeleteIcon sx={{ color: '#EF4444' }} />}
                          />
                        )}
                        {ArchivedAction && (
                          <Button
                            color='orange'
                            sx={{ bgcolor: '#FFEDD5', color: '#F97316' }}
                            startIcon={<HiOutlineArchive />}
                            label='Archive'
                          />
                        )}
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

export default SutatoryBenefitProfileTable;
