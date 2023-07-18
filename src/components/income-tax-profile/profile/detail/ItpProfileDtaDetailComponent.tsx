import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function ItpProfileDtaDetailComponent() {
  const {t} = useTranslation();

  return(
    <>
      <Paper sx={{px:'16px',py:'32px'}}>
        <Grid container spacing={2} rowSpacing={'24px'} >
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t('income_tax_profile.profile.detail.designated_transfer_account.type')}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} xl={4}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t('income_tax_profile.profile.detail.designated_transfer_account.bank')}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8} xl={8}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t('income_tax_profile.profile.detail.designated_transfer_account.bank_account_holders_name')}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} xl={4}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t('income_tax_profile.profile.detail.designated_transfer_account.bank_account_no')}
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
              {t('income_tax_profile.profile.detail.designated_transfer_account.bank_code')}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={5} md={5} lg={5} xl={5}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t('income_tax_profile.profile.detail.designated_transfer_account.branch_code')}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={4} md={4} lg={4} xl={4}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t('income_tax_profile.profile.detail.designated_transfer_account.branch_name')}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8} xl={8}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              {t('income_tax_profile.profile.detail.designated_transfer_account.swift_code')}
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
              {t('income_tax_profile.profile.detail.designated_transfer_account.notes')}
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}