import React, { useEffect } from 'react';
import EmployeeEditComponent from '@/components/employees/edit/EmployeeEditComponent';
import Layout from '@/components/_shared/_core/layout/Index';
import { useAppDispatch } from '@/hooks/index';
import { getListDepartmentRequested, getListPositionRequested } from '@/store/reducers/slice/options/optionSlice';
import { employeeInfoDetailRequested, personalInfoDetailRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { useRouter } from 'next/router';
import { getCompanyData } from '@/utils/helper';

function EmployeeEditContainer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch({
      type: employeeInfoDetailRequested.toString(),
      payload: router.query.id
    });
    dispatch({
      type: personalInfoDetailRequested.toString(),
      payload: router.query.id
    });
    dispatch({
      type: getListDepartmentRequested.toString(),
      payload: getCompanyData()?.id
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
      <EmployeeEditComponent />
    </Layout>
  );
}

export default EmployeeEditContainer;