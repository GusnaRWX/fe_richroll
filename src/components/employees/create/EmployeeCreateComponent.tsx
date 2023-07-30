/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { IconButton, Stepper } from '@/components/_shared/form';
import { Card, Typography, Button as MuiButton, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import styled from '@emotion/styled';
import ConfirmationModal from '@/components/_shared/common/ConfirmationModal';
import { useRouter } from 'next/router';
import { Employees } from '@/types/employees';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import dayjs from 'dayjs';
import { postEmployeeInfoRequested, postPersonalInformationRequested, postEmergencyRequested, postCnbEmployeeRequested, postWorkScheduleRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { base64ToFile, getCompanyData, ifThenElse } from '@/utils/helper';
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
  const [finishedStep, setFinishedStep] = useState(0);
  const [leave, setLeave] = useState(false);
  const { employeeID } = useAppSelectors(state => state.employee);
  const { responser } = useAppSelectors((state) => state);
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [valueWorkSchedule, setValueWorkSchedule] = useState<any>({});

  const dispatch = useAppDispatch();

  const handleSaveWorkSchedule = async () => {
    dispatch({
      type: postWorkScheduleRequested.toString(),
      payload: {
        id: employeeID,
        workSchedule: valueWorkSchedule
      }
    });
    router.push('/company-management/employees');
  };

  const handleSaveCnB = async (data) => {
    if (finishedStep <= 4) {
      dispatch({
        type: postCnbEmployeeRequested.toString(),
        payload: {
          id: employeeID,
          cnb: data
        }
      });
      setFinishedStep(4);
    }
  };

  const handleSaveEmergency = async (data) => {
    if (finishedStep <= 3) {
      dispatch({
        type: postEmergencyRequested.toString(),
        payload: {
          employeeID: employeeID,
          data: data
        }
      });
      setFinishedStep(3);
    }
  };

  const handleSavePersonal = async (data) => {
    if (finishedStep <= 2) {
      dispatch({
        type: postPersonalInformationRequested.toString(),
        payload: {
          employeeID: employeeID,
          data: data
        }
      });
      setFinishedStep(2);
    }
  };

  const handleSaveEmployee = async (data) => {
    if (finishedStep <= 1 && employeeID === '') {
      const convertToBase64 = base64ToFile(data.images, 'example.png');
      const inputData = new FormData();
      inputData.append('companyID', getCompanyData()?.id as string);
      if ((data.picture as []).length > 0 || convertToBase64) {
        inputData.append('picture', (data.picture as File)[0] || convertToBase64);
      }
      inputData.append('fullName', data.fullName);
      inputData.append('nickname', data.nickname);
      inputData.append('phoneNumberPrefix', data.phoneNumberPrefix);
      inputData.append('phoneNumber', data.phoneNumber);
      inputData.append('email', data.email);
      inputData.append('startDate', dayjs(data.startDate).format('YYYY-MM-DD'));
      if (!data.isPermanent) {
        inputData.append('endDate', dayjs(data.endDate).format('YYYY-MM-DD'));
      }
      inputData.append('isPermanent', ifThenElse(data.isPermanent, 'true', 'false'));
      if (data.department !== '') {
        inputData.append('department', data.department);
      }
      if (data.position !== '') {
        inputData.append('position', data.position);
      }
      inputData.append('isSelfService', ifThenElse(data.isSelfService, 'true', 'false'));

      dispatch({
        type: postEmployeeInfoRequested.toString(),
        payload: {
          employeeInformation: inputData
        }
      });
      setFinishedStep(1);
    }
  };

  const handleBack = () => {
    if (informationValue.isSelfService && value === 3) {
      setValue(0);
    } else {
      setValue(value - 1);
    }
  };

  const handleClose = () => {
    setLeave(false);
  };

  const handleCancel = () => {
    setLeave(true);
  };

  const handleNextPermanent = (val, data) => {
    handleSaveEmployee(data);
    setValue(val);
  };

  const handleNext = (val, data) => {
    switch (val) {
      case 1:
        handleSaveEmployee(data);
        break;
      case 2:
        handleSavePersonal(data);
        break;
      case 3:
        handleSaveEmergency(data);
        break;
      case 4:
        handleSaveCnB(data);
        break;
      default:
        break;
    }
    setValue(val);
  };

  useEffect(() => {
    console.log(informationValue.isSelfService);

    if (![200, 201, 0].includes(responser?.code)) handleBack();
    if (![200, 201, 0].includes(responser?.code) && informationValue.isSelfService && value === 3) setValue(0);
  }, [responser?.code]);

  return (
    <>
      <TopWrapper>
        <BackWrapper >
          <IconButton
            parentColor='primary.500'
            icons={
              <ArrowBack sx={{ color: '#FFFFFF' }} />
            }
            onClick={handleCancel}
          />
          <Typography component='h3' fontWeight='bold'>Add Employee</Typography>
        </BackWrapper>
        <ButtonWrapper>
          <MuiButton variant='outlined' size='small' onClick={() => handleCancel()}>Cancel</MuiButton>
          <MuiButton variant='contained' onClick={handleSaveWorkSchedule} size='small' color='primary' disabled={value !== 4}>Save</MuiButton>
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
              nextPermPage={handleNextPermanent}
              refProp={employeeRef}
              setValues={setInformationValue}
              infoValues={informationValue}
            />
          }
          {value == 1 &&
            <EmployeePersonalInformationFormClient
              nextPage={handleNext}
              prevPage={handleBack}
              refProp={personalInformationRef}
              setValues={setPersonalInformationValue}
              personalValues={personalInformationValue}
            />
          }
          {value == 2 &&
            <EmergencyContactFormClient
              nextPage={handleNext}
              prevPage={handleBack}
              refProp={emergencyRef}
              setValues={setEmergencyValue}
              emergencyValues={emergencyValue}
            />
          }
          {value == 3 &&
            <CnbCreateForm
              nextPage={handleNext}
              prevPage={handleBack}
              setValues={setCompensationBenefitsValue}
              // cnbValues={compensationBenefitsValue}
            />
          }
          {value == 4 &&
            <WorkScheduleForm
              prevPage={handleBack}
              setData={setValueWorkSchedule}
              workData={valueWorkSchedule}
            />
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