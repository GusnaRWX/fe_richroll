import React, { useState, useEffect } from 'react';
import {
  Grid,
  TableCell,
  TableRow,
  Avatar,
  Tab,
  Tabs,
  Box,
  TableSortLabel,
  Select,
  MenuItem,
  Checkbox,
  Typography,
  Button as MuiButton
} from '@mui/material';
import { Input, DatePicker, CheckBox } from '../_shared/form';
import { Search } from '@mui/icons-material';
import Table from '../_shared/form/Table';
import { compareCheck, ifThenElse } from '@/utils/helper';
import { Image as ImageType } from '@/utils/assetsConstant';
import { visuallyHidden } from '@mui/utils';
import { IconButton } from '@/components/_shared/form';
import { BsTrashFill } from 'react-icons/bs';
import { RiUserReceived2Fill } from 'react-icons/ri';
import { AiOutlineStop } from 'react-icons/ai';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import {
  getAccountRequested,
  patchAccountSuspensionRequested,
  putAccountDeleteRequested,
  putAccountReactiveRequested
} from '@/store/reducers/slice/account-management/accountManagementSlice';
import dayjs from 'dayjs';
import { CustomModal, ConfirmationModal } from '@/components/_shared/common';
import { Account } from '@/types/account';

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: center;
 gap: .5rem;
`;

const NameWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 margin: 0;
`;

