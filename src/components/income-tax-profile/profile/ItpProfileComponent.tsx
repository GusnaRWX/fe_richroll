import React, { useState, useEffect } from 'react';
import {
  TableCell,
  TableRow,
  Box,
  TableSortLabel,
  Typography,
  Grid
} from '@mui/material';
import Table from '@/components/_shared/form/Table';
import { IconButton, Button, DatePicker, CheckBox } from '@/components/_shared/form';
import styled from '@emotion/styled';
import { visuallyHidden } from '@mui/utils';
import { useRouter } from 'next/router';
import { ConfirmationModal, CustomModal } from '@/components/_shared/common';
import { ifThenElse, compareCheck } from '@/utils/helper';

// Import Icon React Icon
import DeleteIcon from '@mui/icons-material/Delete';
import { HiPencilAlt, HiUpload, HiOutlineArchive } from 'react-icons/hi';
import { FiCopy } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const headerItems = [
  { id: 'profile_name', label: 'Profile Name' },
  { id: 'country', label: 'Country' },
  { id: 'province', label: 'Province' },
  { id: 'effective_period', label: 'Effective Period' },
  { id: 'created_on', label: 'Created On' },
  { id: 'last_update', label: 'last Updated' },
];

const DraftHeaderItems = [
  { id: 'name', label: 'Name' },
  { id: 'country', label: 'Country' },
  { id: 'effective_period', label: 'Effective Period' },
  { id: 'created_on', label: 'Created On' },
  { id: 'last_update', label: 'last Updated' },
];

interface ItpProfileTableProps {
  tabValue: number;
  DeleteAction?: boolean;
  DetailAction?: boolean;
  CopyAction?: boolean;
  ActivateAction?: boolean;
  ArchivedAction?: boolean;
  Draft?: boolean;
}

type Order = 'asc' | 'desc';

