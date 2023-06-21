import React from 'react';
import { Button, IconButton } from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { Typography, Box, Paper, Grid } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';

// Icon Import
import { HiPencilAlt } from 'react-icons/hi';
import { FiCopy } from 'react-icons/fi';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SatutoryBenefitComponentDetail() {
  const router = useRouter();

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
              router.push('/satutory-benefit/component');
            }}
          />
          <Typography
            style={{
              color: '#223567',
              fontSize: '20px',
              fontWeight: '700',
              width: '350px',
            }}
          >
            Statutory Benefit Component
          </Typography>
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
            label='Duplicate'
          />
          <Button
            color='rose'
            sx={{ bgcolor: '#FECACA', color: '#DC2626', width: 'fit-content' }}
            startIcon={<DeleteIcon />}
            label='Delete'
          />
          <Button
            color='green'
            sx={{ bgcolor: '#8DD0B8', color: '#fff', width: 'fit-content' }}
            startIcon={<HiPencilAlt />}
            label='Edit'
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
              Basic Detail
            </Typography>
          </Grid>
          <Grid item xs={2.5} md={2.5} lg={2.5} xl={2.5}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              Component Name
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
              Country
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
              Province
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
              City
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
              Sub-Distric
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
              Citation
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
              Internal Notes
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
              External Notes
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
        </Grid>
        {/* Employee Section ==================== */}
        <Grid container spacing={2} style={{marginTop: '32px'}}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography
              style={{
                color: '#223567',
                fontSize: '18px',
                fontWeight: '700',
              }}
            >
              Employee
            </Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              Rate Types
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
              Flat Rate
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
              Amount Cap
            </Typography>
            <Typography component='div' variant='text-sm' color='#4B5563'>
              -
            </Typography>
          </Grid>
        </Grid>
        {/* Transfer Information Section ==================== */}
        <Grid container spacing={2} style={{marginTop: '32px'}}>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Typography
              style={{
                color: '#223567',
                fontSize: '18px',
                fontWeight: '700',
              }}
            >
              Transfer Information
            </Typography>
          </Grid>
          <Grid item xs={3} md={3} lg={3} xl={3}>
            <Typography
              component='div'
              variant='text-sm'
              color='#9CA3AF'
              mb='8px'
            >
              Bank
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
              Bank Account Holder's Name
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
              Bank Account No
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
              Bank Code
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
              Branch Code
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
              Branch Name
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
              Swift Code
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
