import React, { ReactNode, useState, useRef } from 'react';
import { Box, Card, Tab, Tabs, Button as MuiButton } from '@mui/material';
import styled from '@emotion/styled';
import { Text } from '@/components/_shared/common';
import { useAppSelectors, useAppDispatch } from '@/hooks/index';
import { useRouter } from 'next/router';
import { Employment } from '@/types/employment';
import PersonalWorkSchedule from '../personal-information/PersonalWorkSchedule';
import ConfirmationModal from '@/components/_shared/common/ConfirmationModal';
import EmploymentEditInformation from './EmploymentEditInformation';
import EmploymentEditPersonalInfo from './EmploymentEditPersonalInfo';
import EmploymentEditEmergencyContact from './EmploymentEditEmergencyContact';
import { getCompanyData, ifThenElse } from '@/utils/helper';
import {
  patchDetailEmergencyContactRequested,
  patchDetailInformationRequested,
  patchDetailPersonalInfoRequested
} from '@/store/reducers/slice/employment/employmentSlice';
import dayjs from 'dayjs';

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
  const dispatch = useAppDispatch();
  const {detailEmergencyContact, detailPersonalInfo, detailInformation} = useAppSelectors((state) => state.employment);
  const informationRef = useRef<HTMLFormElement>(null);
  const personalInformationRef = useRef<HTMLFormElement>(null);
  const emergencyRef = useRef<HTMLFormElement>(null);
  const phoneNumberPrefix = ifThenElse(typeof detailInformation.phoneNumber !== 'undefined', detailInformation?.phoneNumber?.split('')?.slice(0, 3).join(''), '');
  const phoneNumber = ifThenElse(typeof detailInformation.phoneNumber !== 'undefined', detailInformation?.phoneNumber?.slice(3), '');
  const [informationValue, setInformationValue] = useState<Employment.InformationPayload>({
    companyID: getCompanyData()?.id as string,
    department: detailInformation?.department,
    email: detailInformation?.email,
    endDate: ifThenElse(detailInformation?.endDate !== null, dayjs(detailInformation?.endDate).format('YYYY/MM/DD'), null),
    fullName: detailInformation?.fullName,
    images: ifThenElse(detailInformation?.picture !== null, detailInformation?.picture, ''),
    isPermanent: detailInformation?.isPermanent,
    isSelfService: detailInformation?.isSelfService,
    nickname: detailInformation?.nickname,
    phoneNumber: phoneNumber,
    phoneNumberPrefix: phoneNumberPrefix,
    picture: [],
    position: detailInformation?.position,
    startDate: ifThenElse(detailInformation?.startDate !== null, dayjs(detailInformation?.startDate).format('YYYY/MM/DD'), null)
  });
  const [personalInformationValue, setPersonalInformationValue] = useState<Employment.PersonalValues>({
    dateofBirthPersonalInformation: ifThenElse(detailPersonalInfo?.personal?.dateOfBirth !== null, dayjs(detailPersonalInfo?.personal?.dateOfBirth).format('YYYY/MM/DD'), null),
    genderPersonalInformation: detailPersonalInfo?.personal?.gender,
    maritialStatusPersonalInformation: detailPersonalInfo?.personal?.maritalStatus,
    numberOfDependantsPersonalInformation: detailPersonalInfo?.personal?.numberOfChildren,
    nationalityPersonalInformation: detailPersonalInfo?.personal?.country.id,
    religionPersonalInformation: detailPersonalInfo?.personal?.religion,

    provinceCitizenAddress: detailPersonalInfo?.citizen?.firstLevel.code,
    countryCitizenAddress: detailPersonalInfo?.citizen?.country.id,
    cityCitizenAddress: detailPersonalInfo?.citizen?.secondLevel.code,
    subDistrictCitizenAddress: detailPersonalInfo?.citizen?.thirdLevel.code,
    addressCitizenAddress: detailPersonalInfo?.citizen?.address,
    zipCodeCitizenAddress: detailPersonalInfo?.citizen?.zipCode,

    countryResidentialAddress: detailPersonalInfo?.citizen?.country.id,
    provinceResidentialAddress: detailPersonalInfo?.citizen?.firstLevel.code,
    cityResidentialAddress: detailPersonalInfo?.citizen?.secondLevel.code,
    subDistrictResidentialAddress: detailPersonalInfo?.citizen?.thirdLevel.code,
    addressResidentialAddress: detailPersonalInfo?.citizen?.address,
    zipCodeResidentialAddress: detailPersonalInfo?.citizen?.zipCode,

    bankBankInformation: detailPersonalInfo?.bank?.bank.id,
    bankAccountHolderNameBankInformation: detailPersonalInfo?.bank?.holder,
    bankAccoutNoBankInformation: detailPersonalInfo?.bank?.accountNumber,
    bankCodeBankInformation: detailPersonalInfo?.bank?.bankCode,
    branchCodeBankInformation: detailPersonalInfo?.bank?.branchCode,
    branchNameBankInformation: detailPersonalInfo?.bank?.branchName,
    swiftCodeBankInformation: detailPersonalInfo?.bank?.swiftCode,

    useResidentialAddress: detailPersonalInfo?.citizen?.isResident,

    idExpirationDatePersonalID: detailPersonalInfo?.identity?.expiredAt,
    idNumberPersonalID: detailPersonalInfo?.identity?.number,
    idTypePersonalID: detailPersonalInfo?.identity?.type
  });
  const [emergencyValue, setEmergencyValue] = useState<Employment.EmergencyContactPatchValues>({
    primaryId: detailEmergencyContact?.primary?.id,
    secondaryId: detailEmergencyContact?.secondary?.id,
    fullNamePrimary: detailEmergencyContact?.primary?.name,
    relationPrimary: detailEmergencyContact?.primary?.relationship,
    phoneNumberPrefixPrimary: detailEmergencyContact?.primary?.phoneNumberPrefix,
    phoneNumberPrimary: detailEmergencyContact?.primary?.phoneNumber,
    fullNameSecondary: detailEmergencyContact?.secondary?.name,
    relationSecondary: detailEmergencyContact?.secondary?.relationship,
    phoneNumberPrefixSecondary: detailEmergencyContact?.secondary?.phoneNumberPrefix,
    phoneNumberSecondary: detailEmergencyContact?.secondary?.phoneNumber
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
    const inputData = new FormData();
    inputData.append('companyID', getCompanyData()?.id as string);
    if ((informationValue.picture as []).length > 0) {
      inputData.append('picture', (informationValue.picture as File)[0]);
    }
    inputData.append('fullName', informationValue.fullName);
    inputData.append('nickname', informationValue.nickname);
    inputData.append('phoneNumberPrefix', informationValue.phoneNumberPrefix);
    inputData.append('phoneNumber', informationValue.phoneNumber);
    inputData.append('email', informationValue.email);
    inputData.append('startDate', dayjs(informationValue.startDate).format('YYYY-MM-DD'));
    if (!informationValue.isPermanent) {
      inputData.append('endDate', dayjs(informationValue.endDate).format('YYYY-MM-DD'));
    }
    inputData.append('isPermanent', ifThenElse(informationValue.isPermanent, 'true', 'false'));
    if (informationValue.department !== '') {
      inputData.append('department', informationValue.department);
    }
    if (informationValue.position !== '') {
      inputData.append('position', informationValue.position);
    }
    inputData.append('isSelfService', ifThenElse(informationValue.isSelfService, 'true', 'false'));

    dispatch({
      type: patchDetailInformationRequested.toString(),
      payload: {
        employeeInformationPatch: {
          information: inputData
        }
      }
    });
  };


  const handleSavePersonal = () => {
    dispatch({
      type: patchDetailPersonalInfoRequested.toString(),
      payload: {
        employeePersonal: {
          personalPayload: personalInformationValue
        }
      }
    });
  };


  const handleSaveEmergencyContact = () => {
    dispatch({
      type: patchDetailEmergencyContactRequested.toString(),
      payload: {
        emergencyContactPatch: {
          emergency: emergencyValue
        }
      }
    });
  };

  const handleSave = {
    0: handleSaveInformation,
    1: handleSavePersonal,
    2: handleSaveEmergencyContact
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
          <MuiButton variant='contained'  size='small' color='primary' onClick={() => {
            handleSave[value]();
            setTimeout(() => {
              router.push('/employe/employement/profile-information');
            }, 2000);

          }}>Save</MuiButton>
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