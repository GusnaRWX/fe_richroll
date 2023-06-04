import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  Collapse,
  TableCell,
  TableRow,
  Avatar,
  Box,
  TableSortLabel,
  Button as MuiButton,
  Typography
} from '@mui/material';
import { Input, IconButton, Select } from '@/components/_shared/form';
import { SimpleAccordion } from '@/components/_shared/common';
import { Add } from '@mui/icons-material';
import { Image as ImageType } from '@/utils/assetsConstant';
import Table from '@/components/_shared/form/Table';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import styled from '@emotion/styled';
import { compareCheck, ifThenElse } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';

const ContentWrapper = styled(Card)(({
  padding: '1rem',
  marginBottom: '1rem'
}));

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

const headerItems = [
  { id: 'user.name', label: 'Full Name' },
  { id: 'attendance', label: 'Base Compensation' },
  { id: 'absent', label: 'Supplementary Compensation' },
  { id: 'paidLeave', label: 'Ad Hoc Compensation' },
  { id: 'unpaidLeave', label: 'Gross Compensation' },
  { id: 'action', label: '' },
];

type Order = 'asc' | 'desc'

const data = {
  items: [
    {
      id: 1,
      name: 'Budi Irawan',
      attendance: 'Rp 5.000.000,00',
      absent: 'Rp 2.500.000,00',
      paidLeave: 'Rp 2.000.000,00',
      unpaidLeave: 'Rp 9.500.000,00',
    },
    {
      id: 2,
      name: 'Budi Irawan',
      attendance: 'Rp 5.000.000,00',
      absent: 'Rp 2.500.000,00',
      paidLeave: 'Rp 2.000.000,00',
      unpaidLeave: 'Rp 9.500.000,00',
    },
    {
      id: 3,
      name: 'Budi Irawan',
      attendance: 'Rp 5.000.000,00',
      absent: 'Rp 2.500.000,00',
      paidLeave: 'Rp 2.000.000,00',
      unpaidLeave: 'Rp 9.500.000,00',
    },
    {
      id: 4,
      name: 'Budi Irawan',
      attendance: 'Rp 5.000.000,00',
      absent: 'Rp 2.500.000,00',
      paidLeave: 'Rp 2.000.000,00',
      unpaidLeave: 'Rp 9.500.000,00',
    },
    {
      id: 5,
      name: 'Budi Irawan',
      attendance: 'Rp 5.000.000,00',
      absent: 'Rp 2.500.000,00',
      paidLeave: 'Rp 2.000.000,00',
      unpaidLeave: 'Rp 9.500.000,00',
    },
  ],
  itemTotals: 5
};

function Row (row) {
  const { item } = row;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, boxShadow: open ? '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)' : 'none' }}>
        <TableCell>
          <NameWrapper>
            <Avatar
              src={ImageType.AVATAR_PLACEHOLDER}
              alt={item.name}
              sx={{
                width: 24, height: 24
              }}
            />
            &nbsp;{item.name}
          </NameWrapper>
        </TableCell>
        <TableCell>{item.attendance}</TableCell>
        <TableCell>{item.absent}</TableCell>
        <TableCell>{item.paidLeave}</TableCell>
        <TableCell>{item.unpaidLeave}</TableCell>
        <TableCell>
          <ButtonWrapper>
            <IconButton
              onClick={() => { setOpen(!open); }}
              icons={
                open ?
                  <HiChevronUp fontSize={20} color='#223567'/> :
                  <HiChevronDown fontSize={20} color='#223567'/>
              }
            />
          </ButtonWrapper>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' sx={{ mt: '1rem', mb: '1rem' }} unmountOnExit>
            <Typography component='div' variant='text-sm' fontWeight='bold' color='#4B5563' sx={{ mb: '1rem' }}>Gross Calculation Payroll</Typography>
            <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '1rem', mb: '1rem' }}>Base</Typography>
            <Grid container spacing={2}>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  placeholder='Sort by Status'
                  customLabel='Compensation Component'
                  value={''}
                  options={[
                    {value: '', label: 'All Status'},
                    {value: 'active', label: 'Active'},
                    {value: 'inactive', label: 'Inactive'},
                    {value: 'draft', label: 'Draft'},
                  ]}
                />
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <Input
                  name='search'
                  size='small'
                  placeholder='Input amount'
                  onKeyDown={(e) => console.log(e)}
                  type='text'
                  customLabel='Amount'
                  InputProps={{
                    startAdornment: ('Rp'),
                    endAdornment: ('IDR')
                  }}

                />
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Ad Hoc Compensation</Typography>
                <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 2.000.000</Typography>
              </Grid>
            </Grid>
            <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '1rem', mb: '1rem' }}>Overtime Hours</Typography>
            <MuiButton
              variant='contained'
              size='small'
              color='secondary'
              sx={{ color: '#FFF' }}
              onClick={() => { console.log(true); }}
            ><Add fontSize='small' />&nbsp; Add Overtime Hours</MuiButton>
            <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '1rem', mb: '1rem' }}>Supplementary</Typography>
            <MuiButton
              variant='contained'
              size='small'
              color='secondary'
              sx={{ color: '#FFF' }}
              onClick={() => { console.log(true); }}
            ><Add fontSize='small' />&nbsp; Add Supplementaryc Compensation</MuiButton>
            <Typography component='div' variant='text-base' fontWeight='bold' color='primary.main' sx={{ mt: '1rem', mb: '1rem' }}>Ad Hoc</Typography>
            <MuiButton
              variant='contained'
              size='small'
              color='secondary'
              sx={{ color: '#FFF' }}
              onClick={() => { console.log(true); }}
            ><Add fontSize='small' />&nbsp; Add Ad Hoc</MuiButton>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function GrossContent() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);

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
    setHaydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return (
    <>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <SimpleAccordion title='Operational Department'>
            <ContentWrapper>
              <Grid container spacing={2}>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Base Compensation</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 10.000.000</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Supplementary Compensation</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 5.000.000</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Ad Hoc Compensation</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 2.000.000</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Gross Payroll</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 17.000.000</Typography>
                </Grid>
              </Grid>
            </ContentWrapper>

            <Table
              count={data?.itemTotals}
              rowsPerPageOptions={[5, 10, 15]}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onRowsPerPagesChange={(e) =>handleChangeRowsPerPage(e)}
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
                          <Row key={index} item={item} />
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
          </SimpleAccordion>
        </Box>
      </ContentWrapper>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <SimpleAccordion title='Delivery Department'>
            <ContentWrapper>
              <Grid container spacing={2}>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Base Compensation</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 10.000.000</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Supplementary Compensation</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 5.000.000</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Ad Hoc Compensation</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 2.000.000</Typography>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Gross Payroll</Typography>
                  <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 17.000.000</Typography>
                </Grid>
              </Grid>
            </ContentWrapper>

            <Table
              count={data?.itemTotals}
              rowsPerPageOptions={[5, 10, 15]}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onRowsPerPagesChange={(e) =>handleChangeRowsPerPage(e)}
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
                          <Row key={index} item={item} />
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
          </SimpleAccordion>
        </Box>
      </ContentWrapper>
    </>
  );
}

export default GrossContent;