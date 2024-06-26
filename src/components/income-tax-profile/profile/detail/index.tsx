import React, {useState} from 'react';
import { Button, IconButton, DatePicker, CheckBox } from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { Typography, Box, Paper, Grid, Tabs, Tab } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { CustomModal, ConfirmationModal } from '@/components/_shared/common';
import { useTranslation } from 'react-i18next';

// Icon Import
import { HiPencilAlt, HiUpload, HiOutlineArchive } from 'react-icons/hi';
import { FiCopy } from 'react-icons/fi';
import DeleteIcon from '@mui/icons-material/Delete';

import ItpProfileBasicDetailDetailComponent from './ItpProfileBasicDetailDetailComponent';
import ItpProfileDeductableComponentDetailComponent from './ItpProfileDeductableComponentDetailComponent';
import ItpProfileIncomeTaxRateDetailComponent from './ItpProfileIncomeTaxRateDetailComponent';
import ItpProfileIncomeTaxMultiplier from './ItpProfileIncomeTaxMultiplier';
import ItpProfileDtaDetailComponent from './ItpProfileDtaDetailComponent';

export default function ItpProfileDetailComponent() {
  const router = useRouter();
  const {t} = useTranslation();

  const [duplicateConfirmation, setDuplicateConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [archiveConfirmation, setArchiveConfirmation] = useState(false);
  const [activateConfirmation, setActivateConfirmation] = useState(false);
  const [value, setValue] = useState(0);

  const Header = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  });

  const HeaderPageTitle = styled('div')({
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  });

  const NextBtnWrapper = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '12px',
  });

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
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
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function EditActionHandler() {
    router.push(`/income-tax-profile/profile/edit/1?status=${value}`); // -> change to profile id
  }

  return (
    <>
      <Header>
        <HeaderPageTitle>
          <IconButton
            parentColor='primary.500'
            icons={<ArrowBack sx={{ color: '#FFFFFF' }} />}
            onClick={() => {
              router.push('/income-tax-profile/profile');
            }}
          />
          <div>
            <Typography
              style={{
                color: '#223567',
                fontSize: '20px',
                fontWeight: '700',
                width: '250px',
              }}
            >
              {t('income_tax_profile.profile.detail.main.title')}
            </Typography>
            <Typography
              style={{
                color: '#223567',
                fontSize: '14px',
                fontWeight: '400',
                width: '250px',
                marginTop: '-3px',
              }}
            >
              Profile dudul kanabawi
            </Typography>
          </div>
        </HeaderPageTitle>
        <NextBtnWrapper>
          <Button
            color='red'
            sx={{ bgcolor: '#FECACA', color: '#DC2626', width: 'fit-content' }}
            startIcon={<DeleteIcon />}
            label={t('button.delete')}
            onClick={() => setDeleteConfirmation(true)}
          />
          <Button
            color='inherit'
            sx={{
              bgcolor: '#fff',
              color: '#223567',
              width: 'fit-content',
              border: '1px solid #D1D5DB',
              boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
            }}
            startIcon={<FiCopy />}
            label={t('button.duplicate')}
            onClick={() => setDuplicateConfirmation(true)}
          />
          <Button
            color='orange'
            sx={{ bgcolor: '#FFEDD5', color: '#F97316', width: 'fit-content' }}
            startIcon={<HiOutlineArchive />}
            label={t('button.archive')}
            onClick={() => setArchiveConfirmation(true)}
          />
          <Button
            color='green'
            sx={{ bgcolor: '#8DD0B8', color: '#fff', width: 'fit-content' }}
            startIcon={<HiPencilAlt />}
            label={t('button.edit')}
            onClick={EditActionHandler}
          />
          <Button
            color='lightBlue'
            sx={{ bgcolor: '#223567', color: '#fff', width: 'fit-content' }}
            startIcon={<HiUpload />}
            label={t('button.activate')}
            onClick={() => setActivateConfirmation(true)}
          />
        </NextBtnWrapper>
      </Header>
      <Paper sx={{ width: '100%', p: '20px 32px' }}>
        <Box sx={{p:'16px', pt:'0px'}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider',  }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
              <Tab label={t('income_tax_profile.profile.detail.tab.basic_detail')} {...a11yProps(0)} />
              <Tab label={t('income_tax_profile.profile.detail.tab.deductible_component')} {...a11yProps(1)} />
              <Tab label={t('income_tax_profile.profile.detail.tab.income_tax_rate')} {...a11yProps(2)} />
              <Tab label={t('income_tax_profile.profile.detail.tab.income_tax_multiplier')} {...a11yProps(3)} />
              <Tab label={t('income_tax_profile.profile.detail.tab.designated_transfer_account')} {...a11yProps(4)} />
            </Tabs>
          </Box>
        </Box>
        <TabPanel value={value} index={0}>
          <ItpProfileBasicDetailDetailComponent />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ItpProfileIncomeTaxRateDetailComponent />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ItpProfileIncomeTaxMultiplier />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <ItpProfileDtaDetailComponent/>
        </TabPanel>
      </Paper>

      <TabPanel value={value} index={1}>
        <ItpProfileDeductableComponentDetailComponent/>
      </TabPanel>

      {/* Pop Up Setting ============================== */}
      <ConfirmationModal
        type='delete'
        open={deleteConfirmation}
        handleClose={() => setDeleteConfirmation(false)}
        title={t('income_tax_profile.profile.modal.delete.title')}
        content={t('income_tax_profile.profile.modal.delete.description')}
        withCallback
        noChange={true}
        callback={() => setDeleteConfirmation(false)}
      />
      <ConfirmationModal
        open={duplicateConfirmation}
        handleClose={() => setDuplicateConfirmation(false)}
        title={t('income_tax_profile.profile.modal.duplicate.title')}
        content={t('income_tax_profile.profile.modal.duplicate.description')}
        withCallback
        noChange={true}
        callback={() => setDuplicateConfirmation(false)}
      />
      <CustomModal
        open={archiveConfirmation}
        handleClose={() => setArchiveConfirmation(false)}
        handleConfirm={() => setArchiveConfirmation(false)}
        title={t('income_tax_profile.profile.modal.archive.title')}
        width='40%'
      >
        <Grid>
          <DatePicker customLabel={t('income_tax_profile.profile.modal.archive.description')} withAsterisk />
          <CheckBox customLabel={t('income_tax_profile.profile.modal.archive.checkbox')} />
        </Grid>
      </CustomModal>
      <CustomModal
        open={activateConfirmation}
        handleClose={() => setActivateConfirmation(false)}
        handleConfirm={() => setActivateConfirmation(false)}
        title={t('income_tax_profile.profile.modal.activate.title')}
        width='40%'
      >
        <Grid container p={2} spacing={2}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography>{t('income_tax_profile.profile.modal.activate.description')}</Typography>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <DatePicker customLabel={t('income_tax_profile.profile.modal.activate.effective_date')} />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <DatePicker customLabel={t('income_tax_profile.profile.modal.activate.expiration_date')} />
            </Grid>
          </Grid>
        </Grid>
      </CustomModal>

    </>
  );
}
