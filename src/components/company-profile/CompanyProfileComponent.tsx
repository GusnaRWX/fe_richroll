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
import { Company } from '@/types/component';
import { IconButton } from '@/components/_shared/form';
import { BsBellFill } from 'react-icons/bs';
import LocalizationMenu from '@/components/_shared/_core/localization/Index';
import Profile from '@/components/_shared/_core/appbar/Profile';
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

const WrapperCardAdd = styled(ButtonBase)(() => ({
  borderRadius: '12px',
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.05)',
  background: '#C6E7DB',
  border: '1px solid #E5E7EB',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center'
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

const CardAdd = () => {
  const router = useRouter();
  return (
    <WrapperCardAdd onClick={() => { router.push('/company/create');}}>
      <Image
        src={ImageType.ADD_COMPANY}
        width={178}
        height={142}
        alt='add company'
      />
      <Typography
        variant='text-lg'
        component='div'
        sx={{ fontWeight: 700, mb: '4px' }}
      >
        Create New
      </Typography>
      <Typography
        variant='text-xs'
        component='div'
        sx={{ fontWeight: 500 }}
      >
        You can add a maximum of<br/>5 companies
      </Typography>
    </WrapperCardAdd>
  );
};

const CompanyComponent = ({ companies }: Company.Component) => {
  const router = useRouter();
  const handleClick = (val, path) => {
    setStorages([
      {name: 'companyID', value: val.id},
      {name: 'kaya_company', value: JSON.stringify({id: val.id, imageUrl: val.information?.imageUrl || '', name: val.information?.name, sector: val.information?.sector?.name || '-'})}
    ]);
    router.push(path);
  };
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
              Your Company
            </Typography>
            <Typography
              variant='text-base'
              component='div'
              sx={{ fontWeight: 400 }}
            >
              Choose the company you want to manage. You can add a maximum of 5 companies
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '12px', mt: '16px', height: '221px' }}>
              {companies.map((val, idx) => (
                // <WrapperCardItem key={idx} onClick={() => { router.push(`/company/${val?.['id']}`);}}>
                <WrapperCardItem key={idx} onClick={() => { handleClick(val, '/dashboard');}}>
                  <Image
                    src={ImageType.PLACEHOLDER_COMPANY}
                    width={178}
                    height={142}
                    alt={val?.['information']?.['name']}
                  />
                  <Typography
                    variant='text-lg'
                    component='div'
                    sx={{ fontWeight: 700, mb: '4px', mt: '8px', width: '100%' }}
                  >
                    {val?.['information']?.['name']}
                  </Typography>
                  <Typography
                    variant='text-xs'
                    component='div'
                    sx={{ fontWeight: 500, width: '100%' }}
                  >
                    {val?.['information']?.['sector']?.['name']}
                  </Typography>
                </WrapperCardItem>
              ))}
              {companies.length < 5 && <CardAdd />}
            </Box>
          </WrapperCardContent>
        </WrapperCard>

      </WrapperAuth>
    </>
  );
};

export default CompanyComponent;