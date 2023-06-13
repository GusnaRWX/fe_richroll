import React, { useEffect } from 'react';
import EmployeeEditComponent from '@/components/employees/edit/EmployeeEditComponent';
import Layout from '@/components/_shared/_core/layout/Index';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getListDepartmentRequested, getListPositionRequested, getListOptionWorkScheduleRequested } from '@/store/reducers/slice/options/optionSlice';
import { employeeInfoDetailRequested, personalInfoDetailRequested, emergencyContactDetailRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { useRouter } from 'next/router';
import { getCompanyData } from '@/utils/helper';
import { OverlayLoading } from '@/components/_shared/common';

function EmployeeEditContainer() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelectors(state => state.employee);
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
    dispatch({
      type: emergencyContactDetailRequested.toString(),
      payload: router.query.id
    });
    dispatch({
      type: getListOptionWorkScheduleRequested.toString(),
      payload: getCompanyData()?.id
    });
  }, []);
  return (
    <Layout>
      <OverlayLoading open={isLoading} />
      <EmployeeEditComponent />
    </Layout>
  );
}

export default EmployeeEditContainer;