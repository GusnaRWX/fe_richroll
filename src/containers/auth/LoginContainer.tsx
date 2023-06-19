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
  console.log(isAdmin);
  
  const dispatch = useDispatch();

  const handleLogin = (payload: Login.Form) => {
    dispatch({
      type: loginRequested.toString(),
      payload: payload
    });
  };

  if (isAdmin) {
    return <AdminComponent doLogin={handleLogin} />;
  } else {
    return <LoginComponent doLogin={handleLogin} />;
  }
};

export default LoginContainer;