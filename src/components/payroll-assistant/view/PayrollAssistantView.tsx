import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Grid,
  TableCell,
  TableRow,
  Avatar,
  Box,
  TableSortLabel,
  Button as MuiButton
} from '@mui/material';
// import { styled as muiStyled } from '@mui/material/styles';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Table from '@/components/_shared/form/Table';
import { IconButton } from '@/components/_shared/form';
import { visuallyHidden } from '@mui/utils';
import { SimpleAccordion } from '@/components/_shared/common';
import { FiFile, FiDownload } from 'react-icons/fi';
import { BsFillEyeFill } from 'react-icons/bs';
import { ifThenElse, compareCheck } from '@/utils/helper';
import { Image as ImageType } from '@/utils/assetsConstant';

const ButtonWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '.1rem'
}));

const ContentWrapper = styled(Card)(({
  padding: '1rem',
  borderRadius: '0px',
  marginBottom: '1rem'
}));

const NameWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 margin: 0;
`;

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

function PayrollAssistantCreate() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);
  const router = useRouter();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
    // setPage(0);
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
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='h6' color='#4B5563'><b>Disbursment Receipt</b></Typography>
          <Typography variant='text-base' color='#4B5563'><b>Payroll 280123 — </b>1/03/2023 - 14/03/2023</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='outlined'
              size='small'
              color='primary'
            >Download Report</MuiButton>
            <MuiButton
              variant='contained'
              size='small'
              color='primary'
              onClick={() => { router.push('/payroll-disbursement/payroll-assistant'); }}
            >Close</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>

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
                <Grid item xs={6}>
                  <MuiButton
                    variant='contained'
                    color='inherit'
                    sx={{ color: '#111827' }}
                    onClick={() => { console.log(true); }}
                  >
                    Bank Transfer_Payroll 2023.pdf &nbsp;<FiFile />&nbsp; 5MB &nbsp;<FiDownload />
                  </MuiButton>
                </Grid>
                <Grid item xs={6}>
                  <ButtonWrapper>
                    <MuiButton
                      variant='outlined'
                      color='inherit'
                      sx={{ color: '#111827' }}
                      onClick={() => { console.log(true); }}
                    >
                      Bank Transfer_Receipt 2023.pdf &nbsp;<FiFile />&nbsp; 5MB &nbsp;<FiDownload />
                    </MuiButton>
                    <Box sx={{ background: '#C6E7DB', borderRadius: '6px', p: '.4rem 1rem' }}>
                      <Typography variant='text-sm' fontWeight='500' color='#1F2937'>Paid</Typography>
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
                            <TableCell>{item.nonTax}</TableCell>
                            <TableCell>
                              <ButtonWrapper>
                                <IconButton
                                  parentColor='#E9EFFF'
                                  icons={
                                    <BsFillEyeFill fontSize={20} color='#223567' />
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
          </SimpleAccordion>
        </Box>
      </ContentWrapper>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <SimpleAccordion
            title={<>Paymet Method : Cash <Box component='span' sx={{ fontSize: '14px', fontWeight: '400' }}>(3 employees)</Box></>}
            footer={
              <Grid container spacing={2} mt='.1rem'>
                <Grid item xs={6}>
                  <MuiButton
                    variant='contained'
                    color='inherit'
                    sx={{ color: '#111827' }}
                    onClick={() => { console.log(true); }}
                  >
                    Receipt Form_Payroll 2023.pdf &nbsp;<FiFile />&nbsp; 5MB &nbsp;<FiDownload />
                  </MuiButton>
                </Grid>
                <Grid item xs={6}>
                  <ButtonWrapper>
                    <MuiButton
                      variant='outlined'
                      color='inherit'
                      sx={{ color: '#111827' }}
                      onClick={() => { console.log(true); }}
                    >
                      Receipt Form_Payroll 2023.pdf &nbsp;<FiFile />&nbsp; 5MB &nbsp;<FiDownload />
                    </MuiButton>
                    <Box sx={{ background: '#C6E7DB', borderRadius: '6px', p: '.4rem 1rem' }}>
                      <Typography variant='text-sm' fontWeight='500' color='#1F2937'>Paid</Typography>
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
                            <TableCell>{item.nonTax}</TableCell>
                            <TableCell>
                              <ButtonWrapper>
                                <IconButton
                                  parentColor='#E9EFFF'
                                  icons={
                                    <BsFillEyeFill fontSize={20} color='#223567' />
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
          </SimpleAccordion>
        </Box>
      </ContentWrapper>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <SimpleAccordion
            title={<>Paymet Method : Cheque <Box component='span' sx={{ fontSize: '14px', fontWeight: '400' }}>(3 employees)</Box></>}
            footer={
              <Grid container spacing={2} mt='.1rem'>
                <Grid item xs={6}>
                  <MuiButton
                    variant='contained'
                    color='inherit'
                    sx={{ color: '#111827' }}
                    onClick={() => { console.log(true); }}
                  >
                    Cheque_Payroll 2023.pdf &nbsp;<FiFile />&nbsp; 5MB &nbsp;<FiDownload />
                  </MuiButton>
                </Grid>
                <Grid item xs={6}>
                  <ButtonWrapper>
                    <MuiButton
                      variant='outlined'
                      color='inherit'
                      sx={{ color: '#111827' }}
                      onClick={() => { console.log(true); }}
                    >
                      Cheque_Receipt 2023.pdf &nbsp;<FiFile />&nbsp; 5MB &nbsp;<FiDownload />
                    </MuiButton>
                    <Box sx={{ background: '#C6E7DB', borderRadius: '6px', p: '.4rem 1rem' }}>
                      <Typography variant='text-sm' fontWeight='500' color='#1F2937'>Paid</Typography>
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
                            <TableCell>{item.nonTax}</TableCell>
                            <TableCell>
                              <ButtonWrapper>
                                <IconButton
                                  parentColor='#E9EFFF'
                                  icons={
                                    <BsFillEyeFill fontSize={20} color='#223567' />
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
          </SimpleAccordion>
        </Box>
      </ContentWrapper>
    </>
  );
}

export default PayrollAssistantCreate;