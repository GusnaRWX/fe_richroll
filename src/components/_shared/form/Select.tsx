import { FormControl, Typography, MenuItem, Select as MuiSelect, FormHelperText } from '@mui/material';
import React from 'react';
import { styled as MuiStyled } from '@mui/material/styles';
import { SharedComponent } from '@/types/component';

const AsteriskComponent = MuiStyled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));
function Select(
  {
    customLabel,
    withAsterisk,
    variant = 'outlined',
    size,
    value,
    options,
    onChange,
    name,
    fullWidth,
    error,
    helperText,
    ...props
  }: SharedComponent.SelectInput) {
  return (
    <FormControl fullWidth={fullWidth}>
      {
        customLabel !== undefined && (
          <Typography mb='6px'>
            {customLabel} {withAsterisk && <AsteriskComponent>*</AsteriskComponent>}
          </Typography>
        )
      }
      <MuiSelect
        fullWidth={fullWidth}
        variant={variant}
        size={size}
        value={value}
        onChange={onChange}
        name={name}
        {...props}
        error={error}
      >
        {
          typeof options !== 'undefined' && (
            options.map((item) => (
              <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
            ))
          )
        }
      </MuiSelect>
      {error && (
        <FormHelperText sx={{ color: '#EF4444' }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default Select;