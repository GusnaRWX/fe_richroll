import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { IconButton, Stepper } from '@/components/_shared/form';
import { Card, Typography, Button as MuiButton, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import styled from '@emotion/styled';
import ConfirmationModal from '@/components/_shared/common/ConfirmationModal';
import { useRouter } from 'next/router';
import { Employees } from '@/types/employees';
import { useAppDispatch } from '@/hooks/index';
import dayjs from 'dayjs';
import { postEmployeeInfoRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { base64ToFile, getCompanyData } from '@/utils/helper';
import { resetResponserMessage } from '@/store/reducers/slice/responserSlice';

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

const WorkScheduleForm = dynamic(() => import('./WorkScheduleForm'), {
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

const steps = [
  'Employee Information',
  'Personal Information',
  'Emergency Contact',
  'C&B',
  'Work Schedule'
];

const ContentWrapper = styled(Card)(({
  padding: '2rem'
}));

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
    isActive: false,
    isSelfService: false,
    nickname: '',
    phoneNumber: '',
    phoneNumberPrefix: '',
    picture: [],
    position: '',
    startDate: ''
  });
  const [emergencyValue, setEmergencyValue] = useState<Employees.EmergencyContactValues>({
    // employeeID: '',
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [compensationBenefitsValue, setCompensationBenefitsValue] = useState<any>({});
  const [valueWorkSchedule, setValueWorkSchedule] = useState({});
  const [isInformationValid, setIsInformationValid] = useState(false);
  const [isPersonalInformationValid, setIsPersonalInformationValid] = useState(false);
  const [isEmergencyValid, setIsEmergencyValid] = useState(false);

  const dispatch = useAppDispatch();
  const handleClick = async () => {
    const convertToBase64 = base64ToFile(informationValue.images, 'example.png');
    const inputData = new FormData();
    inputData.append('companyID', getCompanyData()?.id as string);
    if ((informationValue.picture as []).length > 0 || convertToBase64) {
      inputData.append('picture', (informationValue.picture as File)[0] || convertToBase64);
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
      payload: {
        employeeInformation: inputData,
        isPersonalInformationValid,
        personalValue: personalInformationValue,
        isEmergencyValid,
        emergencyContactValue: emergencyValue,
        cnbValue: compensationBenefitsValue,
        workSchedule: valueWorkSchedule
      }
    });
    router.push('/company-management/employees');
  };

  console.log(compensationBenefitsValue, 'memel');

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
          <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: '30px', mb: '10px' }}>
            <Stepper steps={steps} activeStep={value} />
          </Box>

          {value == 0 &&
            <EmployeeInformationFormClient
              nextPage={handleNext}
              refProp={employeeRef}
              setValues={setInformationValue}
              infoValues={informationValue}
              setIsInformationValid={setIsInformationValid}
            />
          }
          {value == 1 &&
            <EmployeePersonalInformationFormClient
              nextPage={handleNext}
              refProp={personalInformationRef}
              setValues={setPersonalInformationValue}
              personalValues={personalInformationValue}
              setIsPersonalInformationValid={setIsPersonalInformationValid}
            />
          }
          {value == 2 &&
            <EmergencyContactFormClient
              nextPage={setValue}
              refProp={emergencyRef}
              setValues={setEmergencyValue}
              emergencyValues={emergencyValue}
              setIsEmergencyValid={setIsEmergencyValid}
            />
          }
          {value == 3 &&
            <CnbCreateForm
              setValues={setCompensationBenefitsValue}
            />
          }
          {value == 4 &&
            <WorkScheduleForm setData={setValueWorkSchedule} />
          }
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
          dispatch({
            type: resetResponserMessage.toString()
          });
        }}
      />
    </>
  );
}

export default EmployeeCreateComponent;