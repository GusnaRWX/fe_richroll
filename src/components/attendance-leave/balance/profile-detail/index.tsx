import React, { useState } from 'react';
import {
  Typography,
  Paper,
  Box,
  Avatar,
} from '@mui/material';
import LeaveBalanceProfileDetailTable from './LeaveBalanceProfileDetailTable';
import LeaveBalanceHistoryTable from './LeaveBalanceHistoryTable';
import LeaveBalanceProfileEditModal from './LeaveBalanceProfileEditModal';

import { Button, IconButton } from '@/components/_shared/form';
import { styled as MuiStyled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { ArrowBack } from '@mui/icons-material';
import { HiPencilAlt } from 'react-icons/hi';

const LeaveBalanceProfileDetailComponent = () => {
  const router = useRouter();
  const employeeName = router.query.name;
  const employeePosition = router.query.position;

  const Header = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  });

  const HeaderPageTitle = styled('div')({
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  });

  const NextBtnWrapper = MuiStyled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  });

  const [ModalOpen, setModalOpen] = useState<boolean>(false);
  function HandleOpen() {
    setModalOpen(true);
  }
  function HandleClose() {
    setModalOpen(false);
  }

  return (
    <>
      <Header>
        <HeaderPageTitle>
          <IconButton
            parentColor='primary.500'
            icons={<ArrowBack sx={{ color: '#FFFFFF' }} />}
            onClick={() => {
              router.push('/attendance-leave/balance');
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
              Leave Balance Profile
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
              {employeeName}
            </Typography>
          </div>
        </HeaderPageTitle>
        <NextBtnWrapper>
          <Button
            fullWidth={false}
            size='small'
            label='Edit'
            color='secondary'
            onClick={() => HandleOpen()}
            style={{ color: '#fff', display: 'flex', gap: '8px' }}
            buttonIcon={
              <HiPencilAlt
                style={{
                  color: '#FFFFFF',
                  fontSize: '20px',
                }}
              />
            }
          />
        </NextBtnWrapper>
      </Header>
      <Box
        sx={{ display: 'flex', alignItems: 'center', gap: '16px', mb: '16px' }}
      >
        <Avatar
          src={employeeName?.toString()}
          alt={employeeName?.toString()}
          sx={{
            width: 72,
            height: 72,
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
            {employeeName}
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
            {employeePosition}
          </Typography>
        </div>
      </Box>
      <Typography
        style={{
          color: '#223567',
          fontSize: '18px',
          fontWeight: '700',
          width: '250px',
          marginBottom: '16px',
        }}
      >
        Leave Balance
      </Typography>
      <Paper sx={{ p: '16px', mb: '24px' }}>
        <LeaveBalanceProfileDetailTable tabValue={0} />
      </Paper>
      <Typography
        style={{
          color: '#223567',
          fontSize: '18px',
          fontWeight: '700',
          width: '250px',
          marginBottom: '16px',
        }}
      >
        Leave History
      </Typography>
      <Paper sx={{ p: '16px' }}>
        <LeaveBalanceHistoryTable tabValue={0} />
      </Paper>
      <LeaveBalanceProfileEditModal
        open={ModalOpen}
        handleClose={HandleClose}
        title='Customize Leave Entitlement for Individuals'
      />
    </>
  );
};

export default LeaveBalanceProfileDetailComponent;
