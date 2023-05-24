import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Button as MuiButton,
  Box,
  Chip,
  SelectChangeEvent ,
  InputAdornment,
} from '@mui/material';
import { useFormik } from 'formik';
import { styled as MuiStyled } from '@mui/material/styles';
import { HiPencilAlt } from 'react-icons/hi';
import { useAppSelectors, useAppDispatch } from '@/hooks/index';
import { Select, Input, RadioGroup } from '@/components/_shared/form';
import { Employees } from '@/types/employees';
import { Add, Delete } from '@mui/icons-material';
import { getDetailCnbRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';

const ContentWrapper = MuiStyled(Box)(() => ({
  padding: '1rem',
  borderRadius: '5px',
  backgroundColor: '#F9FAFB',
  width: '100%'
}));

const TopWrapper = MuiStyled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: '1rem'
}));

interface TempSuplementaryType {
  compensation: string | number;
  tax: string;
  rate: string | number;
  period: string | number;
}

function CnbCreateForm() {
  const [isEdit, setIsEdit] = useState(false);
  const {option, employee} = useAppSelectors((state) => state);
  const dispatch = useAppDispatch();
  const [suplementary, setSuplementary] = useState<Array<TempSuplementaryType>>([]);
  console.log(employee.detailCnb);


  const formik = useFormik({
    initialValues: {
      profile: '',
      baseCompensation: '',
      baseTax: '',
      baseRate: '',
      basePeriod: '',
      suplementary: suplementary
    } as Employees.CnbValues,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  const handleAddSuplementary =  () => {
    const data = {
      compensation: '',
      tax: '',
      rate: '',
      period: '',
    };
    setSuplementary((prevState) => [...prevState, data]);
  };

  const handleDeleteItems = (index: number) => {
    const temp = [...suplementary];
    temp.splice(index, 1);
    setSuplementary(temp);
  };

  useEffect(() => {
    if (isEdit !== false){
      const data: Array<{compensation: string | number, tax: string, rate: string | number, period: string | number}> = [];
      formik.setFieldValue('baseCompensation', employee?.detailCnb?.baseCompensation[0]?.id);
      formik.setFieldValue('baseTax', employee?.detailCnb?.baseCompensation[0]?.taxStatus === false ? 'Non-Taxable' : 'Taxable');
      formik.setFieldValue('basePeriod', employee?.detailCnb?.baseCompensation[0]?.period);
      formik.setFieldValue('baseRate', employee?.detailCnb?.baseCompensation[0]?.rate > 0 || employee?.detailCnb?.baseCompensation[0]?.rate !== null ? employee?.detailCnb?.baseCompensation[0]?.rate : employee?.detailCnb?.baseCompensation[0]?.amount);
      employee?.detailCnb.supplementaryCompensation.map((item) => {
        data.push({
          compensation: item?.id,
          tax: item?.taxStatus === false ?  'Non-Taxable' : 'Taxable',
          rate: item?.rate > 0 || item?.rate !== null ? item?.rate : item?.amount,
          period: item?.period
        });
      });
      const temp = [...data];
      console.log(temp);
      setSuplementary(temp);
      formik.setFieldValue('suplementary', temp);
    }
  }, [isEdit]);
  return (
    <>
      <Grid container mb='2rem'>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Select
            fullWidth
            customLabel='Compensation and Benefit Profile'
            withAsterisk
            variant='outlined'
            size='small'
            name='profile'
            value={formik.values.profile}
            onChange={(e: unknown) => {
              formik.handleChange(e);
              dispatch({
                type: getDetailCnbRequested.toString(),
                payload: (e as SelectChangeEvent).target.value
              });
            }}
            options={option?.listCnb}
          />
        </Grid>
      </Grid>
      {
        Object.keys(employee?.detailCnb).length !== 0 && isEdit === false && (
          <>
            <ContentWrapper>
              <TopWrapper>
                <Typography
                  fontSize='16px'
                  color='primary'
                  fontWeight='Bold'
                >
                  Base
                </Typography>
                <MuiButton variant='contained' onClick={() => setIsEdit(true)} size='small' color='secondary' sx={{ color: '#FFFFFF' }}><HiPencilAlt/>&nbsp;Edit</MuiButton>
              </TopWrapper>
              {
                employee?.detailCnb?.baseCompensation.map((item, index) => (
                  <Box key={index}>
                    <Grid mb='2rem' container spacing={2}>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Typography fontSize='14px' color='gray' mb='.5rem'>Compensation Component</Typography>
                        <Typography fontSize='14px'>{item?.id}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Typography fontSize='14px' color='gray' mb='.5rem'>Tax Status</Typography>
                        <Chip label={!item?.taxStatus ? 'Non-Taxable' : 'Taxable'}/>
                      </Grid>
                    </Grid>
                    <Typography fontSize='14px' color='gray' mb='.5rem'>Rate</Typography>
                    <Typography mb='2.5rem' fontSize='14px'>Rp.{ item?.amount+ ' '} {item?.period}</Typography>
                  </Box>
                ))
              }
              <Typography
                fontSize='16px'
                color='primary'
                fontWeight='Bold'
                mb='1rem'
              >
                  Supplementary
              </Typography>
              {
                employee?.detailCnb?.supplementaryCompensation.map((item, index) => (
                  <Box key={index}>
                    <Grid mb='2rem' container spacing={2}>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Typography fontSize='14px' color='gray' mb='.5rem'>Compensation Component</Typography>
                        <Typography fontSize='14px'>{item?.id}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Typography fontSize='14px' color='gray' mb='.5rem'>Tax Status</Typography>
                        <Chip label={!item.taxStatus ? 'Non-Taxable' : 'Taxable'}/>
                      </Grid>
                    </Grid>
                    <Typography fontSize='14px' color='gray' mb='.5rem'>Amount per Mounth</Typography>
                    <Typography mb='2.5rem' fontSize='14px'>Rp.{ item?.amount + ' ' + item?.period }</Typography>
                  </Box>
                ))
              }
            </ContentWrapper>
          </>
        )
      }
      {
        isEdit === true && formik.values.profile !== '' && (
          <>
            <Typography mb='1rem' fontSize='20px' fontWeight='bold' color='primary'>{formik.values.profile}</Typography>
            <Typography mb='1.5rem' fontSize='16px' fontWeight='bold' color='primary'>Base</Typography>
            <Grid mb='1rem' container spacing={3}>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Select
                  customLabel='Compensation Component'
                  size='small'
                  value={formik.values.baseCompensation}
                  onChange={formik.handleChange}
                  withAsterisk
                  fullWidth
                  name='baseCompensation'
                  options={[
                    { label: 'Salary', value: 'salary' },
                    { label: 'Wage', value: 'Wage' },
                    {label: 'Comission', value: 'Commision'},
                    {label: 'Piece Rate', value: 'Piece Rate'}
                  ]}
                />
              </Grid>
              <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <RadioGroup
                  withAsterisk
                  label='Tax Status'
                  name='baseTax'
                  value={formik.values.baseTax}
                  onChange={formik.handleChange}
                  options={[
                    { label: 'Taxable', value: 'Taxable' },
                    { label: 'Non-Taxable', value: 'Non-Taxable' }
                  ]}
                  row
                />
              </Grid>
            </Grid>
            <Grid mb='2rem' container spacing={2}>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <Input
                  customLabel='Rate'
                  withAsterisk
                  name='baseRate'
                  value={formik.values.baseRate}
                  size='small'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <Typography color='grey.500'>IDR</Typography>
                      </InputAdornment>
                    ),
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Typography color='grey.500'>Rp</Typography>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid mt='1.5rem' item xs={3} sm={3} md={3} lg={3} xl={3}>
                <Select
                  customLabel=''
                  size='small'
                  value={formik.values.basePeriod}
                  onChange={formik.handleChange}
                  fullWidth
                  name='basePeriod'
                  options={[
                    { label: 'Per Hour', value: 'Per Hour' },
                    { label: 'Per Day', value: 'Per Day' },
                    {label: 'Per Week', value: 'Per Week'},
                    {label: 'Per Month', value: 'Per Month'},
                    {label: 'Per Year', value: 'Per Year'}
                  ]}
                />
              </Grid>
            </Grid>
            {
              suplementary.length > 0 && (
                <>
                  <Typography mb='1rem' color='primary' fontWeight='bold' fontSize='16px' >Suplementary</Typography>
                  {
                    suplementary.map((item, index) => (
                      <Box key={index} sx={{ width: '100%' }}>
                        <Grid mb='1rem' container spacing={4}>
                          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                            <Select
                              customLabel={'Compensation Component'}
                              size='small'
                              value={formik.values.suplementary[index]?.compensation}
                              onChange={formik.handleChange}
                              withAsterisk
                              fullWidth
                              name='compensation'
                              options={[
                                { label: 'Bonus', value: 'Bonus' },
                                { label: 'Overtime', value: 'Overtime' },
                                {label: 'Comission', value: 'Commision'},
                                {label: 'Piece Rate', value: 'Piece Rate'},
                                {label: 'Wage', value: 'Wage'},
                                {label: 'Salary', value: 'Salary'}
                              ]}
                            />
                          </Grid>
                          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                            <RadioGroup
                              withAsterisk
                              label='tax'
                              name='baseTax'
                              value={formik.values.suplementary[index]?.tax}
                              onChange={formik.handleChange}
                              options={[
                                { label: 'Taxable', value: 'Taxable' },
                                { label: 'Non-Taxable', value: 'Non-Taxable' }
                              ]}
                              row
                            />
                          </Grid>
                          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                            <MuiButton
                              variant='contained'
                              sx={{
                                backgroundColor: '#FEE2E2',
                                color: '#B91C1C'
                              }}
                              size='small'
                              onClick={() => handleDeleteItems(index)}>
                              <Delete />&nbsp; Delete
                            </MuiButton>
                          </Grid>
                        </Grid>
                        <Grid mb='2rem' container spacing={2}>
                          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                            <Input
                              customLabel='Amount'
                              withAsterisk
                              name='rate'
                              value={formik.values.suplementary[index]?.rate}
                              size='small'
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position='end'>
                                    <Typography color='grey.500'>IDR</Typography>
                                  </InputAdornment>
                                ),
                                startAdornment: (
                                  <InputAdornment position='start'>
                                    <Typography color='grey.500'>Rp</Typography>
                                  </InputAdornment>
                                )
                              }}
                            />
                          </Grid>
                          <Grid mt='1.5rem' item xs={3} sm={3} md={3} lg={3} xl={3}>
                            <Select
                              customLabel=''
                              size='small'
                              value={formik.values.suplementary[index]?.period}
                              onChange={formik.handleChange}
                              fullWidth
                              name='period'
                              options={[
                                { label: 'Per Hour', value: 'Per Hour' },
                                { label: 'Per Day', value: 'Per Day' },
                                {label: 'Per Week', value: 'Per Week'},
                                {label: 'Per Month', value: 'Per Month'},
                                {label: 'Per Year', value: 'Per Year'}

                              ]}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                    ))
                  }
                </>
              )
            }
            <MuiButton
              size='small'
              variant='contained'
              color='secondary'
              sx={{ color: '#FFFFFF' }}
              onClick={handleAddSuplementary}>
              <Add />&nbsp;Add Supplementary Compensation
            </MuiButton>
          </>
        )
      }
    </>
  );
}

export default CnbCreateForm;