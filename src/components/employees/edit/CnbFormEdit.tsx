/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Button, Select, RadioGroup, Input } from '@/components/_shared/form';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getListBaseCompensationRequested, getListSuppCompensationRequested, getListTerminReqeusted } from '@/store/reducers/slice/options/optionSlice';
import { useFormik } from 'formik';
import { validateCnb } from './validate';
import { Chip, Grid, InputAdornment } from '@mui/material';
import { getTableRequested } from '@/store/reducers/slice/cnb/compensationSlice';
import { getCompanyData, getPaymentType, ifThenElse } from '@/utils/helper';
import { Text } from '@/components/_shared/common';
import { FiEdit } from 'react-icons/fi';
import { numberFormat } from '@/utils/format';
import { MdAdd } from 'react-icons/md';
import { BsTrash3 } from 'react-icons/bs';

interface Supplementary {
  componentID: string,
  termID: string,
  isTaxable: string,
  amount: string,
  amountType: string,
  rate: string,
  rateType: string,
  id?: string;
}

interface CnbInitialValues {
  templateId: string;
  name: string;
  overtime: string;
  base: {
    componentID: string,
    termID: string,
    isTaxable: string,
    amount: string,
    amountType: string,
    rate: string,
    rateType: string,
    id?: string;
  },
  supplementary: Array<Supplementary>
}

interface CnbEditFormProps {
  refProp: React.Ref<HTMLFormElement>,
  setValues: React.Dispatch<React.SetStateAction<any>>
}

