/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Tabs,
  Tab,
  Box,
  Grid,
  Select,
  MenuItem,
} from '@mui/material';
import { Button, Input } from '@/components/_shared/form';
import AddIcon from '@mui/icons-material/Add';
import { Search } from '@mui/icons-material';
import { useRouter } from 'next/router';
import BasicDatePicker from '@/components/_shared/form/DatePicker';
import styled from '@emotion/styled';
import SutatoryBenefitProfileTable from './SatutoryBenefitProfileTable';
import { useTranslation } from 'react-i18next';

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

const SatutoryBenefitProfile = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const {t} = useTranslation();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 24px;
  `;

  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState('');
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  };

  return (
    <>
      <TitleWrapper>
        <Typography variant='h5'>
          {t('satutory_benefit.profile.title')}
        </Typography>
        <div>
          <Button
            onClick={() =>
              router.push('/satutory-benefit/profile/add-new-profile')
            }
            startIcon={<AddIcon />}
            label={t('button.add_new_profile')}
          />
        </div>
      </TitleWrapper>
      <Paper sx={{ pt: '2px' }}>
        <Box sx={{ px: 3 }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              marginBottom: '33px',
            }}
          >
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab label={t('satutory_benefit.profile.table.table_tabs.draft')} {...a11yProps(0)} />
              <Tab label={t('satutory_benefit.profile.table.table_tabs.active')} {...a11yProps(1)} />
              <Tab label={t('satutory_benefit.profile.table.table_tabs.archived')} {...a11yProps(2)} />
            </Tabs>
          </Box>
        </Box>
        <Grid
          container
          spacing={2}
          style={{ alignItems: 'center' }}
          sx={{ px: 3 }}
        >
          <Grid item xs={3.5} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
            <Input
              name='search'
              size='small'
              placeholder='Search'
              onKeyDown={(e) => handleSearch(e)}
              type='text'
              InputProps={{
                startAdornment: <Search sx={{ color: '#9CA3AF' }} />,
              }}
            />
          </Grid>
          <Grid item xs={2.5} sm={2.5} md={2.5} lg={2.5} xl={2.5}>
            <Select
              fullWidth
              variant='outlined'
              size='small'
              placeholder='Sort by Status'
            >
              <MenuItem value='annual/paid leave'>Annual/Paid Leave</MenuItem>
              <MenuItem value='child care leave'>Child Care Leave</MenuItem>
              <MenuItem value='no pay leave'>No Pay Leave</MenuItem>
              <MenuItem value='maternirty leave'>Maternity Leave</MenuItem>
              <MenuItem value='paternity leave'>Paternity Leave</MenuItem>
              <MenuItem value='shared parental leave'>
                Shared Parental Leave
              </MenuItem>
              <MenuItem value='sick leave'>Sick Leave</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Grid
              container
              style={{ textAlign: 'center', alignItems: 'center' }}
            >
              <Grid item xs={5.5} sm={5.5} md={5.5} lg={5.5} xl={5.5}>
                <BasicDatePicker />
              </Grid>
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                -
              </Grid>
              <Grid item xs={5.5} sm={5.5} md={5.5} lg={5.5} xl={5.5}>
                <BasicDatePicker sx={{ height: '15px' }} />{' '}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <TabPanel value={value} index={0}>
          <SutatoryBenefitProfileTable
            tabValue={value}
            DeleteAction
            DetailAction
            ActivateAction
            CopyAction
            Draft

          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SutatoryBenefitProfileTable tabValue={value} ArchivedAction />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SutatoryBenefitProfileTable tabValue={value} DeleteAction />
        </TabPanel>
      </Paper>
    </>
  );
};

export default SatutoryBenefitProfile;
