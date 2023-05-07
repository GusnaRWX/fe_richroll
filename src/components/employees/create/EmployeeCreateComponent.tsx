import React, { useState } from 'react';
import { IconButton, Button } from '@/components/_shared/form';
import { Card, Typography, Button as MuiButton, Tab, Tabs, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import styled from '@emotion/styled';
import EmployeeInformationForm from './EmployeeInformationForm';
import EmployeePersonalInformation from './EmployeePersonalInformation';
import { FiEdit } from 'react-icons/fi';
import { useRouter } from 'next/router';

import EmergencyContactForm from './EmergencyContactForm';
const TopWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 width: 100%;
 margin-bottom: 1rem;
`;

const BackWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 gap: 1rem;
`;

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-end;
 gap: 1rem;
 margin-top: 10px;
 margin-bottom: 1rem;
`;

const ContentWrapper = styled(Card)(({
  padding: '2rem'
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


function EmployeeCreateComponent() {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <TopWrapper>
        <BackWrapper >
          <IconButton
            parentColor='primary.500'
            icons={
              <ArrowBack sx={{ color: '#FFFFFF' }} />
            }
            onClick={() => { router.back(); }}
          />
          <Typography component='h3' fontWeight='bold'>Add Employee</Typography>
        </BackWrapper>
        <ButtonWrapper>
          {
            value !== 1 ? (
              <>
                <MuiButton variant='outlined' size='small'>Save</MuiButton>
                <MuiButton variant='contained' size='small' color='primary'>Save</MuiButton>
              </>
            ) : (
              <Button
                color='secondary'
                label='Edit'
                startIcon={
                  <FiEdit
                    size={12}
                    color='#FFF'
                  />
                }
                size='small'
              />
            )
          }
        </ButtonWrapper>
      </TopWrapper>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab sx={{ textTransform: 'none' }} label='Employee Information' {...a11yProps(0)} />
              <Tab sx={{ textTransform: 'none' }} label='Personal Information' {...a11yProps(1)} />
              <Tab sx={{ textTransform: 'none' }} label='Emergency Contact' {...a11yProps(2)} />
              <Tab sx={{ textTransform: 'none' }} label='Compensations and Benefits' {...a11yProps(3)} />
              <Tab sx={{ textTransform: 'none' }} label='Work Scedhule' {...a11yProps(4)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <EmployeeInformationForm />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EmployeePersonalInformation />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <EmergencyContactForm />
          </TabPanel>
          <TabPanel value={value} index={3}>
            on Development
          </TabPanel>
          <TabPanel value={value} index={4}>
            on Development
          </TabPanel>
        </Box>
      </ContentWrapper>
    </>
  );
}

export default EmployeeCreateComponent;