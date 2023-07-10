import React, {useState} from 'react';
import { Button, IconButton, DatePicker, CheckBox } from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { Typography, Box, Paper, Grid } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { CustomModal } from '@/components/_shared/common';
import { ConfirmationModal } from '@/components/_shared/common';
import { useTranslation } from 'react-i18next';

// Icon Import
import { HiPencilAlt } from 'react-icons/hi';
import { FiCopy } from 'react-icons/fi';
import { HiUpload } from 'react-icons/hi';
import { HiOutlineArchive } from 'react-icons/hi';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SatutoryBenefitProfileDetail() {
  const router = useRouter();
  const {t} = useTranslation();
  const tPath = 'satutory_benefit.profile.form_&_detail.';

  const [duplicateConfirmation, setDuplicateConfirmation] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [archiveConfirmation, setArchiveConfirmation] = useState(false);
  const [activateConfirmation, setActivateConfirmation] = useState(false);


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

  function EditActionHandler() {
    router.push('/satutory-benefit/profile/add-new-profile');
  }

  return (
    <>
      <Header>
        <HeaderPageTitle>
          <IconButton
            parentColor='primary.500'
            icons={<ArrowBack sx={{ color: '#FFFFFF' }} />}
            onClick={() => {
              router.push('/satutory-benefit/profile');
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
              {t('satutory_benefit.profile.detail_title')}
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
      <Paper style={{ padding: '21px 32px' }}>
        <Grid container spacing={2}>
          <Grid item xs={2} md={2} lg={2} xl={2}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t('satutory_benefit.profile.table.profile_name')}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={2} md={2} lg={2} xl={2}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}country`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={2} md={2} lg={2} xl={2}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}province`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={2} md={2} lg={2} xl={2}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}city`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={2} md={2} lg={2} xl={2}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}sub_district`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={2} md={2} lg={2} xl={2}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}component.effective_period`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}citation`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}></Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}external_notes`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}internal_notes`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ padding: '21px 32px', marginTop: '32px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography
              style={{
                color: '#223567',
                fontSize: '18px',
                fontWeight: '700',
              }}
            >
              Old Age
            </Typography>
          </Grid>
          <Grid item xs={2} md={2} lg={2} xl={2}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}component.contributor`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={2} md={2} lg={2} xl={2}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}component.rate_type`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={2} md={2} lg={2} xl={2}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}component.flat_rate`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3} xl={3}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}component.amount_cap`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3} xl={3}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}component.effective_period`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      {/* Pop Up Setting ============================== */}
      <ConfirmationModal
        type='delete'
        open={deleteConfirmation}
        handleClose={() => setDeleteConfirmation(false)}
        title={t('satutory_benefit.profile.modal.delete.title')}
        content={t('satutory_benefit.profile.modal.delete.text')}
        withCallback
        noChange={true}
        callback={() => setDeleteConfirmation(false)}
      />
      <ConfirmationModal
        open={duplicateConfirmation}
        handleClose={() => setDuplicateConfirmation(false)}
        title={t('satutory_benefit.profile.modal.duplicate.title')}
        content={t('satutory_benefit.profile.modal.duplicate.text')}
        withCallback
        noChange={true}
        callback={() => setDuplicateConfirmation(false)}
      />
      <CustomModal
        open={archiveConfirmation}
        handleClose={() => setArchiveConfirmation(false)}
        handleConfirm={() => setArchiveConfirmation(false)}
        title={t('satutory_benefit.profile.modal.archive.title')}
        width='40%'
      >
        <Grid>
          <DatePicker customLabel={t('satutory_benefit.profile.modal.archive.input_date')} withAsterisk />
          <CheckBox customLabel={t('satutory_benefit.profile.modal.archive.replace')} />
        </Grid>
      </CustomModal>
      <CustomModal
        open={activateConfirmation}
        handleClose={() => setActivateConfirmation(false)}
        handleConfirm={() => setActivateConfirmation(false)}
        title={t('satutory_benefit.profile.modal.activate.title')}
        width='40%'
      >
        <Grid container p={2} spacing={2}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography>{t('satutory_benefit.profile.modal.activate.text')}</Typography>
          </Grid>
          <Grid item container spacing={2}>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <DatePicker customLabel={t('satutory_benefit.profile.modal.activate.effective_date')} />
            </Grid>
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <DatePicker customLabel={t('satutory_benefit.profile.modal.activate.expiration_date')} />
            </Grid>
          </Grid>
        </Grid>
      </CustomModal>

    </>
  );
}
