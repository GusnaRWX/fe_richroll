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

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-end;
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
  { id: 'user.name', label: 'Employee Name' },
  { id: 'position', label: 'Position' },
  { id: 'department', label: 'Department' },
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
    // setPage(0);
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

  useEffect(() => {
    console.log(companyData);

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
  }, [rowsPerPage, page, sort, direction]);

  useEffect(() => {
    setHaydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <CustomModal
      open={open}
      handleClose={handleClose}
      title='Select Employees'
      width='640px'
      handleConfirm={onConfirm}
      submitText='Add Employee'
    >
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                            <NameWrapper>
                              <Avatar
                                src={ifThenElse(item?.user?.userInformation !== null, item?.user?.userInformation?.picture, item.user.name)}
                                alt={ifThenElse(item?.user?.userInformation !== null, item?.user?.userInformation?.picture, item.user.name)}
                                sx={{
                                  width: 24, height: 24
                                }}
                              />
                              &nbsp;{item.user.name}
                            </NameWrapper>
                          </TableCell>
                          <TableCell>{item.position.name}</TableCell>
                          <TableCell>{item.department.name}</TableCell>
                          <TableCell>
                            <ButtonWrapper>
                              <Checkbox onChange={(e) => onSelected(item, e)} checked={checkVal(item.id)} />
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
        </Grid>
      </Grid>
    </CustomModal>
  );
}

export default AttendanceModal;