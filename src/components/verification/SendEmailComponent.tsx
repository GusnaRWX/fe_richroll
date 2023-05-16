import React from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import kayaroll from '../../../public/images/kayaroll-logo.png';
import { OverlayLoading } from '../_shared/common';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Button
} from '@mui/material';
import { useAppSelectors } from '@/hooks/index';

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
 align-items: flext-start;
 justify-content: center;
 background-color: #F7FFFC;
 padding-top: 6rem;
 width: 100%;
 height: 100vh;
`;

function SendEmailComponent() {
  const { register } = useAppSelectors((state) => state);
  return (
    <Base>
      <OverlayLoading open={register.loading}/>
      <NavHead>
        <div>
          <Image src={kayaroll} alt='logo' height={40} width={150}/>
        </div>
        <div>
          <span>EN</span>
        </div>
      </NavHead>
      <Card sx={{ width: '500px', height: '50%' }}>
        <CardContent>
          <div>
            <Image src={kayaroll} alt='logo' height={56} width={211}/>
          </div>
          <div>
            <h2 color='primary'>Email sent successfully!</h2>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <Typography color='grey.400'>We already sent an email verification instruction to budi@gmail.com. Please check your email. Thanks!</Typography>
          </div>
          <Stack>
            <Button variant='contained' target='_blank' href='https://mail.google.com/' color='primary' type='button' fullWidth>Check Email</Button>
          </Stack>
        </CardContent>
      </Card>
    </Base>
  );
}

export default SendEmailComponent;