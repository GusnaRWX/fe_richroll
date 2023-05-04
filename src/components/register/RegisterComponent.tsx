import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { styled as MuiStyled } from '@mui/material/styles';
import kayaroll from '../../../public/images/kayaroll-logo.png';
import { Icons } from '@/utils/assetsConstant';
import {
  Card,
  CardContent,
  FormControl,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
  Autocomplete,
  TextField,
  Typography,
  BoxProps,
  Box
} from '@mui/material';


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


function RegisterComponent() {
  const countryItems = [
    { label: 'Test 1', value: 1 },
    { label: 'Test 2', value: 2 }
  ];
  const employeeItems = [
    { label: '<10', value: 1 },
    { label: '<25', value: 2 },
    { label: '<50', value: 3 },
    { label: '>50', value: 4 }
  ];

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
                name='fullname'
                placeholder='Input Full Name'
                size='small'
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <FormControl variant='standard' sx={{ width: '100%' }}>
                <Typography>Country<AsteriskComponent>*</AsteriskComponent></Typography>
                <Autocomplete options={countryItems} renderInput={(params) => (
                  <TextField {...params} size='small' name='country' placeholder='Select Country'  id='email'/>
                )}/>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} lg={12} xl={12}>
              <Typography>Company Name<AsteriskComponent>*</AsteriskComponent></Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='company'
                placeholder='Input company name'
                size='small'
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <FormControl variant='standard' sx={{ width: '100%' }}>
                <Typography>Employees<AsteriskComponent>*</AsteriskComponent></Typography>
                <Autocomplete options={employeeItems} renderInput={(params) => (
                  <TextField {...params} size='small' name='employee'  id='email'/>
                )}/>
              </FormControl>
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Typography>Contact Number<AsteriskComponent>*</AsteriskComponent></Typography>
              <TextField
                fullWidth
                variant='outlined'
                name='phoneNumber'
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
            <SubmitButton variant='contained'>Register</SubmitButton>
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
        </CardContent>
      </Card>
    </Base>
  );
}


export default RegisterComponent;
