import React, { useState } from 'react';
import { Input } from '@/components/_shared/form';
import { Grid, Card, Typography, Button as MuiButton, Box } from '@mui/material';
import styled from '@emotion/styled';
import { getCompanyData } from '@/utils/helper';
import { useForm, useAppDispatch } from '@/hooks/index';
import { postDepartmentRequested } from '@/store/reducers/slice/company-management/department/departmentSlice';

const TopWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 width: 100%;
 margin-bottom: 1rem;
`;

const BackWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-start;
 gap: 1rem;
`;

const ButtonWrapper = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: flex-end;
 gap: 1rem;
 margin-top: 10px;
 margin-bottom: 1rem;
`;

const ContentWrapper = styled(Card)(({
  padding: '2rem'
}));

function DepartmentComponent() {
  const dispatch = useAppDispatch();
  const companyData = getCompanyData();  

  const [initialValues] = useState({
    department: '',
    position: '',
  });

  const validate = (fieldOfValues = values) => {
    const temp = { ...errors };

    if ('department' in fieldOfValues)
      temp.department = fieldOfValues.department ? '' : 'This field is required';

    if ('position' in fieldOfValues){
      temp.position = fieldOfValues.position ? '' : 'This field is required';
    }

    setErrors({
      ...temp
    });

    if (fieldOfValues === values)
      return Object.values(temp).every(x => x === '');
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(initialValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch({
      type: postDepartmentRequested.toString(),
      payload: {companyID: companyData?.id?.toString(), name: values.department, position: values.position }
    });

    resetForm();
  };

  return (
    <>
      <TopWrapper>
        <BackWrapper >
          <Typography component='h3' fontWeight='bold'>Department</Typography>
        </BackWrapper>
        <ButtonWrapper>
          <MuiButton variant='contained' onClick={handleSubmit} size='small' color='primary'>Save</MuiButton>
        </ButtonWrapper>
      </TopWrapper>
      <ContentWrapper>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Input
                name='department'
                customLabel='Department'
                placeholder='Input Department'
                withAsterisk={true}
                onChange={handleInputChange}
                size='small'
                value={values.department}
                error={errors.department}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Input
                name='position'
                customLabel='Position'
                placeholder='Input Position'
                withAsterisk={true}
                onChange={handleInputChange}
                size='small'
                value={values.position}
                error={errors.position}
              />
            </Grid>
          </Grid>
        </Box>
      </ContentWrapper>
    </>
  );
}

export default DepartmentComponent;