import React, { useState } from 'react';
import {
  Typography,
  Card,
  Grid,
  Box,
  Button as MuiButton
} from '@mui/material';
import { Stepper } from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import AttendanceContent from './AttendanceContent';
import GrossContent from './GrossContent';
import NetContent from './NetContent';
import DisbursementContent from './DisbursementContent';
import CompleteContent from './CompleteContent';
import CustomModal from '@/components/_shared/common/CustomModal';
import { ifThenElse } from '@/utils/helper';
import { useAppSelectors, useAppDispatch } from '@/hooks/index';
import {
  postPayrollGrossesRequested,
  putPayrollWorkflowRequested,
  generateNetAssistRequested,
  generateDisbursementAssistRequested,
  postPayrollDisbursementIdRequested,
  patchPayrollDisbursementFinalRequested
} from '@/store/reducers/slice/payroll/payrollSlice';

const steps = [
  'Create Payroll',
  'Attendance',
  'Gross Payroll',
  'Net Payroll',
  'Disbursement',
  'Payroll Complete',
];

const ButtonWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '.1rem'
}));

const ContentWrapper = styled(Card)(({
  padding: '1rem',
  borderRadius: '0px',
  marginBottom: '1rem'
}));

function PayrollAssistantCreate() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const assistantID = router?.query?.id;
  const { name, start, end, grossesId, netId, disbursementId, id, selectedEmployee } = useAppSelectors((state) => state.payroll);
  const [value, setValue] = useState(1);
  const [open, setOpen] = useState(false);
  const [isExit, setIsExit] = useState(true);
  const [isSeparate, setIsSeparate] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (value === 5) {
      dispatch({
        type: patchPayrollDisbursementFinalRequested.toString(),
        payload: {
          id: disbursementId,
          isAssist: true
        }
      });
    } else {
      router.push('/payroll-disbursement/payroll-assistant');
    }
  };

  const handleGenerateGross = () => {
    dispatch({
      type: putPayrollWorkflowRequested.toString(),
      payload: {
        id: id,
        data: {
          workflow: 0,
          status: 1
        }
      }
    });
    dispatch({
      type: postPayrollGrossesRequested.toString(),
      payload: {
        data: {
          payrollID: [id],
          assistantID: assistantID
        },
        isAssist: true
      }
    });
    setValue(value + 1);
  };

  const handleGenerateNet = () => {
    dispatch({
      type: generateNetAssistRequested.toString(),
      payload: {
        grossesId: grossesId,
        assistantID: router.query.id,
      }
    });
    setValue(value + 1);
  };

  const handleGenerateDisbReceipt = () => {
    dispatch({
      type: generateDisbursementAssistRequested.toString(),
      payload: {
        netId: netId
      }
    });
    setValue(value + 1);
  };

  const handleGenerateDisbFiles = () => {
    dispatch({
      type: postPayrollDisbursementIdRequested.toString(),
      payload: {
        id: netId,
        body: {
          assistantID: router.query.id,
          isSeparate: isSeparate
        },
        isAssist: true
      }
    });
    setValue(value + 1);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='h6' color='#4B5563'><b>Payroll Assistant</b></Typography>
          <Typography variant='text-base' color='#4B5563'><b>{name} — </b>{start} - {end}</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='outlined'
              size='small'
              color='primary'
              onClick={() => {
                if (value == 5) {
                  setIsExit(true);
                  setOpen(true);
                } else {
                  setOpen(true);
                }
              }}
            >{ifThenElse(value < 2, 'Cancel', 'Save & Exit')}</MuiButton>
            <MuiButton
              variant='contained'
              size='small'
              color='primary'
              disabled={(value == 1 && !selectedEmployee?.items?.length)}
              onClick={() => {
                switch (value) {
                  case 1:
                    handleGenerateGross();
                    break;
                  case 2:
                    handleGenerateNet();
                    break;
                  case 3:
                    handleGenerateDisbReceipt();
                    break;
                  case 4:
                    handleGenerateDisbFiles();
                    break;
                  case 5:
                    setIsExit(false);
                    setOpen(true);
                    break;

                  default:
                    break;
                }
              }}
            >{ifThenElse(value == 1, 'Generate Gross Payroll Report', ifThenElse(value == 2, 'Generate Net Payroll Report', ifThenElse(value == 3, 'Generate Disbursement Receipt', ifThenElse(value == 4, 'Generate Disbursement Files', 'Mark All Paid and Complete'))))}</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={value} steps={steps} />
        </Box>
      </ContentWrapper>
      
      {value == 1 && <AttendanceContent />}
      {value == 2 && <GrossContent isPreview={false} />}
      {value == 3 && <NetContent isAssist={true} />}
      {value == 4 && <DisbursementContent isAssist={true} handleChecked={setIsSeparate} />}
      {value == 5 && <CompleteContent isAssist={true} />}

      <CustomModal
        open={open}
        handleClose={handleClose}
        title={ifThenElse(isExit, 'Save & Exit', 'Mark all paid and Complete')}
        width='543px'
        handleConfirm={handleConfirm}
      >
        <Grid container mt='1rem' mb='1rem'>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {
              ifThenElse(
                isExit,
                <Typography variant='text-base' color='#4B5563'>You will stop the process, and saved in Payroll Assistant.<br />Are you sure to stop the process?</Typography>,
                <Typography variant='text-base' color='#4B5563'>All disbursement will marked paid and complete the Payroll Assistant process</Typography>
              )
            }
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
}

export default PayrollAssistantCreate;