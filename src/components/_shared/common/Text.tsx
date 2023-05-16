import React, { ElementType } from 'react';
import { Typography, TypographyProps } from '@mui/material';

const Text = ({ title, children, component, ...props }: TypographyProps & {
  component?: unknown
}) => {
  return <Typography component={component as ElementType} {...props}>
    {title} {children}
  </Typography>;
};

export default Text;