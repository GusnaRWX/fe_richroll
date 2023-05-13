import React from 'react';
import { FormControlLabel, Checkbox, Typography } from '@mui/material';
import { SharedComponent } from '@/types/component';

function CheckBox({
  customLabel,
  name,
  checked,
  onChange
}: SharedComponent.CheckboxInput) {
  return (
    <>
      <FormControlLabel
        sx={{ marginTop: '.5rem', marginBottom: '.5rem' }}
        label={<Typography fontWeight='bold'>{customLabel}</Typography>}
        control={
          <Checkbox name={name} checked={checked} onChange={onChange}/>
        }
        labelPlacement='end'
      />
    </>
  );
}

export default CheckBox;