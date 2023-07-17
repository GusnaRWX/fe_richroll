/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import { Form as FormikForm, Formik, FieldArray } from 'formik';
import { validationSchemeCompensationBenefits } from './validate';
import { Autocomplete, Box, FormControl, Grid, InputAdornment, TextField, createFilterOptions, Select as MuiSelect, MenuItem, FormHelperText, Typography, RadioGroup as MuiRadio, FormControlLabel, Radio, Chip } from '@mui/material';
import { Text } from '@/components/_shared/common';
import { useAppSelectors, useAppDispatch } from '@/hooks/index';
import { AiOutlinePlus } from 'react-icons/ai';
import { Button, Input, RadioGroup, Select } from '@/components/_shared/form';
import { getListBaseCompensationRequested, getListSuppCompensationRequested, getListSuppTerminRequested, getListTerminReqeusted, removeListSuppTermin } from '@/store/reducers/slice/options/optionSlice';
import { compareCheck, dynamicPayloadBaseCnb, getPaymentType, ifThenElse } from '@/utils/helper';
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getDetailRequested } from '@/store/reducers/slice/cnb/compensationSlice';
import { numberFormat } from '@/utils/format';
import { FiEdit } from 'react-icons/fi';

interface SuplementType {
  compensationComponentId: string;
  taxStatus: string;
  rateOrAmount: number | null;
  period: string;
  titleRate?: string;
  withPercentage?: boolean;
  percentage?: string | number;
  amountType?: string | number;
  rateType?: string | number;
}

interface InitialValues {
  templateID: string;
  name: string;
  compensationComponentId: string;
  period: string;
  rateOrAmount: string | number;
  percentage: string | number | null;
  taxStatus: string;
  supplementary: SuplementType[];
  overtime: string;
}

interface CnbCreateForm {
  nextPage: (_val: number, _data: any) => void;
  prevPage: () => void;
  setValues: React.Dispatch<React.SetStateAction<any>>
  cnbValues: any;
}

