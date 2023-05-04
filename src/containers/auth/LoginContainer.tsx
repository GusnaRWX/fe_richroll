import React from 'react';
import LoginComponent from '@/components/auth/login/Index';
import { useDispatch } from 'react-redux';
import { loginRequested } from '@/store/reducers/slice/auth/loginSlice';
import { Login } from '@/types/component';

const LoginContainer = () => {
  const dispatch = useDispatch();

  const handleLogin = (payload: Login.Form) => {
    dispatch({
      type: loginRequested.toString(),
      payload: payload
    });
  };

  return <LoginComponent doLogin={handleLogin} />;
};

export default LoginContainer;