/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Button, Form, IconButton, Input } from '@/components/_shared/form';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  RadioGroup,
  Radio,
  FormControlLabel,
  Box,
  Grid,
  Paper,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { postNewCnbProfileRequested } from '@/store/reducers/slice/cnb/compensationSlice';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import {
  getCompanyData,
  getPaymentType,
  dynamicPayloadBaseCnb,
  compareCheck,
  ifThenElse
} from '@/utils/helper';
import { FieldArray, Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import {
  getListTerminReqeusted,
  getListSuppTerminRequested,
  removeListSuppTermin,
} from '@/store/reducers/slice/options/optionSlice';
import { Text } from '@/components/_shared/common';
import ConfirmationModal from '@/components/_shared/common/ConfirmationModal';
import { resetResponserMessage } from '@/store/reducers/slice/responserSlice';
import { useTranslation } from 'react-i18next';

export default function CreateCNBComponent() {
  const router = useRouter();
  const companyData = getCompanyData();
  const dispatch = useAppDispatch();
  const { listBaseCompensation, listSuppCompensation, listTermin, listSuppTermin } = useAppSelectors(
    (state) => state.option
  );
  const [title, setTitle] = React.useState('Amount');
  const [withPercentage, setWithPercentage] = React.useState(false);
  const [leave, setLeave] = useState(false);
  const { t } = useTranslation();
  const tPath = 'compensation_and_benefits.form.';

  const validationSchecma = Yup.object().shape({
    name: Yup.string().required('This is required'),
    compensationComponentId: Yup.string().required('This is required'),
    period: Yup.string().required('This is required'),
    rateOrAmount: Yup.number()
      .required('This is required')
      .positive('Must be positive')
      .integer('Must be number'),
    taxStatus: Yup.string().required('This is required'),
    supplementary: Yup.array().of(
      Yup.object().shape({
        compensationComponentId: Yup.string().required('This is required'),
        period: Yup.string().required('This is required'),
        rateOrAmount: Yup.number()
          .required('This is required')
          .positive('Must be positive')
          .integer('Must be number'),
        taxStatus: Yup.string().required('This is required'),
      })
    ),
  });

  const handleOpen = () => {
    setLeave(true);
  };

  const handleClose = () => {
    setLeave(false);
  };

  const AddButton = styled(Button)({
    color: 'white',
    maxWidth: '245px',
    padding: '8px 10px',
    '.MuiTypography-root': {
      fontSize: '12px',
    },
  });

  const Header = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  });

  const HeaderPageTitle = styled('div')({
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  });

  const NextBtnWrapper = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  });

  const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: ifThenElse(theme.palette.mode === 'dark', '0 0 0 1px rgb(16 22 26 / 40%)', 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)'),
    backgroundColor: ifThenElse(theme.palette.mode === 'dark', '#394b59', '#f5f8fa'),
    backgroundImage: ifThenElse(theme.palette.mode === 'dark', 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))', 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))'),
    '.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: ifThenElse(theme.palette.mode === 'dark', '#30404d', '#ebf1f5'),
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: ifThenElse(theme.palette.mode === 'dark', 'rgba(57,75,89,.5)', 'rgba(206,217,224,.5)'),
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

  interface BaseType {
    name: string;
    compensationComponentId: string;
    taxStatus: string;
    rateOrAmount: number | string;
    overtime: number | string;
    percentage: string | number | null;
    period: string;
    supplementary: SuplementType[];
  }

  function CreateNewCnbProfile(value: BaseType) {
    let supplement = true;
    value.supplementary.forEach((item: SuplementType) => {
      if (value.supplementary.length === 0) {
        supplement = true;
        return false;
      }
      if (compareCheck(
        item.compensationComponentId,
        !!item.period,
        !!item.rateOrAmount,
        !!item.taxStatus
      )) {
        supplement = true;
      } else {
        supplement = false;
      }
    });

    if (compareCheck(
      value.name !== '',
      value.compensationComponentId !== '',
      value.period !== '',
      value.rateOrAmount !== '',
      value.overtime !== '',
      value.taxStatus !== '',
      supplement
    )) {
      const tempBase = dynamicPayloadBaseCnb(
        listBaseCompensation,
        value.compensationComponentId,
        value
      );
      const tempSupplementary: any = [];
      if (value.supplementary.length > 0) {
        for (let i = 0; i <= value.supplementary.length; i++) {
          if (typeof value.supplementary[i] !== 'undefined') {
            const tempData = dynamicPayloadBaseCnb(
              listSuppCompensation,
              value.supplementary[i].compensationComponentId,
              value.supplementary[i]
            );
            tempSupplementary.push(tempData);
          }
        }
      }

      dispatch({
        type: postNewCnbProfileRequested.toString(),
        Payload: {
          companyID: companyData?.id?.toString(),
          overtime: value.overtime,
          name: value.name,
          base: tempBase,
          supplementaries: tempSupplementary,
        },
      });
    }
  }

  const initialValues: {
    name: string;
    compensationComponentId: string;
    period: string;
    rateOrAmount: string;
    percentage: string | number | null;
    overtime: string | number;
    taxStatus: string;
    supplementary: SuplementType[];
  } = {
    name: '',
    compensationComponentId: '',
    period: '',
    rateOrAmount: '',
    percentage: 0,
    overtime: '',
    taxStatus: '',
    supplementary: [],
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: BaseType) => {
          CreateNewCnbProfile(values);
          console.log('here');
        }}
        validationSchema={validationSchecma}
      >
        {(formik) =>
          (
            <FormikForm>
              <Header>
                <HeaderPageTitle>
                  <IconButton
                    parentColor='primary.500'
                    icons={<ArrowBack sx={{ color: '#FFFFFF' }} />}
                    onClick={() => {
                      router.push('/compensation-benefits');
                    }}
                  />
                  <Typography
                    style={{
                      color: '#223567',
                      fontSize: '20px',
                      fontWeight: '700',
                      width: '250px',
                    }}
                  >
                    {t(`${tPath}create_title`)}
                  </Typography>
                </HeaderPageTitle>
                <NextBtnWrapper>
                  <Button
                    fullWidth={false}
                    size='small'
                    label={t('button.cancel')}
                    variant='outlined'
                    sx={{ mr: '12px' }}
                    color='primary'
                    onClick={handleOpen}
                  />
                  <Button
                    fullWidth={false}
                    size='small'
                    label={t('button.save')}
                    color='primary'
                    type='submit'
                  />
                </NextBtnWrapper>
              </Header>
              <Paper sx={{ width: '100%', p: '21px 32px' }}>
                <Form style={{ marginBottom: '32px' }}>
                  <Typography>
                    {t(`${tPath}profile_name`)}
                    <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <Grid container>
                    <Grid item xs={12} md={6} lg={6} xl={6}>
                      <TextField
                        sx={{ marginTop: '.4rem' }}
                        fullWidth
                        required
                        type='text'
                        size='small'
                        placeholder={t(`${tPath}profile_name_placeholder`)}
                        error={
                          compareCheck(formik.touched.name, Boolean(formik.errors.name))
                        }
                        helperText={ifThenElse(formik.touched.name, formik.errors.name, null)}
                        value={formik.values.name}
                        onChange={(e) =>
                          formik.setFieldValue(
                            'name',
                            e.target.value.replace(/[^a-zA-Z\s]+/, '') as string
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                  <Typography
                    style={{
                      marginBottom: '17px',
                      marginTop: '31px',
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#223567',
                    }}
                  >
                    {t(`${tPath}compensation_sub_title`)}
                  </Typography>
                  <Typography
                    style={{
                      marginBottom: '17px',
                      fontSize: '16px',
                      fontWeight: '700',
                      color: '#223567',
                    }}
                  >
                    {t(`${tPath}base_section.title`)}
                  </Typography>
                  <Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <div style={{ marginBottom: '16px' }}>
                          <Typography>
                          {t(`${tPath}base_section.compensation_component`)}
                            <span style={{ color: 'red' }}>*</span>
                          </Typography>
                          <FormControl
                            fullWidth
                            error={compareCheck(
                              formik.touched.compensationComponentId,
                              Boolean(formik.errors.compensationComponentId)
                            )}
                          >
                            <Select
                              sx={{ marginTop: '.4rem' }}
                              fullWidth
                              size='small'
                              value={formik.values.compensationComponentId}
                              onChange={(e) => {
                                formik.setFieldValue(
                                  'compensationComponentId',
                                  e.target.value
                                );
                                dispatch({
                                  type: getListTerminReqeusted.toString(),
                                  payload: e.target.value,
                                });
                                setTitle(
                                  getPaymentType(
                                    e.target.value,
                                    listBaseCompensation
                                  )?.title
                                );
                                setWithPercentage(
                                  getPaymentType(
                                    e.target.value,
                                    listBaseCompensation
                                  )?.withPercentage
                                );
                              }}
                              displayEmpty
                              renderValue={(value: unknown) => {
                                ifThenElse(
                                  (value as string)?.length === 0,
                                  (
                                    <Text
                                      title={t(`${tPath}base_section.compensation_component_placeholder`)}
                                      color='grey.400'
                                    />
                                  ),
                                  null
                                );
                                const selected = listBaseCompensation?.find(
                                  (list) => list.value === value
                                );
                                return ifThenElse(!!selected, selected?.label, '');
                              }}
                            >
                              {listBaseCompensation?.map((item, i) => (
                                <MenuItem key={i} value={item.value}>
                                  {item.label}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {ifThenElse(formik.touched.compensationComponentId, formik.errors.compensationComponentId, null)}
                            </FormHelperText>
                          </FormControl>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={6} lg={6} xl={6}>
                        <Typography>
                          {t(`${tPath}base_section.tax_status`)}<span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <FormControl
                          error={compareCheck(formik.touched.taxStatus, Boolean(formik.errors.taxStatus))}
                        >
                          <RadioGroup
                            row
                            style={{ height: '54px' }}
                            value={formik.values.taxStatus}
                            onChange={(e) =>
                              formik.setFieldValue('taxStatus', e.target.value)
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
                              label={t(`${tPath}base_section.tax_status_option.taxable`)}
                            />
                            <FormControlLabel
                              value='false'
                              control={
                                <Radio
                                  size='small'
                                  checkedIcon={<BpCheckedIcon />}
                                />
                              }
                              label={t(`${tPath}base_section.tax_status_option.nontaxable`)}
                            />
                          </RadioGroup>
                          <FormHelperText>
                            {ifThenElse(formik.touched.taxStatus, formik.errors.taxStatus, null)}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>
                    {ifThenElse(formik.values.compensationComponentId !== '', (
                      <Grid container>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={3} lg={3} xl={3}>
                            <Typography>
                              {title}
                              <span style={{ color: 'red' }}>*</span>
                            </Typography>
                            <TextField
                              sx={{ marginTop: '.4rem' }}
                              fullWidth
                              type='number'
                              size='small'
                              error={compareCheck(formik.touched.rateOrAmount, Boolean(formik.errors.rateOrAmount))}
                              helperText={ifThenElse(formik.touched.rateOrAmount, formik.errors.rateOrAmount, null)}
                              value={formik.values.rateOrAmount}
                              onChange={(e) =>
                                formik.setFieldValue(
                                  'rateOrAmount',
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
                          {ifThenElse(withPercentage === true, (
                            <Grid item xs={12} md={3} lg={3} xl={3}>
                              <FormControl fullWidth>
                                <Input
                                  fullWidth
                                  customLabel='Rate'
                                  variant='outlined'
                                  type='number'
                                  size='small'
                                  value={formik.values.percentage}
                                  onChange={(e) => { formik.setFieldValue('percentage', e.target.value); }}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position='end'>
                                        %
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </FormControl>
                            </Grid>
                          ), null)}
                          <Grid item xs={12} md={3} lg={3} xl={3}>
                            <FormControl
                              fullWidth
                              error={compareCheck(formik.touched.period, Boolean(formik.errors.period))}
                            >
                              <Select
                                sx={{ marginTop: '1.8rem' }}
                                fullWidth
                                size='small'
                                value={formik.values.period}
                                onChange={(e) =>
                                  formik.setFieldValue('period', e.target.value)
                                }
                              >
                                {listTermin?.map((item) => (
                                  <MenuItem key={item.label} value={item.value}>
                                    {item.label}
                                  </MenuItem>
                                ))}
                              </Select>
                              <FormHelperText>
                                {ifThenElse(formik.touched.period, formik.errors.period, null)}
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                    ), null)}
                    <Grid container mt='16px'>
                      <Grid item xs={12}>
                        <Text title={t(`${tPath}overtime_section.title`)} fontWeight={700} fontSize='16px' mb='16px' color='primary.500' />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Input
                          withAsterisk
                          size='small'
                          customLabel={t(`${tPath}overtime_section.rate`)}
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
                  </Grid>
                </Form>
                <FieldArray
                  name='supplementary'
                  render={(arrayHelper) => {
                    return (
                      <div>
                        {ifThenElse(formik.values.supplementary.length > 0, (
                          <>
                            <Typography
                              style={{
                                marginBottom: '17px',
                                fontSize: '16px',
                                fontWeight: '700',
                                color: '#223567',
                              }}
                            >
                              {t(`${tPath}supplementary_section.title`)}
                            </Typography>
                            <Form>
                              {formik.values.supplementary.map(
                                (suplement, i) => (
                                  <div key={i} style={{ marginBottom: '33px' }}>
                                    <Grid container spacing={2}>
                                      <Grid item xs={12} md={6} lg={6} xl={6}>
                                        <div style={{ marginBottom: '16px' }}>
                                          <Typography>
                                          {t(`${tPath}supplementary_section.compensation_component`)} {i + 1}
                                            <span style={{ color: 'red' }}>
                                              *
                                            </span>
                                          </Typography>
                                          <FormControl
                                            fullWidth
                                            {...(formik.touched
                                              ?.supplementary &&
                                              formik.errors?.supplementary && {
                                                error: compareCheck(
                                                  formik.touched?.supplementary[i]?.compensationComponentId,
                                                  Boolean(
                                                    (
                                                      formik.errors
                                                        ?.supplementary[
                                                        i
                                                      ] as unknown as SuplementType
                                                    )?.compensationComponentId
                                                  )
                                                ),
                                              })}
                                          >
                                            <Select
                                              sx={{ marginTop: '.4rem' }}
                                              fullWidth
                                              size='small'
                                              value={
                                                formik.values.supplementary[i]
                                                  ?.compensationComponentId
                                              }
                                              onChange={(e) => {
                                                formik.setFieldValue(
                                                  `supplementary.${i}.compensationComponentId`,
                                                  e.target.value
                                                );
                                                dispatch({
                                                  type: getListSuppTerminRequested.toString(),
                                                  payload: e.target.value,
                                                });
                                                formik.setFieldValue(
                                                  `supplementary.${i}.titleRate`,
                                                  getPaymentType(
                                                    e.target.value,
                                                    listSuppCompensation
                                                  )?.title
                                                );
                                                formik.setFieldValue(
                                                  `supplementary.${i}.withPercentage`,
                                                  getPaymentType(
                                                    e.target.value,
                                                    listSuppCompensation
                                                  )?.withPercentage
                                                );
                                              }}
                                            >
                                              {listSuppCompensation?.map(
                                                (item, j) => (
                                                  <MenuItem
                                                    key={j}
                                                    value={item.value}
                                                  >
                                                    {item.label}
                                                  </MenuItem>
                                                )
                                              )}
                                            </Select>
                                            {formik.touched?.supplementary &&
                                              formik.errors?.supplementary && (
                                                <FormHelperText>
                                                  {ifThenElse(formik.touched?.supplementary[i]?.compensationComponentId,
                                                    (
                                                      formik.errors
                                                        ?.supplementary[
                                                        i
                                                      ] as unknown as SuplementType
                                                    )?.compensationComponentId,
                                                  null)}
                                                </FormHelperText>
                                              )}
                                          </FormControl>
                                        </div>
                                      </Grid>
                                      <Grid item xs={12} md={6} lg={6} xl={6}>
                                        <Typography>
                                          {t(`${tPath}supplementary_section.tax_status`)}
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </Typography>
                                        <Box
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            height: '54px',
                                          }}
                                        >
                                          <FormControl
                                            fullWidth
                                            {...(formik.touched
                                              ?.supplementary &&
                                              formik.errors?.supplementary && {
                                                error: compareCheck(
                                                  formik.touched?.supplementary[i]?.period,
                                                  Boolean(
                                                    (
                                                      formik.errors
                                                        ?.supplementary[
                                                        i
                                                      ] as unknown as SuplementType
                                                    )?.period
                                                  )
                                                ),
                                              })}
                                          >
                                            <RadioGroup
                                              row
                                              value={
                                                formik.values.supplementary[i]
                                                  ?.taxStatus
                                              }
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
                                                    checkedIcon={
                                                      <BpCheckedIcon />
                                                    }
                                                  />
                                                }
                                                label={t(`${tPath}supplementary_section.tax_status_option.taxable`)}
                                              />
                                              <FormControlLabel
                                                value='false'
                                                control={
                                                  <Radio
                                                    size='small'
                                                    checkedIcon={
                                                      <BpCheckedIcon />
                                                    }
                                                  />
                                                }
                                                label={t(`${tPath}supplementary_section.tax_status_option.nontaxable`)}
                                              />
                                            </RadioGroup>
                                            {formik.touched?.supplementary &&
                                              formik.errors?.supplementary && (
                                                <FormHelperText>
                                                  {ifThenElse(formik.touched?.supplementary[i]?.taxStatus,
                                                    (
                                                      formik.errors
                                                        ?.supplementary[
                                                        i
                                                      ] as unknown as SuplementType
                                                    )?.taxStatus,
                                                  null)}
                                                </FormHelperText>
                                              )}
                                          </FormControl>
                                          <Box>
                                            <Button
                                              color='red'
                                              startIcon={<DeleteIcon />}
                                              label={t('button.delete')}
                                              onClick={() => {
                                                arrayHelper.remove(i);
                                                dispatch({
                                                  type: removeListSuppTermin.toString(),
                                                  payload: i,
                                                });
                                              }}
                                            />
                                          </Box>
                                        </Box>
                                      </Grid>
                                    </Grid>
                                    <Grid container spacing={2}>
                                      <Grid item xs={12} md={3} lg={3} xl={3}>
                                        <Typography>
                                          {
                                            formik.values.supplementary[i]
                                              .titleRate
                                          }
                                          <span style={{ color: 'red' }}>
                                            *
                                          </span>
                                        </Typography>
                                        <TextField
                                          sx={{ marginTop: '.4rem' }}
                                          fullWidth
                                          size='small'
                                          type='number'
                                          {...(formik.touched?.supplementary &&
                                            formik.errors?.supplementary && {
                                              error: compareCheck(
                                                formik.touched?.supplementary[i]?.rateOrAmount,
                                                Boolean(
                                                  (
                                                    formik.errors
                                                      ?.supplementary[
                                                      i
                                                    ] as unknown as SuplementType
                                                  )?.rateOrAmount
                                                )
                                              ),
                                            })}
                                          {...(formik.touched?.supplementary &&
                                            formik.errors?.supplementary && {
                                              helperText: ifThenElse(
                                                formik.touched?.supplementary[i]?.rateOrAmount,
                                                (
                                                  formik.errors?.supplementary[
                                                    i
                                                  ] as unknown as SuplementType
                                                )?.rateOrAmount,
                                                null)
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
                                      {ifThenElse(formik.values.supplementary[i]
                                        .withPercentage === true, (
                                        <Grid item xs={12} md={3} lg={3} xl={3}>
                                          <FormControl fullWidth>
                                            <Input
                                              fullWidth
                                              customLabel='Rate'
                                              variant='outlined'
                                              type='number'
                                              size='small'
                                              name='percentage'
                                              value={
                                                formik.values.supplementary[i]
                                                  ?.percentage
                                              }
                                              onChange={formik.handleChange}
                                              onBlur={formik.handleBlur}
                                              InputProps={{
                                                endAdornment: (
                                                  <InputAdornment position='end'>
                                                    %
                                                  </InputAdornment>
                                                ),
                                              }}
                                            />
                                          </FormControl>
                                        </Grid>
                                      ), null)}
                                      <Grid item xs={12} md={3} lg={3} xl={3}>
                                        <FormControl
                                          fullWidth
                                          {...(formik.touched?.supplementary &&
                                            formik.errors?.supplementary && {
                                              error: compareCheck(
                                                formik.touched?.supplementary[i]?.period,
                                                Boolean(
                                                  (
                                                    formik.errors
                                                      ?.supplementary[
                                                      i
                                                    ] as unknown as SuplementType
                                                  )?.period
                                                )
                                              ),
                                            })}
                                        >
                                          <Select
                                            sx={{ marginTop: '1.8rem' }}
                                            fullWidth
                                            size='small'
                                            value={
                                              formik.values.supplementary[i]
                                                ?.period
                                            }
                                            onChange={(e) =>
                                              formik.setFieldValue(
                                                `supplementary.${i}.period`,
                                                e.target.value
                                              )
                                            }
                                          >
                                            {listSuppTermin[i]?.map((item) => (
                                              <MenuItem
                                                key={item.label}
                                                value={item.value}
                                              >
                                                {item.label}
                                              </MenuItem>
                                            ))}
                                          </Select>
                                          {formik.touched?.supplementary &&
                                            formik.errors?.supplementary && (
                                              <FormHelperText>
                                                {ifThenElse(
                                                  formik.touched?.supplementary[i]?.period,
                                                  (
                                                    formik.errors
                                                      ?.supplementary[
                                                      i
                                                    ] as unknown as SuplementType
                                                  )?.period,
                                                  null)
                                                }
                                              </FormHelperText>
                                            )}
                                        </FormControl>
                                      </Grid>
                                    </Grid>
                                  </div>
                                )
                              )}
                            </Form>
                          </>
                        ), null)}
                        <AddButton
                          color='secondary'
                          startIcon={<AddIcon />}
                          label={t('button.add_supplementary_compensation')}
                          onClick={() =>
                            arrayHelper.insert(
                              formik.values.supplementary.length + 1,
                              {
                                compensationComponentId: '',
                                period: '',
                                rateOrAmount: '',
                                taxStatus: '',
                                titleRate: t(`${tPath}supplementary_section.amount`),
                              }
                            )
                          }
                        />
                      </div>
                    );
                  }}
                />
              </Paper>
            </FormikForm>
          )
        }
      </Formik>
      <ConfirmationModal
        open={leave}
        handleClose={handleClose}
        title={t('compensation_and_benefits.popup.create_cancel.title')}
        content={t('compensation_and_benefits.popup.create_cancel.desc')}
        withCallback
        callback={() => {
          router.push('/compensation-benefits');
          dispatch({
            type: resetResponserMessage.toString(),
          });
        }}
      />
    </>
  );
}
