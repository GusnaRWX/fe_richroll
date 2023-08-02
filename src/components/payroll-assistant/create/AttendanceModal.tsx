import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
  Grid,
  Checkbox,
  TableCell,
  TableRow,
  Avatar,
  Box,
  TableSortLabel,
  Typography
} from '@mui/material';
import CustomModal from '@/components/_shared/common/CustomModal';
import Table from '@/components/_shared/form/Table';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getEmployeeRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { getCompanyData, compareCheck, ifThenElse } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';
import { useTranslation } from 'react-i18next';

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 gap: .5rem;
`;

const NameWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 margin: 0;
`;

const headerItemsEmployees = [
  { id: 'action', label: '' },
  { id: 'user.name', label: 'employee_name' },
  { id: 'position', label: 'position' },
  { id: 'department', label: 'department' },
];

type Order = 'asc' | 'desc'

interface AttendanceModalProp {
  open: boolean;
  handleClose: () => void;
  selected: Array<object>;
  setSelected: Dispatch<SetStateAction<Array<object>>>;
}

function AttendanceModal({
  open,
  handleClose,
  selected,
  setSelected
}: AttendanceModalProp) {
  const dispatch = useAppDispatch();
  const data = useAppSelectors(state => state.employee.data);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const [hydrated, setHaydrated] = useState(false);
  const [selectedTemp, setSelectedTemp] = useState(selected);
  const companyData = getCompanyData();
  const {t} = useTranslation();
  const t_addEmployee = 'attendance_&_leave.attendance_entries.popup.add_employee';
  const t_addEmployeeTableHeader = 'attendance_&_leave.attendance_entries.popup.add_employee.table_cols_item';

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    const isAsc = compareCheck(sort === headId, direction === 'asc');
    setDirection(ifThenElse(isAsc, 'desc', 'asc'));
    setSort(headId);
  };

  const onSelected = (item, e) => {
    if (e.target.checked) {
      const temp = [...selectedTemp, { id: item.id, picture: item?.user?.userInformation?.picture, name: item.user.name }];
      setSelectedTemp(temp);
    } else {
      const temp = selectedTemp.filter(v => v['id'] !== item.id);
      setSelectedTemp(temp);
    }
  };

  const checkVal = (id) => {
    return selectedTemp.some(v => v['id'] === id);
  };

  const onConfirm = () => {
    setSelected(selectedTemp);
    handleClose();
  };

  const loadDataEmployee = () => {
    dispatch({
      type: getEmployeeRequested.toString(),
      payload: {
        page: page,
        itemPerPage: rowsPerPage,
        sort: sort,
        direction: direction.toUpperCase(),
        search: '',
        isActive: true,
        companyID: companyData?.id
      }
    });
  };

  useEffect(() => {
    loadDataEmployee();
  }, [rowsPerPage, page, sort, direction]);

  useEffect(() => {
    setHaydrated(true);
  }, []);

  useEffect(() => {
    setSelectedTemp(selected);
    setRowsPerPage(5);
    setPage(1);
    setDirection('desc');
    setSort('');
  }, [selected]);

  if (!hydrated) {
    return null;
  }

  const onSelectedAll = (items, e) => {
    const pageItems = items?.map(item => ({
      id: item.id,
      picture: item?.user?.userInformation?.picture,
      name: item.user.name
    }));

    if (e.target.checked) {
      setSelectedTemp(prevSelectedTemp => [...prevSelectedTemp, ...pageItems]);
    } else {
      setSelectedTemp(prevSelectedTemp => prevSelectedTemp.filter(selectedItem => !pageItems?.some(item => item?.id === selectedItem['id'])));
    }
  };

  const checkValAll = (items) => {
    const checkedPerPage = selectedTemp?.filter(selectedItem => items?.some(item => item?.id === selectedItem['id'])).length;
    const lengthPerPage = rowsPerPage;

    return checkedPerPage === lengthPerPage;
  };

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title={t(`${t_addEmployee}.title`)}
      width='800px'
      handleConfirm={onConfirm}
      submitText={t('button.add_employee')}
      keepMounted={false}
    >
      <Grid container>
        <Grid item xs={12}>
          <Table
            count={data?.itemTotals}
            rowsPerPageOptions={[5]}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onRowsPerPagesChange={(e) => handleChangeRowsPerPage(e)}
            headChildren={
              <TableRow>
                {
                  headerItemsEmployees.map((item) => (
                    ifThenElse(item.id === 'action', (
                      <TableCell key={item.id}>
                        <Checkbox onChange={(e) => onSelectedAll(data?.items?.slice(0, rowsPerPage), e)} checked={checkValAll(data?.items?.slice(0, rowsPerPage))} />
                      </TableCell>
                    ), (
                      <TableCell key={item.id} sortDirection={ifThenElse(sort === item.id, direction, false)}>
                        <TableSortLabel
                          active={sort === item.id}
                          direction={ifThenElse(sort === item.id, direction, 'asc')}
                          onClick={(e) => handleRequestSort(e, item.id)}
                        >
                          {item.label === '' ? '' : t(`${t_addEmployeeTableHeader}.${item.label}`)}
                          {ifThenElse(sort === item.id, (
                            <Box component='span' sx={visuallyHidden}>
                              {ifThenElse(direction === 'asc', 'sorted descending', 'sorted ascending')}
                            </Box>
                          ), null)}
                        </TableSortLabel>
                      </TableCell>
                    ))
                  ))
                }
                <TableCell></TableCell>
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
                          <TableCell>
                            <ButtonWrapper>
                              <Checkbox onChange={(e) => onSelected(item, e)} checked={checkVal(item?.id)} />
                            </ButtonWrapper>
                          </TableCell>
                          <TableCell>
                            <NameWrapper>
                              <Avatar
                                src={ifThenElse(item?.user?.userInformation !== null, item?.user?.userInformation?.picture, item?.user?.name)}
                                alt={ifThenElse(item?.user?.userInformation !== null, item?.user?.userInformation?.picture, item?.user?.name)}
                                sx={{
                                  width: 24, height: 24
                                }}
                              />
                              &nbsp;{item?.user?.name}
                            </NameWrapper>
                          </TableCell>
                          <TableCell>{item?.position?.name}</TableCell>
                          <TableCell>{item?.department?.name}</TableCell>
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
        </Grid>
      </Grid>
    </CustomModal>
  );
}

export default AttendanceModal;