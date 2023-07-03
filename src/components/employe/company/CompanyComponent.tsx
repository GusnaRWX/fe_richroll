import React from 'react';
import {
  Box,
  BoxProps,
  ButtonBase,
  AppBar,
  Toolbar,
  Card,
  CardProps,
  Divider,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Image as ImageType } from '@/utils/assetsConstant';
import { IconButton } from '@/components/_shared/form';
import { BsBellFill } from 'react-icons/bs';
import LocalizationMenu from '@/components/_shared/_core/localization/LocalizationMenu';
import Profile from '@/components/_shared/_core/appbar/Profile';
import { getUserData, ifThenElse } from '@/utils/helper';
import { setStorages } from '@/utils/storage';

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
  borderRadius: '8px',
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.05)',
  background: 'white',
  padding: '24px'
}));

const WrapperCardItem = styled(ButtonBase)(() => ({
  borderRadius: '12px',
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.05)',
  background: 'white',
  border: '1px solid #E5E7EB',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'left',
  height: '100%'
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
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: { sm: 1 } }}>
          <IconButton icons={<BsBellFill />} parentColor='' size='small' />
          <Divider sx={{ borderWidth: '0.5px' }} />
          <LocalizationMenu />
          <Divider sx={{ borderWidth: '0.5px' }} />
          <Profile />
        </Box>
      </WrapperNavbarContent>
    </AppBar>
  );
};

function CompanyComponent() {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <WrapperAuth>
        <WrapperCard>
          <WrapperCardContent>
            <Typography
              variant='text-2xl'
              component='div'
              sx={{ fontWeight: 700, mb: '4px' }}
            >
          Welcome {getUserData()?.name}
            </Typography>
            <Typography
              variant='text-base'
              component='div'
              sx={{ fontWeight: 400 }}
            >
          The employer you work for will be displayed here.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '25px', mt: '16px', height: '221px' }}>
              {
                getUserData()?.employee?.companies.map((item, index) => (
                  <WrapperCardItem key={index}
                    onClick={() => {
                      router.push('/dashboard');
                      setStorages([{
                        name: 'selected_roles', value: JSON.stringify('Employee')
                      }]);
                    }}>
                    <Box component={'div'} sx={{ position: 'relative', width: '178px', height: '142px' }}>
                      <Image
                        src={ifThenElse(item?.logo === null, ImageType.PLACEHOLDER_COMPANY, item?.logo)}
                        fill={true}
                        style={{ objectFit: 'contain' }}
                        alt={'test'}
                      />
                    </Box>
                    <Typography
                      variant='text-lg'
                      component='div'
                      sx={{ fontWeight: 700, mb: '4px', mt: '8px', width: '100%' }}
                    >
                      {item?.name}
                    </Typography>
                    <Typography
                      variant='text-xs'
                      component='div'
                      sx={{ fontWeight: 500, width: '100%' }}
                    >
                      {ifThenElse(item?.sector === null, '-', item?.sector?.name)}
                    </Typography>
                  </WrapperCardItem>
                ))
              }
            </Box>
          </WrapperCardContent>
        </WrapperCard>
      </WrapperAuth>
    </>
  );
}

export default CompanyComponent;