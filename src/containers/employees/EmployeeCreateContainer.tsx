import React, { useEffect } from 'react';
import Layout from '@/components/_shared/_core/layout/Index';
import EmployeeCreateComponent from '@/components/employees/create/EmployeeCreateComponent';
import { useAppDispatch } from '@/hooks/index';
import { getListDepartmentRequested, getListCnbRequested, getListPositionRequested } from '@/store/reducers/slice/options/optionSlice';
import { getCompensationComponentOptionRequested } from '@/store/reducers/slice/cnb/compensationSlice';
import { getCompanyData } from '@/utils/helper';

function EmployeeCreateContainer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: getListDepartmentRequested.toString()
    });
    dispatch({
      type: getListCnbRequested.toString()
    });
    dispatch({
      type: getCompensationComponentOptionRequested.toString()
    });
    dispatch({
      type: getListPositionRequested.toString(),
      payload: {
        departmentID: getCompanyData()?.id
      }
    });
  }, []);
  return (
    <Layout>
      <EmployeeCreateComponent />
    </Layout>
  );
}

export default EmployeeCreateContainer;