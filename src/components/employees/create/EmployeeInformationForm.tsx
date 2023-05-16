/* eslint-disable no-unused-vars */
import React, { HTMLAttributes, useState } from 'react';
import {
  Grid,
  Typography,
  Box
} from '@mui/material';
import { Input, Button, Select as CustomSelect, CheckBox, DatePicker, FileUploadModal } from '@/components/_shared/form';
import { styled as MuiStyled } from '@mui/material/styles';
import { Image as ImageType } from '@/utils/assetsConstant';
import styled from '@emotion/styled';
import { useForm, useAppDispatch, useAppSelectors } from '@/hooks/index';
import {
  checkRegulerExpression,
  getCompanyData,
  convertValue,
  convertChecked,
  convertDateValue,
  convertImageParams,
  base64ToFile
} from '@/utils/helper';
import dayjs from 'dayjs';
import { postEmployeeInfoRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { Alert, Text } from '@/components/_shared/common';
import CancelIcon from '@mui/icons-material/Cancel';
import { setStorages, getStorage } from '@/utils/storage';


const AsteriskComponent = MuiStyled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

const EmployeeSelfWrapper = MuiStyled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary[50],
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  borderRadius: '6px',
  width: '100%',
  marginBottom: '1rem'
}));

const NextBtnWrapper = MuiStyled(Box)(({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: '2rem'
}));

interface ImagePriviewProps extends HTMLAttributes<HTMLDivElement> {
  image?: string;
}

const ImageReview = styled.div`
  background-image: url(${({ image }: ImagePriviewProps) => image});
  background-repeat: no-repeat;
  width: 102px;
  height: 102px;
  background-size: contain;
  margin-top: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  `;

interface EmployeeProps {
  refProp: React.Ref<HTMLFormElement>;
  nextPage: (_val: number) => void;
}

