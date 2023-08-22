/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Button, Select, RadioGroup, Input } from '@/components/_shared/form';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getListBaseCompensationRequested, getListSuppCompensationRequested, getListTerminReqeusted } from '@/store/reducers/slice/options/optionSlice';
import { useFormik } from 'formik';
import { validateCnb } from './validate';
import { Chip, Grid, InputAdornment, createFilterOptions, Autocomplete, Box, } from '@mui/material';
import { getTableRequested } from '@/store/reducers/slice/cnb/compensationSlice';
import { getCompanyData, getPaymentType, ifThenElse } from '@/utils/helper';
import { Text } from '@/components/_shared/common';
import { FiEdit } from 'react-icons/fi';
import { numberFormat } from '@/utils/format';
import { MdAdd } from 'react-icons/md';
import { BsTrash3 } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { Option } from '@/types/option';
import { AiOutlinePlus } from 'react-icons/ai';

interface Supplementary {
  componentID: string,
  termID: string,
  isTaxable: string,
  amount: string,
  amountType: string,
  rate: string,
  rateType: string,
}

interface CnbInitialValues {
  templateID: string;
  name: string;
  overtime: string;
  base: {
    componentID: string,
    termID: string,
    isTaxable: string,
    amount: string,
    amountType: string,
    rate: string,
    rateType: string
  },
  supplementary: Array<Supplementary>
}

interface CnbCreateFormProps {
  nextPage: (_val: number, _data: any) => void;
  prevPage: () => void;
  setValues: React.Dispatch<React.SetStateAction<any>>
}

