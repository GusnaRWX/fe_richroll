import React, { useEffect, useState } from 'react';
import EmployeeEditComponent from '@/components/employees/edit/EmployeeEditComponent';
import Layout from '@/components/_shared/_core/layout/Index';
import { useAppDispatch } from '@/hooks/index';
import { getListDepartmentRequested, getListOptionWorkScheduleRequested } from '@/store/reducers/slice/options/optionSlice';
import { employeeInfoDetailRequested, personalInfoDetailRequested, emergencyContactDetailRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { useRouter } from 'next/router';
import { getCompanyData } from '@/utils/helper';
import { OverlayLoading } from '@/components/_shared/common';

function EmployeeEditContainer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
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
      type: emergencyContactDetailRequested.toString(),
      payload: router.query.id
    });
    dispatch({
      type: getListOptionWorkScheduleRequested.toString(),
      payload: getCompanyData()?.id
    });
    setTimeout(() => {
      setLoaded(false);
    }, 3000);

  }, []);
  console.log(loaded);
  return (
    <Layout>
      <OverlayLoading open={loaded} />
      <EmployeeEditComponent />
    </Layout>
  );
}

export default EmployeeEditContainer;