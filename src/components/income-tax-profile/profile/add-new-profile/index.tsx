/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react';
import { IconButton } from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { Typography, Box, Paper, Tabs, Tab } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';

// Import Create Component
import CreateTaxBasicDetailComponent from './CreateTaxBasicDetail';

export default function ItpAddNewProfileComponent() {
  const router = useRouter();

  const Header = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  });

  const HeaderPageTitle = styled('div')({
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  });

  const [value, setValue] = useState(0);

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
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
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Header>
        <HeaderPageTitle>
          <IconButton
            parentColor='primary.500'
            icons={<ArrowBack sx={{ color: '#FFFFFF' }} />}
            onClick={() => {
              router.push('/income-tax-profile/profile/');
            }}
          />
          <Typography
            style={{
              color: '#223567',
              fontSize: '20px',
              fontWeight: '700',
              width: '250px',
            }}
          >
            Add New Tax Profile
          </Typography>
        </HeaderPageTitle>
      </Header>
      <Paper sx={{ width: '100%', p: '21px 8px' }}>
        <Box sx={{ px: 5 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab label='Basic Detail' {...a11yProps(0)} />
              <Tab label='Deductible Components' {...a11yProps(1)} />
              <Tab label='Income Tax Rate' {...a11yProps(2)} />
              <Tab label='Income Tax Multiplier' {...a11yProps(3)} />
              <Tab label='Designated Transfer Account' {...a11yProps(4)} />
            </Tabs>
          </Box>
        </Box>
        <TabPanel value={value} index={0}>
          <CreateTaxBasicDetailComponent setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* <CreateDesignedTransferAccount setValue={setValue} /> */}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* <CreateRates /> */}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {/* <CreateRates /> */}
        </TabPanel>
        <TabPanel value={value} index={4}>
          {/* <CreateRates /> */}
        </TabPanel>
      </Paper>
    </>
  );
}
