/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Box,
} from '@mui/material';
import { useFormik } from 'formik';
// import { styled as MuiStyled } from '@mui/material/styles';
import { HiPencilAlt } from 'react-icons/hi';
import { useAppSelectors, useAppDispatch } from '@/hooks/index';
import { Select, Input, RadioGroup, Button } from '@/components/_shared/form';
import { Employees } from '@/types/employees';
// import { Add, Delete } from '@mui/icons-material';
// import { getDetailCnbRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';
import { numberFormat } from '@/utils/format';
import { validationSchemeCompensationBenefits } from './validate';
import { Text } from '@/components/_shared/common';
import { compareCheck, getPaymentTypeWithoutData, ifThenElse } from '@/utils/helper';
import { getDetailRequested } from '@/store/reducers/slice/cnb/compensationSlice';
import { getListTerminReqeusted } from '@/store/reducers/slice/options/optionSlice';
import { postCnbEmployeeRequested } from '@/store/reducers/slice/company-management/employees/employeeSlice';

// const ContentWrapper = MuiStyled(Box)(() => ({
//   padding: '1rem',
//   borderRadius: '5px',
//   backgroundColor: '#F9FAFB',
//   width: '100%'
// }));

// const TopWrapper = MuiStyled(Box)(() => ({
//   display: 'flex',
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   width: '100%',
//   marginBottom: '1rem'
// }));

// interface TempSuplementaryType {
//   compensation: string | number;
//   tax: string;
//   rate: string | number;
//   period: string | number;
// }

interface CnbEmployeeProps {
  refProp: React.Ref<HTMLFormElement>,
  cnbValues: Employees.CnbEmployeePayload,
  setValues: React.Dispatch<React.SetStateAction<Employees.CnbEmployeePayload>>
}

