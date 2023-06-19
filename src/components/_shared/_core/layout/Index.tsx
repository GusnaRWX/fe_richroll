import { Box, Container, List, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Appbar from '@/components/_shared/_core/appbar/Appbar';
import DrawerCore from '@/components/_shared/_core/drawer/Index';
import { Menus } from '@/components/_shared/_core/drawer/menu';
import { BoxProps } from '@mui/system';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Image as ImageType } from '@/utils/assetsConstant';
import SidebarItem from '../drawer/SidebarItem';
import Notify from '../../common/Notify';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getStorage } from '@/utils/storage';
import { meSuccessed } from '@/store/reducers/slice/auth/meSlice';
import { getCompanyData, CompanyDataParse } from '@/utils/helper';

export interface LayoutProps {
  children?: React.ReactNode;
}

const drawerWidth = 260;

const MainComponent = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.secondary.light,
  overflow: 'auto',
  height: '100vh'
}));

const Layout = ({
  children,
}: LayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [companyData, setCompanyData] = useState<CompanyDataParse | null>({});
  const dispatch = useAppDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen((mobile) => !mobile);
  };
  const { responser } = useAppSelectors((state) => state);

  useEffect(() => {
    const getUserProfile = getStorage('user');
    const tempData: CompanyDataParse | null = getCompanyData();
    setCompanyData(tempData);

    if (getUserProfile) {
      dispatch({
        type: meSuccessed.toString(),
        payload: { ...JSON.parse(getUserProfile) }
      });
    }
  }, []);

  const container = typeof window !== 'undefined' ? () => window.document.body : undefined;
  const { me: { profile } } = useAppSelectors(state => state);

  // Drawer
  const drawer = (
    <Box>
      <Toolbar sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: '20px 0'
      }}>
        <Box>
          <Image
            src={ImageType.KAYAROLL_LOGO}
            width={151}
            height={40}
            alt='kayaroll'
            priority
          />
        </Box>
      </Toolbar>
      {!profile?.roles?.includes('Super Admin') &&
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', px: '16px', gap: '12px' }}>
            <Box component='div' sx={{ position: 'relative', width: '60px', height: '60px' }}>
              <Image
                src={companyData?.imageUrl && companyData?.imageUrl.includes('http') ? companyData?.imageUrl : ImageType.PLACEHOLDER_COMPANY}
                fill={true}
                style={{ objectFit: 'contain' }}
                sizes='(max-width: 60px) 100%, 60px'
                alt='company-logo'
              />
            </Box>
            <Box component='div'>
              <Typography
                variant='text-lg'
                component='div'
                sx={{ fontWeight: 700, width: '100%', color: '#223567' }}
              >
                {companyData?.name}
              </Typography>
              <Typography
                variant='text-xs'
                component='div'
                sx={{ fontWeight: 500, width: '100%', color: '#6B7280' }}
              >
                {companyData?.sector}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant='text-base'
            component='div'
            sx={{ fontWeight: 400, px: '16px', mt: '8px', color: '#6B7280', width: '100%' }}
          >
            Menus
          </Typography>
        </>
      }
      <List>
        {
          Menus?.map(menu => (
            <SidebarItem
              key={menu.key}
              title={menu.title}
              path={menu.path}
              icons={menu.icons}
              hasChild={menu.hasChild}
              child={menu.child}
              roles={menu.roles}
            />
          ))
        }
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Appbar
        DrawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      {
        [200, 201].includes(responser.code) && (
          <Notify error={false} body={responser.message} footerMessage={responser?.footerMessage} />
        )
      }
      {
        ![200, 201, 0].includes(responser?.code) && (
          <Notify error={true} body={responser?.message} />
        )
      }
      <DrawerCore
        drawerwidth={drawerWidth}
        container={container}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawer={drawer}
      />
      <MainComponent component='main' >
        <Container
          maxWidth='xl'
          sx={{
            paddingTop: '90px',
            paddingLeft: '35px !important',
            paddingRight: '35px !important',
            paddingBottom: '33px'
          }}
        >
          {children}
        </Container>

      </MainComponent>
    </Box>
  );
};

export default Layout;