function ItpProfileComponent({
  DeleteAction,
  DetailAction,
  CopyAction,
  ActivateAction,
  ArchivedAction,
  Draft,
}: ItpProfileTableProps) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [DeleteConfirmation, setDeleteConfirmation] = useState(false);
  const [DuplicateConfirmation, setDuplicateConfirmation] = useState(false);
  const [activateConfirmation, setActivateConfirmation] = useState(false);
  const [archiveConfirmation, setArchiveConfirmation] = useState(false);
  const [hydrated, setHaydrated] = useState(false);
  const {t} = useTranslation();

  const router = useRouter();
  function DetailActionHandler () {
    router.push('/income-tax-profile/profile/detail');
  }

  const data = {
    items: [
      {
        id: 1,
        name: 'Venti',
        country: 'Teyvat',
        province: 'Monstad',
        effective_period: '20/20/2020',
        created: '20/20/2020',
        last_update: '20/20/2020',
      },
      {
        id: 2,
        name: 'Zhongli',
        country: 'Teyvat',
        province: 'Liyue',
        effective_period: '20/20/2020',
        created: '20/20/2020',
        last_update: '20/20/2020',
      },
      {
        id: 3,
        name: 'Raiden Ei',
        country: 'Teyvat',
        province: 'Inazuma',
        effective_period: '20/20/2020',
        created: '20/20/2020',
        last_update: '20/20/2020',
      },
      {
        id: 4,
        name: 'Nahida',
        country: 'Teyvat',
        province: 'Sumeru',
        effective_period: '20/20/2020',
        created: '20/20/2020',
        last_update: '20/20/2020',
      },
      {
        id: 5,
        name: 'Aether',
        country: 'Unknown',
        province: 'Unknown',
        effective_period: '20/20/2020',
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
    setPage(1);
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
          Draft ?
            <TableRow>
              {DraftHeaderItems.map((item) => (
                <TableCell
                  key={item.id}
                  sortDirection={ifThenElse(sort === item.id, direction, false)}
                >
                  <TableSortLabel
                    active={sort === item.id}
                    direction={ifThenElse(sort === item.id, direction, 'asc')}
                    onClick={(e) => handleRequestSort(e, item.id)}
                  >
                    {t('income_tax_profile.profile.draft_table.' + item.id)}
                    {ifThenElse(sort === item.id, (
                      <Box component='span' sx={visuallyHidden}>
                        {ifThenElse(direction === 'asc', 'sorted descending', 'sorted ascending')}
                      </Box>
                    ), null)}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
            : <TableRow>
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
                    {t('income_tax_profile.profile.active_table.' + item.id)}
                    {ifThenElse(sort === item.id, (
                      <Box component='span' sx={visuallyHidden}>
                        {ifThenElse(direction === 'asc', 'sorted descending', 'sorted ascending')}
                      </Box>
                    ), null)}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell />
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
                    {Draft ?
                      <>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.country}</TableCell>
                        <TableCell>{item.effective_period}</TableCell>
                        <TableCell>{item.created}</TableCell>
                        <TableCell>{item.last_update}</TableCell>
                      </>
                      :
                      <>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.country}</TableCell>
                        <TableCell>{item.province}</TableCell>
                        <TableCell>{item.effective_period}</TableCell>
                        <TableCell>{item.created}</TableCell>
                        <TableCell>{item.last_update}</TableCell>
                      </>
                    }
                    <TableCell>
                      <ButtonWrapper>
                        {ActivateAction && (
                          <Button
                            color='green'
                            sx={{ bgcolor: '#DCFCE7', color: '#16A34A' }}
                            startIcon={<HiUpload />}
                            label={t('button.activate')}
                            onClick={() => setActivateConfirmation(true)}
                          />
                        )}
                        {CopyAction && (
                          <IconButton
                            parentColor='base'
                            sx={{
                              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                            }}
                            icons={<FiCopy fontSize={20} color='#374151' />}
                            onClick={() => setDuplicateConfirmation(true)}
                          />
                        )}
                        {DetailAction && (
                          <IconButton
                            parentColor='primary.50'
                            icons={
                              <HiPencilAlt fontSize={20} color='#223567' />
                            }
                            onClick={DetailActionHandler}
                          />
                        )}
                        {DeleteAction && (
                          <IconButton
                            parentColor='red.100'
                            icons={<DeleteIcon sx={{ color: '#EF4444' }} />}
                            onClick={() => setDeleteConfirmation(true)}
                          />
                        )}
                        {ArchivedAction && (
                          <Button
                            color='orange'
                            sx={{ bgcolor: '#FFEDD5', color: '#F97316' }}
                            startIcon={<HiOutlineArchive />}
                            label={t('button.archive')}
                            onClick={() => setArchiveConfirmation(true)}
                          />
                        )}
                      </ButtonWrapper>
                    </TableCell>
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
      <ConfirmationModal
        type='delete'
        open={DeleteConfirmation}
        handleClose={() => setDeleteConfirmation(false)}
        title={t('income_tax_profile.profile.modal.delete.title')}
        content={t('income_tax_profile.profile.modal.delete.description')}
        withCallback
        noChange={true}
        callback={() => setDeleteConfirmation(false)}
      />
      <ConfirmationModal
        open={DuplicateConfirmation}
        handleClose={() => setDuplicateConfirmation(false)}
        title={t('income_tax_profile.profile.modal.duplicate.title')}
        content={t('income_tax_profile.profile.modal.duplicate.description')}
        withCallback
        noChange={true}
        callback={() => setDuplicateConfirmation(false)}
      />
      <CustomModal
        open={activateConfirmation}
        handleClose={() => setActivateConfirmation(false)}
        handleConfirm={() => setActivateConfirmation(false)}
        title={t('income_tax_profile.profile.modal.activate.title')}
        width='40%'
      >
        <Grid container p={2} spacing={2}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography>{t('income_tax_profile.profile.modal.activate.description')}</Typography>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <DatePicker customLabel={t('income_tax_profile.profile.modal.activate.effective_date')} />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <DatePicker customLabel={t('income_tax_profile.profile.modal.activate.expiration_date')} />
            </Grid>
          </Grid>
        </Grid>
      </CustomModal>
      <CustomModal
        open={archiveConfirmation}
        handleClose={() => setArchiveConfirmation(false)}
        handleConfirm={() => setArchiveConfirmation(false)}
        title={t('income_tax_profile.profile.modal.archive.title')}
        width='40%'
      >
        <Grid>
          <DatePicker customLabel={t('income_tax_profile.profile.modal.archive.description')} withAsterisk />
          <CheckBox customLabel={t('income_tax_profile.profile.modal.archive.checkbox')} />
        </Grid>
      </CustomModal>
    </>
  );
}

export default ItpProfileComponent;