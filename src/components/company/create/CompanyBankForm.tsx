/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Select,
  Box,
  MenuItem,
  FormControl } from '@mui/material';
import { Input, Button } from '@/components/_shared/form';
import { styled as MuiStyled } from '@mui/material/styles';
import { useForm } from '@/hooks/index';
import { checkRegulerExpression } from '@/utils/helper';
import dayjs from 'dayjs';
import { useAppDispatch } from '@/hooks/index';
import { useRouter } from 'next/router';
import { postEmployeeInfoRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';


const AsteriskComponent = MuiStyled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

const NextBtnWrapper = MuiStyled(Box)(({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: '2rem'
}));

interface EmployeeProps {
  refProp: React.Ref<HTMLFormElement>;
  bank: [];
  paymentMethod: [];
}

function CompanyInformationForm ({refProp, bank, paymentMethod} :EmployeeProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [images, setImages] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [initialValues, setInitialValues] = useState({
    companyID: 4,
    picture: [],
    fullName: '',
    nickname: '',
    phoneNumberPrefix: '',
    phoneNumber: '',
    email: '',
    startDate: dayjs(Date.now()),
    endDate: dayjs(Date.now()),
    isPermanent: false,
    department: '',
    position: '',
    isSelfService: false
  });

  const validate = (fieldOfValues = values) => {
    const temp = {...errors};

    if ('picture' in fieldOfValues)
      temp.picture = fieldOfValues.picture.length !== 0 ? '' : 'This field is required';

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

    setErrors({
      ...temp
    });

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '');
  };

  const { values, errors, setErrors, handleInputChange } = useForm(initialValues, true, validate);

  console.log(errors);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validate()) {
      const inputData = new FormData();
      inputData.append('companyID', values.companyID);
      inputData.append('picture', values.picture);
      inputData.append('fullName', values.fullName);
      inputData.append('nickname', values.nickname);
      inputData.append('phoneNumberPrefix', values.phoneNumberPrefix);
      inputData.append('phoneNumber', values.phoneNumber);
      inputData.append('email', values.email);
      inputData.append('startDate', dayjs(values.startDate).format('YYYY-MM-DD'));
      inputData.append('endDate', dayjs(values.endDate).format('YYY-MM-DD'));
      inputData.append('isPermanent', values.isPermanent);
      inputData.append('department', values.department);
      inputData.append('position', values.position);
      inputData.append('isSelfService', values.isSelfService);
      dispatch({
        type: postEmployeeInfoRequested.toString(),
        payload: inputData
      });

      setInitialValues({
        companyID: 4,
        picture: [],
        fullName: '',
        nickname: '',
        phoneNumberPrefix: '',
        phoneNumber: '',
        email: '',
        startDate: dayjs(Date.now()),
        endDate: dayjs(Date.now()),
        isPermanent: false,
        department: '',
        position: '',
        isSelfService: false
      });
    }
  };

  return (
    <>
      <Typography component='h3' fontSize={18} color='primary'>Bank Information</Typography>
      <form ref={refProp} onSubmit={(e) => handleSubmit(e)}>
        <Grid container spacing={2} sx={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <Typography sx={{ mb: '6px' }}>Bank<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                variant='outlined'
                size='small'
                value={values.department}
                onChange={handleInputChange}
                name='companyType'
                placeholder='Select Bank'
              >
                {bank.map((val, idx) => (
                  <MenuItem key={idx} value={val?.['name']}>{val?.['name']}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='fullName'
              customLabel='Bank Account Holder’s Name'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Bank Account Holder’s Name'
              error={errors.fullName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='fullName'
              customLabel='Bank Account No'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Bank Account No'
              error={errors.fullName}
            />
          </Grid>
          <Grid item xs={3} md={3} lg={3} xl={3}>
            <Input
              name='fullName'
              customLabel='Bank Code'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Bank Code'
              error={errors.fullName}
            />
          </Grid>
          <Grid item xs={3} md={3} lg={3} xl={3}>
            <Input
              name='fullName'
              customLabel='Branch Code'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Branch Code'
              error={errors.fullName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='fullName'
              customLabel='Branch Name'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Branch Name'
              error={errors.fullName}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='fullName'
              customLabel='Swift Code'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Swift Code'
              error={errors.fullName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Input
              name='fullName'
              customLabel='Company NPWP'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Company NPWP'
              error={errors.fullName}
            />
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <Typography sx={{ mb: '6px' }}>Company Sector<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                variant='outlined'
                size='small'
                value={values.department}
                onChange={handleInputChange}
                name='companySector'
              >
                {paymentMethod.map((val, idx) => (
                  <MenuItem key={idx} value={val?.['name']}>{val?.['name']}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography component='h3' fontSize={18} color='primary'>Payroll information</Typography>
          </Grid>
        </Grid>
        <NextBtnWrapper>
          <Button onClick={() => { router.push('/company');}} fullWidth={false} size='small' label='Cancel' variant='outlined' sx={{ mr: '12px' }} color='primary'/>
          <Button fullWidth={false} size='small' label='Save' color='primary'/>
        </NextBtnWrapper>
      </form>
    </>
  );
}

export default CompanyInformationForm;