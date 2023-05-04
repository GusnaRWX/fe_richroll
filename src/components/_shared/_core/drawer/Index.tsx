import React from 'react';
import { Box, Drawer, DrawerProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface CustomDrawerProps extends DrawerProps {
  drawerWidth: number;
  mobileOpen?: boolean;
  handleDrawerToggle?: () => void;
  drawer?: unknown;
}

const CustomDrawer = styled(Drawer)<CustomDrawerProps>(({ drawerWidth }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: '#FFFFFF',
    border: 'none'
  }
}));

const DrawerCore = ({
  drawerWidth,
  container,
  mobileOpen,
  drawer,
  handleDrawerToggle
}: CustomDrawerProps) => {
  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label='mailbox folders'
    >
      <CustomDrawer
        drawerWidth={drawerWidth}
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
            sm: 'none'
          },
        }}
      >
        {drawer as React.ReactNode}
      </CustomDrawer>
      <CustomDrawer
        drawerWidth={drawerWidth}
        variant='permanent'
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
      >
        {drawer as React.ReactNode}
      </CustomDrawer>
    </Box>
  );
};

export default DrawerCore;