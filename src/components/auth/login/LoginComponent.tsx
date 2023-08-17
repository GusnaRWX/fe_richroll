import React from 'react';
import LoginForm from '@/components/auth/login/LoginForm';
import { Login } from '@/types/component';
import {
  Box,
  BoxProps,
  AppBar,
  Toolbar,
  Card,
  CardProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Image as ImageType } from '@/utils/assetsConstant';
import LocalizationMenu from '@/components/_shared/_core/localization/LocalizationMenu';
import { useAppSelectors } from '@/hooks/index';
import Notify from '../../_shared/common/Notify';

const WrapperAuth = styled(Box)<BoxProps>(({ theme }) => ({
  background: theme.palette.secondary[100],
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const WrapperCard = styled(Card)<CardProps>(() => ({
  background: 'none',
  borderRadius: 'none',
  boxShadow: 'none',
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
        <Box>
          <LocalizationMenu />
        </Box>
      </WrapperNavbarContent>
    </AppBar>
  );
};

const LoginComponent = ({
  doLogin
}: Login.Component) => {
  const { responser } = useAppSelectors((state) => state);
  return (
    <>
      <Navbar />
      {
        [200, 201].includes(responser.code) && (
          <Notify error={false} body={responser.message} footerMessage={responser?.footerMessage} />
        )
      }
      <WrapperAuth>
        <WrapperCard>
          <WrapperCardContent>
            <Box component='div' sx={{ display: { xs: 'none', md: 'block' } }}>
              <Image
                src={ImageType.EXAMPLE_LOGIN}
                alt='login'
                height={621}
                width={584}
              />
            </Box>
            <Box height='621px' sx={{ background: '#FFFFFF', width: '600px' }}>
              <LoginForm doLogin={doLogin} />
            </Box>
          </WrapperCardContent>
        </WrapperCard>

      </WrapperAuth>
    </>
  );
};

export default LoginComponent;