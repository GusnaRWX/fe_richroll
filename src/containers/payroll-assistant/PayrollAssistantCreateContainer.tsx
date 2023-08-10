import React, { useEffect } from 'react';
import Layout from '@/components/_shared/_core/layout/Index';
import PayrollAssistantCreate from '@/components/payroll-assistant/create/PayrollAssistantCreate';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getDetailPayrollRequested } from '@/store/reducers/slice/payroll/payrollSlice';

const PayrollAssistantCreateContainer = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelectors((state) => state.payroll);
  useEffect(() => {
    dispatch({
      type: getDetailPayrollRequested.toString(),
      payload: {
        id: id
      }
    });
  }, []);
  return (
    <Layout>
      <PayrollAssistantCreate />
    </Layout>);
};

export default PayrollAssistantCreateContainer;