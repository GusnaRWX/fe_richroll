/* eslint-disable @typescript-eslint/indent */
import React, { useEffect, useState } from 'react';
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
import {
  putUpdateRequested,
} from '@/store/reducers/slice/cnb/compensationSlice';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { dynamicPayloadBaseCnb, getCompanyData, getPaymentType, ifThenElse, compareCheck, ifEmptyReplace } from '@/utils/helper';
import { FieldArray, Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import ConfirmationModal from '@/components/_shared/common/ConfirmationModal';
import { getListBaseCompensationRequested, getListSuppCompensationRequested, getListSuppTerminRequested, getListTerminReqeusted, removeListSuppTermin } from '@/store/reducers/slice/options/optionSlice';
import { Text } from '@/components/_shared/common';
import { resetResponserMessage } from '@/store/reducers/slice/responserSlice';
import { useTranslation } from 'react-i18next';

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
  id?: string;
}

interface BaseType {
  name: string;
  compensationComponentId: string;
  taxStatus: string;
  rateOrAmount: number | string;
  period: string;
  overtime: string | number;
  percentage: string | number | null;
  supplementary: SuplementType[];
}

type InitialValues = {
  name: string;
  compensationComponentId: string;
  period: string;
  rateOrAmount: string;
  overtime: number | string;
  taxStatus: string;
  percentage: string | number | null;
  supplementary: SuplementType[];
}

