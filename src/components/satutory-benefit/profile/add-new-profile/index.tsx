import React, { ReactNode, useState } from 'react';
import {
  Button,
  Input,
  Select,
  Textarea,
  IconButton,
  CheckBox,
} from '@/components/_shared/form';
import { styled } from '@mui/material/styles';
import { Typography, Box, FormHelperText, Paper, Grid } from '@mui/material';
import BasicDatePicker from '@/components/_shared/form/DatePicker';
import { ArrowBack } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import { Form as FormikForm, Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import { CustomModal } from '@/components/_shared/common';
import DeleteIcon from '@mui/icons-material/Delete';
import { HiPencilAlt } from 'react-icons/hi';

export default function CreateNewProfile() {
  const [isAddNewComponent, setIsAddNewComponent] = useState(false);
  const [isModalFormSubmitted, setIsModalFormSubmitted] = useState(false);

  function isCloseAddComponent() {
    setIsAddNewComponent(false);
  }

  const router = useRouter();

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

  const AddButton = styled(Button)({
    color: 'white',
    maxWidth: '245px',
    padding: '8px 10px',
    '.MuiTypography-root': {
      fontSize: '14px',
    },
  });

  const Dummyoption = [
    { value: '1', label: 'Dummy 1' },
    { value: '2', label: 'Dummy 2' },
    { value: '3', label: 'Dummy 3' },
  ];

  interface BaseTypeInitialValues {
    componentName: string;
    country: string;
    province: string;
    city: string;
    subDistrict: string;
    effectiveDate: string;
    experationDate: string;
    citation: string;
    internalNotes: string;
    externalNotes: string;
    benefitComponent: [];
  }

  const initialValues: BaseTypeInitialValues = {
    componentName: '',
    country: '',
    province: '',
    city: '',
    subDistrict: '',
    effectiveDate: '',
    experationDate: '',
    citation: '',
    internalNotes: '',
    externalNotes: '',
    benefitComponent: [],
  };

  const validationSchema = Yup.object().shape({
    componentName: Yup.string().required('This field is required'),
    country: Yup.string().required('This field is required'),
    effectiveDate: Yup.date().required('This field is required'),
    expirationDate: Yup.date(),
    citation: Yup.string().max(120, 'Citation must be at most 120 characters'),
    internalNotes: Yup.string().max(
      120,
      'Internal Notes must be at most 120 characters'
    ),
    externalNotes: Yup.string().max(
      120,
      'External Notes must be at most 120 characters'
    ),
  });

  const selectedBenefitsOption = [
    {
      label: 'Health Insurance',
      value: 'healthInsurance',
    },
    {
      label: 'Pension',
      value: 'pension',
    },
    {
      label: 'Death',
      value: 'death',
    },
    {
      label: 'Old Age',
      value: 'oldAge',
    },
    {
      label: 'Work Accident',
      value: 'workAccident',
    },
  ];

  return (
    <>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        onSubmit={(values: any) => {
          setIsModalFormSubmitted(true);
          setIsAddNewComponent(false);
        }}
      >
        {(formik) => (
          <FormikForm>
            <Header>
              <HeaderPageTitle>
                <IconButton
                  parentColor='primary.500'
                  icons={<ArrowBack sx={{ color: '#FFFFFF' }} />}
                  onClick={() => {
                    router.push('/satutory-benefit/profile');
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
                  Create Statutory Benefit
                </Typography>
              </HeaderPageTitle>
              <NextBtnWrapper>
                <Button
                  fullWidth={false}
                  size='small'
                  label='Cancel'
                  variant='outlined'
                  sx={{ mr: '12px' }}
                  color='primary'
                  onClick={() => {
                    router.push('/satutory-benefit/profile');
                  }}
                />
                <Button
                  fullWidth={false}
                  size='small'
                  label='Save and Approve'
                  color='primary'
                  onClick={() => formik.handleSubmit()}
                />
              </NextBtnWrapper>
            </Header>

            <Paper style={{ padding: '21px 32px' }}>
              <Paper style={{ padding: '21px 32px' }}>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <Input
                      placeholder='Input Statutory Benefits Name'
                      customLabel='Satutory Name'
                      required
                      withAsterisk
                      size='small'
                      onChange={(e) => {
                        formik.setFieldValue('componentName', e.target.value);
                      }}
                    />
                    {formik.errors.componentName &&
                    formik.touched.componentName ? (
                        <FormHelperText sx={{ color: '#DC2626' }}>
                          {formik.errors.componentName as ReactNode}
                        </FormHelperText>
                      ) : null}
                  </Grid>
                  <Grid item xs={6} md={6} lg={6} xl={6}></Grid>
                </Grid>

                <Grid container spacing={2} style={{marginTop: '12px'}}>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <Select
                      placeholder='Select Country'
                      customLabel='Country'
                      required
                      withAsterisk
                      size='small'
                      fullWidth
                      onChange={(e) => {
                        formik.setFieldValue('country', e.target.value);
                      }}
                      options={Dummyoption}
                    />
                    {formik.errors.country && formik.touched.country ? (
                      <FormHelperText sx={{ color: '#DC2626' }}>
                        {formik.errors.country as ReactNode}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <Select
                      placeholder='Select Country'
                      customLabel='Province'
                      size='small'
                      fullWidth
                      onChange={(e) => {
                        formik.setFieldValue('province', e.target.value);
                      }}
                      options={Dummyoption}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{marginTop: '12px'}}>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <Select
                      placeholder='Select Country'
                      customLabel='City'
                      size='small'
                      fullWidth
                      onChange={(e) => {
                        formik.setFieldValue('city', e.target.value);
                      }}
                      options={Dummyoption}
                    />
                  </Grid>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <Select
                      placeholder='Select Country'
                      customLabel='Sub-District'
                      size='small'
                      fullWidth
                      onChange={(e) => {
                        formik.setFieldValue('subDistrict', e.target.value);
                      }}
                      options={Dummyoption}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{marginTop: '12px'}}>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <BasicDatePicker
                      customLabel='Effective Date'
                      withAsterisk
                      onChange={(date) => {
                        formik.setFieldValue('effectiveDate', date);
                      }}
                    />
                    {formik.errors.effectiveDate &&
                    formik.touched.effectiveDate ? (
                        <FormHelperText sx={{ color: '#DC2626' }}>
                          {formik.errors.effectiveDate as ReactNode}
                        </FormHelperText>
                      ) : null}
                  </Grid>
                  <Grid item xs={6} md={6} lg={6} xl={6}>
                    <BasicDatePicker customLabel='Expiration Date' />
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{marginTop: '12px'}}>
                  <Grid item xs={12} md={12} lg={12} xl={12}>
                    <Textarea
                      customLabel='Citation'
                      minRows={4}
                      style={{ resize: 'vertical' }}
                    />
                    <Typography
                      style={{
                        fontSize: '14px',
                        marginTop: '6px',
                        color: '#6B7280',
                      }}
                    >
                      Max. 120 Character
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{marginTop: '12px'}}>
                  <Grid item xs={12} md={12} lg={12} xl={12}>
                    <Textarea
                      customLabel='Internal Notes'
                      minRows={4}
                      style={{ resize: 'vertical' }}
                    />
                    <Typography
                      style={{
                        fontSize: '14px',
                        marginTop: '6px',
                        color: '#6B7280',
                      }}
                    >
                      Max. 120 Character
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={2} style={{marginTop: '12px'}}>
                  <Grid item xs={12} md={12} lg={12} xl={12}>
                    <Textarea
                      customLabel='External Notes'
                      minRows={4}
                      style={{ resize: 'vertical' }}
                    />
                    <Typography
                      style={{
                        fontSize: '14px',
                        marginTop: '6px',
                        color: '#6B7280',
                      }}
                    >
                      Max. 120 Character
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              <FieldArray
                name='benefitComponent'
                render={(arrayHelper) => {
                  const handleCheckBoxChange = (e: any) => {
                    const value = e.target.name;
                    const { benefitComponent } = formik.values;

                    if (e.target.checked) {
                      if (value === 'Employee Name') {
                        const allValues = selectedBenefitsOption.map(
                          (option) => option.label
                        );
                        formik.setFieldValue('benefitComponent', allValues);
                      } else {
                        formik.setFieldValue('benefitComponent', [
                          ...benefitComponent,
                          value,
                        ]);
                      }
                    } else {
                      if (value === 'Employee Name') {
                        formik.setFieldValue('benefitComponent', []);
                      } else {
                        formik.setFieldValue(
                          'benefitComponent',
                          benefitComponent.filter(
                            (option: string) => option !== value
                          )
                        );
                      }
                    }
                  };
                  return (
                    <div>
                      {formik.values.benefitComponent.length > 0 &&
                        isModalFormSubmitted && (
                        <FormikForm>
                          {formik.values.benefitComponent.map(
                            (benefit, i_benefit) => {
                              return (
                                <Paper
                                  key={i_benefit}
                                  style={{
                                    padding: '21px 32px',
                                    marginTop: '16px',
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      width: '100%',
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        color: '#223567',
                                        fontWeight: 700,
                                        fontSize: '18px',
                                      }}
                                    >
                                      {benefit}
                                    </Typography>

                                    <Box sx={{ display: 'flex', gap: '4px' }}>
                                      <Button
                                        size='medium'
                                        color='green'
                                        startIcon={
                                          <HiPencilAlt color='white' />
                                        }
                                        label='Edit'
                                        sx={{
                                          backgroundColor: '#8DD0B8',
                                          color: ' white',
                                        }}
                                      />
                                      <Button
                                        color='red'
                                        size='medium'
                                        startIcon={<DeleteIcon />}
                                        label='Delete'
                                        sx={{
                                          backgroundColor: '#FEE2E2',
                                          color: '#B91C1C',
                                        }}
                                        onClick={() => arrayHelper.remove(i_benefit)}
                                      />
                                    </Box>
                                  </Box>

                                  <Grid container sx={{ marginTop: '12px' }}>
                                    <Grid item xs={2} md={2} lg={2} xl={2}>
                                      <Typography
                                        sx={{
                                          color: '#374151',
                                          fontWeight: 400,
                                          fontSize: '14px',
                                        }}
                                      >
                                          Contributor
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={2} md={2} lg={2} xl={2}>
                                      <Typography
                                        sx={{
                                          color: '#374151',
                                          fontWeight: 400,
                                          fontSize: '14px',
                                        }}
                                      >
                                          Rate Types
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={2} md={2} lg={2} xl={2}>
                                      <Typography
                                        sx={{
                                          color: '#374151',
                                          fontWeight: 400,
                                          fontSize: '14px',
                                        }}
                                      >
                                          Flat Rate
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={3} lg={3} xl={3}>
                                      <Typography
                                        sx={{
                                          color: '#374151',
                                          fontWeight: 400,
                                          fontSize: '14px',
                                        }}
                                      >
                                          Amount Cap
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={3} lg={3} xl={3}>
                                      <Typography
                                        sx={{
                                          color: '#374151',
                                          fontWeight: 400,
                                          fontSize: '14px',
                                        }}
                                      >
                                          Effective Periode
                                      </Typography>
                                    </Grid>
                                  </Grid>

                                  <Grid container sx={{ marginTop: '12px' }}>
                                    <Grid item xs={2} md={2} lg={2} xl={2}>
                                      <Typography
                                        sx={{
                                          color: '#4B5563',
                                          fontWeight: 700,
                                        }}
                                      >
                                          Employee
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={2} md={2} lg={2} xl={2}>
                                      <Typography
                                        sx={{
                                          color: '#4B5563',
                                          fontWeight: 700,
                                        }}
                                      >
                                          Flat Rate
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={2} md={2} lg={2} xl={2}>
                                      <Typography
                                        sx={{
                                          color: '#4B5563',
                                          fontWeight: 700,
                                        }}
                                      >
                                          10,0%
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={3} lg={3} xl={3}>
                                      <Typography
                                        sx={{
                                          color: '#4B5563',
                                          fontWeight: 700,
                                        }}
                                      >
                                          Rp. 3.000.000,00
                                      </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={3} lg={3} xl={3}>
                                      <Typography
                                        sx={{
                                          color: '#4B5563',
                                          fontWeight: 700,
                                        }}
                                      >
                                          -
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Paper>
                              );
                            }
                          )}
                        </FormikForm>
                      )}
                      <Box style={{ padding: '21px 32px' }}>
                        <AddButton
                          onClick={() => setIsAddNewComponent(true)}
                          color='secondary'
                          startIcon={<AddIcon />}
                          label='Add Component'
                          sx={{ fontSize: '18px' }}
                        />
                      </Box>

                      <CustomModal
                        open={isAddNewComponent}
                        title='Select Satutory Benefits Components'
                        width='698px'
                        handleClose={isCloseAddComponent}
                        handleConfirm={() => formik.handleSubmit()}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <Grid
                            container
                            sx={{ display: 'flex', alignItems: 'center' }}
                          >
                            <Grid item xs={1} md={1} lg={1} xl={1}>
                              <CheckBox
                                name='Employee Name'
                                checked={
                                  formik.values.benefitComponent.length ===
                                  selectedBenefitsOption.length
                                }
                                customLabel=''
                                onChange={handleCheckBoxChange}
                              />
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 500, color: '#1F2937' }}
                              >
                                Employee Name
                              </Typography>
                            </Grid>
                            <Grid item xs={3} md={3} lg={3} xl={3}>
                              <Typography
                                sx={{ fontWeight: 500, color: '#1F2937' }}
                              >
                                Effective Periode
                              </Typography>
                            </Grid>
                            <Grid item xs={2} md={2} lg={2} xl={2}>
                              <Typography
                                sx={{ fontWeight: 500, color: '#1F2937' }}
                              >
                                Rate Type
                              </Typography>
                            </Grid>
                            <Grid item xs={2} md={2} lg={2} xl={2}>
                              <AddButton
                                variant='contained'
                                startIcon={<AddIcon />}
                                label='Component'
                                sx={{ width: '136px', fontSize: '14px' }}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                        {selectedBenefitsOption.map((option, i_option) => {
                          return (
                            <Box sx={{ flexGrow: 1 }} key={i_option}>
                              <Grid
                                container
                                sx={{ display: 'flex', alignItems: 'center' }}
                              >
                                <Grid item xs={1} md={1} lg={1} xl={1}>
                                  <CheckBox
                                    name={option.label}
                                    checked={formik.values.benefitComponent.includes(
                                      option.label as never
                                    )}
                                    customLabel=''
                                    onChange={handleCheckBoxChange}
                                  />
                                </Grid>
                                <Grid item xs={3} md={3} lg={3} xl={3}>
                                  <Typography
                                    sx={{ fontWeight: 400, color: '#4B5563' }}
                                  >
                                    {option.label}
                                  </Typography>
                                </Grid>
                                <Grid item xs={3} md={3} lg={3} xl={3}>
                                  <Typography
                                    sx={{ fontWeight: 400, color: '#4B5563' }}
                                  >
                                    09/05/2023
                                  </Typography>
                                </Grid>
                                <Grid item xs={3} md={3} lg={3} xl={3}>
                                  <Typography
                                    sx={{ fontWeight: 400, color: '#4B5563' }}
                                  >
                                    Fixed Rate
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          );
                        })}
                      </CustomModal>
                    </div>
                  );
                }}
              />
            </Paper>
          </FormikForm>
        )}
      </Formik>
    </>
  );
}
