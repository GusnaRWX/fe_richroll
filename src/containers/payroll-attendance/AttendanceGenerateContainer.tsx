import React, { useEffect } from 'react';
import Layout from '@/components/_shared/_core/layout/Index';
import AttendanceGenerateComponent from '@/components/payroll-attendance/AttendanceGenerateComponent';
import { useAppDispatch } from '@/hooks/index';
import { getDetailPayrollRequested } from '@/store/reducers/slice/payroll/payrollSlice';
import { useRouter } from 'next/router';

const AttendanceGenerateContainer = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router?.query?.id) {
      dispatch({
        type: getDetailPayrollRequested.toString(),
        payload: {
          id: router?.query?.id
        }
      });
    }
  }, [router?.query?.id]);
  return (
    <Layout>
      <AttendanceGenerateComponent />
    </Layout>);
};

export default AttendanceGenerateContainer;