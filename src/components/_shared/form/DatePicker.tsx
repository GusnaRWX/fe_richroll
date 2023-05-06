import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { TextField, TextFieldProps, Typography, styled } from '@mui/material';

const AsteriskComponent = styled('span')(({ theme }) => ({
  color: theme.palette.error.main
}));

type DatePickerType = DatePickerProps<Date> & {
  name?: string;
  customLabel: string;
  withAsterisk?: boolean;
  HandleInputChange?: React.Dispatch<Date | null>
}

const BasicDatePicker = ({
  customLabel,
  name = '',
  value,
  HandleInputChange,
  withAsterisk,
  ...props
}: DatePickerType) => {

  const convertParams = (date: Date | null) => {
    if (HandleInputChange) {
      HandleInputChange(date as Date);
    }
  };

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
        onChange={convertParams}
        value={value}
        {...props}
        slots={{
          textField: (textFieldProps: TextFieldProps) => (
            <TextField {...textFieldProps} name={name as string} fullWidth size='small' />
          )
        }}
      />
    </LocalizationProvider>
  );
};

export default BasicDatePicker;