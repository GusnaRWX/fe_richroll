import React, { useState, useEffect } from 'react';
import {
  Grid,
  TableCell,
  TableRow,
  Box,
  TableSortLabel,
  Typography
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
import { compareCheck, ifThenElse } from '@/utils/helper';
import dayjs from 'dayjs';
import { visuallyHidden } from '@mui/utils';
import DetailModal from './modal';
import DetailCnb from './detail';
import ConfirmationModal from '../_shared/common/ConfirmationModal';

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 gap: .5rem;
`;

const headerItems = [
  { id: 'name', label: 'CnB Profile Name' },
  { id: 'base', label: 'Base Compensation' },
  { id: 'supplementaries', label: 'Supplementary Compensation' },
  { id: 'createdAt', label: 'Date Created' },
  { id: 'updatedAt', label: 'Last Updated' },
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
  const [detailOpen, setDetailOpen] = useState({ id: 0, open: false });
  const [deleteConfirmation, setDeleteConfirmation] = useState({ id: 0, open: false });
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
    // setPage(0);
  };
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  };
  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    if (headId !== 'base' && headId !== 'supplementaries') {
      const isAsc = compareCheck(sort === headId, direction === 'asc');
      setDirection(ifThenElse(isAsc, 'desc', 'asc'));
      setSort(headId);
    }
  };

  const deleteCnb = (Id: string | number) => {
    dispatch({
      type: deleteCompensationRequested.toString(),
      Id: Id
    });
    router.reload();
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
        search: search
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
                    direction={sort === item.id ? direction : 'asc'}
                    onClick={(e) => handleRequestSort(e, item.id)}
                  >
                    {item.label}
                    {sort === item.id ? (
                      <Box component='span' sx={visuallyHidden}>
                        {ifThenElse(direction === 'asc', 'sorted descending', 'sorted ascending')}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))
            }
          </TableRow>
        }
        bodyChildren={
          <>
            {
              ifThenElse(typeof data?.items !== 'undefined', (
                ifThenElse(data?.items?.length === 0, (
                  <TableRow>
                    <TableCell colSpan={12} align='center'><Typography>Data not found</Typography></TableCell>
                  </TableRow>
                ), (
                  data?.items?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item?.base?.component.name}</TableCell>
                      <TableCell>
                        {
                          item?.supplementaries.length === 0 ? '-' :
                            item?.supplementaries.map((supp) => (
                              <p key={supp}>{supp?.component?.name} {item?.supplementaries.length > 1 ? ', ' : ''}</p>
                            ))
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
                  <TableCell colSpan={12} align='center'><Typography>Data not found</Typography></TableCell>
                </TableRow>
              ))
            }
            <ConfirmationModal
              open={deleteConfirmation.open}
              handleClose={handleDeleteClose}
              title='Are you sure you want to delete this record?'
              content='Any unsaved changes will be discarded. This cannot be undone'
              withCallback
              noChange={true}
              callback={() => deleteCnb(deleteConfirmation.id)}
            />
            <DetailModal
              open={detailOpen.open}
              handleClose={() => setDetailOpen({ id: 0, open: false })}
              title='CnB Profile Detail'
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