const CnbCreateForm = ({nextPage, prevPage,setValues}: CnbCreateFormProps) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] =useState(false);
  const [withPercentage, setWithPercentage] = useState(false);
  const [title, setTitle] = useState('');
  const {t} = useTranslation();
  const t_cnbForm = 'company_management.employees.form_&_detail.cnb';
  const t_cnbBaseSection = 'company_management.employees.form_&_detail.cnb.base_section';
  const t_cnbSupplementarySection = 'company_management.employees.form_&_detail.cnb.supplementary_section';

  const filter = createFilterOptions<Option.FreesoloType>();

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

  const {dataTable} = useAppSelectors(state => state.compensation);
  const formik = useFormik({
    initialValues: {
      templateID: '',
      name: '',
      overtime: '',
      base: {
        componentID: '',
        termID: '',
        isTaxable: '',
        amount: '',
        amountType: '',
        rate: '',
        rateType: ''
      },
      supplementary: []
    } as CnbInitialValues,
    validationSchema: validateCnb,
    onSubmit: (_val) => {
      setValues(_val);
      nextPage(4, _val);
    }
  });

  const handleChangeTemplate = (e, value) => {
    // check if this value is custom
    if(value?.inputValue) {
      setIsEdit(true);
      formik.setFieldValue('name', value?.inputValue);
    } else {
      // this is for not custom
      const findCNB = dataTable?.items?.find(item => value?.value === item.id);
      if (findCNB) {
        formik.setFieldValue('templateID', findCNB?.id);
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
        setTitle(getPaymentType(findCNB?.base?.component?.id, listBaseCompensation)?.title);
      } else {
        formik.resetForm();
        setIsEdit(false);
      }
    } 
  };

  const handleBaseCompensationComponent = (value) => {
    formik.setFieldValue('base.componentID', value.target.value);
    if(value.target.value === '3' || value.target.value === '4') {
      setWithPercentage(getPaymentType(value.target.value, listBaseCompensation)?.withPercentage);
      setTitle(getPaymentType(value.target.value, listBaseCompensation)?.title);
    } else {
      setWithPercentage(false);
      setTitle(getPaymentType(value.target.value, listBaseCompensation)?.title);
    }
    dispatch({
      type: getListTerminReqeusted.toString(),
      payload: value.target.value
    });
  };

  const handleRemoveOrAppend = (type: string, id?: number) => {
    if(type === 'APPEND') {
      formik.setValues({
        ...formik.values,
        supplementary: [...formik.values.supplementary, {amount: '', amountType: '',componentID: '',isTaxable: '', rate: '',rateType: '',termID:''}]
      });
    } else {
      const updated = formik.values.supplementary?.filter((_, index) => index !== id);
      formik.setValues({
        ...formik.values,
        supplementary: updated
      });
    }
  };

  // const match = dataTable?.items?.map(item => item.supplementaries).flat();

  console.log(formik.values);

  console.log(title);

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const {amountType, rateType, ...baseValid} = formik.values.base;

  const validNext = () => {
    let res = {};
    switch(baseValid.componentID) {
      case '1':
        res = {
          ...res,
          amount: baseValid.amount,
          componentID: baseValid.componentID,
          termID: baseValid.termID,
          isTaxable: baseValid.isTaxable,
          overtime: formik.values.overtime
        };
        break;
      case '2': 
        res = {
          ...res,
          rate: baseValid.rate,
          componentID: baseValid.componentID,
          termID: baseValid.termID,
          isTaxable: baseValid.isTaxable,
          overtime: formik.values.overtime
        };
        break;
      case '3' || '4':
        res = {
          ...res,
          rate: baseValid.rate,
          amount: baseValid.amount,
          componentID: baseValid.componentID,
          termID: baseValid.termID,
          isTaxable: baseValid.isTaxable,
          overtime: formik.values.overtime
        };
        break;
      default: 
        res = {
          ...res,
          rate: '',
          amount: '',
          componentID: '',
          termID: '',
          isTaxable: '',
          overtime: ''
        };
    }
    return res;
  };

  const validButton = Object.values(validNext());
  return (
    <Grid>
      <Grid container mb='16px'>
        <Grid item md={6}>
          <Text title={t(`${t_cnbForm}.compensation_&_benefits_profile`)}/>
          <Autocomplete
            id='cnbcontainer'
            freeSolo
            value={formik.values.name}
            onChange={handleChangeTemplate}
            onBlur={formik.handleBlur}
            size='small'
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              const {inputValue} = params; 
              const isExist = options?.some((option) => inputValue === option?.label);
              if(inputValue !== '' && !isExist) {
                filtered?.push({
                  inputValue,
                  label: (
                    <Box component='span' sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}>
                      <AiOutlinePlus />
                      {t('button.add_new')}  {inputValue}
                    </Box>
                  ) as unknown as Element
                });
              }
              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={dataTable?.items?.map(val => {
              return {
                label: val?.name,
                value: val?.id
              };
            }) as readonly Option.FreesoloType[]}
            getOptionLabel={(option: any) => {
              if(typeof option === 'string') {
                return option;
              }

              if(option?.inputValue) {
                return option.inputValue;
              }

              return option?.label;
            }}
            renderOption={(props, option) => (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <li {...props} style={{ width: '100%' }}>{option?.label}</li>
              </Box>
            )}
            renderInput={(params) => (
              <Input
                name='templateID'
                {...params}
              />
            )}
          />
        </Grid>
      </Grid>
      {formik.values.templateID !== '' || formik.values.name !== '' ? (
        <Grid sx={{
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
                      <Text title={t(`${t_cnbBaseSection}.title`)} fontWeight={700} fontSize='16px' color='#223567' />
                    </Grid>
                    <Grid item md={1}>
                      <Button
                        label={t('button.edit')}
                        color='secondary'
                        startIcon={<FiEdit size={12} color='#FFF' />}
                        sx={{
                          color: '#FFF'
                        }}
                        onClick={() => {setIsEdit(false);}}
                      />
                    </Grid>
                  </Grid>
                  <Grid container gap={8}  mb='16px'>
                    <Grid item md={6}>
                      <Select
                        customLabel={t(`${t_cnbBaseSection}.compensation_component`)}
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
                        label={t(`${t_cnbBaseSection}.tax_status`)}
                        options={[
                          {label: 'Taxable', value: 'true'},
                          {label: 'Non-Taxable', value: 'false'}
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
                      <Input customLabel={title=== '' ? t(`${t_cnbBaseSection}.amount`) : title}
                        withAsterisk
                        size='small'
                        fullWidth
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name={title === 'Rate' ? 'base.rate' : 'base.amount'}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              {title === 'Rate' ? '%' : 'IDR'} 
                            </InputAdornment>
                          )
                        }}
                        value={title === 'Rate' ?formik.values.base.rate : formik.values.base.amount}
                      />
                    </Grid>
                    {
                      withPercentage && (
                        <>
                          <Grid item md={3}>
                            <Input
                              customLabel={t(`${t_cnbBaseSection}.rate`)}
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
                              }}/>
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
                        customLabel={t(`${t_cnbBaseSection}.overtime`)}
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
                    formik.values.supplementary.length > 0 || formik.values.name !== '' ?  (
                      <>
                        <Grid container mb='16px'>
                          <Grid item md={6}>
                            <Text title={t(`${t_cnbSupplementarySection}.title`)} fontWeight={700} fontSize='16px' color='#223567' />
                          </Grid>
                        </Grid>
                        {
                          formik.values.supplementary?.map((value, index) => (
                            <>
                              <Grid container key={value.componentID} gap={1} justifyContent='space-between' mb='16px'>
                                <Grid item md={6}>
                                  <Select
                                    customLabel={`${t(`${t_cnbSupplementarySection}.compensation_component`)} ${index + 1}`}
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
                                    label={t(`${t_cnbSupplementarySection}.tax_status`)}
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
                                    label={t('button.delete')}
                                    startIcon={<BsTrash3 />}
                                    color='red'
                                    onClick={() => {handleRemoveOrAppend('REMOVE', index);}}
                                  />
                                </Grid>
                              </Grid>
                              <Grid container gap={1} alignItems='flex-end'>
                                <Grid item md={3}>
                                  <Input
                                    customLabel={t(`${t_cnbSupplementarySection}.amount`)}
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
                          <Grid item md={4}>
                            <Button
                              label={t('button.add_supplementary_compensation')}
                              startIcon={<MdAdd size={12} color='#FFF'/>}
                              color='secondary'
                              sx={{color: 'white'}}
                              onClick={() => { handleRemoveOrAppend('APPEND');}}
                            />
                          </Grid>
                        </Grid>
                      </>
                    ) : null
                  }

                </>
              ) : (
                <>
                  <Grid container justifyContent='space-between' >
                    <Grid item md={6}>
                      <Text title={t(`${t_cnbBaseSection}.title`)} fontWeight={700} fontSize='16px' color='#223567' />
                    </Grid>
                    <Grid item md={1}>
                      <Button
                        label={t('button.edit')}
                        color='secondary'
                        startIcon={<FiEdit size={12} color='#FFF' />}
                        sx={{
                          color: '#FFF'
                        }}
                        onClick={() => {setIsEdit(true);}}
                      />
                    </Grid>
                  </Grid>

                  <Grid container >
                    <Grid item md={6}>
                      <Text title={t(`${t_cnbBaseSection}.compensation_component`)} color='#9CA3AF' fontWeight={500} fontSize={14}/>
                      <Text title={listBaseCompensation?.find(item => item.value === formik.values.base.componentID)?.label}/>
                    </Grid>
                    <Grid item md={6}>
                      <Text title={t(`${t_cnbBaseSection}.tax_status`)} color='#9CA3AF' fontWeight={500} fontSize={14} />
                      <Chip label={formik.values.base.isTaxable === 'true' ? t(`${t_cnbBaseSection}.tax_status_option.taxable`) : t(`${t_cnbSupplementarySection}.tax_status_option.nontaxable`)} sx={{ backgroundColor: '#E5E7EB', borderRadius: '4px'}}/>
                    </Grid>
                  </Grid>
                  <Grid container mb='16px'>
                    <Grid item md={6}>
                      <Text title={ formik.values.base.componentID === '2' ?  t(`${t_cnbBaseSection}.rate`) : t(`${t_cnbBaseSection}.amount`)} color='#9CA3AF' fontWeight={500} fontSize={14} />
                      <Text title={`Rp ${ifThenElse(formik.values.base.componentID !== '2', numberFormat(+formik.values.base.amount), numberFormat(+formik.values.base.rate))} per ${listTermin?.find(item => item.value === formik.values.base.termID)?.label === 'Monthly' || listTermin?.find(item => item.value === formik.values.base.termID)?.label === 'Bi-Weekly' || listTermin?.find(item => item.value === formik.values.base.termID)?.label === 'Weekly' ? listTermin?.find(item => item.value === formik.values.base.termID)?.label?.slice(0, -2) : listTermin?.find(item => item.value === formik.values.base.termID)?.label}`}/>
                    </Grid>
                  </Grid>
                  {
                    formik.values.supplementary.length > 0 && (
                      <>
                        <Grid container justifyContent='space-between' mb='16px'>
                          <Grid item md={6}>
                            <Text title={t(`${t_cnbSupplementarySection}.title`)} fontWeight={700} fontSize='16px' color='#223567' />
                          </Grid>
                        </Grid>
                        {
                          formik.values.supplementary?.map((value, index) => (
                            <>
                              <Grid container key={index}>
                                <Grid item md={6}>
                                  <Text title={`${t(`${t_cnbSupplementarySection}.compensation_component`)} ${index + 1}`} fontWeight={500} fontSize={14} color='#9CA3AF' />
                                  <Text title={listSuppCompensation?.find(item => item?.value === value?.componentID)?.label}/>
                                </Grid>
                                <Grid item md={6}>
                                  <Text title={t(`${t_cnbSupplementarySection}.tax_status`)} color='#9CA3AF' fontWeight={500} fontSize={14} />
                                  <Chip label={value.isTaxable === 'true' ? t(`${t_cnbSupplementarySection}.tax_status_option.taxable`) : t(`${t_cnbSupplementarySection}.tax_status_option.nontaxable`)} sx={{ backgroundColor: '#E5E7EB', borderRadius: '4px' }} />
                                </Grid>
                              </Grid>
                              <Grid container>
                                <Grid item mb='16px'>
                                  <Text title={`${t(`${t_cnbSupplementarySection}.amount`)} per ${listTermin?.find(item => item.value === value?.termID)?.label === 'Monthly' || listTermin?.find(item => item.value === value?.termID)?.label === 'Bi-Weekly' || listTermin?.find(item => item.value === value?.termID)?.label === 'Weekly' ? listTermin?.find(item => item.value === value?.termID)?.label?.slice(0, -2) : listTermin?.find(item => item.value === value?.termID)?.label}`} color='#9CA3AF' fontWeight={500} fontSize={14} />
                                  <Text title={`Rp ${ifThenElse(+value.rate === 0, numberFormat(+value.amount), numberFormat(+value.rate))} per ${listTermin?.find(item => item.value === value?.termID)?.label === 'Monthly' || listTermin?.find(item => item.value === value?.termID)?.label === 'Bi-Weekly' || listTermin?.find(item => item.value === value?.termID)?.label === 'Weekly' ? listTermin?.find(item => item.value === value?.termID)?.label?.slice(0, -2) : listTermin?.find(item => item.value === value?.termID)?.label}`}/>
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
      ) : null}
      <Grid container justifyContent='flex-end' gap={2} alignItems='center' mt='16px'>
        <Grid item md={1}>
          <Button
            label={t('button.back')}
            variant='outlined'
            onClick={prevPage}
          />
        </Grid>
        <Grid item md={1}>
          <Button
            label={t('button.next')}
            onClick={() => { formik.handleSubmit(); }}
            disabled={
              formik.values.templateID !== '' || (formik.values.name !== '' && validButton.every(v => v!== '') )
                ? false 
                : true
            }
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CnbCreateForm;