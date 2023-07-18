import React, { useState, useEffect } from 'react';
import {
  TableCell,
  TableRow,
  Box,
  TableSortLabel,
} from '@mui/material';
import Table from '@/components/_shared/form/Table';
import { IconButton } from '@/components/_shared/form';
import styled from '@emotion/styled';
import { visuallyHidden } from '@mui/utils';
import { useRouter } from 'next/router';
import { ConfirmationModal } from '@/components/_shared/common';
import EmptyState from '@/components/_shared/common/EmptyState';
import { useTranslation } from 'react-i18next';

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

const headerItems = [
  { id: 'company_name', label: 'Company Name' },
  { id: 'country', label: 'Country' },
  { id: 'contributors', label: 'Contributor(s)' },
  { id: 'rate_type', label: 'Rate Type' },
  { id: 'created_on', label: 'Created On' },
  { id: 'last_update', label: 'last Updated' },
  { id: 'action', label: '' },
];

type Order = 'asc' | 'desc';

function SutatoryBenefitComponentTable() {
  // Translate Key
  const {t} = useTranslation();
  const t_tableKey = 'satutory_benefit.component.table';
  const t_modalKey = 'satutory_benefit.component.modal';


  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [DeleteConfirmation, setDeleteConfirmation] = useState(false);
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

  const router = useRouter();
  function DetailActionHandler() {
    router.push('/satutory-benefit/component/detail');
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
                  {t(t_tableKey + '.' + item.id)}
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
                    <EmptyState />
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
                          onClick={DetailActionHandler}
                        />
                        <IconButton
                          parentColor='red.100'
                          icons={<DeleteIcon sx={{ color: '#EF4444' }} />}
                          onClick={() => setDeleteConfirmation(true)}
                        />
                      </ButtonWrapper>
                    </TableCell>
                  </TableRow>
                ))
              )
            ) : (
              <TableRow>
                <TableCell colSpan={12} align='center'>
                  <EmptyState />
                </TableCell>
              </TableRow>
            )}
            <ConfirmationModal
              open={DeleteConfirmation}
              handleClose={() => setDeleteConfirmation(false)}
              title={t(`${t_modalKey}.delete.title`)}
              content={t(`${t_modalKey}.delete.text`)}
              withCallback
              noChange={true}
              callback={() => setDeleteConfirmation(false)}
              type='delete'
            />
          </>
        }
      />
    </>
  );
}

export default SutatoryBenefitComponentTable;
