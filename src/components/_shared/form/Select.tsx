import { FormControl, Typography, MenuItem, Select as MuiSelect } from '@mui/material';
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
    ...props
  }: SharedComponent.SelectInput) {
  // const convertParams = (event: SelectChangeEvent) => {
  //   onChange(!event.target.name ? '' : event.target.name, event.target.value);
  // };
  return (
    <>
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
        >
          {
            typeof options !== 'undefined' && (
              options.map((item) => (
                <MenuItem key={item.label} value={item.label}>{item.label}</MenuItem>
              ))
            )
          }
        </MuiSelect>
      </FormControl>
    </>
  );
}

export default Select;