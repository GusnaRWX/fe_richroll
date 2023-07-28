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
import { BsTrashFill } from 'react-icons/bs';
import { FiDownload } from 'react-icons/fi';
import styled from '@emotion/styled';
import { ConfirmationModal } from '@/components/_shared/common';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { ifEmptyReplace, ifThenElse } from '@/utils/helper';
import { useAppDispatch } from '@/hooks/index';
import { deletePayrollRequested, deletePayrollAssistRequested } from '@/store/reducers/slice/payroll/payrollSlice';

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 gap: .5rem;
`;

const AttendanceType = styled.div`
 background: #E0F2FE;
 border-radius: 4px;
 color: #075985;
 padding: 3px 12px;
 text-align: center;
 display: inline-block;
`;

const GrossType = styled.div`
 background: #FEF9C3;
 border-radius: 4px;
 color: #854D0E;
 padding: 3px 12px;
 text-align: center;
 display: inline-block;
`;

const NetType = styled.div`
 background: #DCFCE7;
 border-radius: 4px;
 color: #166534;
 padding: 3px 12px;
 text-align: center;
 display: inline-block;
`;

const DisbursementType = styled.div`
 background: #FFEDD5;
 border-radius: 4px;
 color: #9A3412;
 padding: 3px 12px;
 text-align: center;
 display: inline-block;
