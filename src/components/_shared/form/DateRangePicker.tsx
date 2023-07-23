/* eslint-disable react/prop-types */
import React, { useState, useRef, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { FormHelperText, Typography, styled, Box } from '@mui/material';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { FiCalendar } from 'react-icons/fi';
import 'react-datepicker/dist/react-datepicker.css';

const AsteriskComponent = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
}));

interface DatePickerType {
  customLabelStart?: string;
  customLabelEnd?: string;
  withAsterisk?: boolean;
  value?: Date | null;
  onChange: (_date: Array<Date>) => void;
  error?: string;
}

const CustomInput = forwardRef((props: any, ref) => {
  const [start, end] = props.value.split(' - ');
  return (
    <Box component='button' ref={ref} onClick={props?.onClick} sx={{
      border: 'none',
      background: 'transparent',
      width: '100%',
      padding: '0px',
      color: '#4B5563',
      fontSize: '15px',
      fontWeight: 400,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '50%',
        pr: '10px'
      }}>
        {start || '-'}
        <AiOutlineSwapRight size={20} color='#D1D5DB' />
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '50%'
      }}>
        {end || '-'}
        <FiCalendar size={20} color='#D1D5DB' />
      </Box>
    </Box>
  );
});
CustomInput.displayName = 'CustomInput';

const DateRangePicker = ({
  customLabelStart,
  customLabelEnd,
  onChange,
  // value,
  withAsterisk,
  error
}: DatePickerType) => {
  const customRef = useRef(null);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const onChangeDate = (dates: Array<Date>) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onChange(dates);
  };
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
      <Box sx={{
        border: '1px solid rgba(0, 0, 0, 0.23)',
        padding: '3px 14px',
        borderRadius: '4px',
        '> .react-datepicker-wrapper': {
          width: '100%',
          padding: '4px 0px'
        },
        '> .react-datepicker__tab-loop > .react-datepicker-popper > div > .react-datepicker > .react-datepicker__triangle': {
          '&:before, &:after': {
            left: '-30px'
          }
        }
      }}>
        <DatePicker
          dateFormat='dd/MM/yyyy'
          selected={startDate}
          onChange={onChangeDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          customInput={ <CustomInput customRef={customRef} />}
        />
        {error && (
          <FormHelperText sx={{ color: '#EF4444' }}>{error}</FormHelperText>
        )}
      </Box>
    </>
  );
};

export default DateRangePicker;
