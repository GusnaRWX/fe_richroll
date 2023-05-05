import React, { memo } from 'react';
import { TextField as MuiTextField, Typography } from '@mui/material';
import { SharedComponent } from '@/types/component';
import { styled } from '@mui/material/styles';

const AsteriskComponent = styled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

const Input = ({
  name,
  onChange,
  placeholder,
  error,
  customLabel,
  withAsterisk,
  variant = 'outlined',
  ...props
}: SharedComponent.ComponentInput) => {
  return (
    <>
      {
        customLabel !== undefined && (
          <Typography>
            {customLabel} {withAsterisk && <AsteriskComponent>*</AsteriskComponent>}
          </Typography>
        )
      }
      <MuiTextField
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        variant={variant}
        error={error}
        fullWidth
        {...error && ({ error: true, helperText: error })}
        {...props}
      />
    </>
  );
};

export default memo(Input);