`;

function PayrollAssistantRow (row) {
  const dispatch = useAppDispatch();
  const { item, tabValue } = row;
  const [open, setOpen] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ id: 0, open: false });
  const {t} = useTranslation();
  const t_popupKey = 'payroll_and_disbursement.payroll_assistant.popup';

  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };

  const deletePayroll = (Id: string | number) => {
    if (tabValue === 0) {
      dispatch({
        type: deletePayrollRequested.toString(),
        payload: Id
      });
    } else {
      dispatch({
        type: deletePayrollAssistRequested.toString(),
        payload: Id
      });
    }
  };

  const handleDeleteOpen = (id) => {
    setDeleteConfirmation({ id: id, open: true });
  };

  const handleDeleteClose = () => {
    setDeleteConfirmation({ id: 0, open: false });
  };

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
                onClick={() => handleDeleteOpen(item?.id)}
                icons={
                  <BsTrashFill fontSize={20} color='#EF4444'/>
                }
              />
            )}
            {tabValue === 1 && (
              <>
                <IconButton
                  parentColor='#FEE2E2'
                  onClick={() => handleDeleteOpen(item?.id)}
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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, background: '#F9FAFB' }} colSpan={5}>
          <Collapse in={open} timeout='auto' sx={{ mt: '1rem', mb: '1rem' }} unmountOnExit>
            <Grid container spacing={1} sx={{ mb: '.5rem', pb: '.5rem', borderBottom: '1px solid #EFEFEF' }}>
              <Grid item sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center'}} xs={2.2}>
                {item?.attendance?.name}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={2}>
                {dayjs(item?.attendance?.start).format('DD/MM/YYYY')} - {dayjs(item?.attendance?.end).format('DD/MM/YYYY')}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={2.3}>
                <AttendanceType>Attendance Report</AttendanceType>
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={1.5}>
                {dayjs(item?.attendance?.createdAt).format('DD/MM/YYYY')}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={1.5}>
                {dayjs(item?.attendance?.updatedAt).format('DD/MM/YYYY')}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={2.5}>
                <MuiButton
                  variant='contained'
                  color='inherit'
                  size='small'
                  sx={{ color: '#111827' }}
                  onClick={() => { openInNewTab(item?.attendance?.attachment?.link); }}
                >
                  {item?.attendance?.attachment?.filename} &nbsp;<FiDownload fontSize='small' />
                </MuiButton>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mb: '.5rem', pb: '.5rem', borderBottom: '1px solid #EFEFEF' }}>
              <Grid item sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center'}} xs={2.2}>
                {ifEmptyReplace(item?.gross?.name, '-')}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={2}>
                {ifThenElse(item?.gross?.start, `${dayjs(item?.gross?.start).format('DD/MM/YYYY')} - ${dayjs(item?.gross?.end).format('DD/MM/YYYY')}`, '-')}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={2.3}>
                <GrossType>Gross Payroll Report</GrossType>
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={1.5}>
                {ifThenElse(item?.gross?.createdAt, dayjs(item?.gross?.createdAt).format('DD/MM/YYYY'), '-')}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={1.5}>
                {ifThenElse(item?.gross?.updatedAt, dayjs(item?.gross?.updatedAt).format('DD/MM/YYYY'), '-')}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={2.5}>
                <MuiButton
                  variant='contained'
                  color='inherit'
                  size='small'
                  sx={{ color: '#111827' }}
                  onClick={() => { openInNewTab(item?.gross?.attachment?.link); }}
                >
                  {item?.gross?.attachment?.filename} &nbsp;<FiDownload fontSize='small' />
                </MuiButton>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mb: '.5rem', pb: '.5rem', borderBottom: '1px solid #EFEFEF' }}>
              <Grid item sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center'}} xs={2.2}>
                {ifEmptyReplace(item?.net?.name, '-')}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={2}>
                {ifThenElse(item?.net?.start, `${dayjs(item?.net?.start).format('DD/MM/YYYY')} - ${dayjs(item?.net?.end).format('DD/MM/YYYY')}`, '-')}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={2.3}>
                <NetType>Net Payroll Report</NetType>
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={1.5}>
                {ifThenElse(item?.net?.createdAt, dayjs(item?.net?.createdAt).format('DD/MM/YYYY'), '-')}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={1.5}>
                {ifThenElse(item?.net?.updatedAt, dayjs(item?.net?.updatedAt).format('DD/MM/YYYY'), '-')}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={2.5}>
                <MuiButton
                  variant='contained'
                  color='inherit'
                  size='small'
                  sx={{ color: '#111827' }}
                  onClick={() => { openInNewTab(item?.net?.attachment?.link); }}
                >
                  {item?.net?.attachment?.filename} &nbsp;<FiDownload fontSize='small' />
                </MuiButton>
              </Grid>
            </Grid>
            <Grid container spacing={1} sx={{ mb: '.5rem' }}>
              <Grid item sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center'}} xs={2.2}>
                {ifEmptyReplace(item?.disbursement?.name, '-')}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={2}>
                {ifThenElse(item?.disbursement?.start, `${dayjs(item?.disbursement?.start).format('DD/MM/YYYY')} - ${dayjs(item?.disbursement?.end).format('DD/MM/YYYY')}`, '-')}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={2.3}>
                <DisbursementType>Disbursement Receipt</DisbursementType>
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={1.5}>
                {ifThenElse(item?.disbursement?.createdAt, dayjs(item?.disbursement?.createdAt).format('DD/MM/YYYY'), '-')}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={1.5}>
                {ifThenElse(item?.disbursement?.updatedAt, dayjs(item?.disbursement?.updatedAt).format('DD/MM/YYYY'), '-')}
              </Grid>
              <Grid item sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} xs={2.5}>
                <MuiButton
                  variant='contained'
                  color='inherit'
                  size='small'
                  sx={{ color: '#111827' }}
                  onClick={() => { openInNewTab(item?.disbursement?.attachment?.link); }}
                >
                  {item?.disbursement?.attachment?.filename} &nbsp;<FiDownload fontSize='small' />
                </MuiButton>
              </Grid>
            </Grid>
          </Collapse>
        </TableCell>
      </TableRow>

      <ConfirmationModal
        open={deleteConfirmation?.open}
        handleClose={() => handleDeleteClose()}
        title={t(`${t_popupKey}.delete.title`)}
        content={t(`${t_popupKey}.delete.desc`)}
        withCallback
        noChange={true}
        callback={() => deletePayroll(deleteConfirmation?.id)}
      />
    </React.Fragment>
  );
}

export default PayrollAssistantRow;