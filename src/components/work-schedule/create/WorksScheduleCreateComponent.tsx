import React, { useState } from 'react';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { Card, Typography, Button as MuiButton, Tab, Tabs, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { IconButton } from '@/components/_shared/form';
import ConfirmationModal from '@/components/_shared/common/ConfirmationModal';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { postWorkScheduleRequested, clearState } from '@/store/reducers/slice/company-management/work-schedule/workScheduleSlice';

const WorkScheduleCreateForm = dynamic(() => import('./WorkScheduleCreateForm'), {
  ssr: false
});

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
 justify-content: flex-start;
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

const ContentWrapper = styled(Card)(({
  padding: '2rem'
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

function WorksScheduleCreateComponent() {
  const [value, setValue] = useState(0);
  const [leave, setLeave] = useState(false);
  const [data, setData] = useState({});
  const [isValid, setIsValid] = useState(false);
  const dispatch = useAppDispatch();
  const { workSchedule } = useAppSelectors(state => state);
  const router = useRouter();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const handleOpen = () => {
    setLeave(true);
  };

  const handleClose = () => {
    setLeave(false);
  };

  const handleSetValid = (val: boolean) => {
    setIsValid(val);
  };

  const resetState = () => dispatch({ type: clearState.toString() });

  const handleSave = () => {
    if (isValid) {
      const payload = {
        ...data,
        grossHours: workSchedule?.grossHour,
        netHours: workSchedule?.netHour
      };
      dispatch({
        type: postWorkScheduleRequested.toString(),
        payload: payload
      });
    }
  };
  return (
    <>
      <TopWrapper>
        <BackWrapper >
          <IconButton
            parentColor='primary.500'
            icons={
              <ArrowBack sx={{ color: '#FFFFFF' }} />
            }
            onClick={() => {
              router.push('/company-management/employees');
              resetState();
            }}
          />
          <Typography component='h3' fontWeight='bold'>Create Work Schedule Profile</Typography>
        </BackWrapper>
        <ButtonWrapper>
          <MuiButton variant='outlined' size='small' onClick={() => handleOpen()}>Cancel</MuiButton>
          <MuiButton variant='contained' onClick={handleSave} disabled={!isValid} size='small' color='primary'>Save</MuiButton>
        </ButtonWrapper>
      </TopWrapper>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab sx={{ textTransform: 'none' }} label='Schedule Profile' {...a11yProps(0)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <WorkScheduleCreateForm setData={setData} setIsValid={handleSetValid} />
          </TabPanel>
        </Box>
      </ContentWrapper>
      <ConfirmationModal
        open={leave}
        handleClose={handleClose}
        title='Are you sure you want to leave?'
        content='Any unsaved changes will be discarded. This cannot be undone'
        withCallback
        callback={resetState}
      />
    </>
  );
}

export default WorksScheduleCreateComponent;