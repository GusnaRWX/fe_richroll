import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  TableCell,
  TableRow,
  Box,
  TableSortLabel,
  Typography,
  Button as MuiButton,
  Switch
} from '@mui/material';
import { SwitchProps } from '@mui/material/Switch';
import { styled as MuiStyled } from '@mui/material/styles';
import { SimpleAccordion } from '@/components/_shared/common';
import Table from '@/components/_shared/form/Table';
import styled from '@emotion/styled';
import { compareCheck, ifThenElse } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';
import CompleteRow from './CompleteRow';
import { FiFile, FiDownload } from 'react-icons/fi';
import { HiFolderOpen } from 'react-icons/hi';

const ButtonWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
}));

const ContentWrapper = styled(Card)(({
  padding: '1rem',
  marginBottom: '1rem'
}));

const IOSSwitch = MuiStyled((props: SwitchProps) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const headerItems = [
  { id: 'user.name', label: 'Employee Name' },
  { id: 'attendance', label: 'Net Income' },
  { id: 'absent', label: 'Income Tax' },
  { id: 'paidLeave', label: 'Satutory Benefits' },
  { id: 'unpaidLeave', label: 'Contribution' },
  { id: 'nonTax', label: 'Disbursement' },
  { id: 'action', label: '' },
];

type Order = 'asc' | 'desc'

const data = {
  items: [
    {
      id: 1,
      name: 'Budi Irawan',
      attendance: 'Rp 9.500.000,00',
      absent: 'Rp 524.000,00',
      paidLeave: 'Rp 237.000,00',
      unpaidLeave: 'Rp 0,00',
      nonTax: 'Rp 9.936.000,00',
    },
    {
      id: 2,
      name: 'Budi Irawan',
      attendance: 'Rp 9.500.000,00',
      absent: 'Rp 524.000,00',
      paidLeave: 'Rp 237.000,00',
      unpaidLeave: 'Rp 0,00',
      nonTax: 'Rp 9.936.000,00',
    },
    {
      id: 3,
      name: 'Budi Irawan',
      attendance: 'Rp 9.500.000,00',
      absent: 'Rp 524.000,00',
      paidLeave: 'Rp 237.000,00',
      unpaidLeave: 'Rp 0,00',
      nonTax: 'Rp 9.936.000,00',
    },
    {
      id: 4,
      name: 'Budi Irawan',
      attendance: 'Rp 9.500.000,00',
      absent: 'Rp 524.000,00',
      paidLeave: 'Rp 237.000,00',
      unpaidLeave: 'Rp 0,00',
      nonTax: 'Rp 9.936.000,00',
    },
    {
      id: 5,
      name: 'Budi Irawan',
      attendance: 'Rp 9.500.000,00',
      absent: 'Rp 524.000,00',
      paidLeave: 'Rp 237.000,00',
      unpaidLeave: 'Rp 0,00',
      nonTax: 'Rp 9.936.000,00',
    },
  ],
  itemTotals: 5
};

function CompleteContent() {
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
      <ContentWrapper sx={{ mt: '1rem' }}>
        <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937' sx={{ mb: '1rem' }}>Total Disbursement</Typography>

        <Grid container spacing={2}>
          <Grid item xs={2.4}>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Net Income</Typography>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 100.000.000</Typography>
          </Grid>
          <Grid item xs={2.4}>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Income Tax</Typography>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 1.000</Typography>
          </Grid>
          <Grid item xs={2.4}>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Satutory Benefits</Typography>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 580</Typography>
          </Grid>
          <Grid item xs={2.4}>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Contribution</Typography>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp 200</Typography>
          </Grid>
          <Grid item xs={2.4}>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Disbursement</Typography>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp -200</Typography>
          </Grid>
        </Grid>
      </ContentWrapper>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <SimpleAccordion
            title={<>Payment Method : Bank Transfer <Box component='span' sx={{ fontSize: '14px', fontWeight: '400' }}>(3 employees)</Box></>}
            footer={
              <Grid container spacing={2} mt='.1rem'>
                <Grid item xs={8}>
                  <MuiButton
                    variant='contained'
                    color='inherit'
                    sx={{ color: '#111827' }}
                    onClick={() => { console.log(true); }}
                  >
                    Bank Transfer_Payroll 2023.pdf &nbsp;<FiFile />&nbsp; 5MB &nbsp;<FiDownload />
                  </MuiButton>
                </Grid>
                <Grid item xs={4}>
                  <ButtonWrapper>
                    <MuiButton
                      variant='contained'
                      color='secondary'
                      sx={{ color: 'white' }}
                      onClick={() => { console.log(true); }}
                    >
                      <HiFolderOpen />&nbsp; Upload Receipt
                    </MuiButton>
                    <Box sx={{ background: '#F3F4F6', borderRadius: '6px', p: '.4rem 1rem' }}>
                      <Typography variant='text-sm' fontWeight='500' color='#374151'>Status</Typography>
                      <IOSSwitch sx={{ mx: 1 }} />
                      <Typography variant='text-sm' fontWeight='500' color='#374151'>Unpaid</Typography>
                    </Box>
                  </ButtonWrapper>
                </Grid>
              </Grid>
            }
          >
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
                          <CompleteRow key={index} item={item} />
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
          <SimpleAccordion
            title={<>Payment Method : Cash <Box component='span' sx={{ fontSize: '14px', fontWeight: '400' }}>(3 employees)</Box></>}
            footer={
              <Grid container spacing={2} mt='.1rem'>
                <Grid item xs={8}>
                  <MuiButton
                    variant='contained'
                    color='inherit'
                    sx={{ color: '#111827' }}
                    onClick={() => { console.log(true); }}
                  >
                    Receipt Form_Payroll 2023.pdf &nbsp;<FiFile />&nbsp; 5MB &nbsp;<FiDownload />
                  </MuiButton>
                </Grid>
                <Grid item xs={4}>
                  <ButtonWrapper>
                    <MuiButton
                      variant='contained'
                      color='secondary'
                      sx={{ color: 'white' }}
                      onClick={() => { console.log(true); }}
                    >
                      <HiFolderOpen />&nbsp; Upload Receipt
                    </MuiButton>
                    <Box sx={{ background: '#F3F4F6', borderRadius: '6px', p: '.4rem 1rem' }}>
                      <Typography variant='text-sm' fontWeight='500' color='#374151'>Status</Typography>
                      <IOSSwitch sx={{ mx: 1 }} />
                      <Typography variant='text-sm' fontWeight='500' color='#374151'>Unpaid</Typography>
                    </Box>
                  </ButtonWrapper>
                </Grid>
              </Grid>
            }
          >
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
                          <CompleteRow key={index} item={item} />
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
          <SimpleAccordion
            title={<>Payment Method : Cheque <Box component='span' sx={{ fontSize: '14px', fontWeight: '400' }}>(3 employees)</Box></>}
            footer={
              <Grid container spacing={2} mt='.1rem'>
                <Grid item xs={8}>
                  <MuiButton
                    variant='contained'
                    color='inherit'
                    sx={{ color: '#111827' }}
                    onClick={() => { console.log(true); }}
                  >
                    Cheque Form_Payroll 2023.pdf &nbsp;<FiFile />&nbsp; 5MB &nbsp;<FiDownload />
                  </MuiButton>
                </Grid>
                <Grid item xs={4}>
                  <ButtonWrapper>
                    <MuiButton
                      variant='contained'
                      color='secondary'
                      sx={{ color: 'white' }}
                      onClick={() => { console.log(true); }}
                    >
                      <HiFolderOpen />&nbsp; Upload Receipt
                    </MuiButton>
                    <Box sx={{ background: '#F3F4F6', borderRadius: '6px', p: '.4rem 1rem' }}>
                      <Typography variant='text-sm' fontWeight='500' color='#374151'>Status</Typography>
                      <IOSSwitch sx={{ mx: 1 }} />
                      <Typography variant='text-sm' fontWeight='500' color='#374151'>Unpaid</Typography>
                    </Box>
                  </ButtonWrapper>
                </Grid>
              </Grid>
            }
          >
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
                          <CompleteRow key={index} item={item} />
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

export default CompleteContent;