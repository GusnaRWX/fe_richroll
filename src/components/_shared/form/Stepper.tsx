import React from 'react';
import { 
  Stepper as MuiStepper,
  Step,
  StepLabel,
  Box
} from '@mui/material';
import { ifThenElse } from '@/utils/helper';

interface StepperProps {
  steps: string[];
  activeStep: number;
}

function Stepper({
  steps,
  activeStep
}: StepperProps) {
  return (
    <MuiStepper activeStep={activeStep} alternativeLabel sx={{ marginTop: '45px' }}>
      {steps.map((label) => (
        <Step key={label} sx={{
          '> .MuiStepConnector-root': {
            left: 'calc(-50% + 10px)',
            right: 'calc(50% + 10px)',
            '> .MuiStepConnector-line': {
              borderTopWidth: '2px',
              marginTop: '-20px !important'
            }
          },
          '> .Mui-active > .MuiStepConnector-line, > .Mui-completed > .MuiStepConnector-line': {
            borderColor: '#1C2C56'
          },
          '> .Mui-disabled > .MuiStepConnector-line': {
            borderColor: '#D1D5DB'
          },
        }}>
          <StepLabel
            sx={{
              '& .Mui-completed, & .Mui-disabled': {
                color: '#D1D5DB !important',
              },
              '& .MuiStepLabel-alternativeLabel': {
                fontWeight: '400 !important',
                marginTop: '-20px !important'
              },
            }}
            StepIconComponent={({ active, completed }) => {
              return ifThenElse(
                active,
                <Box sx={{ width: '12px', height: '12px', border: '2px solid #1C2C56', borderRadius: '12px', background: '#FFF', top: '6px', position: 'relative' }}></Box>,
                ifThenElse(
                  completed,
                  <Box sx={{ width: '12px', height: '12px', borderRadius: '12px', background: '#1C2C56', top: '6px', position: 'relative' }}></Box>,
                  <Box sx={{ width: '12px', height: '12px', borderRadius: '12px', background: '#D1D5DB', top: '6px', position: 'relative' }}></Box>
                )
              );
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </MuiStepper>
  );
}

export default Stepper;