import React, { useState } from 'react';
import { Typography, Card, Grid, Box, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import DisbursementTable from './DisbursementTable';
import { useTranslation } from 'react-i18next';

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

function DisbursementComponent() {
  const [value, setValue] = useState(0);
  const {t} =  useTranslation();
  const t_key = 'payroll_and_disbursement.disbursement';
  const t_tabPanel = 'payroll_and_disbursement.disbursement.table.tab_panel';

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6}>
          <Typography variant='h5' color='primary.main'>{t(`${t_key}.title`)}</Typography>
          <Typography variant='text-base' color='#4B5563'>{t(`${t_key}.sub_title`)}</Typography>
        </Grid>
      </Grid>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab sx={{ textTransform: 'none' }} label={t(`${t_tabPanel}.draft`)} {...a11yProps(0)} />
              <Tab sx={{ textTransform: 'none' }} label={t(`${t_tabPanel}.completed`)} {...a11yProps(1)} />
              <Tab sx={{ textTransform: 'none' }} label={t(`${t_tabPanel}.archive`)} {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <DisbursementTable tabValue={value}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DisbursementTable tabValue={value}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <DisbursementTable tabValue={value}/>
          </TabPanel>
        </Box>
      </ContentWrapper>
    </>
  );
}

export default DisbursementComponent;