import React from 'react';
import {Grid, Menu, MenuItem, Typography} from '@mui/material';
import Image from 'next/image';
import { Image as ImageType } from '@/utils/assetsConstant';
import { IconButton } from '@/components/_shared/form';
import ExpandLess from '@mui/icons-material/ExpandLess';
import {useRouter} from 'next/router';

const Profile = () => {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/login');
    setAnchorElUser(null);
  };

  return (
    <Grid
      container
      alignItems='center'
      gap={1.2}
    >
      <Grid item>
        <Image
          src={ImageType.EXAMPLE_USER}
          height={32}
          width={32}
          alt='current-user'
        />
      </Grid>
      <Grid item>
        <Grid
          container
          direction='column'
        >
          <Grid item>
            <Typography
              fontSize={14}
              fontWeight={700}
            >
              Hi, Budi
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              fontSize={12}
            >
              HR Admin
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <IconButton icons={<ExpandLess />} onClick={handleOpenUserMenu} />
        <Menu
          sx={{ mt: '45px' }}
          id='menu-appbar'
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign='center'>logout</Typography>
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  );
};

export default Profile;