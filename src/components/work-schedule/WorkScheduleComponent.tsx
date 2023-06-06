import React, { useState, useEffect } from 'react';
import  styled  from '@emotion/styled';
import { Typography, Button as MuiButton, Card, Box, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { Add } from '@mui/icons-material';
import Table from '../_shared/form/Table';
import { IconButton } from '../_shared/form';
import { HiPencilAlt } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getCompanyData, compareCheck, ifThenElse } from '@/utils/helper';
import { getListWorkScheduleRequested } from '@/store/reducers/slice/company-management/work-schedule/workScheduleSlice';
import { visuallyHidden } from '@mui/utils';
import dayjs from 'dayjs';

const TopWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 width: 100%;
 margin-bottom: 1rem;
`;

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 gap: .5rem;
`;

const headerItems = [
  { id: 'name', label: 'Profile Name' },
  { id: 'grossHours', label: 'Weekly Gross (hours)' },
  { id: 'netHours', label: 'Weekly Net (hours)' },
  { id: 'createdAt', label: 'Date Created' },
  { id: 'updatedAt', label: 'Last Updated' }
];

type Order = 'asc' | 'desc'

function WorkScheduleComponent() {
  const router = useRouter();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);
  const companyData = getCompanyData();
  const dispatch = useAppDispatch();
  const data = useAppSelectors(state => state.workSchedule.data);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 0));
    setPage(0);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    const isAsc = compareCheck(sort === headId, direction === 'asc');
    setDirection(ifThenElse(isAsc, 'desc', 'asc'));
    setSort(headId);
  };

  useEffect(() => {
    dispatch({
      type: getListWorkScheduleRequested.toString(),
      payload: {
        page: page + 1,
        itemPerPage: rowsPerPage,
        sort: sort,
        direction: direction.toUpperCase(),
        search: '',
        companyID: companyData?.id
      }
    });
  }, [rowsPerPage, page, sort, direction]);

  useEffect(() => {
    setHaydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <>
      <TopWrapper>
        <Typography fontWeight='bold' variant='h5' color='primary'>Work Schedule</Typography>
        <MuiButton variant='contained' onClick={() => { router.push('/company-management/work-schedule/create'); }} size='small'><Add />&nbsp; Add Work Schedule</MuiButton>
      </TopWrapper>
      <Card sx={{ padding: '1rem' }}>
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
                      ): null}
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
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.grossHours}&nbsp;Hours</TableCell>
                        <TableCell>{item.netHours}&nbsp;Hours</TableCell>
                        <TableCell>{dayjs(item.createdAt).format('YYYY-MM-DD H:m:s')}</TableCell>
                        <TableCell>{dayjs(item.updatedAt).format('YYYY-MM-DD H:m:s')}</TableCell>
                        <TableCell>
                          <ButtonWrapper>
                            <IconButton
                              parentColor='primary.50'
                              icons={
                                <HiPencilAlt fontSize={20} color='#223567'/>
                              }
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
            </>
          }
        />
      </Card>
    </>
  );
}

export default WorkScheduleComponent;