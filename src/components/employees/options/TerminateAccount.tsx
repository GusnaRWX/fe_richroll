import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Card, Text, CustomModal } from '@/components/_shared/common';
import { Textarea, Button } from '@/components/_shared/form';
import { BsTrashFill } from 'react-icons/bs';
import { Alert, Box } from '@mui/material';
import { useAppDispatch } from '@/hooks/index';
import { postTerminateEmployeeRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import BasicDatePicker from '@/components/_shared/form/DatePicker';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

const TerminateAccount = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [Open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [date, setDate] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmation = () => {
    const payload = {
      terminateDate: date,
      terminateNote: note,
    };
    dispatch({
      type: postTerminateEmployeeRequested.toString(),
      id: router.query.id,
      payload: payload,
    });
    setNote('');
    setDate('');
    setOpen(false);
  };

  return (
    <Card
      sx={{
        padding: '10px 20px',
        mb: '20px',
        mt: '20px',
        border: '1px solid #DC2626',
      }}
    >
      <Box mb='17px'>
        <Text
          title='Terminate Account'
          color='red.600'
          variant='text-lg'
          fontWeight={700}
          sx={{ display: 'block' }}
        />
        <Text
          title='Permanently termination this account.'
          color='grey.400'
          variant='text-base'
          fontWeight={400}
        />
      </Box>
      <Box mb='17px'>
        <Typography variant='text-base' fontWeight={400} color='grey.400'>
          Once this account is terminated, all of its resources and data will be permanently deleted. Before terminating this account,<br />please make sure.
        </Typography>
      </Box>
      <Button
        label='Terminate'
        size='small'
        sx={{
          color: '#DC2626',
          background: '#FECACA',
          maxWidth: '159px',
          ':hover': {
            color: '#DC2626',
            background: '#FECACA',
          },
        }}
        startIcon={<BsTrashFill size={12} />}
        onClick={handleOpen}
      />

      <CustomModal
        open={Open}
        handleClose={handleClose}
        handleConfirm={handleConfirmation}
        title='Termination Form'
        width='563px'
        ConfirmationDisable={note === '' || date === ''}
      >
        <Box sx={{ my: 2, display:'flex', flexDirection:'column', gap:'24px' }}>
          <Alert
            severity='info'
            sx={{ fontWeight: 'bold', backgroundColor: '#E9EFFF' }}
            icon={<InfoRoundedIcon sx={{ color: '#475780' }} />}
          >
              Important information
            <Text sx={{fontSize:'14px', marginTop:'14px'}}>Employee Payroll Date is 19th March 2023</Text>
          </Alert>
          <Box>
            <BasicDatePicker
              customLabel='Input Effective Termination Date'
              withAsterisk
              disablePast
              onChange={(e) => setDate(dayjs(e).format('DD/MM/YYYY'))}
            />
          </Box>
          <Textarea
            customLabel='Notes'
            placeholder='Input Notes'
            withAsterisk
            minRows={3}
            style={{ resize: 'vertical'}}
            onChange={(e) => setNote(e.target.value)}
            value={note}
          />
        </Box>
      </CustomModal>
    </Card>
  );
};

export default TerminateAccount;
