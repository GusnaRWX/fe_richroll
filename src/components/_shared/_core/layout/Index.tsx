import { Box, List, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import Appbar from '@/components/_shared/_core/appbar/Index';
import DrawerCore from '@/components/_shared/_core/drawer/Index';
import { Menus } from '@/components/_shared/_core/drawer/menu';
import { BoxProps } from '@mui/system';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Image as ImageType } from '@/utils/assetsConstant';
import SidebarItem from '../drawer/SidebarItem';

export interface Layout {
  children?: React.ReactNode;
}

const drawerWidth = 260;

const MainComponent = styled(Box)<BoxProps>(({ theme }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.secondary[50],
  opacity: 0.3,
  padding: '70px 25px',
  height: 'auto'
}));

const Layout = ({
  children,
}: Layout) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const handleDrawerToggle = () => {
    setMobileOpen((mobile) => !mobile);
  };

  const container = typeof window !== 'undefined' ? () => window.document.body : undefined;

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
          />
        </Box>
      </Toolbar>
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
        height: '100vh'
      }}
    >
      <Appbar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <DrawerCore
        drawerWidth={drawerWidth}
        container={container}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawer={drawer}
      />
      <MainComponent component='main' >
        {children}
      </MainComponent>
    </Box>
  );
};

export default Layout;