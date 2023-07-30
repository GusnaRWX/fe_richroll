import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { IconButton } from '@/components/_shared/form';
import { Card, Typography, Button as MuiButton, Tab, Tabs, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import ConfirmationModal from '@/components/_shared/common/ConfirmationModal';
import { Employees } from '@/types/employees';
import dayjs from 'dayjs';
import { getCompanyData, ifThenElse } from '@/utils/helper';
import { useAppSelectors, useAppDispatch } from '@/hooks/index';
import { patchEmergencyContactRequested, patchEmployeeInformationRequested, patchPersonalRequested, postWorkScheduleRequested, patchEmployeeCnbRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';

const EmployeeInformationEdit = dynamic(() => import('./EmployeeInformationEdit'), {
  ssr: false
});
const PersonalInformationEdit = dynamic(() => import('./PersonalInformationEdit'), {
  ssr: false
});
const EmergencyContactEdit = dynamic(() => import('./EmergencyContactEdit'), {
  ssr: false
});

const EmployeeWorkScheduleEdit = dynamic(() => import('./EmployeeWorkScheduleEdit'), {
  ssr: false
});

const EmployeeCnbForm = dynamic(() => import('./CnbFormEdit'), {
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

const TitleWrapper = styled.div`
 display: flex;
 flex-direction: column;
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
  const [hydrated, setHydrated] = useState(false);
  const [value, setValue] = useState(0);
  const [leave, setLeave] = useState(false);
  const employeeRef = useRef<HTMLFormElement>(null);
  const emergencyRef = useRef<HTMLFormElement>(null);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [isInformationValid, setIsInformationValid] = useState(false);
  const personalInformationRef = useRef<HTMLFormElement>(null);
  const cnbEditRef = useRef<HTMLFormElement>(null);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [isEmergencyValid, setIsEmergencyValid] = useState(false);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [isPersonalInformationValid, setIsPersonalInformationValid] = useState(false);
  const router = useRouter();
  const { employee } = useAppSelectors((state) => state);
  const dataEmployeeInformation = employee.employeeInformationDetail;
  const dataPersonalInformation = employee.personalInformationDetail;
  const dataEmergencyContact = employee.emergencyContactDetail;
  const phoneNumberPrefix = ifThenElse(typeof dataEmployeeInformation.phoneNumber !== 'undefined', dataEmployeeInformation?.phoneNumber?.split('')?.slice(0, 3).join(''), '');
  const phoneNumber = ifThenElse(typeof dataEmployeeInformation.phoneNumber !== 'undefined', dataEmployeeInformation?.phoneNumber?.slice(3), '');
  const dispatch = useAppDispatch();
  const [informationValue, setInformationValue] = useState<Employees.InformationValues>({
    pictureBackend: [],
    companyID: getCompanyData()?.id as string,
    department: dataEmployeeInformation?.department,
    email: dataEmployeeInformation?.email,
    endDate: ifThenElse(dataEmployeeInformation?.endDate !== null, dayjs(dataEmployeeInformation?.endDate).format('YYYY/MM/DD'), null),
    fullName: dataEmployeeInformation?.fullName,
    images: ifThenElse(dataEmployeeInformation?.picture !== null, dataEmployeeInformation?.picture, ''),
    isPermanent: dataEmployeeInformation?.isPermanent,
    isActive: dataEmployeeInformation?.isActive,
    isSelfService: dataEmployeeInformation?.isSelfService,
    nickname: dataEmployeeInformation?.nickname,
    phoneNumber: phoneNumber,
    phoneNumberPrefix: phoneNumberPrefix,
    picture: [],
    position: dataEmployeeInformation?.position,
    startDate: ifThenElse(dataEmployeeInformation?.startDate !== null, dayjs(dataEmployeeInformation?.startDate).format('YYYY/MM/DD'), null)
  });
  const [personalInformationValue, setPersonalInformationValue] = useState<Employees.PersonalValues>({
    dateofBirthPersonalInformation: ifThenElse(dataPersonalInformation?.personal?.dateOfBirth !== null, dayjs(dataPersonalInformation?.personal?.dateOfBirth).format('YYYY/MM/DD'), null),
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

    countryResidentialAddress: dataPersonalInformation?.residential?.country.id,
    provinceResidentialAddress: dataPersonalInformation?.residential?.firstLevel.code,
    cityResidentialAddress: dataPersonalInformation?.residential?.secondLevel.code,
    subDistrictResidentialAddress: dataPersonalInformation?.residential?.thirdLevel.code,
    addressResidentialAddress: dataPersonalInformation?.residential?.address,
    zipCodeResidentialAddress: dataPersonalInformation?.residential?.zipCode,

    bankBankInformation: dataPersonalInformation?.bank?.bank.id,
    bankAccountHolderNameBankInformation: dataPersonalInformation?.bank?.holder,
    bankAccoutNoBankInformation: dataPersonalInformation?.bank?.accountNumber,
    bankCodeBankInformation: dataPersonalInformation?.bank?.bankCode,
    branchCodeBankInformation: dataPersonalInformation?.bank?.branchCode,
    branchNameBankInformation: dataPersonalInformation?.bank?.branchName,
    swiftCodeBankInformation: dataPersonalInformation?.bank?.swiftCode,

    useResidentialAddress: dataPersonalInformation?.citizen?.isResident,
    // isPermanentPersonalID: dataPersonalInformation?.citizen?.isPermanent,

    idExpirationDatePersonalID: dataPersonalInformation?.identity?.expiredAt,
    idNumberPersonalID: dataPersonalInformation?.identity?.number,
    idTypePersonalID: dataPersonalInformation?.identity?.type
  });
  const [emergencyValue, setEmergencyValue] = useState<Employees.EmergencyContactPatchValues>({
    primaryId: dataEmergencyContact?.primary?.id,
    secondaryId: dataEmergencyContact?.secondary?.id,
    fullNamePrimary: dataEmergencyContact?.primary?.name,
    relationPrimary: dataEmergencyContact?.primary?.relationship,
    phoneNumberPrefixPrimary: dataEmergencyContact?.primary?.phoneNumberPrefix,
    phoneNumberPrimary: dataEmergencyContact?.primary?.phoneNumber,
    fullNameSecondary: dataEmergencyContact?.secondary?.name,
    relationSecondary: dataEmergencyContact?.secondary?.relationship,
    phoneNumberPrefixSecondary: dataEmergencyContact?.secondary?.phoneNumberPrefix,
    phoneNumberSecondary: dataEmergencyContact?.secondary?.phoneNumber
  });

  const [cnbValues, setCnbValues] = useState({});

  const [valueWorkSchedule, setValueWorkSchedule] = useState<any>();

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

  const handleClick = () => {
    const inputData = new FormData();
    inputData.append('companyID', getCompanyData()?.id as string);
    if (informationValue?.pictureBackend?.length !== 0) {
      inputData.append('picture', informationValue?.pictureBackend as unknown as File);
    }
    inputData.append('fullName', informationValue.fullName);
    inputData.append('nickname', informationValue.nickname);
    inputData.append('phoneNumberPrefix', informationValue.phoneNumberPrefix);
    inputData.append('phoneNumber', informationValue.phoneNumber);
    inputData.append('email', informationValue.email);
    inputData.append('startDate', dayjs(informationValue.startDate).format('YYYY-MM-DD'));
    inputData.append('endDate', dayjs(informationValue.endDate).format('YYYY-MM-DD'));
    inputData.append('isPermanent', ifThenElse(informationValue.isPermanent, 'true', 'false'));
    if (informationValue.department !== '') {
      inputData.append('department', informationValue.department);
    }
    if (informationValue.position !== '') {
      inputData.append('position', informationValue.position);
    }
    inputData.append('isSelfService', ifThenElse(informationValue.isSelfService, 'true', 'false'));

    dispatch({
      type: patchEmployeeInformationRequested.toString(),
      payload: {
        employeeInformationPatch: {
          employeeID: router.query.id,
          information: inputData
        }
      }
    });
  };

  const handleClickEmergencyContact = () => {
    dispatch({
      type: patchEmergencyContactRequested.toString(),
      payload: {
        emergencyContactPatch: {
          employeeID: router.query.id,
          emergency: emergencyValue
        }
      }
    });
  };

  const handleClickPersonal = () => {
    dispatch({
      type: patchPersonalRequested.toString(),
      payload: {
        employeePersonal: {
          employeeID: router.query.id,
          personalPayload: personalInformationValue
        }
      }
    });
  };

  const handleClickUpdateWorkSchedule = () => {
    dispatch({
      type: postWorkScheduleRequested.toString(),
      payload: {
        id: router.query.id,
        workSchedule: valueWorkSchedule
      }
    });
  };

  const handleClickUpdateCnb = () => {
    dispatch({
      type: patchEmployeeCnbRequested.toString(),
      payload: {
        id: router.query.id,
        employeeCnb: cnbValues
      }
    });
  };

  const handleSave = {
    0: handleClick,
    1: handleClickPersonal,
    2: handleClickEmergencyContact,
    3: handleClickUpdateCnb,
    4: handleClickUpdateWorkSchedule
  };

  useEffect(() => {
    setInformationValue({
      pictureBackend: [],
      companyID: getCompanyData()?.id as string,
      department: dataEmployeeInformation?.department,
      email: dataEmployeeInformation?.email,
      endDate: ifThenElse(dataEmployeeInformation?.endDate !== null, dayjs(dataEmployeeInformation?.endDate).format('YYYY/MM/DD'), null),
      fullName: dataEmployeeInformation?.fullName,
      images: ifThenElse(dataEmployeeInformation?.picture !== null, dataEmployeeInformation?.picture, ''),
      isPermanent: dataEmployeeInformation?.isPermanent,
      isActive: dataEmployeeInformation?.isActive,
      isSelfService: dataEmployeeInformation?.isSelfService,
      nickname: dataEmployeeInformation?.nickname,
      phoneNumber: phoneNumber,
      phoneNumberPrefix: phoneNumberPrefix,
      picture: [],
      position: dataEmployeeInformation?.position,
      startDate: ifThenElse(dataEmployeeInformation?.startDate !== null, dayjs(dataEmployeeInformation?.startDate).format('YYYY/MM/DD'), null)
    });
    setPersonalInformationValue({
      dateofBirthPersonalInformation: ifThenElse(dataPersonalInformation?.personal?.dateOfBirth !== null, dayjs(dataPersonalInformation?.personal?.dateOfBirth).format('YYYY/MM/DD'), null),
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

      countryResidentialAddress: dataPersonalInformation?.residential?.country.id,
      provinceResidentialAddress: dataPersonalInformation?.residential?.firstLevel.code,
      cityResidentialAddress: dataPersonalInformation?.residential?.secondLevel.code,
      subDistrictResidentialAddress: dataPersonalInformation?.residential?.thirdLevel.code,
      addressResidentialAddress: dataPersonalInformation?.residential?.address,
      zipCodeResidentialAddress: dataPersonalInformation?.residential?.zipCode,

      bankBankInformation: dataPersonalInformation?.bank?.bank.id,
      bankAccountHolderNameBankInformation: dataPersonalInformation?.bank?.holder,
      bankAccoutNoBankInformation: dataPersonalInformation?.bank?.accountNumber,
      bankCodeBankInformation: dataPersonalInformation?.bank?.bankCode,
      branchCodeBankInformation: dataPersonalInformation?.bank?.branchCode,
      branchNameBankInformation: dataPersonalInformation?.bank?.branchName,
      swiftCodeBankInformation: dataPersonalInformation?.bank?.swiftCode,

      useResidentialAddress: dataPersonalInformation?.citizen?.isResident,
      // isPermanentPersonalID: dataPersonalInformation?.citizen?.isPermanent,

      idExpirationDatePersonalID: dataPersonalInformation?.identity?.expiredAt,
      idNumberPersonalID: dataPersonalInformation?.identity?.number,
      idTypePersonalID: dataPersonalInformation?.identity?.type
    });
    setEmergencyValue({
      primaryId: dataEmergencyContact?.primary?.id,
      secondaryId: dataEmergencyContact?.secondary?.id,
      fullNamePrimary: dataEmergencyContact?.primary?.name,
      relationPrimary: dataEmergencyContact?.primary?.relationship,
      phoneNumberPrefixPrimary: dataEmergencyContact?.primary?.phoneNumberPrefix,
      phoneNumberPrimary: dataEmergencyContact?.primary?.phoneNumber,
      fullNameSecondary: dataEmergencyContact?.secondary?.name,
      relationSecondary: dataEmergencyContact?.secondary?.relationship,
      phoneNumberPrefixSecondary: dataEmergencyContact?.secondary?.phoneNumberPrefix,
      phoneNumberSecondary: dataEmergencyContact?.secondary?.phoneNumber
    });
  }, [employee]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
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
          <TitleWrapper>
            <Typography component='h3' fontWeight='bold'>Employee Profile</Typography>
            <Typography component='span' fontSize='12px' sx={{ color: '#4B5563' }}>{employee?.employeeInformationDetail?.fullName}</Typography>
          </TitleWrapper>
        </BackWrapper>
        <ButtonWrapper>
          <MuiButton variant='outlined' size='small' onClick={() => handleOpen()}>Cancel</MuiButton>
          <MuiButton variant='contained' onClick={() => {
            handleSave[value]();
            setTimeout(() => {
              router.push(`/company-management/employees/detail/${router.query.id}`);
            }, 2000);
          }} size='small' color='primary'>Save</MuiButton>
        </ButtonWrapper>
      </TopWrapper>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab sx={{ textTransform: 'none' }} label='Employee Information' {...a11yProps(0)} />
              <Tab sx={{ textTransform: 'none' }} disabled={dataEmployeeInformation?.isSelfService === true} label='Personal Information' {...a11yProps(1)} />
              <Tab sx={{ textTransform: 'none' }} disabled={dataEmployeeInformation?.isSelfService === true} label='Emergency Contact' {...a11yProps(2)} />
              <Tab sx={{ textTransform: 'none' }} label='Compensations & Benefits' {...a11yProps(3)} />
              <Tab sx={{ textTransform: 'none' }} label='Work Schedule' {...a11yProps(4)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <EmployeeInformationEdit
              nextPage={handleNext}
              refProp={employeeRef}
              setValues={setInformationValue}
              infoValues={informationValue}
              setIsInformationValid={setIsInformationValid}
              handleFirstInformation={handleClick}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PersonalInformationEdit
              nextPage={handleNext}
              refProp={personalInformationRef}
              setValues={setPersonalInformationValue}
              personalValues={personalInformationValue}
              setIsPersonalInformationValid={setIsPersonalInformationValid}
              handleSecondPersonal={handleClickPersonal}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <EmergencyContactEdit
              nextPage={handleNext}
              refProp={emergencyRef}
              setValues={setEmergencyValue}
              emergencyValues={emergencyValue}
              setIsEmergencyValid={setIsEmergencyValid}
              handleThirdEmergency={handleClickEmergencyContact}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <EmployeeCnbForm
              refProp={cnbEditRef}
              setValues={setCnbValues}
            />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <EmployeeWorkScheduleEdit setData={setValueWorkSchedule} />
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