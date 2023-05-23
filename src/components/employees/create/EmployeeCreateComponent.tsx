import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { IconButton } from '@/components/_shared/form';
import { Card, Typography, Button as MuiButton, Tab, Tabs, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import styled from '@emotion/styled';
import ConfirmationModal from '@/components/_shared/common/ConfirmationModal';
import { useRouter } from 'next/router';
import { Employees } from '@/types/employees';
import { useAppDispatch } from '@/hooks/index';
import dayjs from 'dayjs';
import { postEmployeeInfoRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { getCompanyData } from '@/utils/helper';

const EmployeeInformationFormClient = dynamic(() => import('./EmployeeInformationForm'), {
  ssr: false
});
const EmployeePersonalInformationFormClient = dynamic(() => import('./EmployeePersonalInformationForm'), {
  ssr: false
});
const EmergencyContactFormClient = dynamic(() => import('./EmergencyContactForm'), {
  ssr: false
});
const CnbCreateForm = dynamic(() => import('./CnbCreateForm'), {
  ssr: false
});

const WorkScheduleCreateForm = dynamic(() => import('@/components/work-schedule/create/WorkScheduleCreateForm'));

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
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [leave, setLeave] = useState(false);
  const employeeRef = useRef<HTMLFormElement>(null);
  const emergencyRef = useRef<HTMLFormElement>(null);
  const personalInformationRef = useRef<HTMLFormElement>(null);
  const [informationValue, setInformationValue] = useState<Employees.InformationValues>({
    companyID: '',
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
  const [personalInformationValue, setPersonalInformationValue] = useState<Employees.PersonalValues>({
    dateofBirthPersonalInformation: null,
    genderPersonalInformation: 0,
    maritialStatusPersonalInformation: 0,
    numberOfDependantsPersonalInformation: 0,
    nationalityPersonalInformation: '',
    religionPersonalInformation: 0,

    countryCitizenAddress: '',
    provinceCitizenAddress: '',
    cityCitizenAddress: '',
    subDistrictCitizenAddress: '',
    addressCitizenAddress: '',
    zipCodeCitizenAddress: '',

    countryResidentialAddress: '',
    provinceResidentialAddress: '',
    cityResidentialAddress: '',
    subDistrictResidentialAddress: '',
    addressResidentialAddress: '',
    zipCodeResidentialAddress: '',

    bankBankInformation: '',
    bankAccountHolderNameBankInformation: '',
    bankAccoutNoBankInformation: '',
    bankCodeBankInformation: '',
    branchCodeBankInformation: '',
    branchNameBankInformation: '',
    swiftCodeBankInformation: '',

    useResidentialAddress: false,
    isPermanentPersonalID: false,

    idExpirationDatePersonalID: '',
    idNumberPersonalID: '',
    idTypePersonalID: ''
  });
  const [isInformationValid, setIsInformationValid] = useState(false);
  const [isPersonalInformationValid, setIsPersonalInformationValid] = useState(false);
  const [isEmergencyValid, setIsEmergencyValid] = useState(false);
  const dispatch = useAppDispatch();
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleClick = async () => {
    const inputData = new FormData();
    inputData.append('companyID', getCompanyData()?.id as string);
    if (informationValue.picture && (informationValue.picture as []).length > 0) {
      inputData.append('picture', (informationValue.picture as unknown as File)[0]);
    }
    inputData.append('fullName', informationValue.fullName);
    inputData.append('nickname', informationValue.nickname);
    inputData.append('phoneNumberPrefix', informationValue.phoneNumberPrefix);
    inputData.append('phoneNumber', informationValue.phoneNumber);
    inputData.append('email', informationValue.email);
    inputData.append('startDate', dayjs(informationValue.startDate).format('YYYY-MM-DD'));
    inputData.append('endDate', dayjs(informationValue.endDate).format('YYYY-MM-DD'));
    inputData.append('isPermanent', informationValue.isPermanent ? 'true' : 'false');
    if (informationValue.department !== '') {
      inputData.append('department', informationValue.department);
    }
    if (informationValue.position !== '') {
      inputData.append('position', informationValue.position);
    }
    inputData.append('isSelfService', informationValue.isSelfService ? 'true' : 'false');


    dispatch({
      type: postEmployeeInfoRequested.toString(),
      payload: { employeeInformation: inputData, isPersonalInformationValid, personalValue: personalInformationValue, isEmergencyValid, emergencyContactValue: emergencyValue }
    });


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
          <MuiButton variant='contained' onClick={handleClick} size='small' color='primary' disabled={!isInformationValid}>Save</MuiButton>
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
            <EmployeeInformationFormClient
              nextPage={handleNext}
              refProp={employeeRef}
              setValues={setInformationValue}
              infoValues={informationValue}
              setIsInformationValid={setIsInformationValid} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EmployeePersonalInformationFormClient
              nextPage={handleNext}
              refProp={personalInformationRef}
              setValues={setPersonalInformationValue}
              personalValues={personalInformationValue}
              setIsPersonalInformationValid={setIsPersonalInformationValid}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <EmergencyContactFormClient
              nextPage={setValue}
              refProp={emergencyRef}
              setValues={setEmergencyValue}
              emergencyValues={emergencyValue}
              setIsEmergencyValid={setIsEmergencyValid} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <CnbCreateForm />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <WorkScheduleCreateForm />
          </TabPanel>
        </Box>
      </ContentWrapper>
      <ConfirmationModal
        open={leave}
        handleClose={handleClose}
        title='Are you sure you want to leave?'
        content='Any unsaved changes will be discarded. This cannot be undone'
        withCallback
        callback={() => {
          router.push('/company-management/employees');
        }}
      />
    </>
  );
}

export default EmployeeCreateComponent;