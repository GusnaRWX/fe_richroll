import React, { useEffect } from 'react';
import Layout from '@/components/_shared/_core/layout/Index';
import PersonalInformationComponent from '@/components/employe/employement/personal-information/PersonalInformationComponent';
import { useAppDispatch } from '@/hooks/index';
import {
  getDetailCnbRequested,
  getDetailEmergencyContactRequested,
  getDetailInformationRequested,
  getDetailPersonalInfoRequested
} from '@/store/reducers/slice/employment/employmentSlice';
import { useRouter } from 'next/router';

const EmployeContainer = () => {
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
      <PersonalInformationComponent />
    </Layout>
  );
};

export default EmployeContainer;