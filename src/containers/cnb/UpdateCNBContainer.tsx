import React, { useEffect } from 'react';
import Layout from '@/components/_shared/_core/layout/Index';
import UpdateCNBComponent from '@/components/cnb/update';
import { useAppDispatch } from '@/hooks/index';
import { useRouter } from 'next/router';
import { getDetailRequested } from '@/store/reducers/slice/cnb/compensationSlice';

const UpdateCNBContainer = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchData = () => {
      dispatch({
        type: getDetailRequested.toString(),
        Id: id
      });
    };
    fetchData();
  }, [id]);
  console.log(id, 'id');
  return (
    <Layout>
      <UpdateCNBComponent />
    </Layout>
  );
};

export default UpdateCNBContainer;