export default function UpdateCNBComponent() {
  const router = useRouter();
  const companyData = getCompanyData();
  const dispatch = useAppDispatch();
  const { listBaseCompensation, listSuppCompensation, listTermin, listSuppTermin } = useAppSelectors(state => state.option);
  const detailLoading = useAppSelectors(
    (state) => state.compensation?.detailLoading
  );
  const [initialValues, setInitialValues] = useState<InitialValues>({
    name: '',
    compensationComponentId: '',
    period: '',
    taxStatus: '',
    rateOrAmount: '',
    overtime: '',
    percentage: 0,
    supplementary: []
  });
  const [isDataReady, setIsDataReady] = useState(false);
  const cnbDetail = useAppSelectors(state => state?.compensation?.detail?.data);
  const [openMsg, setOpenMsg] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [withPercentage, setWithPercentage] = React.useState(false);
  const [leave, setLeave] = React.useState(false);
  const { t } = useTranslation();
  const tPath = 'compensation_and_benefits.form.';

  const validationSchecma = Yup.object().shape({
    name: Yup.string().required('This is required'),
    compensationComponentId: Yup.string().required('This is required'),
    period: Yup.string().required('This is required'),
    rateOrAmount: Yup.number().required('This is required').positive('Must be positive').integer('Must be number'),
    taxStatus: Yup.string().required('This is required'),
    supplementary: Yup.array().of(
      Yup.object().shape({
        compensationComponentId: Yup.string(),
        period: Yup.string(),
        rateOrAmount: Yup.number().positive('Must be positive').integer('Must be number'),
        taxStatus: Yup.string(),
      })
    ),
  });

  React.useEffect(() => {
    dispatch({
      type: getListBaseCompensationRequested.toString()
    });
    dispatch({
      type: getListSuppCompensationRequested.toString()
    });
  }, []);

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
    boxShadow: ifThenElse(theme.palette.mode === 'dark',
      '0 0 0 1px rgb(16 22 26 / 40%)',
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)'
    ),
    backgroundColor: ifThenElse(theme.palette.mode === 'dark', '#394b59', '#f5f8fa'),
    backgroundImage: ifThenElse(theme.palette.mode === 'dark',
      'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))'
    ),
    '.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: ifThenElse(theme.palette.mode === 'dark', '#30404d', '#ebf1f5'),
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: ifThenElse(theme.palette.mode === 'dark',
        'rgba(57,75,89,.5)',
        'rgba(206,217,224,.5)'
      ),
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



  function UpdateCnbProfile(value: BaseType) {
    let supplement = true;
    console.log(value, 'adas');
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
      supplement
    )) {
      const tempBase = dynamicPayloadBaseCnb(listBaseCompensation, value.compensationComponentId, value);

      const tempSupplementary: any = [];
      if (value.supplementary.length > 0) {
        for (let i = 0; i <= value.supplementary.length; i++) {
          if (typeof value.supplementary[i] !== 'undefined') {
            const tempData = dynamicPayloadBaseCnb(listSuppCompensation, value.supplementary[i].compensationComponentId, value.supplementary[i]);
            const idSupplementary = { id: value?.supplementary[i]?.id || '' };
            const mergeObject = { ...tempData, ...idSupplementary };
            tempSupplementary.push(mergeObject);
          }
        }
      }
      const mutateBase = { ...tempBase, id: cnbDetail?.base?.id };
      dispatch({
        type: putUpdateRequested.toString(),
        Id: router.query.id,
        Payload: {
          companyID: companyData?.id?.toString(),
          name: value.name,
          base: mutateBase,
          overtime: value.overtime,
          supplementaries: tempSupplementary
        }
      });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (cnbDetail?.base?.component?.id) {
        setTitle(getPaymentType(cnbDetail.base.component.id, listBaseCompensation)?.title);
        setWithPercentage(getPaymentType(cnbDetail.base.component.id, listBaseCompensation)?.withPercentage);

        dispatch({
          type: getListTerminReqeusted.toString(),
          payload: cnbDetail.base.component.id
        });
      }
    };
    const fetchSupplementary = async () => {
      if (cnbDetail?.supplementaries?.length > 0) {
        cnbDetail?.supplementaries?.map(val => {
          dispatch({
            type: getListSuppTerminRequested.toString(),
            payload: val?.component?.id
          });
        });
      }
    };


    fetchData();
    fetchSupplementary();
  }, [cnbDetail, listBaseCompensation]);

  useEffect(() => {
    if (cnbDetail) {
      setInitialValues({
        name: ifEmptyReplace(cnbDetail.name, ''),
        compensationComponentId: ifEmptyReplace(cnbDetail.base?.component?.id, ''),
        period: ifEmptyReplace(cnbDetail.base?.term?.id, ''),
        taxStatus: ifThenElse(cnbDetail.base?.isTaxable, 'true', 'false'),
        rateOrAmount: ifThenElse(cnbDetail.base?.amount, cnbDetail.base?.amount, ''),
        overtime: ifEmptyReplace(cnbDetail?.overtime, ''),
        percentage: ifEmptyReplace(cnbDetail?.base?.rate, 0),
        supplementary: cnbDetail.supplementaries?.map(val => {
          return {
            compensationComponentId: ifEmptyReplace(val.component?.id, ''),
            period: ifEmptyReplace(val.term?.id, ''),
            rateOrAmount: ifThenElse(getPaymentType(val.component?.id, listSuppCompensation)?.withPercentage, val.rate, ifThenElse(val.amount, val.amount, '')),
            taxStatus: ifThenElse(val.isTaxable, 'true', 'false'),
            id: ifEmptyReplace(val?.id, '')
          };
        }) || [],
      });
      setIsDataReady(true);
    }
  }, [cnbDetail]);

  if (!isDataReady) {
    return <div></div>;
  }
  

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          setOpenMsg(true);
        }}
        validationSchema={validationSchecma}
      >
        {(formik) => (
          console.log(formik.values),
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
                  {t(`${tPath}update_title`)} <br /> <Text title={companyData?.name as string} fontWeight={400} fontSize={14} />
                </Typography>
              </HeaderPageTitle>
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
                      size='small'
                      fullWidth
                      required
                      placeholder={t(`${tPath}profile_name_placeholder`)}
                      error={compareCheck(formik.touched.name, Boolean(formik.errors.name))}
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
                        <FormControl
                          fullWidth
                          error={compareCheck(formik.touched.compensationComponentId, Boolean(formik.errors.compensationComponentId))}
                        >
                          <Typography>
                            {t(`${tPath}base_section.compensation_component`)}
                            <span style={{ color: 'red' }}>*</span>
                          </Typography>
                          <Select
                            size='small'
                            sx={{ marginTop: '.4rem' }}
                            fullWidth
                            value={formik.values.compensationComponentId}
                            onChange={(e) => {
                              formik.setFieldValue(
                                'compensationComponentId',
                                e.target.value
                              );
                              dispatch({
                                type: getListSuppTerminRequested.toString(),
                                payload: e.target.value
                              });
                              setTitle(getPaymentType(e.target.value, listBaseCompensation)?.title);
                              setWithPercentage(getPaymentType(e.target.value, listBaseCompensation)?.withPercentage);
                            }
                            }
                            displayEmpty
                            renderValue={(value: unknown) => {
                              if ((value as string)?.length === 0) {
                                return <Text title={t(`${tPath}base_section.compensation_component_placeholder`)} color='grey.400' />;
                              }
                              const selected = listBaseCompensation.find(list => list.value === value);
                              if (selected) {
                                return `${selected.label}`;
                              }
                              return null;
                            }}
                          >
                            {listBaseCompensation?.map((Option, k) => (
                              <MenuItem key={k} value={Option.value}>
                                {Option.label}
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
                  <Grid container>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={3} lg={3} xl={3}>
                        <Typography>
                          {title}
                          <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <TextField
                          sx={{ marginTop: '.4rem' }}
                          size='small'
                          fullWidth
                          name='rateOrAmount'
                          type='number'
                          error={compareCheck(formik.touched.rateOrAmount, Boolean(formik.errors.rateOrAmount))}
                          helperText={ifThenElse(formik.touched.rateOrAmount, formik.errors.rateOrAmount, null)}
                          value={formik.values.rateOrAmount}
                          onChange={(e) =>
                            formik.setFieldValue('rateOrAmount', e.target.value)
                          }
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
                      {
                        withPercentage && (
                          <Grid item xs={12} md={3} lg={3} xl={3}>
                            <FormControl fullWidth>
                              <Input
                                fullWidth
                                customLabel='Rate'
                                variant='outlined'
                                type='number'
                                value={formik.values.percentage}
                                onChange={(e) => { formik.setFieldValue('percentage', e.target.value); }}
                                size='small'
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

                      <Grid item xs={12} md={3} lg={3} xl={3}>
                        <FormControl
                          fullWidth
                          error={compareCheck(formik.touched.period, Boolean(formik.errors.period))}
                        >
                          <Select
                            sx={{ marginTop: '1.8rem' }}
                            size='small'
                            fullWidth
                            value={formik.values.period}
                            onChange={(e) =>
                              formik.setFieldValue('period', e.target.value)
                            }
                            displayEmpty
                            renderValue={(value: unknown) => {
                              if ((value as string)?.length === 0) {
                                return <Text title='Select Period' color='grey.400' />;
                              }
                              const selected = listTermin?.find(list => list.value === value);
                              if (selected) {
                                return `${selected.label}`;
                              }
                              return null;
                            }}
                          >
                            {listTermin?.map(item => (
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
                </Grid>
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
              </Form>
              <FieldArray
                name='supplementary'
                render={(arrayHelper) => {
                  return (
                    <div>
                      {ifThenElse(formik?.values?.supplementary?.length > 0, (
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
                            {formik.values.supplementary.map((suplement: any, i) => (
                              <div key={i} style={{ marginBottom: '33px' }}>
                                <Grid container spacing={2}>
                                  <Grid item xs={12} md={6} lg={6} xl={6}>
                                    <div style={{ marginBottom: '16px' }}>
                                      <Typography>
                                      {t(`${tPath}supplementary_section.compensation_component`)} {i + 1}
                                        <span style={{ color: 'red' }}>*</span>
                                      </Typography>
                                      <FormControl
                                        fullWidth
                                        {...(formik.touched?.supplementary &&
                                          formik.errors?.supplementary && {
                                          error: compareCheck(
                                            formik.touched?.supplementary[i]?.compensationComponentId,
                                            Boolean((
                                              formik.errors?.supplementary[i] as unknown as SuplementType
                                            )?.compensationComponentId
                                            )),
                                        })}
                                      >
                                        <Select
                                          sx={{ marginTop: '.4rem' }}
                                          size='small'
                                          fullWidth
                                          value={
                                            formik.values.supplementary[i]
                                              ?.compensationComponentId
                                            ||
                                            suplement?.compensationComponentId
                                          }
                                          onChange={(e) => {
                                            formik.setFieldValue(
                                              `supplementary.${i}.compensationComponentId`,
                                              e.target.value
                                            );
                                            dispatch({
                                              type: getListSuppTerminRequested.toString(),
                                              payload: e?.target?.value
                                            });
                                            formik.setFieldValue(`supplementary.${i}.titleRate`,
                                              getPaymentType(e?.target?.value, listSuppCompensation)?.title
                                            );
                                            formik.setFieldValue(
                                              `supplementary.${i}.withPercentage`,
                                              getPaymentType(e?.target?.value, listSuppCompensation)?.withPercentage
                                            );
                                          }
                                          }
                                          displayEmpty
                                          renderValue={(value: unknown) => {
                                            if ((value as string)?.length === 0) {
                                              return <Text title={t(`${tPath}base_section.compensation_component_placeholder`)} color='grey.400' />;
                                            }
                                            const selected = listSuppCompensation.find(list => list.value === value);
                                            if (selected) {
                                              return `${selected.label}`;
                                            }
                                            return null;
                                          }}
                                        >
                                          {listSuppCompensation?.map(
                                            (Option, j) => (
                                              <MenuItem key={j} value={Option.value}>
                                                {Option.label}
                                              </MenuItem>
                                            )
                                          )}
                                        </Select>
                                        {formik.touched?.supplementary &&
                                          formik.errors?.supplementary && (
                                            <FormHelperText>
                                              {formik.touched?.supplementary[i]
                                                ?.compensationComponentId && (formik.errors?.supplementary[i] as unknown as SuplementType)?.compensationComponentId}
                                            </FormHelperText>
                                          )}
                                      </FormControl>
                                    </div>
                                  </Grid>
                                  <Grid item xs={12} md={6} lg={6} xl={6}>
                                    <Typography>
                                      {t(`${tPath}supplementary_section.tax_status`)}
                                      <span style={{ color: 'red' }}>*</span>
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
                                        {...(formik.touched?.supplementary &&
                                          formik.errors?.supplementary && {
                                          error: compareCheck(
                                            formik.touched?.supplementary[i]?.period,
                                            Boolean(
                                              (
                                                formik.errors?.supplementary[
                                                i
                                                ] as unknown as SuplementType
                                              )?.period
                                            )
                                          ),
                                        })}
                                      >
                                        <RadioGroup
                                          row
                                          value={ifEmptyReplace(suplement?.isTaxable, formik?.values?.supplementary[i]?.taxStatus)}
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
                                            label={t(`${tPath}supplementary_section.tax_status_option.taxable`)}
                                          />
                                          <FormControlLabel
                                            value='false'
                                            control={
                                              <Radio
                                                size='small'
                                                checkedIcon={<BpCheckedIcon />}
                                              />
                                            }
                                            label={t(`${tPath}supplementary_section.tax_status_option.nontaxable`)}
                                          />
                                        </RadioGroup>
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
                                          label={t('button.delete')}
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
                                  <Grid item xs={12} md={3} lg={3} xl={3}>
                                    <Typography>
                                      {getPaymentType(suplement?.compensationComponentId, listSuppCompensation)?.title}
                                      <span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    <TextField
                                      sx={{ marginTop: '.4rem' }}
                                      size='small'
                                      fullWidth
                                      type='number'
                                      {...(formik.touched?.supplementary &&
                                        formik.errors?.supplementary && {
                                        error: compareCheck(
                                          formik.touched?.supplementary[i]?.rateOrAmount,
                                          Boolean(
                                            (
                                              formik.errors?.supplementary[
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
                                          )?.rateOrAmount, null)
                                      })}
                                      value={ifEmptyReplace(suplement?.rateOrAmount, formik.values.supplementary[i].rateOrAmount)}
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
                                      <Grid item xs={12} md={3} lg={3} xl={3}>
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

                                  <Grid item xs={12} md={3} lg={3} xl={3}>
                                    <FormControl
                                      fullWidth
                                      {...(formik.touched?.supplementary &&
                                        formik.errors?.supplementary && {
                                        error: compareCheck(
                                          formik.touched?.supplementary[i]?.period,
                                          Boolean(
                                            (
                                              formik.errors?.supplementary[
                                              i
                                              ] as unknown as SuplementType
                                            )?.period
                                          )
                                        ),
                                      })}
                                    >
                                      <Select
                                        sx={{ marginTop: '1.8rem' }}
                                        size='small'
                                        fullWidth
                                        value={ifEmptyReplace(suplement?.term?.id, formik.values.supplementary[i]?.period)}
                                        onChange={(e) =>
                                          formik.setFieldValue(
                                            `supplementary.${i}.period`,
                                            e.target.value
                                          )
                                        }
                                        displayEmpty
                                        renderValue={(value: unknown) => {
                                          if ((value as string)?.length === 0) {
                                            return <Text title='Select Period' color='grey.400' />;
                                          }
                                          const selected = listTermin?.find(list => list.value === value);
                                          if (selected) {
                                            return `${selected.label}`;
                                          }
                                          return null;
                                        }}
                                      >
                                        {listSuppTermin[i]?.map(item => (
                                          <MenuItem key={item.label} value={item.value}>
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
                                                formik.errors?.supplementary[
                                                i
                                                ] as unknown as SuplementType
                                              )?.period,
                                              null)}
                                          </FormHelperText>
                                        )}
                                    </FormControl>
                                  </Grid>
                                </Grid>
                              </div>
                            ))}
                          </Form>
                        </>
                      ), null)}
                      <section>
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
                                titleRate: t(`${tPath}supplementary_section.amount`),

                              }
                            )
                          }
                        />
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
                            disabled={detailLoading}
                          />
                        </NextBtnWrapper>
                      </section>
                    </div>
                  );
                }}
              />
            </Paper>
            <ConfirmationModal
              open={openMsg}
              handleClose={() => setOpenMsg(false)}
              title={t('compensation_and_benefits.popup.update_save.title')}
              content={t('compensation_and_benefits.popup.update_save.desc')}
              withCallback
              noChange={true}
              callback={() => UpdateCnbProfile(formik.values)}
            />
          </FormikForm>
        )}
      </Formik>
      <ConfirmationModal
        open={leave}
        handleClose={handleClose}
        title={t('compensation_and_benefits.popup.update_cancel.title')}
        content={t('compensation_and_benefits.popup.update_cancel.desc')}
        withCallback
        callback={() => {
          router.push('/compensation-benefits');
          dispatch({
            type: resetResponserMessage.toString()
          });
        }}
      />
    </>
  );
}
