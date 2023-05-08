import React from 'react';
import { CircularProgress, Button as MuiButton, Typography, } from '@mui/material';
import { SharedComponent } from '@/types/component';

const Button = ({
  label,
  color,
  size,
  onClick,
  variant = 'contained',
  isLoading,
  ...props
}: SharedComponent.ComponentButton) => {
  return (
    <MuiButton
      fullWidth
      color={color}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={isLoading}
      {...props}
    >
      <Typography fontWeight={500} variant='text-sm'>{label}</Typography> {isLoading && <CircularProgress color='inherit' size={13} sx={{ position: 'relative', left: '10px' }} />}
    </MuiButton>

  );
};

export default Button;