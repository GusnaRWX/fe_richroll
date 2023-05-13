import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { get } from '@/utils/services';
import { useAppDispatch } from '@/hooks/index';
import { meSuccessed } from '@/store/reducers/slice/auth/meSlice';

function callback() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token } = router.query;

  useEffect(() => {
    async function getToken() {
      if (token) {
        window.localStorage.setItem('accessToken', token as string);

        const res = await get('authentication/me');
        dispatch({
          type: meSuccessed.toString(),
          payload: res.data.data
        });
        router.push('/company');
      }
    }
    getToken();
  }, [token]);

  return <div>Authenticating...</div>;
}

export default callback;