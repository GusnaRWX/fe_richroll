import React, {useEffect} from 'react';
import {useRouter} from 'next/router';

function callback() {
  const router = useRouter();

  const { token } = router.query;

  useEffect(() => {
    if (token) {
      window.localStorage.setItem('accessToken', token as string);
    }

    router.push('/company');
  }, [token]);

  return <div>Authenticating...</div>;
}

export default callback;