import React, { useState } from 'react';
import { IconButton, Button } from '@/components/_shared/form';
import { Card, Typography, Tab, Tabs, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import styled from '@emotion/styled';
import { FiEdit } from 'react-icons/fi';
import { useRouter } from 'next/router';
import EmployeePersonalInformationDetail from './EmployeePersonalInformationDetail';
import EmployeeInformationDetail from './EmployeeInformationDetail';
import EmergencyContactDetail from './EmergencyContactDetail';
import { useAppSelectors } from '@/hooks/index';

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


function EmployeeDetailComponent() {
  const [value, setValue] = useState(0);
  const { employee } = useAppSelectors((state) => state);
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
            onClick={() => { router.push('/company-management/employees'); }}
          />
          <Typography component='h3' fontWeight='bold'>Employee Profile</Typography>
        </BackWrapper>
        <ButtonWrapper>
          <Button
            color='secondary'
            label='Edit'
            onClick={() => { router.push('/company-management/employees/edit/' + router.query.id); }}
            startIcon={
              <FiEdit
                size={12}
                color='#FFF'
              />
            }
            sx={{ color: 'white' }}
            size='small'
          />
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
            <EmployeeInformationDetail data={employee.employeeInformationDetail} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EmployeePersonalInformationDetail data={employee.personalInformationDetail} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <EmergencyContactDetail data={employee.emergencyContactDetail} />
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

export default EmployeeDetailComponent;