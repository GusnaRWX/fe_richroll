/* eslint-disable @typescript-eslint/indent */
import React, { useEffect } from 'react';
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
import { dynamicPayloadBaseCnb, getCompanyData, getPaymentType } from '@/utils/helper';
import { FieldArray, Form as FormikForm, Formik } from 'formik';
import * as Yup from 'yup';
import ConfirmationModal from '@/components/_shared/common/ConfirmationModal';
import { getListCompensationRequested, getListSuppTerminRequested, getListTerminReqeusted, removeListSuppTermin } from '@/store/reducers/slice/options/optionSlice';
import { Text } from '@/components/_shared/common';
import { resetResponserMessage } from '@/store/reducers/slice/responserSlice';

export default function UpdateCNBComponent() {
  const router = useRouter();
  const companyData = getCompanyData();
  const dispatch = useAppDispatch();
  const { listCompensation, listTermin, listSuppTermin } = useAppSelectors(state => state.option);
  console.log(listCompensation);
  const detailLoading = useAppSelectors(
    (state) => state.compensation?.detailLoading
  );
  const cnbDetail = useAppSelectors(state => state?.compensation?.detail?.data);
  const [openMsg, setOpenMsg] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [withPercentage, setWithPercentage] = React.useState(false);
  const [leave, setLeave] = React.useState(false);
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
      type: getListCompensationRequested.toString()
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
    period: string;
    supplementary: SuplementType[];
  }

  function UpdateCnbProfile(value: BaseType) {
    let supplement = true;
    console.log(value, 'adas');
    value.supplementary.map((item: SuplementType) => {
      if (value.supplementary.length === 0) {
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

    if (
      value.name !== '' &&
      value.compensationComponentId !== '' &&
      value.period !== '' &&
      value.rateOrAmount !== '' &&
      // value.taxStatus !== '' &&
      supplement
    ) {
      const tempBase = dynamicPayloadBaseCnb(listCompensation, value.compensationComponentId, value);

      const tempSupplementary: any = [];
      if (value.supplementary.length > 0) {
        for (let i = 0; i <= value.supplementary.length; i++) {
          if (typeof value.supplementary[i] !== 'undefined') {
            const tempData = dynamicPayloadBaseCnb(listCompensation, value.supplementary[i].compensationComponentId, value.supplementary[i]);
            tempSupplementary.push(tempData);
          }
        }
      }
      dispatch({
        type: putUpdateRequested.toString(),
        Id: router.query.id,
        Payload: {
          companyID: companyData?.id?.toString(),
          name: value.name,
          base: tempBase,
          supplementaries: tempSupplementary
        }
      });
    }
  }

  const initialValues: {
    name: string;
    compensationComponentId: string;
    period: string;
    rateOrAmount: string;
    taxStatus: string;
    supplementary: SuplementType[];
  } = {
    name: cnbDetail?.name || '',
    compensationComponentId: cnbDetail?.base?.component?.id,
    period: cnbDetail?.base?.term?.id,
    taxStatus: cnbDetail?.base?.isTaxable,
    rateOrAmount: cnbDetail?.base?.amount,
    supplementary: cnbDetail?.supplementaries?.map(val => {
      return {
        compensationComponentId: val.component?.id,
        period: val?.term?.id,
        rateOrAmount: getPaymentType(val?.component?.id, listCompensation)?.withPercentage ? val?.rate : val?.amount,
        taxStatus: val?.isTaxable,

      };
    })
  };

  console.log(cnbDetail?.base);

  useEffect(() => {

    setTitle(getPaymentType(cnbDetail?.base?.component?.id, listCompensation)?.title);
    setWithPercentage(getPaymentType(cnbDetail?.base?.component?.id, listCompensation)?.withPercentage);

    dispatch({
      type: getListTerminReqeusted.toString(),
      payload: cnbDetail?.base?.component?.id
    });

  }, []);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          // UpdateCnbProfile(values);
          setOpenMsg(true);
        }}
        validationSchema={validationSchecma}
      >
        {(formik) => (
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
                  Update Profile <br /> <Text title={companyData?.name as string} fontWeight={400} fontSize={14} />
                </Typography>
              </HeaderPageTitle>
            </Header>
            <Paper sx={{ width: '100%', p: '21px 32px' }}>
              <Form style={{ marginBottom: '32px' }}>
                <Typography>
                  Profile Name
                  <span style={{ color: 'red' }}>*</span>
                </Typography>
                <Grid container>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <TextField
                      sx={{ marginTop: '.4rem' }}
                      size='small'
                      fullWidth
                      required
                      placeholder='Sales'
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
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
                  Compensation
                </Typography>
                <Typography
                  style={{
                    marginBottom: '17px',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#223567',
                  }}
                >
                  Base
                </Typography>
                <Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={6} lg={6} xl={6}>
                      <div style={{ marginBottom: '16px' }}>
                        <FormControl
                          fullWidth
                          error={
                            formik.touched.compensationComponentId &&
                            Boolean(formik.errors.compensationComponentId)
                          }
                        >
                          <Typography>
                            Compensation Component
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
                              setTitle(getPaymentType(e.target.value, listCompensation)?.title);
                              setWithPercentage(getPaymentType(e.target.value, listCompensation)?.withPercentage);
                            }
                            }
                            displayEmpty
                            renderValue={(value: unknown) => {
                              if ((value as string)?.length === 0) {
                                return <Text title='Select Compensation' color='grey.400' />;
                              }
                              const selected = listCompensation.find(list => list.value === value);
                              if (selected) {
                                return `${selected.label}`;
                              }
                              return null;
                            }}
                          >
                            {listCompensation?.map((Option, i) => (
                              <MenuItem key={i} value={Option.value}>
                                {Option.label}
                              </MenuItem>
                            ))}
                          </Select>
                          <FormHelperText>
                            {formik.touched.compensationComponentId &&
                              formik.errors.compensationComponentId}
                          </FormHelperText>
                        </FormControl>
                      </div>
                    </Grid>
                    <Grid item xs={6} md={6} lg={6} xl={6}>
                      <Typography>
                        Tax Status<span style={{ color: 'red' }}>*</span>
                      </Typography>
                      <FormControl
                        error={
                          formik.touched.taxStatus &&
                          Boolean(formik.errors.taxStatus)
                        }
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
                        </RadioGroup>
                        <FormHelperText>
                          {formik.touched.taxStatus && formik.errors.taxStatus}
                        </FormHelperText>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid container spacing={2}>
                      <Grid item xs={3} md={3} lg={3} xl={3}>
                        <Typography>
                          {title}
                          <span style={{ color: 'red' }}>*</span>
                        </Typography>
                        <TextField
                          sx={{ marginTop: '.4rem' }}
                          size='small'
                          fullWidth
                          type='number'
                          error={
                            formik.touched.rateOrAmount &&
                            Boolean(formik.errors.rateOrAmount)
                          }
                          helperText={
                            formik.touched.rateOrAmount &&
                            formik.errors.rateOrAmount
                          }
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
                          <Grid item xs={3} md={3} lg={3} xl={3}>
                            <FormControl fullWidth>
                              <Input
                                fullWidth
                                customLabel='Rate'
                                variant='outlined'
                                type='number'
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

                      <Grid item xs={3} md={3} lg={3} xl={3}>
                        <FormControl
                          fullWidth
                          error={
                            formik.touched.period && Boolean(formik.errors.period)
                          }
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
                            {formik.touched.period && formik.errors.period}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Form>
              <FieldArray
                name='supplementary'
                render={(arrayHelper) => {
                  return (
                    <div>
                      {formik?.values?.supplementary?.length > 0 && (
                        <>
                          <Typography
                            style={{
                              marginBottom: '17px',
                              fontSize: '16px',
                              fontWeight: '700',
                              color: '#223567',
                            }}
                          >
                            Suplementary
                          </Typography>
                          <Form>
                            {formik.values.supplementary.map((suplement: any, i) => (
                              <div key={i} style={{ marginBottom: '33px' }}>
                                <Grid container spacing={2}>
                                  <Grid item xs={6} md={6} lg={6} xl={6}>
                                    <div style={{ marginBottom: '16px' }}>
                                      <Typography>
                                        Compensation Component {i + 1}
                                        <span style={{ color: 'red' }}>*</span>
                                      </Typography>
                                      <FormControl
                                        fullWidth
                                        {...(formik.touched?.supplementary &&
                                          formik.errors?.supplementary && {
                                          error:
                                            formik.touched?.supplementary[i]
                                              ?.compensationComponentId &&
                                            Boolean(
                                              (
                                                formik.errors?.supplementary[i] as unknown as SuplementType
                                              )?.compensationComponentId
                                            ),
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
                                              pauload: e?.target?.value
                                            });
                                            formik.setFieldValue(`supplementary.${i}.titleRate`,
                                              getPaymentType(e?.target?.value, listCompensation)?.title
                                            );
                                            formik.setFieldValue(
                                              `supplementary.${i}.withPercentage`,
                                              getPaymentType(e?.target?.value, listCompensation)?.withPercentage
                                            );
                                          }
                                          }
                                          displayEmpty
                                          renderValue={(value: unknown) => {
                                            if ((value as string)?.length === 0) {
                                              return <Text title='Select Compensation' color='grey.400' />;
                                            }
                                            const selected = listCompensation.find(list => list.value === value);
                                            if (selected) {
                                              return `${selected.label}`;
                                            }
                                            return null;
                                          }}
                                        >
                                          {listCompensation?.map(
                                            (Option, i) => (
                                              <MenuItem key={i} value={Option.id}>
                                                {Option.name}
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
                                  <Grid item xs={6} md={6} lg={6} xl={6}>
                                    <Typography>
                                      Tax Status
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
                                        <RadioGroup
                                          row
                                          value={suplement?.isTaxable || formik?.values?.supplementary[i]?.taxStatus}
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
                                  <Grid item xs={3} md={3} lg={3} xl={3}>
                                    <Typography>
                                      {getPaymentType(suplement?.compensationComponentId, listCompensation)?.title}
                                      <span style={{ color: 'red' }}>*</span>
                                    </Typography>
                                    <TextField
                                      sx={{ marginTop: '.4rem' }}
                                      size='small'
                                      fullWidth
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
                                      value={suplement?.rateOrAmount || formik.values.supplementary[i].rateOrAmount}
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
                                      <Select
                                        sx={{ marginTop: '1.8rem' }}
                                        size='small'
                                        fullWidth
                                        value={suplement?.term?.id || formik.values.supplementary[i]?.period}
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
                          </Form>
                        </>
                      )}
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
                                titleRate: 'Amount',

                              }
                            )
                          }
                        />
                        <NextBtnWrapper>
                          <Button
                            fullWidth={false}
                            size='small'
                            label='Cancel'
                            variant='outlined'
                            sx={{ mr: '12px' }}
                            color='primary'
                            onClick={handleOpen}
                          />
                          <Button
                            fullWidth={false}
                            size='small'
                            label='Save'
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
              title='Save Changes'
              content='Are you sure you want to update profile with this data? Any unsaved changes made to data will be discarded'
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
        title='Are you sure you want to leave?'
        content='Any unsaved changes will be discarded'
        withCallback
        callback={() => {
          router.push('/compensation/benefits');
          dispatch({
            type: resetResponserMessage.toString()
          });
        }}
      />
    </>
  );
}
