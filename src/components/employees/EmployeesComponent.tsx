import { Typography, Card, Grid, Box, Button as MuiButton, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { BoxProps } from '@mui/system';
import { InfoRounded, Add, Download } from '@mui/icons-material';
import { FaFolderOpen } from 'react-icons/fa';
import EmployeesTable from './EmployeesTable';
import { useRouter } from 'next/router';

const InfoComponent = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.secondary[100],
  padding: '.5rem',
  borderRadius: '6px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  gap: '.5rem',
}));
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

function EmployeesComponent() {
  const router = useRouter();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Typography variant='h5' color='primary.main'>Employees</Typography>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <InfoComponent>
            <InfoRounded color='secondary' sx={{ height: '17px', width: '17px' }} />
            <Typography component='span' sx={{ fontSize: '12px' }}>Please download the excel template here</Typography>
          </InfoComponent>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              fullWidth
              variant='outlined'
              size='small'
            ><FaFolderOpen />&nbsp;Import</MuiButton>
            <MuiButton
              fullWidth
              variant='contained'
              color='secondary'
              size='small'
            >
              <Download fontSize='small' sx={{ color: '#FFFFFF' }} />
              <h4 style={{ color: '#FFFFFF', padding: 0, margin: 0 }}>
                &nbsp; Download Data
              </h4>
            </MuiButton>
            <MuiButton
              fullWidth
              variant='contained'
              size='small'
              color='primary'
              onClick={() => { router.push('/company-management/employees/create'); }}
            ><Add fontSize='small' />&nbsp; Add Employee</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab label='Active' {...a11yProps(0)} />
              <Tab label='Inactive' {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <EmployeesTable />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EmployeesTable />
          </TabPanel>
        </Box>
      </ContentWrapper>
    </>
  );
}

export default EmployeesComponent;