function CnbCreateForm({
  refProp,
  cnbValues,
  // setValues
}: CnbEmployeeProps) {
  const [modeEdit, setModeEdit] = useState(false);
  const { option, compensation } = useAppSelectors((state) => state);
  const dispatch = useAppDispatch();

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
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  const handleSubmit = (val) => {
    const formatedPayload = {
      ...val,
      name: option?.listCnb?.find(item => item.value === val.name)?.label,
      supplementaries: val.supplementaries
    };
    dispatch({
      type: postCnbEmployeeRequested.toString(),
      payload: {
        employeeID: 1,
        data: formatedPayload
      }
    });
  };

  useEffect(() => {
    if (modeEdit) {
      formik.setFieldValue('templateID', compensation?.detail?.data?.base?.component?.id);
      formik.setFieldValue('base.componentID', compensation?.detail?.data?.base?.component.id);
      formik.setFieldValue('base.isTaxable', compensation?.detail?.data?.base?.isTaxable);
      setTimeout(() => {
        dispatch({
          type: getListTerminReqeusted.toString(),
          payload: formik.values.base.componentID
        });
        formik.setFieldValue('base.termID', compensation?.detail?.data?.base?.term?.id);
      }, 2000);
      formik.setFieldValue('base.amount', compensation?.detail?.data?.base?.amount);

      if (compensation?.detail?.data?.supplementaries?.length > 0) {
        compensation?.detail?.data?.supplementaries?.forEach((suplementary, index) => {
          formik.setFieldValue(`supplementaries[${index}].componentID`, suplementary?.component?.id);
          formik.setFieldValue(`supplementaries[${index}].termID`, suplementary?.term?.id);
          formik.setFieldValue(`supplementaries[${index}].isTaxable`, suplementary?.isTaxable);
          formik.setFieldValue(`supplementaries[${index}].amount`, suplementary?.amount);
          formik.setFieldValue(`supplementaries[${index}].amountType`, suplementary?.amountType);
          formik.setFieldValue(`supplementaries[${index}].rate`, suplementary?.rate);
          formik.setFieldValue(`supplementaries[${index}].rateType`, suplementary?.rateType);
        });
      }
    }
  }, [modeEdit]);

  console.log(formik.values);

  return (
    <form ref={refProp} onSubmit={formik.handleSubmit}>
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
              console.log(selected, 'here');
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

      {formik.values.name !== '' && (
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
                  onClick={() => { setModeEdit((prev) => !prev); }}
                />
              </Grid>
            </Grid>
            {Object.keys(compensation?.detail?.data?.base || {}).length > 0 && (
              <>
                {modeEdit ? (
                  <>
                    <Grid container mt='16px' justifyContent='space-between'>
                      <Grid item md={7} mb='22px'>
                        <Select
                          fullWidth
                          customLabel='Compensation Component'
                          withAsterisk
                          options={option?.listCnb}
                          variant='outlined'
                          size='small'
                          name='base.componentID'
                          value={formik.values.base.componentID}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          renderValue={(value: unknown) => {
                            const selected = option?.listCnb?.find(cnb => cnb.value === value);
                            if (selected) {
                              return `${selected.label}`;
                            }
                            return null;
                          }}
                          sx={{ backgroundColor: '#FFF' }}
                        />
                      </Grid>
                      <Grid item md={4} mb='22px'>
                        <RadioGroup
                          withAsterisk
                          label='Tax Status'
                          row
                          options={[
                            { label: 'Taxable', value: 'taxable' },
                            { label: 'Non-Taxable', value: 'non-taxable' }
                          ]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.base.isTaxable ? 'taxable' : 'non-taxable'}
                        />
                      </Grid>
                    </Grid>
                    <Grid container alignItems='flex-end' gap={5}>
                      <Grid item md={3}>
                        <Input
                          withAsterisk
                          customLabel={getPaymentTypeWithoutData(compensation?.detail?.data?.base?.component?.type)?.title}
                          size='small'
                          name='base.amount'
                          value={formik.values.base.amount}
                        />
                      </Grid>
                      <Grid item md={3}>
                        <Select
                          fullWidth
                          customLabel=''
                          variant='outlined'
                          size='small'
                          options={option?.listTermin}
                          name='base.termID'
                          value={formik.values.base.termID}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          displayEmpty
                          renderValue={(value: unknown) => {
                            const selected = option?.listTermin?.find(opt => opt.value === value);
                            if (selected) {
                              return `${selected.label}`;
                            }
                            return null;
                          }}
                          sx={{ backgroundColor: '#FFF' }}
                        />
                      </Grid>
                    </Grid>
                  </>
                ) : (
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

              </>
            )}
            {compensation?.detail?.data?.supplementaries?.length > 0 &&
              compensation?.detail?.data?.supplementaries?.map((value, index) => (
                <>
                  {modeEdit ? (
                    <>
                      <Grid container justifyContent='space-between' mt='32px'>
                        <Grid item md={7} mb='22px'>
                          <Select
                            fullWidth
                            customLabel={`Compensation Component ${index + 1}`}
                            withAsterisk
                            options={option?.listCnb}
                            variant='outlined'
                            size='small'
                            name={`supplementaries[${index}].componentID`}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            renderValue={(value: unknown) => {
                              const selected = option?.listCnb?.find(cnb => cnb.value === value);
                              if (selected) {
                                return `${selected.label}`;
                              }
                              return null;
                            }}
                            sx={{ backgroundColor: '#fff' }}
                            value={formik.values.supplementaries[index].componentID}
                          />
                        </Grid>
                        <Grid item md={4} mb='22px'>
                          <RadioGroup
                            withAsterisk
                            name={`supplementaries[${index}].isTaxable`}
                            label='Tax Status'
                            row
                            options={[
                              { label: 'Taxable', value: 'taxable' },
                              { label: 'Non-Taxable', value: 'non-taxable' }
                            ]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.base.isTaxable ? 'taxable' : 'non-taxable'}
                          />
                        </Grid>
                      </Grid>
                      <Grid container alignItems='flex-end' gap={5}>
                        <Grid item md={3}>
                          <Input
                            withAsterisk
                            customLabel={getPaymentTypeWithoutData(value?.component?.type)?.title}
                            size='small'
                            name={`supplementaries[${index}].amount`}
                            value={formik.values.supplementaries[index].amount}
                          />
                        </Grid>
                        <Grid item md={3}>
                          <Select
                            fullWidth
                            customLabel=''
                            variant='outlined'
                            size='small'
                            options={option?.listTermin}
                            name={`supplementaries[${index}].termID`}
                            value={formik.values.supplementaries[index].termID}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            displayEmpty
                            renderValue={(value: unknown) => {
                              const selected = option?.listTermin?.find(item => item.value === value);
                              if (selected) {
                                return `${selected?.label}`;
                              }
                              return null;
                            }}
                            sx={{ backgroundColor: '#FFF' }}
                          />
                        </Grid>
                      </Grid>
                    </>
                  ) : (
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
                </>
              ))
            }
          </Box>
          <Button label='sUBMIT' onClick={() => { handleSubmit(formik.values); }} />
        </Box>
      )}
    </form>
  );
}

export default CnbCreateForm;