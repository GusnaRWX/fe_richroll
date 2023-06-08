/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Box,
  Chip,
  SelectChangeEvent,
  InputAdornment,
} from '@mui/material';
import { useFormik } from 'formik';
import { styled as MuiStyled } from '@mui/material/styles';
import { HiPencilAlt } from 'react-icons/hi';
import { useAppSelectors, useAppDispatch } from '@/hooks/index';
import { Select, Input, RadioGroup, Button } from '@/components/_shared/form';
import { Employees } from '@/types/employees';
import { Add, Delete } from '@mui/icons-material';
import { getDetailCnbRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { numberFormat } from '@/utils/format';
import { validationSchemeCompensationBenefits } from './validate';
import { Text } from '@/components/_shared/common';
import { compareCheck, getPaymentTypeWithoutData, ifThenElse } from '@/utils/helper';
import { getDetailRequested } from '@/store/reducers/slice/cnb/compensationSlice';

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

interface CnbEmployeeProps {
  refProp: React.Ref<HTMLFormElement>,
  cnbValues: Employees.CnbEmployeePayload,
  setValues: React.Dispatch<React.SetStateAction<Employees.CnbEmployeePayload>>
}

function CnbCreateForm({
  refProp,
  cnbValues,
  setValues
}: CnbEmployeeProps) {
  console.log(cnbValues, 'cnb values');
  const [isEdit, setIsEdit] = useState(false);
  const [modeEdit, setModeEdit] = useState(false);
  const { option, employee, compensation } = useAppSelectors((state) => state);
  const dispatch = useAppDispatch();
  const [suplementary, setSuplementary] = useState<Array<TempSuplementaryType>>([]);

  const formik = useFormik({
    initialValues: {
      templateID: cnbValues?.templateID,
      name: cnbValues?.name,
      base: {
        componentID: cnbValues?.base?.componentID,
        termID: cnbValues?.base?.termID,
        isTaxable: cnbValues?.base?.isTaxable,
        amount: cnbValues?.base?.amount,
        amountType: cnbValues?.base?.amountType,
        rate: cnbValues?.base?.rate,
        rateType: cnbValues?.base?.rateType
      },
      supplementaries: [{
        componentID: cnbValues?.supplementaries?.componentID,
        termID: cnbValues?.supplementaries?.termID,
        isTaxable: cnbValues?.supplementaries?.isTaxable,
        amount: cnbValues?.supplementaries?.amount,
        amountType: cnbValues?.supplementaries?.amountType,
        rate: cnbValues?.supplementaries?.rate,
        rateType: cnbValues?.supplementaries?.rateType
      }]
    } as Employees.CnbValues,
    validationSchema: validationSchemeCompensationBenefits,
    onSubmit: (_values) => {
      handleSubmit();
    }
  });

  const handleSubmit = () => {
    let payload = {
      compensationBenefitId: formik.values.profile
    };
    if (isEdit) {
      payload = {
        ...payload,
        ...formik.values
      };
      setValues(payload);
    } else {
      payload = {
        ...payload,
        ...employee?.detailCnb
      };
      setValues(payload);
    }
  };

  const handleAddSuplementary = () => {
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
    if (isEdit !== false) {
      const data: Array<{ compensation: string | number, tax: string, rate: string | number, period: string | number }> = [];
      formik.setFieldValue('baseCompensation', employee?.detailCnb?.baseCompensation[0]?.compensationComponent?.id);
      formik.setFieldValue('baseTax', employee?.detailCnb?.baseCompensation[0]?.taxStatus === false ? 'Non-Taxable' : 'Taxable');
      formik.setFieldValue('basePeriod', employee?.detailCnb?.baseCompensation[0]?.period);
      formik.setFieldValue('baseRate', employee?.detailCnb?.baseCompensation[0]?.rate > 0 || employee?.detailCnb?.baseCompensation[0]?.rate !== null ? employee?.detailCnb?.baseCompensation[0]?.rate : employee?.detailCnb?.baseCompensation[0]?.amount);
      employee?.detailCnb.supplementaryCompensation.map((item) => {
        data.push({
          compensation: item?.compensationComponent?.id,
          tax: item?.taxStatus === false ? 'Non-Taxable' : 'Taxable',
          rate: item?.rate > 0 || item?.rate !== null ? item?.rate : item?.amount,
          period: item?.period
        });
      });
      const temp = [...data];
      setSuplementary(temp);
      formik.setFieldValue('suplementary', temp);
    }
    const tempItems: Array<{ label: string, value: string }> = [];
    // compensationComponentOption.map((item) => {
    //   tempItems.push({
    //     label: item.name,
    //     value: item?.id
    //   });
    // });
    // setCompensation(tempItems);
  }, [isEdit]);

  return (
    <>
      <form ref={refProp}>
        <Grid container>
          <Grid
            item
          >
            <Select
              fullWidth
              name='name'
              onChange={(e) => {
                formik.handleChange(e);
                dispatch({
                  type: getDetailRequested.toString(),
                  Id: e.target.value
                });
                setModeEdit(false);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              customLabel='Compensations and Benefits Profile'
              withAsterisk
              variant='outlined'
              size='small'
              options={option?.listCnb}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string)?.length === 0) {
                  return <Text title='Select existing profile' color='grey.400' />;
                }
                const selected = option?.listCnb?.find(cnb => cnb.value === value);
                if (selected) {
                  return `${selected.label}`;
                }
                return null;
              }}
              error={compareCheck(formik.touched.name, Boolean(formik.errors.name))}
              helperText={ifThenElse(compareCheck(formik.touched.name, Boolean(formik.errors.name)), formik.errors.name, '')}
            />
          </Grid>
        </Grid>
      </form>
      {formik.values.name !== '' && !modeEdit && (
        <Box sx={{
          background: '#F9FAFB',
          padding: '16px 16px',
          borderRadius: '5px',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
          marginTop: '14px'
        }}>
          <Box>
            <Grid container justifyContent='space-between' alignItems='baseline'>
              <Grid item md={11}>
                <Text title='Base' color='primary.500' fontWeight='bold' />
              </Grid>
              <Grid item md={1}>
                <Button
                  label='Edit'
                  color='secondary'
                  size='small'
                  sx={{ color: 'white' }}
                  startIcon={<HiPencilAlt />}
                  onClick={() => { setModeEdit(true); }}
                />
              </Grid>
            </Grid>
            {Object.keys(compensation?.detail?.data?.base || {}).length > 0 && (
              <Grid container mt='16px' justifyContent='space-between' wrap='wrap'>
                <Grid
                  item
                  md={6}
                  mb='22px'
                >
                  <Text
                    title='Compensation Component'
                    color='grey.400'
                    mb='8px'
                  />
                  <Text
                    title={compensation?.detail?.data?.base?.component?.name}
                    color='grey.600'
                    fontWeight={400}
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  mb='22px'
                >
                  <Text
                    title='Tax Status'
                    color='grey.400'
                    mb='8px'
                  />
                  <Box sx={{
                    backgroundColor: '#E5E7EB',
                    borderRadius: '4px',
                    padding: '3px 12px',
                    width: '110px'
                  }}>
                    <Text
                      title={compensation?.detail?.data?.base?.isTaxable ? 'Taxable' : 'Non-Taxable'}
                      fontWeight={500}
                      fontSize='14px'
                      textAlign='center'
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  md={6}
                  mb='22px'
                >
                  <Text
                    title={getPaymentTypeWithoutData(compensation?.detail?.data?.base?.component?.type)?.title}
                    color='grey.400'
                  />
                  <Text
                    title={
                      [0, 1, 2].includes(compensation?.detail?.data?.base?.component?.type)
                        ? 'Rp' + numberFormat(compensation?.detail?.data?.base?.amount) + ' ' + compensation?.detail?.data?.base?.term?.name.toString() ?? ''
                        : 'Rp' + numberFormat(compensation?.detail?.data?.base?.rate) + ' ' + compensation?.detail?.data?.base?.term?.name.toString() ?? ''
                    }
                    color='grey.400'
                  />
                </Grid>
              </Grid>
            )}
            {compensation?.detail?.data?.supplementaries.length > 0 && (
              compensation?.detail?.data?.supplementaries?.map((supplement, index) => (
                <Grid
                  container
                  mt='16px'
                  justifyContent='space-between'
                  wrap='wrap'
                  key={index}

                >
                  <Grid
                    item
                    md={6}
                    mb='22px'
                  >
                    <Text
                      title='Compensation Component'
                      color='grey.400'
                      mb='8px'
                    />
                    <Text
                      title={supplement.component?.name}
                      color='grey.600'
                      fontWeight={400}
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    mb='22px'
                  >
                    <Text
                      title='Tax Status'
                      color='grey.400'
                      mb='8px'
                    />
                    <Box sx={{
                      backgroundColor: '#E5E7EB',
                      borderRadius: '4px',
                      padding: '3px 12px',
                      width: '110px'
                    }}>
                      <Text
                        title={supplement.isTaxable ? 'Taxable' : 'Non-Taxable'}
                        fontWeight={500}
                        fontSize='14px'
                        textAlign='center'
                      />
                    </Box>
                  </Grid>
                  <Grid
                    item
                    md={6}
                    mb='22px'
                  >
                    <Text
                      title={getPaymentTypeWithoutData(supplement?.component?.type)?.title}
                      color='grey.400'
                    />
                    <Text
                      title={
                        [0, 1, 2].includes(supplement?.component?.type)
                          ? 'Rp' + numberFormat(supplement.amount) + ' per ' + supplement.term?.name.toString() ?? ''
                          : 'Rp' + numberFormat(supplement.rate) + ' per ' + supplement.term?.name.toString() ?? ''
                      }
                      color='grey.400'
                    />
                  </Grid>
                </Grid>
              ))
            )}
          </Box>
        </Box>
      )}
      {modeEdit && (
        <Box sx={{
          background: '#F9FAFB',
          padding: '16px 16px',
          borderRadius: '5px',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.06), 0px 1px 3px rgba(0, 0, 0, 0.1)',
          marginTop: '14px'
        }}>
          <Box>
            <Grid container justifyContent='space-between' alignItems='baseline'>
              <Grid item>
                <Text title='Base' color='primary.500' fontWeight='bold' />
              </Grid>
            </Grid>
            {Object.keys(compensation?.detail?.data?.base || {}).length > 0 && (
              <Grid container mt='16px' justifyContent='space-between' wrap='wrap'>

              </Grid>
            )}
          </Box>
        </Box>
      )}
      {/* {formik.values.name !== ''  ? } */}
      {/* <Grid container mb='2rem'>
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
                <MuiButton variant='contained' onClick={() => setIsEdit(true)} size='small' color='secondary' sx={{ color: '#FFFFFF' }}><HiPencilAlt />&nbsp;Edit</MuiButton>
              </TopWrapper>
              {
                employee?.detailCnb?.baseCompensation.map((item, index) => (
                  <Box key={index}>
                    <Grid mb='2rem' container spacing={2}>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Typography fontSize='14px' color='gray' mb='.5rem'>Compensation Component</Typography>
                        <Typography fontSize='14px'>{item?.compensationComponent?.name}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Typography fontSize='14px' color='gray' mb='.5rem'>Tax Status</Typography>
                        <Chip label={!item?.taxStatus ? 'Non-Taxable' : 'Taxable'} />
                      </Grid>
                    </Grid>
                    <Typography fontSize='14px' color='gray' mb='.5rem'>Rate</Typography>
                    <Typography mb='2.5rem' fontSize='14px'>Rp.{numberFormat(item?.amount) + ' '} {item?.period}</Typography>
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
                        <Typography fontSize='14px'>{item?.compensationComponent?.name}</Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <Typography fontSize='14px' color='gray' mb='.5rem'>Tax Status</Typography>
                        <Chip label={!item.taxStatus ? 'Non-Taxable' : 'Taxable'} />
                      </Grid>
                    </Grid>
                    <Typography fontSize='14px' color='gray' mb='.5rem'>Amount per Mounth</Typography>
                    <Typography mb='2.5rem' fontSize='14px'>Rp.{numberFormat(item?.amount) + ' ' + item?.period}</Typography>
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
            <Typography mb='1rem' fontSize='20px' fontWeight='bold' color='primary'>{employee?.detailCnb?.name}</Typography>
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
                  options={compensation}
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
                    { label: 'Per Week', value: 'Per Week' },
                    { label: 'Per Month', value: 'Per Month' },
                    { label: 'Per Year', value: 'Per Year' }
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
                              options={compensation}
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
                                { label: 'Per Week', value: 'Per Week' },
                                { label: 'Per Month', value: 'Per Month' },
                                { label: 'Per Year', value: 'Per Year' }

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
      } */}
    </>
  );
}

export default CnbCreateForm;