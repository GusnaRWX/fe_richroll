import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import { SharedComponent } from '@/types/component';
import { Text } from '../common';

function CheckBox({
  customLabel,
  name,
  checked,
  onChange,
  disabled
}: SharedComponent.CheckboxInput) {
  return (
    <>
      <FormControlLabel
        sx={{ marginTop: '.5rem', marginBottom: '.5rem' }}
        label={<Text title={customLabel} fontWeight={500} />}
        control={
          <Checkbox name={name} checked={checked} onChange={onChange} disabled={disabled} />
        }
        labelPlacement='end'
      />
    </>
  );
}

export default CheckBox;