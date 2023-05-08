import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

const Text = ({ title, children, ...props }: TypographyProps) => {
  return <Typography {...props}>
    {title} {children}
  </Typography>;
};

export default Text;