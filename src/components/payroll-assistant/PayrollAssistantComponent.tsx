import { Typography, Card, Grid, Box, Button as MuiButton, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Add } from '@mui/icons-material';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
              onClick={() => { router.push('/company-management/company-profile/edit'); }}
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
          </TabPanel>
          <TabPanel value={value} index={1}>
          </TabPanel>
        </Box>
      </ContentWrapper>
    </>
  );
}

export default CompanyProfileComponent;