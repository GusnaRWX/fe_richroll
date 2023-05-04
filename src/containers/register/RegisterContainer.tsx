/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import RegisterComponent from '@/components/register/RegisterComponent';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { countriesRequested } from '@/store/reducers/slice/options/optionSlice';


function RegisterContainer() {
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selector = useAppSelectors(state => state.option.countries);

  useEffect(() => {
    dispatch({
      type: countriesRequested.toString()
    });
  }, []);

  return (
    <RegisterComponent/>
  );
}

export default RegisterContainer;