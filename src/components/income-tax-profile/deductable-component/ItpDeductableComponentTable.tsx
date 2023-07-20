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
import { useRouter } from 'next/router';
import { ConfirmationModal } from '@/components/_shared/common';
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
  { id: 'component_condition', label: 'Component Condition' },
  { id: 'last_update', label: 'last Updated' },
];

interface ItpDeductableComponentTableProps {
  tabValue: number;
}

type Order = 'asc' | 'desc';

function ItpDeductableComponentTable({
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  tabValue,
}: ItpDeductableComponentTableProps) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [DeleteConfirmation, setDeleteConfirmation] = useState(false);
  const {t} = useTranslation();
  const [hydrated, setHaydrated] = useState(false);

  const data = {
    items: [
      {
        id: 1,
        companyName: 'PT. Cari Jodoh Sejahterah',
        condition: 'Manual',
        created: '20/20/2020',
        last_update: '20/20/2020',
      },
      {
        id: 1,
        companyName: 'PT. Cari Jodoh Sejahterah',
        condition: 'Marital Status',
        created: '20/20/2020',
        last_update: '20/20/2020',
      },
      {
        id: 1,
        companyName: 'PT. Cari Jodoh Sejahterah',
        condition: 'Marital Status',
        created: '20/20/2020',
        last_update: '20/20/2020',
      },
      {
        id: 1,
        companyName: 'PT. Cari Jodoh Sejahterah',
        condition: 'Manual',
        created: '20/20/2020',
        last_update: '20/20/2020',
      },
      {
        id: 1,
        companyName: 'PT. Cari Jodoh Sejahterah',
        condition: 'Number Dependants',
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

  const router = useRouter();
  function DetailActionHandler() {
    router.push('/income-tax-profile/deductable-component/detail');
  }

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
                  {t('income_tax_profile.deductable_component.table.'+item.id)}
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
            <TableCell />
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
                    <TableCell>{item.condition}</TableCell>
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
                          onClick={()=>setDeleteConfirmation(true)}
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
            <ConfirmationModal
              open={DeleteConfirmation}
              handleClose={() => setDeleteConfirmation(false)}
              title={t('income_tax_profile.deductable_component.table.delete_modal.title')}
              content={t('income_tax_profile.deductable_component.table.delete_modal.text')}
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

export default ItpDeductableComponentTable;