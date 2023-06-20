import React from 'react';
import { Box, Drawer, DrawerProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface CustomDrawerProps extends DrawerProps {
  drawerwidth: number;
  mobileOpen?: boolean;
  handleDrawerToggle?: () => void;
  drawer?: unknown;
}

const CustomDrawer = styled(Drawer)<CustomDrawerProps>(({ drawerwidth }) => ({
  width: drawerwidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerwidth,
    boxSizing: 'border-box',
    backgroundColor: '#FFFFFF',
    border: 'none',
    marginTop: '66px'
  }
}));

const DrawerCore = ({
  drawerwidth,
  container,
  mobileOpen,
  drawer,
  handleDrawerToggle
}: CustomDrawerProps) => {
  return (
    <Box
      component='nav'
      sx={{
        width: {
          md: mobileOpen ? drawerwidth : 0
        },
        flexShrink: {
          sm: 0
        }
      }}
      aria-label='mailbox folders'
    >
      <CustomDrawer
        drawerwidth={drawerwidth}
        variant='temporary'
        container={container}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open perfomance on mobile
        }}
        sx={{
          display: {
            xs: 'block',
            md: 'none'
          }
        }}
      >
        {drawer as React.ReactNode}
      </CustomDrawer>
      <CustomDrawer
        drawerwidth={drawerwidth}
        variant='permanent'
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'none', md: mobileOpen ? 'block' : 'none' }
        }}
      >
        {drawer as React.ReactNode}
      </CustomDrawer>
    </Box>
  );
};

export default DrawerCore;