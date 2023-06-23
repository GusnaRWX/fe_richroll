import React, { useState, useEffect } from 'react';
import { CustomModal } from '../_shared/common';
import {
  Avatar,
  Typography,
  Grid
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import styled from '@emotion/styled';
import { Textarea, Select } from '../_shared/form';
import { Image as ImageType } from '@/utils/assetsConstant';

const AvatarWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 margin-bottom: 1rem;
 margin-top: 1rem;
 border-bottom: 1px solid #D1D5DB;
 gap: 1rem;
 padding-bottom: 1rem;
`;

const NameWrapper = styled.div`
 display: flex;
 flex-direction: column;
`;

interface EditProps {
  editOpen: boolean;
  handleEditClose: () => void;
  handleConfirm: () => void;
}

function OvertimeSummaryEditForm({editOpen, handleEditClose, handleConfirm}: EditProps) {
  const [hydrated, setHaydrated] = useState(false);

  useEffect(() => {
    setHaydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <CustomModal
      open={editOpen}
      handleClose={handleEditClose}
      title='Edit Overtime Entry'
      width='650px'
      handleConfirm={handleConfirm}
      submitText='Save'
    >
      <AvatarWrapper>
        <Avatar
          src={ImageType.AVATAR_PLACEHOLDER}
          alt='image'
          sx={{
            width: '74px',
            height: '74px'
          }}
        />
        <NameWrapper>
          <Typography fontSize='18px'>Ratna</Typography>
          <Typography fontSize='14px'>Assistant Manager</Typography>
        </NameWrapper>
      </AvatarWrapper>
      <Grid container mb='1rem' spacing={2}>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <Typography mb='7px' fontSize='16px'>Overtime From</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              sx={{
                '& .MuiOutlinedInput-input': {
                  padding: '8.5px 14px',
                },
                width: '100%'
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <Typography mb='7px' fontSize='16px'>Overtime From</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              sx={{
                '& .MuiOutlinedInput-input': {
                  padding: '8.5px 14px',
                },
                width: '100%'
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <Select
            fullWidth
            name='multiplier'
            value={''}
            size='small'
            customLabel='Multiplier'
            options={[
              {label: '0.0x', value: '0.0x'},
              {label: '0.5x', value: '0.5x'},
              {label: '1.0x', value: '1.0x'},
              {label: '1.5x', value: '1.5x'},
              {label: '2.0x', value: '2.0x'},
              {label: '2.5x', value: '2.5x'},
              {label: '3.0x', value: '3.0x'}
            ]}
          />
        </Grid>
      </Grid>
      <Grid container mb='1rem'>
        <Grid xs={12}>
          <Textarea
            name='notes'
            maxRows={7}
            minRows={7}
            customLabel='Note'
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
}

export default OvertimeSummaryEditForm;