import PersonIcon from '@mui/icons-material/Person';
import { IconType } from 'react-icons/lib';
import { SvgIconComponent } from '@mui/icons-material';
import { HiBuildingOffice } from 'react-icons/hi2';
import { HiOutlineLogout } from 'react-icons/hi';

type Menu = {
  // onClick?: (_type: string) => void;
  title: {
    text: string;
    color?: string;
  };
  icon?: {
    icon: IconType | SvgIconComponent,
    color?: string;
    size?: string | number;
    width?: string | number;
  }
}

interface RolesType {
  key: string,
  menu: Array<Menu>
}

/**
 * List all the roles
 */
export const Roles = ['HR Admin', 'Employee'];

export const renderProfile: RolesType[] = [
  {
    key: 'HR Admin',
    menu: [
      {
        title: {
          text: 'Profile'
        },
        icon: {
          icon: PersonIcon,
          width: 20,
          size: 'small'
        }
      },
      {
        title: {
          text: 'Change Company'
        },
        icon: {
          icon: HiBuildingOffice,
        }
      },
      {
        title: {
          text: 'Logout',
          color: 'red.600'
        },
        icon: {
          icon: HiOutlineLogout,
          color: '#DC2626',
          size: 20
        }
      }
    ]
  }
];