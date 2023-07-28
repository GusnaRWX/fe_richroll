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
import { SimpleAccordion, Text } from '@/components/_shared/common';
import Table from '@/components/_shared/form/Table';
import styled from '@emotion/styled';
import { compareCheck, ifThenElse } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';
import CompleteRow from './CompleteRow';
import { FiFile, FiDownload } from 'react-icons/fi';
import { HiFolderOpen } from 'react-icons/hi';
import EmptyState from '@/components/_shared/common/EmptyState';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getPayrollDisbursementIdRequested, postPayrollDisbursementPaidRequested } from '@/store/reducers/slice/payroll/payrollSlice';
import { numberFormat } from '@/utils/format';
import { Payroll } from '@/types/payroll';
import { useFormik } from 'formik';
import { AiOutlineFile, AiOutlineClose } from 'react-icons/ai';

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

const HasFileCss = {
  borderRadius: '8px',
  gap: '8px',
  backgroundColor: 'white',
  padding: '8px 8px',
  border: '1px solid'
};

const IOSSwitch = MuiStyled((props: SwitchProps) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme, disabled }) => ({
  cursor: ifThenElse(disabled, 'not-allowed', 'default'),
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
        backgroundColor: ifThenElse(theme.palette.mode === 'dark', '#2ECA45', '#223567'),
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
      color: ifThenElse(theme.palette.mode === 'light', theme.palette.grey[100], theme.palette.grey[600]),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: ifThenElse(theme.palette.mode === 'light', 0.7, 0.3),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: ifThenElse(theme.palette.mode === 'light', '#E9E9EA', '#39393D'),
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

function CompleteContent(att) {
  const {isAssist} = att;
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const disbursementData = useAppSelectors(state => state.payroll.disbursementData as Payroll.DisbursementData);
  const { disbursementId } = useAppSelectors(state => state.payroll);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const formik = useFormik({
    initialValues: {
      file: null
    },
    onSubmit: (_val) => {
      console.log(_val);
    }
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    const isAsc = compareCheck(sort === headId, direction === 'asc');
    setDirection(ifThenElse(isAsc, 'desc', 'asc'));
    setSort(headId);
  };

  const handleChangePaid = (e: React.ChangeEvent<HTMLInputElement>, disbursementEmployeeId: string) => {
    const { checked } = e.target;
    if (compareCheck(checked, !isAssist)) {
      dispatch({
        type: postPayrollDisbursementPaidRequested.toString(),
        payload: {
          id: router.query.id,
          body: {
            disbursementIDs: [disbursementEmployeeId]
          }
        }
      });
    }
    if (compareCheck(checked, isAssist)) {
      dispatch({
        type: postPayrollDisbursementPaidRequested.toString(),
        payload: {
          id: disbursementId,
          body: {
            disbursementIDs: [disbursementEmployeeId]
          }
        }
      });
    }
  };

  useEffect(() => {
    setHaydrated(true);
  }, []);

  useEffect(() => {
    if (compareCheck(router.isReady, isAssist, disbursementId !== '')) {
      dispatch({
        type: getPayrollDisbursementIdRequested.toString(),
        payload: {
          id: disbursementId
        }
      });
    }
    if (compareCheck(router.isReady, !isAssist)) {
      dispatch({
        type: getPayrollDisbursementIdRequested.toString(),
        payload: {
          id: router.query.id
        }
      });
    }
  }, [router, disbursementId]);

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
            <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp {numberFormat(disbursementData?.net)}</Typography>
          </Grid>
          <Grid item xs={2.4}>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Income Tax</Typography>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp {numberFormat(disbursementData?.incomeTax)}</Typography>
          </Grid>
          <Grid item xs={2.4}>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Satutory Benefits</Typography>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp {numberFormat(disbursementData?.statutory)}</Typography>
          </Grid>
          <Grid item xs={2.4}>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Contribution</Typography>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp {numberFormat(disbursementData?.contribution)}</Typography>
          </Grid>
          <Grid item xs={2.4}>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#6B7280' sx={{ mb: '1rem' }}>Total Disbursement</Typography>
            <Typography component='div' variant='text-sm' fontWeight='500' color='#1F2937'>Rp {numberFormat(disbursementData?.disbursement)}</Typography>
          </Grid>
        </Grid>
      </ContentWrapper>
      {disbursementData?.disbursements?.length > 0 && disbursementData?.disbursements?.map((value) => (
        <ContentWrapper key={value.receiptFile}>
          <Box sx={{ width: '100%' }}>
            <SimpleAccordion
              title={<>Payment Method : {value?.method?.name} <Box component='span' sx={{ fontSize: '14px', fontWeight: '400' }}>{`(${value?.items?.length} employees)`}</Box></>}
              footer={
                <Grid container spacing={2} mt='.1rem' justifyContent='space-between'>
                  <Grid item xs={formik.values.file === null ? 8 : 6}>
                    <MuiButton
                      variant='contained'
                      color='inherit'
                      sx={{ color: '#111827' }}
                      onClick={() => { console.log(true); }}
                    >
                      {value?.attachment?.filename} &nbsp;<FiFile />&nbsp; {value?.attachment?.size} &nbsp;<FiDownload />
                    </MuiButton>
                  </Grid>
                  <Grid item xs={ifThenElse(formik.values.file === null, 4, 5)}>
                    <ButtonWrapper>
                      <div>
                        {ifThenElse(formik.values.file === null, (
                          <>
                            <input
                              id='input-file'
                              onChange={(e) => {
                                formik.setFieldValue('file', e.target.files && e.target.files[0]);
                              }}
                              type='file'
                              style={{ display: 'none' }}
                              accept='application/pdf'
                            />
                            <label htmlFor='input-file'>
                              <MuiButton
                                variant='contained'
                                color='secondary'
                                sx={{ color: 'white' }}
                                component='span'
                              >
                                <HiFolderOpen />&nbsp; Upload Receipt
                              </MuiButton>
                            </label>
                          </>
                        ), (
                          <Grid container sx={HasFileCss} alignItems='center'>
                            <Grid item>
                              <Text
                                title={ifThenElse(formik?.values?.file, (formik?.values?.file as unknown as { name: string })?.name, '')}
                                fontSize='12px'
                                fontWeight={400}
                              />
                            </Grid>
                            <Grid item>
                              <AiOutlineFile fontSize='12px' />
                            </Grid>
                            <Grid item>
                              <Text
                                title={ifThenElse(formik.values.file,
                                  `${((formik.values.file as unknown as { size: number })?.size / (1024 * 1024)).toFixed(2)} MB`,
                                  '0.00 MB'
                                )}
                                fontSize='12px'
                                fontWeight={400}
                              />
                            </Grid>
                            <Grid item>
                              <AiOutlineClose fontSize='12px' cursor='pointer' onClick={() => { formik.setFieldValue('file', null); }} />
                            </Grid>
                          </Grid>
                        ))}
                      </div>
                      <Box sx={{ background: '#F3F4F6', borderRadius: '6px', p: '.4rem 1rem' }}>
                        <Typography variant='text-sm' fontWeight='500' color='#374151'>Status</Typography>
                        <IOSSwitch sx={{ mx: 1 }} disabled={value?.isPaid} onChange={(e) => { handleChangePaid(e, value?.id); }} checked={value?.isPaid} />
                        <Typography variant='text-sm' fontWeight='500' color='#374151'>Unpaid</Typography>
                      </Box>
                    </ButtonWrapper>
                  </Grid>
                </Grid>
              }
            >
              <Table
                count={value?.items?.length}
                rowsPerPageOptions={[5, 10, 15]}
                rowsPerPage={rowsPerPage}
                page={page}
                withPaginate={false}
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
                            {item.label}
                            {ifThenElse(sort === item.id, (
                              <Box component='span' sx={visuallyHidden}>
                                {ifThenElse(direction === 'asc', 'sorted descending', 'sorted ascending')}
                              </Box>
                            ), null)}
                          </TableSortLabel>
                        </TableCell>
                      ))
                    }
                  </TableRow>
                }
                bodyChildren={
                  <>
                    {
                      ifThenElse(typeof value?.items !== 'undefined', (
                        ifThenElse(value?.items?.length === 0, (
                          <TableRow>
                            <TableCell colSpan={12} align='center'>
                              <EmptyState />
                            </TableCell>
                          </TableRow>
                        ), (
                          value?.items?.map((item) => (
                            <CompleteRow key={item.contribution} item={item} />
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
                  </>
                }
              />
            </SimpleAccordion>
          </Box>
        </ContentWrapper>
      ))}
    </>
  );
}

export default CompleteContent;