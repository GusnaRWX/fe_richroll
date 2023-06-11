import React, { ReactNode, useState, useRef } from 'react';
import { Box, Card, Tab, Tabs, Button as MuiButton } from '@mui/material';
import styled from '@emotion/styled';
import { Text } from '@/components/_shared/common';
import { useAppSelectors } from '@/hooks/index';
import { useRouter } from 'next/router';
import { Employment } from '@/types/employment';
import PersonalWorkSchedule from '../personal-information/PersonalWorkSchedule';
import ConfirmationModal from '@/components/_shared/common/ConfirmationModal';
import EmploymentEditInformation from './EmploymentEditInformation';
import EmploymentEditPersonalInfo from './EmploymentEditPersonalInfo';
import EmploymentEditEmergencyContact from './EmploymentEditEmergencyContact';

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
 justify-content: space-between;
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

const TitleWrapper = styled.div`
 display: flex;
 flex-direction: column;
`;

const ContentWrapper = styled(Card)(({
  padding: '2rem'
}));

interface TabPanelProps {
  children?: ReactNode,
  index: number;
  value: number
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
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

function EmploymentEditComponent() {
  const [value, setValue] = useState(0);
  const [leave, setLeave] = useState(false);
  const router = useRouter();
  const informationRef = useRef<HTMLFormElement>(null);
  const personalInformationRef = useRef<HTMLFormElement>(null);
  const emergencyRef = useRef<HTMLFormElement>(null);
  const [informationValue, setInformationValue] = useState<Employment.InformationPayload>({
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
  const [personalInformationValue, setPersonalInformationValue] = useState<Employment.PersonalValues>({
    dateofBirthPersonalInformation: null,
    genderPersonalInformation: 0,
    maritialStatusPersonalInformation: 0,
    numberOfDependantsPersonalInformation: null,
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
    // isPermanentPersonalID: false,

    idExpirationDatePersonalID: '',
    idNumberPersonalID: '',
    idTypePersonalID: ''
  });
  const [emergencyValue, setEmergencyValue] = useState<Employment.EmergencyContactPatchValues>({
    primaryId: '',
    secondaryId: '',
    fullNamePrimary: '',
    relationPrimary: '',
    phoneNumberPrefixPrimary: '',
    phoneNumberPrimary: '',
    fullNameSecondary: '',
    relationSecondary: '',
    phoneNumberPrefixSecondary: '',
    phoneNumberSecondary: ''
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
  const { me: { profile } } = useAppSelectors(state => state);

  const handleSaveInformation = () => {
    console.log('here');
  };
  const handleSavePersonal = () => {
    console.log('here');
  };
  const handleSaveEmergencyContact = () => {
    console.log('here');
  };
  return (
    <>
      <TopWrapper>
        <BackWrapper>
          <TitleWrapper>
            <Text
              title='Employee Profile'
              fontWeight={700}
              fontSize='20px'
              color='primary.500'
            />
            <Text title={profile?.name} fontSize='14px' color='grey.600' fontWeight={400} />
          </TitleWrapper>
        </BackWrapper>
        <ButtonWrapper>
          <MuiButton variant='outlined' size='small' onClick={() => handleOpen()}>Cancel</MuiButton>
          <MuiButton variant='contained'  size='small' color='primary' onClick={() => { router.push('/employe/employement/profile-information'); }}>Save</MuiButton>
        </ButtonWrapper>
      </TopWrapper>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab sx={{ textTransform: 'none' }} label='Employee Information' {...a11yProps(0)} />
              <Tab sx={{ textTransform: 'none' }} label='Personal Information' {...a11yProps(1)} />
              <Tab sx={{ textTransform: 'none' }} label='Emergency Contact' {...a11yProps(2)} />
              <Tab sx={{ textTransform: 'none' }} label='Work Schedule' {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <EmploymentEditInformation
              refProp={informationRef}
              setValues={setInformationValue}
              infoValues={informationValue}
              handleFirstInformation={handleSaveInformation}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <EmploymentEditPersonalInfo
              refProp={personalInformationRef}
              setValues={setPersonalInformationValue}
              personalValues={personalInformationValue}
              handleSecondPersonal={handleSavePersonal}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <EmploymentEditEmergencyContact
              refProp={emergencyRef}
              setValues={setEmergencyValue}
              emergencyValues={emergencyValue}
              handleThirdEmergency={handleSaveEmergencyContact}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <PersonalWorkSchedule />
          </TabPanel>
        </Box>
      </ContentWrapper>
      <ConfirmationModal
        open={leave}
        handleClose={handleClose}
        title='Are you sure you want to leave?'
        content='All unsaved changes will discarded. This cannot be undone'
        withCallback
        callback={() => {
          router.push('/employe/employement/profile-information');
        }}
      />
    </>
  );
}

export default EmploymentEditComponent;