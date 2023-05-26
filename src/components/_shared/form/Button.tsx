import React , {ReactNode}from 'react';
import { CircularProgress, Button as MuiButton, Typography, } from '@mui/material';
import { SharedComponent } from '@/types/component';

const Button = ({
  label,
  color,
  size,
  onClick,
  variant = 'contained',
  isLoading,
  buttonIcon,
  ...props
}: SharedComponent.ComponentButton) => {
  const IconComponent = buttonIcon;
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
      {IconComponent as ReactNode}
      <Typography fontWeight={500} variant='text-sm'>{label}</Typography> {isLoading && <CircularProgress color='inherit' size={13} sx={{ position: 'relative', left: '10px' }} />}
    </MuiButton>

  );
};

export default Button;