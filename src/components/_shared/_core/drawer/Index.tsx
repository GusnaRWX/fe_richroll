import React from 'react';
import { Drawer, DrawerProps, Collapse } from '@mui/material';
import { styled } from '@mui/material/styles';

export interface CustomDrawerProps extends DrawerProps {
  drawerwidth: number;
  mobileOpen?: boolean;
  handleDrawerToggle?: () => void;
  drawer?: unknown;
}

const CustomDrawer = styled(Drawer)<CustomDrawerProps>(({ drawerwidth }) => ({
  width: drawerwidth,
  '& .MuiDrawer-paper': {
    maxWidth: drawerwidth,
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
    <Collapse
      component='nav'
      in={mobileOpen}
      orientation='horizontal'
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
        variant='persistent'
        anchor='left'
        open={mobileOpen}
      >
        {drawer as React.ReactNode}
      </CustomDrawer>
    </Collapse>
  );
};

export default DrawerCore;