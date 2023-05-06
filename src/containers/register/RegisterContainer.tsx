import React, { useEffect } from 'react';
import RegisterComponent from '@/components/register/RegisterComponent';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { countriesRequested } from '@/store/reducers/slice/options/optionSlice';
import { registerRequested } from '@/store/reducers/slice/auth/registerSlice';
import { Register } from '@/types/component';
import MetaHead from '@/components/_shared/_core/layout/MetaHead';


function RegisterContainer() {
  const dispatch = useAppDispatch();

  const selector = useAppSelectors(state => state.option.countries);

  useEffect(() => {
    dispatch({
      type: countriesRequested.toString()
    });
  }, []);

  const handleRegister = (payload: Register.Form) => {
    dispatch({
      type: registerRequested.toString(),
      payload: payload
    });
  };

  return (
    <>
      <MetaHead title='Kayaroll - Register' />
      <RegisterComponent countries={selector} doRegister={handleRegister} />
    </>
  );
}

export default RegisterContainer;