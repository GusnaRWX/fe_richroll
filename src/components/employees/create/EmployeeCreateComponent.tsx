import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { IconButton } from '@/components/_shared/form';
import { Card, Typography, Button as MuiButton, Tab, Tabs, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import styled from '@emotion/styled';
import ConfirmationModal from '@/components/_shared/common/ConfirmationModal';

const EmployeeInformationFormClient = dynamic(() => import('./EmployeeInformationForm'), {
  ssr: false
});
const EmployeePersonalInformationFormClient = dynamic(() => import('./EmployeePersonalInformationForm'), {
  ssr: false
});
const EmergencyContactFormClient = dynamic(() => import('./EmergencyContactForm'), {
  ssr: false
});

import { clearStorages } from '@/utils/storage';
import {Employees} from '@/types/employees';

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
  const [leave, setLeave] = useState(false);
  const employeeRef = useRef<HTMLFormElement>(null);
  const emergencyRef = useRef<HTMLFormElement>(null);
  const personalInformationRef = useRef<HTMLFormElement>(null);
  const [informationValue, setInformationValue] = useState<Employees.InformationValues>({
    department: '',
    email: '',
    endDate: '',
    fullName: '',
    images: '',
    isPermanent: false,
    isSelfService: false,
    nickname: '',
    phoneNumber: '',
    phoneNumberPrefix: '',
    picture: [],
    position: '',
    startDate: ''
  });
  const [personalInformationValue, setPersonalInformationValue] = useState<any>({});
  const [emergencyValue, setEmergencyValue] = useState<Employees.EmergencyContactValues>({
    employeeID: '',
    fullNamePrimary: '',
    relationPrimary: '',
    phoneNumberPrefixPrimary: '',
    phoneNumberPrimary: '',
    fullNameSecondary: '',
    relationSecondary: '',
    phoneNumberPrefixSecondary: '',
    phoneNumberSecondary: ''
  });

  useEffect(() => {
    console.log(personalInformationValue, 'here fuck');
  }, [personalInformationValue]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleClick = () => {
    if (value === 0) {
      employeeRef.current?.requestSubmit();
    } else if (value === 1) {
      personalInformationRef.current?.requestSubmit();
    } else if (value === 2) {
      emergencyRef.current?.requestSubmit();
    }

  };

  const handleOpen = () => {
    setLeave(true);
  };

  const handleClose = () => {
    setLeave(false);
  };

  const handleBack = () => {
    setLeave(true);
  };

  const handleNext = (val) => {
    setValue(val);
  };

  const deleteExistStorage = () => {
    clearStorages(['emp-information', 'emp-personal-information', 'emp-emergency-contact']);
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
            onClick={handleBack}
          />
          <Typography component='h3' fontWeight='bold'>Add Employee</Typography>
        </BackWrapper>
        <ButtonWrapper>
          <MuiButton variant='outlined' size='small' onClick={() => handleOpen()}>Cancel</MuiButton>
          <MuiButton variant='contained' onClick={handleClick} size='small' color='primary'>Save</MuiButton>
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
            <EmployeeInformationFormClient nextPage={handleNext} refProp={employeeRef} setValues={setInformationValue} infoValues={informationValue} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EmployeePersonalInformationFormClient nextPage={handleNext} refProp={personalInformationRef} setValues={setPersonalInformationValue} personalValues={personalInformationValue} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <EmergencyContactFormClient nextPage={setValue} refProp={emergencyRef} setValues={setEmergencyValue} emergencyValues={emergencyValue}/>
          </TabPanel>
          <TabPanel value={value} index={3}>
            on Development
          </TabPanel>
          <TabPanel value={value} index={4}>
            on Development
          </TabPanel>
        </Box>
      </ContentWrapper>
      <ConfirmationModal
        open={leave}
        handleClose={handleClose}
        title='Are you sure you want to leave?'
        content='Any unsaved changes will be discarded. This cannot be undone'
        withCallback
        callback={deleteExistStorage}
      />
    </>
  );
}

export default EmployeeCreateComponent;