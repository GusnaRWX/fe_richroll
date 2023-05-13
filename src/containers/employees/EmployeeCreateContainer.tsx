import React, { useEffect } from 'react';
import Layout from '@/components/_shared/_core/layout/Index';
import EmployeeCreateComponent from '@/components/employees/create/EmployeeCreateComponent';
import { useAppDispatch } from '@/hooks/index';
import { getListDepartmentRequested, getListPositionRequested } from '@/store/reducers/slice/options/optionSlice';

function EmployeeCreateContainer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: getListDepartmentRequested.toString()
    });
    dispatch({
      type: getListPositionRequested.toString()
    });
  }, []);
  return (
    <Layout>
      <EmployeeCreateComponent />
    </Layout>
  );
}

export default EmployeeCreateContainer;