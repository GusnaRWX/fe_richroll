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
import { Input } from '@/components/_shared/form';
import { Search } from '@mui/icons-material';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import LeaveBalanceTable from './table';

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

const LeaveBalanceComponent = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState('');

  const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 24px;
  `;

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <TitleWrapper>
        <Typography variant='h5'>Leave Balance</Typography>
      </TitleWrapper>
      <Paper style={{ padding: '16px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
            <Tab label='Active' {...a11yProps(0)} />
            <Tab label='Inactive' {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Grid container spacing={2} sx={{ p: 3, pb: 0 }}>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
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
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Select
              fullWidth
              variant='outlined'
              size='small'
              placeholder='Select position'
            >
              <MenuItem value='active'>Dummy A</MenuItem>
              <MenuItem value='inactive'>Dummy B</MenuItem>
              <MenuItem value='draft'>Dummy C</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <TabPanel value={value} index={0}>
          <LeaveBalanceTable tabValue={value} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LeaveBalanceTable tabValue={value} />
        </TabPanel>
      </Paper>
    </>
  );
};

export default LeaveBalanceComponent;
