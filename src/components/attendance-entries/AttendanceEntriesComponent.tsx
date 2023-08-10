import React, { useState, useEffect } from 'react';
import { Typography, Card, Avatar, Grid, Box, Button as MuiButton, FormControlLabel, Switch } from '@mui/material';
import { SwitchProps } from '@mui/material/Switch';
import { DataGrid } from '@mui/x-data-grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { BsTrashFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { DatePicker, IconButton } from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import AttendanceTable from './AttendanceEntriesTable';
import AddEmployeesModal from '../payroll-assistant/create/AttendanceModal';
import { useAppDispatch } from '@/hooks/index';
import { postAttendanceRequested } from '@/store/reducers/slice/attendance-leave/attendanceEntriesSlice';
import { CustomModal } from '@/components/_shared/common';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

interface DataGridCellProps {
  rowNode: object;
  field: string;
  value: string;
  tabIndex: number;
}

const ButtonWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '.1rem'
}));

const NameWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  margin: 0
}));


const ContentWrapper = styled(Card)(({
  padding: '1rem'
}));

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#223567' : '#223567',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#223567',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

function AttendanceEntriesComponent() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [selected, setSelected] = useState(Array<object>);
  const [selectDate, setSelectDate] = useState(dayjs());
  const {t} = useTranslation();
  const t_pageKey = 'attendance_&_leave.attendance_entries';
  const t_createPopup = 'attendance_&_leave.attendance_entries.popup.create';
  const t_createPopupTableHeader = 'attendance_&_leave.attendance_entries.popup.create.table_cols_item';

  function GridActionCell({ rowNode }: DataGridCellProps) {
    const tempId = rowNode['id'];
    return (
      <IconButton
        parentColor='#FEE2E2'
        onClick={() => {
          const tempSelected = selected.filter((v) => v['id'] !== tempId);
          setSelected(tempSelected);
        }}
        icons={
          <BsTrashFill fontSize={20} color='#EF4444' />
        }
      />
    );
  }

  function GridNameCell({ rowNode, value }: DataGridCellProps) {
    const tempId = rowNode['id'];

    const tempRow = selected.find((v) => v['id'] === tempId);
    return (
      <NameWrapper>
        <Avatar
          src={tempRow && tempRow['picture']}
          alt={value}
          sx={{
            width: 24, height: 24
          }}
        />
        &nbsp;{value}
      </NameWrapper>
    );
  }

  function GridClockCell({ rowNode, value, field }: DataGridCellProps) {
    const tempId = rowNode['id'];

    const handleChange = (val) => {
      const setClock = selected.map((itm) => {
        if (itm['id'] === tempId) {
          return {...itm, ...{[field]: dayjs(val).set('date', Number(dayjs(selectDate).format('D')))}};
        } else {
          return itm;
        }
      });
      setSelected(setClock);
    };

    const handleBlur = (val) => {
      const setClock = selected.map((itm) => {
        const tempVal = val.split(':');
        if (itm['id'] === tempId) {
          return {...itm, ...{[field]: dayjs().set('date', Number(dayjs(selectDate).format('D'))).set('month', Number(dayjs(selectDate).format('M'))).set('year', Number(dayjs(selectDate).format('YYYY'))).set('hour', Number(tempVal[0])).set('minute', Number(tempVal[1]))}};
        } else {
          return itm;
        }
      });
      setSelected(setClock);
    };

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          ampm={false}
          format='HH:mm'
          onAccept={(e) => handleChange(e)}
          slotProps={{
            textField: { onBlur: (a) => handleBlur(a.target.value) }
          }}

          value={value}
          sx={{
            '& .MuiOutlinedInput-input': {
              padding: '8.5px 14px',
              border: 'none !important'
            },
            width: '90%'
          }}
        />
      </LocalizationProvider>
    );
  }

  const headerItems = [
    { field: 'id',
      width: 110,
      sortable: false,
      headerName: t(`${t_createPopupTableHeader}.employee_id`)
    },
    { field: 'name',
      width: 260,
      sortable: false,
      headerName: t(`${t_createPopupTableHeader}.employee_name`),
      renderCell: (params) => <GridNameCell {...params} />
    },
    { field: 'clockIn',
      width: 165,
      sortable: false,
      headerName: t(`${t_createPopupTableHeader}.check_in`),
      renderCell: (params) => <GridClockCell {...params} />
    },
    { field: 'icon',
      width: 2,
      sortable: false,
      headerName: '',
      renderCell: () => <AiOutlineSwapRight />
    },
    { field: 'clockOut',
      width: 165,
      sortable: false,
      headerName: t(`${t_createPopupTableHeader}.check_out`),
      renderCell: (params) => <GridClockCell {...params} />
    },
    { field: 'action',
      headerName: '',
      width: 30,
      sortable: false,
      renderCell: (params) => <GridActionCell {...params} />
    },
  ];

  const handleClose = () => {
    setOpen(false);
    setSelected([]);
    setSelectDate(dayjs());
  };

  const handleConfirm = () => {
    const tempData = selected.map((val) => {
      return ({
        employeeID: val['id'],
        clockIn: dayjs(val['clockIn']).toISOString(),
        clockOut: dayjs(val['clockOut']).toISOString(),
      });
    });
    dispatch({
      type: postAttendanceRequested.toString(),
      payload: {
        date: dayjs(selectDate).toISOString(),
        attendances: tempData
      }
    });
    handleClose();
  };

  const handleAuto = (v: boolean) => {
    setIsAuto(v);
    if (v) {
      const arrTemp = selected.map((val) => {
        return({...val, ...{clockIn: dayjs(selectDate).set('hour', 9).set('minute', 0), clockOut: dayjs(selectDate).set('hour', 17).set('minute', 0)}});
      });
      setSelected(arrTemp);
    } else {
      const arrTemp = selected.map((val) => {
        return({...val, ...{clockIn: null, clockOut: null}});
      });
      setSelected(arrTemp);
    }
  };

  const handleChangeDate = (e) => {
    setSelectDate(e);
    const setDate = selected.map((val) => {
      const tempClockIn = val['clockIn'];
      const tempClockOut = val['clockOut'];

      if (typeof tempClockIn == 'object' && typeof tempClockOut == 'object') {
        return {...val, ...{['clockIn']: dayjs(tempClockIn).set('date', Number(dayjs(e).format('D'))), ['clockOut']: dayjs(tempClockOut).set('date', Number(dayjs(e).format('D')))}};
      } else {
        return val;
      }
    });
    setSelected(setDate);
  };

  useEffect(() => {
    console.log(selected);
  }, [selected.length]);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6}>
          <Typography variant='h5' color='primary.main'>{t(`${t_pageKey}.title`)}</Typography>
          <Typography variant='text-base' color='#4B5563'>{t(`${t_pageKey}.sub_title`)}</Typography>
        </Grid>
        <Grid item xs={6}>
          <ButtonWrapper>
            <MuiButton
              variant='contained'
              size='small'
              color='primary'
              startIcon={<AddIcon />}
              sx={{ color: 'white' }}
              onClick={() => { setOpen(true); }}
            >{t('button.create_attendance_entry')}</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <AttendanceTable />
        </Box>
      </ContentWrapper>

      <CustomModal
        open={open}
        handleClose={handleClose}
        title={t(`${t_createPopup}.title`)}
        width='840px'
        handleConfirm={handleConfirm}
        submitText={t('button.create_entry')}
        keepMounted={false}
      >
        <Grid container mt='1rem' mb='1rem'>
          <Grid item xs={4}>
            <DatePicker
              customLabel={t(`${t_createPopup}.select_date_label`)}
              withAsterisk
              value={selectDate as unknown as Date}
              onChange={(date) => { handleChangeDate(date); }}
            />
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', alignItems: 'end' }}>
            <FormControlLabel
              sx={{ ml: '1rem', mb: '.5rem' }}
              label={t(`${t_createPopup}.auto`)}
              control={
                <IOSSwitch
                  sx={{ mr: '.5rem' }}
                  value={isAuto}
                  onChange={(e) => handleAuto(e.target.checked)}
                />
              }
            />
          </Grid>
          <Grid item xs={6}>
            <ButtonWrapper sx={{ height: '100%' }}>
              <MuiButton
                variant='contained'
                size='small'
                color='primary'
                startIcon={<AddIcon />}
                sx={{ color: 'white' }}
                onClick={() => { setOpenAddEmployee(true); }}
              >{t('button.add_employee')}</MuiButton>
            </ButtonWrapper>
          </Grid>
        </Grid>
        <Box
          sx={{
            width: '100%',
            height: selected.length > 0 ? '400px' : '250px',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '0.4em',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'transparent',
            },
          }}>
          <DataGrid
            autoHeight
            disableColumnFilter
            disableColumnMenu
            disableColumnSelector
            disableDensitySelector
            disableRowSelectionOnClick
            rows={selected}
            columns={headerItems}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            sx={{
              overflowX: 'hidden',
              '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
                display: 'none',
              },
            }}
            pageSizeOptions={[5, 10, 25, 50, 75, 100, 500, 1000]}
          />
        </Box>
      </CustomModal>

      <AddEmployeesModal
        open={openAddEmployee}
        handleClose={() => setOpenAddEmployee(false)}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
}

export default AttendanceEntriesComponent;