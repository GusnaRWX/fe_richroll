import React, { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Grid,
  Box,
  Button as MuiButton,
  Avatar,
  Switch,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { SwitchProps } from '@mui/material/Switch';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import CustomModal from '@/components/_shared/common/CustomModal';
import OvertimeSummaryTable from './OvertimeSummaryTable';
import { DatePicker, IconButton, Input } from '../_shared/form';
import { BsTrashFill } from 'react-icons/bs';
import { Add } from '@mui/icons-material';
import styled from '@emotion/styled';
import { styled as MuiStyled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import AddEmployeeModal from '@/components/payroll-assistant/create/AttendanceModal';
import dayjs from 'dayjs';
import { useAppDispatch } from '@/hooks/index';
import { postOvertimeRequested } from '@/store/reducers/slice/attendance-leave/overtimeSlice';
import { useTranslation } from 'react-i18next';

interface DataGridCellProps {
  rowNode: object;
  field: string;
  value: string;
  tabIndex: number;
}

const ButtonWrapper = styled(Box)(({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '1rem',
  marginTop: '.1rem'
}));

const NameWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 margin: 0;
`;

const IOSSwitch = MuiStyled((props: SwitchProps) => (
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

const ContentWrapper = styled(Card)(({
  padding: '1rem'
}));

function OvertimeSummaryComponent() {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [isAuto, setIsAuto] = useState(false);
  const [selected, setSelected] = useState(Array<object>);
  const [hydrated, setHaydrated] = useState(false);
  const [employeeOpen, setEmployeeOpen] = useState(false);
  const [selectDate, setSelectDate] = useState(dayjs());
  const {t} = useTranslation();
  const t_pageKey = 'attendance_&_leave.overtime_summary';
  const t_createPopup = 'attendance_&_leave.overtime_summary.popup.create';
  const t_createPopupTableHeader = 'attendance_&_leave.overtime_summary.popup.create.table_cols_item';

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

  function GridClockCell({rowNode, value, field }: DataGridCellProps) {
    const id = rowNode['id'];
    const setVal = (val) => {
      const setValue = selected.map((item) => {
        if (item['id'] === id) {
          return {...item, ...{[field]: val}};
        }else{
          return item;
        }
      });
      setSelected(setValue);
    };
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          format='HH:mm'
          ampm={false}
          onAccept={(e) => setVal(e)}
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

  function GridDurationCell({ rowNode, value, field }: DataGridCellProps) {
    const id = rowNode['id'];
    const setVal = (value) => {
      const setValue = selected.map((item) => {
        if (item['id'] === id) {
          return {...item, ...{[field]: value}};
        }else{
          return item;
        }
      });
      setSelected(setValue);
    };
    return (
      <Input
        withAsterisk={false}
        size='small'
        type='number'
        value={value}
        onChange={(e) => setVal(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Typography color='grey.500'>Hours</Typography>
            </InputAdornment>
          )
        }}
      />
    );
  }

  function GridMultiplierCell({ rowNode, value, field }: DataGridCellProps) {
    const id = rowNode['id'];
    const setVal = (value) => {
      const setValue = selected.map((item) => {
        if (item['id'] === id) {
          return {...item, ...{[field]: value}};
        }else{
          return item;
        }
      });
      setSelected(setValue);
    };
    return (
      <Input
        withAsterisk={false}
        size='small'
        type='number'
        value={value}
        onChange={(e) => setVal(e.target.value)}
        inputProps={{
          step: 0.1
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Typography color='grey.500'>x</Typography>
            </InputAdornment>
          )
        }}
      />
    );
  }

  const headerItems = [
    {
      field: 'id',
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
    { field: 'startTime',
      width: 165,
      sortable: false,
      headerName: t(`${t_createPopupTableHeader}.start_time`),
      renderCell: (params) => <GridClockCell {...params} />
    },
    { field: 'duration',
      width: 165,
      sortable: false,
      headerName: t(`${t_createPopupTableHeader}.duration`),
      renderCell: (params) => <GridDurationCell {...params} />
    },
    { field: 'multiplier',
      width: 165,
      sortable: false,
      headerName: t(`${t_createPopupTableHeader}.multiplier`),
      renderCell: (params) => <GridMultiplierCell {...params} />
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
        start: dayjs(dayjs(selectDate).format('YYYY-MM-DD') + ' ' + dayjs(val['startTime']).format('HH:mm')).toISOString(),
        duration: Number(val['duration']),
        multiplier: val['multiplier']
      });
    });
    dispatch({
      type: postOvertimeRequested.toString(),
      payload: {
        date: dayjs(selectDate).format('YYYY-MM-DD'),
        overtimes: tempData
      }
    });
    handleClose();
  };

  const handleAuto = (v: boolean) => {
    setIsAuto(v);
    if (v) {
      const arrTemp = selected.map((val) => {
        return({...val, ...{startTime: dayjs().set('hour', 17).set('minute', 0)}});
      });
      setSelected(arrTemp);
    } else {
      const arrTemp = selected.map((val) => {
        return({...val, ...{startTime: null}});
      });
      setSelected(arrTemp);
    }
  };

  useEffect(() => {
    setHaydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: '1.5rem' }}>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Typography variant='h5' color='primary.main'>{t(`${t_pageKey}.title`)}</Typography>
          <Typography variant='text-base' color='#4B5563'>{t(`${t_pageKey}.sub_title`)}</Typography>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <ButtonWrapper>
            <MuiButton
              variant='contained'
              size='small'
              color='primary'
              startIcon={<AddIcon />}
              sx={{ color: 'white' }}
              onClick={() => { setOpen(true); }}
            >{t('button.create_overtime_entry')}</MuiButton>
          </ButtonWrapper>
        </Grid>
      </Grid>

      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <OvertimeSummaryTable />
        </Box>
      </ContentWrapper>

      <CustomModal
        open={open}
        handleClose={handleClose}
        title={t(`${t_createPopup}.title`)}
        width='970px'
        handleConfirm={handleConfirm}
        submitText={t('button.create_entry')}
      >
        <Grid container spacing={2} mt='.5rem' mb='.5rem'>
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
            <DatePicker
              customLabel={t(`${t_createPopup}.select_date_label`)}
              withAsterisk
              value={selectDate as unknown as Date}
              onChange={(date) => {setSelectDate(date);}}
            />
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'end' }} item xs={4} sm={4} md={4} lg={4} xl={4}>
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
          <Grid item xs={4} sm={4} md={4} lg={4} xl={4} textAlign='end' alignSelf='end'>
            <MuiButton
              variant='contained'
              size='medium'
              color='primary'
              onClick={() => setEmployeeOpen(true)}
            ><Add fontSize='small' />&nbsp; {t('button.add_employee')}</MuiButton>
          </Grid>
        </Grid>
        <Box sx={{
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

      <AddEmployeeModal
        open={employeeOpen}
        handleClose={() => setEmployeeOpen(false)}
        selected={selected}
        setSelected={setSelected}
      />
    </>
  );
}

export default OvertimeSummaryComponent;