const headerItems = [
  { id: 'employee.code', label: 'Account ID' },
  { id: 'user.name', label: 'Full Name' },
  { id: 'user.email', label: 'Email' },
  { id: 'roles.name', label: 'User Type' },
  { id: 'user.lastLoginAt', label: 'Last Login' },
  { id: 'user.createdAt', label: 'Created on' },
  { id: 'action', label: '' },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {
        value === index && (
          <Box sx={{ px: 2, py: 1 }}>
            {children}
          </Box>
        )
      }
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

interface EmployeeTableProps {
  tabValue: number;
}

interface CheckedTableProps {
  id: string;
  checked: boolean;
}

type Order = 'asc' | 'desc'

function AttendanceTable({
  tabValue
}: EmployeeTableProps) {
  const dispatch = useAppDispatch();
  const data = useAppSelectors(state => state.account.data);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);
  const [deleteInfo, setDeleteInfo] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [suspendInfo, setSuspendInfo] = useState(false);
  const [suspendConfirmation, setSuspendConfirmation] = useState(false);
  const [reactivateInfo, setReactivateInfo] = useState(false);
  const [reactivateConfirmation, setReactivateConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Account.AccountType>();
  const [isPermanent, setIsPermanent] = useState(false);
  const startSuspend = dayjs();
  const [endSuspend, setEndSuspend] = useState(dayjs());
  const [value, setValue] = useState(0);
  const [selectedTemp, setSelectedTemp] = useState<CheckedTableProps[]>([]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleDelete = () => {
    setDeleteInfo(false);
    setDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    dispatch({
      type: putAccountDeleteRequested.toString(),
      payload: selectedItem?.id
    });
  };

  const handleSuspend = () => {
    setSuspendInfo(false);
    setEndSuspend(dayjs());
    setIsPermanent(false);
    setSuspendConfirmation(true);
  };

  const handleSuspendConfirm = () => {
    dispatch({
      type: patchAccountSuspensionRequested.toString(),
      payload: {
        data: {
          id: selectedItem?.id,
          data: {
            start: dayjs(startSuspend).format('YYYY-MM-DD'),
            end: dayjs(endSuspend).format('YYYY-MM-DD'),
            isPermanent: isPermanent
          }
        },
        accountName: selectedItem?.name
      }
    });
  };

  const handleReactivate = () => {
    setReactivateInfo(false);
    setReactivateConfirmation(true);
  };

  const handleReactivateConfirm = () => {
    dispatch({
      type: putAccountReactiveRequested.toString(),
      payload: selectedItem?.id
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
    setPage(1);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setPage(1);
      setSearch(e.target.value);
    }
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    const isAsc = compareCheck(sort === headId, direction === 'asc');
    setDirection(ifThenElse(isAsc, 'desc', 'asc'));
    setSort(headId);
  };

  const onSelected = (id, e) => {
    if (e.target.checked) {
      const temp = [...selectedTemp, { id: id, checked: true }];

      setSelectedTemp(temp);
    } else {
      const temp = selectedTemp.filter(v => v['id'] !== id);
      setSelectedTemp(temp);
    }
  };

  const checkVal = (id) => {
    return selectedTemp.some(v => v['id'] === id);
  };

  const onAll = (e) => {
    if (e.target.checked) {
      const temp = data?.items?.map((v) => {
        return {id: v.id, checked: true};
      });
      setSelectedTemp(temp);
    } else {
      setSelectedTemp([]);
    }
  };

  const checkAll = () => {
    return selectedTemp.length === rowsPerPage;
  };

  useEffect(() => {
    dispatch({
      type: getAccountRequested.toString(),
      payload: {
        page: page,
        itemPerPage: rowsPerPage,
        sort: sort,
        direction: direction.toUpperCase(),
        search: search,
        status: ifThenElse(tabValue === 0, 'active', ifThenElse(tabValue === 1, 'suspended', 'deleted')),
        searchType: searchType
      }
    });
  }, [rowsPerPage, page, tabValue, search, searchType, sort, direction, deleteConfirmation, suspendConfirmation, reactivateConfirmation]);

  useEffect(() => {
    setHaydrated(true);
  }, []);

  const ReactivateInfo = () => {
    return <>
      <Grid spacing={2} container mt='.5rem' mb='.5rem'>
        <Grid item xs={6}>
          <Typography component='div' variant='text-base' fontWeight={500}>Full Name</Typography>
          <NameWrapper>
            <Avatar
              src={selectedItem?.userInformation && selectedItem?.userInformation['picture'] || ImageType.AVATAR_PLACEHOLDER}
              alt={selectedItem?.name}
              sx={{
                width: 24, height: 24
              }}
            />
            &nbsp;<Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem?.name}</Typography>
          </NameWrapper>
        </Grid>
        <Grid item xs={6}>
          <Typography component='div' variant='text-base' fontWeight={500}>Start of Suspend Period</Typography>
          <Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem?.suspensionStart && dayjs(selectedItem?.suspensionStart).format('DD/MM/YY, HH:mm') || '-'}</Typography>
        </Grid>
      </Grid>
      <Grid spacing={2} container mt='.5rem' mb='.5rem'>
        <Grid item xs={6}>
          <Typography component='div' variant='text-base' fontWeight={500}>Email</Typography>
          <Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem?.email}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component='div' variant='text-base' fontWeight={500}>End of Suspend Period</Typography>
          <Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem?.suspensionEnd && dayjs(selectedItem?.suspensionEnd).format('DD/MM/YY, HH:mm') || '-'}</Typography>
        </Grid>
      </Grid>
      <Grid spacing={2} container mt='.5rem' mb='.5rem'>
        <Grid item xs={6}>
          <Typography component='div' variant='text-base' fontWeight={500}>User Type</Typography>
          <Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem && !!selectedItem.roles.length && selectedItem.roles.map((i) => i.name)}</Typography>
        </Grid>
      </Grid>
    </>;
  };

  const SuspendInfo = () => {
    return <>
      <Grid spacing={2} container mt='.5rem' mb='.5rem'>
        <Grid item xs={6}>
          <Typography component='div' variant='text-base' fontWeight={500}>Full Name</Typography>
          <NameWrapper>
            <Avatar
              src={selectedItem?.userInformation && selectedItem?.userInformation['picture'] || ImageType.AVATAR_PLACEHOLDER}
              alt={selectedItem?.name}
              sx={{
                width: 24, height: 24
              }}
            />
            &nbsp;<Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem?.name}</Typography>
          </NameWrapper>
        </Grid>
        <Grid item xs={6}>
          <Typography component='div' variant='text-base' fontWeight={500}>Account ID</Typography>
          <Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem?.employee && selectedItem?.employee['code'] || '-'}</Typography>
        </Grid>
      </Grid>
      <Grid spacing={2} container mt='.5rem' mb='.5rem'>
        <Grid item xs={6}>
          <Typography component='div' variant='text-base' fontWeight={500}>Email</Typography>
          <Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem?.email}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component='div' variant='text-base' fontWeight={500}>Last Login</Typography>
          <Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem?.lastLoginAt && dayjs(selectedItem?.lastLoginAt).format('DD/MM/YY, HH:mm') || '-'}</Typography>
        </Grid>
      </Grid>
      <Grid spacing={2} container mt='.5rem' mb='.5rem'>
        <Grid item xs={6}>
          <Typography component='div' variant='text-base' fontWeight={500}>User Type</Typography>
          <Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem && !!selectedItem.roles.length && selectedItem.roles.map((i) => i.name)}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component='div' variant='text-base' fontWeight={500}>Created On</Typography>
          <Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem && dayjs(selectedItem.createdAt).format('DD/MM/YY')}</Typography>
        </Grid>
      </Grid>
      <Grid spacing={2} container mt='.5rem'>
        <Grid item xs={6}>
          <DatePicker
            customLabel='Start of Suspend Period'
            value={startSuspend as unknown as Date}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <DatePicker
            customLabel='End of Suspend Period'
            withAsterisk
            value={endSuspend as unknown as Date}
            onChange={(date) => setEndSuspend(date)}
            disabled={isPermanent}
            disablePast
          />
        </Grid>
      </Grid>
      <Grid container mb='.5rem'>
        <Grid item xs={6}>
          <CheckBox
            customLabel='Permanent'
            name='isPermanent'
            checked={isPermanent}
            onChange={(e) => setIsPermanent(e.target.checked)}
          />
        </Grid>
      </Grid>
    </>;
  };

  const DeleteInfo: React.FC = () => {
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label='basic tabs'>
            <Tab sx={{ textTransform: 'none' }} label='Account Profile' {...a11yProps(0)} />
            <Tab sx={{ textTransform: 'none' }} label='List Of Company' {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid spacing={2} container mt='0px' mb='.5rem'>
            <Grid item xs={6}>
              <Typography component='div' variant='text-base' fontWeight={500}>Full Name</Typography>
              <NameWrapper>
                <Avatar
                  src={selectedItem?.userInformation && selectedItem?.userInformation['picture'] || ImageType.AVATAR_PLACEHOLDER}
                  alt={selectedItem?.name}
                  sx={{
                    width: 24, height: 24
                  }}
                />
                &nbsp;<Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem?.name}</Typography>
              </NameWrapper>
            </Grid>
            <Grid item xs={3}>
              <Typography component='div' variant='text-base' fontWeight={500}>Account ID</Typography>
              <Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem?.employee && selectedItem?.employee['code'] || '-'}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography component='div' variant='text-base' fontWeight={500}>User Type</Typography>
              <Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem && !!selectedItem.roles.length && selectedItem.roles.map((i) => i.name)}</Typography>
            </Grid>
          </Grid>
          <Grid spacing={2} container mt='.5rem' mb='1.5rem'>
            <Grid item xs={6}>
              <Typography component='div' variant='text-base' fontWeight={500}>Email</Typography>
              <Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem?.email}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography component='div' variant='text-base' fontWeight={500}>Last Login</Typography>
              <Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem?.lastLoginAt && dayjs(selectedItem?.lastLoginAt).format('DD/MM/YY, HH:mm') || '-'}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography component='div' variant='text-base' fontWeight={500}>Created On</Typography>
              <Typography component='div' variant='text-sm' fontWeight={400}>{selectedItem && dayjs(selectedItem.createdAt).format('DD/MM/YY')}</Typography>
            </Grid>
          </Grid>
          <Grid container mb='.5rem'>
            <Grid item xs={6}>
              <Typography component='div' variant='text-base' fontWeight={500}>Total Company</Typography>
              <Typography component='div' variant='text-sm' fontWeight={400}>{ifThenElse(selectedItem?.employee, selectedItem?.employee?.companies?.length + ' Company', '0 Company')}</Typography>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {!selectedItem?.employee &&
            <Typography component='div' variant='text-base' fontWeight={500} sx={{ textAlign: 'center' }}>No Data Company</Typography>
          }
          {!!selectedItem?.employee && !!selectedItem?.employee?.companies.length &&
          <>
            <Grid spacing={2} container mt='0px' sx={{ borderBottom: 'solid 1px #E5E7EB', paddingBottom: '10px' }}>
              <Grid item xs={4}>
                <Typography component='div' variant='text-base' fontWeight={500}>Company Name</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography component='div' variant='text-base' fontWeight={500}>Total Employee</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography component='div' variant='text-base' fontWeight={500}>Created On</Typography>
              </Grid>
            </Grid>
            {selectedItem?.employee?.companies?.map((itm, index) => (
              <Grid key={index} spacing={2} container mt='0px' sx={{ borderBottom: 'solid 1px #E5E7EB', paddingBottom: '10px' }}>
                <Grid item xs={4}>
                  <Typography component='div' variant='text-sm' fontWeight={400}>{itm.name}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography component='div' variant='text-sm' fontWeight={400}>{itm.employeesTotal}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography component='div' variant='text-sm' fontWeight={400}>{dayjs(itm.createdAt).format('DD/MM/YY')}</Typography>
                </Grid>
              </Grid>
            ))}
          </>
          }
        </TabPanel>
      </Box>
    );
  };

  if (!hydrated) {
    return null;
  }
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Input
            name='search'
            size='small'
            placeholder='Search'
            onKeyDown={(e) => handleSearch(e)}
            type='text'
            InputProps={{
              startAdornment: (
                <Search sx={{ color: '#9CA3AF' }} />
              )
            }}
          />
        </Grid>
        <Grid item xs={2.5}>
          <Select
            fullWidth
            variant='outlined'
            size='small'
            placeholder='Sort by Status'
            onChange={(e) => setSearchType(e?.target?.value)}
            value={searchType}
          >
            <MenuItem value='company_listed'>Company Listed</MenuItem>
            <MenuItem value='employee_name'>Employee Name</MenuItem>
            <MenuItem value='all'>All</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <Table
        count={data?.itemTotals}
        rowsPerPageOptions={[5, 10, 15]}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onRowsPerPagesChange={(e) => handleChangeRowsPerPage(e)}
        headChildren={
          <TableRow>
            {tabValue === 0 && (
              <TableCell>
                <Checkbox onChange={(e) => onAll(e)} checked={checkAll()} />
              </TableCell>
            )}
            {
              headerItems.map((item) => (
                <TableCell key={item.id} sortDirection={ifThenElse(sort === item.id, direction, false)}>
                  <TableSortLabel
                    active={sort === item.id}
                    direction={sort === item.id ? direction : 'asc'}
                    onClick={(e) => handleRequestSort(e, item.id)}
                  >
                    {item.label}
                    {sort === item.id ? (
                      <Box component='span' sx={visuallyHidden}>
                        {ifThenElse(direction === 'asc', 'sorted descending', 'sorted ascending')}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))
            }
          </TableRow>
        }
        bodyChildren={
          <>
            {
              ifThenElse(typeof data?.items !== 'undefined', (
                ifThenElse(data?.items?.length === 0, (
                  <TableRow>
                    <TableCell colSpan={12} align='center'><Typography>Data not found</Typography></TableCell>
                  </TableRow>
                ), (
                  data?.items?.map((item, index) => (
                    <TableRow key={index}>
                      {tabValue === 0 && (
                        <TableCell>
                          <Checkbox onChange={(e) => onSelected(item?.id, e)} checked={checkVal(item?.id)} />
                        </TableCell>
                      )}
                      <TableCell>{item.employee && item.employee.code || '-'}</TableCell>
                      <TableCell>
                        <NameWrapper>
                          <Avatar
                            src={item.userInformation?.picture || ImageType.AVATAR_PLACEHOLDER}
                            alt={item.name}
                            sx={{
                              width: 24, height: 24
                            }}
                          />
                          &nbsp;{item.name}
                        </NameWrapper>
                      </TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>
                        {!!item.roles.length && item.roles.map((i) => i.name)}
                      </TableCell>
                      <TableCell>{item.lastLoginAt && dayjs(item.lastLoginAt).format('DD/MM/YY, HH:mm') || '-'}</TableCell>
                      <TableCell>{dayjs(item.createdAt).format('DD/MM/YY')}</TableCell>
                      <TableCell>
                        <ButtonWrapper>
                          {tabValue === 0 && (
                            <>
                              <IconButton
                                disabled={!!selectedTemp.length}
                                parentColor={ifThenElse(selectedTemp.length, '#FFEDD550', '#FFEDD5')}
                                onClick={() => {
                                  setSelectedItem(item);
                                  setSuspendInfo(true);
                                }}
                                icons={
                                  <AiOutlineStop fontSize={20} color={ifThenElse(selectedTemp.length, '#F9731650', '#F97316')} />
                                }
                              />
                              <IconButton
                                disabled={!!selectedTemp.length}
                                parentColor={ifThenElse(selectedTemp.length, '#FEE2E250', '#FEE2E2')}
                                onClick={() => {
                                  setSelectedItem(item);
                                  setDeleteInfo(true);
                                }}
                                icons={
                                  <BsTrashFill fontSize={20} color={ifThenElse(selectedTemp.length, '#EF444450', '#EF4444')} />
                                }
                              />
                            </>
                          )}
                          {tabValue === 1 && (
                            <IconButton
                              parentColor='#DCFCE7'
                              onClick={() => {
                                setSelectedItem(item);
                                setReactivateInfo(true);
                              }}
                              icons={
                                <RiUserReceived2Fill fontSize={20} color='#22C55E' />
                              }
                            />
                          )}
                        </ButtonWrapper>
                      </TableCell>
                    </TableRow>
                  ))
                ))
              ), (
                <TableRow>
                  <TableCell colSpan={12} align='center'><Typography>Data not found</Typography></TableCell>
                </TableRow>
              ))
            }
          </>
        }
      />

      {!!selectedTemp.length &&
        <Grid container mt='.5rem'>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem'}}>
              <MuiButton variant='contained' onClick={() => console.log('clicked')} size='small' sx={{ background: '#FFEDD5', color: '#EA580C' }}>Suspend Account</MuiButton>
              <MuiButton variant='contained' onClick={() => console.log('clicked')} size='small' sx={{ background: '#FECACA', color: '#DC2626' }}>Delete Account</MuiButton>
            </Box>
          </Grid>
        </Grid>
      }

      {/* delete popup */}
      <CustomModal
        open={deleteInfo}
        handleClose={() => setDeleteInfo(false)}
        title='Account Deletion'
        width='720px'
        handleConfirm={handleDelete}
        submitText='Delete'
      >
        <DeleteInfo />
      </CustomModal>
      <ConfirmationModal
        open={deleteConfirmation}
        handleClose={() => setDeleteConfirmation(false)}
        title='Confirm Account Deletion'
        content='Are you sure you want to delete the selected account?'
        withCallback
        noChange={true}
        callback={() => handleDeleteConfirm()}
        type='delete'
      />

      {/* suspend popup */}
      <CustomModal
        open={suspendInfo}
        handleClose={() => setSuspendInfo(false)}
        title='Account Suspension'
        width='544px'
        handleConfirm={handleSuspend}
        submitText='Suspend'
      >
        <SuspendInfo />
      </CustomModal>
      <ConfirmationModal
        open={suspendConfirmation}
        handleClose={() => setSuspendConfirmation(false)}
        title='Confirm Account Suspension'
        content='Are you sure you want to suspend the selected account? You can reactivate account later.'
        withCallback
        noChange={true}
        callback={() => handleSuspendConfirm()}
        type='suspend'
      />

      {/* reactivate popup */}
      <CustomModal
        open={reactivateInfo}
        handleClose={() => setReactivateInfo(false)}
        title='Account Reactivation'
        width='720px'
        handleConfirm={handleReactivate}
        submitText='Reactivate'
      >
        <ReactivateInfo />
      </CustomModal>
      <ConfirmationModal
        open={reactivateConfirmation}
        handleClose={() => setReactivateConfirmation(false)}
        title='Confirm Account Reactivation'
        content='Are you sure you want to reactivate the selected account?'
        withCallback
        noChange={true}
        callback={() => handleReactivateConfirm()}
        type='reactivate'
      />
    </>
  );
}

export default AttendanceTable;