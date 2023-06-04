import React, {useEffect} from 'react';
import Layout from '@/components/_shared/_core/layout/Index';
import CreateCNBComponent from '@/components/cnb/create';
import { useAppDispatch } from '@/hooks/index';
import { getListCompensationRequested } from '@/store/reducers/slice/options/optionSlice';

const CreateCNBContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: getListCompensationRequested.toString()
    });
  }, []);

  return (
    <Layout>
      <CreateCNBComponent />
    </Layout>
  );
};

export default CreateCNBContainer;
