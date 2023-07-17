import React, { useEffect } from 'react';
import Layout from '@/components/_shared/_core/layout/Index';
import PayrollAssistantCreate from '@/components/payroll-assistant/create/PayrollAssistantCreate';
import { useAppDispatch } from '@/hooks/index';
import { getDetailPayrollRequested } from '@/store/reducers/slice/payroll/payrollSlice';
import { useRouter } from 'next/router';

const PayrollAssistantCreateContainer = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({
      type: getDetailPayrollRequested.toString(),
      payload: {
        id: router?.query?.id
      }
    });
  }, []);
  return (
    <Layout>
      <PayrollAssistantCreate />
    </Layout>);
};

export default PayrollAssistantCreateContainer;