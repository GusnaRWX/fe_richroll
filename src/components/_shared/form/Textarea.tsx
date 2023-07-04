import React from 'react';
import { styled } from '@mui/material/styles';
import { SharedComponent } from '@/types/component';
import { FormControl, FormHelperText, TextareaAutosize } from '@mui/material';
import { Text } from '../common';

const CustomTextArea = styled(TextareaAutosize)<SharedComponent.ComponentTextarea>(({ theme, error }) => ({
  background: theme.palette.background.paper,
  border: `1px solid ${error ? theme.palette.error.main : theme.palette.grey[200]}`,
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  borderRadius: '4px',
  '&:focus': {
    outline: `1px solid ${error && theme.palette.error.main}`,
  },
  color: theme.palette.grey[500],
  fontFamily: 'inherit',
  fontSize: '1rem',
  padding: '9px 12px',
  '&::placeholder': {
    color: '#D1D5DB'
  }
}));

const AsteriskComponent = styled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

const Textarea = ({
  name,
  onChange,
  placeholder,
  error,
  customLabel,
  withAsterisk,
  ...props
}: SharedComponent.ComponentTextarea) => {
  return (
    <FormControl fullWidth>
      {customLabel && (
        <Text mb='6px'>
          {customLabel}
          {withAsterisk && <AsteriskComponent>*</AsteriskComponent>}
        </Text>
      )}
      <CustomTextArea
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        aria-label={customLabel}
        {...props}
      />
      {error && (
        <FormHelperText sx={{ color: '#EF4444' }}>{error}</FormHelperText>
      )}
    </FormControl>
  );

};

export default Textarea;