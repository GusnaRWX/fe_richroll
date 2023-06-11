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
  customLabelStart?: string;
  customLabelEnd?: string;
  withAsterisk?: boolean;
  value?: Date;
  onChange?: React.Dispatch<Date | null>;
  error?: string;
};

const DateRangePicker = ({
  customLabelStart,
  customLabelEnd,
  onChange,
  value,
  withAsterisk,
  error,
  ...props
}: DatePickerType) => {
  return (
    <>
      <Box sx={{width: '100%', display: 'flex'}}>
        {customLabelStart !== undefined && (
          <Box sx={{width: '50%'}}>
            <Typography mb='6px'>
              {customLabelStart}{' '}
              {withAsterisk && <AsteriskComponent>*</AsteriskComponent>}
            </Typography>
          </Box>
        )}
        {customLabelEnd !== undefined && (
          <Box sx={{width: '50%'}}>
            <Typography mb='6px'>
              {customLabelEnd}{' '}
              {withAsterisk && <AsteriskComponent>*</AsteriskComponent>}
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{border: '1px solid rgba(0, 0, 0, 0.23)', padding: '3px 14px', borderRadius: '4px'}}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
        >
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
    </>
  );
};

export default DateRangePicker;
