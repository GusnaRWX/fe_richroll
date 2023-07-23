/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Grid, Autocomplete, createFilterOptions, TextField, Box, Chip } from '@mui/material';
import { Text } from '@/components/_shared/common';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getListBaseCompensationRequested, getListCnbRequested } from '@/store/reducers/slice/options/optionSlice';
import { Button } from '@/components/_shared/form';
import { FiEdit } from 'react-icons/fi';

interface CnbFormEditProps {
  cnbValues: any,
  refProp: React.Ref<HTMLFormElement>
}

const CnbFormEdit = ({ cnbValues, refProp }: CnbFormEditProps) => {
  console.log(cnbValues);
  const option = useAppSelectors(state => state.option);
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();
  console.log(option, 'option');
  const formik = useFormik({
    initialValues: {
      templateId: '',
      name: '',
      compensationComponentId: '',
      period: '',
      rateOrAmount: '',
      percentage: '',
      taxStatus: '',
      supplementary: [],
      overtime: ''
    },
    onSubmit: (_val) => {
      console.log(_val);
    }
  });

  useEffect(() => {
    if (cnbValues) {
      formik.setFieldValue('templateId', cnbValues?.id);
      formik.setFieldValue('name', cnbValues?.name);
      formik.setFieldValue('compensationComponentId', cnbValues?.base?.component?.id);
      formik.setFieldValue('period', cnbValues?.base?.term?.id);
      // formik.setFieldValue('percentage', cnb)
      formik.setFieldValue('rateOrAmount', cnbValues?.base?.amout || '');
      formik.setFieldValue('taxStatus', cnbValues?.base?.isTaxable ? 'true' : 'false');
      formik.setFieldValue('overtime', cnbValues?.overtime);
      formik.setFieldValue('supplementary', cnbValues?.supplementaries?.map(val => {
        return {
          compensationComponentId: val?.component?.id,
          period: val?.term?.id,
          rateOrAmount: '',
          taxStatus: val?.isTaxable ? 'true' : 'false',
          id: val?.id
        };
      }));
    }

  }, [cnbValues]);

  useEffect(() => {
    const fetchData = () => {
      if (cnbValues?.base?.component?.id) {
        console.log('here');
      }
    };
    dispatch({
      type: getListCnbRequested.toString()
    });
    dispatch({
      type: getListBaseCompensationRequested.toString()
    });
    fetchData();
  }, []);

  const filter = createFilterOptions<any>();

  console.log(cnbValues);

  console.log(formik.values);

  return (
    <form ref={refProp}>
      <Grid container>
        <Grid item md={4}>
          <Text title='Compensation & Benefits Profile' mb='6px' children={<span style={{ color: '#DC2626' }} >*</span>} />
          <Autocomplete
            id='cnbProfile'
            freeSolo
            value={cnbValues?.template === null ? formik.values.name : formik.values.templateId}
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
            <Button label='Edit' color='secondary' sx={{ color: 'white' }} startIcon={<FiEdit />} />
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
    </form>
  );
};

export default CnbFormEdit;