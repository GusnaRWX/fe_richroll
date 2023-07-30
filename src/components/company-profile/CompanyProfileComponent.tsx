import { Typography, Card, Grid, Box, Button as MuiButton, Tab, Tabs } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Image as ImageType } from '@/utils/assetsConstant';
import { styled } from '@mui/material/styles';
import { Edit } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getCompanyDetailRequested } from '@/store/reducers/slice/company/companySlice';
import { getCompanyData, ifEmptyReplace, getPeriod, ifThenElse } from '@/utils/helper';

const ButtonWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '.1rem'
}));

const ContentWrapper = styled(Card)(({
  padding: '1rem'
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {
        value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )
      }
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function CompanyProfileComponent() {
  const dispatch = useAppDispatch();
  const data = useAppSelectors(state => state.company.detail);
  const companyPayments = useAppSelectors(state => state.company.companyPayment);
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const companyData = getCompanyData();

  useEffect(() => {
    dispatch({
      type: getCompanyDetailRequested.toString(),
      payload: {
        id: companyData?.id
      }
    });
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return (

    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='h5' color='primary.main'>Company Profile</Typography>
          <Typography variant='text-base' color='#4B5563'>{companyData?.name}</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='contained'
              size='small'
              color='secondary'
              sx={{ color: 'white' }}
              onClick={() => { router.push('/company-management/company-profile/edit'); }}
            ><Edit fontSize='small' />&nbsp; Edit</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab sx={{ textTransform: 'none' }} label='Company Information' {...a11yProps(0)} />
              <Tab sx={{ textTransform: 'none' }} label='Payment Information' {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Typography component='h3' fontSize={18} color='primary' fontWeight={700}>Company Information</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Company Logo</Typography>
                <Box component='div' sx={{ position: 'relative', width: '100px', height: '100px', border: '1px solid #E5E7EB', padding: '8px' }}>
                  <Image
                    src={data?.logo && data?.logo.includes('http') ? data?.logo : ImageType.PLACEHOLDER_COMPANY}
                    fill={true}
                    style={{ objectFit: 'contain' }}
                    alt={'company logo'}
                  />
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Company Type</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.type?.name, '-')}</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Company Name</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.name, '-')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Company NPWP</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifThenElse((!data?.taxIDNumber || data?.taxIDNumber === 'null'), '-', data?.taxIDNumber)}</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Company Sector</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.sector?.name, '-')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Company Email</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.email, '-')}</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Contact Number</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.phoneNumberPrefix, '-')} {ifEmptyReplace(data?.phoneNumber, '-')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Typography component='h3' fontSize={18} color='primary' fontWeight={700}>Company Address</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Country</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.address?.country?.name, '-')}</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Province</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.address?.firstLevel?.name, '-')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>City</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.address?.secondLevel?.name, '-')}</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Sub-district</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.address?.thirdLevel?.name, '-')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Street Name, Building Name</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.address?.address, '-')}</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Zip Code</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.address?.zipCode, '-')}</Typography>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Typography component='h3' fontSize={18} color='primary' fontWeight={700}>Bank Information</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Bank</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(companyPayments?.bank?.bank?.name, '-')}</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Bank Account Holder&apos;s Name</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(companyPayments?.bank?.holder, '-')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Bank Account No</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(companyPayments?.bank?.accountNumber, '-')}</Typography>
              </Grid>
              <Grid item xs={3} md={3} lg={3} xl={3}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Bank Code</Typography>
                <Typography component='div' variant='text-sm' color='#4B5533'>{ifEmptyReplace(companyPayments?.bank?.bankCode, '-')}</Typography>
              </Grid>
              <Grid item xs={3} md={3} lg={3} xl={3}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Branch Code</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(companyPayments?.bank?.branchCode, '-')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Branch Name</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(companyPayments?.bank?.branchName, '-')}</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Swift Code</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(companyPayments?.bank?.swiftCode, '-')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Typography component='h3' fontSize={18} color='primary' fontWeight={700}>Payment Information</Typography>
              </Grid>
            </Grid>
            {!companyPayments?.payrolls && (
              <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
                <Grid item xs={12} md={12} lg={12} xl={12}>
                  <Typography component='div' variant='text-sm' color='#4B5563'>-</Typography>
                </Grid>
              </Grid>
            )}
            {companyPayments?.payrolls?.map((payments, index) => (
              <Box key={index}>
                {
                  payments?.type === 0 && (
                    <>
                      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
                        <Grid item xs={12} md={12} lg={12} xl={12}>
                          <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Schedule Type</Typography>
                          <Typography variant='text-sm' color='#1F2937' sx={{ padding: '3px 12px', background: '#E5E7EB', borderRadius: '4px' }} >Monthly</Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
                        <Grid item xs={6} md={6} lg={6} xl={6} >
                          <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Pay Period (includes overtime)</Typography>
                          <Typography component='div' variant='text-sm' color='#4B5563'>{payments?.start || '-'} to {payments?.end || '-'}</Typography>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} xl={6}>
                          <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Default Payment Mode</Typography>
                          <Typography component='div' variant='text-sm' color='#4B5563'>{payments?.method?.name || '-'}</Typography>
                        </Grid>
                      </Grid>
                    </>
                  )
                }
                {
                  payments?.type === 1 && (
                    <>
                      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
                        <Grid item xs={12} md={12} lg={12} xl={12}>
                          <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Schedule Type</Typography>
                          <Typography variant='text-sm' color='#1F2937' sx={{ padding: '3px 12px', background: '#E5E7EB', borderRadius: '4px' }} >Weekly</Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
                        <Grid item xs={6} md={6} lg={6} xl={6}>
                          <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Pay Period (includes overtime)</Typography>
                          <Typography component='div' variant='text-sm' color='#4B5563'>{getPeriod(payments?.start)}</Typography>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} xl={6}>
                          <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Default Payment Mode</Typography>
                          <Typography component='div' variant='text-sm' color='#4B5563'>{payments?.method?.name || '-'}</Typography>
                        </Grid>
                      </Grid>
                    </>
                  )
                }
                {
                  payments?.type === 2 && (
                    <>
                      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
                        <Grid item xs={12} md={12} lg={12} xl={12}>
                          <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Schedule Type</Typography>
                          <Typography variant='text-sm' color='#1F2937' sx={{ padding: '3px 12px', background: '#E5E7EB', borderRadius: '4px' }} >Bi-Weekly</Typography>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
                        <Grid item xs={6} md={6} lg={6} xl={6}>
                          <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Pay Period (includes overtime)</Typography>
                          <Typography component='div' variant='text-sm' color='#4B5563'>{getPeriod(payments?.start)} on {getPeriod(payments?.end)}</Typography>
                        </Grid>
                        <Grid item xs={6} md={6} lg={6} xl={6}>
                          <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>Default Payment Mode</Typography>
                          <Typography component='div' variant='text-sm' color='#4B5563'>{payments?.method?.name || '-'}</Typography>
                        </Grid>
                      </Grid>
                    </>
                  )
                }
              </Box>
            ))}
          </TabPanel>
        </Box >
      </ContentWrapper >
    </>
  );
}

export default CompanyProfileComponent;