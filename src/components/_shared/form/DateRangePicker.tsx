import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as CommonDatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { FormHelperText, Typography, styled, Box } from '@mui/material';
import { BsArrowRight } from 'react-icons/bs';

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

const DateRangePicker = ({
  customLabel,
  onChange,
  value,
  withAsterisk,
  error,
  ...props
}: DatePickerType) => {
  return (
    <Box sx={{border: '1px solid rgba(0, 0, 0, 0.23)', padding: '3px 14px', borderRadius: '4px'}}>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
      >
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
          slotProps={{ textField: { variant: 'standard' } }}
          slots={{
            openPickerIcon: BsArrowRight
          }}
          {...props}
          sx={{
            '& .MuiOutlinedInput-input': {
              padding: '8.5px 14px',
              border: 'none !important',
            },
            '> .MuiInput-underline': {
              border: 'none !important',
              paddingRight: '10px',
            },
            '> .MuiInput-underline:before': {
              border: 'none !important',
            },
            width: '50%',
            border: 'none !important',
          }}
        />
        {error && (
          <FormHelperText sx={{ color: '#EF4444' }}>{error}</FormHelperText>
        )}
      </LocalizationProvider>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        sx={{ border: 'none !important' }}
      >
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
          slotProps={{ textField: { variant: 'standard', } }}
          {...props}
          sx={{
            '& .MuiOutlinedInput-input': {
              padding: '8.5px 14px',
              border: 'none !important',
            },
            '> .MuiInput-underline': {
              border: 'none !important',
            },
            '> .MuiInput-underline:before': {
              border: 'none !important',
            },
            width: '50%',
            border: 'none !important',
          }}
        />
        {error && (
          <FormHelperText sx={{ color: '#EF4444' }}>{error}</FormHelperText>
        )}
      </LocalizationProvider>
    </Box>
  );
};

export default DateRangePicker;
