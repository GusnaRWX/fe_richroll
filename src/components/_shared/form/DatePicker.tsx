import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { Typography, styled } from '@mui/material';

const AsteriskComponent = styled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

type DatePickerType = DatePickerProps<Date> & {
  customLabel: string;
  withAsterisk?: boolean;
  value: Date;
  onChange?: React.Dispatch<Date | null>
}

const BasicDatePicker = ({
  customLabel,
  onChange,
  value,
  withAsterisk,
  ...props
}: DatePickerType) => {


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {
        customLabel !== undefined && (
          <Typography>
            {customLabel} {withAsterisk && <AsteriskComponent>*</AsteriskComponent>}
          </Typography>
        )
      }
      <DatePicker
        format='DD/MM/YYYY'
        value={value}
        onChange={onChange}
        {...props}
        sx={{
          '& .MuiOutlinedInput-input': {
            padding: '10px 14px',
            border: 'none !important'
          },
          width: '100%'
        }}
      />
    </LocalizationProvider>
  );
};

export default BasicDatePicker;