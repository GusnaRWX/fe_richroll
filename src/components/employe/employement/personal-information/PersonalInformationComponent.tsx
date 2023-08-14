import { Box, Card, Tab, Tabs } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import { Button } from '@/components/_shared/form';
import { Text } from '@/components/_shared/common';
import { FiEdit } from 'react-icons/fi';
import PersonalInformationTabComponent from './PersonalInformationTabComponent';
import PersonalInformationPersonalTabComponent from './PersonalInformationPersonalTabComponent';
import PersonalInformationEmergencyTabComponent from './PersonalInformationEmergencyTabComponent';
import PersonalWorkSchedule from './PersonalWorkSchedule';
import { useAppSelectors } from '@/hooks/index';
import { getSelfService } from '@/utils/helper';
import { useRouter } from 'next/router';

const TopWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 width: 100%;
 margin-bottom: 1rem;
`;

const BackWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 gap: 1rem;
`;

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-end;
 gap: 1rem;
 margin-top: 10px;
 margin-bottom: 1rem;
`;

const TitleWrapper = styled.div`
 display: flex;
 flex-direction: column;
`;

const ContentWrapper = styled(Card)(({
  padding: '2rem'
}));

interface TabPanelProps {
  children?: ReactNode,
  index: number;
  value: number
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
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

const PersonalInformationComponent = () => {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleChangePage = (path) => {
    router.push(path);
  };
  const { me: { profile } } = useAppSelectors(state => state);
  return (
    <>
      <TopWrapper>
        <BackWrapper>
          <TitleWrapper>
            <Text
              title='Employee Profile'
              fontWeight={700}
              fontSize='20px'
              color='primary.500'
            />
            <Text title={profile?.name} fontSize='14px' color='grey.600' fontWeight={400} />
          </TitleWrapper>
        </BackWrapper>
        {
          getSelfService() && (
            <ButtonWrapper>
              <Button
                color='secondary'
                label='Edit'
                startIcon={
                  <FiEdit
                    size={12}
                    color='#FFF'
                  />
                }
                sx={{ color: 'white' }}
                size='small'
                onClick={() => {handleChangePage('/employe/employement/profile-information/edit');}}
              />
            </ButtonWrapper>
          )
        }
      </TopWrapper>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab sx={{ textTransform: 'none' }} label='Employee Information' {...a11yProps(0)} />
              <Tab sx={{ textTransform: 'none' }} label='Personal Information' {...a11yProps(1)} />
              <Tab sx={{ textTransform: 'none' }} label='Emergency Contact' {...a11yProps(2)} />
              <Tab sx={{ textTransform: 'none' }} label='Work Schedule' {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <PersonalInformationTabComponent />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PersonalInformationPersonalTabComponent />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <PersonalInformationEmergencyTabComponent />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <PersonalWorkSchedule />
          </TabPanel>
        </Box>
      </ContentWrapper>
    </>
  );
};

export default PersonalInformationComponent;