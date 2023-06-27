/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react';
import { IconButton } from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { Typography, Box, Paper, Tabs, Tab } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';

// Import Create Component
import CreateBasicDetailComponent from './CreateBasicDetail';
import CreateDesignedTransferAccount from './CreateDesignedTransferAccount';
import CreateRates from './CreateRates';

export default function CreateNewComponent() {
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
              router.push('/satutory-benefit/component');
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
            Add New Component
          </Typography>
        </HeaderPageTitle>
      </Header>
      <Paper sx={{ width: '100%', p: '21px 8px' }}>
        <Box sx={{px:'48px'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
            <Tab label='Basic Detail' {...a11yProps(0)} />
            <Tab label='Designated Transfer Account' {...a11yProps(1)} />
            <Tab label='Rates' {...a11yProps(2)} />
          </Tabs>
        </Box>
        </Box>
        <TabPanel value={value} index={0}>
          <CreateBasicDetailComponent setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <CreateDesignedTransferAccount setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CreateRates />
        </TabPanel>
      </Paper>
    </>
  );
}
