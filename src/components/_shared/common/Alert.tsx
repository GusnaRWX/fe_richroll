import React from 'react';
import {
  Alert as MuiAlert,
  AlertProps,
  Stack,
  AlertTitle
} from '@mui/material';
import Text from './Text';


const Alert = ({
  severity,
  content,
  ...props
}: AlertProps) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <MuiAlert severity={severity} {...props}>
        <AlertTitle>
          <Text fontWeight={500} variant='text-base' title={content} />
        </AlertTitle>
      </MuiAlert>
    </Stack>
  );
};

export default Alert; 