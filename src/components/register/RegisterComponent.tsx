import React, { useState, FormEvent } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { styled as MuiStyled } from '@mui/material/styles';
import kayaroll from '../../../public/images/kayaroll-logo.png';
import { Icons } from '@/utils/assetsConstant';
import { Address } from '@/types/address';
import { Option } from '@/types/option';
import { checkRegulerExpression } from '@/utils/helper';
import {
  Card,
  CardContent,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
  TextField,
  Typography,
  BoxProps,
  Box,
  Select,
  MenuItem
} from '@mui/material';
import { Register } from '@/types/component';
import { useForm } from '@/hooks/index';


const NavHead = styled.div`
 height: 64px;
 width: 100%;
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 padding-left: 2rem;
 padding-right: 2rem;
 padding-top: 1rem;
 padding-bottom: .5rem;
 position: fixed;
 top: 0;
 left: 0;
 box-shadow: 0 0 10px #333333;
 z-index: 999;
 background-color: #FFFFFF;
`;

const Base = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 background-color: #F7FFFC;
 padding-top: 5rem;
 width: 100%;
 height: 100%;
`;

const WrapperSSO = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  justifyContent: 'center',
  gap: 16,
  alignItems: 'center',
  margin: '14px 0'
}));

const AsteriskComponent = MuiStyled('span')(({theme}) => ({
  color: theme.palette.error.main
}));

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const SubmitButton = styled(Button)(({ theme }) => ({
  color: '#FFFFFF',
  backgroundColor: '#8DD0B8',
  '&:hover': {
    backgroundColor: '#65f0be',
  },
}));


function RegisterComponent({ countries, doRegister }: Register.Component) {

  const [initialValues, setInitialValues] = useState({
    email: '',
    password: '',
    name: '',
    countryID: '',
    companyName: '',
    numberOfEmployees: '',
    phoneNumberPrefix: '+62',
    phoneNumber: '',
    isAgree: true
  });

  const validate = (fieldOfValues = values) => {
    const temp: Register.Form = {...errors};

    if ('email' in fieldOfValues) {
      const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      temp.email = fieldOfValues.email
        ? (
          checkRegulerExpression(patternEmail, fieldOfValues.email)
            ? ''
            : 'Email should be valid'
        )
        : 'Email is required';
    }

    if ('password' in fieldOfValues)
      temp.password = fieldOfValues.password ? '' : 'This field is Required';

    if ('name' in fieldOfValues)
      temp.name = fieldOfValues.name ? '' : 'This field is required';

    if ('countryID' in fieldOfValues)
      temp.countryID = fieldOfValues.countryID ? '' : 'This field is required';

    if ('companyName' in fieldOfValues)
      temp.companyName = fieldOfValues.companyName ? '' : 'This field is required';

    if ('numberOfEmployees' in fieldOfValues)
      temp.numberOfEmployees = fieldOfValues.numberOfEmployees ? '' : 'This field is required';

    if ('phoneNumber' in fieldOfValues)
      temp.phoneNumber = fieldOfValues.phoneNumber ? '' : 'This field is required';

    setErrors({
      ...temp
    });

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '');
  };

  const { values, errors, setErrors, handleInputChange } = useForm(initialValues, true, validate);

  const employeeItems = [
    { label: '<10', value: 1 },
    { label: '<25', value: 2 },
    { label: '<50', value: 3 },
    { label: '>50', value: 4 }
  ];

  const options = (): Option.Mapper[] => {
    return countries.map((item: Address.Country): Option.Mapper => {
      return { label: item.name, value: item.id };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if(validate()) {
      doRegister({ ...values });
      setInitialValues({
        email: '',
        password: '',
        name: '',
        countryID: '',
        companyName: '',
        numberOfEmployees: '',
        phoneNumberPrefix: '+62',
        phoneNumber: '',
        isAgree: true
      });
    }
  };

  return (
    <Base>
      <NavHead>
        <div>
          <Image src={kayaroll} alt='logo' height={40} width={150}/>
        </div>
        <div>
          <span>EN</span>
        </div>
      </NavHead>
      <Card sx={{ width: '800px', height:'100%' }}>
        <CardContent>
          <Box component='form' autoComplete='off' onSubmit={handleSubmit}>
            <div>
              <Image src={kayaroll} alt='logo' height={56} width={211}/>
            </div>
            <h2>Register</h2>
            <Grid container spacing={2}>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography>Email Address<AsteriskComponent>*</AsteriskComponent></Typography>
                <TextField
                  fullWidth
                  variant='outlined'
                  name='email'
                  onChange={handleInputChange}
                  placeholder='Input email address'
                  size='small'
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography>Password<AsteriskComponent>*</AsteriskComponent></Typography>
                <TextField
                  fullWidth
                  variant='outlined'
                  name='password'
                  onChange={handleInputChange}
                  type='password'
                  placeholder='Input Password'
                  size='small'
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography>Full Name<AsteriskComponent>*</AsteriskComponent></Typography>
                <TextField
                  fullWidth
                  variant='outlined'
                  name='name'
                  onChange={handleInputChange}
                  placeholder='Input Full Name'
                  size='small'
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography>Country<AsteriskComponent>*</AsteriskComponent></Typography>
                <Select
                  fullWidth
                  size='small'
                  value={values.countryID}
                  name='countryID'
                  onChange={handleInputChange}>
                  {
                    options().map((item) => (
                      <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                    ))
                  }
                </Select>
              </Grid>
              <Grid item xs={12} md={12} lg={12} xl={12}>
                <Typography>Company Name<AsteriskComponent>*</AsteriskComponent></Typography>
                <TextField
                  fullWidth
                  variant='outlined'
                  name='companyName'
                  onChange={handleInputChange}
                  placeholder='Input company name'
                  size='small'
                />
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography>Employees<AsteriskComponent>*</AsteriskComponent></Typography>
                <Select
                  fullWidth
                  variant='outlined'
                  size='small'
                  name='numberOfEmployees'
                  value={values.numberOfEmployees}
                  onChange={handleInputChange}>
                  {
                    employeeItems.map((item) => (
                      <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
                    ))
                  }
                </Select>
              </Grid>
              <Grid item xs={6} md={6} lg={6} xl={6}>
                <Typography>Contact Number<AsteriskComponent>*</AsteriskComponent></Typography>
                <TextField
                  fullWidth
                  variant='outlined'
                  name='phoneNumber'
                  onChange={handleInputChange}
                  placeholder='Input email address'
                  size='small'
                />
              </Grid>
            </Grid>
            <FormControlLabel
              sx={{ marginTop: '.5rem', marginBottom: '.5rem' }}
              value=''
              label='I have read and agree to the terms of service'
              control={<Checkbox color='success'/>}
              labelPlacement='end'
            />
            <Stack>
              <SubmitButton type='submit' variant='contained'>Register</SubmitButton>
            </Stack>
            <Box component='div' mt='17px'>
              <Typography color='grey.400' textAlign='center'>You can also Register using</Typography>
              <WrapperSSO component='div'>
                <Image
                  src={Icons.SSO_GOOGLE}
                  width={40}
                  height={40}
                  alt='sso-google'
                />
                <Typography fontSize={14}>Or</Typography>
                <Image
                  src={Icons.SSO_FACEBOOK}
                  width={40}
                  height={40}
                  alt='sso-facebook'
                />
              </WrapperSSO>
              <Typography color='grey.400' textAlign='center'>
              Already have an account? &nspp;
                <Typography
                  component='span'
                  color='primary.main'
                  fontWeight={500}
                >
                Log in Now
                </Typography>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Base>
  );
}


export default RegisterComponent;
