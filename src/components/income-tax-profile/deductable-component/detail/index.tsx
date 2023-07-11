import React, { useState } from 'react';
import { Button, IconButton } from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { Typography, Box, Paper, Grid } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { ConfirmationModal } from '@/components/_shared/common';
import { useTranslation } from 'react-i18next';

// Icon Import
import { HiPencilAlt } from 'react-icons/hi';
import { FiCopy } from 'react-icons/fi';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ItpDeductableComponentDetailComponent() {
  const router = useRouter();
  const {t} = useTranslation();
  const tPath = 'income_tax_profile.deductable_component.add_new_component.form.';
  const [DeleteConfirmation, setDeleteConfirmation] = useState(false);
  const [DuplicateConfirmation, setDuplicateConfirmation] = useState(false);

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
    router.push('/satutory-benefit/component/add-new-component');
  }

  return (
    <>
      <Header>
        <HeaderPageTitle>
          <IconButton
            parentColor='primary.500'
            icons={<ArrowBack sx={{ color: '#FFFFFF' }} />}
            onClick={() => {
              router.push('/satutory-benefit/component');
            }}
          />
          <div>
            <Typography
              style={{
                color: '#223567',
                fontSize: '20px',
                fontWeight: '700',
                width: '350px',
              }}
            >
              {t('income_tax_profile.deductable_component.detail_title')}
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
            color='rose'
            sx={{ bgcolor: '#FECACA', color: '#DC2626', width: 'fit-content' }}
            startIcon={<DeleteIcon />}
            label={t('button.delete')}
            onClick={() => setDeleteConfirmation(true)}
          />
          <Button
            color='green'
            sx={{ bgcolor: '#8DD0B8', color: '#fff', width: 'fit-content' }}
            startIcon={<HiPencilAlt />}
            label={t('button.edit')}
            onClick={EditActionHandler}
          />
        </NextBtnWrapper>
      </Header>
      <Paper style={{ padding: '20px 48px', marginTop: '32px' }}>
        {/* Basic Detail Section ==================== */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography
              style={{
                color: '#223567',
                fontSize: '18px',
                fontWeight: '700',
              }}
            >
              {t(`${tPath}wizard_option.basic_detail`)}
            </Typography>
          </Grid>
          <Grid item xs={2.5} md={2.5} lg={2.5} xl={2.5}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}create_basic_detail.name`)}
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
              {t(`${tPath}create_basic_detail.country`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={2.5} md={2.5} lg={2.5} xl={2.5}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}create_basic_detail.province`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={2.5} md={2.5} lg={2.5} xl={2.5}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}create_basic_detail.city`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={2.5} md={2.5} lg={2.5} xl={2.5}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}create_basic_detail.sub_district`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}create_basic_detail.citation`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}create_basic_detail.internal_notes`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}create_basic_detail.external_notes`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
        </Grid>
        {/* Transfer Information Section ==================== */}
        <Grid container spacing={2} style={{ marginTop: '32px' }}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography
              style={{
                color: '#223567',
                fontSize: '18px',
                fontWeight: '700',
              }}
            >
              {t(`${tPath}wizard_option.transfer_account`)}
            </Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3} xl={3}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}create_dta.bank`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={9} md={9} lg={9} xl={9}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}create_dta.bank_account_holders_name`)}
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
              {t(`${tPath}create_dta.bank_account_no`)}
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
              {t(`${tPath}create_dta.bank_code`)}
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
              {t(`${tPath}create_dta.branch_code`)}
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
              {t(`${tPath}create_dta.branch_name`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={9} md={9} lg={9} xl={9}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}create_dta.swift_code`)}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
        </Grid>
        {/* Employee Section ==================== */}
        <Grid container spacing={2} style={{ marginTop: '32px' }}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography
              style={{
                color: '#223567',
                fontSize: '18px',
                fontWeight: '700',
              }}
            >
              Marital Status
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6} xl={6}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t(`${tPath}rates.fu_condition`)} - 1
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
              Amounnt
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <ConfirmationModal
        type='delete'
        open={DeleteConfirmation}
        handleClose={() => setDeleteConfirmation(false)}
        title='Delete Data Entry'
        content='You are about to delete this statutory benefit component. This action cannot be undone.'
        withCallback
        noChange={true}
        callback={() => setDeleteConfirmation(false)}
      />
      <ConfirmationModal
        open={DuplicateConfirmation}
        handleClose={() => setDuplicateConfirmation(false)}
        title='Confirmation'
        content='Are you sure you want to duplicate this profile ?'
        withCallback
        noChange={true}
        callback={() => setDuplicateConfirmation(false)}
      />
    </>
  );
}
