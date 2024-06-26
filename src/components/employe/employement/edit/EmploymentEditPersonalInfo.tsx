/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState, memo } from 'react';
import { Alert, Text } from '@/components/_shared/common';
import { RadioGroup, Input, Textarea, DatePicker, CheckBox, Select } from '@/components/_shared/form';
import { Box, Grid, SelectChangeEvent } from '@mui/material';
import { useAppDispatch, useAppSelectors } from '@/hooks/index';
import { maritialStatus, religions, IDTypes } from '@/utils/options';
import {
  administrativeFirstLevelRequested,
  administrativeSecondLevelRequested,
  administrativeThirdLevelRequsted,
  countriesRequested,
  getSecondAdministrativeFirstLevelRequested,
  getSecondAdministrativeSecondLevelRequested,
  getSecondAdministrativeThirdLevelRequested,
  getBanksRequested
} from '@/store/reducers/slice/options/optionSlice';
import dayjs from 'dayjs';
import CancelIcon from '@mui/icons-material/Cancel';
import { Employment } from '@/types/employment';
import { validationSchemePersonalInformation } from '@/components/employees/create/validate';
import { useFormik } from 'formik';
import { ifThenElse, compareCheck } from '@/utils/helper';

interface PersonalInformationProps {
  refProp: React.Ref<HTMLFormElement>
  setValues: React.Dispatch<React.SetStateAction<Employment.PersonalValues>>;
  personalValues: Employment.PersonalValues,
  handleSecondPersonal(): void;
}


