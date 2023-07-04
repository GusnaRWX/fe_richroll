import React from 'react';
import { Divider, Grid, Menu, MenuItem, Typography, Avatar } from '@mui/material';
import { IconButton } from '@/components/_shared/form';
import { ExpandLess, ExpandMore, } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { Image } from '@/utils/assetsConstant';
import { signOut } from 'next-auth/react';
import { clearStorages } from '@/utils/storage';
import { useAppSelectors } from '@/hooks/index';
import { HiOutlineLogout } from 'react-icons/hi';
import { HiBuildingOffice } from 'react-icons/hi2';
import { Text } from '../../common';
import PersonIcon from '@mui/icons-material/Person';
import { Roles } from '@/utils/roles';
import { getUserData } from '@/utils/helper';

const Profile = () => {
  const router = useRouter();
  const userData = getUserData();
  const { profile } = useAppSelectors(state => state.me);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const checkRoles = Roles?.map(role => profile?.roles?.includes(role) && role);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveToken = async (type?: string) => {
    switch (type) {
      case 'logout':
        clearStorages(['accessToken', 'refreshToken', 'user']);
        signOut({ callbackUrl: '/login' });
        setAnchorEl(null);
        router.push('/login');
        clearStorages(['emp-information', 'emp-personal-information', 'emp-emergency-contact']);
        break;
      case 'profile':
        router.push('/profile');
        setAnchorEl(null);
        break;
      case 'company':
        router.push('/company');
        setAnchorEl(null);
        break;
    }
  };

  return (
    <Grid
      container
      alignItems='center'
      gap={1.2}
    >
      <Grid item>
        <Avatar
          src={userData?.picture && userData?.picture.includes('http') ? userData?.picture : Image.AVATAR_PLACEHOLDER}
          alt='profile_picture'
          sx={{ width: 24, height: 24 }}
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
              Hi, {profile ? profile?.name : ''}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              fontSize={12}
            >
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

          sx: {
            '& .MuiMenuItem-root:hover': {
              backgroundColor: '#223567',
              color: 'white !important'
            }
          }
        }}
      >
        {
          checkRoles?.includes('HR Admin') && (
            <div>
              <MenuItem onClick={() => { handleRemoveToken('profile'); }}>
                <PersonIcon width={20} fontSize='small' />
                <Text variant='text-sm' title='Profile' ml='10px' />
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => { handleRemoveToken('company'); }}>
                <HiBuildingOffice />
                <Text variant='text-sm' title='Change Company' ml='10px' />
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => { handleRemoveToken('logout'); }} >
                <HiOutlineLogout color='#DC2626' fontSize={20} />
                <Text variant='text-sm' title='Logout' color='red.600' ml='10px' />
              </MenuItem>
            </div>
          )
        }
        {
          checkRoles?.includes('Employee') && (
            <div>
              <MenuItem onClick={() => { handleRemoveToken('profile'); }}>
                <Text title='Account Settings' />
              </MenuItem>
              <MenuItem onClick={() => { handleRemoveToken('company'); }}>
                <Text title='Support' />
              </MenuItem>
              <MenuItem onClick={() => { handleRemoveToken('logout'); }}>
                <Text title='Sign Out' />
              </MenuItem>
            </div>
          )
        }
        {
          checkRoles?.includes('Super Admin') && (
            <div>
              <MenuItem onClick={() => { handleRemoveToken('profile'); }}>
                <Text title='Account Settings' />
              </MenuItem>
              <MenuItem onClick={() => { handleRemoveToken('company'); }}>
                <Text title='Support' />
              </MenuItem>
              <MenuItem onClick={() => { handleRemoveToken('logout'); }}>
                <Text title='Sign Out' />
              </MenuItem>
            </div>
          )
        }
      </Menu>
    </Grid>
  );
};

export default Profile;