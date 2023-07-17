import React, { useState, useEffect } from 'react';
import { Typography, Card, Grid, Box, Button as MuiButton, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FiDownload } from 'react-icons/fi';
import AccountManagementTable from './AccountManagementTable';

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

function AccountManagementComponent() {
  const [value, setValue] = useState(0);
  const [hydrated, setHaydrated] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
          <Typography variant='h5' color='primary.main'>Account Management</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='contained'
              size='small'
              color='secondary'
              startIcon={<FiDownload/>}
              sx={{ color: 'white' }}
            >Download Data</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab sx={{ textTransform: 'none' }} label='Active' {...a11yProps(0)} />
              <Tab sx={{ textTransform: 'none' }} label='Suspended' {...a11yProps(1)} />
              <Tab sx={{ textTransform: 'none' }} label='Deleted' {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AccountManagementTable tabValue={value}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AccountManagementTable tabValue={value}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AccountManagementTable tabValue={value}/>
          </TabPanel>
        </Box>
      </ContentWrapper>
    </>
  );
}

export default AccountManagementComponent;