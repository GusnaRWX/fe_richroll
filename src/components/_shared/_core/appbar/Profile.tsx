import React from 'react';
import { Grid, Menu, MenuItem, Typography } from '@mui/material';
import Image from 'next/image';
import { Image as ImageType } from '@/utils/assetsConstant';
import { IconButton } from '@/components/_shared/form';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { clearStorages } from '@/utils/storage';

const Profile = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveToken = async () => {
    clearStorages(['accessToken', 'refreshToken', 'user']);
    signOut({ callbackUrl: '/login' });
    setAnchorEl(null);
    router.push('/login');
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
        <IconButton
          icons={
            open ? <ExpandLess /> : <ExpandMore />
          }
          id='menu-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        />
      </Grid>
      <Menu
        id='menu-basic'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
      >
        <MenuItem onClick={handleRemoveToken}>Log out</MenuItem>
      </Menu>
    </Grid>
  );
};

export default Profile;