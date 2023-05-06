import React from 'react';
import { Typography, TypographyProps } from '@mui/material';

const Text = ({ title, ...props }: TypographyProps) => {
  return <Typography {...props}>{title}</Typography>;
};

export default Text;