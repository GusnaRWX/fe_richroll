import React, { useState } from 'react';
import {
  Grid,
  Collapse,
  TableCell,
  TableRow,
  Button as MuiButton
} from '@mui/material';
import { IconButton } from '@/components/_shared/form';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { BsTrashFill, BsFillEyeFill } from 'react-icons/bs';
import { FiFile, FiDownload } from 'react-icons/fi';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { ConfirmationModal } from '@/components/_shared/common';
import dayjs from 'dayjs';

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 gap: .5rem;
`;

function PayrollAssistantRow (row) {
  const { item, tabValue } = row;
  const [open, setOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const router = useRouter();

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' }, boxShadow: open ? '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)' : 'none' }}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{dayjs(item.start).format('DD/MM/YYYY')} - {dayjs(item.end).format('DD/MM/YYYY')}</TableCell>
        <TableCell>{dayjs(item.createdAt).format('DD/MM/YYYY')}</TableCell>
        <TableCell>{dayjs(item.updatedAt).format('DD/MM/YYYY')}</TableCell>
        <TableCell>
          <ButtonWrapper>
            {tabValue === 0 && (
              <IconButton
                parentColor='#FEE2E2'
                onClick={() => setDeleteConfirmation(true)}
                icons={
                  <BsTrashFill fontSize={20} color='#EF4444'/>
                }
              />
            )}
            {tabValue === 1 && (
              <>
                <MuiButton
                  variant='contained'
                  color='inherit'
                  size='small'
                  sx={{ color: '#111827' }}
                  onClick={() => { console.log(true); }}
                >
                  Disbursement Receipt.pdf &nbsp;<FiDownload fontSize='small' />
                </MuiButton>
                <IconButton
                  parentColor='#E9EFFF'
                  onClick={() => {router.push('/payroll-disbursement/payroll-assistant/view');}}
                  icons={
                    <BsFillEyeFill fontSize={20} color='#223567'/>
                  }
                />
                <IconButton
                  parentColor='#FEE2E2'
                  onClick={() => setDeleteConfirmation(true)}
                  icons={
                    <BsTrashFill fontSize={20} color='#EF4444'/>
                  }
                />
                <IconButton
                  onClick={() => { setOpen(!open); }}
                  icons={
                    open ?
                      <HiChevronUp fontSize={20} color='#223567'/> :
                      <HiChevronDown fontSize={20} color='#223567'/>
                  }
                />
              </>
            )}
          </ButtonWrapper>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout='auto' sx={{ mt: '1rem', mb: '1rem' }} unmountOnExit>
            <Grid container spacing={1} sx={{ mb: '1rem' }}>
              <Grid item>
                <MuiButton
                  variant='outlined'
                  size='small'
                  sx={{ color: '#111827' }}
                  onClick={() => { console.log(true); }}
                >
                  Attendance report &nbsp;<FiFile fontSize='small' />
                </MuiButton>
              </Grid>
              <Grid item>
                <MuiButton
                  variant='outlined'
                  size='small'
                  sx={{ color: '#111827' }}
                  onClick={() => { console.log(true); }}
                >
                  Gross Payroll Report &nbsp;<FiFile fontSize='small' />
                </MuiButton>
              </Grid>
              <Grid item>
                <MuiButton
                  variant='outlined'
                  size='small'
                  sx={{ color: '#111827' }}
                  onClick={() => { console.log(true); }}
                >
                  Net Payroll Report &nbsp;<FiFile fontSize='small' />
                </MuiButton>
              </Grid>
              <Grid item>
                <MuiButton
                  variant='outlined'
                  size='small'
                  sx={{ color: '#111827' }}
                  onClick={() => { console.log(true); }}
                >
                  Bank Transfer_payroll &nbsp;<FiFile fontSize='small' />
                </MuiButton>
              </Grid>
              <Grid item>
                <MuiButton
                  variant='outlined'
                  size='small'
                  sx={{ color: '#111827' }}
                  onClick={() => { console.log(true); }}
                >
                  Receipt Form_Payroll &nbsp;<FiFile fontSize='small' />
                </MuiButton>
              </Grid>
              <Grid item>
                <MuiButton
                  variant='outlined'
                  size='small'
                  sx={{ color: '#111827' }}
                  onClick={() => { console.log(true); }}
                >
                  Cheque_Payroll &nbsp;<FiFile fontSize='small' />
                </MuiButton>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>

      <ConfirmationModal
        open={deleteConfirmation}
        handleClose={() => setDeleteConfirmation(false)}
        title='Delete Payroll Operation from Payroll Assistant?'
        content='You are about to delete this payroll report. This action cannot be undone.'
        withCallback
        noChange={true}
        callback={() => setDeleteConfirmation(false)}
      />
    </React.Fragment>
  );
}

export default PayrollAssistantRow;