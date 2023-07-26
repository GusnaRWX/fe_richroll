/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Grid, Autocomplete, createFilterOptions, TextField, Box, Chip, InputAdornment } from '@mui/material';
import { Text } from '@/components/_shared/common';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getListBaseCompensationRequested, getListCnbRequested, getListTerminReqeusted, getListSuppCompensationRequested } from '@/store/reducers/slice/options/optionSlice';
import { Button, Input, RadioGroup, Select } from '@/components/_shared/form';
import { FiEdit } from 'react-icons/fi';
import { getPaymentType, ifThenElse } from '@/utils/helper';
import { MdOutlineAdd } from 'react-icons/md';
import DeleteIcon from '@mui/icons-material/Delete';

interface CnbFormEditProps {
  cnbValues: any,
  cnbValuesForm: any,
  refProp: React.Ref<HTMLFormElement>,
  setCnbValue: React.Dispatch<React.SetStateAction<any>>
}

const CnbFormEdit = ({ cnbValues, refProp, setCnbValue, cnbValuesForm }: CnbFormEditProps) => {
  const option = useAppSelectors(state => state.option);
  const [title, setTitle] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [withPercentage, setWithPercentage] = useState(false);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      templateId: cnbValuesForm?.templateId,
      name: cnbValuesForm?.name,
      compensationComponentId: cnbValuesForm?.compensationComponentId,
      period: cnbValuesForm?.period,
      rateOrAmount: cnbValuesForm?.rateOrAmount,
      percentage: cnbValuesForm?.percentage,
      taxStatus: cnbValuesForm?.taxStatus,
      supplementary: cnbValuesForm?.supplementary,
      overtime: cnbValuesForm?.overtime
    },
    onSubmit: (_val) => {
      console.log(_val);
    }
  });

  useEffect(() => {
    if (cnbValuesForm) {
      formik.setFieldValue('templateId', cnbValuesForm?.templateId);
      formik.setFieldValue('name', cnbValuesForm?.name);
      formik.setFieldValue('compensationComponentId', cnbValuesForm?.compensationComponentId);
      formik.setFieldValue('period', cnbValuesForm?.period);
      formik.setFieldValue('rateOrAmount', cnbValuesForm?.rateOrAmount);
      formik.setFieldValue('percentage', cnbValuesForm?.percentage);
      formik.setFieldValue('taxStatus', cnbValuesForm?.taxStatus);
      formik.setFieldValue('supplementary', cnbValuesForm?.supplementary);
      formik.setFieldValue('overtime', cnbValuesForm?.overtime);
    }
  }, [cnbValuesForm]);

  useEffect(() => {
    setCnbValue(formik.values);
  }, [formik.values]);

  useEffect(() => {
    const fetchData = () => {
      if (cnbValues?.base?.component?.id || formik?.values?.compensationComponentId) {
        setTitle(getPaymentType(formik?.values?.compensationComponentId, option?.listBaseCompensation)?.title);
        setWithPercentage(getPaymentType(formik?.values?.compensationComponentId, option?.listBaseCompensation)?.withPercentage);
        dispatch({
          type: getListTerminReqeusted.toString(),
          payload: formik?.values?.compensationComponentId
        });
      }
    };
    dispatch({
      type: getListCnbRequested.toString()
    });
    dispatch({
      type: getListBaseCompensationRequested.toString()
    });
    dispatch({
      type: getListSuppCompensationRequested.toString()
    });
    fetchData();
  }, []);

  const filter = createFilterOptions<any>();

  const handleAddSupplementary = () => {
    const _supp = {
      compensationComponentId: '',
      period: '',
      rateOrAmount: '',
      taxStatus: '',
      id: ''
    };

    const _current = formik.values.supplementary || [];

    const _updated = [..._current, _supp];

    formik.setFieldValue('supplementary', _updated);
  };

  const handleDeleteSupplementary = (idx: number) => {
    // Get the current supplementary array from formik.values
    const currentSupplementary = formik.values.supplementary || [];

    // Create a new array without the item at the specified index
    const updatedSupplementary = currentSupplementary.filter((item, i) => i !== idx);

    // Update formik's supplementary field with the new array
    formik.setFieldValue('supplementary', updatedSupplementary);
  };

  return (
    <form ref={refProp} onSubmit={formik.handleSubmit}>
      <Grid container>
        <Grid item md={4}>
          <Text title='Compensation & Benefits Profile' mb='6px' children={<span style={{ color: '#DC2626' }} >*</span>} />
          <Autocomplete
            id='cnbProfile'
            freeSolo
            value={ifThenElse(cnbValues?.template === null, formik.values.name, formik.values.name)}
            size='small'
            filterOptions={(options: any, params) => {
              const filtered = filter(options, params);
              const { inputValue } = params;
              const isExisting = options?.some((option) => inputValue === option?.label);
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  label: 'Edit'
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

              if (option.inputValue) {
                return option.inputValue;
              }

              return option.label;
            }}
            renderOption={(props, option: any) => (
              <li {...props} style={{ width: '100%' }}>{option.label}</li>
            )}
            renderInput={(params) => (
              <TextField
                name='templateId'
                {...params}
              />
            )}
          />
        </Grid>
      </Grid>
      {!editMode && (
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
                onClick={() => setEditMode(true)}
              />
            </Grid>
          </Grid>
          <Grid container mt='16px' mb='32px'>
            <Grid item md={6}>
              <Text title='Compensation Component' color='grey.400' fontWeight={500} fontSize='14px' />
              <Text title={cnbValues?.base?.component?.name} />
            </Grid>
            <Grid item md={6}>
              <Text title='Tax Status' color='grey.400' fontWeight={500} fontSize='14px' />
              <Chip label={cnbValues?.base?.isTaxable ? 'Taxable' : 'Non-Taxable'} />
            </Grid>
            <Grid item md={6}>
              <Text title='Rate' color='grey.400' fontWeight={500} fontSize='14px' />
              <Text title='Rp.5000' />
            </Grid>
            <Grid item md={12} mt={'16px'}>
              <Text title='Overtime' color='grey.400' fontWeight={500} fontSize='14px' />
              <Text title={`${cnbValues?.overtime || '0'} x`} />
            </Grid>
          </Grid>
          {cnbValues?.supplementaries?.length > 0 && (
            <Text title='Supplementary' fontWeight={700} fontSize='16px' color='primary.500' />
          )}
          {cnbValues?.supplementaries?.length > 0 && (
            cnbValues?.supplementaries?.map((supplement, index) => (
              <Grid container key={index} mb='16px'>
                <Grid item md={6}>
                  <Text title={`Compensation Component ${index + 1}`} color='grey.400' fontWeight={500} fontSize='14px' />
                  <Text title={supplement?.component?.name || ''} />
                </Grid>
                <Grid item md={6}>
                  <Text title='Tax Status' color='grey.400' fontWeight={500} fontSize='14px' />
                  <Chip label={supplement?.isTaxable ? 'Taxable' : 'Non-Taxable'} />
                </Grid>
                <Grid item md={6}>
                  <Text title='Rate' />
                  <Text title={`Rp.5000 per ${supplement?.term?.name ?? ''}`} />
                </Grid>
              </Grid>
            ))
          )}
        </Box>
      )}
      {editMode && (
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
                onClick={() => { setEditMode(false); }}
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
                onBlur={formik.handleBlur}
                onChange={(e) => {
                  formik.setFieldValue('compensationComponentId', e.target.value);
                }}
                value={formik.values.compensationComponentId}
                options={option?.listBaseCompensation}
                renderValue={(value: unknown) => {
                  if ((value as string)?.length === 0) {
                    return <Text title='Select Base Compensation Component' color='grey.400' />;
                  }
                  const selected = option?.listBaseCompensation?.find(list => list?.value === value);
                  if (selected) {
                    return `${selected?.label}`;
                  }
                  return null;
                }}
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
              />
            </Grid>
          </Grid>
          <Grid container mt='16px'>
            <Grid container spacing={2} alignItems='end'>
              <Grid item xs={3}>
                <Input
                  name='rateOrAmount'
                  customLabel={title}
                  withAsterisk
                  size='small'
                  fullWidth
                  value={formik.values.rateOrAmount}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>Rp.</InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position='end'>IDR</InputAdornment>
                    )
                  }}
                />
              </Grid>
              {withPercentage && (
                <Grid item xs={3}>
                  <Input
                    fullWidth
                    customLabel='Rate'
                    // variant='outlined'
                    // value={formik.values.}
                    size='small'
                    type='number'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>%</InputAdornment>
                      )
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={3}>
                <Select
                  name='period'
                  fullWidth
                  customLabel=''
                  size='small'
                  value={formik.values.period}
                  options={option?.listTermin || []}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container mt='16px' mb='16px'>
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
                inputProps={{
                  step: 0.1
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Text title='x' color='grey.500' />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
          {(formik.values.supplementary as []).length > 0 && (
            <Box mb='16px'>
              <Grid container>
                <Text title='Supplementary' fontWeight={700} fontSize='16px' color='primary.500' />
              </Grid>
              {(formik.values.supplementary as [])?.map((value, index) => (
                <div key={index}>
                  <Grid container alignItems='center' justifyContent='space-between' gap='4px'>
                    <Grid item md={4}>
                      <Select
                        options={option?.listSuppCompensation}
                        fullWidth size='small'
                        customLabel={`Compensation Component ${index + 1}`}
                        value={formik.values.supplementary[index]?.compensationComponentId || ''}
                        onChange={(e) => {
                          const selectedCompensationComponent = e.target.value;
                          formik.setFieldValue(`supplementary.${index}.compensationComponentId`, selectedCompensationComponent);
                        }}
                      />
                    </Grid>
                    <Grid item md={4} >
                      <RadioGroup
                        withAsterisk
                        label='Tax Status'
                        name='taxStatus'
                        options={[
                          { label: 'Taxable', value: 'true' },
                          { label: 'Non-Taxable', value: 'false' }
                        ]}
                        value={formik.values.supplementary[index]?.taxStatus}
                        onChange={(e) => {
                          formik.setFieldValue(`supplementary.${index}.taxStatus`, e.target.checked ? 'true' : 'false');
                        }}
                        row
                      />
                    </Grid>
                    <Grid item md={2}>
                      <Button
                        label='Delete'
                        color='red'
                        startIcon={<DeleteIcon/>}
                        onClick={() => { handleDeleteSupplementary(index); }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container alignItems='flex-end' gap='4px'>
                    <Grid item md={4}>
                      <Input
                        withAsterisk
                        customLabel='Amount'
                        size='small'
                        value={formik.values.supplementary[index]?.rateOrAmount || ''}
                        onChange={(e) => {
                          formik.setFieldValue(`supplementary.${index}.rateOrAmount`, e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item md={4}>
                      <Select
                        options={option?.listTermin || []}
                        fullWidth
                        size='small'
                        customLabel=''
                        value={formik.values.supplementary[index]?.period}
                        onChange={(e) => {
                          formik.setFieldValue(`supplementary.${index}.period`, e.target.value);
                        }}
                      />
                    </Grid>
                  </Grid>
                </div>
              ))}
            </Box>
          )}
          <Grid container>
            <Grid item md={4}>
              <Button
                color='secondary'
                sx={{ color: 'white' }}
                label='Add Supplementary Compensation'
                startIcon={<MdOutlineAdd />}
                onClick={handleAddSupplementary}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </form>
  );
};

export default CnbFormEdit;