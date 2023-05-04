import React, { FC } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { Image as ImageType } from '@/utils/assetsConstant';

interface AppbarProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  handleDrawerToggle: () => void;
  drawerWidth: number;
}

const WrapperNavbarContent = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'flex-end'
}));

const Appbar: FC<AppbarProps> = (props) => {
  const { drawerWidth } = props;
  return (
    <AppBar
      position='fixed'
      sx={{
        width: {
          sm: `calc(100% - ${drawerWidth}px)`
        },
        ml: {
          sm: `${drawerWidth}px`
        },
        background: '#FFFFFF',
        color: 'primary.main',
        boxShadow: 'none'
      }}
    >
      <WrapperNavbarContent>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Image
            src={ImageType.EXAMPLE_USER}
            alt='example-user'
            height={48}
            width={299}
          />
        </Box>
      </WrapperNavbarContent>
    </AppBar>
  );
};

export default Appbar;