const CnbCreateForm = ({
  nextPage,
  prevPage,
  setValues,
  cnbValues
}: CnbCreateForm) => {

  const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 0 0 1px rgb(16 22 26 / 40%)'
        : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
      theme.palette.mode === 'dark'
        ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
        : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background:
        theme.palette.mode === 'dark'
          ? 'rgba(57,75,89,.5)'
          : 'rgba(206,217,224,.5)',
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#137cbd',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  });

  const AddButton = styled(Button)({
    color: 'white',
    maxWidth: '245px',
    padding: '8px 10px',
    '.MuiTypography-root': {
      fontSize: '12px',
    },
  });

  const option = useAppSelectors(state => state.option);
  const dispatch = useAppDispatch();
  const [custom, setCustom] = useState(false);
  const [title, setTitle] = useState('Amount');
  const [titleView, setTitleView] = useState('');
  const [withPercentage, setWithPercentage] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [parentId, setParentId] = useState('');
  const [valuesEdit, setValuesEdit] = useState<any>({});
  const [initialValues, setInitialValues] = useState<InitialValues>({
    templateID: '',
    name: '',
    compensationComponentId: '',
    period: '',
    rateOrAmount: 0,
    percentage: 0,
    taxStatus: '',
    supplementary: [],
    overtime: ''
  });

  const cnbDetail = useAppSelectors(state => state?.compensation?.detail?.data);
  const filter: any = createFilterOptions();

  useEffect(() => {
    dispatch({
      type: getListBaseCompensationRequested.toString()
    });
    dispatch({
      type: getListSuppCompensationRequested.toString()
    });
  }, []);

  useEffect(() => {
    let supplement = false;
    initialValues?.supplementary?.map(item => {
      if (initialValues.supplementary.length === 0) {
        supplement = true;
        return false;
      }
      if (
        item.compensationComponentId &&
        item.period &&
        item.rateOrAmount &&
        item.taxStatus
      ) {
        supplement = true;
      } else {
        supplement = false;
      }
    });

    if (initialValues?.name !== '' &&
      initialValues?.compensationComponentId !== ''
      && initialValues?.period !== '' &&
      supplement
    ) {
      const tempBase = dynamicPayloadBaseCnb(option?.listBaseCompensation, initialValues?.compensationComponentId, initialValues);
      const tempSupplementary: any = [];
      if (initialValues.supplementary.length > 0) {
        for (let i = 0; i <= initialValues.supplementary.length; i++) {
          if (typeof initialValues.supplementary[i] !== 'undefined') {
            const tempData = dynamicPayloadBaseCnb(option?.listSuppCompensation, initialValues.supplementary[i].compensationComponentId, initialValues.supplementary[i]);
            tempSupplementary.push(tempData);
          }
        }
      }
      const payload = {
        templateID: initialValues.templateID,
        name: initialValues.name,
        overtime: +initialValues.overtime,
        base: tempBase,
        supplementaries: tempSupplementary
      };
      setValues(payload);
    }
  }, [initialValues, isEdit, isView]);

  useEffect(() => {
    const fetchData = () => {
      if (cnbDetail?.base?.component?.id) {
        setTitleView(getPaymentType(cnbDetail?.base?.component?.id, option?.listBaseCompensation)?.title);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (isView || isEdit) {
      if (cnbDetail) {
        setValuesEdit(cnbDetail);
        if (initialValues?.supplementary?.length > 0) {
          initialValues?.supplementary?.map(val => (
            dispatch({
              type: getListSuppTerminRequested.toString(),
              payload: val.compensationComponentId
            })
          ));
        }
      }
    }
  }, [cnbDetail, isView, isEdit]);

  useEffect(() => {
    if (parentId) {
      dispatch({
        type: getDetailRequested.toString(),
        Id: parentId
      });
    }
  }, [parentId]);

  console.log(initialValues, 'here');
  console.log(cnbValues, 'out');

  const handleBack = (e) => {
    e.preventDefault();
    prevPage();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => { console.log('submit'); }}
      validationSchema={validationSchemeCompensationBenefits}
    >
      {(formik) => {
        setInitialValues(formik.values);
        return (
          <>
            <FormikForm>
              <Grid container >
                <Grid item md={4}>
                  <Text
                    title='Compensation & Benefits Profile'
                    mb='6px'
                    children={<span style={{ color: '#DC2626' }} >*</span>} />
                  <Autocomplete
                    id='cnbProfile'
                    freeSolo
                    value={formik.values.name}
                    onChange={(event, newValue: any) => {
                      if (typeof newValue === 'string') {
                        setCustom(false);
                        setIsView(false);
                        setIsEdit(false);
                        formik.setFieldValue('name', newValue, false);
                      } else if (newValue && newValue.inputValue) {
                        setCustom(true);
                        setIsView(false);
                        setIsEdit(false);
                        formik.setFieldValue('templateID', '', false);
                        formik.setFieldValue('name', newValue.inputValue, false);
                      } else {
                        setCustom(false);
                        setIsEdit(false);
                        setIsView(true);
                        // dispatch({
                        //   type: getDetailRequested.toString(),
                        //   Id: newValue?.value
                        // });
                        setParentId(newValue?.value);
                        formik.setFieldValue('name', newValue?.label);
                        formik.setFieldValue('templateID', newValue?.value);
                        formik.setFieldValue('compensationComponentId', cnbDetail?.base?.component?.id);
                        formik.setFieldValue('period', cnbDetail?.base?.term?.id);
                        formik.setFieldValue('rateOrAmount', isNaN(cnbDetail?.base?.amount) ? +cnbDetail?.base?.rate : +cnbDetail?.base?.amount);
                        formik.setFieldValue('taxStatus', cnbDetail?.base?.isTaxable ? 'true' : 'false');
                        formik.setFieldValue('overtime', cnbDetail?.overtime);
                        formik.setFieldValue('percentage', +cnbDetail?.base?.rate);
                        formik.setFieldValue('supplementary', cnbDetail?.supplementaries?.map((val: any) => {
                          return {
                            compensationComponentId: val.component?.id || '',
                            period: val.term?.id || '',
                            rateOrAmount: getPaymentType(val.component?.id, option?.listBaseCompensation)?.withPercentage ? val.rate : val.amount || '',
                            taxStatus: val.isTaxable === true ? 'true' : 'false',
                            id: val?.id || ''
                          };
                        }) || []);
                      }
                    }}
                    size='small'
                    filterOptions={(options, params) => {
                      const filtered = filter(options, params);
                      const { inputValue } = params;
                      const isExisting = options?.some((option) => initialValues === option?.label);
                      if (inputValue !== '' && !isExisting) {
                        filtered.push({
                          inputValue,
                          label: (
                            <Box
                              component='span'
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '5px'
                              }}
                            >
                              <AiOutlinePlus />
                              Create Custom {inputValue}
                            </Box>
                          )
                        });
                      }
                      return filtered;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    options={option?.listCnb}
                    getOptionLabel={(option: any) => {
                      if (typeof option === 'string') {
                        return option;
                      }

                      if (option?.inputValue) {
                        return option.inputValue;
                      }

                      return option?.label;
                    }}
                    renderOption={(props, option: any) => (
                      <li {...props}>{option.label}</li>
                    )}
                    renderInput={(params) => <TextField
                      name='name'
                      required
                      {...params}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      placeholder='Select existing profile'
                      helperText={formik.touched.name && formik.errors.name}
                    />}
                  />
                </Grid>
              </Grid>
              {isView && (
                <Box sx={{
                  backgroundColor: '#F9FAFB',
                  padding: '16px 16px',
                  borderRadius: '6px',
                  marginTop: '16px'
                }}>
                  <Grid container justifyContent='space-between'>
                    <Grid item md={6}>
                      <Text title='Base' fontWeight={700} fontSize='16px' color='primary.500' />
                    </Grid>
                    <Grid item md={1}>
                      <Button label='Edit' color='secondary' sx={{ color: 'white' }} startIcon={<FiEdit />} onClick={() => {
                        setIsView(false);
                        setIsEdit(true);
                        dispatch({
                          type: getDetailRequested.toString(),
                          Id: parentId
                        });
                        dispatch({
                          type: getListTerminReqeusted.toString(),
                          payload: '6'
                        });
                      }} />
                    </Grid>
                  </Grid>
                  <Grid container mt='16px' mb='32px'>
                    <Grid item md={6}>
                      <Text title='Compensation Component' color='grey.400' fontWeight={500} fontSize='14px' />
                      <Text title={valuesEdit?.base?.component?.name || ''} />
                    </Grid>
                    <Grid item md={6}>
                      <Text title='Tax Status' color='grey.400' fontWeight={500} fontSize='14px' />
                      <Chip label={valuesEdit?.base?.isTaxable ? 'Taxable' : 'Non-Taxable'} />
                    </Grid>
                    <Grid item md={6}>
                      <Text title={titleView || ''} color='grey.400' fontWeight={500} fontSize='14px' />
                      <Text title={`Rp.${numberFormat(valuesEdit?.base?.amount) ?? ''} per ${valuesEdit?.base?.term?.name ?? ''}`} />
                    </Grid>
                    <Grid item md={12} mt='16px'>
                      <Text title='Overtime' color='grey.400' fontWeight={500} fontSize='14px' />
                      <Text title={`${valuesEdit?.overtime || '0'} x`} />
                    </Grid>
                  </Grid>
                  {valuesEdit?.supplementaries?.length > 0 && (
                    valuesEdit?.supplementaries?.map((suplement, index) => (
                      <>
                        <Text title='Supplementary' fontWeight={700} fontSize='16px' color='primary.500' />
                        <Grid container key={index}>
                          <Grid item md={6}>
                            <Text title={`Compensation Component ${index + 1}`} color='grey.400' fontWeight={500} fontSize='14px' />
                            <Text title={suplement?.component?.name ?? ''} />
                          </Grid>
                          <Grid item md={6}>
                            <Text title='Tax Status' color='grey.400' fontWeight={500} fontSize='14px' />
                            <Chip label={suplement?.isTaxable ? 'Taxable' : 'Non-Taxable'} />
                          </Grid>
                          <Grid item md={6}>
                            <Text title={getPaymentType(suplement?.component?.id, option?.listSuppCompensation)?.title} color='grey.400' fontWeight={500} fontSize='14px' />
                            <Text title={`Rp.${numberFormat(suplement?.amount) ?? ''} per ${suplement?.term?.name ?? ''}`} />
                          </Grid>
                        </Grid>
                      </>
                    ))
                  )}
                </Box>
              )}
              {custom && (
                <>
                  <Text
                    title={formik.values.name ?? ''}
                    color='primary.500'
                    fontWeight={700}
                    fontSize='18px'
                    sx={{ display: 'block', marginTop: '32px' }}
                  />
                  <Text
                    title='Base'
                    color='primary.500'
                    fontWeight={700}
                    fontSize='16px'
                    mt='6px'
                  />
                  <Grid container alignItems='baseline' mt='16px' justifyContent='space-between'>
                    <Grid item md={4}>
                      <Select
                        name='compensationComponentID'
                        size='small'
                        fullWidth
                        customLabel='Compensation Component'
                        withAsterisk
                        value={formik.values.compensationComponentId}
                        onChange={(e) => {
                          formik.setFieldValue(
                            'compensationComponentId',
                            e.target.value
                          );
                          dispatch({
                            type: getListTerminReqeusted.toString(),
                            payload: e.target.value
                          });
                          setTitle(getPaymentType(e.target.value, option?.listBaseCompensation)?.title);
                          setWithPercentage(getPaymentType(e.target.value, option?.listBaseCompensation)?.withPercentage);
                        }}
                        displayEmpty
                        renderValue={(value: unknown) => {
                          if ((value as string)?.length === 0) {
                            return <Text title='Select base compensation component' color='grey.400' />;
                          }
                          const selected = option?.listBaseCompensation?.find(item => item.value === value);
                          if (selected) {
                            return `${selected?.label}`;
                          }
                          return null;
                        }}
                        options={option?.listBaseCompensation}
                        variant='outlined'
                        error={compareCheck(formik.touched.compensationComponentId, Boolean(formik.errors.compensationComponentId))}
                        helperText={ifThenElse(compareCheck(formik.touched.compensationComponentId, Boolean(formik.errors.compensationComponentId)), formik.errors.compensationComponentId, '')}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <RadioGroup
                        withAsterisk
                        label='Tax Status'
                        name='taxStatus'
                        options={[
                          { label: 'Taxable', value: 'true' },
                          { label: 'Non-Taxable', value: 'false' }
                        ]}
                        value={formik.values.taxStatus}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        row
                        error={ifThenElse(compareCheck(formik.touched.taxStatus, Boolean(formik.errors.taxStatus)), formik.errors.taxStatus, '')}
                      />
                    </Grid>
                  </Grid>
                  {
                    formik.values.compensationComponentId !== '' && (
                      <>
                        <Grid container mt='16px'>
                          <Grid container spacing={2} alignItems='end'>
                            <Grid item xs={3}>
                              <Text title={title} children={<span style={{ color: 'red' }}>*</span>} />
                              <TextField
                                sx={{ marginTop: '6px' }}
                                fullWidth
                                type='number'
                                size='small'
                                error={formik.touched.rateOrAmount && Boolean(formik.errors.rateOrAmount)}
                                helperText={formik.touched.rateOrAmount && formik.errors.rateOrAmount}
                                value={formik.values.rateOrAmount}
                                onChange={(e) => {
                                  formik.setFieldValue('rateOrAmount', e.target.value);

                                }}
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position='start'>Rp</InputAdornment>
                                  ),
                                  endAdornment: (
                                    <InputAdornment position='end'>IDR</InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                            {withPercentage && (
                              <Grid item xs={3}>
                                <FormControl fullWidth>
                                  <Input
                                    fullWidth
                                    customLabel='Rate'
                                    variant='outlined'
                                    size='small'
                                    type='number'
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position='end'>%</InputAdornment>
                                      )
                                    }}
                                  />
                                </FormControl>
                              </Grid>
                            )}
                            <Grid item xs={3}>
                              <Select
                                name='period'
                                fullWidth
                                customLabel=''
                                size='small'
                                onChange={(e) => {
                                  formik.setFieldValue('period', e.target.value);
                                }}
                                options={option?.listTermin}
                                error={compareCheck(formik.touched.period, Boolean(formik.errors.period))}
                                helperText={ifThenElse(compareCheck(formik.touched.period, Boolean(formik.errors.period)), formik.errors.period, '')}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid container mt='16px'>
                          <Grid item xs={12}>
                            <Text title='Overtime' fontWeight={700} fontSize='16px' mb='10px' color='primary.500' />
                          </Grid>
                          <Grid item xs={3}>
                            <Input
                              withAsterisk
                              size='small'
                              customLabel='Rate'
                              type='number'
                              name='overtime'
                              value={formik.values.overtime}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              error={compareCheck(formik.touched.overtime, Boolean(formik.errors.overtime))}
                              helperText={ifThenElse(compareCheck(formik.touched.overtime, Boolean(formik.errors.overtime)), formik.errors.overtime, '')}
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
                      </>
                    )}
                </>
              )}
              {custom && (
                <FieldArray
                  name='supplementary'
                  render={(arrayHelper) => {
                    return (
                      <div style={{ marginTop: '16px' }}>
                        {formik?.values?.supplementary?.length > 0 ? (
                          <>
                            <Text
                              title='Supplementary'
                              color='primary.500'
                              fontWeight={700}
                              fontSize='16px'
                              marginBottom='17px'
                            />
                            {formik?.values?.supplementary?.map((suplement, i) => (
                              <div key={i} style={{ marginBottom: '33px' }}>
                                <Grid container spacing={2}>
                                  <Grid item xs={6}>
                                    <div style={{ marginBottom: '16px' }}>
                                      <Text title={`Compensation Component ${i + 1}`} children={<span style={{ color: 'red' }}>*</span>} />
                                      <FormControl
                                        fullWidth
                                        {...(formik.touched?.supplementary &&
                                          formik.errors.supplementary && {
                                          error: formik.touched?.supplementary[i]?.compensationComponentId
                                            && Boolean((formik.errors.supplementary[i] as unknown as SuplementType)?.compensationComponentId)
                                        }
                                        )}
                                      >
                                        <MuiSelect
                                          sx={{ marginTop: '.4rem' }}
                                          fullWidth
                                          size='small'
                                          value={formik.values.supplementary[i]?.compensationComponentId}
                                          onChange={(e) => {
                                            formik.setFieldValue(
                                              `supplementary.${i}.compensationComponentId`,
                                              e.target.value
                                            );
                                            dispatch({
                                              type: getListSuppTerminRequested.toString(),
                                              payload: e.target.value
                                            });
                                            formik.setFieldValue(
                                              `supplementary.${i}.titleRate`,
                                              getPaymentType(e.target.value, option?.listSuppCompensation)?.title
                                            );
                                            formik.setFieldValue(
                                              `supplementary.${i}.withPercentage`,
                                              getPaymentType(e.target.value, option?.listSuppCompensation)?.withPercentage
                                            );
                                          }}
                                        >
                                          {option?.listSuppCompensation?.map((item, i) => (
                                            <MenuItem key={i} value={item.value}>
                                              {item.label}
                                            </MenuItem>
                                          ))}
                                        </MuiSelect>
                                        {formik.touched.supplementary && formik.errors.supplementary && (
                                          <FormHelperText>
                                            {formik.touched?.supplementary[i]?.compensationComponentId && (
                                              formik.errors.supplementary[i] as unknown as SuplementType
                                            )?.compensationComponentId}
                                          </FormHelperText>
                                        )}
                                      </FormControl>
                                    </div>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <Typography>
                                      Tax Status
                                      <span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    <Box sx={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      alignItems: 'center',
                                      height: '54px'
                                    }}>
                                      <FormControl
                                        fullWidth
                                        {...(formik.touched?.supplementary &&
                                          formik.errors?.supplementary && {
                                          error: formik.touched.supplementary[i]?.period &&
                                            Boolean((formik.errors?.supplementary[i] as unknown as SuplementType)?.period)
                                        }
                                        )}
                                      >
                                        <MuiRadio
                                          row
                                          value={formik.values.supplementary[i]?.taxStatus}
                                          onChange={(e) =>
                                            formik.setFieldValue(
                                              `supplementary.${i}.taxStatus`,
                                              e.target.value
                                            )
                                          }
                                        >
                                          <FormControlLabel
                                            value='true'
                                            control={
                                              <Radio
                                                size='small'
                                                checkedIcon={<BpCheckedIcon />}
                                              />
                                            }
                                            label='Taxable'
                                          />
                                          <FormControlLabel
                                            value='false'
                                            control={
                                              <Radio
                                                size='small'
                                                checkedIcon={<BpCheckedIcon />}
                                              />
                                            }
                                            label='Non-Taxable'
                                          />
                                        </MuiRadio>
                                        {formik.touched?.supplementary &&
                                          formik.errors?.supplementary && (
                                            <FormHelperText>
                                              {formik.touched?.supplementary[i]
                                                ?.taxStatus &&
                                                (
                                                  formik.errors?.supplementary[
                                                  i
                                                  ] as unknown as SuplementType
                                                )?.taxStatus}
                                            </FormHelperText>
                                          )}
                                      </FormControl>
                                      <Box>
                                        <Button
                                          color='red'
                                          startIcon={<DeleteIcon />}
                                          label='Delete'
                                          onClick={() => {
                                            arrayHelper.remove(i);
                                            dispatch({
                                              type: removeListSuppTermin.toString(),
                                              payload: i
                                            });
                                          }}
                                        />
                                      </Box>
                                    </Box>
                                  </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                  <Grid item xs={3}>
                                    <Typography>
                                      {formik.values.supplementary[i].titleRate}
                                      <span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    <TextField
                                      sx={{ marginTop: '.4rem' }}
                                      fullWidth
                                      size='small'
                                      type='number'
                                      {...(formik.touched?.supplementary &&
                                        formik.errors?.supplementary && {
                                        error:
                                          formik.touched?.supplementary[i]
                                            ?.rateOrAmount &&
                                          Boolean(
                                            (
                                              formik.errors?.supplementary[
                                              i
                                              ] as unknown as SuplementType
                                            )?.rateOrAmount
                                          ),
                                      })}
                                      {...(formik.touched?.supplementary &&
                                        formik.errors?.supplementary && {
                                        helperText:
                                          formik.touched?.supplementary[i]
                                            ?.rateOrAmount &&
                                          (
                                            formik.errors?.supplementary[
                                            i
                                            ] as unknown as SuplementType
                                          )?.rateOrAmount,
                                      })}
                                      value={
                                        formik.values.supplementary[i]
                                          ?.rateOrAmount
                                      }
                                      onChange={(e) =>
                                        formik.setFieldValue(
                                          `supplementary.${i}.rateOrAmount`,
                                          e.target.value
                                        )
                                      }
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position='start'>
                                            Rp
                                          </InputAdornment>
                                        ),
                                        endAdornment: (
                                          <InputAdornment position='end'>
                                            IDR
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  </Grid>
                                  {
                                    formik.values.supplementary[i].withPercentage === true && (
                                      <Grid item xs={3} md={3} lg={3} xl={3}>
                                        <FormControl fullWidth>
                                          <Input
                                            fullWidth
                                            customLabel='Rate'
                                            variant='outlined'
                                            type='number'
                                            size='small'
                                            name='percentage'
                                            value={formik.values.supplementary[i]?.percentage}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            InputProps={{
                                              endAdornment: (
                                                <InputAdornment position='end'>%</InputAdornment>
                                              )
                                            }}
                                          />
                                        </FormControl>
                                      </Grid>
                                    )
                                  }
                                  <Grid item xs={3} md={3} lg={3} xl={3}>
                                    <FormControl
                                      fullWidth
                                      {...(formik.touched?.supplementary &&
                                        formik.errors?.supplementary && {
                                        error:
                                          formik.touched?.supplementary[i]
                                            ?.period &&
                                          Boolean(
                                            (
                                              formik.errors?.supplementary[
                                              i
                                              ] as unknown as SuplementType
                                            )?.period
                                          ),
                                      })}
                                    >
                                      <MuiSelect
                                        sx={{ marginTop: '1.8rem' }}
                                        fullWidth
                                        size='small'
                                        value={
                                          formik.values.supplementary[i]?.period
                                        }
                                        onChange={(e) =>
                                          formik.setFieldValue(
                                            `supplementary.${i}.period`,
                                            e.target.value
                                          )
                                        }
                                      >
                                        {
                                          option?.listSuppTermin[i]?.map((item) => (
                                            <MenuItem key={item.label} value={item.value}>
                                              {item.label}
                                            </MenuItem>
                                          ))
                                        }
                                      </MuiSelect>
                                      {formik.touched?.supplementary &&
                                        formik.errors?.supplementary && (
                                          <FormHelperText>
                                            {formik.touched?.supplementary[i]
                                              ?.period &&
                                              (
                                                formik.errors?.supplementary[
                                                i
                                                ] as unknown as SuplementType
                                              )?.period}
                                          </FormHelperText>
                                        )}
                                    </FormControl>
                                  </Grid>
                                </Grid>
                              </div>
                            ))}
                          </>
                        ) : null}
                        {formik.values.compensationComponentId !== '' && (
                          <AddButton
                            color='secondary'
                            startIcon={<AddIcon />}
                            label='Add Supplementary Compensation'
                            onClick={() =>
                              arrayHelper.insert(
                                formik.values.supplementary.length + 1,
                                {
                                  compensationComponentId: '',
                                  period: '',
                                  rateOrAmount: '',
                                  taxStatus: '',
                                  titleRate: 'Amount',

                                }
                              )
                            }
                          />
                        )}
                      </div>
                    );
                  }}
                ></FieldArray>
              )}
              {isEdit && (
                <Box sx={{
                  backgroundColor: '#F9FAFB',
                  padding: '16px 16px',
                  borderRadius: '6px',
                  marginTop: '16px'
                }}>
                  <Grid container justifyContent='space-between'>
                    <Grid item md={6}>
                      <Text title='Base' fontWeight={700} fontSize='16px' color='primary.500' />
                    </Grid>
                    <Grid item md={1}>
                      <Button
                        label='Edit'
                        color='secondary'
                        sx={{ color: 'white' }}
                        startIcon={<FiEdit />}
                        onClick={() => {
                          setIsView(true);
                          setIsEdit(false);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container alignItems='baseline' mt='16px' justifyContent='space-between'>
                    <Grid item md={4}>
                      <Select
                        name='compensationComponentID'
                        size='small'
                        fullWidth
                        customLabel='Compensation Component'
                        withAsterisk
                        displayEmpty
                        value={initialValues.compensationComponentId || formik.values.compensationComponentId}
                        renderValue={(value: unknown) => {

                          if ((value as string)?.length === 0 || typeof value === 'undefined') {
                            return <Text title='Select base compensation component' color='grey.400' />;
                          }
                          const selected = option?.listBaseCompensation?.find(item => item.value === value);
                          if (selected) {
                            return `${selected?.label}`;
                          }
                          return null;
                        }}
                        options={option?.listBaseCompensation}
                        variant='outlined'
                        onChange={(e) => {
                          formik.setFieldValue('compensationComponentId', e.target.value);

                          dispatch({
                            type: getListTerminReqeusted.toString(),
                            payload: e.target.value
                          });
                          setTitle(getPaymentType(e.target.value, option?.listBaseCompensation)?.title);
                          setWithPercentage(getPaymentType(e.target.value, option?.listBaseCompensation)?.withPercentage);
                        }}
                      />
                    </Grid>
                    <Grid item md={6}>
                      <RadioGroup
                        withAsterisk
                        label='tax Status'
                        name='taxStatus'
                        options={[
                          { label: 'Taxable', value: 'true' },
                          { label: 'Non-Taxable', value: 'false' }
                        ]}
                        value={formik.values.taxStatus || initialValues.taxStatus}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        row
                      />
                    </Grid>
                  </Grid>
                  <Grid container mt='16px'>
                    <Grid container spacing={2} alignItems='end'>
                      <Grid item xs={3}>
                        <Text title={title} children={<span style={{ color: 'red' }}>*</span>} />
                        <TextField
                          sx={{ marginTop: '6px' }}
                          fullWidth
                          type='number'
                          size='small'
                          error={formik.touched.rateOrAmount && Boolean(formik.errors.rateOrAmount)}
                          helperText={formik.touched.rateOrAmount && formik.errors.rateOrAmount}
                          value={formik.values.rateOrAmount || initialValues.rateOrAmount}
                          onChange={(e) => { formik.setFieldValue('rateOrAmount', e.target.value); }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>Rp</InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position='end'>IDR</InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      {withPercentage && (
                        <Grid item xs={3}>
                          <FormControl fullWidth>
                            <Input
                              fullWidth
                              customLabel='Rate'
                              variant='outlined'
                              size='small'
                              type='number'
                              value={formik.values.percentage || initialValues.percentage}
                              onChange={(e) => { formik.setFieldValue('percentage', e.target.value); }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position='end'>%</InputAdornment>
                                )
                              }}
                            />
                          </FormControl>
                        </Grid>
                      )}
                      <Grid item xs={3}>
                        <Select
                          name='period'
                          fullWidth
                          customLabel=''
                          size='small'
                          onChange={(e) => {
                            formik.setFieldValue('period', e.target.value);
                          }}
                          value={formik.values.period || initialValues.period}
                          displayEmpty
                          renderValue={(value: unknown) => {
                            if ((value as string)?.length === 0) {
                              return <Text title='Select Period' color='grey.400' />;
                            }
                            const selected = option?.listTermin?.find(item => item.value === value);
                            if (selected) {
                              return `${selected?.label}`;
                            }
                            return null;
                          }}
                          variant='outlined'
                          options={option?.listTermin}
                          error={compareCheck(formik.touched.period, Boolean(formik.errors.percentage))}
                          helperText={ifThenElse(compareCheck(formik.touched.period, Boolean(formik.errors.period)), formik.errors.period, '')}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container mt='16px'>
                    <Grid item xs={12}>
                      <Text title='Overtime' fontWeight={700} fontSize='16px' mb='16px' color='primary.500' />
                    </Grid>
                    <Grid item xs={3}>
                      <Input
                        withAsterisk
                        size='small'
                        customLabel='Rate'
                        type='number'
                        name='overtime'
                        value={formik.values.overtime}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={compareCheck(formik.touched.overtime, Boolean(formik.errors.overtime))}
                        helperText={ifThenElse(compareCheck(formik.touched.overtime, Boolean(formik.errors.overtime)), formik.errors.overtime, '')}
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
                  <FieldArray
                    name='supplementary'
                    render={(arrayHelper) => {
                      return (
                        <div style={{ marginTop: '16px' }}>
                          {(formik?.values?.supplementary?.length > 0 || initialValues?.supplementary) ? (
                            <>
                              <Text
                                title='Supplementary'
                                color='primary.500'
                                fontWeight={700}
                                fontSize='16px'
                                marginBottom='17px'
                              />
                              {formik?.values?.supplementary?.map((suplement, i) => (
                                console.log(suplement, 'well'),
                                <div key={i} style={{ marginBottom: '33px' }}>
                                  <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                      <div style={{ marginBottom: '16px' }}>
                                        <Text title={`Compensation Component ${i + 1}`} children={<span style={{ color: 'red' }}>*</span>} />
                                        <FormControl
                                          fullWidth
                                          {...(formik.touched?.supplementary &&
                                            formik.errors.supplementary && {
                                            error: formik.touched?.supplementary[i]?.compensationComponentId
                                              && Boolean((formik.errors.supplementary[i] as unknown as SuplementType)?.compensationComponentId)
                                          }
                                          )}
                                        >
                                          <MuiSelect
                                            sx={{ marginTop: '.4rem' }}
                                            fullWidth
                                            size='small'
                                            value={formik.values.supplementary[i]?.compensationComponentId || suplement?.compensationComponentId}
                                            onChange={(e) => {
                                              formik.setFieldValue(
                                                `supplementary.${i}.compensationComponentId`,
                                                e.target.value
                                              );
                                              dispatch({
                                                type: getListSuppTerminRequested.toString(),
                                                payload: e.target.value
                                              });
                                              formik.setFieldValue(
                                                `supplementary.${i}.titleRate`,
                                                getPaymentType(e.target.value, option?.listSuppCompensation)?.title
                                              );
                                              formik.setFieldValue(
                                                `supplementary.${i}.withPercentage`,
                                                getPaymentType(e.target.value, option?.listSuppCompensation)?.withPercentage
                                              );
                                            }}
                                          >
                                            {option?.listSuppCompensation?.map((item, i) => (
                                              <MenuItem key={i} value={item.value}>
                                                {item.label}
                                              </MenuItem>
                                            ))}
                                          </MuiSelect>
                                          {formik.touched.supplementary && formik.errors.supplementary && (
                                            <FormHelperText>
                                              {formik.touched?.supplementary[i]?.compensationComponentId && (
                                                formik.errors.supplementary[i] as unknown as SuplementType
                                              )?.compensationComponentId}
                                            </FormHelperText>
                                          )}
                                        </FormControl>
                                      </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                      <Typography>
                                        Tax Status
                                        <span style={{ color: 'red' }}>*</span>
                                      </Typography>
                                      <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        height: '54px'
                                      }}>
                                        <FormControl
                                          fullWidth
                                          {...(formik.touched?.supplementary &&
                                            formik.errors?.supplementary && {
                                            error: formik.touched.supplementary[i]?.period &&
                                              Boolean((formik.errors?.supplementary[i] as unknown as SuplementType)?.period)
                                          }
                                          )}
                                        >
                                          <MuiRadio
                                            row
                                            value={formik.values.supplementary[i]?.taxStatus || (suplement?.taxStatus ? 'true' : 'false')}
                                            onChange={(e) =>
                                              formik.setFieldValue(
                                                `supplementary.${i}.taxStatus`,
                                                e.target.value
                                              )
                                            }
                                          >
                                            <FormControlLabel
                                              value='true'
                                              control={
                                                <Radio
                                                  size='small'
                                                  checkedIcon={<BpCheckedIcon />}
                                                />
                                              }
                                              label='Taxable'
                                            />
                                            <FormControlLabel
                                              value='false'
                                              control={
                                                <Radio
                                                  size='small'
                                                  checkedIcon={<BpCheckedIcon />}
                                                />
                                              }
                                              label='Non-Taxable'
                                            />
                                          </MuiRadio>
                                          {formik.touched?.supplementary &&
                                            formik.errors?.supplementary && (
                                              <FormHelperText>
                                                {formik.touched?.supplementary[i]
                                                  ?.taxStatus &&
                                                  (
                                                    formik.errors?.supplementary[
                                                    i
                                                    ] as unknown as SuplementType
                                                  )?.taxStatus}
                                              </FormHelperText>
                                            )}
                                        </FormControl>
                                        <Box>
                                          <Button
                                            color='red'
                                            startIcon={<DeleteIcon />}
                                            label='Delete'
                                            onClick={() => {
                                              arrayHelper.remove(i);
                                              dispatch({
                                                type: removeListSuppTermin.toString(),
                                                payload: i
                                              });
                                            }}
                                          />
                                        </Box>
                                      </Box>
                                    </Grid>
                                  </Grid>
                                  <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                      <Typography>
                                        {formik.values.supplementary[i].titleRate || 'Amount'}
                                        <span style={{ color: 'red' }}>*</span>
                                      </Typography>
                                      <TextField
                                        sx={{ marginTop: '.4rem' }}
                                        fullWidth
                                        size='small'
                                        type='number'
                                        {...(formik.touched?.supplementary &&
                                          formik.errors?.supplementary && {
                                          error:
                                            formik.touched?.supplementary[i]
                                              ?.rateOrAmount &&
                                            Boolean(
                                              (
                                                formik.errors?.supplementary[
                                                i
                                                ] as unknown as SuplementType
                                              )?.rateOrAmount
                                            ),
                                        })}
                                        {...(formik.touched?.supplementary &&
                                          formik.errors?.supplementary && {
                                          helperText:
                                            formik.touched?.supplementary[i]
                                              ?.rateOrAmount &&
                                            (
                                              formik.errors?.supplementary[
                                              i
                                              ] as unknown as SuplementType
                                            )?.rateOrAmount,
                                        })}
                                        value={
                                          formik.values.supplementary[i]
                                            ?.rateOrAmount
                                        }
                                        onChange={(e) =>
                                          formik.setFieldValue(
                                            `supplementary.${i}.rateOrAmount`,
                                            e.target.value
                                          )
                                        }
                                        InputProps={{
                                          startAdornment: (
                                            <InputAdornment position='start'>
                                              Rp
                                            </InputAdornment>
                                          ),
                                          endAdornment: (
                                            <InputAdornment position='end'>
                                              IDR
                                            </InputAdornment>
                                          ),
                                        }}
                                      />
                                    </Grid>
                                    {
                                      (formik.values.supplementary[i].withPercentage === true || suplement?.withPercentage) && (
                                        <Grid item xs={3} md={3} lg={3} xl={3}>
                                          <FormControl fullWidth>
                                            <Input
                                              fullWidth
                                              customLabel='Rate'
                                              variant='outlined'
                                              type='number'
                                              size='small'
                                              name='percentage'
                                              value={formik.values.supplementary[i]?.percentage}
                                              onChange={formik.handleChange}
                                              onBlur={formik.handleBlur}
                                              InputProps={{
                                                endAdornment: (
                                                  <InputAdornment position='end'>%</InputAdornment>
                                                )
                                              }}
                                            />
                                          </FormControl>
                                        </Grid>
                                      )
                                    }
                                    <Grid item xs={3} md={3} lg={3} xl={3}>
                                      <FormControl
                                        fullWidth
                                        {...(formik.touched?.supplementary &&
                                          formik.errors?.supplementary && {
                                          error:
                                            formik.touched?.supplementary[i]
                                              ?.period &&
                                            Boolean(
                                              (
                                                formik.errors?.supplementary[
                                                i
                                                ] as unknown as SuplementType
                                              )?.period
                                            ),
                                        })}
                                      >
                                        <MuiSelect
                                          sx={{ marginTop: '1.8rem' }}
                                          fullWidth
                                          size='small'
                                          value={
                                            formik.values.supplementary[i]?.period || suplement?.period
                                          }
                                          onChange={(e) =>
                                            formik.setFieldValue(
                                              `supplementary.${i}.period`,
                                              e.target.value
                                            )
                                          }
                                        >
                                          {
                                            option?.listSuppTermin[i]?.map((item) => (
                                              <MenuItem key={item.label} value={item.value}>
                                                {item.label}
                                              </MenuItem>
                                            ))
                                          }
                                        </MuiSelect>
                                        {formik.touched?.supplementary &&
                                          formik.errors?.supplementary && (
                                            <FormHelperText>
                                              {formik.touched?.supplementary[i]
                                                ?.period &&
                                                (
                                                  formik.errors?.supplementary[
                                                  i
                                                  ] as unknown as SuplementType
                                                )?.period}
                                            </FormHelperText>
                                          )}
                                      </FormControl>
                                    </Grid>
                                  </Grid>
                                </div>
                              ))}
                            </>
                          ) : null}
                          {/* {formik.values.compensationComponentId !== '' && ( */}
                          <AddButton
                            color='secondary'
                            startIcon={<AddIcon />}
                            label='Add Supplementary Compensation'
                            onClick={() =>
                              arrayHelper.insert(
                                formik.values.supplementary.length + 1,
                                {
                                  compensationComponentId: '',
                                  period: '',
                                  rateOrAmount: '',
                                  taxStatus: '',
                                  titleRate: 'Amount',

                                }
                              )
                            }
                          />
                          {/* )} */}
                        </div>
                      );
                    }}
                  ></FieldArray>
                </Box>
              )}
              <Grid
                container
                justifyContent='flex-end'
                alignItems='end'
                gap={2}
              >
                <Grid item>
                  <Button onClick={handleBack} label='Back' variant='outlined' />
                </Grid>
                <Grid item>
                  <Button color='primary' onClick={() => nextPage(4, cnbValues)} label='Next' />
                </Grid>
              </Grid>
            </FormikForm>
          </>
        );
      }}
    </Formik>
  );
};

export default CnbCreateForm;