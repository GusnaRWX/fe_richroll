import { Grid } from '@mui/material';
import React, { useState } from 'react';
import { DatePicker, CheckBox } from '../_shared/form';
import dayjs from 'dayjs';
import { CustomModal } from '../_shared/common';
import { postUserSuspendRequested } from '@/store/reducers/slice/account-management/accountManagementSlice';
import { useAppDispatch } from '@/hooks/index';

interface CheckedTableProps {
  id: string;
  checked: boolean;
}

interface BulkSuspendComponentProps {
  totalUser: CheckedTableProps[];
  open: boolean;
  handleCloseModal: React.Dispatch<React.SetStateAction<boolean>>
  handleReset: React.Dispatch<React.SetStateAction<CheckedTableProps[]>>
}


const BulkSuspendComponent = ({ totalUser, open, handleCloseModal, handleReset }: BulkSuspendComponentProps) => {
  const bulkStart = dayjs();
  const [bulkEnd, setBulkEnd] = useState(dayjs());
  const [bulkPermanent, setBulkPermanent] = useState(false);
  const dispatch = useAppDispatch();

  const handleBulk = () => {
    dispatch({
      type: postUserSuspendRequested.toString(),
      payload: {
        body: {
          items: totalUser?.map(val => {
            return {
              id: val.id,
              start: bulkStart,
              end: bulkEnd,
              isPermanent: bulkPermanent
            };
          })
        }
      }
    });
    handleCloseModal(false);
    handleReset([]);
  };
  return (
    <CustomModal
      open={open}
      submitText='Suspend'
      title='Account Suspension'
      width='544px'
      handleClose={() => handleCloseModal(false)}
      handleConfirm={handleBulk}
    >
      <p> You want to suspend the {totalUser?.length} selected account? You can reactivate account later.</p>
      <Grid container justifyContent='space-between'>
        <Grid item md={5.5}>
          <DatePicker
            customLabel='Start of Suspend Period'
            value={bulkStart as unknown as Date}
            disabled
          />
        </Grid>
        <Grid item md={5.5}>
          <DatePicker
            customLabel='End of Suspend Period'
            withAsterisk
            value={bulkEnd as unknown as Date}
            onChange={(date) => setBulkEnd(date)}
            disabled={bulkPermanent}
            disablePast
          />
        </Grid>
      </Grid>
      <Grid container mb='.5rem'>
        <Grid item md={6}>
          <CheckBox
            customLabel='Permanent'
            name='isPermanent'
            checked={bulkPermanent}
            onChange={(e) => setBulkPermanent(e.target.checked)}
          />
        </Grid>
      </Grid>
    </CustomModal>
  );
};

export default BulkSuspendComponent;