import React, { useState, useEffect } from 'react';
import {
  Grid,
  TableCell,
  TableRow,
  Box,
  TableSortLabel
} from '@mui/material';
import { Input, IconButton } from '../_shared/form';
import { Search, Visibility } from '@mui/icons-material';
import Table from '../_shared/form/Table';
import { HiPencilAlt } from 'react-icons/hi';
import { BsTrashFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { deleteCompensationRequested, getTableRequested } from '@/store/reducers/slice/cnb/compensationSlice';
import { compareCheck, ifThenElse, getCompanyData } from '@/utils/helper';
import dayjs from 'dayjs';
import { visuallyHidden } from '@mui/utils';
import DetailModal from './DetailModal';
import DetailCnb from './detail';
import ConfirmationModal from '../_shared/common/ConfirmationModal';
import EmptyState from '../_shared/common/EmptyState';
import { useTranslation } from 'react-i18next';

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 gap: .5rem;
`;

const headerItems = [
  { id: 'name', label: 'C&B Profile Name', translation: 'cnb_profile_name' },
  { id: 'base', label: 'Base Compensation', translation: 'base_compensation' },
  { id: 'supplementaries', label: 'Supplementary Compensation', translation: 'supplementary_compensation' },
  { id: 'createdAt', label: 'Date Created', translation: 'date_created' },
  { id: 'updatedAt', label: 'Last Updated', translation: 'last_update' },
];

type Order = 'asc' | 'desc'


function EnhancedTable() {
  const dispatch = useAppDispatch();
  const data = useAppSelectors(state => state.compensation.dataTable);
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);
  const companyData = getCompanyData();
  const [detailOpen, setDetailOpen] = useState({ id: 0, open: false });
  const [deleteConfirmation, setDeleteConfirmation] = useState({ id: 0, open: false });
  const { t } = useTranslation();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
  };
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  };
  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    if (compareCheck(headId !== 'base', headId !== 'supplementaries')) {
      const isAsc = compareCheck(sort === headId, direction === 'asc');
      setDirection(ifThenElse(isAsc, 'desc', 'asc'));
      setSort(headId);
    }
  };

  const deleteCnb = (Id: string | number) => {
    dispatch({
      type: deleteCompensationRequested.toString(),
      payload: {
        Id: Id,
        getCnb: {
          page: page,
          itemPerPage: rowsPerPage,
          sort: sort,
          direction: direction.toUpperCase(),
          search: search,
          companyID: companyData?.id
        }
      }
    });
  };

  const handleDeleteOpen = (id) => {
    setDeleteConfirmation({ id: id, open: true });
  };

  const handleDeleteClose = () => {
    setDeleteConfirmation({ id: 0, open: false });
  };

  useEffect(() => {
    dispatch({
      type: getTableRequested.toString(),
      payload: {
        page: page,
        itemPerPage: rowsPerPage,
        sort: sort,
        direction: direction.toUpperCase(),
        search: search,
        companyID: companyData?.id
      }
    });
  }, [rowsPerPage, page, search, sort, direction]);

  useEffect(() => {
    setHaydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }


  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
          <Input
            name='search'
            size='small'
            placeholder='search'
            onKeyDown={(e) => handleSearch(e)}
            type='text'
            InputProps={{
              startAdornment: (
                <Search sx={{ color: '#9CA3AF' }} />
              )
            }}
          />
        </Grid>
      </Grid>
      <Table
        count={data?.itemTotals}
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onRowsPerPagesChange={(e) => handleChangeRowsPerPage(e)}
        headChildren={
          <TableRow>
            {
              headerItems.map((item) => (
                <TableCell key={item.id} sortDirection={ifThenElse(sort === item.id, direction, false)}>
                  <TableSortLabel
                    active={sort === item.id}
                    direction={ifThenElse(sort === item.id, direction, 'asc')}
                    onClick={(e) => handleRequestSort(e, item.id)}
                  >
                    {t(`compensation_and_benefits.table.table_cols_item.${item.translation}`)}
                    {ifThenElse(sort === item.id, (
                      <Box component='span' sx={visuallyHidden}>
                        {ifThenElse(direction === 'asc', 'sorted descending', 'sorted ascending')}
                      </Box>
                    ), null)}
                  </TableSortLabel>
                </TableCell>
              ))
            }
            <TableCell />
          </TableRow>
        }
        bodyChildren={
          <>
            {
              ifThenElse(typeof data?.items !== 'undefined', (
                ifThenElse(data?.items?.length === 0, (
                  <TableRow>
                    <TableCell colSpan={12} align='center'>
                      <EmptyState />
                    </TableCell>
                  </TableRow>
                ), (
                  data?.items?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item?.base?.component.name}</TableCell>
                      <TableCell>
                        {
                          ifThenElse(item?.supplementaries.length === 0, '-',
                            item?.supplementaries.map((supp) => (
                              <p key={supp}>{supp?.component?.name} {ifThenElse(item?.supplementaries.length > 1, ', ', '')}</p>
                            ))
                          )
                        }
                      </TableCell>
                      <TableCell>{dayjs(item.createdAt).format('YYYY-MM-DD H:m:s')}</TableCell>
                      <TableCell>{dayjs(item.updatedAt).format('YYYY-MM-DD H:m:s')}</TableCell>
                      <TableCell>
                        <ButtonWrapper>
                          <IconButton
                            parentColor='primary.50'
                            icons={<Visibility sx={{ color: '#223567' }} />}
                            onClick={() => setDetailOpen({ id: item.id, open: true })}
                          />
                          <IconButton
                            onClick={() => router.push(`/compensation-benefits/update/${item.id}`)}
                            parentColor='primary.50'
                            icons={
                              <HiPencilAlt fontSize={20} color='#223567' />
                            }
                          />
                          <IconButton
                            parentColor='red.100'
                            icons={
                              <BsTrashFill fontSize={20} color='#EF4444' />
                            }
                            onClick={() => handleDeleteOpen(item.id)}
                          />
                        </ButtonWrapper>
                      </TableCell>
                    </TableRow>
                  ))
                ))
              ), (
                <TableRow>
                  <TableCell colSpan={12} align='center'>
                    <EmptyState />
                  </TableCell>
                </TableRow>
              ))
            }
            <ConfirmationModal
              open={deleteConfirmation.open}
              handleClose={handleDeleteClose}
              title={t('compensation_and_benefits.popup.delete.title')}
              content={t('compensation_and_benefits.popup.delete.desc')}
              withCallback
              noChange={true}
              callback={() => deleteCnb(deleteConfirmation.id)}
            />
            <DetailModal
              open={detailOpen.open}
              handleClose={() => setDetailOpen({ id: 0, open: false })}
              title={t('compensation_and_benefits.popup.detail.title')}
              content={
                <DetailCnb id={detailOpen.id} open={detailOpen.open} />
              }
            />
          </>
        }
      />
    </>
  );
}

export default EnhancedTable;