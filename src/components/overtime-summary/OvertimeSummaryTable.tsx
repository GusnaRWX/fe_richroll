import React, { useState, useEffect } from 'react';
import {
  Grid,
  TableCell,
  Avatar,
  TableRow,
  Box,
  TableSortLabel,
  Typography
} from '@mui/material';
import { Input } from '../_shared/form';
import { Search } from '@mui/icons-material';
import Table from '../_shared/form/Table';
import { Image as ImageType } from '@/utils/assetsConstant';
import Image from 'next/image';
import { compareCheck, ifThenElse, getCompanyData } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';
import { IconButton } from '@/components/_shared/form';
import { BsTrashFill } from 'react-icons/bs';
import { HiPencilAlt } from 'react-icons/hi';
import styled from '@emotion/styled';
import OvertimeSummaryEditForm from './OvertimeSummaryEditForm';
import { ConfirmationModal } from '../_shared/common';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getOvertimeRequested, putOvertimeRequested, deleteOvertimeRequested } from '@/store/reducers/slice/attendance-leave/overtimeSlice';
//import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { AttendanceLeave } from '@/types/attendanceLeave';
//import { AiOutlineSwapRight } from 'react-icons/ai';

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 gap: .5rem;
`;

const NameWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 margin: 0;
`;

const EmptyTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
 `;

// const DatePickerWrapper = styled.div`
//  display: flex;
//  flex-direction: row;
//  align-items: center;
//  justify-content: flex-start;
//  border: 1px solid #c5c5c5;
//  padding: .5rem;
//  border-radius: 5px;
//  gap: .5rem;
//  margin: 0;

//  &:hover {
//   cursor: text;
//   border: 1px solid #000000;
//  }

//  & > .react-datepicker-wrapper {
//   width: 130px;
//  }

//  & > .react-datepicker-wrapper > .react-datepicker__input-container > input {
//   border: none;
//   font-size: 14px !important;
//   width: 60%;
//   color: #4B5563;

//   &:focus {
//     outline: none;
//   }
//  }
// `;

const headerItems = [
  { id: 'date', label: 'Date' },
  { id: 'id', label: 'Employee ID' },
  { id: 'name', label: 'Employee Name' },
  { id: 'start', label: 'Start Time' },
  { id: 'duration', label: 'Duration' },
  { id: 'multiplier', label: 'Multiplier' },
  { id: 'action', label: '' }
];

type Order = 'asc' | 'desc'

interface OvertimeTable {
  reload?: boolean;
}

function OvertimeSummaryTable({ reload }: OvertimeTable) {
  const dispatch = useAppDispatch();
  const { data } = useAppSelectors(state => state.overtime);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const companyData = getCompanyData();
  const [hydrated, setHaydrated] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState<AttendanceLeave.OvertimeType>();
  // const [startDate, setStartDate] = useState(new Date('2023/06/01'));
  // const [endDate, setEndDate] = useState(new Date());
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
    // setPage(0);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // setSearch(e.target.value);
      setSearch(e.target.value);

    }
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    const isAsc = compareCheck(sort === headId, direction === 'asc');
    setDirection(ifThenElse(isAsc, 'desc', 'asc'));
    setSort(headId);
  };

  const handleUpdate = (data: AttendanceLeave.putOvertime) => {
    setEditOpen(false);
    dispatch({
      type: putOvertimeRequested.toString(),
      payload: {
        id: selectedItem?.id,
        data: {
          start: dayjs(data.start).toISOString(),
          duration: data.duration,
          multiplier: data.multiplier.toString()
        }
      }
    });
  };

  const handleDelete = () => {
    setDeleteConfirmation(false);
    dispatch({
      type: deleteOvertimeRequested.toString(),
      payload: selectedItem?.id
    });
  };

  useEffect(() => {
    dispatch({
      type: getOvertimeRequested.toString(),
      payload: {
        page: page,
        itemPerPage: rowsPerPage,
        sort: sort,
        direction: direction.toUpperCase(),
        search: search,
        companyID: companyData?.id
      }
    });
  }, [rowsPerPage, page, search, sort, direction, reload,]);
  useEffect(() => {
    setHaydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Input
            name='search'
            size='small'
            placeholder='Search'
            onKeyDown={(e) => handleSearch(e)}
            type='text'
            InputProps={{
              startAdornment: (
                <Search sx={{ color: '#9CA3AF' }} />
              )
            }}
          />
        </Grid>
        <Grid item xs={4}>
          {/* <DatePickerWrapper>
            <Datepicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <AiOutlineSwapRight style={{ marginRight: '20px' }}/>
            <Datepicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </DatePickerWrapper> */}
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
                    <TableCell colSpan={12} align='center'>
                      <EmptyTableWrapper>
                        <Typography>There is no Entry</Typography>
                        <Image
                          src={ImageType.NO_ENTRY}
                          alt='data-not-found'
                          width={400}
                          height={266}
                        />
                      </EmptyTableWrapper>

                    </TableCell>
                  </TableRow>
                ), (
                  data?.items?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{dayjs(item.date).format('DD/MM/YY')}</TableCell>
                      <TableCell>{item.employee.employeeID}</TableCell>
                      <TableCell>
                        <NameWrapper>
                          <Avatar
                            src={item.employee.picture}
                            alt={item.employee.name}
                            sx={{
                              width: 24, height: 24
                            }}
                          />
                          &nbsp;{item.employee.name}
                        </NameWrapper>
                      </TableCell>
                      <TableCell>{dayjs(item.start).format('HH:mm')}</TableCell>
                      <TableCell>{item.duration} Hour(s)</TableCell>
                      <TableCell>{item.multiplier}x</TableCell>
                      <TableCell>
                        <ButtonWrapper>
                          <IconButton
                            parentColor='#E9EFFF'
                            icons={
                              <HiPencilAlt fontSize={20} color='#223567' />
                            }
                            onClick={() => {
                              setSelectedItem(item);
                              setEditOpen(true);
                            }}
                          />
                          <IconButton
                            parentColor='#FEE2E2'
                            onClick={() => {
                              setSelectedItem(item);
                              setDeleteConfirmation(true);
                            }}
                            icons={
                              <BsTrashFill fontSize={20} color='#EF4444' />
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
      <OvertimeSummaryEditForm
        editOpen={editOpen}
        callback={(data) => handleUpdate(data)}
        handleEditClose={() => setEditOpen(false)}
        item={selectedItem}
      />
      <ConfirmationModal
        open={deleteConfirmation}
        handleClose={() => setDeleteConfirmation(false)}
        title='Delete Data Entry'
        content='You are about to delete this overtime data entry. This action cannot be undone.'
        withCallback
        noChange={true}
        type='delete'
        callback={() => handleDelete()}
      />
    </>
  );
}

export default OvertimeSummaryTable;