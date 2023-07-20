import React, { useState } from 'react';
import { Typography, Card, Grid, Box, Button as MuiButton, Tab, Tabs } from '@mui/material';
import { DateRangePicker, Input } from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { Add } from '@mui/icons-material';
import PayrollAssistantTable from './PayrollAssistantTable';
import { CustomModal } from '@/components/_shared/common';
import { getCompanyData } from '@/utils/helper';
import { useAppDispatch } from '@/hooks/index';
import { postPayrollRequested } from '@/store/reducers/slice/payroll/payrollSlice';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const ButtonWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '.1rem'
}));

const ContentWrapper = styled(Card)(({
  padding: '1rem'
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

function PayrollAssistantComponent() {
  const dispatch = useAppDispatch();
  const companyData = getCompanyData();
  const [value, setValue] = useState(0);
  const [date, setDate] = useState<Array<Date>>([]);
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const {t} = useTranslation();
  const t_key = 'payroll_and_disbursement.payroll_assistant';
  const t_popupKey = 'payroll_and_disbursement.payroll_assistant.popup';
  const t_tabPanel = 'payroll_and_disbursement.payroll_assistant.table.tab_panel';

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    const [start, end] = date;
    dispatch({
      type: postPayrollRequested.toString(),
      payload: {
        data: {
          companyID: companyData?.id,
          name: name,
          start: dayjs(start).toISOString(),
          end: dayjs(end).toISOString()
        },
        isAttendance: false
      }
    });
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='h5' color='primary.main'>{t(`${t_key}.title`)}</Typography>
          <Typography variant='text-base' color='#4B5563'>{t(`${t_key}.sub_title`)}</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='contained'
              size='small'
              color='secondary'
              sx={{ color: 'white' }}
              onClick={() => { setOpen(true); }}
            ><Add fontSize='small' />&nbsp; {t(`button.create_new_payroll`)}</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab sx={{ textTransform: 'none' }} label={t(`${t_tabPanel}.in_progress`)} {...a11yProps(0)} />
              <Tab sx={{ textTransform: 'none' }} label={t(`${t_tabPanel}.completed`)} {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <PayrollAssistantTable tabValue={value}/>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PayrollAssistantTable tabValue={value}/>
          </TabPanel>
        </Box>
      </ContentWrapper>

      <CustomModal
        open={open}
        handleClose={handleClose}
        title={t(`${t_popupKey}.create.title`)}
        width='543px'
        handleConfirm={handleConfirm}
        submitText='Submit'
      >
        <Grid container mt='1rem' mb='1rem'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Input
              name='nameEvent'
              withAsterisk
              customLabel={t(`${t_popupKey}.create.name_input_label`)}
              placeholder={t(`${t_popupKey}.create.name_input_placeholder`)}
              size='small'
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mb='1rem'>
          <Grid item xs={12}>
            <DateRangePicker
              withAsterisk
              customLabelStart={t(`${t_popupKey}.create.start_date`)}
              customLabelEnd={t(`${t_popupKey}.create.end_date`)}
              onChange={(v) => setDate(v)}
            />
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
}

export default PayrollAssistantComponent;