const EmploymentEditPersonalInfo = ({ refProp, setValues, personalValues, handleSecondPersonal }: PersonalInformationProps) => {
  const dispatch = useAppDispatch();

  const {
    countries,
    administrativeFirst,
    administrativeSecond,
    administrativeThird,
    secondAdministrativeFirst,
    secondAdministrativeSecond,
    secondAdministrativeThird,
    banks
  } = useAppSelectors(state => state.option);

  console.log(banks);

  const { responser } = useAppSelectors(state => state);

  const [useResidentialAddress, setUseResidentialAddress] = useState(personalValues?.useResidentialAddress);

  const formik = useFormik({
    initialValues: {
      dateofBirthPersonalInformation: dayjs(personalValues?.dateofBirthPersonalInformation),
      genderPersonalInformation: personalValues?.genderPersonalInformation,
      maritialStatusPersonalInformation: personalValues?.maritialStatusPersonalInformation,
      numberOfDependantsPersonalInformation: personalValues?.numberOfDependantsPersonalInformation,
      nationalityPersonalInformation: personalValues?.nationalityPersonalInformation,
      religionPersonalInformation: personalValues?.religionPersonalInformation,

      // Group Citizen Address
      countryCitizenAddress: personalValues?.countryCitizenAddress,
      provinceCitizenAddress: personalValues?.provinceCitizenAddress,
      cityCitizenAddress: personalValues?.cityCitizenAddress,
      subDistrictCitizenAddress: personalValues?.subDistrictCitizenAddress,
      addressCitizenAddress: personalValues?.addressCitizenAddress,
      zipCodeCitizenAddress: personalValues?.zipCodeCitizenAddress,

      // Group Residential Address
      countryResidentialAddress: personalValues?.countryResidentialAddress,
      provinceResidentialAddress: personalValues?.provinceResidentialAddress,
      cityResidentialAddress: personalValues?.cityResidentialAddress,
      subDistrictResidentialAddress: personalValues?.subDistrictResidentialAddress,
      addressResidentialAddress: personalValues?.addressResidentialAddress,
      zipCodeResidentialAddress: personalValues?.zipCodeResidentialAddress,


      // Group Bank Information
      bankBankInformation: personalValues?.bankBankInformation,
      bankAccountHolderNameBankInformation: personalValues?.bankAccountHolderNameBankInformation,
      bankAccoutNoBankInformation: personalValues?.bankAccoutNoBankInformation,
      bankCodeBankInformation: personalValues?.bankCodeBankInformation,
      branchCodeBankInformation: personalValues?.branchCodeBankInformation,
      branchNameBankInformation: personalValues?.branchNameBankInformation,
      swiftCodeBankInformation: personalValues?.swiftCodeBankInformation,

      // Group Personal ID
      idTypePersonalID: personalValues?.idTypePersonalID,
      idNumberPersonalID: personalValues?.idNumberPersonalID,
      idExpirationDatePersonalID: dayjs(personalValues?.idExpirationDatePersonalID)
    },
    validationSchema: validationSchemePersonalInformation,
    onSubmit: (values) => {
      handleSubmit(values);
    }
  });

  const handleSubmit = (_val) => {
    handleSecondPersonal();
  };

  useEffect(() => {
    dispatch({
      type: countriesRequested.toString()
    });
    dispatch({
      type: getBanksRequested.toString()
    });
  }, []);

  useEffect(() => {
    const allPersonalValues = {
      ...formik.values,
      useResidentialAddress: useResidentialAddress
    };
    setValues(allPersonalValues);
  }, [formik.values, useResidentialAddress]);

  useEffect(() => {
    if (useResidentialAddress) {
      formik.setFieldValue('countryResidentialAddress', formik.values.countryCitizenAddress);
      dispatch({
        type: getSecondAdministrativeFirstLevelRequested.toString(),
        payload: {
          countryId: formik.values.countryCitizenAddress
        }
      });
      formik.setFieldValue('provinceResidentialAddress', formik.values.provinceCitizenAddress);
      setTimeout(() => {
        dispatch({
          type: getSecondAdministrativeSecondLevelRequested.toString(),
          payload: {
            countryId: formik.values.countryCitizenAddress,
            firstLevelCode: formik.values.provinceCitizenAddress
          }
        });
      }, 3000);

      formik.setFieldValue('cityResidentialAddress', formik.values.cityCitizenAddress);
      setTimeout(() => {
        dispatch({
          type: getSecondAdministrativeThirdLevelRequested.toString(),
          payload: {
            countryId: formik.values.countryCitizenAddress,
            firstLevelCode: formik.values.provinceCitizenAddress,
            secondLevelCode: formik.values.cityCitizenAddress
          }
        });
      }, 3500);

      formik.setFieldValue('subDistrictResidentialAddress', formik.values.subDistrictCitizenAddress);
      formik.setFieldValue('addressResidentialAddress', formik.values.addressCitizenAddress);
      formik.setFieldValue('zipCodeResidentialAddress', formik.values.zipCodeCitizenAddress);
    }
  }, [useResidentialAddress]);

  useEffect(() => {
    formik.setFieldValue('countryCitizenAddress', formik.values.countryCitizenAddress);
    dispatch({
      type: administrativeFirstLevelRequested.toString(),
      payload: {
        countryId: formik.values.countryCitizenAddress
      }
    });
    formik.setFieldValue('provinceCitizenAddress', formik.values.provinceCitizenAddress);
    setTimeout(() => {
      dispatch({
        type: administrativeSecondLevelRequested.toString(),
        payload: {
          countryId: formik.values.countryCitizenAddress,
          firstLevelCode: formik.values.provinceCitizenAddress
        }
      });
    }, 3000);

    formik.setFieldValue('cityCitizenAddress', formik.values.cityCitizenAddress);
    setTimeout(() => {
      dispatch({
        type: administrativeThirdLevelRequsted.toString(),
        payload: {
          countryId: formik.values.countryCitizenAddress,
          firstLevelCode: formik.values.provinceCitizenAddress,
          secondLevelCode: formik.values.cityCitizenAddress
        }
      });
    }, 3500);

    formik.setFieldValue('subDistrictCitizenAddress', formik.values.subDistrictCitizenAddress);
    formik.setFieldValue('addressCitizenAddress', formik.values.addressCitizenAddress);
    formik.setFieldValue('zipCodeCitizenAddress', formik.values.zipCodeCitizenAddress);
  }, []);


  const checkCountry = (value: unknown) => {
    if ((value as string)?.length === 0) {
      return <Text title='Select Country' color='grey.400' />;
    }
    const selectedCountries = (countries as Array<{ label: string, value: string }>).find(country => country.value === value);
    if (selectedCountries) {
      return `${selectedCountries.label}`;
    }
    return null;
  };
  return (
    <form onSubmit={formik.handleSubmit} ref={refProp}>
      {Object.keys(formik.errors).length > 0 && (
        <Alert
          severity={'error'}
          content='Please fill in all the mandatory fields'
          icon={<CancelIcon />}
        />
      )}
      {![200, 201, 0].includes(responser?.code) && (
        <Alert
          severity='error'
          content={responser?.message}
          icon={<CancelIcon />}
        />
      )}
      <Box
        component='div'
        id='personal-information-field'
        mb='16px'
      >
        <Text
          variant='text-lg'
          title='Personal Information'
          fontWeight={700}
          color='primary.500'
        />
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='center'
          mb='16px'
          mt='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <DatePicker
              customLabel='Date of Birth'
              value={formik.values.dateofBirthPersonalInformation as unknown as Date}
              onChange={(date: unknown) => formik.setFieldValue('dateofBirthPersonalInformation', date)}
              withAsterisk
              error={ifThenElse(compareCheck(formik.touched.dateofBirthPersonalInformation, Boolean(formik.errors.dateofBirthPersonalInformation)), String(formik.errors.dateofBirthPersonalInformation), '')}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <RadioGroup
              withAsterisk
              label='Gender'
              name='genderPersonalInformation'
              options={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' }
              ]}
              value={formik.values.genderPersonalInformation === 1 || (formik.values.genderPersonalInformation as any) === 'male' ? 'male' : 'female'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={ifThenElse(compareCheck(formik.touched.genderPersonalInformation, Boolean(formik.errors.genderPersonalInformation)), formik.errors.genderPersonalInformation, '')}
              row
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='baseline'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Select
              variant='outlined'
              size='small'
              fullWidth
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={maritialStatus}
              name='maritialStatusPersonalInformation'
              value={String(formik.values.maritialStatusPersonalInformation)}
              customLabel='Maritial Status'
              withAsterisk
              displayEmpty
              renderValue={(value: unknown) => {
                if (value as number === 0) {
                  return <Text title='Select Marital Status' color='grey.400' />;
                }
                const selectedMaritial = maritialStatus.find(marital => marital.value === value);
                if (selectedMaritial) {
                  return `${selectedMaritial.label}`;
                }
                return null;
              }}
              error={compareCheck(formik.touched.maritialStatusPersonalInformation, Boolean(formik.errors.maritialStatusPersonalInformation))}
              helperText={ifThenElse(compareCheck(formik.touched.maritialStatusPersonalInformation, Boolean(formik.errors.maritialStatusPersonalInformation)), formik.errors.maritialStatusPersonalInformation, '')}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Input
              name='numberOfDependantsPersonalInformation'
              placeholder='Input Number of Children'
              withAsterisk
              size='small'
              type='number'
              customLabel='Number of Children'
              value={formik.values.numberOfDependantsPersonalInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.numberOfDependantsPersonalInformation, Boolean(formik.errors.numberOfDependantsPersonalInformation))}
              helperText={ifThenElse(formik.touched.numberOfDependantsPersonalInformation, formik.errors.numberOfDependantsPersonalInformation, '')}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='baseline'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='Nationality'
              withAsterisk
              variant='outlined'
              size='small'
              name='nationalityPersonalInformation'
              value={formik.values.nationalityPersonalInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={countries}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string)?.length === 0) {
                  return <Text title='Select Nationality' color='grey.400' />;
                }
                const selectedCountries = (countries as Array<{ label: string, value: string }>).find(country => country.value === value);
                if (selectedCountries) {
                  return `${selectedCountries?.label}`;
                }
                return null;
              }}
              error={compareCheck(formik.touched.nationalityPersonalInformation && Boolean(formik.errors.nationalityPersonalInformation))}
              helperText={ifThenElse(compareCheck(formik.touched.nationalityPersonalInformation, Boolean(formik.errors.nationalityPersonalInformation)), formik.errors.nationalityPersonalInformation, '')}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='Religion'
              variant='outlined'
              size='small'
              name='religionPersonalInformation'
              value={String(formik.values.religionPersonalInformation)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={religions}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as number) === 0) {
                  return <Text title='Select Religion' color='grey.400' />;
                }
                const selectedReligions = religions.find(religion => religion.value === value);
                if (selectedReligions) {
                  return `${selectedReligions.label}`;
                }
                return null;
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        component='div'
        id='citizen-address'
        mb='16px'
      >
        <Text
          variant='text-base'
          title='Citizen Address'
          color='primary.500'
          fontWeight={700}
        />
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='baseline'
          mb='16px'
          mt='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='Country'
              withAsterisk
              variant='outlined'
              size='small'
              name='countryCitizenAddress'
              value={formik.values.countryCitizenAddress}
              onBlur={formik.handleBlur}
              onChange={(e: unknown) => {
                formik.handleChange(e);
                dispatch({
                  type: administrativeFirstLevelRequested.toString(),
                  payload: {
                    countryId: (e as SelectChangeEvent).target.value
                  }
                });
              }}
              options={countries}
              error={compareCheck(formik.touched.countryCitizenAddress, Boolean(formik.errors.countryCitizenAddress))}
              helperText={ifThenElse(compareCheck(formik.touched.countryCitizenAddress, Boolean(formik.errors.countryCitizenAddress)), formik.errors.countryCitizenAddress, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                return checkCountry(value);
              }}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='Province'
              withAsterisk
              variant='outlined'
              size='small'
              name='provinceCitizenAddress'
              value={formik.values.provinceCitizenAddress}
              onChange={(e: unknown) => {
                formik.handleChange(e);
                dispatch({
                  type: administrativeSecondLevelRequested.toString(),
                  payload: {
                    countryId: formik.values.countryCitizenAddress,
                    firstLevelCode: (e as SelectChangeEvent).target.value
                  }
                });
              }}
              onBlur={formik.handleBlur}
              options={administrativeFirst}
              error={compareCheck(formik.touched.provinceCitizenAddress && Boolean(formik.errors.provinceCitizenAddress))}
              helperText={ifThenElse(compareCheck(formik.touched.provinceCitizenAddress, Boolean(formik.errors.provinceCitizenAddress)), formik.errors.provinceCitizenAddress, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string)?.length === 0) {
                  return <Text title='Select Province' color='grey.400' />;
                }
                const selectedCountries = (administrativeFirst as Array<{ label: string, value: string }>).find(country => country.value === value);
                if (selectedCountries) {
                  return `${selectedCountries.label}`;
                }
                return null;
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='baseline'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='City'
              withAsterisk
              variant='outlined'
              size='small'
              name='cityCitizenAddress'
              value={formik.values.cityCitizenAddress}
              onBlur={formik.handleBlur}
              onChange={(e: unknown) => {
                formik.handleChange(e);
                dispatch({
                  type: administrativeThirdLevelRequsted.toString(),
                  payload: {
                    countryId: formik.values.countryCitizenAddress,
                    firstLevelCode: formik.values.provinceCitizenAddress,
                    secondLevelCode: (e as SelectChangeEvent).target.value
                  }
                });
              }}
              options={administrativeSecond}
              error={compareCheck(formik.touched.cityCitizenAddress, Boolean(formik.errors.cityCitizenAddress))}
              helperText={ifThenElse(compareCheck(formik.touched.cityCitizenAddress, Boolean(formik.errors.cityCitizenAddress)), formik.errors.cityCitizenAddress, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string)?.length === 0) {
                  return <Text title='Select City' color='grey.400' />;
                }
                const selectedCountries = (administrativeSecond as Array<{ label: string, value: string }>).find(country => country.value === value);
                if (selectedCountries) {
                  return `${selectedCountries.label}`;
                }
                return null;
              }}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='Sub-District'
              withAsterisk
              variant='outlined'
              size='small'
              name='subDistrictCitizenAddress'
              value={formik.values.subDistrictCitizenAddress}
              onChange={(e: unknown) => formik.handleChange(e)}
              onBlur={formik.handleBlur}
              options={administrativeThird}
              error={compareCheck(formik.touched.subDistrictCitizenAddress, Boolean(formik.errors.subDistrictCitizenAddress))}
              helperText={ifThenElse(compareCheck(formik.touched.subDistrictCitizenAddress, Boolean(formik.errors.subDistrictCitizenAddress)), formik.errors.subDistrictCitizenAddress, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string)?.length === 0) {
                  return <Text title='Select Sub-District' color='grey.400' />;
                }
                const selectedCountries = (administrativeThird as Array<{ label: string, value: string }>).find(country => country.value === value);
                if (selectedCountries) {
                  return `${selectedCountries.label}`;
                }
                return null;
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='baseline'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Textarea
              name='addressCitizenAddress'
              maxRows={5}
              minRows={3}
              value={formik.values.addressCitizenAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={ifThenElse(compareCheck(formik.touched.addressCitizenAddress, Boolean(formik.errors.addressCitizenAddress)), formik.errors.addressCitizenAddress, '')}
              withAsterisk
              customLabel='Citizen ID Street Name, Building Name'
              placeholder='Input Address Details'
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Input
              withAsterisk
              customLabel='ZIP Code'
              size='small'
              name='zipCodeCitizenAddress'
              value={formik.values.zipCodeCitizenAddress}
              onChange={formik.handleChange}
              error={compareCheck(formik.touched.zipCodeCitizenAddress, Boolean(formik.errors.zipCodeCitizenAddress))}
              helperText={ifThenElse(formik.touched.zipCodeCitizenAddress, formik.errors.zipCodeCitizenAddress, '')}
              placeholder='Input Zip Code'
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='center'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <CheckBox
              customLabel='Use as residential address'
              name='useResidentialCitizenAddress'
              checked={useResidentialAddress}
              onChange={() => setUseResidentialAddress((prev: boolean) => !prev)}
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        component='div'
        id='residential-address'
        mb='16px'
      >
        <Text
          variant='text-base'
          title='Residential Address'
          color='primary.500'
          fontWeight={700}
          mb='16px'
        />
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='baseline'
          mb='16px'
          mt='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='Country'
              withAsterisk
              variant='outlined'
              size='small'
              name='countryResidentialAddress'
              value={formik.values.countryResidentialAddress}
              onBlur={formik.handleBlur}
              onChange={(e: unknown) => {
                formik.handleChange(e);
                dispatch({
                  type: getSecondAdministrativeFirstLevelRequested.toString(),
                  payload: {
                    countryId: (e as SelectChangeEvent).target.value
                  }
                });
              }}
              options={countries}
              error={compareCheck(formik.touched.countryResidentialAddress, Boolean(formik.errors.countryResidentialAddress))}
              helperText={ifThenElse(compareCheck(formik.touched.countryResidentialAddress, Boolean(formik.errors.countryResidentialAddress)), formik.errors.countryResidentialAddress, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                return checkCountry(value);
              }}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='Province'
              withAsterisk
              variant='outlined'
              size='small'
              name='provinceResidentialAddress'
              value={formik.values.provinceResidentialAddress}
              onChange={(e: unknown) => {
                formik.handleChange(e);
                dispatch({
                  type: getSecondAdministrativeSecondLevelRequested.toString(),
                  payload: {
                    countryId: formik.values.countryResidentialAddress,
                    firstLevelCode: (e as SelectChangeEvent).target.value
                  }
                });
              }}
              onBlur={formik.handleBlur}
              options={secondAdministrativeFirst}
              error={compareCheck(formik.touched.provinceResidentialAddress, Boolean(formik.errors.provinceResidentialAddress))}
              helperText={ifThenElse(compareCheck(formik.touched.provinceResidentialAddress, Boolean(formik.errors.provinceResidentialAddress)), formik.errors.provinceResidentialAddress, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string)?.length === 0) {
                  return <Text title='Select Province' color='grey.400' />;
                }
                const selectedCountries = (secondAdministrativeFirst as Array<{ label: string, value: string }>).find(country => country.value === value);
                if (selectedCountries) {
                  return `${selectedCountries.label}`;
                }
                return null;
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='baseline'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='City'
              withAsterisk
              variant='outlined'
              size='small'
              name='cityResidentialAddress'
              value={formik.values.cityResidentialAddress}
              onChange={(e: unknown) => {
                formik.handleChange(e);
                dispatch({
                  type: getSecondAdministrativeThirdLevelRequested.toString(),
                  payload: {
                    countryId: formik.values.countryResidentialAddress,
                    firstLevelCode: formik.values.provinceResidentialAddress,
                    secondLevelCode: (e as SelectChangeEvent).target.value
                  }
                });
              }}
              onBlur={formik.handleBlur}
              options={secondAdministrativeSecond}
              error={compareCheck(formik.touched.cityResidentialAddress, Boolean(formik.errors.cityResidentialAddress))}
              helperText={ifThenElse(compareCheck(formik.touched.cityResidentialAddress, Boolean(formik.errors.cityResidentialAddress)), formik.errors.cityResidentialAddress, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string)?.length === 0) {
                  return <Text title='Select City' color='grey.400' />;
                }
                const selectedCountries = (secondAdministrativeSecond as Array<{ label: string, value: string }>).find(country => country.value === value);
                if (selectedCountries) {
                  return `${selectedCountries.label}`;
                }
                return null;
              }}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='Sub-District'
              withAsterisk
              variant='outlined'
              size='small'
              name='subDistrictResidentialAddress'
              value={formik.values.subDistrictResidentialAddress}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              options={secondAdministrativeThird}
              error={compareCheck(formik.touched.subDistrictResidentialAddress, Boolean(formik.errors.subDistrictResidentialAddress))}
              helperText={ifThenElse(compareCheck(formik.touched.subDistrictResidentialAddress, Boolean(formik.errors.subDistrictResidentialAddress)), formik.errors.subDistrictResidentialAddress, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string)?.length === 0) {
                  return <Text title='Select Sub-District' color='grey.400' />;
                }
                const selectedCountries = (secondAdministrativeThird as Array<{ label: string, value: string }>).find(country => country.value === value);
                if (selectedCountries) {
                  return `${selectedCountries.label}`;
                }
                return null;
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='baseline'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Textarea
              name='addressResidentialAddress'
              maxRows={5}
              minRows={3}
              value={formik.values.addressResidentialAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={ifThenElse(compareCheck(formik.touched.addressResidentialAddress, Boolean(formik.errors.addressResidentialAddress)), formik.errors.addressResidentialAddress, '')}
              withAsterisk
              customLabel='Residential Street Name, Building Name'
              placeholder='Input Address Details'
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Input
              withAsterisk
              customLabel='ZIP Code'
              size='small'
              name='zipCodeResidentialAddress'
              value={formik.values.zipCodeResidentialAddress}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={compareCheck(formik.touched.zipCodeResidentialAddress, Boolean(formik.errors.zipCodeResidentialAddress))}
              helperText={ifThenElse(formik.touched.zipCodeResidentialAddress, formik.errors.zipCodeResidentialAddress, '')}
              placeholder='Input Zip Code'
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        component='div'
        id='personal-id'
        mb='16px'
      >
        <Text
          variant='text-lg'
          title='Personal ID'
          fontWeight={700}
          color='primary.500'
        />
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='center'
          mb='16px'
          mt='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='ID Type'
              withAsterisk
              variant='outlined'
              size='small'
              name='idTypePersonalID'
              value={String(formik.values.idTypePersonalID)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={IDTypes}
              error={compareCheck(formik.touched.idTypePersonalID, Boolean(formik.errors.idTypePersonalID))}
              helperText={ifThenElse(compareCheck(formik.touched.idTypePersonalID, Boolean(formik.errors.idTypePersonalID)), formik.errors.idTypePersonalID, '')}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string).length === 0) {
                  return <Text title='Select ID type' color='grey.400' />;
                }
                const selectedType = IDTypes.find(IDType => IDType.value === value);
                if (selectedType) {
                  return `${selectedType.label}`;
                }
                return null;
              }}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Input
              withAsterisk
              customLabel='ID Number'
              size='small'
              name='idNumberPersonalID'
              value={formik.values.idNumberPersonalID}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={compareCheck(formik.touched.idNumberPersonalID, Boolean(formik.errors.idNumberPersonalID))}
              helperText={ifThenElse(formik.touched.idNumberPersonalID, formik.errors.idNumberPersonalID, '')}
              placeholder='Input ID Number'
              type='number'
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='center'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <DatePicker
              customLabel='ID Expiration Date'
              value={formik.values.idExpirationDatePersonalID as unknown as Date}
              onChange={(date: unknown) => formik.setFieldValue('idExpirationDatePersonalID', date)}
              withAsterisk
              error={ifThenElse(compareCheck(formik.touched.idExpirationDatePersonalID, Boolean(formik.errors.idExpirationDatePersonalID)), String(formik.errors.idExpirationDatePersonalID), '')}
            />
          </Grid>
        </Grid>
        {/* <Grid
          container
          wrap='wrap'
          alignItems='center'
          mb='16px'
        >
          <Grid item sm={5.8}>
            <CheckBox
              customLabel='Permanent'
              color='primary'
              name='PersonalIDPersonalID'
              checked={isPermanentPersonalID}
              onChange={() => setIsPermanentPersonalID((prev: boolean) => !prev)}
            />
          </Grid>
        </Grid> */}
      </Box>
      <Box
        component='div'
        id='Bank Information'
      >
        <Text
          variant='text-lg'
          title='Bank Information'
          fontWeight={700}
          color='primary.500'
        />
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='center'
          mb='16px'
          mt='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Select
              fullWidth
              customLabel='Bank'
              variant='outlined'
              size='small'
              name='bankBankInformation'
              value={formik.values.bankBankInformation}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              options={banks}
              displayEmpty
              renderValue={(value: unknown) => {
                if ((value as string)?.length === 0) {
                  return <Text title='Select Bank' color='grey.400' />;
                }
                const selectedBanks = (banks as Array<{ label: string, value: string }>).find(bank => bank.value === value);
                if (selectedBanks) {
                  return `${selectedBanks.label}`;
                }
                return null;
              }}
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Input
              customLabel={`Bank Account Holder's Name`}
              size='small'
              name='bankAccountHolderNameBankInformation'
              value={formik.values.bankAccountHolderNameBankInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder={`Input Bank Account Holder's Name`}
            />
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='center'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Input
              customLabel='Bank Account No'
              size='small'
              name='bankAccoutNoBankInformation'
              value={formik.values.bankAccoutNoBankInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Input Bank Account No'
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Grid container justifyContent='space-between'>
              <Grid item sm={5.8}>
                <Input
                  customLabel='Bank Code'
                  size='small'
                  name='bankCodeBankInformation'
                  value={formik.values.bankCodeBankInformation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Input Bank Code'
                />
              </Grid>
              <Grid item sm={5.8}>
                <Input
                  customLabel='Branch Code'
                  size='small'
                  name='branchCodeBankInformation'
                  value={formik.values.branchCodeBankInformation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder='Input Branch Code'
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          wrap='wrap'
          justifyContent='space-between'
          alignItems='center'
          mb='16px'
        >
          <Grid
            item
            sm={5.8}
          >
            <Input
              customLabel='Branch Name'
              size='small'
              name='branchNameBankInformation'
              value={formik.values.branchNameBankInformation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Input Branch Name'
            />
          </Grid>
          <Grid
            item
            sm={5.8}
          >
            <Input
              customLabel='Swift Code'
              size='small'
              name='swiftCodeBankInformation'
              value={formik.values.swiftCodeBankInformation}
              onChange={formik.handleChange}
              placeholder='Input Swift Code'
            />
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default memo(EmploymentEditPersonalInfo);
