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
import { useTranslation } from 'react-i18next';

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
  const {t} = useTranslation();
  const t_companyProfile = 'company_management.company_profile';
  const t_companyProfileTabsOption = 'company_management.company_profile.tabs_option';
  const t_companyInformation = 'company_management.company_profile.form.company_information.company_information_section';
  const t_companyAddress = 'company_management.company_profile.form.company_information.company_address_section';
  const t_bankInformation = 'company_management.company_profile.form.payment_information.bank_information_section';
  const t_paymentInformation = 'company_management.company_profile.form.payment_information.payment_information_section';

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
          <Typography variant='h5' color='primary.main'>{t(`${t_companyProfile}.title`)}</Typography>
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
            ><Edit fontSize='small' />&nbsp; {t('button.edit')}</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab sx={{ textTransform: 'none' }} label={t(`${t_companyProfileTabsOption}.company_information`)} {...a11yProps(0)} />
              <Tab sx={{ textTransform: 'none' }} label={t(`${t_companyProfileTabsOption}.payment_information`)} {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Typography component='h3' fontSize={18} color='primary' fontWeight={700}>{t(`${t_companyInformation}.title`)}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_companyInformation}.company_logo`)}</Typography>
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
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_companyInformation}.company_type`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.type?.name, '-')}</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_companyInformation}.company_name`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.name, '-')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_companyInformation}.company_npwp`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifThenElse((!data?.taxIDNumber || data?.taxIDNumber === 'null'), '-', data?.taxIDNumber)}</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_companyInformation}.company_sector`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.sector?.name, '-')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_companyInformation}.company_email_address`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.email, '-')}</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_companyInformation}.contact_number`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.phoneNumberPrefix, '-')} {ifEmptyReplace(data?.phoneNumber, '-')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Typography component='h3' fontSize={18} color='primary' fontWeight={700}>{t(`${t_companyAddress}.title`)}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_companyAddress}.contry`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.address?.country?.name, '-')}</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_companyAddress}.province`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.address?.firstLevel?.name, '-')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_companyAddress}.city`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.address?.secondLevel?.name, '-')}</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_companyAddress}.sub_district`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.address?.thirdLevel?.name, '-')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_companyAddress}.street_and_buildig_name_placeholder`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.address?.address, '-')}</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_companyAddress}.zip_code`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(data?.address?.zipCode, '-')}</Typography>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Typography component='h3' fontSize={18} color='primary' fontWeight={700}>{t(`${t_bankInformation}.title`)}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_bankInformation}.bank`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(companyPayments?.bank?.bank?.name, '-')}</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_bankInformation}.bank_account_holder_name`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(companyPayments?.bank?.holder, '-')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_bankInformation}.bank_account_no`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(companyPayments?.bank?.accountNumber, '-')}</Typography>
              </Grid>
              <Grid item xs={3} md={3} lg={3} xl={3}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_bankInformation}.bank_code`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5533'>{ifEmptyReplace(companyPayments?.bank?.bankCode, '-')}</Typography>
              </Grid>
              <Grid item xs={3} md={3} lg={3} xl={3}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_bankInformation}.branch_code`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(companyPayments?.bank?.branchCode, '-')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_bankInformation}.branch_name`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(companyPayments?.bank?.branchName, '-')}</Typography>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography component='div' variant='text-sm' color='#9CA3AF' mb='8px'>{t(`${t_bankInformation}.swift_code`)}</Typography>
                <Typography component='div' variant='text-sm' color='#4B5563'>{ifEmptyReplace(companyPayments?.bank?.swiftCode, '-')}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Typography component='h3' fontSize={18} color='primary' fontWeight={700}>{t(`${t_paymentInformation}.title`)}</Typography>
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