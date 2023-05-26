import React, { useEffect } from 'react';
import Layout from '@/components/_shared/_core/layout/Index';
import EmployeeCreateComponent from '@/components/employees/create/EmployeeCreateComponent';
import { useAppDispatch } from '@/hooks/index';
import { getListDepartmentRequested, getListCnbRequested } from '@/store/reducers/slice/options/optionSlice';
import { getCompensationComponentOptionRequested } from '@/store/reducers/slice/cnb/compensationSlice';

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
  }, []);
  return (
    <Layout>
      <EmployeeCreateComponent />
    </Layout>
  );
}

export default EmployeeCreateContainer;