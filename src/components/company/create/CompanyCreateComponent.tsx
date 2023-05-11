import React, {useState, useRef} from 'react';
import {
  Box,
  BoxProps,
  AppBar,
  Toolbar,
  Card,
  CardProps,
  Divider,
  Typography,
  Tab,
  Tabs
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
// import { useRouter } from 'next/router';
import { CompanyCreate } from '@/types/component';
import { Image as ImageType } from '@/utils/assetsConstant';
import { IconButton } from '@/components/_shared/form';
import { BsBellFill } from 'react-icons/bs';
import LocalizationMenu from '@/components/_shared/_core/localization/Index';
import Profile from '@/components/_shared/_core/appbar/Profile';
import CompanyInformationForm from './CompanyInformationForm';
import CompanyBankForm from './CompanyBankForm';

const WrapperAuth = styled(Box)<BoxProps>(({ theme }) => ({
  background: theme.palette.secondary[100],
  minHeight: '100vh'
}));

const WrapperCard = styled(Card)<CardProps>(() => ({
  paddingTop: '100px',
  background: 'none',
  borderRadius: 'none',
  boxShadow: 'none',
  paddingLeft: '135px',
  paddingRight: '135px'
}));

const WrapperCardContent = styled(Box)<BoxProps>(() => ({
  borderRadius: '8px',
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.05)',
  background: 'white',
  padding: '24px'
}));

const WrapperNavbarContent = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {
        value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )
      }
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const Navbar = () => {
  return (
    <AppBar
      component='nav'
      sx={{
        background: '#FFFFFF',
        color: 'primary.main',
      }}
    >
      <WrapperNavbarContent>
        <Box>
          <Image
            src={ImageType.KAYAROLL_LOGO}
            width={151}
            height={40}
            alt='kayaroll'
          />
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: { sm: 1 } }}>
          <IconButton icons={<BsBellFill />} parentColor='' size='small' />
          <Divider sx={{ borderWidth: '0.5px' }} />
          <LocalizationMenu />
          <Divider sx={{ borderWidth: '0.5px' }} />
          <Profile />
        </Box>
      </WrapperNavbarContent>
    </AppBar>
  );
};

const CompanyCreateComponent = ({ companyType, companySector, bank, paymentMethod }: CompanyCreate.Component) => {
  // const router = useRouter();
  const [value, setValue] = useState(0);
  const informationRef = useRef<HTMLFormElement>(null);
  const bankRef = useRef<HTMLFormElement>(null);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Navbar />
      <WrapperAuth>
        <WrapperCard>
          <Typography
            variant='text-lg'
            component='div'
            sx={{ fontWeight: 700, mb: '24px' }}
          >
            Create Company Profile
          </Typography>
          <WrapperCardContent>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
                  <Tab sx={{ textTransform: 'none' }} label='Company Information' {...a11yProps(0)} />
                  <Tab sx={{ textTransform: 'none' }} label='Bank and Payroll Information' {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <CompanyInformationForm companyType={companyType} companySector={companySector} refProp={informationRef}/>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <CompanyBankForm bank={bank} paymentMethod={paymentMethod} refProp={bankRef}/>
              </TabPanel>
            </Box>
          </WrapperCardContent>
        </WrapperCard>

      </WrapperAuth>
    </>
  );
};

export default CompanyCreateComponent;