const CnbFormEdit = ({ refProp, setValues }: CnbEditFormProps) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [withPercentage, setWithPercentage] = useState(false);
  const [title, setTitle] = useState('Amount');

  useEffect(() => {
    dispatch({
      type: getListBaseCompensationRequested.toString(),
    });
    dispatch({
      type: getListSuppCompensationRequested.toString()
    });
    dispatch({
      type: getTableRequested.toString(),
      payload: {
        page: 1,
        itemPerPage: 5,
        sort: '',
        direction: '',
        search: '',
        companyID: getCompanyData()?.id
      }
    });
  }, []);

  const { listBaseCompensation, listSuppCompensation, listTermin } = useAppSelectors(state => state.option);
  const {employeeCnbDetailUpdate} = useAppSelectors(state => state.employee);
  console.log(employeeCnbDetailUpdate);
  const { dataTable } = useAppSelectors(state => state.compensation);
  const formik = useFormik({
    initialValues: {
      templateId: employeeCnbDetailUpdate?.templateID,
      name: employeeCnbDetailUpdate?.name,
      overtime: employeeCnbDetailUpdate?.overtime,
      base: {
        componentID: employeeCnbDetailUpdate?.base?.componentID,
        termID: employeeCnbDetailUpdate?.base?.termID,
        isTaxable: employeeCnbDetailUpdate?.base?.isTaxable,
        amount: employeeCnbDetailUpdate?.base?.amount,
        amountType: employeeCnbDetailUpdate?.base?.amounType,
        rate: employeeCnbDetailUpdate?.base?.rate,
        rateType: employeeCnbDetailUpdate?.base?.rateType,
        id: employeeCnbDetailUpdate?.base?.id
      },
      supplementary: employeeCnbDetailUpdate?.supplementary
    } as CnbInitialValues,
    validationSchema: validateCnb,
    onSubmit: (_val) => {
      setValues(_val);
    }
  });

  useEffect(() => {
    if(formik.values.base.componentID) {
      dispatch({
        type: getListTerminReqeusted.toString(),
        payload: formik.values.base.componentID
      });
    }
  }, []);

  useEffect(() => {
    setValues(formik.values);
  }, [formik.values]);

  console.log(formik.errors);

  const handleChangeTemplate = (value) => {
    const findCNB = dataTable?.items?.find(item => value.target.value === item.id);
    if (findCNB) {
      formik.setFieldValue('templateId', findCNB?.id);
      formik.setFieldValue('name', findCNB?.name);
      formik.setFieldValue('overtime', findCNB?.overtime);
      formik.setFieldValue('base.componentID', findCNB?.base?.component?.id);
      formik.setFieldValue('base.termID', findCNB?.base?.term?.id);
      formik.setFieldValue('base.isTaxable', findCNB?.base?.isTaxable === true ? 'true' : 'false');
      formik.setFieldValue('base.amount', findCNB?.base?.amount);
      formik.setFieldValue('base.amountType', findCNB?.base?.amountType);
      formik.setFieldValue('base.rate', findCNB?.base?.rate);
      formik.setFieldValue('base.rateType', findCNB?.base?.rateType);
      formik.setFieldValue(
        'supplementary',
        findCNB?.supplementaries?.map((val) => ({
          componentID: val?.component?.id,
          termID: val?.term?.id,
          isTaxable: val?.isTaxable === true ? 'true' : 'false',
          amount: val?.amount,
          amountType: val?.amountType,
          rate: val?.rate,
          rateType: val?.rateType,
        }))
      );

      dispatch({
        type: getListTerminReqeusted.toString(),
        payload: formik.values.base.componentID
      });
    }
  };

  const handleBaseCompensationComponent = (value) => {
    formik.setFieldValue('base.componentID', value.target.value);
    if (value.target.value === '3' || value.target.value === '4') {
      setWithPercentage(getPaymentType(value.target.value, listBaseCompensation)?.withPercentage);
      setTitle(getPaymentType(value.target.value, listBaseCompensation)?.title);
    } else {
      setWithPercentage(false);
      setTitle(getPaymentType(value.target.value, listBaseCompensation)?.title);
    }
  };

  const handleRemoveOrAppend = (type: string, id?: number) => {
    if (type === 'APPEND') {
      formik.setValues({
        ...formik.values,
        supplementary: [...formik.values.supplementary, { amount: '', amountType: '', componentID: '', isTaxable: '', rate: '', rateType: '', termID: '' }]
      });
    } else {
      const updated = formik.values.supplementary?.filter((_, index) => index !== id);
      formik.setValues({
        ...formik.values,
        supplementary: updated
      });
    }
  };

  console.log(listTermin);

  const match = dataTable?.items?.map(item => item.supplementaries).flat();

  return (
    <form ref={refProp} onSubmit={formik.handleSubmit}>
      <Grid container >
        <Grid container mb='16px'>
          <Grid item md={6}>
            <Select name='templateId' options={dataTable?.items?.map(val => {
              return {
                ...val,
                label: val?.name,
                value: val?.id
              };
            })} fullWidth size='small' variant='outlined' customLabel='Compensation and Benefit Profile' onChange={handleChangeTemplate} onBlur={formik.handleBlur} value={formik.values.templateId} />
          </Grid>
        </Grid>
        {formik.values.templateId !== '' && (
          <Grid container sx={{
            padding: '16px 16px',
            borderRadius: '8px',
            backgroundColor: '#F9FAFB'
          }}>
            <>
              {
                isEdit ? (
                  <>
                    <Grid container justifyContent='space-between'>
                      <Grid item md={6}>
                        <Text title='Base' fontWeight={700} fontSize='16px' color='#223567' />
                      </Grid>
                      <Grid item md={1}>
                        <Button
                          label='Edit'
                          color='secondary'
                          startIcon={<FiEdit size={12} color='#FFF' />}
                          sx={{
                            color: '#FFF'
                          }}
                          onClick={() => { setIsEdit(false); }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container gap={8} mb='16px'>
                      <Grid item md={6}>
                        <Select
                          customLabel='Compensation Component'
                          withAsterisk name='base.componentID'
                          onChange={handleBaseCompensationComponent}
                          onBlur={formik.handleBlur}
                          options={listBaseCompensation}
                          fullWidth
                          variant='outlined'
                          value={formik.values.base.componentID}
                          size='small'
                        />
                      </Grid>
                      <Grid item md={4}>
                        <RadioGroup
                          label='Tax Status'
                          options={[
                            { label: 'Taxable', value: 'true' },
                            { label: 'Non-Taxable', value: 'false' }
                          ]}
                          row
                          name='base.isTaxable'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.base.isTaxable}
                        />
                      </Grid>
                    </Grid>
                    <Grid container gap={1} alignItems='flex-end' mb='16px'>
                      <Grid item md={3}>
                        <Input customLabel={title}
                          withAsterisk
                          size='small'
                          fullWidth
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={ifThenElse(formik.values.base.amount === '0', formik.values.base.rate , formik.values.base.amount)}
                          name='base.amount'
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                              %
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      {
                        withPercentage && (
                          <>
                            <Grid item md={3}>
                              <Input
                                customLabel='Rate'
                                size='small'
                                fullWidth
                                onChange={formik.handleChange}
                                name='base.rate'
                                value={formik.values.base.rate}
                                onBlur={formik.handleBlur}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position='end'>
                                    %
                                    </InputAdornment>
                                  )
                                }} />
                            </Grid>
                          </>
                        )
                      }
                      <Grid item md={3}>
                        <Select fullWidth size='small' options={listTermin} name='base.termID' value={formik.values.base.termID} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                      </Grid>
                    </Grid>
                    <Grid container mb='16px' >
                      <Grid item md={6}>
                        <Input
                          withAsterisk
                          size='small'
                          customLabel='Overtime'
                          name='overtime'
                          value={formik.values.overtime}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          inputProps={{
                            step: 0.1
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position='end'>
                                <Text color='grey.500' title='x' />
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                    </Grid>
                    {
                      formik.values.supplementary.length > 0 && (
                        <>
                          <Grid container mb='16px'>
                            <Grid item md={6}>
                              <Text title='Supplementary' fontWeight={700} fontSize='16px' color='#223567' />
                            </Grid>
                          </Grid>
                          {
                            formik.values.supplementary?.map((value, index) => (
                              <>
                                <Grid container key={value.id} gap={1} justifyContent='space-between' mb='16px'>
                                  <Grid item md={6}>
                                    <Select
                                      customLabel={`Compensation Component ${index + 1}`}
                                      options={listSuppCompensation}
                                      fullWidth
                                      size='small'
                                      variant='outlined'
                                      value={value.componentID}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      name={`supplementary[${index}].componentID`}
                                    />
                                  </Grid>
                                  <Grid item md={4}>
                                    <RadioGroup
                                      label='Tax Status'
                                      options={[
                                        { label: 'Taxable', value: 'true' },
                                        { label: 'Non-Taxable', value: 'false' }
                                      ]}
                                      row
                                      name={`supplementary[${index}].isTaxable`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={value.isTaxable}
                                    />
                                  </Grid>
                                  <Grid item md={1}>
                                    <Button
                                      label='Delete'
                                      startIcon={<BsTrash3 />}
                                      color='red'
                                      onClick={() => { handleRemoveOrAppend('REMOVE', index); }}
                                    />
                                  </Grid>
                                </Grid>
                                <Grid container gap={1} alignItems='flex-end'>
                                  <Grid item md={3}>
                                    <Input
                                      customLabel='Amount'
                                      withAsterisk
                                      name={`supplementary[${index}].amount`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={value.amount}
                                      size='small'
                                    />
                                  </Grid>
                                  <Grid item md={3}>
                                    <Select
                                      customLabel=''
                                      variant='outlined'
                                      size='small'
                                      options={listTermin}
                                      value={value.termID}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      name={`supplementary[${index}].termID`}
                                    />
                                  </Grid>
                                </Grid>
                              </>
                            ))
                          }
                          <Grid container mt='16px'>
                            <Grid item md={3}>
                              <Button
                                label='Add Supplementary Compensation'
                                startIcon={<MdAdd size={12} color='#FFF' />}
                                color='secondary'
                                sx={{ color: 'white' }}
                                onClick={() => { handleRemoveOrAppend('APPEND'); }}
                              />
                            </Grid>
                          </Grid>
                        </>
                      )
                    }

                  </>
                ) : (
                  <>
                    <Grid container justifyContent='space-between'>
                      <Grid item md={6}>
                        <Text title='Base' fontWeight={700} fontSize='16px' color='#223567' />
                      </Grid>
                      <Grid item md={1}>
                        <Button
                          label='Edit'
                          color='secondary'
                          startIcon={<FiEdit size={12} color='#FFF' />}
                          sx={{
                            color: '#FFF'
                          }}
                          onClick={() => { setIsEdit(true); }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container >
                      <Grid item md={6}>
                        <Text title='Compensation Component' color='#9CA3AF' fontWeight={500} fontSize={14} />
                        <Text title={listBaseCompensation?.find(item => item.value === formik.values.base.componentID)?.label} />
                      </Grid>
                      <Grid item md={6}>
                        <Text title='Tax Status' color='#9CA3AF' fontWeight={500} fontSize={14} />
                        <Chip label={ifThenElse(formik.values.base.isTaxable === 'true', 'Taxable', 'Non-Taxable')} sx={{ backgroundColor: '#E5E7EB', borderRadius: '4px' }} />
                      </Grid>
                    </Grid>
                    <Grid container mb='16px'>
                      <Grid item md={6}>
                        <Text title='Rate' color='#9CA3AF' fontWeight={500} fontSize={14} />
                        <Text title={`Rp ${ifThenElse(formik.values.base.rate === '0', numberFormat(+formik.values.base.amount), numberFormat(+formik.values.base.rate))} per ${dataTable?.items?.find(item => item?.base?.term?.id === formik.values.base.termID)?.base?.term?.name}`} />
                      </Grid>
                    </Grid>
                    {
                      formik.values.supplementary.length > 0 && (
                        <>
                          <Grid container justifyContent='space-between' mb='16px'>
                            <Grid item md={6}>
                              <Text title='Supplementary' fontWeight={700} fontSize='16px' color='#223567' />
                            </Grid>
                          </Grid>
                          {
                            formik.values.supplementary?.map((value, index) => (
                              <>
                                <Grid container key={value.id}>
                                  <Grid item md={6}>
                                    <Text title={`Compensation Component ${index + 1}`} fontWeight={500} fontSize={14} color='#9CA3AF' />
                                    <Text title={match?.find(item => item.component?.id === value?.componentID)?.component?.name} />
                                  </Grid>
                                  <Grid item md={6}>
                                    <Text title='Tax Status' color='#9CA3AF' fontWeight={500} fontSize={14} />
                                    <Chip label={value.isTaxable === 'true' ? 'Taxable' : 'Non-Taxable'} sx={{ backgroundColor: '#E5E7EB', borderRadius: '4px' }} />
                                  </Grid>
                                </Grid>
                                <Grid container>
                                  <Grid item mb='16px'>
                                    <Text title={`Amount per ${match?.find(item => item.term?.id === value?.termID)?.term?.name}`} color='#9CA3AF' fontWeight={500} fontSize={14} />
                                    <Text title={`Rp ${ifThenElse(value.rate === null, numberFormat(+value.amount), numberFormat(+value.rate))} per ${match?.find(item => item.term?.id === value?.termID)?.term?.name}`} />
                                  </Grid>
                                </Grid>
                              </>
                            ))
                          }
                        </>
                      )
                    }
                  </>
                )
              }

            </>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default CnbFormEdit;