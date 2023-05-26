import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as CommonDatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { FormHelperText, Typography, styled } from '@mui/material';

const AsteriskComponent = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
}));

type DatePickerType = DatePickerProps<Date> & {
  customLabel?: string;
  withAsterisk?: boolean;
  value?: Date;
  onChange?: React.Dispatch<Date | null>;
  error?: string;
};

const DatePicker = ({
  customLabel,
  onChange,
  value,
  withAsterisk,
  error,
  ...props
}: DatePickerType) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {customLabel !== undefined && (
        <Typography mb='6px'>
          {customLabel}{' '}
          {withAsterisk && <AsteriskComponent>*</AsteriskComponent>}
        </Typography>
      )}
      <CommonDatePicker
        format='DD/MM/YYYY'
        value={value}
        onChange={onChange}
        {...props}
        sx={{
          '& .MuiOutlinedInput-input': {
            padding: '10px 14px',
            border: 'none !important',
          },
          width: '100%',
          border: error ? '1px solid #EF4444' : '',
          borderRadius: '5px',
        }}
      />
      {error && (
        <FormHelperText sx={{ color: '#EF4444' }}>{error}</FormHelperText>
      )}
    </LocalizationProvider>
  );
};

export default DatePicker;
