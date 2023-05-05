import React from 'react';
import LoginForm from '@/components/auth/login/Form';
import { Login } from '@/types/component';
import {
  Box,
  BoxProps,
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Image as ImageType } from '@/utils/assetsConstant';


const WrapperAuth = styled(Box)<BoxProps>(({ theme }) => ({
  background: theme.palette.secondary[100],
  minHeight: '100vh'
}));

const WrapperCard = styled(Card)<CardProps>(() => ({
  paddingTop: '100px',
  background: 'none',
  borderRadius: 'none',
  boxShadow: 'none',
  paddingLeft: '135px',
  paddingRight: '135px'
}));

const WrapperCardContent = styled(Box)<BoxProps>(() => ({
  display: 'flex',
}));

const WrapperNavbarContent = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

const Navbar = () => {
  return (
    <AppBar
      component='nav'
      sx={{
        background: '#FFFFFF',
        color: 'primary.main',
      }}
    >
      <WrapperNavbarContent>
        <Box>
          <Image
            src={ImageType.KAYAROLL_LOGO}
            width={151}
            height={40}
            alt='kayaroll'
          />
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            English
          </Typography>
        </Box>
      </WrapperNavbarContent>
    </AppBar>
  );
};

const LoginComponent = ({
  doLogin
}: Login.Component) => {
  return (
    <>
      <Navbar />
      <WrapperAuth>
        <WrapperCard>
          <WrapperCardContent>
            <Box component='div'>
              <Image
                src={ImageType.EXAMPLE_LOGIN}
                alt='login'
                height={621}
                width={584}
              />
            </Box>
            <Box width='100%' height='621px' sx={{ background: '#FFFFFF' }}>
              <LoginForm doLogin={doLogin} />
            </Box>
          </WrapperCardContent>
        </WrapperCard>

      </WrapperAuth>
    </>
  );
};

export default LoginComponent;