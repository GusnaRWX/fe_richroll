import { Box, BoxProps } from '@mui/material';
import React from 'react';

const Form = ({
  children,
  ...props
}: BoxProps) => {
  return (
    <Box
      component='form'
      {...props}
    >
      {children}
    </Box>
  );
};

export default Form;