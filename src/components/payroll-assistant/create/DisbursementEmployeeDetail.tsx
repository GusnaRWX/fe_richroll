import React from 'react';
import { CustomModal, Text } from '@/components/_shared/common';
import { Box, Grid, Button } from '@mui/material';

interface DisbursementEmployeeDetailProps {
  open: boolean;
  handleClose: () => void;
}

const DisbursementEmployeeDetail = ({ open, handleClose }: DisbursementEmployeeDetailProps) => {
  return (
    <CustomModal
      open={open}
      title='Employee Disbursement Details'
      handleClose={handleClose}
      width='554px'
      withFooter={false}
    >
      <Grid
        container
        justifyContent='space-between'
        alignItems='baseline'
        mb='20px'
        mt='10px'
      >
        <Grid item md={4}>
          <div>
            <Text title='Employee Name' fontSize='14px' />
          </div>
          <Text title='Asep Galon' fontSize='14px' color='grey.600' />
        </Grid>
        <Grid item md={4}>
          <div>
            <Text title='Position &emsp; &emsp;' fontSize='14px' />
          </div>
          <Text title='Manager Fishing' fontSize='14px' color='grey.600' />
        </Grid>
        <Grid item md={4}>
          <div>
            <Text title='Department' fontSize='14px' />
          </div>
          <Text title='Cibaduyut' fontSize='14px' color='grey.600' />
        </Grid>
      </Grid>
      <Box mb='20px'>
        <Text title='Net Income' color='primary' fontWeight={700} fontSize='16px' />
        <Grid
          container
          justifyContent='space-between'
          alignItems='baseline'
        >
          <Grid item md={4}>
            <div>
              <Text title='Amount' fontSize='14px' />
            </div>
            <Text title='Rp.2000' fontSize='14px' color='grey.600' />
          </Grid>
          <Grid item md={4}>
            <div>
              <Text title='Transfer Account' fontSize='14px' />
            </div>
            <Text title='088123' fontSize='14px' color='grey.600' />
          </Grid>
          <Grid item md={4}>
            <div>
              <Text title='Bank Name' fontSize='14px' />
            </div>
            <Text title='Mandiri' fontSize='14px' color='grey.600' />
          </Grid>
        </Grid>
      </Box>
      <div>
        <Text title='Total Disbursement Amount' color='primary' fontWeight={700} fontSize='18px' />
        <Text title='Rp.30.000.000' color='primary' fontWeight={700} fontSize='18px' />
      </div>
      <Grid container justifyContent='flex-end' alignItems='flex-end'>
        <Grid item>
          <Button variant='outlined' onClick={handleClose} size='small'>Cancel</Button>
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default DisbursementEmployeeDetail;