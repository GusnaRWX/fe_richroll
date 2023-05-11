import { Box, BoxProps } from '@mui/material';
import React from 'react';

const Form = ({
  children,
  onSubmit,
  ...props
}: BoxProps) => {
  return (
    <Box
      component='form'
      onSubmit={onSubmit}
      autoComplete='off'
      {...props}
    >
      {children}
    </Box>
  );
};

export default Form;