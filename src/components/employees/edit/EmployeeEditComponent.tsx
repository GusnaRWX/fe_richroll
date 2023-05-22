import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { IconButton } from '@/components/_shared/form';
import { Card, Typography, Button as MuiButton, Tab, Tabs, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import ConfirmationModal from '@/components/_shared/common/ConfirmationModal';
import { Employees } from '@/types/employees';
import dayjs from 'dayjs';
import { getCompanyData } from '@/utils/helper';
import { useAppSelectors } from '@/hooks/index';

const EmployeeInformationEdit = dynamic(() => import('./EmployeeInformationEdit'), {
  ssr: false
});
const PersonalInformationEdit = dynamic(() => import('./PersonalInformationEdit'), {
  ssr: false
});
const EmergencyContactEdit = dynamic(() => import('./EmergencyContactEdit'), {
  ssr: false
});

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


function EmployeeEditComponent() {
  const [value, setValue] = useState(0);
  const [leave, setLeave] = useState(false);
  const employeeRef = useRef<HTMLFormElement>(null);
  const [isInformationValid, setIsInformationValid] = useState(false);
  const personalInformationRef = useRef<HTMLFormElement>(null);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [isPersonalInformationValid, setIsPersonalInformationValid] = useState(false);
  const router = useRouter();
  const { employee } = useAppSelectors((state) => state);
  const dataEmployeeInformation = employee.employeeInformationDetail;
  const dataPersonalInformation = employee.personalInformationDetail;
  const phoneNumberPrefix = typeof dataEmployeeInformation.phoneNumber !== 'undefined' ? dataEmployeeInformation.phoneNumber.split('').slice(0, 3).join('') : '';
  const phoneNumber = typeof dataEmployeeInformation.phoneNumber !== 'undefined' ? dataEmployeeInformation.phoneNumber.slice(3) : '';

  const [informationValue, setInformationValue] = useState<Employees.InformationValues>({
    companyID: getCompanyData()?.id as string,
    department: dataEmployeeInformation?.department,
    email: dataEmployeeInformation?.email,
    endDate: dataEmployeeInformation?.endDate !== null ? dayjs(dataEmployeeInformation?.endDate).format('YYYY/MM/DD') : null,
    fullName: dataEmployeeInformation?.fullName,
    images: dataEmployeeInformation?.picture !== null ? dataEmployeeInformation?.picture : '',
    isPermanent: dataEmployeeInformation?.isPermanent,
    isSelfService: dataEmployeeInformation?.isSelfService,
    nickname: dataEmployeeInformation?.nickname,
    phoneNumber: phoneNumber,
    phoneNumberPrefix: phoneNumberPrefix,
    picture: dataEmployeeInformation?.picture !== null ? dataEmployeeInformation?.picture : [],
    position: dataEmployeeInformation?.position,
    startDate: dataEmployeeInformation?.startDate !== null ? dayjs(dataEmployeeInformation?.startDate).format('YYYY/MM/DD') : null
  });
  const [personalInformationValue, setPersonalInformationValue] = useState<Employees.PersonalValues>({
    dateofBirthPersonalInformation: dataPersonalInformation?.personal?.dateOfBirth !== null ? dayjs(dataPersonalInformation?.personal?.dateOfBirth).format('YYYY/MM/DD') : null,
    genderPersonalInformation: dataPersonalInformation?.personal?.gender,
    maritialStatusPersonalInformation: dataPersonalInformation?.personal?.maritalStatus,
    numberOfDependantsPersonalInformation: dataPersonalInformation?.personal?.numberOfChildren,
    nationalityPersonalInformation: dataPersonalInformation?.personal?.country.id,
    religionPersonalInformation: dataPersonalInformation?.personal?.religion,

    provinceCitizenAddress: dataPersonalInformation?.citizen?.firstLevel.code,
    countryCitizenAddress: dataPersonalInformation?.citizen?.country.id,
    cityCitizenAddress: dataPersonalInformation?.citizen?.secondLevel.code,
    subDistrictCitizenAddress: dataPersonalInformation?.citizen?.thirdLevel.code,
    addressCitizenAddress: dataPersonalInformation?.citizen?.address,
    zipCodeCitizenAddress: dataPersonalInformation?.citizen?.zipCode,

    countryResidentialAddress: dataPersonalInformation?.citizen?.country.id,
    provinceResidentialAddress: dataPersonalInformation?.citizen?.firstLevel.code,
    cityResidentialAddress: dataPersonalInformation?.citizen?.secondLevel.code,
    subDistrictResidentialAddress: dataPersonalInformation?.citizen?.thirdLevel.code,
    addressResidentialAddress: dataPersonalInformation?.citizen?.address,
    zipCodeResidentialAddress: dataPersonalInformation?.citizen?.zipCode,

    bankBankInformation: dataPersonalInformation?.bank?.bank.id,
    bankAccountHolderNameBankInformation: dataPersonalInformation?.bank?.holder,
    bankAccoutNoBankInformation: dataPersonalInformation?.bank?.accountNumber,
    bankCodeBankInformation: dataPersonalInformation?.bank?.bankCode,
    branchCodeBankInformation: dataPersonalInformation?.bank?.branchCode,
    branchNameBankInformation: dataPersonalInformation?.bank?.branchName,
    swiftCodeBankInformation: dataPersonalInformation?.bank?.swiftCode,

    useResidentialAddress: dataPersonalInformation?.citizen?.isResident,
    isPermanentPersonalID: dataPersonalInformation?.citizen?.isPermanent,

    idExpirationDatePersonalID: dataPersonalInformation?.identity?.expiredAt,
    idNumberPersonalID: dataPersonalInformation?.identity?.number,
    idTypePersonalID: dataPersonalInformation?.identity?.type
  });
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleOpen = () => {
    setLeave(true);
  };

  const handleClose = () => {
    setLeave(false);
  };
  const handleNext = (val) => {
    setValue(val);
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
          <Typography component='h3' fontWeight='bold'>Employee Profile</Typography>
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
            <EmployeeInformationEdit
              nextPage={handleNext}
              refProp={employeeRef}
              setValues={setInformationValue}
              infoValues={informationValue}
              setIsInformationValid={setIsInformationValid}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PersonalInformationEdit
              nextPage={handleNext}
              refProp={personalInformationRef}
              setValues={setPersonalInformationValue}
              personalValues={personalInformationValue}
              setIsPersonalInformationValid={setIsPersonalInformationValid}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <EmergencyContactEdit nextTab={handleNext} />
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
        callback={() => {
          router.push('/company-management/employees');
        }}
      />
    </>
  );
}

export default EmployeeEditComponent;