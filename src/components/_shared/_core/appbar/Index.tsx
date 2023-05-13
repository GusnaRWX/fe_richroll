import React, { FC } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Divider,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { IconButton } from '@/components/_shared/form';
import { BsBellFill } from 'react-icons/bs';
import LocalizationMenu from '@/components/_shared/_core/localization/Index';
import Profile from './Profile';
import { Menu } from '@mui/icons-material';

interface AppbarProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  handleDrawerToggle: () => void;
  DrawerWidth: number;
}

const WrapperNavbarContent = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center'
}));

const WrapperNavbarContentResponsive = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
}));

const Appbar: FC<AppbarProps> = (props) => {
  const { DrawerWidth, handleDrawerToggle } = props;
  const matches = useMediaQuery('(max-width:888px)');
  return (
    <AppBar
      position='fixed'
      sx={{
        width: {
          md: `calc(100% - ${DrawerWidth}px)`,
        },
        ml: {
          sm: `${DrawerWidth}px`
        },
        background: '#FFFFFF',
        color: 'primary.main',
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      {
        !matches && (
          <WrapperNavbarContent>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: { sm: 1 } }}>
              <IconButton icons={<BsBellFill />} parentColor='' size='small' />
              <Divider sx={{ borderWidth: '0.5px' }} />
              <LocalizationMenu />
              <Divider sx={{ borderWidth: '0.5px' }} />
              <Profile />
            </Box>
          </WrapperNavbarContent>
        )
      }

      {
        matches && (
          <WrapperNavbarContentResponsive>
            <IconButton
              icons={<Menu />}
              onClick={handleDrawerToggle}
            />
            <Box
              sx={{
                display: {
                  xs: 'flex',
                  sm: 'flex'
                },
                gap: {
                  xs: 1.5
                },
              }}>
              <IconButton icons={<BsBellFill />} parentColor='' size='small' />
              {/* <Divider sx={{ borderWidth: '0.5px' }} /> */}
              <LocalizationMenu />
              {/* <Divider sx={{ borderWidth: '0.5px' }} /> */}
              <Profile />
            </Box>
          </WrapperNavbarContentResponsive>
        )
      }
    </AppBar>
  );
};

export default Appbar;