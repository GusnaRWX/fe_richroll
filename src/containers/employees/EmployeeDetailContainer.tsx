import React, { useEffect } from 'react';
import EmployeeDetailComponent from '@/components/employees/detail/EmployeeDetailComponent';
import Layout from '@/components/_shared/_core/layout/Index';
import { useAppDispatch } from '@/hooks/index';
import {
  employeeInfoDetailRequested,
  personalInfoDetailRequested,
  emergencyContactDetailRequested
} from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { useRouter } from 'next/router';

function EmployeeDetailContainer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const fetchData = async () => {
      dispatch({
        type: employeeInfoDetailRequested.toString(),
        payload: router.query.id
      });
      dispatch({
        type: personalInfoDetailRequested.toString(),
        payload: router.query.id
      });
      dispatch({
        type: emergencyContactDetailRequested.toString(),
        payload: router.query.id
      });
    };
    fetchData();
  }, [router]);
  return (
    <Layout>
      <EmployeeDetailComponent />
    </Layout>
  );
}

export default EmployeeDetailContainer;