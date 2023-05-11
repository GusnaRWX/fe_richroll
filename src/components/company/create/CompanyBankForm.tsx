/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Select,
  Box,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormControl,
  TextFieldProps,
  TextField } from '@mui/material';
import { Input, Button } from '@/components/_shared/form';
import { styled as MuiStyled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { useForm } from '@/hooks/index';
import { checkRegulerExpression } from '@/utils/helper';
import dayjs from 'dayjs';
import { useAppDispatch } from '@/hooks/index';
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

  const handleChecked = (event) => {
    const {name, checked} = event.target;

    const obj = {
      target: {
        name, value: checked
      }
    };
    return obj;
  };

  const convertDate = (name, event) => {
    const obj = {
      target: {
        name, value: event.$d
      }
    };
    return obj;
  };

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
        <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <Typography sx={{ mb: '6px' }}>Company Type<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                variant='outlined'
                size='small'
                value={values.department}
                onChange={handleInputChange}
                name='companyType'
                placeholder='Select Company Type'
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
              customLabel='Company Name'
              withAsterisk={true}
              onChange={handleInputChange}
              size='small'
              placeholder='Input Company Name'
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
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography>Start Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format='DD/MM/YYYY'
                value={values.startDate}
                onChange={(e) => handleInputChange(convertDate('startDate', e))}
                slots={{
                  textField: (textFieldProps: TextFieldProps) => (
                    <TextField {...textFieldProps} />
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-input': {
                    padding: '10px 14px',
                    border: 'none !important'
                  },
                  width: '100%'
                }}/>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography>End Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={values.endDate}
                onChange={(e) => handleInputChange(convertDate('endDate', e))}
                sx={{
                  '& .MuiOutlinedInput-input': {
                    padding: '10px 14px',
                    border: 'none !important'
                  },
                  width: '100%'
                }}/>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <FormControlLabel
          sx={{ marginTop: '.5rem', marginBottom: '.5rem' }}
          label={<Typography fontWeight='bold'>Permanent</Typography>}
          control={
            <Checkbox name='isPermanent' checked={values.isPermanent} onChange={(e) => handleInputChange(handleChecked(e))} color='primary' />
          }
          labelPlacement='end'
        />
        <Grid container spacing={2}>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <Typography>Department<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                variant='outlined'
                size='small'
                value={values.department}
                onChange={handleInputChange}
                name='department'
              >
                <MenuItem value='Marketing'>Marketing</MenuItem>
                <MenuItem value='Management'>Management</MenuItem>
                <MenuItem value='Finance'>Finance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <FormControl fullWidth>
              <Typography>Position<AsteriskComponent>*</AsteriskComponent></Typography>
              <Select
                fullWidth
                variant='outlined'
                size='small'
                value={values.position}
                onChange={handleInputChange}
                name='position'
              >
                <MenuItem value='Manager'>Manager</MenuItem>
                <MenuItem value='Assistance'>Assstance</MenuItem>
                <MenuItem value='Finance'>Finance</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <NextBtnWrapper>
          <Button fullWidth={false} size='small' label='Cancel' variant='outlined' sx={{ mr: '12px' }} color='primary'/>
          <Button fullWidth={false} size='small' label='Save' color='primary'/>
        </NextBtnWrapper>
      </form>
    </>
  );
}

export default CompanyInformationForm;