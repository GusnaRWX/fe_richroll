import React, { useEffect } from 'react';
import Layout from '@/components/_shared/_core/layout/Index';
import EmploymentEditComponent from '@/components/employe/employement/edit/EmploymentEditComponent';
import { useAppDispatch } from '@/hooks/index';
import {
  getDetailCnbRequested,
  getDetailEmergencyContactRequested,
  getDetailInformationRequested,
  getDetailPersonalInfoRequested
} from '@/store/reducers/slice/employment/employmentSlice';
import { useRouter } from 'next/router';

function EmploymentEditContainer() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    const fetchData = () => {
      dispatch({
        type: getDetailCnbRequested.toString()
      });
      dispatch({
        type: getDetailEmergencyContactRequested.toString()
      });
      dispatch({
        type: getDetailInformationRequested.toString()
      });
      dispatch({
        type: getDetailPersonalInfoRequested.toString()
      });
    };
    fetchData();
  }, [router]);
  return (
    <Layout>
      <EmploymentEditComponent />
    </Layout>
  );
}

export default EmploymentEditContainer;