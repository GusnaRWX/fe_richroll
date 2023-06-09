import React, { useState } from 'react';
import { Typography, Card, Grid, Box, Tab, Tabs } from '@mui/material';
import { DatePicker, Input } from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import PayrollTable from './PayrollTable';
import CustomModal from '@/components/_shared/common/CustomModal';

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

function PayrollComponent() {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    router.push('/payroll-disbursement/attendance/generate');
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='h5' color='primary.main'>Payroll Operation</Typography>
          <Typography variant='text-base' color='#4B5563'>Payroll</Typography>
        </Grid>
      </Grid>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab sx={{ textTransform: 'none' }} label='Draft' {...a11yProps(0)} />
              <Tab sx={{ textTransform: 'none' }} label='Confirmed' {...a11yProps(1)} />
              <Tab sx={{ textTransform: 'none' }} label='Completed' {...a11yProps(2)} />
              <Tab sx={{ textTransform: 'none' }} label='Archived' {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <PayrollTable tabValue={value}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PayrollTable tabValue={value}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <PayrollTable tabValue={value}/>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <PayrollTable tabValue={value}/>
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
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mb='1rem'>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <DatePicker
              customLabel='Start Date'
              withAsterisk
            />
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <DatePicker
              customLabel='End Date'
              withAsterisk
            />
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
}

export default PayrollComponent;