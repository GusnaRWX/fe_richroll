import React, {useEffect} from 'react';
import Layout from '@/components/_shared/_core/layout/Index';
import CreateCNBComponent from '@/components/cnb/create';
import { useAppDispatch } from '@/hooks/index';
import { getListBaseCompensationRequested, getListSuppCompensationRequested } from '@/store/reducers/slice/options/optionSlice';

const CreateCNBContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch({
      type: getListBaseCompensationRequested.toString()
    });
    dispatch({
      type: getListSuppCompensationRequested.toString()
    });
  }, []);

  return (
    <Layout>
      <CreateCNBComponent />
    </Layout>
  );
};

export default CreateCNBContainer;
