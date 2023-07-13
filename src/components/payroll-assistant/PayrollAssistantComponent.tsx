import React, { useState } from 'react';
import { Typography, Card, Grid, Box, Button as MuiButton, Tab, Tabs } from '@mui/material';
import { DateRangePicker, Input } from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { Add } from '@mui/icons-material';
import { useRouter } from 'next/router';
import PayrollAssistantTable from './PayrollAssistantTable';
import { CustomModal } from '@/components/_shared/common';
import { getCompanyData } from '@/utils/helper';
import { useAppDispatch } from '@/hooks/index';
import { postPayrollRequested } from '@/store/reducers/slice/payroll/payrollSlice';

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

function PayrollAssistantComponent() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const companyData = getCompanyData();
  const [value, setValue] = useState(0);
  // const [date, setDate] = useState<string>();
  // const [name, setName] = useState<HTMLInputElement>();
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    // const [start, end] = date.split(' - ');
    dispatch({
      type: postPayrollRequested.toString(),
      payload: {
        companyID: companyData?.id,
        name: companyData?.id,
        start: companyData?.id,
        end: companyData?.id
      }
    });
    router.push('/payroll-disbursement/payroll-assistant/create');
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='h5' color='primary.main'>Payroll Operation</Typography>
          <Typography variant='text-base' color='#4B5563'>Payroll Assistant</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='contained'
              size='small'
              color='secondary'
              sx={{ color: 'white' }}
              onClick={() => { setOpen(true); }}
            ><Add fontSize='small' />&nbsp; Create New Payroll</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab sx={{ textTransform: 'none' }} label='In Progress' {...a11yProps(0)} />
              <Tab sx={{ textTransform: 'none' }} label='Completed' {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <PayrollAssistantTable tabValue={value}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PayrollAssistantTable tabValue={value}/>
          </TabPanel>
        </Box>
      </ContentWrapper>

      <CustomModal
        open={open}
        handleClose={handleClose}
        title='Create New Payroll'
        width='543px'
        handleConfirm={handleConfirm}
        submitText='Submit'
      >
        <Grid container mt='1rem' mb='1rem'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Input
              name='nameEvent'
              withAsterisk
              customLabel='Name'
              placeholder='Input Name'
              size='small'
              // onChange={setName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mb='1rem'>
          <Grid item xs={12}>
            <DateRangePicker
              withAsterisk
              customLabelStart='Start Date'
              customLabelEnd='End Date'
              // value={formik.values.startDate as unknown as Date}
              // onChange={(date: string) => setDate(date)}
              // error={formik.touched.startDate && formik.errors.startDate ? String(formik.errors.startDate) : ''}
            />
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
}

export default PayrollAssistantComponent;