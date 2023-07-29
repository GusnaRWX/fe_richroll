import React, { useEffect } from 'react';
import { Button, Select } from '@/components/_shared/form';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { getListBaseCompensationRequested, getListSuppCompensationRequested } from '@/store/reducers/slice/options/optionSlice';
import { useFormik } from 'formik';
import { validateCnb } from './validate';
import {  Chip, Grid } from '@mui/material';
import { getTableRequested } from '@/store/reducers/slice/cnb/compensationSlice';
import { getCompanyData, ifThenElse } from '@/utils/helper';
import { Text } from '@/components/_shared/common';
import { FiEdit } from 'react-icons/fi';
import { numberFormat } from '@/utils/format';

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
  templateId: string;
  name: string;
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

const CnbCreateForm = () => {
  const dispatch = useAppDispatch();

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

  // const {listBaseCompensation, listSuppcompensation} = useAppSelectors(state => state.option);
  const {dataTable} = useAppSelectors(state => state.compensation);
  const formik = useFormik({
    initialValues: {
      templateId: '',
      name: '',
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
      console.log(_val);
    }
  });

  const handleChangeTemplate = (value) => {
    const findCNB = dataTable?.items?.find(item => value.target.value === item.id);
    if(findCNB) {
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
    }
  };

  const match = dataTable?.items?.map(item => item.supplementaries).flat();
  console.log(match);
  return (
    <Grid container >
      <Grid container mb='16px'>
        <Grid item md={6}>
          <Select name='templateId' options={dataTable?.items?.map(val => {
            return {
              ...val,
              label: val?.name,
              value: val?.id
            };
          })} fullWidth size='small' variant='outlined' customLabel='Compensation and Benefit Profile' onChange={handleChangeTemplate} onBlur={formik.handleBlur}/>
        </Grid>
      </Grid>
      {formik.values.templateId !== '' && (
        <Grid container sx={{
          padding: '16px 16px',
          borderRadius: '8px',
          backgroundColor: '#F9FAFB'
        }}>
       
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
              />
            </Grid>
          </Grid>
          <Grid container >
            <Grid item md={6}>
              <Text title='Compensation Component' color='#9CA3AF' fontWeight={500} fontSize={14}/>
              <Text title={dataTable?.items?.find(item => item.base.component?.id === formik.values.base.componentID)?.base?.component?.name}/>
            </Grid>
            <Grid item md={6}>
              <Text title='Tax Status' color='#9CA3AF' fontWeight={500} fontSize={14} />
              <Chip label={formik.values.base.isTaxable === 'true' ? 'Taxable' : 'Non-Taxable'} sx={{ backgroundColor: '#E5E7EB', borderRadius: '4px'}}/>
            </Grid>
          </Grid>
          <Grid container mb='16px'>
            <Grid item md={6}>
              <Text title='Rate' color='#9CA3AF' fontWeight={500} fontSize={14} />
              <Text title={`Rp ${ifThenElse(formik.values.base.rate === null, numberFormat(+formik.values.base.amount), numberFormat(+formik.values.base.rate))} per ${dataTable?.items?.find(item => item?.base?.term?.id === formik.values.base.termID)?.base?.term?.name}`}/>
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
                      <Grid container key={index}>
                        <Grid item md={6}>
                          <Text title={`Compensation Component ${index + 1}`} fontWeight={500} fontSize={14} color='#9CA3AF' />
                          <Text title={match?.find(item => item.component?.id === value?.componentID)?.component?.name}/>
                        </Grid>
                        <Grid item md={6}>
                          <Text title='Tax Status' color='#9CA3AF' fontWeight={500} fontSize={14} />
                          <Chip label={value.isTaxable === 'true' ? 'Taxable' : 'Non-Taxable'} sx={{ backgroundColor: '#E5E7EB', borderRadius: '4px' }} />
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item mb='16px'>
                          <Text title={`Amount per ${match?.find(item => item.term?.id === value?.termID)?.term?.name}`} color='#9CA3AF' fontWeight={500} fontSize={14} />
                          <Text title={`Rp ${ifThenElse(value.rate === null, numberFormat(+value.amount), numberFormat(+value.rate))} per ${match?.find(item => item.term?.id === value?.termID)?.term?.name}`}/>
                        </Grid>
                      </Grid>
                    </>
                  ))
                }
              </>
            )
          } 
        </Grid>
      )}
    </Grid>
  );
};

export default CnbCreateForm;