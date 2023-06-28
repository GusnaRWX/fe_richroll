import React, { useEffect, useState } from 'react';
import { CustomModal } from '../_shared/common';
import { Avatar, Box, Grid, TableCell, TableRow, TableSortLabel } from '@mui/material';
import Table from '../_shared/form/Table';
import { compareCheck, getCompanyData, ifThenElse } from '@/utils/helper';
import { visuallyHidden } from '@mui/utils';
import store from '@/store/index';
import { getEmployeeRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { useAppSelectors } from '@/hooks/index';
import styled from '@emotion/styled';
import EmptyState from '../_shared/common/EmptyState';

interface LeaveEntriesListComponentProps {
  open: boolean;
  onClose: () => void;
  dispatch: typeof store.dispatch
}

const NameWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 margin: 0;
`;

type Order = 'asc' | 'desc'

const LeaveEntriesListComponent: React.FC<LeaveEntriesListComponentProps> = ({
  open,
  onClose,
  dispatch
}) => {
  const data = useAppSelectors(state => state.employee.data);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [direction, setDirection] = useState<Order>('desc');
  const [sort, setSort] = useState('');
  const companyData = getCompanyData();
  const [hydrated, setHydrated] = useState(false);

  const headerItemsEmployees = [
    { id: '', label: '' },
    { id: 'user.name', label: 'Employee Name' },
    { id: 'position', label: 'Position' },
    { id: 'department', label: 'Department' }
  ];

  const handleRequestSort = (event: React.MouseEvent<unknown>, headId: string) => {
    const isAsc = compareCheck(sort === headId, direction === 'asc');
    setDirection(ifThenElse(isAsc, 'desc', 'asc'));
    setSort(headId);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
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
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }

  return (
    <CustomModal
      handleClose={onClose}
      open={open}
      title='Select Employees'
      width='800px'
      keepMounted={false}
      submitText='Select Employee'
      handleConfirm={() => { console.log('goodby'); }}
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
                {headerItemsEmployees.map(item => (
                  item.label === '' && item.id === '' ? (
                    <TableCell key={item.id}></TableCell>
                  ) : (
                    <TableCell key={item.id} sortDirection={ifThenElse(sort === item.id, direction, false)}>
                      <TableSortLabel
                        active={sort === item.id}
                        direction={sort === item.id ? direction : 'asc'}
                        onClick={(e) => handleRequestSort(e, item.id)}
                      >
                        {item.label}
                        {item.id !== '' && (
                          sort === item.id ? (
                            <Box component='span' sx={visuallyHidden}>
                              {ifThenElse(direction === 'asc', 'sorted descending', 'sorted ascending')}
                            </Box>
                          ) : null
                        )}
                      </TableSortLabel>
                    </TableCell>
                  )

                ))}
              </TableRow>
            }
            bodyChildren={
              <>
                {
                  ifThenElse(typeof data?.items !== 'undefined', (
                    ifThenElse(data?.items?.length === 0, (
                      <TableRow>
                        <TableCell colSpan={12} align='center'>
                          <EmptyState />
                        </TableCell>
                      </TableRow>
                    ), (
                      data?.items?.map((item, index) => (
                        <TableRow key={index}>
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
                      <TableCell colSpan={12} align='center'>
                        <EmptyState />
                      </TableCell>
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
};

export default LeaveEntriesListComponent;