import React, { useEffect } from 'react';
import { Box, Modal, IconButton, Avatar, Grid } from '@mui/material';
import styled from '@emotion/styled';
import { Text } from '../_shared/common';
import { Close } from '@mui/icons-material';
import { Button, Select, Textarea } from '../_shared/form';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AttendanceLeave } from '@/types/attendanceLeave';
import { LeaveTypeItems, LeaveTypeStatus } from '@/utils/options';
import { validationSchemeUpdateLeaveEntries } from './validate';
import { putLeaveEntriesRequested } from '@/store/reducers/slice/attendance-leave/leaveEntriesSlice';
import { useFormik } from 'formik';
import { useAppDispatch } from '@/hooks/index';
import dayjs from 'dayjs';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '543px',
  backgroundColor: '#FFFFFF',
  border: '1px solid #E5E7EB',
  borderRadius: '8px',
  paddingTop: '10px',
  p: 2
};

const ModalHeader = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 margin: 0;
 border-bottom: 1px solid #E5E7EB;
 padding-bottom: .5rem;
`;

interface LeaveEntriesEditProps {
  open: boolean;
  handleClose: () => void;
  selectedItem: AttendanceLeave.LeaveEntriesList | null,
  setSelectedItem: any
}

const LeaveEntriesEditComponent: React.FC<LeaveEntriesEditProps> = ({
  open,
  handleClose,
  selectedItem,
  setSelectedItem
}) => {
  const dispatch = useAppDispatch();

  const handleClear = () => {
    setSelectedItem(null);
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      leaveType: '',
      leaveStatus: '',
      leaveFrom: null,
      leaveTo: null,
      note: ''
    },
    validationSchema: validationSchemeUpdateLeaveEntries,
    onSubmit: (values) => {
      const result = {
        put: {
          start: dayjs(values.leaveFrom).toISOString(),
          end: dayjs(values.leaveTo).toISOString(),
          note: values.note,
          leaveType: values.leaveType,
          leaveStatus: values.leaveStatus
        },
        getEntries: {
          page: 1,
          itemPerPage: 5
        }
      };
      dispatch({
        type: putLeaveEntriesRequested.toString(),
        payload: {
          payload: {
            id: selectedItem?.id,
            data: result.put
          },
          getEntries: result.getEntries
        }
      });
      handleClear();
    }
  });

  useEffect(() => {
    if (!open) formik.resetForm();
    formik.setFieldValue('leaveType', String(selectedItem?.leaveType));
    formik.setFieldValue('leaveStatus', String(selectedItem?.leaveStatus));
    formik.setFieldValue('leaveFrom', dayjs(selectedItem?.start));
    formik.setFieldValue('leaveTo', dayjs(selectedItem?.end));
    formik.setFieldValue('note', selectedItem?.note);
  }, [open, selectedItem]);

  return (
    <Modal
      open={open}
      keepMounted={false}
      disableAutoFocus
    >
      <Box sx={modalStyle}>
        <ModalHeader>
          <Text title='Edit Leave Entry' fontWeight={600} fontSize='18px' />
          <IconButton onClick={handleClear}>
            <Close />
          </IconButton>
        </ModalHeader>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ padding: '16px 0px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #E5E7EB', paddingBottom: '15px' }}>
              <div>
                <Avatar
                  src={selectedItem?.employee?.picture}
                  alt='employee'
                  sx={{
                    width: 72, height: 72
                  }}
                />
              </div>
              <div>
                <Text title={selectedItem?.employee?.name} fontWeight={700} fontSize='18px' />
                <Text title={selectedItem?.employee?.department} fontWeight={400} fontSize='14px' />
              </div>
            </Box>
            <Box sx={{ marginTop: '24px' }}>
              <Grid container justifyContent='space-between' gap={1} mb='16px'>
                <Grid item sm={5.8}>
                  <Select
                    customLabel='Leave Type'
                    options={LeaveTypeItems}
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='leaveType'
                    displayEmpty
                    value={formik.values.leaveType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    renderValue={(value: unknown) => {
                      if ((value as string)?.length === 0) {
                        return <Text title='Select Leave Type' color='grey.400' />;
                      }
                      const selected = LeaveTypeItems.find(item => item.value === value);
                      if (selected) {
                        return `${selected.label}`;
                      }
                      return null;
                    }}
                  />
                </Grid>
                <Grid item sm={5.8}>
                  <Select
                    customLabel='Status'
                    options={LeaveTypeStatus}
                    variant='outlined'
                    size='small'
                    fullWidth
                    name='leaveStatus'
                    displayEmpty
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.leaveStatus}
                    renderValue={(value: unknown) => {
                      if ((value as string)?.length === 0) {
                        return <Text title='Select Leave Status' color='grey.400' />;
                      }
                      const selected = LeaveTypeStatus.find(item => item.value === value);
                      if (selected) {
                        return `${selected.label}`;
                      }
                      return null;
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent='space-between' gap={1}>
                <Grid item md={5.8}>
                  <Text title='Leave From' fontWeight={400} sx={{ marginBottom: '6px' }} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      format='HH:mm'
                      sx={{
                        '& .MuiOutlinedInput-input': {
                          padding: '8.5px 14px',
                          border: 'none !important'
                        },
                        width: '100%'
                      }}
                      value={formik.values.leaveFrom}
                      onChange={(val) => formik.setFieldValue('leaveFrom', val, false)}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item md={5.8}>
                  <Text title='Leave To' fontWeight={400} sx={{ marginBottom: '6px' }} />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                      format='HH:mm'
                      sx={{
                        '& .MuiOutlinedInput-input': {
                          padding: '8.5px 14px',
                          border: 'none !important'
                        },
                        width: '100%'
                      }}
                      value={formik.values.leaveTo}
                      onChange={(val) => formik.setFieldValue('leaveTo', val, false)}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid container gap={1} mt='16px'>
                <Grid item md={12}>
                  <Textarea
                    placeholder='Add Notes'
                    customLabel='Note'
                    minRows={4}
                    name='note'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.note}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ padding: '16px 0px' }}>
            <Grid container direction='row' justifyContent='flex-end' alignItems='center' gap={2}>
              <Grid item>
                <Button label='Cancel' variant='outlined' onClick={handleClear} />
              </Grid>
              <Grid item>
                <Button label='Save' type='submit' />
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default LeaveEntriesEditComponent;