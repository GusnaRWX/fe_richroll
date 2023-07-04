import React from 'react';
import LoginComponent from '@/components/auth/login/LoginComponent';
import AdminComponent from '@/components/auth/admin/AdminComponent';
import { useDispatch } from 'react-redux';
import { loginRequested } from '@/store/reducers/slice/auth/loginSlice';
import { Login } from '@/types/component';

interface LoginProps {
  isAdmin: boolean;
}

const LoginContainer = (props: LoginProps) => {
  const { isAdmin } = props;
  const [hydrated, setHydrated] = React.useState(false);
  
  const dispatch = useDispatch();

  const handleLogin = (payload: Login.Form) => {
    dispatch({
      type: loginRequested.toString(),
      payload: payload
    });
  };

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return null;
  }
  return (
    <>
      {!!isAdmin && <AdminComponent doLogin={handleLogin} />}
      {!isAdmin && <LoginComponent doLogin={handleLogin} />}
    </>
  );
};

export default LoginContainer;