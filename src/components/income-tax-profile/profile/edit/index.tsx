/* eslint-disable @typescript-eslint/indent */
import React, { useState } from 'react';
import { IconButton } from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { Typography, Box, Paper, Tabs, Tab } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

// Import Create Component
import ItpEditProfileBasicDetailComponent from './ItpEditProfileBasicDetailComponent';
import ItpEditDesignedTransferAccount from './ItpEditDesignedTransferAccount';
import ItpEditProfileDeductableComponent from './ItpEditProfileDeductableComponent';
import ItpEditProfileTaxRate from './ItpEditProfileTaxRate';
import IptEditProfileTaxMultiplier from './IptEditProfileTaxMultiplier';

export default function ItpEditProfileComponent() {
  const router = useRouter();
  const {t} = useTranslation();

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

  const [value, setValue] = useState(parseInt(router.query.status as string) || 0);

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
        <Box sx={{px:'48px'}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider',  }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab label={t('income_tax_profile.profile.detail.tab.basic_detail')} {...a11yProps(0)} />
              <Tab label={t('income_tax_profile.profile.detail.tab.deductible_component')} {...a11yProps(1)} />
              <Tab label={t('income_tax_profile.profile.detail.tab.income_tax_rate')} {...a11yProps(2)} />
              <Tab label={t('income_tax_profile.profile.detail.tab.income_tax_multiplier')} {...a11yProps(3)} />
              <Tab label={t('income_tax_profile.profile.detail.tab.designated_transfer_account')} {...a11yProps(4)} />
            </Tabs>
          </Box>
        </Box>
        <TabPanel value={value} index={0}>
          <ItpEditProfileBasicDetailComponent setValue={setValue} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ItpEditProfileDeductableComponent />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ItpEditProfileTaxRate />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <IptEditProfileTaxMultiplier />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <ItpEditDesignedTransferAccount setValue={setValue} />
        </TabPanel>
      </Paper>
    </>
  );
}