function EmployeeInformationForm({ refProp, nextPage }: EmployeeProps) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const companyData = getCompanyData();
  const persistInformation = getStorage('emp-information') ? JSON.parse(getStorage('emp-information') as string) : null;
  const { listDepartment, listPosition } = useAppSelectors(state => state.option);
  const [images, setImages] = useState<string | null>(null || persistInformation?.images);
  const [errorFields, setErrorFields] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialValues, setInitialValues] = useState({
    companyID: companyData?.id,
    picture: [],
    fullName: persistInformation?.fullName !== undefined ? persistInformation?.fullName : '',
    nickname: persistInformation?.nickname !== undefined ? persistInformation?.nickname : '',
    phoneNumberPrefix: persistInformation?.phoneNumberPrefix !== undefined ? persistInformation?.phoneNumberPrefix : '',
    phoneNumber: persistInformation?.phoneNumber !== undefined ? persistInformation?.phoneNumber : '',
    email: persistInformation?.email !== undefined ? persistInformation?.email : '',
    startDate: persistInformation?.startDate !== undefined ? dayjs(persistInformation?.startDate) : null,
    endDate: persistInformation?.endDate !== undefined ? dayjs(persistInformation?.endDate) : null,
    isPermanent: persistInformation?.isPermanent !== undefined ? persistInformation?.isPermanent : false,
    department: persistInformation?.department !== undefined ? persistInformation?.department : '',
    position: persistInformation?.position !== undefined ? persistInformation?.position : '',
    isSelfService: persistInformation?.isSelfService !== undefined ? persistInformation?.isSelfService : false,
    position2: ''
  });




  const validate = (fieldOfValues = values) => {
    const temp = { ...errors };

    if ('picture' in fieldOfValues)
      temp.picture = fieldOfValues.picture.length !== 0 || persistInformation?.images !== null
        ? ''
        : 'This field is required';

    if ('fullName' in fieldOfValues)
      temp.fullName = fieldOfValues.fullName ? '' : 'This field is required';

    if ('phoneNumber' in fieldOfValues)
      temp.phoneNumber = fieldOfValues.phoneNumber ? '' : 'This field is required';

    if ('email' in fieldOfValues) {
      const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailValue = fieldOfValues.email || '';
      let emailErrorMessage = '';
      if (!emailValue) {
        emailErrorMessage = 'Email is required';
      } else if (!checkRegulerExpression(patternEmail, emailValue)) {
        emailErrorMessage = 'Email should be valid';
      }
      temp.email = emailErrorMessage;
    }

    if ('startDate' in fieldOfValues)
      temp.startDate = fieldOfValues.startDate ? '' : 'This field is required';

    if ('endDate' in fieldOfValues)
      temp.endDate = fieldOfValues.endDate ? '' : 'This field is required';

    if ('department' in fieldOfValues)
      temp.department = fieldOfValues.department ? '' : '';

    if ('position' in fieldOfValues)
      temp.position = fieldOfValues.position ? '' : '';


    setErrors({
      ...temp
    });

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '');
  };

  const { values, errors, setErrors, handleInputChange } = useForm(initialValues, true, validate);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const phonePrefixOptions = [
    {
      label: '+62',
      value: '+62'
    },
    {
      label: '+62',
      value: '+62'
    }
  ];

  console.log(values, 'here');

  const handleSubmit = (e) => {
    e.preventDefault();
    const convertToBase64 = base64ToFile(images as string, 'example.png');
    if (validate()) {
      const inputData = new FormData();
      inputData.append('companyID', values.companyID);
      inputData.append('picture', values.picture[0] || convertToBase64);
      inputData.append('fullName', values.fullName);
      inputData.append('nickname', values.nickname);
      inputData.append('phoneNumberPrefix', values.phoneNumberPrefix);
      inputData.append('phoneNumber', values.phoneNumber);
      inputData.append('email', values.email);
      inputData.append('startDate', dayjs(values.startDate).format('YYYY-MM-DD'));
      inputData.append('endDate', dayjs(values.endDate).format('YYYY-MM-DD'));
      inputData.append('isPermanent', values.isPermanent);
      if (values.department !== '') {
        inputData.append('department', values.department);
      }
      if (values.position !== '') {
        inputData.append('position', values.position);
      }
      inputData.append('isSelfService', values.isSelfService);
      dispatch({
        type: postEmployeeInfoRequested.toString(),
        payload: inputData
      });

      setInitialValues({
        companyID: companyData?.id,
        picture: [],
        fullName: '',
        nickname: '',
        phoneNumberPrefix: '',
        phoneNumber: '',
        email: '',
        startDate: dayjs(null),
        endDate: dayjs(null),
        isPermanent: false,
        department: '',
        position: '',
        isSelfService: false,
        position2: ''
      });
      setErrorFields(false);
    } else {
      setErrorFields(true);
    }
  };

  return (
    <div>
      {
        errorFields && (
          <Alert
            severity='error'
            content='Please fill in all the mandatory fields'
            icon={<CancelIcon />}
          />
        )
      }
      <Text
        component='h3'
        variant='text-lg'
        fontWeight={700}
        color='primary.500'
        title='Employee Information'
        mb='16px'
      />
      <form ref={refProp} onSubmit={(e) => handleSubmit(e)}>
        <Box component='div'>
          <Text
            component='span'
            title='Employee Photo'
            color='primary.500'
          />
          <ImageReview image={!images ? ImageType.PLACEHOLDER : images} onClick={handleOpen} />
          {
            errors.picture && (
              <Typography component='span' fontSize='12px' color='red.500'>This field is required</Typography>
            )
          }
        </Box>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='fullName'
              customLabel='Full Name'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              value={values.fullName || persistInformation?.fullName}
              placeholder='Input Full Name'
              error={errors.fullName}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='nickname'
              customLabel='Nickname'
              withAsterisk={false}
              onChange={handleInputChange}
              size='small'
              value={values.nickname || persistInformation?.nickname}
              placeholder='Input Nickname'
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6} sx={{ marginBottom: '1.5rem', marginTop: '.3rem' }}>
            <Typography>Contact Number<AsteriskComponent>*</AsteriskComponent></Typography>
            <Grid container spacing={2}>
              <Grid item xs={1} sm={3} md={2} lg={2} xl={2} spacing={2}>
                <CustomSelect
                  variant='outlined'
                  size='small'
                  fullWidth
                  onChange={(e) => handleInputChange(convertValue('phoneNumberPrefix', e))}
                  name='phoneNumberPrefix'
                  value={values.phoneNumberPrefix}
                  options={phonePrefixOptions}
                  MenuProps={{ disableAutoFocus: true }}
                  sx={{
                    backgroundColor: '#D9EFE7',
                    border: '1px solid #D9EFE7',
                    borderRadius: '9999px',
                    marginRight: '12px',
                    fontSize: '14px'
                  }}
                />
              </Grid>
              <Grid item xs={9} sm={9} md={9} lg={9} xl={10} alignSelf='flex-end'>
                <Input
                  name='phoneNumber'
                  type='number'
                  placeholder='Input Correct Number'
                  withAsterisk={true}
                  onChange={handleInputChange}
                  size='small'
                  value={values.phoneNumber}
                  error={errors.phoneNumber}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='email'
              customLabel='Personal Email Address'
              withAsterisk={true}
              size='small'
              onChange={handleInputChange}
              placeholder='Personal Email Address'
              value={values.email}
              error={errors.email}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <DatePicker
              customLabel='Start Date'
              withAsterisk
              value={values.startDate}
              onChange={(e: unknown) => handleInputChange(convertDateValue('startDate', e))}
              error={errors.startDate}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <DatePicker
              customLabel='End Date'
              withAsterisk
              value={values.endDate}
              onChange={(e: unknown) => handleInputChange(convertDateValue('endDate', e))}
              error={errors.endDate}
            />
          </Grid>
        </Grid>
        <CheckBox
          customLabel='Permanent'
          name='isPermanent'
          checked={values.isPermanent}
          onChange={(e) => handleInputChange(convertChecked(e))}
        />
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <CustomSelect
              customLabel='Department'
              withAsterisk={false}
              variant='outlined'
              value={values.department}
              onChange={(e) => handleInputChange(convertValue('department', e))}
              fullWidth={true}
              name='department'
              size='small'
              options={listDepartment}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <CustomSelect
              customLabel='Position'
              withAsterisk={false}
              variant='outlined'
              value={values.position}
              onChange={(e) => handleInputChange(convertValue('position', e))}
              fullWidth={true}
              name='position'
              size='small'
              options={listPosition}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <EmployeeSelfWrapper>
              <CheckBox
                customLabel='Employee Self Serive'
                name='isSelfService'
                checked={values.isSelfService}
                onChange={(e) => handleInputChange(convertChecked(e))}
              />
              <Typography>Activate button to send account activation link via email. Employee Self Service enables self-data filling.</Typography>
            </EmployeeSelfWrapper>
          </Grid>
        </Grid>
        <NextBtnWrapper>
          <Button fullWidth={false} size='small' label='Next' color='primary' onClick={() => {
            nextPage(1);
            setStorages([{ name: 'emp-information', value: JSON.stringify({ ...values, images }) }]);
          }} />
        </NextBtnWrapper>
      </form>
      <FileUploadModal
        open={open}
        handleClose={handleClose}
        onChange={(e) => handleInputChange(convertImageParams('picture', !e.target.files ? null : e.target.files[0], setImages, handleClose))}
      />
    </div>
  );
}

export default EmployeeInformationForm;