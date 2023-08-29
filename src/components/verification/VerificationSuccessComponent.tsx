import { AppBar, Box, Card, Toolbar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Image as ImageType } from '@/utils/assetsConstant';
import LocalizationMenu from '../_shared/_core/localization/LocalizationMenu';
import { Text } from '../_shared/common';
import { Button } from '../_shared/form';
import { useRouter } from 'next/router';

const WrapperNavbarContent = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between'
});

const WrapperAuth = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary[100],
  minHeight: '100vh'
}));

const WrapperCard = styled(Card)({
  paddingTop: '100px',
  background: 'none',
  borderRadius: '8px',
  boxShadow: 'none',
  paddingLeft: '135px',
  paddingRight: '135px',
  maxWidth: '800px',
  margin: '0 auto',
  '@media (max-width: 800px)': {
    paddingLeft: '65px',
    paddingRight: '65px',
    maxWidth: '100%'
  }
});

const WrapperCardContent = styled(Box)({
  background: '#FFF',
  padding: '24px 24px',
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.05)'
});

const Navbar = () => {
  return (
    <AppBar
      component='nav'
      sx={{
        background: '#FFFFFF',
        color: 'primary.main'
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
        <Box sx={{
          display: {
            xs: 'none',
            sm: 'block'
          }
        }}>
          <LocalizationMenu />
        </Box>
      </WrapperNavbarContent>
    </AppBar>
  );
};

const VerificationSuccessComponent = () => {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  
  return (
    <>
      <Navbar />
      <WrapperAuth>
        <WrapperCard>
          <WrapperCardContent>
            <Image
              src={ImageType.KAYAROLL_LOGO}
              width={151}
              height={40}
              alt='kayaroll'
              style={{ display: 'block', margin: '0 auto' }}
            />
            <Text
              title='Verification successful'
              fontWeight={700}
              variant='text-2xl'
              color='primary.600'
              component='h3'
              mb='4px'
              mt='24px'
            />
            <Text
              title='Congratulations, your email address has been verified. Please login to your account using your email address and password.'
              fontWeight={400}
              variant='text-base'
              color='grey.500'
              component='p'
              mb='4px'
            />
            <Button
              label='Log in Now'
              onClick={() => {
                router.push('/auth-employee/login');
              }}
            />
          </WrapperCardContent>
        </WrapperCard>
      </WrapperAuth>
    </>
  );
};

export default VerificationSuccessComponent;