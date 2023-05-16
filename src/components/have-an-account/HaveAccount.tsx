import { AppBar, Toolbar, Box, Card, Grid } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import { Image as ImageType } from '@/utils/assetsConstant';
import { styled } from '@mui/material/styles';
import LocalizationMenu from '../_shared/_core/localization/Index';
import { Text } from '../_shared/common';
import { Button } from '../_shared/form';
import Link from 'next/link';
import { AuthEmployee } from '@/types/component';

const WrapperNavbarContent = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

const WrapperAuth = styled(Box)(({ theme }) => ({
  background: theme.palette.secondary[100],
  minHeight: '100vh'
}));

const WrapperCard = styled(Card)(() => ({
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
    maxWidth: '100%',
  },
}));

const WrapperCardContent = styled(Box)(() => ({
  background: '#FFF',
  padding: '24px 24px',
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.05)'
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

const HaveAccount = ({
  token,
  email
}: AuthEmployee.HaveAccount) => {
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
              style={{ display: 'block' }}
            />
            <Text
              title='Log in'
              fontWeight={700}
              variant='text-2xl'
              color='primary.600'
              component='h3'
              mt='24px'
              mb='4px'
            />
            <Text
              title='Already have a Kayaroll Account?'
              fontWeight={400}
              variant='text-base'
              color='grey.500'
              component='p'
            />
            <Grid
              container
              alignItems='center'
              columnGap={2}
              mt='16px'
            >
              <Grid>
                <Button
                  label='Yes'
                  color='primary'
                  LinkComponent={Link}
                  href='/auth-employee/login'
                />
              </Grid>
              <Grid>
                <Button
                  label='No'
                  LinkComponent={Link}
                  href={`/auth-employee/set-new-password?email=${email}&token=${token}`}
                  sx={{
                    background: '#FFF',
                    border: '1px solid #D1D5DB',
                    color: 'black',
                    ':hover': {
                      background: '#FFF',
                      border: '1px solid #D1D5DB',
                      color: 'black',
                    }
                  }}
                />
              </Grid>
            </Grid>
          </WrapperCardContent>
        </WrapperCard>
      </WrapperAuth>
    </>
  );
};

export default HaveAccount;