import React from 'react';
import LoginForm from '@/components/auth/admin/AdminForm';
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


const WrapperAuth = styled(Box)<BoxProps>(({ theme }) => ({
  background: theme.palette.secondary[100],
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
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
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <LocalizationMenu />
        </Box>
      </WrapperNavbarContent>
    </AppBar>
  );
};

const AdminComponent = ({
  doLogin
}: Login.Component) => {
  return (
    <>
      <Navbar />
      <WrapperAuth>
        <WrapperCard>
          <WrapperCardContent>
            <Box width='585px' sx={{ background: '#FFFFFF' }}>
              <LoginForm doLogin={doLogin} />
            </Box>
          </WrapperCardContent>
        </WrapperCard>

      </WrapperAuth>
    </>
  );
};

export default AdminComponent;