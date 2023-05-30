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
import LeaveSummaryTable from './LeaveSummaryTable';

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

const AttendanceAndLeaveComponent = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);
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
        <Typography variant='h5'>Leave Summary</Typography>
        <div>
          <Button
            onClick={() =>
              router.push('/attendance-leave/leave-summary/create')
            }
            startIcon={<AddIcon />}
            label='Create New Leave Application'
          />
        </div>
      </TitleWrapper>
      <Paper style={{ padding: '16px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
            <Tab label='Pending' {...a11yProps(0)} />
            <Tab label='Approved' {...a11yProps(1)} />
            <Tab label='Upcoming' {...a11yProps(3)} />
            <Tab label='History' {...a11yProps(4)} />
          </Tabs>
        </Box>
        <Grid
          container
          spacing={2}
          style={{ alignItems: 'center' }}
          sx={{ p: 3, pb: 0 }}
        >
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
          <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
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
        </Grid>
        <TabPanel value={value} index={0}>
          <LeaveSummaryTable
            tabValue={value}
            ApproveAction
            DeclineAction
            ShowDetailAction
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LeaveSummaryTable tabValue={value} EditAction />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <LeaveSummaryTable tabValue={value} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <LeaveSummaryTable tabValue={value} />
        </TabPanel>
      </Paper>
    </>
  );
};

export default AttendanceAndLeaveComponent;
